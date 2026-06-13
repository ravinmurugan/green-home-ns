import Link from "next/link";
import { ArrowRight, Leaf, Sun, Thermometer, DollarSign, Shield, Star } from "lucide-react";
import { getFeaturedInstallers, stats } from "@/data/installers/index";
import { totalMaxRebate } from "@/data/rebates/programs";
import InstallerCard from "@/components/InstallerCard";
import EmailCapture from "@/components/EmailCapture";

const featured = getFeaturedInstallers(3);

const whyItems = [
  {
    icon: Star,
    title: "Research-Based Ratings",
    desc: "GreenHome Scores built from verified reviews, certification registries, BBB records, and pricing data. Ratings set before any commercial discussion.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Shield,
    title: "Certified Installers Only",
    desc: "Every listed installer holds verified provincial and federal certifications. No uncertified contractors. No pay-to-list placements.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: DollarSign,
    title: "Up to $15,000 in Rebates",
    desc: "Stack provincial and federal grants. Our rebate guide shows exactly which programs apply to your province, income, and heat source.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl fade-up">
            <div className="inline-flex items-center gap-2 bg-green-600/40 border border-green-500/30 rounded-full px-3 py-1 text-sm mb-6">
              <Leaf className="w-3.5 h-3.5" />
              Atlantic Canada &amp; Ontario — Independent Ratings
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Heat Pump &amp; Solar Installer<br />
              <span className="gradient-text">Ratings You Can Trust</span>
            </h1>
            <p className="text-green-100 text-lg mb-6 leading-relaxed">
              Independent research across NS, NB, PEI, NL &amp; Ontario.{" "}
              <strong className="text-white">{stats.total} rated installers</strong> — ranked by GreenHome Score, not by who pays us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/installers"
                className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                View Ratings <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/rebate-quiz"
                className="border border-green-400 text-white px-6 py-3 rounded-lg hover:bg-green-700/50 transition-colors flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" /> Check Rebate Eligibility
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-green-200">
              <span className="inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Free to browse</span>
              <span className="inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> No pay-to-list</span>
              <span className="inline-flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5" /> Rebate links checked weekly</span>
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
              { value: `${stats.provinces}`, label: "Provinces Covered" },
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
        <h2 className="text-2xl font-bold text-center mb-8">Browse Ratings By Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/installers?service=heat-pump"
            className="group card-lift bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 hover:opacity-90 transition-opacity"
          >
            <Thermometer className="w-10 h-10 mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-2">Heat Pump Ratings</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-5">
              Mini-split, central ducted, cold-climate, and ground-source. Compare installers across Atlantic Canada and Ontario — ranked by GreenHome Score.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">{stats.heatPump} rated installers</span>
              <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">View Ratings →</span>
            </div>
          </Link>
          <Link
            href="/installers?service=solar"
            className="group card-lift bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-2xl p-8 hover:opacity-90 transition-opacity"
          >
            <Sun className="w-10 h-10 mb-4 text-amber-200" />
            <h3 className="text-2xl font-bold mb-2">Solar Installer Ratings</h3>
            <p className="text-amber-100 text-sm leading-relaxed mb-5">
              Residential solar PV with net metering across Atlantic Canada. Compare certified installers by score.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-amber-200 text-sm">{stats.solar} rated installers</span>
              <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">View Ratings →</span>
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
              Highest Rated
            </div>
            <h2 className="text-2xl font-bold">Top GreenHome Scores</h2>
          </div>
          <Link href="/installers" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
            All ratings <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((installer, i) => (
            <InstallerCard key={installer.id} installer={installer} rank={i + 1} />
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
              Provincial and federal grants can be stacked — but only in the right order, with the right installer, using approved equipment. Our quiz finds your exact programs in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tools/rebate-quiz"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Check My Rebate Eligibility <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/rebates"
                className="border border-green-400 text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
              >
                Rebate Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why GreenHomeNS */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Why GreenHomeNS?</h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm">
            Independent research. Not affiliated with any installer, manufacturer, or government program.
          </p>
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

      {/* Email capture */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <EmailCapture
          variant="band"
          source="homepage"
          heading="Get NS rebate alerts + new installer ratings"
          sub="Programs change and deadlines pass. We'll email you when rebate amounts shift or top-rated installers are added in your province. No spam — unsubscribe anytime."
        />
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Compare Installers?</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {stats.total} independently rated heat pump and solar installers across Atlantic Canada and Ontario. Scores based on research — not who pays us.
        </p>
        <Link
          href="/installers"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          View All Ratings <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
