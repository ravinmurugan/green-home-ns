"use client";

import { useState, FormEvent } from "react";
import {
  ChevronRight, ArrowLeft, Loader2, CheckCircle2,
  MapPin, Thermometer, Flame, Clock, User,
} from "lucide-react";

type Step = 0 | 1 | 2 | 3 | 4;

const SERVICES = ["Heat Pump", "Solar", "Both"] as const;
const HEAT_SOURCES = ["Oil", "Electric baseboard", "Propane", "Natural gas", "Other"] as const;
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just researching"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuoteForm() {
  const [step, setStep] = useState<Step>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [postal, setPostal] = useState("");
  const [service, setService] = useState<string>("");
  const [heatSource, setHeatSource] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const contactValid =
    name.trim() !== "" && EMAIL_RE.test(email) && phone.trim() !== "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!contactValid || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "installer-lead",
          installerSlug: "general-quote",
          installerName: "GreenHomeNS Matching",
          name,
          email,
          phone,
          postal,
          service: service || "Not specified",
          message: `Heat source: ${heatSource || "n/a"} | Timeline: ${timeline || "n/a"}`,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border-2 border-green-200 rounded-2xl p-8 text-center shadow-sm">
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">You&apos;re matched!</h2>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          We&apos;ve received your request. A top-rated installer in your area will reach out within
          1–2 business days with a free quote and rebate guidance.
        </p>
        <a
          href="/installers"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Browse Rated Installers <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  const totalSteps = 5;
  const progress = Math.round((step / totalSteps) * 100);

  function OptionGrid({
    options, value, onPick,
  }: { options: readonly string[]; value: string; onPick: (v: string) => void }) {
    return (
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onPick(opt)}
            className={`flex items-center justify-between p-4 border-2 rounded-xl text-left transition-all ${
              value === opt
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-500 hover:bg-green-50"
            }`}
          >
            <span className="font-semibold">{opt}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}

        {/* Step 1: Postal code */}
        {step === 0 && (
          <div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
              <MapPin className="w-4 h-4" /> Your location
            </div>
            <h2 className="text-xl font-bold mb-2">What&apos;s your postal code?</h2>
            <p className="text-sm text-gray-600 mb-6">We use this to match you with installers serving your area.</p>
            <input
              type="text"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="e.g. B3H 1A1"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none mb-5"
            />
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Service */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
              <Thermometer className="w-4 h-4" /> What you need
            </div>
            <h2 className="text-xl font-bold mb-6">What service are you looking for?</h2>
            <OptionGrid options={SERVICES} value={service} onPick={(v) => { setService(v); setStep(2); }} />
          </div>
        )}

        {/* Step 3: Heat source */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
              <Flame className="w-4 h-4" /> Current setup
            </div>
            <h2 className="text-xl font-bold mb-6">How do you currently heat your home?</h2>
            <OptionGrid options={HEAT_SOURCES} value={heatSource} onPick={(v) => { setHeatSource(v); setStep(3); }} />
          </div>
        )}

        {/* Step 4: Timeline */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
              <Clock className="w-4 h-4" /> Timeline
            </div>
            <h2 className="text-xl font-bold mb-6">When are you looking to install?</h2>
            <OptionGrid options={TIMELINES} value={timeline} onPick={(v) => { setTimeline(v); setStep(4); }} />
          </div>
        )}

        {/* Step 5: Contact */}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
              <User className="w-4 h-4" /> Almost done
            </div>
            <h2 className="text-xl font-bold mb-1">Where should we send your matches?</h2>
            <p className="text-sm text-gray-600 mb-6">A top-rated installer will contact you with a free quote.</p>
            <div className="space-y-3">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!contactValid || status === "loading"}
              className="w-full mt-5 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Get My Free Matches
            </button>
            {status === "error" && (
              <p className="text-xs text-red-600 text-center mt-3">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
