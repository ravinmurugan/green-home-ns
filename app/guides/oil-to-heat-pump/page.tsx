import Link from "next/link";
import { ArrowRight, CheckCircle2, DollarSign, Flame, AlertTriangle, Thermometer } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Switching from Oil to Heat Pump in Atlantic Canada — 2026 Guide | GreenHomeNS",
  description:
    "Complete guide for Atlantic Canadian homeowners switching from oil heat to a heat pump. Rebates up to $13,000 in NS, step-by-step process, and what to watch out for.",
};

const rebates = [
  { province: "NS", programs: "ENS + CleanHeat", max: "$13,000", note: "CleanHeat up to $10K income-qualified" },
  { province: "NB", programs: "NB Power Smart Saver", max: "$2,000", note: "Varies by unit type" },
  { province: "PEI", programs: "Island Prosperity Fund", max: "$2,000", note: "Check princeedwardisland.ca" },
  { province: "NL", programs: "NL Heat Pump Incentive", max: "$2,000", note: "Check newfoundlandpower.com" },
  { province: "Federal", programs: "Greener Homes Grant", max: "CLOSED", note: "Closed Feb 12, 2024 — verify replacement at canada.ca" },
];

const steps = [
  {
    n: "1",
    title: "Check your eligibility for rebates",
    body: "Rebate programs change. Before signing anything, confirm which programs are active in your province. In NS: Efficiency NS (ENS) and CleanHeat. Federal: Greener Homes Grant closed Feb 2024 — check canada.ca for any replacement.",
  },
  {
    n: "2",
    title: "Choose cold-climate rated equipment",
    body: "Atlantic winters require cold-climate heat pumps rated HSPF2 ≥ 7.5, operable to at least -25°C. Standard units fail in winter and do NOT qualify for maximum rebates. Brands: Mitsubishi Hyper-Heat, Fujitsu Halcyon.",
  },
  {
    n: "3",
    title: "Get 3 quotes from approved installers",
    body: "Only provincially approved contractors unlock rebates. Get at least 3 quotes. Use our directory to compare GreenHome Scores — installers ranked by certification, reviews, and pricing.",
  },
  {
    n: "4",
    title: "Keep your oil system as backup (first year)",
    body: "Most NS homeowners run heat pump as primary heat and keep oil as emergency backup. After one winter, most find heat pump handles 95%+ of heating load. Removing oil tank is optional but reduces insurance costs.",
  },
  {
    n: "5",
    title: "Installer handles rebate paperwork",
    body: "Your approved installer submits the ENS/provincial rebate on your behalf post-installation. Provincial rebates typically arrive in 4–8 weeks. Keep all receipts.",
  },
];

const costComparison = [
  { label: "Oil heat (annual, 2,000L)", cost: "$3,200–$4,000", color: "text-red-600" },
  { label: "Heat pump (annual, same home)", cost: "$800–$1,400", color: "text-green-600" },
  { label: "Typical annual savings", cost: "$1,800–$2,600", color: "text-green-700 font-bold" },
  { label: "Payback period (after rebates)", cost: "4–7 years", color: "text-blue-600" },
];

export default function OilToHeatPumpPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/guides" className="hover:text-gray-600">Guides</Link>
        <span>/</span>
        <span className="text-gray-600">Switching from Oil</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-orange-600 text-sm font-medium mb-3">
          <Flame className="w-4 h-4" />
          Oil-to-Heat-Pump Guide — Updated 2026
        </div>
        <h1 className="text-3xl font-bold mb-3">Switching from Oil Heat to a Heat Pump</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Over 60% of Atlantic Canadian homes still heat with oil — the highest rate in Canada. With provincial rebates up to $13,000 in NS and oil prices staying high, the switch has never made more financial sense.
        </p>
      </div>

      {/* Cost comparison */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-12">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          The Numbers: Oil vs Heat Pump
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {costComparison.map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <div className={`text-xl font-bold mb-1 ${item.color}`}>{item.cost}</div>
              <div className="text-xs text-gray-500 leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">Based on NS Power electricity rates and $1.60/L heating oil. Actual savings vary by home size and usage.</p>
      </section>

      {/* Rebate table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Available Rebates by Province</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Province</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Program</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Max Rebate</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rebates.map((r) => (
                <tr key={r.province} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">{r.province}</td>
                  <td className="px-4 py-3 text-gray-700">{r.programs}</td>
                  <td className={`px-4 py-3 font-bold ${r.max === "CLOSED" ? "text-red-500" : "text-green-700"}`}>{r.max}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">Rebate programs change frequently. Confirm current amounts at your provincial program website before signing any contract.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Step-by-Step: How to Switch</h2>
        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4 p-5 border border-gray-200 rounded-xl">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                {s.n}
              </div>
              <div>
                <div className="font-semibold mb-1">{s.title}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to require in quote */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">What to Require in Every Quote</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Cold-climate rated unit (HSPF2 ≥ 7.5)",
            "Operating temperature to at least -25°C",
            "Provincially approved installer status confirmed",
            "Rebate paperwork handled by installer",
            "Equipment warranty ≥ 10 years",
            "Post-install follow-up and service plan",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-orange-600 text-white rounded-2xl p-8 text-center">
        <Thermometer className="w-8 h-8 text-orange-200 mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">Ready to Get Quotes?</h2>
        <p className="text-orange-100 text-sm mb-6 max-w-md mx-auto">
          Check your exact rebate eligibility in 60 seconds, then compare approved installers in your area.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tools/rebate-quiz"
            className="bg-white text-orange-700 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
          >
            Check My Rebate Eligibility <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/installers?service=heat-pump"
            className="border border-orange-400 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Compare Installers
          </Link>
        </div>
      </div>
    </main>
  );
}
