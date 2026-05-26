"use client";

import { useState } from "react";
import { CheckCircle2, Circle, AlertTriangle, ChevronRight } from "lucide-react";

type HeatSource = "oil" | "other";
type IncomeLevel = "low" | "moderate" | "market";

interface Step {
  title: string;
  desc: string;
  warning?: string;
  duration?: string;
  critical?: boolean;
}

function getSequence(heatSource: HeatSource, income: IncomeLevel): Step[] {
  if (heatSource === "oil" && (income === "low" || income === "moderate")) {
    return [
      {
        title: "Check OHPA eligibility FIRST",
        desc: "Visit canada.ca/heat-pump-grant and complete the eligibility check. Do NOT skip this step — choosing equipment before program approval is the #1 mistake that costs NS homeowners their rebate.",
        warning: "Do not contact installers or select equipment yet.",
        duration: "15 min online",
        critical: true,
      },
      {
        title: "Apply to OHPA and get pre-approval",
        desc: "Submit your OHPA application with proof of oil heating (delivery receipts showing 500L+) and income documentation. Wait for written pre-approval before proceeding.",
        duration: "2–4 weeks",
        critical: true,
      },
      {
        title: "Book your pre-install EnerGuide assessment",
        desc: "Contact an NRCan-registered energy advisor to assess your home before installation. This pre-install assessment is required for the federal grant and covered up to $600 under OHPA.",
        duration: "1–2 weeks to book",
      },
      {
        title: "Get 3 quotes from ENS-approved installers",
        desc: "Only use installers on the Efficiency Nova Scotia approved list. Request quotes that specify the exact brand and model number — you'll need this for AHRI eligibility verification.",
        duration: "1–2 weeks",
      },
      {
        title: "Verify equipment is on the AHRI list",
        desc: "The heat pump model must appear on the AHRI Certified directory AND meet the minimum HSPF2 rating (≥ 7.5 for cold-climate units). Confirm with your installer before signing.",
        warning: "Wrong equipment = lost rebate. Verify AHRI eligibility before signing any contract.",
        critical: true,
      },
      {
        title: "Sign contract and schedule installation",
        desc: "Installer pulls the required electrical permit. If your panel needs upgrading, OHPA covers this under the program. Confirm what is included in the installation quote.",
        duration: "1–3 days install",
      },
      {
        title: "Post-install EnerGuide assessment",
        desc: "Book your post-installation energy assessment with the same NRCan advisor. This must be completed within the program's window (typically 180 days of pre-assessment).",
        duration: "Within 6 months of pre-assessment",
        critical: true,
      },
      {
        title: "Submit completion documents",
        desc: "Gather: installer invoice, AHRI certificate, pre and post EnerGuide reports, oil receipts, and income documentation. Submit through the OHPA portal. Federal rebate arrives by cheque in 6–12 weeks.",
        duration: "6–12 weeks for payment",
      },
    ];
  }

  if (heatSource === "oil" && income === "market") {
    return [
      {
        title: "Apply to Efficiency NS Home Energy Assessment (HEA) program",
        desc: "Contact Efficiency NS (1-877-999-6035) to apply for the standard HEA rebate pathway. At market income, OHPA may not apply but the ENS rebate (up to $3,000) is still available.",
        duration: "15 min",
      },
      {
        title: "Book pre-install EnerGuide assessment",
        desc: "Required for the ENS rebate. Contact an NRCan-registered energy advisor in your area.",
        duration: "1–2 weeks to book",
        critical: true,
      },
      {
        title: "Get 3 quotes from ENS-approved installers",
        desc: "Use the Efficiency NS approved installer list. Request quotes with exact model numbers. Cold-climate units only (HSPF2 ≥ 7.5).",
        duration: "1–2 weeks",
      },
      {
        title: "Verify AHRI eligibility for chosen unit",
        desc: "Confirm model is on the AHRI directory before signing. This step is critical for rebate eligibility.",
        warning: "Non-AHRI listed equipment is not eligible for ENS rebates.",
        critical: true,
      },
      {
        title: "Installation",
        desc: "Installer pulls electrical permit. Typical mini-split installs take 1 day. Central systems take 2–3 days.",
        duration: "1–3 days",
      },
      {
        title: "Post-install EnerGuide assessment",
        desc: "Required to claim the ENS rebate. Book within the program window.",
        duration: "Within 90 days of install",
        critical: true,
      },
      {
        title: "Rebate claim processed",
        desc: "Your ENS-approved installer submits the rebate claim on your behalf. ENS processes within 4–6 weeks.",
        duration: "4–6 weeks",
      },
    ];
  }

  // Non-oil heaters
  return [
    {
      title: "Apply through Efficiency NS directly",
      desc: "Contact Efficiency NS (1-877-999-6035) or visit efficiencyns.ca to start the HEA rebate application. Non-oil households are not eligible for OHPA but can access the standard ENS rebate (up to $3,000).",
      duration: "15 min",
    },
    {
      title: "Book pre-install EnerGuide home energy assessment",
      desc: "An NRCan-registered energy advisor assesses your home before any work begins. This step is mandatory for the ENS rebate.",
      duration: "1–2 weeks to book",
      critical: true,
    },
    {
      title: "Get 3 quotes from ENS-approved installers",
      desc: "Find installers on the official Efficiency NS approved list. Ask for quotes specifying exact model and brand.",
      duration: "1–2 weeks",
    },
    {
      title: "Confirm AHRI eligibility of chosen equipment",
      desc: "The selected heat pump must be AHRI certified and meet HSPF2 ≥ 7.5. Verify with your installer before signing.",
      warning: "Non-compliant equipment disqualifies your rebate.",
      critical: true,
    },
    {
      title: "Schedule and complete installation",
      desc: "Installer handles permits. Keep all invoices with model numbers and serial numbers — required for rebate submission.",
      duration: "1–3 days",
    },
    {
      title: "Book post-install EnerGuide assessment",
      desc: "Required to finalize your ENS rebate claim. Must be completed within the program window.",
      duration: "Within 90 days",
      critical: true,
    },
    {
      title: "Rebate processed by Efficiency NS",
      desc: "ENS-approved installer submits on your behalf. Rebate credited within 4–6 weeks of approval.",
      duration: "4–6 weeks",
    },
  ];
}

