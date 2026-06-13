import { Leaf, Star, Shield, Search, Mail, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About GreenHomeNS — Our Ratings Methodology & Independence Policy",
  description:
    "How GreenHomeNS rates heat pump and solar installers across Atlantic Canada and Ontario. Independent research, no pay-to-play listings. Affiliates approached after ratings, never before.",
};

const scoreCategories = [
  {
    label: "Installation Quality",
    weight: "25%",
    desc: "Based on verified customer reviews across Google, Facebook, BBB, and HomeStars. Weighted toward recent reviews (last 12 months). Flags: callbacks, damage, incomplete work, follow-up issues.",
    icon: Star,
    color: "text-amber-600 bg-amber-50",
  },
  {
    label: "Value for Money",
    weight: "20%",
    desc: "Relative pricing compared to provincial market average for equivalent system size and brand tier. Considers what's included: permits, rebate assistance, post-install support. Not a race to cheapest.",
    icon: BarChart3,
    color: "text-green-600 bg-green-50",
  },
  {
    label: "Response Time",
    weight: "20%",
    desc: "Assessment and installation wait times sourced from reviews and publicly stated scheduling. Bonus for same-week availability. Penalty for repeated complaints about delays or no-shows.",
    icon: Shield,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Warranty Coverage",
    weight: "20%",
    desc: "Manufacturer warranty pass-through, installer workmanship warranty length, and whether the business has a track record of honouring claims. MEQ/authorized dealer status increases score.",
    icon: CheckCircle2,
    color: "text-purple-600 bg-purple-50",
  },
  {
    label: "Certifications",
    weight: "15%",
    desc: "Verified against official lists: Efficiency NS approved, NB Power approved, HRAI membership, NSESA certification, ECCC registration, Red Seal journeyman, MEQ/authorized dealer, BBB accreditation.",
    icon: Search,
    color: "text-indigo-600 bg-indigo-50",
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <Leaf className="w-4 h-4" />
          About GreenHomeNS
        </div>
        <h1 className="text-3xl font-bold mb-4">Who We Are & How We Rate</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          GreenHomeNS is an independent research directory for homeowners across Atlantic Canada and Ontario evaluating heat pump and solar installers. We publish ratings based on public data — not payments.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-12">
        <h2 className="text-xl font-bold mb-3">Why We Built This</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Atlantic Canada has the highest rate of oil heating in Canada — and one of the most complex rebate landscapes. Homeowners across NS, NB, PEI, NL, and Ontario told us the same story: they didn&apos;t know which installers were actually good, which rebate programs applied to them, or what order to do things in to avoid losing their grant.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We spent hundreds of hours researching certified installers across all 5 provinces — reading reviews, verifying certifications, comparing pricing signals, and cross-referencing complaints. The GreenHome Score is the result of that research, published openly so any homeowner can compare installers on equal terms.
        </p>
      </section>

      {/* Independence */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Independence Policy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              title: "Ratings first, affiliates second",
              desc: "Every installer on this site was researched and rated before any commercial relationship was established. GreenHome Scores are never adjusted for payment.",
              icon: "01",
            },
            {
              title: "No pay-to-list model",
              desc: "Installers cannot pay to appear in our directory. Inclusion is based solely on being provincially approved and operating in one of our 5 covered provinces.",
              icon: "02",
            },
            {
              title: "Affiliate links are labelled",
              desc: "Where affiliate relationships exist, they are disclosed on the relevant installer pages and in our Affiliate Disclosure. Commission does not influence scores.",
              icon: "03",
            },
          ].map((item) => (
            <div key={item.title} className="border border-gray-200 rounded-xl p-5">
              <div className="text-2xl font-bold text-green-600 mb-3">{item.icon}</div>
              <div className="font-bold mb-2">{item.title}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Affiliate disclosure:</strong> GreenHomeNS may earn a referral commission when a homeowner contacts an installer through our site. This commission is paid by the installer — never by the homeowner — and does not change the price of any service. See our full{" "}
            <Link href="/affiliate-disclosure" className="text-green-700 underline">Affiliate Disclosure</Link>.
          </p>
        </div>
      </section>

      {/* GreenHome Score Methodology */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">GreenHome Score™ — Methodology</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Each installer is scored out of 100 across five weighted categories. All data is sourced from publicly available information — review platforms, certification registries, BBB, and business records. No installer self-reporting is used without independent verification.
        </p>

        <div className="space-y-4 mb-8">
          {scoreCategories.map((cat) => (
            <div key={cat.label} className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cat.color}`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="font-bold">{cat.label}</div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{cat.weight} weight</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Score scale */}
        <div className="border border-gray-200 rounded-xl p-5">
          <div className="font-bold mb-4">Score Scale</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { range: "90–100", label: "Exceptional", color: "bg-green-100 text-green-800 border-green-200" },
              { range: "80–89", label: "Very Good", color: "bg-blue-100 text-blue-800 border-blue-200" },
              { range: "70–79", label: "Good", color: "bg-amber-100 text-amber-800 border-amber-200" },
              { range: "Below 70", label: "Not Listed", color: "bg-gray-100 text-gray-700 border-gray-200" },
            ].map((s) => (
              <div key={s.range} className={`border rounded-lg p-3 text-center ${s.color}`}>
                <div className="text-lg font-bold">{s.range}</div>
                <div className="text-xs font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Installers scoring below 70 are not listed in the directory. We only list installers we would recommend to a family member.
          </p>
        </div>
      </section>

      {/* Data sources */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            "Google Reviews",
            "Facebook Reviews",
            "BBB Accreditation & Complaints",
            "HomeStars",
            "ThreeBestRated",
            "Efficiency NS Approved List",
            "NB Power Approved Contractor List",
            "Island Prosperity Fund Approved List",
            "HRAI Member Directory",
            "NSESA Registry",
            "ECCC Registration",
            "Mitsubishi MEQ/Diamond Dealer Lists",
            "NS Power Preferred Contractor List",
            "Consumer Choice Award Records",
            "Enbridge HER+ Contractor List",
          ].map((source) => (
            <div key={source} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
              {source}
            </div>
          ))}
        </div>
      </section>

      {/* Ratings disclaimer */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-12">
        <h2 className="text-xl font-bold mb-3">Ratings Disclaimer</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            GreenHome Scores are editorial opinions based on publicly available data at the time of research. They are not endorsements, guarantees, or warranties of any kind. Installer quality can change — scores are updated periodically but may not reflect recent changes in ownership, staffing, or business practices.
          </p>
          <p>
            No installer has paid to receive a higher score. No installer has been penalized for declining a commercial relationship. Our editorial process is independent of our affiliate relationships.
          </p>
          <p>
            Homeowners should always verify certifications, licensing, and insurance directly with the installer before signing any contract. GreenHomeNS is not responsible for the quality, pricing, or conduct of any listed installer.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Contact Us</h2>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          General enquiries, installer partnerships, corrections, and press —{" "}
          <a href="mailto:info@greenhomens.com" className="text-green-700 hover:underline font-semibold">
            info@greenhomens.com
          </a>
        </p>
        <p className="text-xs text-gray-500">Response within 2 business days. Ratings are set before any commercial discussion begins.</p>
      </section>
    </main>
  );
}
