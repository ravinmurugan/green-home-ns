import Link from "next/link";
import { Thermometer, CheckCircle2, ArrowRight, DollarSign } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pumps Atlantic Canada — Guide 2026 | GreenHomeNS",
  description:
    "Everything Atlantic Canadian homeowners need to know about heat pumps: types, costs, rebates up to $15,000, and how to choose a cold-climate installer. Updated 2026.",
};

const heatPumpTypes = [
  {
    name: "Mini-Split (Ductless)",
    bestFor: "Single rooms, additions, no existing ductwork",
    cost: "$3,000 – $8,000",
    rebate: "Up to $2,000 ENS",
    pros: ["No ductwork needed", "Zone control", "Quiet operation", "Fast install (1 day)"],
    rating: "cold-climate" as const,
  },
  {
    name: "Central Ducted Heat Pump",
    bestFor: "Whole-home replacement for existing forced-air systems",
    cost: "$8,000 – $15,000",
    rebate: "Up to $3,000 ENS",
    pros: ["Replaces entire furnace", "Uses existing ducts", "Even whole-home heating", "Best for oil-to-electric switch"],
    rating: "best-value" as const,
  },
  {
    name: "Cold-Climate Heat Pump",
    bestFor: "NS primary heat source — rated to -30°C",
    cost: "$5,000 – $12,000",
    rebate: "Up to $3,000 ENS",
    pros: ["Works in NS winters", "Qualifies for max rebates", "Most efficient primary source", "Mitsubishi Hyper-Heat, Fujitsu Halcyon"],
    rating: "recommended" as const,
  },
  {
    name: "Ground-Source (Geothermal)",
    bestFor: "Large properties, maximum efficiency",
    cost: "$20,000 – $40,000",
    rebate: "Check canada.ca",
    pros: ["Highest long-term efficiency", "Stable performance regardless of air temp", "25+ year lifespan", "May qualify for provincial rebates"],
    rating: "premium" as const,
  },
];

const ratingLabel: Record<string, { label: string; color: string }> = {
  "cold-climate": { label: "Cold Climate", color: "bg-blue-100 text-blue-700" },
  "best-value": { label: "Best Value", color: "bg-green-100 text-green-700" },
  recommended: { label: "Recommended", color: "bg-green-600 text-white" },
  premium: { label: "Premium", color: "bg-purple-100 text-purple-700" },
};

export default function HeatPumpsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
          <Thermometer className="w-4 h-4" />
          Atlantic Canada Heat Pump Guide — Updated 2026
        </div>
        <h1 className="text-3xl font-bold mb-3">Heat Pumps in Atlantic Canada</h1>
        <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
          Atlantic Canada&apos;s cold winters require cold-climate rated heat pumps. With up to $15,000 in stacked rebates across NS, NB, PEI, NL, and Ontario, the payback period has never been shorter.
        </p>
      </div>

      {/* Why NS is ideal */}
      <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12">
        <h2 className="font-bold text-xl mb-4">Why Heat Pumps Make Sense in Atlantic Canada Right Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { stat: "60%+", label: "of Atlantic Canada homes still heat with oil — highest in Canada" },
            { stat: "Up to $13,000", label: "NS provincial rebates (ENS $3K + CleanHeat up to $10K income-qualified)" },
            { stat: "Federal", label: "Greener Homes Grant CLOSED Feb 2024 — verify replacement at canada.ca" },
            { stat: "4–7 yrs", label: "typical payback period replacing oil with a cold-climate heat pump" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{item.stat}</div>
              <div className="text-sm text-gray-700 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Types of Heat Pumps for Atlantic Canadian Homes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {heatPumpTypes.map((hp) => (
            <div key={hp.name} className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold">{hp.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${ratingLabel[hp.rating].color}`}>
                  {ratingLabel[hp.rating].label}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3"><strong>Best for:</strong> {hp.bestFor}</p>
              <div className="flex gap-4 text-sm mb-3">
                <div><span className="text-gray-600">Installed cost:</span> <strong>{hp.cost}</strong></div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-green-700 font-semibold mb-3">
                <DollarSign className="w-4 h-4" /> {hp.rebate}
              </div>
              <ul className="space-y-1.5">
                {hp.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How to Get a Heat Pump Installed</h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Check current rebate programs", desc: "Federal Greener Homes Grant closed Feb 2024. Visit canada.ca and your provincial program page before signing anything — programs change." },
            { step: "2", title: "Get 3 quotes from provincially-approved installers", desc: "Only provincially approved contractors qualify you for rebates. Use our directory to find rated installers in your province." },
            { step: "3", title: "Choose your installer and equipment", desc: "Cold-climate units (HSPF2 ≥ 7.5) qualify for the maximum rebates. Confirm program eligibility with your installer before signing." },
            { step: "4", title: "Installation day (1–3 days)", desc: "Mini-splits typically take 1 day. Central systems 2–3 days. Installer applies for ENS rebate on your behalf post-install." },
            { step: "5", title: "Submit provincial rebate claim", desc: "Installer applies for ENS or provincial rebate on your behalf post-install. Provincial rebates typically arrive in 4–8 weeks." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 p-4 border border-gray-200 rounded-xl">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{s.step}</div>
              <div>
                <div className="font-semibold text-sm mb-1">{s.title}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Quotes?</h2>
        <p className="text-blue-100 mb-6">Compare certified heat pump installers across Atlantic Canada and Ontario. Unlock up to $15,000 in stacked rebates.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/installers" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
            Get Free Quotes <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/rebates#heat-pump" className="border border-blue-400 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            See All Rebates
          </Link>
        </div>
      </div>
    </main>
  );
}
