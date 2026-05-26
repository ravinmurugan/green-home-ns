import Link from "next/link";
import { Sun, CheckCircle2, ArrowRight, DollarSign, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Panels in Atlantic Canada — Complete Guide 2026 | GreenHomeNS",
  description:
    "Atlantic Canada solar guide: costs, net metering programs, up to $5,000 federal grant, payback period, and how to find certified installers. Updated 2026.",
};

export default function SolarPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-3">
          <Sun className="w-4 h-4" />
          Atlantic Canada Solar Guide — Updated 2026
        </div>
        <h1 className="text-3xl font-bold mb-3">Solar Panels in Atlantic Canada</h1>
        <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
          Net metering programs across NS, NB, PEI, and NL combined with up to $5,000 in federal grants make residential solar increasingly attractive — even in Atlantic Canada&apos;s climate.
        </p>
      </div>

      {/* Stats */}
      <section className="bg-amber-600 rounded-2xl p-6 mb-12">
        <h2 className="font-bold text-xl mb-4 text-white">Atlantic Canada Solar Fast Facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { stat: "$5,000", label: "Federal Greener Homes Grant for solar PV" },
            { stat: "8–11 yrs", label: "Typical payback period in NS under net metering" },
            { stat: "1:1", label: "Net metering credit rate (retail) across Atlantic provinces" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">{item.stat}</div>
              <div className="text-sm text-gray-700 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Net metering */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Net Metering in Atlantic Canada — How It Works</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          NS Power, NB Power, Maritime Electric (PEI), and Newfoundland Power all offer net metering programs that credit your account at the retail electricity rate for every kWh your solar panels send back to the grid. Credits roll over monthly and are settled annually.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Sun, title: "Generate", desc: "Your panels generate electricity from sunlight during the day." },
            { icon: Zap, title: "Use or export", desc: "Use power in your home first. Excess flows back to the grid." },
            { icon: DollarSign, title: "Earn bill credits", desc: "NS Power credits your account at the full retail rate for exported power." },
          ].map((s) => (
            <div key={s.title} className="border border-gray-200 rounded-xl p-4 text-center">
              <s.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <div className="font-semibold mb-1">{s.title}</div>
              <div className="text-sm text-gray-600">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
          <strong>Key fact:</strong> Your provincial utility installs a bi-directional meter at no charge. The interconnection process typically takes 4–8 weeks after your solar system is installed.
        </div>
      </section>

      {/* Is Atlantic Canada good for solar? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Is Atlantic Canada Sunny Enough for Solar?</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Yes — Atlantic Canada receives 1,400–1,700 peak sun hours per year, comparable to parts of Germany which has one of the world&apos;s highest solar adoption rates. South-facing roofs at a 35–45° pitch perform best across the region.
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "Halifax averages 1,450 peak sun hours/year — fully viable for residential solar",
            "Modern panels work on cloudy days (just less efficiently)",
            "Snow load: panels shed snow quickly due to heat and angle",
            "Atlantic provincial electricity rates ($0.17–0.22/kWh) make solar economics strong",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Cost breakdown */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Does Solar Cost in Atlantic Canada?</h2>
        <div className="border border-gray-300 rounded-xl overflow-hidden">
          {[
            { size: "5 kW system", home: "Small home / condo (800–1,200 sqft)", cost: "$14,000–$18,000", net: "$9,000–$13,000" },
            { size: "8 kW system", home: "Medium home (1,200–2,000 sqft)", cost: "$20,000–$26,000", net: "$15,000–$21,000" },
            { size: "12 kW system", home: "Large home / heat pump + solar bundle", cost: "$28,000–$36,000", net: "$23,000–$31,000" },
          ].map((row, i) => (
            <div key={row.size} className={`grid grid-cols-1 sm:grid-cols-4 gap-2 px-5 py-4 text-sm border-b border-gray-200 last:border-b-0 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
              <div className="font-bold text-gray-900">{row.size}</div>
              <div className="text-gray-700 hidden md:block">{row.home}</div>
              <div className="text-gray-900 font-medium">{row.cost}</div>
              <div className="text-green-700 font-bold">After grant: {row.net}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">Prices are estimates. Get quotes from certified installers in your province for accurate pricing.</p>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Steps to Going Solar</h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Pre-retrofit EnerGuide assessment", desc: "Book a home energy evaluation before installing. Required for the federal grant — covered up to $600 by the grant." },
            { step: "2", title: "Get 3 solar quotes from certified installers", desc: "Compare system size, brand, warranty, and utility interconnection experience. Use our directory to find rated installers in your province." },
            { step: "3", title: "Sign and permit", desc: "Installer pulls the required electrical permit and submits your net metering application to your provincial utility." },
            { step: "4", title: "Installation (1–3 days)", desc: "Panel mounting, inverter installation, electrical connection. Inspector visit required." },
            { step: "5", title: "Utility meter swap + post-assessment", desc: "Your provincial utility replaces your meter (bi-directional, no cost). Book post-retrofit assessment to claim the federal grant." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 p-4 border border-gray-200 rounded-xl">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{s.step}</div>
              <div>
                <div className="font-semibold text-sm mb-1">{s.title}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-amber-500 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Compare Solar Installer Ratings</h2>
        <p className="text-amber-100 mb-6">Independently rated solar installers across Atlantic Canada. Compare GreenHome Scores, certifications, and service areas.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/installers?service=solar" className="bg-white text-amber-700 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors inline-flex items-center gap-2">
            Get Free Quotes <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/rebates#solar" className="border border-amber-300 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors">
            Solar Rebates
          </Link>
        </div>
      </div>
    </main>
  );
}
