"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, DollarSign, AlertCircle, ArrowLeft, Flame, Zap, Droplets, Thermometer, Home, Key, Gauge } from "lucide-react";

type Step = "heat-source" | "ownership" | "income" | "oil-usage" | "result";

interface Answers {
  heatSource: "oil" | "baseboard" | "propane" | "other" | null;
  ownership: "own" | "rent" | null;
  income: "under40" | "40to75" | "75to100" | "over100" | null;
  oilLitres: "under500" | "500to1000" | "over1000" | null;
}

interface Program {
  name: string;
  provider: string;
  amount: number;
  color: string;
  badge: string;
  note: string;
  sequence: string[];
}

function calcPrograms(answers: Answers): Program[] {
  const programs: Program[] = [];
  const { heatSource, ownership, income, oilLitres } = answers;

  // OHPA — oil heaters only, homeowners only
  if (heatSource === "oil" && ownership === "own" && oilLitres !== "under500") {
    let ohpaAmount = 0;
    let ohpaBadge = "";
    let ohpaNote = "";

    if (income === "under40") {
      ohpaAmount = 15000;
      ohpaBadge = "Maximum benefit";
      ohpaNote = "Federal $10,000 + NS provincial match $5,000. Covers heat pump + electrical panel upgrades.";
    } else if (income === "40to75") {
      ohpaAmount = 10000;
      ohpaBadge = "High benefit";
      ohpaNote = "Federal $10,000 grant. Apply before choosing equipment.";
    } else if (income === "75to100") {
      ohpaAmount = 5000;
      ohpaBadge = "Partial benefit";
      ohpaNote = "Reduced federal grant based on income. Confirm exact amount at canada.ca/heat-pump-grant.";
    }

    if (ohpaAmount > 0) {
      programs.push({
        name: "Oil to Heat Pump Affordability (OHPA)",
        provider: "Federal + Nova Scotia Government",
        amount: ohpaAmount,
        color: "border-green-500 bg-green-50",
        badge: ohpaBadge,
        note: ohpaNote,
        sequence: [
          "Verify income eligibility at canada.ca/heat-pump-grant",
          "Apply to OHPA — get pre-approval BEFORE installation",
          "Book EnerGuide pre-assessment (free under this program)",
          "Get 3 quotes from ENS-approved installers",
          "Select AHRI-listed cold-climate unit",
          "Installation + electrical upgrades if needed",
          "Submit completion documents for rebate",
        ],
      });
    }
  }

  // ENS standard rebate — all homeowners
  if (ownership === "own") {
    programs.push({
      name: "Efficiency NS Heat Pump Rebate",
      provider: "Efficiency Nova Scotia",
      amount: 3000,
      color: "border-blue-500 bg-blue-50",
      badge: "Available to all homeowners",
      note: "Requires ENS-approved installer and cold-climate rated unit (HSPF2 ≥ 7.5). Stackable with OHPA.",
      sequence: [
        "Book EnerGuide home energy assessment (pre-install)",
        "Get quotes only from ENS-approved installers",
        "Install cold-climate heat pump (HSPF2 ≥ 7.5)",
        "Book post-install EnerGuide assessment",
        "Installer submits rebate claim on your behalf",
      ],
    });
  }

  // Moderate Income Rebate
  if (ownership === "own" && (income === "under40" || income === "40to75")) {
    programs.push({
      name: "Moderate Income Rebate (MIR)",
      provider: "Efficiency Nova Scotia",
      amount: 15000,
      color: "border-purple-500 bg-purple-50",
      badge: income === "under40" ? "Likely eligible" : "May be eligible",
      note: "Income threshold varies. Can cover heat pump, insulation, windows. Check eligibility at efficiencyns.ca.",
      sequence: [
        "Apply through Efficiency NS — income verification required",
        "Book home energy assessment",
        "Choose from approved upgrade list (heat pump, insulation, etc.)",
        "Contractor installs approved equipment",
        "ENS processes rebate directly",
      ],
    });
  }

  // Renters / low income
  if (ownership === "rent" || income === "under40") {
    programs.push({
      name: "Heating Assistance Rebate Program",
      provider: "Nova Scotia Government",
      amount: 1000,
      color: "border-amber-500 bg-amber-50",
      badge: "For low-income households",
      note: "Annual rebate on heating costs. Also check with your landlord — heat pump retrofits may qualify for separate programs.",
      sequence: [
        "Apply at novascotia.ca/heating-assistance",
        "Provide income documentation",
        "Rebate applied as bill credit or cheque",
      ],
    });
  }

  return programs;
}

const STEPS: Step[] = ["heat-source", "ownership", "income", "oil-usage", "result"];

