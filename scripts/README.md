# GreenHomeNS automation

## Weekly rebate-link verification agent

`verify-rebates.mjs` is the real "automated agent" referenced in the site footer.

**What it does**
1. Parses every rebate program URL from `data/rebates/programs.ts`.
2. HTTP-checks each official program page is reachable (HEAD, falls back to GET).
3. Writes `data/rebates/last-verified.json` (`checkedAt`, per-program `ok`/`status`).
4. If the file changed, commits + pushes `main` so Vercel redeploys with a fresh "Last checked" date in the footer (`lib/rebate-status.ts` → `components/Footer.tsx`).

**Schedule** — launchd, Sundays 9:00 AM:
`~/Library/LaunchAgents/com.rio.greenhomens-rebates.plist`

```bash
# manage
launchctl load   ~/Library/LaunchAgents/com.rio.greenhomens-rebates.plist
launchctl unload ~/Library/LaunchAgents/com.rio.greenhomens-rebates.plist
launchctl list | grep greenhomens
# run now
node scripts/verify-rebates.mjs
```

Logs: `scripts/logs/verify-rebates.log`.

**Note:** a dead link in the log usually means the gov site blocks bots or moved the
page — review and update the `url` in `data/rebates/programs.ts` when that happens.
As of last run, 4 URLs returned 404/blocked: ns-power-net-metering, nb-power-heat-pump,
nl-heat-pump, enbridge-her-plus (verify + refresh these).
