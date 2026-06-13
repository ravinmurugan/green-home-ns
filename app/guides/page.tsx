import Link from "next/link";
import { ArrowRight, Flame, Sun, Zap, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pump & Solar Guides — Atlantic Canada & Ontario | GreenHomeNS",
  description:
    "Research-backed guides for NS, NB, PEI, NL, and Ontario homeowners: heat pump types and costs, solar net metering, rebate stacking, and installer evaluation.",
};

const situationCards = [
  {
    icon: Flame,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "I heat with oil & want to switch",
    desc: "Up to $13,000 in stacked NS rebates. Find out which programs apply to you.",
    href: "/guides/oil-to-heat-pump",
    cta: "Oil Switch Guide",
  },
  {
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "I want to add a heat pump",
    desc: "4 types explained — mini-split to geothermal. Which one qualifies for max rebates?",
    href: "/heat-pumps",
    cta: "Heat Pump Guide",
  },
  {
    icon: Sun,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "I want solar panels",
    desc: "Net metering across all 5 provinces. Typical 8–11 yr payback explained.",
    href: "/solar",
    cta: "Solar Guide",
  },
  {
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "I want to maximize my rebates",
    desc: "Stack provincial + federal programs. Order matters — our quiz finds your exact programs in 60 sec.",
    href: "/tools/rebate-quiz",
    cta: "Rebate Quiz",
  },
];

const mistakes = [
  {
    mistake: "Using a non-approved installer",
    fix: "Verify installer is provincially approved before signing — or lose the rebate entirely.",
  },
  {
    mistake: "Not checking for current federal programs",
    fix: "Greener Homes Grant closed Feb 2024. Confirm what's active at canada.ca before committing.",
  },
  {
    mistake: "Installing a standard heat pump (not cold-climate)",
    fix: "Require HSPF2 ≥ 7.5 in your quote. Non-qualifying units lose rebate eligibility.",
  },
  {
    mistake: "Applying for programs in wrong order",
    fix: "OHPA requires provincial claim first. Follow the stacking sequence in the rebate guide.",
  },
];

const provinces = [
  { code: "NS", max: "$13,000" },
  { code: "NB", max: "$7,000" },
  { code: "PEI", max: "$7,000" },
  { code: "NL", max: "$7,000" },
  { code: "ON", max: "$10,000" },
];

export default function GuidesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Green Energy Guides</h1>
        <p className="text-gray-500 text-base">
          Atlantic Canada &amp; Ontario — what you need before getting your first quote.
        </p>
      </div>

      {/* Province max rebate strip */}
      <div className="flex flex-wrap gap-2 mb-10">
        {provinces.map((p) => (
          <div key={p.code} className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs">
            <span className="font-bold text-green-700">{p.code}</span>
            <span className="text-gray-500">up to {p.max}</span>
          </div>
        ))}
      </div>

      {/* Situation cards */}
      <section className="mb-12">
        <h2 className="text-lg font-bold mb-4 text-gray-700">What do you need?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {situationCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex items-start gap-4 p-5 border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all bg-white"
            >
              <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm mb-1 leading-snug">{card.title}</div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{card.desc}</p>
                <span className="text-xs font-semibold text-green-700 group-hover:underline inline-flex items-center gap-1">
                  {card.cta} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 Mistakes */}
      <section className="mb-12">
        <h2 className="text-lg font-bold mb-4 text-gray-700">4 Mistakes That Cost Thousands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mistakes.map((item, i) => (
            <div key={i} className="flex gap-3 p-4 border border-red-100 rounded-xl bg-red-50">
              <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full font-bold text-xs shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <div className="font-semibold text-red-800 text-sm mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {item.mistake}
                </div>
                <div className="flex items-start gap-1.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                  {item.fix}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-green-600 text-white rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-lg mb-1">Not sure where to start?</div>
          <p className="text-green-100 text-sm">60-second quiz finds your exact programs by province, income &amp; heat source.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/tools/rebate-quiz"
            className="bg-white text-green-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-green-50 transition-colors text-sm inline-flex items-center gap-1.5"
          >
            Check Eligibility <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/installers"
            className="border border-green-400 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            View Installers
          </Link>
        </div>
      </div>
    </main>
  );
}
