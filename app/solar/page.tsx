import Link from "next/link";
import { Sun, CheckCircle2, ArrowRight, DollarSign, Zap, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Panels Atlantic Canada 2026 | GreenHomeNS",
  description:
    "Solar guide for NS, NB, PEI, NL, and Ontario: net metering programs, up to $5,000 federal grant, province-by-province payback data, and certified installers. Updated 2026.",
};

const netMeteringPrograms = [
  {
    province: "NS",
    name: "Nova Scotia",
    utility: "NS Power",
    rate: "$0.185/kWh",
    maxSize: "100 kW",
    carryover: "Monthly, settled annually",
    interconnect: "4–6 weeks",
    highlight: true,
  },
  {
    province: "NB",
    name: "New Brunswick",
    utility: "NB Power",
    rate: "$0.138/kWh",
    maxSize: "100 kW",
    carryover: "Monthly, settled annually",
    interconnect: "6–8 weeks",
    highlight: false,
  },
  {
    province: "PEI",
    name: "Prince Edward Island",
    utility: "Maritime Electric",
    rate: "$0.172/kWh",
    maxSize: "100 kW",
    carryover: "Monthly, settled annually",
    interconnect: "4–6 weeks",
    highlight: false,
  },
  {
    province: "NL",
    name: "Newfoundland",
    utility: "NL Power / Hydro",
    rate: "$0.148/kWh",
    maxSize: "100 kW",
    carryover: "Monthly, settled annually",
    interconnect: "6–10 weeks",
    highlight: false,
  },
  {
    province: "ON",
    name: "Ontario",
    utility: "Local LDC (e.g. Toronto Hydro)",
    rate: "$0.175/kWh",
    maxSize: "500 kW",
    carryover: "Monthly, settled annually",
    interconnect: "8–12 weeks",
    highlight: false,
  },
];

const paybackByProvince = [
  { province: "NS", rate: 0.185, payback: "8–10 yrs", color: "bg-green-500", width: "90%" },
  { province: "PEI", rate: 0.172, payback: "9–11 yrs", color: "bg-green-400", width: "80%" },
  { province: "ON", rate: 0.175, payback: "9–11 yrs", color: "bg-green-400", width: "80%" },
  { province: "NL", rate: 0.148, payback: "10–13 yrs", color: "bg-amber-400", width: "65%" },
  { province: "NB", rate: 0.138, payback: "11–14 yrs", color: "bg-amber-300", width: "55%" },
];

const sunHours = [
  { city: "Halifax, NS", hours: 1450 },
  { city: "Moncton, NB", hours: 1420 },
  { city: "Charlottetown, PEI", hours: 1480 },
  { city: "St. John's, NL", hours: 1300 },
  { city: "Toronto, ON", hours: 1530 },
  { city: "Germany (comparison)", hours: 1100 },
];

