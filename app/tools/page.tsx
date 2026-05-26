import Link from "next/link";
import { Calculator, TrendingDown, Sun, DollarSign, Zap, Thermometer, ListChecks } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free NS Green Energy Tools — GreenHomeNS",
  description:
    "Free calculators and tools for NS homeowners: rebate eligibility quiz, heat pump sizer, savings calculator, rebate sequencing guide, and NS Power bill impact estimator.",
};

const tools = [
  {
    href: "/tools/rebate-quiz",
    icon: DollarSign,
    title: "Rebate Eligibility Quiz",
    desc: "Answer 4 questions — find out exactly which NS programs you qualify for and your maximum rebate amount.",
    cta: "Check Eligibility",
    badge: "Most Popular",
    color: "bg-green-600",
    cardBg: "bg-white border-2 border-green-500 hover:shadow-lg",
    iconBg: "bg-green-100 text-green-600",
  },
  {
    href: "/tools/rebate-guide",
    icon: ListChecks,
    title: "Rebate Sequencing Wizard",
    desc: "The #1 mistake NS homeowners make is doing steps in the wrong order. Get your exact sequence to avoid losing your rebate.",
    cta: "Get My Sequence",
    badge: "Avoid Costly Mistakes",
    color: "bg-purple-600",
    cardBg: "bg-white border-2 border-purple-300 hover:border-purple-500 hover:shadow-lg",
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    href: "/tools/heat-pump-sizer",
    icon: Thermometer,
    title: "Heat Pump Size Calculator",
    desc: "NS cold-climate sizing based on your home's square footage, age, insulation, and ceiling height. Get the right tonnage.",
    cta: "Calculate Size",
    badge: "NS Cold-Climate Specific",
    color: "bg-blue-600",
    cardBg: "bg-white border-2 border-blue-300 hover:border-blue-500 hover:shadow-lg",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    href: "/tools/bill-impact",
    icon: Zap,
    title: "NS Power Bill Impact",
    desc: "See exactly how your monthly NS Power bill changes after switching from oil, baseboard, or propane to a heat pump.",
    cta: "See Bill Change",
    badge: "Monthly breakdown",
    color: "bg-amber-600",
    cardBg: "bg-white border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    href: "/tools/savings-calculator",
    icon: TrendingDown,
    title: "Oil vs Heat Pump Savings",
    desc: "Enter your actual fuel usage and see annual savings, payback period, and a 20-year cumulative cost chart.",
    cta: "Calculate Savings",
    badge: "20-yr projection",
    color: "bg-sky-600",
    cardBg: "bg-white border-2 border-sky-300 hover:border-sky-500 hover:shadow-lg",
    iconBg: "bg-sky-100 text-sky-600",
  },
  {
    href: "/tools/payback-calculator",
    icon: Sun,
    title: "Solar Payback Calculator",
    desc: "NS Power net metering at $0.185/kWh. Enter your system size and see your payback period and 25-year return.",
    cta: "Calculate Solar ROI",
    badge: "NS net metering",
    color: "bg-amber-500",
    cardBg: "bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg",
    iconBg: "bg-amber-50 text-amber-600",
  },
];

export default function ToolsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <Calculator className="w-10 h-10 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Free NS Green Energy Tools</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          NS-specific numbers. No email required. Use them before talking to any installer.
        </p>
      </div>

      {/* Featured tool */}
      <Link
        href="/tools/rebate-quiz"
        className="group block bg-gradient-to-br from-green-600 to-green-800 text-white rounded-2xl p-8 mb-6 hover:opacity-95 transition-opacity"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              Most Used Tool — Start Here
            </span>
            <h2 className="text-2xl font-bold mb-2">Which Rebates Do You Qualify For?</h2>
            <p className="text-green-100 text-sm leading-relaxed mb-4">
              OHPA, Efficiency NS, Moderate Income Rebate — the programs overlap and confuse everyone. 4 questions, instant result. Know your max amount before calling any installer.
            </p>
            <span className="bg-white text-green-700 font-semibold px-5 py-2 rounded-lg text-sm inline-block group-hover:bg-green-50 transition-colors">
              Check Eligibility →
            </span>
          </div>
          <DollarSign className="w-16 h-16 text-green-300 shrink-0 hidden sm:block" />
        </div>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.slice(1).map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group block rounded-xl p-5 transition-all ${tool.cardBg}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${tool.iconBg}`}>
              <tool.icon className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-600 mb-1">{tool.badge}</div>
            <h2 className="font-bold text-base mb-2 group-hover:text-green-700 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{tool.desc}</p>
            <span className="text-sm font-semibold text-green-600">{tool.cta} →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Tools use NS-specific averages: electricity $0.185/kWh, heating oil $1.55/L, NS Power net metering at 1:1 retail rate. Cold-climate heat pump COP 2.8.
        </p>
        <p className="text-xs text-gray-600">Not financial advice. Verify rebate eligibility at efficiencyns.ca before making any decisions.</p>
      </div>
    </main>
  );
}