export default function RebateGuidePage() {
  const [heatSource, setHeatSource] = useState<HeatSource | null>(null);
  const [income, setIncome] = useState<IncomeLevel | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const steps = heatSource && income ? getSequence(heatSource, income) : [];
  const completedCount = completedSteps.size;
  const totalSteps = steps.length;
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  function toggleStep(i: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <CheckCircle2 className="w-4 h-4" />
          Step-by-Step Rebate Guide
        </div>
        <h1 className="text-3xl font-bold mb-2">NS Rebate Sequencing Wizard</h1>
        <p className="text-gray-600">The #1 mistake is doing steps out of order. Get your exact sequence — wrong order = lost rebate.</p>
      </div>

      {/* Config */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="font-bold mb-4">Tell us about your situation</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Current heating source</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: "oil", label: "🛢️ Heating Oil" },
                { value: "other", label: "⚡ Electric / Propane / Other" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setHeatSource(opt.value); setCompletedSteps(new Set()); }}
                  className={`p-3 border-2 rounded-xl text-sm font-semibold transition-all ${
                    heatSource === opt.value
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Household income</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "low", label: "Under $40K" },
                { value: "moderate", label: "$40K–$100K" },
                { value: "market", label: "Over $100K" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setIncome(opt.value); setCompletedSteps(new Set()); }}
                  className={`p-3 border-2 rounded-xl text-sm font-semibold transition-all ${
                    income === opt.value
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <>
          {/* Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold">Your progress</span>
              <span className="text-green-600 font-bold">{completedCount} of {totalSteps} steps done</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {completedCount === totalSteps && (
              <div className="mt-3 text-center text-green-700 font-bold text-sm">
                ✓ All steps complete — your rebate should be on its way!
              </div>
            )}
          </div>

          <div className="space-y-3">
            {steps.map((step, i) => {
              const done = completedSteps.has(i);
              return (
                <div
                  key={i}
                  className={`border-2 rounded-xl p-4 transition-all ${
                    done
                      ? "border-green-400 bg-green-50"
                      : step.critical
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button onClick={() => toggleStep(i)} className="shrink-0 mt-0.5">
                      {done ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className={`font-bold text-sm ${done ? "line-through text-gray-400" : ""}`}>
                          Step {i + 1}: {step.title}
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          {step.critical && !done && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Critical</span>
                          )}
                          {step.duration && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{step.duration}</span>
                          )}
                        </div>
                      </div>
                      {!done && (
                        <>
                          <p className="text-sm text-gray-700 leading-relaxed mb-2">{step.desc}</p>
                          {step.warning && (
                            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <p className="text-xs text-amber-800 font-medium">{step.warning}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/tools/rebate-quiz"
              className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-xl text-center text-sm hover:bg-green-700 transition-colors"
            >
              Check Rebate Amounts →
            </a>
            <a
              href="/installers?service=heat-pump"
              className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl text-sm text-center hover:bg-gray-50 transition-colors"
            >
              Find ENS-Approved Installers
            </a>
          </div>
        </>
      )}

      {!heatSource || !income ? (
        <div className="text-center py-8 text-gray-600">
          <ChevronRight className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Select your heat source and income above to see your personalized rebate sequence.</p>
        </div>
      ) : null}
    </main>
  );
}
