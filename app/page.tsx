import Link from "next/link";
import { ArrowRight, Leaf, Sun, Thermometer, DollarSign, Shield, Star } from "lucide-react";
import { getFeaturedInstallers, stats } from "@/data/installers/index";
import { totalMaxRebate } from "@/data/rebates/programs";
import InstallerCard from "@/components/InstallerCard";

const featured = getFeaturedInstallers(3);

const whyItems = [
  {
    icon: DollarSign,
    title: "Up to $8,000 in Rebates",
    desc: "Stack Efficiency NS and federal Greener Homes grants. Our rebate guide shows you exactly what you qualify for.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Certified Installers Only",
    desc: "Every installer is Efficiency NS approved and independently rated. No uncertified contractors in our directory.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Star,
    title: "Real GreenHome Scores",
    desc: "Six-category ratings: install quality, value, response time, warranty, and certifications. Honest, independent.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-600/40 border border-green-500/30 rounded-full px-3 py-1 text-sm mb-6">
              <Leaf className="w-3.5 h-3.5" />
              Nova Scotia&apos;s Green Energy Directory
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Find Trusted Heat Pump &<br />
              <span className="text-green-300">Solar Installers in NS</span>
            </h1>
            <p className="text-green-100 text-lg mb-6 leading-relaxed">
              Compare certified installers, unlock up to{" "}
              <strong className="text-white">${totalMaxRebate.both.toLocaleString()} in rebates</strong>, and get free quotes — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/installers"
                className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                Find Installers <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/rebates"
                className="border border-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-700/50 transition-colors flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" /> Check NS Rebates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200">
            {[
              { value: `${stats.total}`, label: "Rated Installers" },
              { value: `${stats.heatPump}`, label: "Heat Pump Certified" },
              { value: `${stats.solar}`, label: "Solar Certified" },
              { value: `$${(totalMaxRebate.both / 1000).toFixed(0)}K`, label: "Max Available Rebate" },
            ].map((s) => (
              <div key={s.label} className="py-6 px-4 md:px-8 text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">{s.value}</div>
                <div className="text-sm text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">What Are You Looking For?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/installers?service=heat-pump"
            className="group bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 hover:opacity-90 transition-opacity"
          >
            <Thermometer className="w-10 h-10 mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-2">Heat Pump Installers</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-5">
              Mini-split, central ducted, cold-climate, and ground-source. Replace oil heat and save up to $8,000 in combined rebates.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">{stats.heatPump} certified NS installers</span>
              <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">Find Installer →</span>
            </div>
          </Link>
          <Link
            href="/installers?service=solar"
            className="group bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-2xl p-8 hover:opacity-90 transition-opacity"
          >
            <Sun className="w-10 h-10 mb-4 text-amber-200" />
            <h3 className="text-2xl font-bold mb-2">Solar Panel Installers</h3>
            <p className="text-amber-100 text-sm leading-relaxed mb-5">
              Residential solar PV with NS Power net metering. Up to $5,000 federal grant plus ongoing bill credits from day one.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-amber-200 text-sm">{stats.solar} certified NS installers</span>
              <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">Find Installer →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured installers */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-1">
              <Star className="w-4 h-4 fill-green-600" />
              Editor&apos;s Picks
            </div>
            <h2 className="text-2xl font-bold">Top Rated NS Installers</h2>
          </div>
          <Link href="/installers" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((installer) => (
            <InstallerCard key={installer.id} installer={installer} />
          ))}
        </div>
      </section>

      {/* Rebate CTA */}
      <section className="bg-green-50 border-y border-green-200">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <DollarSign className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Don&apos;t Leave Rebate Money on the Table</h2>
            <p className="text-gray-600 mb-6">
              Stack Efficiency NS (up to $3,000) with the federal Greener Homes Grant (up to $5,000) — but only when using approved installers and following the right steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rebates"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                See All NS Rebates <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/installers"
                className="border border-green-400 text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
              >
                Browse Installers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why GreenHomeNS */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Why GreenHomeNS?</h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm">Independent — not affiliated with any installer or government program.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyItems.map((item) => (
            <div key={item.title} className={`${item.bg} rounded-xl p-6`}>
              <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Find Your Installer?</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Browse independently rated NS heat pump and solar installers. Compare scores, read highlights, and visit their websites directly.
        </p>
        <Link
          href="/installers"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          Browse All Installers <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
