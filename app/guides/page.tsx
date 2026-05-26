import Link from "next/link";
import { Thermometer, Sun, BookOpen, ArrowRight, MapPin, Flame, Zap, DollarSign, CheckCircle2, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pump & Solar Guides — Atlantic Canada & Ontario | GreenHomeNS",
  description:
    "Research-backed guides for NS, NB, PEI, NL, and Ontario homeowners: heat pump types and costs, solar net metering, rebate stacking, and installer evaluation.",
};

const provinces = [
  { code: "NS", name: "Nova Scotia",       hpMax: 15000, solarMax: 5000, programs: 5 },
  { code: "NB", name: "New Brunswick",     hpMax: 7000,  solarMax: 5000, programs: 3 },
  { code: "PEI", name: "Prince Edward Is.", hpMax: 7000, solarMax: 5000, programs: 3 },
  { code: "NL", name: "Newfoundland",      hpMax: 7000,  solarMax: 5000, programs: 3 },
  { code: "ON", name: "Ontario",           hpMax: 10000, solarMax: 5000, programs: 3 },
];

const situationCards = [
  {
    icon: Flame,
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    title: "I heat with oil & want to switch",
    bullets: ["Up to $15,000 in stacked rebates (NS)", "Cold-climate heat pump required", "OHPA + ENS + Greener Homes stack"],
    cta: "Rebate Guide",
    href: "/rebates",
  },
  {
    icon: Sun,
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    title: "I want to add solar panels",
    bullets: ["$5,000 federal grant available", "Net metering in all 5 provinces", "8–11 yr payback typical"],
    cta: "Solar Guide",
    href: "/solar",
  },
  {
    icon: Zap,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    title: "I want to add a heat pump",
    bullets: ["4 types explained (mini-split to geo)", "Cold-climate rated = max rebates", "Compare installers by GreenHome Score"],
    cta: "Heat Pump Guide",
    href: "/heat-pumps",
  },
  {
    icon: DollarSign,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    title: "I want to maximize my rebates",
    bullets: ["Stack provincial + federal programs", "Sequence matters — order is critical", "Quiz finds your exact programs"],
    cta: "Rebate Quiz",
    href: "/tools/rebate-quiz",
  },
];

const mainGuides = [
  {
    href: "/heat-pumps",
    icon: Thermometer,
    title: "Heat Pumps in Atlantic Canada",
    desc: "Cold-climate types, sizing, costs, and rebate programs across NS, NB, PEI, NL, and Ontario. Covers mini-split to ground-source. How to evaluate installers and avoid common mistakes.",
    tag: "Heat Pumps",
    tagColor: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-50 text-blue-600",
    stats: ["4 heat pump types", "5 provinces covered", "2026 rebate programs", "5-step install guide"],
  },
  {
    href: "/solar",
    icon: Sun,
    title: "Solar Panels in Atlantic Canada",
    desc: "Net metering across NS Power, NB Power, Maritime Electric (PEI), and Newfoundland Power. Federal grants, payback periods, and what separates a strong solar installer from a bad one.",
    tag: "Solar PV",
    tagColor: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-50 text-amber-600",
    stats: ["4 utility programs", "Net metering explained", "Cost & payback data", "Installer checklist"],
  },
  {
    href: "/rebates",
    icon: BookOpen,
    title: "Rebate & Grant Guide",
    desc: "Every active program across all 5 provinces: OHPA, Efficiency NS, NB Power Smart Saver, PEI Island Prosperity, federal Greener Homes, CleanHeat, Enbridge HER+. How programs stack and in what order.",
    tag: "Rebates",
    tagColor: "bg-green-100 text-green-700",
    iconBg: "bg-green-50 text-green-600",
    stats: ["10 active programs", "5 provinces", "Stacking explained", "Sequence guide"],
  },
];

const commonMistakes = [
  { mistake: "Using a non-approved installer", consequence: "Lose provincial rebate entirely", fix: "Check installer approval status before signing" },
  { mistake: "Skipping the pre-retrofit EnerGuide", consequence: "Forfeit $5,000 federal grant", fix: "Book EnerGuide before install, not after" },
  { mistake: "Installing standard heat pump (not cold-climate)", consequence: "Equipment fails in winter, voids rebate eligibility", fix: "Require HSPF2 ≥ 7.5 in your quote" },
  { mistake: "Applying for programs in wrong order", consequence: "OHPA requires provincial program to be claimed first", fix: "Follow the stacking sequence in our rebate guide" },
];