export default function SolarPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-3">
          <Sun className="w-4 h-4" />
          Atlantic Canada & Ontario Solar Guide — Updated 2026
        </div>
        <h1 className="text-3xl font-bold mb-3">Solar Panels in Atlantic Canada & Ontario</h1>
        <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
          Net metering programs across NS, NB, PEI, NL, and Ontario make residential solar increasingly attractive — even in Atlantic Canada&apos;s climate. The federal Greener Homes Grant closed Feb 2024 — verify any replacement federal programs at canada.ca.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {["NS", "NB", "PEI", "NL", "ON"].map((p) => (
            <span key={p} className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold text-amber-700">
              <MapPin className="w-3 h-3" /> {p}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="bg-amber-600 rounded-2xl p-6 mb-12">
        <h2 className="font-bold text-xl mb-4 text-white">Solar Fast Facts — 5 Provinces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { stat: "CLOSED", label: "Federal Greener Homes Grant closed Feb 2024 — verify replacement at canada.ca" },
            { stat: "8–14 yrs", label: "Payback period range across provinces (NS best at 8–10 yrs)" },
            { stat: "1:1", label: "Net metering credit rate (full retail) at all 5 provincial utilities" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600">{item.stat}</div>
              <div className="text-sm text-gray-700 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Net metering how it works */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Net Metering — How It Works</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Every province covered here offers net metering: your utility credits your bill at the full retail rate for every kWh your panels export to the grid. Credits roll monthly and settle annually. Your utility installs a bi-directional meter at no charge.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Sun, title: "Generate", desc: "Panels generate electricity from sunlight during the day." },
            { icon: Zap, title: "Use or export", desc: "Use power in your home first. Excess flows back to the grid." },
            { icon: DollarSign, title: "Earn bill credits", desc: "Your provincial utility credits your account at the full retail rate for exported power." },
          ].map((s) => (
            <div key={s.title} className="border border-gray-200 rounded-xl p-4 text-center">
              <s.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <div className="font-semibold mb-1">{s.title}</div>
              <div className="text-sm text-gray-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Net metering comparison table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Net Metering by Province</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wide">
            <div>Province</div>
            <div>Utility</div>
            <div>Credit Rate</div>
            <div>Max System</div>
            <div>Interconnect</div>
          </div>
          {netMeteringPrograms.map((p) => (
            <div
              key={p.province}
              className={`grid grid-cols-5 px-4 py-3 text-sm border-b border-gray-100 last:border-b-0 items-center ${p.highlight ? "bg-green-50" : "bg-white"}`}
            >
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                {p.highlight && <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />}
                {p.province}
              </div>
              <div className="text-gray-700 text-xs">{p.utility}</div>
              <div className="font-semibold text-green-700">{p.rate}</div>
              <div className="text-gray-700">{p.maxSize}</div>
              <div className="text-gray-600 text-xs">{p.interconnect}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Rates as of 2026. NS has highest electricity rate = best solar economics in Atlantic Canada.</p>
      </section>

      {/* Payback by province visual */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Solar Payback Period by Province</h2>
        <p className="text-gray-600 text-sm mb-5">Higher electricity rates = faster payback. Based on 10 kW system, $25K installed cost, $5K federal grant.</p>
        <div className="space-y-3 bg-white border border-gray-200 rounded-xl p-5">
          {paybackByProvince.map((p) => (
            <div key={p.province} className="flex items-center gap-4">
              <div className="w-8 text-xs font-bold text-gray-700 shrink-0">{p.province}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.color} flex items-center pl-2`}
                  style={{ width: p.width }}
                >
                  <span className="text-xs font-semibold text-white drop-shadow">{p.payback}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 w-20 shrink-0">${p.rate}/kWh</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sun hours */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Is Atlantic Canada Sunny Enough for Solar?</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Yes — all provinces covered receive 1,300–1,530 peak sun hours per year. That&apos;s more than Germany, which has one of the world&apos;s highest solar adoption rates. Modern panels work on cloudy days; snow sheds quickly due to panel heat and pitch angle.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {sunHours.map((s) => (
            <div key={s.city} className={`border rounded-xl p-3 text-center ${s.city.includes("Germany") ? "border-gray-200 bg-gray-50" : "border-amber-100 bg-amber-50"}`}>
              <div className={`text-xl font-bold ${s.city.includes("Germany") ? "text-gray-500" : "text-amber-600"}`}>{s.hours.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-0.5">peak sun hrs/yr</div>
              <div className="text-xs font-semibold text-gray-700 mt-1">{s.city}</div>
            </div>
          ))}
        </div>
        <ul className="space-y-2">
          {[
            "South-facing roof at 35–45° pitch performs best across all provinces",
            "Provincial electricity rates ($0.138–$0.185/kWh) make solar economics strong everywhere",
            "NS and ON have the best combination of rates + sun hours",
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
        <h2 className="text-2xl font-bold mb-4">What Does Solar Cost?</h2>
        <div className="border border-gray-300 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 px-5 py-2 text-xs font-bold text-gray-600 uppercase tracking-wide">
            <div>System Size</div>
            <div className="hidden md:block">Best For</div>
            <div>Installed Cost</div>
            <div>After $5K Grant</div>
          </div>
          {[
            { size: "5 kW", home: "Small home / condo (800–1,200 sqft)", cost: "$14,000–$18,000", net: "$9,000–$13,000" },
            { size: "8 kW", home: "Medium home (1,200–2,000 sqft)", cost: "$20,000–$26,000", net: "$15,000–$21,000" },
            { size: "12 kW", home: "Large home / heat pump + solar bundle", cost: "$28,000–$36,000", net: "$23,000–$31,000" },
          ].map((row, i) => (
            <div key={row.size} className={`grid grid-cols-4 gap-2 px-5 py-4 text-sm border-b border-gray-200 last:border-b-0 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
              <div className="font-bold text-gray-900">{row.size}</div>
              <div className="text-gray-700 hidden md:block">{row.home}</div>
              <div className="text-gray-900 font-medium">{row.cost}</div>
              <div className="text-green-700 font-bold">{row.net}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">Estimates. Prices similar across all 5 provinces — get quotes from certified local installers for accurate pricing.</p>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Steps to Going Solar</h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Get solar quotes from certified installers", desc: "Compare system size, brand, warranty, and utility interconnection experience. Use our directory to find rated installers in your province." },
            { step: "2", title: "Sign and permit", desc: "Installer pulls the required electrical permit and submits your net metering application to your provincial utility." },
            { step: "3", title: "Installation (1–3 days)", desc: "Panel mounting, inverter installation, electrical connection. Electrical inspector visit required in all provinces." },
            { step: "4", title: "Utility meter swap", desc: "Your provincial utility replaces your meter (bi-directional, no cost). Net metering credits start from your first generation month." },
            { step: "5", title: "Check for federal programs", desc: "Federal Greener Homes Grant closed Feb 2024. Visit canada.ca to check for any replacement federal solar incentive programs." },
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
        <p className="text-amber-100 mb-6">Independently rated solar installers across Atlantic Canada and Ontario. Compare GreenHome Scores, certifications, and service areas.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/installers?service=solar" className="bg-white text-amber-700 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors inline-flex items-center gap-2">
            Find Solar Installers <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/rebates#solar" className="border border-amber-300 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors">
            Solar Rebates
          </Link>
        </div>
      </div>
    </main>
  );
}
