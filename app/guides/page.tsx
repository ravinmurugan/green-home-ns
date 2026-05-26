import Link from "next/link";
import { Thermometer, Sun, BookOpen, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pump & Solar Guides — GreenHomeNS",
  description:
    "Research-backed guides for Canadian homeowners: heat pump types and costs, solar economics, rebate programs, and how to evaluate installers.",
};

const guides = [
  {
    href: "/heat-pumps",
    icon: Thermometer,
    title: "Heat Pumps in Atlantic Canada",
    desc: "Cold-climate types, sizing, costs, NS/NB/PEI/NL rebate programs, and how to evaluate installers. Updated for 2026 programs.",
    tag: "Heat Pumps",
    tagColor: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-50 text-blue-600",
    stats: ["4 heat pump types covered", "2026 rebate programs", "5-step installation guide"],
  },
  {
    href: "/solar",
    icon: Sun,
    title: "Solar Panels in Atlantic Canada",
    desc: "NS Power and Maritime Electric net metering, federal grants, payback periods, and what makes a good solar installer in the Atlantic region.",
    tag: "Solar PV",
    tagColor: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-50 text-amber-600",
    stats: ["Net metering explained", "Cost and payback data", "Certified installer checklist"],
  },
  {
    href: "/rebates",
    icon: BookOpen,
    title: "Rebate & Grant Guide",
    desc: "Every active program: OHPA, Efficiency NS, NB Power, federal Greener Homes, CleanHeat. Which programs stack and in what order.",
    tag: "Rebates",
    tagColor: "bg-green-100 text-green-700",
    iconBg: "bg-green-50 text-green-600",
    stats: ["6 active programs", "Stacking explained", "Sequence guide"],
  },
];

export default function GuidesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <BookOpen className="w-4 h-4" />
          Research-Backed Guides
        </div>
        <h1 className="text-3xl font-bold mb-3">Green Energy Guides</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Written for Atlantic Canadian homeowners. No filler — just what you need to make an informed decision before getting a single quote.
        </p>
      </div>

      <div className="space-y-5 mb-12">
        {guides.map((guide) => (
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
              <div className="flex flex-wrap gap-3">
                {guide.stats.map((s) => (
                  <span key={s} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors shrink-0 mt-1" />
          </Link>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <h2 className="font-bold text-lg mb-2">Not sure where to start?</h2>
        <p className="text-gray-600 text-sm mb-4">Use our free tools to get NS-specific numbers before reading the guides.</p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Free Calculators & Tools <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
