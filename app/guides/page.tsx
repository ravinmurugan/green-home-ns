import Link from "next/link";
import { Thermometer, Sun, BookOpen, ArrowRight, MapPin, Flame, Zap, DollarSign, CheckCircle2, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pump & Solar Guides — Atlantic Canada & Ontario | GreenHomeNS",
  description:
    "Research-backed guides for NS, NB, PEI, NL, and Ontario homeowners: heat pump types and costs, solar net metering, rebate stacking, and installer evaluation.",
};

const provinces = [
  { code: "NS",  hpMax: 15000 },
  { code: "NB",  hpMax: 7000  },
  { code: "PEI", hpMax: 7000  },
  { code: "NL",  hpMax: 7000  },
  { code: "ON",  hpMax: 10000 },
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

      {/* Rebate teaser — drives to /rebates for full data */}
      <div className="mb-12 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-5 py-4">
        <div>
          <div className="font-semibold text-gray-800 text-sm">Province-by-province rebate breakdown</div>
          <div className="text-xs text-gray-600 mt-0.5">Charts, comparison table, and stacking sequence for NS, NB, PEI, NL &amp; ON</div>
        </div>
        <Link href="/rebates" className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline shrink-0 ml-4">
          Full Rebate Guide <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

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