export default function GuidesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <BookOpen className="w-4 h-4" />
          Research-Backed Guides — 2026
        </div>
        <h1 className="text-3xl font-bold mb-3">Green Energy Guides</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Written for Canadian homeowners across Atlantic Canada and Ontario. No filler — just what you need before getting your first quote.
        </p>
      </div>

      {/* Province coverage bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {provinces.map((p) => (
          <div key={p.code} className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <MapPin className="w-3 h-3 text-green-600" />
            <span className="text-xs font-semibold text-green-700">{p.code}</span>
            <span className="text-xs text-gray-600">up to ${(p.hpMax / 1000).toFixed(0)}k</span>
          </div>
        ))}
      </div>

      {/* Situation finder */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Start with Your Situation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {situationCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group border-2 rounded-2xl p-5 hover:shadow-md transition-all ${card.color} hover:border-green-400`}
            >
              <div className="flex items-start gap-3 mb-3">
                <card.icon className={`w-6 h-6 shrink-0 mt-0.5 ${card.iconColor}`} />
                <h3 className="font-bold leading-tight">{card.title}</h3>
              </div>
              <ul className="space-y-1.5 mb-4 pl-9">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-1.5 text-sm text-gray-700">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="pl-9">
                <span className="text-sm font-semibold text-green-700 group-hover:underline inline-flex items-center gap-1">
                  {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Province rebate comparison table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Max Rebates by Province — 2026</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Province</th>
                <th className="text-right px-4 py-3 font-semibold text-blue-700">HP Provincial</th>
                <th className="text-right px-4 py-3 font-semibold text-red-700">HP Federal</th>
                <th className="text-right px-4 py-3 font-semibold text-green-700">HP Total Max</th>
                <th className="text-right px-4 py-3 font-semibold text-amber-700">Solar Max</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Programs</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: "NS", name: "Nova Scotia",        hp_prov: 3000, hp_fed: 5000, hp_total: 15000, solar: 5000, programs: 5, star: true, note: "*income-qual. can stack OHPA" },
                { code: "NB", name: "New Brunswick",      hp_prov: 2000, hp_fed: 5000, hp_total: 7000,  solar: 5000, programs: 3, star: false },
                { code: "PEI", name: "Prince Edward Is.", hp_prov: 2000, hp_fed: 5000, hp_total: 7000,  solar: 5000, programs: 3, star: false },
                { code: "NL", name: "Newfoundland",       hp_prov: 2000, hp_fed: 5000, hp_total: 7000,  solar: 5000, programs: 3, star: false },
                { code: "ON", name: "Ontario",            hp_prov: 5000, hp_fed: 5000, hp_total: 10000, solar: 5000, programs: 3, star: false },
              ].map((row, i) => (
                <tr
                  key={row.code}
                  className={`border-b border-gray-100 last:border-0 ${row.star ? "bg-green-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${row.star ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>{row.code}</span>
                      <span className="font-medium text-gray-900">{row.name}</span>
                      {row.star && <span className="text-xs text-green-600 font-semibold">Highest</span>}
                    </div>
                    {row.note && <div className="text-xs text-gray-500 mt-0.5 pl-9">{row.note}</div>}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-blue-700">${row.hp_prov.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-red-700">${row.hp_fed.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-bold ${row.star ? "text-green-700 text-base" : "text-gray-900"}`}>${row.hp_total.toLocaleString()}</span>
                    {row.star && <span className="text-xs text-green-600 ml-1">*</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-amber-700">${row.solar.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.programs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">*NS max $15,000 for income-qualified households stacking CleanHeat + OHPA + Greener Homes. Standard NS max: $8,000.</p>
      </section>

      {/* Visual stacking bar for NS */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">How NS Rebates Stack — Visual Guide</h2>
        <p className="text-sm text-gray-600 mb-5">Most complex province shown. Other provinces follow the same federal + provincial structure.</p>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="space-y-3">
            {[
              { label: "Step 1 — Book EnerGuide (pre-install)", color: "bg-gray-200", width: "w-full", tag: "Required", tagColor: "bg-gray-500 text-white", amount: null },
              { label: "Step 2 — Efficiency NS rebate", color: "bg-blue-500", width: "w-1/5", tag: "Up to $3,000", tagColor: "bg-blue-100 text-blue-700", amount: 3000 },
              { label: "Step 3 — Canada Greener Homes Grant", color: "bg-red-500", width: "w-1/3", tag: "Up to $5,000", tagColor: "bg-red-100 text-red-700", amount: 5000 },
              { label: "Step 4 — OHPA (oil heat only)", color: "bg-green-500", width: "w-2/3", tag: "Up to $10,000", tagColor: "bg-green-100 text-green-700", amount: 10000 },
              { label: "Step 5 — Post-install EnerGuide", color: "bg-gray-200", width: "w-full", tag: "Unlocks federal grant", tagColor: "bg-gray-500 text-white", amount: null },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-300 text-xs font-bold flex items-center justify-center text-gray-600 shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{step.label}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${step.tagColor}`}>{step.tag}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${step.color} ${step.width}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Maximum stacked (income-qualified):</span>
            <span className="text-2xl font-bold text-green-600">$15,000</span>
          </div>
        </div>
      </section>

      {/* Main guide cards */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">Full Guides</h2>
        <div className="space-y-5">
          {mainGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex gap-6 p-6 border-2 border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-md transition-all bg-white"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${guide.iconBg}`}>
                <guide.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${guide.tagColor}`}>{guide.tag}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-green-700 transition-colors">{guide.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{guide.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.stats.map((s) => (
                    <span key={s} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Common mistakes */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-5">4 Mistakes That Cost Homeowners Thousands</h2>
        <div className="space-y-3">
          {commonMistakes.map((item, i) => (
            <div key={i} className="flex gap-4 p-4 border border-red-100 rounded-xl bg-red-50">
              <div className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{i + 1}</div>
              <div className="flex-1">
                <div className="font-semibold text-red-800 text-sm mb-0.5">{item.mistake}</div>
                <div className="text-xs text-red-700 mb-1.5">Consequence: {item.consequence}</div>
                <div className="flex items-start gap-1.5 text-xs text-green-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                  Fix: {item.fix}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <h2 className="font-bold text-lg mb-2">Not sure where to start?</h2>
        <p className="text-gray-600 text-sm mb-5">Rebate quiz takes 60 seconds and finds your exact programs by province, income, and heat source.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tools/rebate-quiz"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Check My Rebate Eligibility <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/installers"
            className="inline-flex items-center justify-center gap-2 border border-green-400 text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition-colors text-sm"
          >
            View Installer Ratings
          </Link>
        </div>
      </div>
    </main>
  );
}
