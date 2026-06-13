#!/usr/bin/env node
/**
 * GreenHomeNS — weekly rebate-program verification agent.
 *
 * What it does (this is what the footer "verified weekly by automated agent"
 * actually refers to — keep it honest):
 *   1. Reads every rebate program URL out of data/rebates/programs.ts
 *   2. HTTP-checks each official program page is still reachable (200/3xx)
 *   3. Writes data/rebates/last-verified.json { checkedAt, programs:[{id,url,ok,status}] }
 *   4. If the file changed, commits + pushes so Vercel redeploys with a fresh date
 *
 * Scheduled weekly via ~/Library/LaunchAgents/com.rio.greenhomens-rebates.plist
 * Run manually:  node scripts/verify-rebates.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const run = promisify(execFile);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "data", "rebates", "last-verified.json");

async function extractUrls() {
  const src = await readFile(join(ROOT, "data", "rebates", "programs.ts"), "utf8");
  // crude but stable parse: pull id + url pairs in program object order
  const ids = [...src.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
  const urls = [...src.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);
  // pair by position (each program has exactly one id then one url)
  return ids.map((id, i) => ({ id, url: urls[i] })).filter((p) => p.url);
}

async function check(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctrl.signal,
      headers: { "user-agent": "GreenHomeNS-RebateVerifier/1.0 (+https://greenhomens.com)" } });
    // some gov sites reject HEAD — fall back to GET
    if (res.status >= 400) {
      res = await fetch(url, { method: "GET", redirect: "follow", signal: ctrl.signal,
        headers: { "user-agent": "GreenHomeNS-RebateVerifier/1.0 (+https://greenhomens.com)" } });
    }
    return { ok: res.status < 400, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: String(e.name || e) };
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const programs = await extractUrls();
  const results = [];
  for (const p of programs) {
    const r = await check(p.url);
    results.push({ id: p.id, url: p.url, ...r });
    console.log(`[verify-rebates] ${r.ok ? "OK " : "DEAD"} ${r.status} ${p.id}`);
  }
  const dead = results.filter((r) => !r.ok);
  const payload = {
    checkedAt: new Date().toISOString(),
    total: results.length,
    reachable: results.length - dead.length,
    programs: results,
  };
  await writeFile(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log(`[verify-rebates] ${payload.reachable}/${payload.total} reachable, wrote ${OUT}`);
  if (dead.length) console.warn(`[verify-rebates] ⚠ ${dead.length} dead: ${dead.map((d) => d.id).join(", ")}`);

  // Commit + push only the timestamp file so Vercel redeploys with the new date.
  try {
    await run("git", ["add", "data/rebates/last-verified.json"], { cwd: ROOT });
    const { stdout } = await run("git", ["status", "--porcelain", "data/rebates/last-verified.json"], { cwd: ROOT });
    if (stdout.trim()) {
      const date = payload.checkedAt.slice(0, 10);
      await run("git", ["commit", "-m", `chore: weekly rebate link verification ${date} (${payload.reachable}/${payload.total} live)`], { cwd: ROOT });
      await run("git", ["push", "origin", "main"], { cwd: ROOT });
      console.log("[verify-rebates] pushed timestamp update → Vercel will redeploy");
    } else {
      console.log("[verify-rebates] no change to commit");
    }
  } catch (e) {
    console.error("[verify-rebates] git step skipped:", String(e.message || e).split("\n")[0]);
  }
}

main().catch((e) => { console.error("[verify-rebates] FATAL", e); process.exit(1); });
