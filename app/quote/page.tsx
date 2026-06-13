import type { Metadata } from "next";
import { Shield, Award, BadgeCheck } from "lucide-react";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote | GreenHomeNS",
  description:
    "Get matched with a top-rated, certified heat pump or solar installer in Nova Scotia. Free, independent, and no obligation — plus rebate guidance worth up to $13,000.",
};

const trust = [
  { icon: BadgeCheck, label: "100% Free", desc: "No cost, no obligation" },
  { icon: Shield, label: "Independent", desc: "We don't sell your data" },
  { icon: Award, label: "Top-Rated Only", desc: "Certified installers" },
];

export default function QuotePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 md:py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Get matched with a top-rated NS installer
            <br />
            <span className="text-green-300">free, no obligation</span>
          </h1>
          <p className="text-green-100 text-lg leading-relaxed">
            Tell us about your home and we&apos;ll connect you with a certified heat pump or solar
            installer — plus the exact rebates you qualify for, up to $13,000.
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {trust.map((t) => (
              <div key={t.label} className="py-5 px-3 text-center">
                <t.icon className="w-5 h-5 text-green-600 mx-auto mb-1.5" />
                <div className="text-sm font-bold">{t.label}</div>
                <div className="text-xs text-gray-500">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 py-14">
        <QuoteForm />
        <p className="text-xs text-gray-500 text-center mt-4">
          GreenHomeNS is independent. We forward your request to a top-rated installer in your area —
          you&apos;re never under any obligation.
        </p>
      </section>
    </main>
  );
}
