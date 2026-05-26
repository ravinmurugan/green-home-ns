import Link from "next/link";
import { DollarSign, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import { rebatePrograms, totalMaxRebate } from "@/data/rebates/programs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pump & Solar Rebates — Atlantic Canada & Ontario 2026 | GreenHomeNS",
  description:
    "Complete rebate guide for heat pumps and solar across NS, NB, PEI, NL, and Ontario. Stack provincial and federal grants for up to $15,000. Updated 2026.",
};

const providerLabel: Record<string, string> = {
  "efficiency-ns": "Efficiency Nova Scotia",
  federal: "Government of Canada",
  "ns-power": "NS Power",
  municipal: "Municipal",
};

const providerColor: Record<string, string> = {
  "efficiency-ns": "bg-blue-100 text-blue-700",
  federal: "bg-red-100 text-red-700",
  "ns-power": "bg-amber-100 text-amber-700",
  municipal: "bg-purple-100 text-purple-700",
};

export default function RebatesPage() {
  const heatPumpPrograms = rebatePrograms.filter((r) => r.services.includes("heat-pump"));
  const solarPrograms = rebatePrograms.filter((r) => r.services.includes("solar"));

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <DollarSign className="w-4 h-4" />
          Rebate Guide — NS, NB, PEI, NL &amp; Ontario — Updated 2026
        </div>
        <h1 className="text-3xl font-bold mb-3">Green Energy Rebate Guide</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Homeowners across Atlantic Canada and Ontario can stack provincial and federal rebates for major savings. Here&apos;s every active program, what you qualify for, and how to apply.
        </p>
      </div>

      {/* Stacking callout */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10">
        <h2 className="font-bold text-xl mb-4">Maximum Stacked Rebates Available</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 text-center border border-green-100">
            <div className="text-3xl font-bold text-green-600">${totalMaxRebate.heatPump.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Heat Pump Max</div>
            <div className="text-xs text-gray-600">ENS $3,000 + Federal $5,000</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-green-100">
            <div className="text-3xl font-bold text-amber-600">${totalMaxRebate.solar.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Solar Max</div>
            <div className="text-xs text-gray-600">Federal $5,000 + net metering savings</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-green-100">
            <div className="text-3xl font-bold text-blue-600">${totalMaxRebate.both.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Both Combined</div>
            <div className="text-xs text-gray-600">Heat pump + solar bundle</div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          <strong>Key rule:</strong> You must use a provincially approved installer and follow the application order (pre-retrofit assessment → install → post-retrofit assessment) to claim all rebates.{" "}
          <Link href="/installers" className="text-green-700 underline">Compare rated installers by province →</Link>
        </p>
      </div>

      {/* Heat pump programs */}
      <section className="mb-12" id="heat-pump">
        <h2 className="text-2xl font-bold mb-6">Heat Pump Rebates</h2>
        <div className="space-y-5">
          {heatPumpPrograms.map((program) => (
            <div key={program.id} className="border border-gray-200 rounded-xl p-6" id={program.id}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${providerColor[program.provider]}`}>
                      {providerLabel[program.provider]}
                    </span>
                    {program.active && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{program.name}</h3>
                </div>
                {program.maxAmount > 0 && (
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-green-600">${program.maxAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">max rebate</div>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{program.description}</p>
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Eligibility</div>
                <ul className="space-y-1.5">
                  {program.eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={program.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:underline font-semibold"
              >
                Apply / Learn More <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Solar programs */}
      <section className="mb-12" id="solar">
        <h2 className="text-2xl font-bold mb-6">Solar Rebates & Incentives</h2>
        <div className="space-y-5">
          {solarPrograms.map((program) => (
            <div key={program.id} className="border border-gray-200 rounded-xl p-6" id={program.id}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${providerColor[program.provider]}`}>
                      {providerLabel[program.provider]}
                    </span>
                    {program.active && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{program.name}</h3>
                </div>
                {program.maxAmount > 0 && (
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-amber-600">${program.maxAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">max grant</div>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{program.description}</p>
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">Eligibility</div>
                <ul className="space-y-1.5">
                  {program.eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={program.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:underline font-semibold"
              >
                Apply / Learn More <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-green-600 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Claim Your Rebate?</h2>
        <p className="text-green-100 mb-6">
          The right installer handles your rebate paperwork. Compare independently rated contractors in your province and let them do the work.
        </p>
        <Link
          href="/installers"
          className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2"
        >
          View Installer Ratings <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
