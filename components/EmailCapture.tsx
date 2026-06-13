"use client";

import { useState, FormEvent } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

interface Props {
  source: string;
  heading?: string;
  sub?: string;
  cta?: string;
  variant?: "band" | "inline";
}

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture({
  source,
  heading = "Get NS rebate alerts + new installer ratings",
  sub = "Free, occasional emails. Unsubscribe anytime.",
  cta = "Notify Me",
  variant = "band",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "email", email, source }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const success = status === "success";

  if (variant === "inline") {
    return (
      <div>
        {success ? (
          <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
            <Check className="w-4 h-4 shrink-0" />
            You&apos;re on the list — we&apos;ll send NS rebate updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              {cta}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-xs text-red-600 mt-2">Something went wrong. Please try again.</p>
        )}
      </div>
    );
  }

  // band variant
  return (
    <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white rounded-2xl px-6 py-10 md:px-10 md:py-12">
      <div className="max-w-xl mx-auto text-center">
        {success ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/30 border border-green-400/40 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-200" />
            </div>
            <h3 className="text-xl font-bold">You&apos;re on the list</h3>
            <p className="text-green-100 text-sm">
              We&apos;ll send NS rebate updates and alert you when programs change.
            </p>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 bg-green-600/40 border border-green-500/30 rounded-full px-3 py-1 text-sm mb-4">
              <Mail className="w-3.5 h-3.5" />
              Rebate Alerts
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{heading}</h3>
            <p className="text-green-100 text-sm mb-6">{sub}</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full pl-9 pr-3 py-3 rounded-xl border border-transparent text-gray-900 text-sm focus:ring-2 focus:ring-green-300 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-green-800 hover:bg-green-50 disabled:opacity-60 font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {cta}
              </button>
            </form>
            {status === "error" && (
              <p className="text-xs text-red-200 mt-3">Something went wrong. Please try again.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
