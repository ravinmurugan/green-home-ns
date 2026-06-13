"use client";

import { useState } from "react";
import {
  CheckCircle2, ChevronRight, DollarSign, AlertCircle, ArrowLeft,
  Flame, Zap, Droplets, Thermometer, Home, Key, Gauge, MapPin, ExternalLink, RotateCcw,
} from "lucide-react";

type Province = "NS" | "NB" | "PEI" | "NL" | "ON";
type Step = "province" | "heat-source" | "ownership" | "income" | "oil-usage" | "result";

interface Answers {
  province: Province | null;
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
  applyUrl: string;
  applyLabel: string;
}

interface RoadmapStep {
  label: string;
  detail: string;
  critical?: boolean;
}

const provinceNames: Record<Province, string> = {
  NS: "Nova Scotia", NB: "New Brunswick", PEI: "Prince Edward Island",
  NL: "Newfoundland", ON: "Ontario",
};

// ─── Province-specific program logic ─────────────────────────────────────────

function calcPrograms(answers: Answers): Program[] {
  if (!answers.province) return [];
  const { province, heatSource, ownership, income, oilLitres } = answers;
  const programs: Program[] = [];

  // ── Nova Scotia ────────────────────────────────────────────────────────────
  if (province === "NS") {
    if (heatSource === "oil" && ownership === "own" && oilLitres !== "under500") {
      let amount = 0, badge = "", note = "";
      if (income === "under40")    { amount = 15000; badge = "Maximum benefit"; note = "Federal $10,000 + NS provincial match $5,000. Covers heat pump + panel upgrades."; }
      else if (income === "40to75") { amount = 10000; badge = "High benefit";    note = "Federal OHPA $10,000. Apply for pre-approval before choosing equipment."; }
      else if (income === "75to100"){ amount = 5000;  badge = "Partial benefit"; note = "Reduced federal grant based on income. Confirm at canada.ca/heat-pump-grant."; }
      if (amount > 0) {
        programs.push({ name: "Oil to Heat Pump Affordability (OHPA)", provider: "Federal + NS Government", amount, color: "border-green-500 bg-green-50", badge, note, applyUrl: "https://www.canada.ca/en/natural-resources-canada/news/2023/03/oil-to-heat-pump-affordability-program.html", applyLabel: "Apply at canada.ca" });
      }
    }
    if (ownership === "own") {
      programs.push({ name: "Efficiency NS Heat Pump Rebate", provider: "Efficiency Nova Scotia", amount: 3000, color: "border-blue-500 bg-blue-50", badge: "Available to all NS homeowners", note: "Requires ENS-approved installer + cold-climate unit (HSPF2 ≥ 7.5). Stackable with OHPA.", applyUrl: "https://www.efficiencyns.ca/residential/heating-cooling/heat-pumps/", applyLabel: "Apply at efficiencyns.ca" });
    }
    if (ownership === "own" && (income === "under40" || income === "40to75")) {
      programs.push({ name: "Moderate Income Rebate (MIR)", provider: "Efficiency Nova Scotia", amount: 15000, color: "border-purple-500 bg-purple-50", badge: income === "under40" ? "Likely eligible" : "May be eligible", note: "Income threshold varies. Can cover heat pump, insulation, windows. Check eligibility at efficiencyns.ca.", applyUrl: "https://www.efficiencyns.ca/residential/heating-cooling/heat-pumps/", applyLabel: "Check eligibility at efficiencyns.ca" });
    }
    if (ownership === "rent" || income === "under40") {
      programs.push({ name: "Heating Assistance Rebate Program", provider: "Nova Scotia Government", amount: 1000, color: "border-amber-500 bg-amber-50", badge: "For low-income households", note: "Annual rebate on heating costs. Renters: ask landlord — heat pump retrofits may qualify separately.", applyUrl: "https://novascotia.ca/heating-assistance", applyLabel: "Apply at novascotia.ca" });
    }
    if (ownership === "own") {
      programs.push({ name: "Canada Greener Homes Grant — CLOSED", provider: "Government of Canada", amount: 0, color: "border-gray-300 bg-gray-50", badge: "⚠️ Closed Feb 2024", note: "This program is no longer accepting applications. Check canada.ca for any replacement federal heat pump programs.", applyUrl: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html", applyLabel: "Check canada.ca for updates" });
    }
  }

  // ── New Brunswick ──────────────────────────────────────────────────────────
  if (province === "NB") {
    if (ownership === "own") {
      programs.push({ name: "NB Power Smart Saver Heat Pump Rebate", provider: "NB Power", amount: 2000, color: "border-blue-500 bg-blue-50", badge: "NB Power customers", note: "Register at nbpower.com BEFORE installation. Must use NB Power participating installer.", applyUrl: "https://www.nbpower.com/en/save-energy/residential/smart-saver/", applyLabel: "Register at nbpower.com" });
      programs.push({ name: "Canada Greener Homes Grant — CLOSED", provider: "Government of Canada", amount: 0, color: "border-gray-300 bg-gray-50", badge: "⚠️ Closed Feb 2024", note: "This program is no longer accepting applications. Check canada.ca for replacement federal programs.", applyUrl: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html", applyLabel: "Check canada.ca for updates" });
    }
    if (ownership === "rent" || income === "under40") {
      programs.push({ name: "NB Power Low Income Program", provider: "NB Power", amount: 1500, color: "border-amber-500 bg-amber-50", badge: "Low-income households", note: "Qualifying households may receive enhanced support. Contact NB Power directly.", applyUrl: "https://www.nbpower.com/en/save-energy/residential/", applyLabel: "Check at nbpower.com" });
    }
  }

  // ── Prince Edward Island ───────────────────────────────────────────────────
  if (province === "PEI") {
    if (ownership === "own") {
      programs.push({ name: "Island Prosperity Fund — Heat Pump Rebate", provider: "Province of PEI", amount: 2000, color: "border-blue-500 bg-blue-50", badge: "PEI homeowners", note: "Apply at princeedwardisland.ca before installation. Requires certified installer.", applyUrl: "https://www.princeedwardisland.ca/en/topic/energy-efficiency", applyLabel: "Apply at princeedwardisland.ca" });
      programs.push({ name: "Canada Greener Homes Grant — CLOSED", provider: "Government of Canada", amount: 0, color: "border-gray-300 bg-gray-50", badge: "⚠️ Closed Feb 2024", note: "This program is no longer accepting applications. Check canada.ca for replacement federal programs.", applyUrl: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html", applyLabel: "Check canada.ca for updates" });
    }
    if (income === "under40") {
      programs.push({ name: "PEI Energy Efficiency Assistance", provider: "Province of PEI", amount: 1000, color: "border-amber-500 bg-amber-50", badge: "Low-income households", note: "Additional support for qualifying households. Contact Office of Energy Efficiency.", applyUrl: "https://www.princeedwardisland.ca/en/topic/energy-efficiency", applyLabel: "Check at princeedwardisland.ca" });
    }
  }

  // ── Newfoundland ───────────────────────────────────────────────────────────
  if (province === "NL") {
    if (ownership === "own") {
      programs.push({ name: "NL Heat Pump Incentive Program", provider: "Newfoundland Power / NL Hydro", amount: 2000, color: "border-blue-500 bg-blue-50", badge: "NL homeowners", note: "Register with Newfoundland Power or NL Hydro before installation. Cold-climate unit required.", applyUrl: "https://www.newfoundlandpower.com/residential/rebates-and-programs", applyLabel: "Register at newfoundlandpower.com" });
      programs.push({ name: "Canada Greener Homes Grant — CLOSED", provider: "Government of Canada", amount: 0, color: "border-gray-300 bg-gray-50", badge: "⚠️ Closed Feb 2024", note: "This program is no longer accepting applications. Check canada.ca for replacement federal programs.", applyUrl: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html", applyLabel: "Check canada.ca for updates" });
    }
  }

  // ── Ontario ────────────────────────────────────────────────────────────────
  if (province === "ON") {
    if (ownership === "own") {
      programs.push({ name: "Enbridge Home Efficiency Rebate Plus (HER+)", provider: "Enbridge Gas", amount: 5000, color: "border-blue-500 bg-blue-50", badge: "Enbridge Gas customers", note: "For Enbridge Gas customers. Apply through Enbridge portal before installation. Check for local utility programs if not Enbridge.", applyUrl: "https://www.enbridgegas.com/residential/accountservices/homeefficiencyrebate", applyLabel: "Apply at enbridgegas.com" });
      programs.push({ name: "Canada Greener Homes Grant — CLOSED", provider: "Government of Canada", amount: 0, color: "border-gray-300 bg-gray-50", badge: "⚠️ Closed Feb 2024", note: "This program is no longer accepting applications. Check canada.ca for replacement federal programs.", applyUrl: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html", applyLabel: "Check canada.ca for updates" });
    }
    if (income === "under40" || income === "40to75") {
      programs.push({ name: "Ontario Affordability / LEAP Program", provider: "Ontario Energy Board", amount: 1000, color: "border-amber-500 bg-amber-50", badge: "Low-income households", note: "LEAP (Low-income Energy Assistance Program) helps with energy costs. Contact your local utility for referral.", applyUrl: "https://www.oeb.ca/consumer-protection-and-privacy/getting-help-your-energy-bills/low-income-energy-assistance-program", applyLabel: "Check at oeb.ca" });
    }
  }

  return programs;
}

// ─── Province-specific application roadmaps ──────────────────────────────────

function getApplicationRoadmap(answers: Answers): RoadmapStep[] {
  const { province, heatSource, ownership, income, oilLitres } = answers;
  const isOilNS = province === "NS" && heatSource === "oil" && ownership === "own" && oilLitres !== "under500";
  const incomeQualified = income === "under40" || income === "40to75";

  if (province === "NS") {
    if (isOilNS && incomeQualified) {
      return [
        { label: "Verify OHPA is still active at canada.ca", detail: "Federal programs change. Confirm the Oil to Heat Pump Affordability program is accepting applications at canada.ca before taking any action.", critical: true },
        { label: "Apply for OHPA pre-approval FIRST", detail: "Submit your OHPA application and receive pre-approval BEFORE hiring any installer or purchasing equipment. No retroactive approval.", critical: true },
        { label: "Get 3 quotes from ENS-approved installers only", detail: "Only Efficiency NS approved contractors qualify you for the ENS rebate ($3,000). Find rated installers in our directory.", critical: true },
        { label: "Select a cold-climate unit (HSPF2 ≥ 7.5)", detail: "Required for all NS rebate programs. Ask for the AHRI certificate and confirm HSPF2 rating in writing before signing." },
        { label: "Installation + electrical upgrade if needed", detail: "Typical install: 1–3 days. Panel upgrade may add 1–2 days. Installer pulls all permits." },
        { label: "Installer submits ENS rebate on your behalf", detail: "Efficiency NS rebate (up to $3,000) is submitted by your installer post-installation. You don't apply separately." },
        { label: "Submit your OHPA federal claim at canada.ca", detail: "Submit with proof of installation and installer receipts. Federal rebate arrives by cheque in 6–12 weeks." },
        { label: "Check canada.ca for any additional active federal programs", detail: "Federal landscape changes frequently. The Greener Homes Grant closed Feb 2024 — verify whether any replacement program is now active." },
        { label: "Wait for rebates", detail: "ENS: 4–8 weeks. Federal OHPA: 6–12 weeks by cheque." },
      ];
    }
    if (ownership === "own") {
      return [
        { label: "Get quotes from ENS-approved installers only", detail: "Only ENS-approved contractors qualify you for the provincial rebate. Non-approved installer = lose $3,000.", critical: true },
        { label: "Select a cold-climate unit (HSPF2 ≥ 7.5)", detail: "Required for the ENS rebate. Confirm HSPF2 rating in your quote in writing before signing." },
        { label: "Installation day (1–3 days)", detail: "Installer pulls electrical permits. Mini-splits typically 1 day; central ducted 2–3 days." },
        { label: "ENS rebate submitted by your installer", detail: "Up to $3,000 submitted automatically by your installer post-install. You don't apply separately." },
        { label: "Check canada.ca for any active federal heat pump programs", detail: "The Greener Homes Grant closed Feb 2024. Verify whether any federal replacement program is accepting applications." },
        { label: "Wait for ENS rebate", detail: "Efficiency NS rebate: 4–8 weeks by direct deposit or cheque." },
      ];
    }
  }

  if (province === "NB") {
    return [
      { label: "Register with NB Power Smart Saver BEFORE any work", detail: "Go to nbpower.com/smartsaver and register before hiring a contractor. Retroactive claims are NOT accepted.", critical: true },
      { label: "Get quotes from NB Power participating installers only", detail: "Only installers listed in the NB Power program qualify for the Smart Saver rebate. Confirm before signing.", critical: true },
      { label: "Select a cold-climate heat pump (HSPF2 ≥ 7.5)", detail: "Required for maximum rebate eligibility. Confirm rating in your quote in writing." },
      { label: "Installation (1–3 days)", detail: "Your installer pulls all required permits. NB requires electrical inspection post-install." },
      { label: "NB Power rebate submitted through installer or portal", detail: "Up to $2,000. Your installer may handle this or you submit at nbpower.com/smartsaver." },
      { label: "Check canada.ca for any active federal programs", detail: "The Greener Homes Grant closed Feb 2024. Verify whether any federal replacement is now accepting applications." },
      { label: "Wait for rebate", detail: "NB Power Smart Saver: 4–8 weeks." },
    ];
  }

  if (province === "PEI") {
    return [
      { label: "Apply to Island Prosperity Fund BEFORE installation", detail: "Visit princeedwardisland.ca/energy and submit your application before any work begins. Retroactive not accepted.", critical: true },
      { label: "Get quotes from certified PEI installers only", detail: "Ask each installer to confirm they are approved under the Island Prosperity Fund program.", critical: true },
      { label: "Select approved cold-climate equipment", detail: "Confirm equipment is on the approved product list for the Island Prosperity Fund before signing." },
      { label: "Installation (1–3 days)", detail: "Installer pulls permits. Maritime Electric may require notification for electrical changes." },
      { label: "Submit Island Prosperity Fund claim", detail: "Through princeedwardisland.ca/energy. Installer may assist with paperwork." },
      { label: "Check canada.ca for any active federal programs", detail: "The Greener Homes Grant closed Feb 2024. Verify whether any federal replacement is now active." },
      { label: "Wait for provincial rebate", detail: "Island Prosperity Fund: 6–10 weeks." },
    ];
  }

  if (province === "NL") {
    return [
      { label: "Register for NL Heat Pump Incentive BEFORE installation", detail: "Register at newfoundlandpower.com or nlhydro.com depending on your utility. Must be pre-approved.", critical: true },
      { label: "Get quotes from certified NL installers only", detail: "Confirm the installer is registered under the provincial incentive program before signing any quote.", critical: true },
      { label: "Select a cold-climate heat pump (HSPF2 ≥ 7.5)", detail: "Required for the NL incentive program. Get the HSPF2 rating in writing from your installer." },
      { label: "Installation (1–3 days)", detail: "Installer handles permits and any utility notification requirements." },
      { label: "Submit NL incentive through your utility portal", detail: "Newfoundland Power or NL Hydro — through their online rebate portal with proof of install." },
      { label: "Check canada.ca for any active federal programs", detail: "The Greener Homes Grant closed Feb 2024. Verify whether any federal replacement is now accepting applications." },
      { label: "Wait for rebate", detail: "NL utility incentive: 6–10 weeks." },
    ];
  }

  if (province === "ON") {
    return [
      { label: "Apply to Enbridge HER+ portal BEFORE installation", detail: "If you're an Enbridge Gas customer, apply at enbridgegas.com/her BEFORE any work. Retroactive not accepted.", critical: true },
      { label: "Get quotes from Enbridge-approved installers only", detail: "Enbridge HER+ requires approved contractors. Check the Enbridge installer list before signing any quote.", critical: true },
      { label: "Select a cold-climate heat pump (HSPF2 ≥ 7.5)", detail: "Required for Enbridge HER+. Confirm HSPF2 rating in writing before signing." },
      { label: "Installation (1–3 days)", detail: "Installer handles all permits. ESA electrical inspection required post-install in Ontario." },
      { label: "Submit Enbridge HER+ claim", detail: "Through the Enbridge portal with proof of installation. Processed in 4–8 weeks." },
      { label: "Check canada.ca for any active federal programs", detail: "The Greener Homes Grant closed Feb 2024. Verify whether any federal replacement is now accepting applications." },
      { label: "Wait for rebate", detail: "Enbridge HER+: 4–8 weeks. Any federal program: timing varies — check at canada.ca." },
    ];
  }

  return [];
}

// ─── Component ────────────────────────────────────────────────────────────────

const STEPS: Step[] = ["province", "heat-source", "ownership", "income", "oil-usage", "result"];

export default function RebateQuizPage() {
  const [step, setStep] = useState<Step>("province");
  const [answers, setAnswers] = useState<Answers>({
    province: null, heatSource: null, ownership: null, income: null, oilLitres: null,
  });

  const stepIndex = STEPS.indexOf(step);
  const showOilStep = answers.heatSource === "oil";
  const totalSteps = showOilStep ? 5 : 4;
  const questionStepIndex = Math.max(0, stepIndex - 0);
  const progress = step === "result" ? 100 : Math.round((questionStepIndex / totalSteps) * 100);

  function next(nextStep: Step) { setStep(nextStep); }

  function back() {
    if (step === "heat-source") setStep("province");
    else if (step === "ownership") setStep("heat-source");
    else if (step === "income") setStep("ownership");
    else if (step === "oil-usage") setStep("income");
    else if (step === "result") setStep(answers.heatSource === "oil" ? "oil-usage" : "income");
  }

  function reset() {
    setStep("province");
    setAnswers({ province: null, heatSource: null, ownership: null, income: null, oilLitres: null });
  }

  const programs = step === "result" ? calcPrograms(answers) : [];
  const roadmap = step === "result" ? getApplicationRoadmap(answers) : [];
  const totalMax = programs.reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <DollarSign className="w-4 h-4" />
          Green Energy Rebate Eligibility — 2026
        </div>
        <h1 className="text-3xl font-bold mb-2">Which Rebates Do You Qualify For?</h1>
        <p className="text-gray-600">Answer {totalSteps} questions — see your exact programs, amounts, and step-by-step application process.</p>
      </div>

      {step !== "result" && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Step {stepIndex + 1} of {totalSteps + 1}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {step !== "province" && step !== "result" && (
          <button onClick={back} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}

        {/* Step 1: Province */}
        {step === "province" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Which province are you in?</h2>
            <p className="text-sm text-gray-600 mb-6">Rebate programs and amounts vary significantly by province.</p>
            <div className="grid grid-cols-1 gap-3">
              {(["NS", "NB", "PEI", "NL", "ON"] as Province[]).map((prov) => {
                const maxRebates: Record<Province, string> = { NS: "Up to $13,000", NB: "Up to $7,000", PEI: "Up to $7,000", NL: "Up to $7,000", ON: "Up to $10,000" };
                return (
                  <button
                    key={prov}
                    onClick={() => { setAnswers((a) => ({ ...a, province: prov })); next("heat-source"); }}
                    className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold group-hover:text-green-700">{provinceNames[prov]}</div>
                      <div className="text-sm text-gray-600">{maxRebates[prov]} in stacked rebates</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Heat source */}
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
                <button key={opt.value} onClick={() => { setAnswers((a) => ({ ...a, heatSource: opt.value as Answers["heatSource"] })); next("ownership"); }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.iconColor}`}><opt.Icon className="w-5 h-5" /></div>
                  <div><div className="font-semibold group-hover:text-green-700">{opt.label}</div><div className="text-sm text-gray-600">{opt.detail}</div></div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Ownership */}
        {step === "ownership" && (
          <div>
            <h2 className="text-xl font-bold mb-6">Do you own or rent your home?</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "own", label: "I own my home", Icon: Home, detail: "Freehold or condo ownership", iconColor: "text-green-600 bg-green-50" },
                { value: "rent", label: "I rent my home", Icon: Key, detail: "Tenant — landlord owns the property", iconColor: "text-gray-600 bg-gray-100" },
              ].map((opt) => (
                <button key={opt.value} onClick={() => { setAnswers((a) => ({ ...a, ownership: opt.value as Answers["ownership"] })); next("income"); }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.iconColor}`}><opt.Icon className="w-5 h-5" /></div>
                  <div><div className="font-semibold group-hover:text-green-700">{opt.label}</div><div className="text-sm text-gray-600">{opt.detail}</div></div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Income */}
        {step === "income" && (
          <div>
            <h2 className="text-xl font-bold mb-2">What is your household annual income?</h2>
            <p className="text-sm text-gray-600 mb-6">Combined income of all adults. Used only to determine program eligibility.</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "under40", label: "Under $40,000", detail: "Maximum rebate programs available" },
                { value: "40to75", label: "$40,000 – $75,000", detail: "Most programs available" },
                { value: "75to100", label: "$75,000 – $100,000", detail: "Some programs available" },
                { value: "over100", label: "Over $100,000", detail: "Standard rebates available" },
              ].map((opt) => (
                <button key={opt.value} onClick={() => { const a = { ...answers, income: opt.value as Answers["income"] }; setAnswers(a); if (a.heatSource === "oil" && a.province === "NS") next("oil-usage"); else next("result"); }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0"><DollarSign className="w-5 h-5" /></div>
                  <div><div className="font-semibold group-hover:text-green-700">{opt.label}</div><div className="text-sm text-gray-600">{opt.detail}</div></div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Oil usage (NS oil heaters only) */}
        {step === "oil-usage" && (
          <div>
            <h2 className="text-xl font-bold mb-2">How much heating oil do you use per year?</h2>
            <p className="text-sm text-gray-600 mb-6">Check your last 12 months of delivery receipts. OHPA requires at least 500 litres.</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: "under500", label: "Less than 500 litres", detail: "Below OHPA minimum threshold" },
                { value: "500to1000", label: "500 – 1,000 litres", detail: "Typical home with some oil heat" },
                { value: "over1000", label: "Over 1,000 litres", detail: "Oil as primary heat source" },
              ].map((opt) => (
                <button key={opt.value} onClick={() => { setAnswers((a) => ({ ...a, oilLitres: opt.value as Answers["oilLitres"] })); next("result"); }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><Gauge className="w-5 h-5" /></div>
                  <div><div className="font-semibold group-hover:text-green-700">{opt.label}</div><div className="text-sm text-gray-600">{opt.detail}</div></div>
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
                <p className="text-gray-600 mb-6">Based on your answers, standard rebate programs may not apply directly. Contact your provincial energy agency for custom guidance.</p>
                <button onClick={reset} className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold py-2.5 px-5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                  <RotateCcw className="w-4 h-4" /> Start Over
                </button>
              </div>
            ) : (
              <>
                {/* Total banner */}
                <div className="bg-green-600 text-white rounded-xl p-5 mb-6 text-center">
                  <div className="text-xs font-semibold text-green-200 uppercase tracking-wide mb-1">{answers.province && provinceNames[answers.province]} — Your Estimated Maximum Rebate</div>
                  <div className="text-5xl font-bold">${totalMax.toLocaleString()}</div>
                  <div className="text-sm text-green-100 mt-1">across {programs.length} program{programs.length > 1 ? "s" : ""}</div>
                </div>

                {/* Rebate breakdown bars */}
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
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.round((p.amount / totalMax) * 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Roadmap — primary new section */}
                {roadmap.length > 0 && (
                  <div className="mb-6">
                    <div className="text-base font-bold text-gray-800 mb-1">Your Step-by-Step Application Roadmap</div>
                    <div className="text-xs text-gray-500 mb-4">Follow these steps in order — skipping or reordering can disqualify you from rebates.</div>
                    <div className="space-y-3">
                      {roadmap.map((s, i) => (
                        <div key={i} className={`flex gap-3 p-3 rounded-xl border ${s.critical ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                          <div className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${s.critical ? "bg-red-500" : "bg-green-600"}`}>{i + 1}</div>
                          <div>
                            <div className="font-semibold text-sm text-gray-800 flex items-center gap-1.5">
                              {s.label}
                              {s.critical && <span className="text-xs font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">Do this first</span>}
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">{s.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Program cards */}
                <div className="space-y-4 mb-6">
                  <div className="text-sm font-semibold text-gray-700">Eligible Programs</div>
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
                      <a href={p.applyUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:underline">
                        <ExternalLink className="w-3 h-3" /> {p.applyLabel}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-6">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    <strong>Amounts are estimates.</strong> Programs change frequently. Verify current eligibility and amounts at each program&apos;s official site before starting any work.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`/installers?service=heat-pump${answers.province ? `&province=${answers.province === "NS" ? "Nova+Scotia" : answers.province === "NB" ? "New+Brunswick" : answers.province === "PEI" ? "Prince+Edward+Island" : answers.province === "NL" ? "Newfoundland" : "Ontario"}` : ""}`}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-xl text-center text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Find Approved Installers{answers.province ? ` in ${answers.province}` : ""}
                  </a>
                  <button onClick={reset}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Start Over
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Results are estimates based on 2026 program guidelines. Not financial or legal advice.
      </p>
    </main>
  );
}