export default function RebateQuizPage() {
  const [step, setStep] = useState<Step>("heat-source");
  const [answers, setAnswers] = useState<Answers>({
    heatSource: null,
    ownership: null,
    income: null,
    oilLitres: null,
  });

  const stepIndex = STEPS.indexOf(step);
  const totalSteps = answers.heatSource === "oil" ? 5 : 4;
  const progress = Math.round((stepIndex / (totalSteps - 1)) * 100);

  function next(nextStep: Step) {
    setStep(nextStep);
  }

  function back() {
    if (step === "ownership") setStep("heat-source");
    else if (step === "income") setStep("ownership");
    else if (step === "oil-usage") setStep("income");
    else if (step === "result") setStep(answers.heatSource === "oil" ? "oil-usage" : "income");
  }

  function reset() {
    setStep("heat-source");
    setAnswers({ heatSource: null, ownership: null, income: null, oilLitres: null });
  }

  const programs = step === "result" ? calcPrograms(answers) : [];
  const totalMax = programs.reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <DollarSign className="w-4 h-4" />
          NS Rebate Eligibility — 2026
        </div>
        <h1 className="text-3xl font-bold mb-2">Which Rebates Do You Qualify For?</h1>
        <p className="text-gray-600">Answer 4 questions — see your exact NS programs and maximum rebate amount.</p>
      </div>

      {step !== "result" && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Step {stepIndex + 1} of {totalSteps}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {step !== "heat-source" && step !== "result" && (
          <button onClick={back} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}

        {/* Step 1: Heat source */}
        {step === "heat-source" && (
          <div>
            <h2 className="text-xl font-bold mb-6">What do you currently use to heat your home?</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "oil", label: "Heating Oil (furnace or boiler)", Icon: Gauge, detail: "Fuel oil delivered by truck", iconColor: "text-orange-600 bg-orange-50" },
                { value: "baseboard", label: "Electric Baseboard", Icon: Zap, detail: "Standard electric resistance heat", iconColor: "text-yellow-600 bg-yellow-50" },
                { value: "propane", label: "Propane", Icon: Droplets, detail: "Propane tank or line", iconColor: "text-blue-600 bg-blue-50" },
                { value: "other", label: "Natural Gas / Wood / Other", Icon: Flame, detail: "Any other heat source", iconColor: "text-red-500 bg-red-50" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, heatSource: opt.value as Answers["heatSource"] }));
                    next("ownership");
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.iconColor}`}>
                    <opt.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-green-700">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.detail}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Ownership */}
        {step === "ownership" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Do you own or rent your home?</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "own", label: "I own my home", Icon: Home, detail: "Freehold or condo ownership", iconColor: "text-green-600 bg-green-50" },
                { value: "rent", label: "I rent my home", Icon: Key, detail: "Tenant — landlord owns the property", iconColor: "text-gray-600 bg-gray-100" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, ownership: opt.value as Answers["ownership"] }));
                    next("income");
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.iconColor}`}>
                    <opt.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-green-700">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.detail}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Income */}
        {step === "income" && (
          <div>
            <h2 className="text-xl font-bold mb-2">What is your household annual income?</h2>
            <p className="text-sm text-gray-600 mb-6">Combined income of all adults in your household. Used to determine program eligibility — not shared.</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "under40", label: "Under $40,000", detail: "Maximum rebate programs available" },
                { value: "40to75", label: "$40,000 – $75,000", detail: "Most programs available" },
                { value: "75to100", label: "$75,000 – $100,000", detail: "Some programs available" },
                { value: "over100", label: "Over $100,000", detail: "Standard ENS rebate available" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    const a = { ...answers, income: opt.value as Answers["income"] };
                    setAnswers(a);
                    if (a.heatSource === "oil") next("oil-usage");
                    else next("result");
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-green-700">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.detail}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Oil usage (oil heaters only) */}
        {step === "oil-usage" && (
          <div>
            <h2 className="text-xl font-bold mb-2">How much heating oil do you use per year?</h2>
            <p className="text-sm text-gray-600 mb-6">Check your last 12 months of delivery receipts. The OHPA program requires at least 500 litres.</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "under500", label: "Less than 500 litres", detail: "Below OHPA minimum threshold" },
                { value: "500to1000", label: "500 – 1,000 litres", detail: "Typical NS home with some oil heat" },
                { value: "over1000", label: "Over 1,000 litres", detail: "Oil as primary heat source" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, oilLitres: opt.value as Answers["oilLitres"] }));
                    next("result");
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-green-700">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.detail}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {step === "result" && (
          <div>
            <button onClick={back} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {programs.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Limited Rebates Available</h2>
                <p className="text-gray-600">Based on your answers, standard rebate programs may not apply. Contact Efficiency NS directly at 1-877-999-6035 for custom guidance.</p>
              </div>
            ) : (
              <>
                {/* Total banner */}
                <div className="bg-green-600 text-white rounded-xl p-5 mb-6 text-center">
                  <div className="text-sm font-medium text-green-100 mb-1">Your estimated maximum rebate</div>
                  <div className="text-5xl font-bold">${totalMax.toLocaleString()}</div>
                  <div className="text-sm text-green-100 mt-1">across {programs.length} program{programs.length > 1 ? "s" : ""}</div>
                </div>

                {/* Visual stacking bars */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Rebate breakdown</div>
                  <div className="space-y-2">
                    {programs.map((p) => (
                      <div key={p.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 font-medium truncate pr-2">{p.name}</span>
                          <span className="font-bold text-green-700 shrink-0">${p.amount.toLocaleString()}</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${Math.round((p.amount / totalMax) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Program cards */}
                <div className="space-y-4 mb-6">
                  {programs.map((p) => (
                    <div key={p.name} className={`border-2 rounded-xl p-4 ${p.color}`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="font-bold text-sm">{p.name}</div>
                          <div className="text-xs text-gray-600">{p.provider}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xl font-bold text-green-700">${p.amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">{p.badge}</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-3">{p.note}</p>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Steps to claim:</div>
                      <ol className="space-y-1">
                        {p.sequence.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <span className="w-4 h-4 rounded-full bg-green-600 text-white text-xs flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
                            {s}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-6">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    <strong>Rebate amounts are estimates.</strong> Programs change frequently. Always verify current amounts and eligibility at <strong>efficiencyns.ca</strong> or call 1-877-999-6035 before starting any work.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/installers?service=heat-pump"
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-xl text-center text-sm hover:bg-green-700 transition-colors"
                  >
                    Find ENS-Approved Installers →
                  </a>
                  <button
                    onClick={reset}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-600 text-center mt-4">
        Results are estimates based on 2026 program guidelines. Not financial advice.
      </p>
    </main>
  );
}
