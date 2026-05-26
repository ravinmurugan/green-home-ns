"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, ArrowRight, DollarSign, Zap, Sun } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  rebatePrograms,
  provinceComparison,
  getRebatesByProvince,
  type ProvinceComparisonRow,
} from "@/data/rebates/programs";
import type { RebateProgram } from "@/lib/types";

// ── Constants ────────────────────────────────────────────────────────────────

type Province = "all" | "NS" | "NB" | "PEI" | "NL" | "ON";

const PROVINCE_TABS: { key: Province; label: string }[] = [
  { key: "all", label: "All Provinces" },
  { key: "NS",  label: "Nova Scotia" },
  { key: "NB",  label: "New Brunswick" },
  { key: "PEI", label: "PEI" },
  { key: "NL",  label: "Newfoundland" },
  { key: "ON",  label: "Ontario" },
];

const PROVINCE_FULL: Record<string, string> = {
  NS: "Nova Scotia",
  NB: "New Brunswick",
  PEI: "Prince Edward Island",
  NL: "Newfoundland & Labrador",
  ON: "Ontario",
};

const PROVINCE_STATS: Record<string, { provincial: number; federal: number; total: number }> = {
  NS:  { provincial: 3000,  federal: 5000, total: 15000 },
  NB:  { provincial: 2000,  federal: 5000, total: 7000  },
  PEI: { provincial: 2000,  federal: 5000, total: 7000  },
  NL:  { provincial: 2000,  federal: 5000, total: 7000  },
  ON:  { provincial: 5000,  federal: 5000, total: 10000 },
};

const NS_STACKING_STEPS = [
  { step: 1, label: "Efficiency NS Rebate", amount: "$3,000", color: "bg-blue-500", who: "Provincial" },
  { step: 2, label: "Canada Greener Homes", amount: "$5,000", color: "bg-red-500", who: "Federal" },
  { step: 3, label: "CleanHeat (income-qualified)", amount: "+$7,000", color: "bg-green-500", who: "Provincial+" },
];

const PROVINCE_STACKING: Record<string, Array<{ step: number; label: string; amount: string; color: string; who: string }>> = {
  NB: [
    { step: 1, label: "NB Power Smart Saver", amount: "$2,000", color: "bg-blue-500", who: "Provincial" },
    { step: 2, label: "Canada Greener Homes", amount: "$5,000", color: "bg-red-500", who: "Federal" },
  ],
  PEI: [
    { step: 1, label: "Island Prosperity Fund", amount: "$2,000", color: "bg-blue-500", who: "Provincial" },
    { step: 2, label: "Canada Greener Homes", amount: "$5,000", color: "bg-red-500", who: "Federal" },
  ],
  NL: [
    { step: 1, label: "NL Heat Pump Incentive", amount: "$2,000", color: "bg-blue-500", who: "Provincial" },
    { step: 2, label: "Canada Greener Homes", amount: "$5,000", color: "bg-red-500", who: "Federal" },
  ],
  ON: [
    { step: 1, label: "Enbridge HER+", amount: "$5,000", color: "bg-amber-500", who: "Utility" },
    { step: 2, label: "Canada Greener Homes", amount: "$5,000", color: "bg-red-500", who: "Federal" },
  ],
};

const PROVIDER_LABEL: Record<string, string> = {
  "efficiency-ns": "Efficiency Nova Scotia",
  federal: "Government of Canada",
  "ns-power": "NS Power",
  municipal: "Municipal",
  "nb-power": "NB Power",
  "pei-fund": "Island Prosperity Fund",
  "nl-crown": "Government of NL",
  enbridge: "Enbridge Gas",
};

const PROVIDER_BADGE: Record<string, string> = {
  "efficiency-ns": "bg-blue-100 text-blue-700",
  federal: "bg-red-100 text-red-700",
  "ns-power": "bg-amber-100 text-amber-700",
  municipal: "bg-purple-100 text-purple-700",
  "nb-power": "bg-blue-100 text-blue-700",
  "pei-fund": "bg-blue-100 text-blue-700",
  "nl-crown": "bg-blue-100 text-blue-700",
  enbridge: "bg-amber-100 text-amber-700",
};

// Left border accent on cards
const PROVIDER_BORDER: Record<string, string> = {
  "efficiency-ns": "border-l-blue-500",
  federal: "border-l-red-500",
  "ns-power": "border-l-amber-500",
  municipal: "border-l-purple-500",
  "nb-power": "border-l-blue-500",
  "pei-fund": "border-l-blue-500",
  "nl-crown": "border-l-blue-500",
  enbridge: "border-l-amber-500",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgramCard({ program }: { program: RebateProgram }) {
  const borderClass = PROVIDER_BORDER[program.provider] ?? "border-l-gray-400";
  return (
    <div className={`border border-gray-200 border-l-4 ${borderClass} rounded-xl p-6 bg-white`} id={program.id}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PROVIDER_BADGE[program.provider]}`}>
              {PROVIDER_LABEL[program.provider]}
            </span>
            {program.active ? (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
            ) : (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Inactive</span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{program.name}</h3>
        </div>
        {program.maxAmount > 0 && (
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-green-600">${program.maxAmount.toLocaleString()}</div>
            <div className="text-xs text-gray-500">max rebate</div>
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{program.description}</p>
      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-700 mb-2">Eligibility</div>
        <ul className="space-y-1.5">
          {program.eligibility.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
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
  );
}

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wide">
        {icon}
        {label}
      </div>
      <div className="text-3xl font-bold text-green-600">{value}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}

// Custom tooltip for the stacked bar chart
interface TooltipPayload {
  name: string;
  value: number;
  fill: string;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, p) => sum + (p.value || 0), 0);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
      <div className="font-bold text-gray-800 mb-2">{PROVINCE_FULL[label ?? ""] ?? label}</div>
      {payload.map((p) => (
        p.value > 0 && (
          <div key={p.name} className="flex justify-between gap-4">
            <span style={{ color: p.fill }}>{p.name}</span>
            <span className="font-semibold">${p.value.toLocaleString()}</span>
          </div>
        )
      ))}
      <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between gap-4 font-bold">
        <span className="text-gray-700">Total Max</span>
        <span className="text-green-600">${total.toLocaleString()}</span>
      </div>
    </div>
  );
}

function StackedBarChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Maximum Heat Pump Rebates by Province</h3>
      <p className="text-sm text-gray-500 mb-6">Provincial + Federal + Income Bonus stacked</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={provinceComparison} margin={{ top: 16, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="province" tick={{ fontSize: 13, fill: "#374151" }} />
          <YAxis
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            width={48}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            formatter={(value: string) => <span className="text-xs text-gray-600">{value}</span>}
          />
          <Bar dataKey="heatPumpProvincial" name="Provincial" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]}>
            {provinceComparison.map((entry) => (
              <Cell key={entry.province} fill={entry.province === "NS" ? "#2563eb" : "#3b82f6"} />
            ))}
          </Bar>
          <Bar dataKey="heatPumpFederal" name="Federal" stackId="a" fill="#ef4444">
            {provinceComparison.map((entry) => (
              <Cell key={entry.province} fill={entry.province === "NS" ? "#dc2626" : "#ef4444"} />
            ))}
          </Bar>
          <Bar dataKey="incomeBonus" name="Income Bonus (NS)" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]}>
            {provinceComparison.map((entry) => (
              <Cell key={entry.province} fill={entry.province === "NS" ? "#16a34a" : "#22c55e"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function NSStackingChart() {
  const nsSteps = [
    { name: "Step 1: ENS Rebate",        value: 3000, fill: "#3b82f6" },
    { name: "Step 2: Greener Homes",      value: 5000, fill: "#ef4444" },
    { name: "Step 3: CleanHeat (income)", value: 7000, fill: "#22c55e" },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">How NS Rebates Stack (Best Case)</h3>
      <p className="text-sm text-gray-500 mb-6">Apply in this order — each layer builds on the last</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={nsSteps} layout="vertical" margin={{ top: 0, right: 80, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis type="number" tickFormatter={(v: number) => `$${v.toLocaleString()}`} tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis type="category" dataKey="name" width={180} tick={{ fontSize: 12, fill: "#374151" }} />
          <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "Amount"]} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {nsSteps.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-3">
        *CleanHeat income bonus applies to oil-heated households below the program income threshold. Not stackable with all programs.
      </p>
    </div>
  );
}

function ProvinceComparisonTable({ onSelectProvince }: { onSelectProvince: (p: Province) => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Province Comparison</h3>
        <p className="text-sm text-gray-500">Click any row to view that province&apos;s programs</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 font-semibold text-gray-600">Province</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-right">HP Provincial</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-right">HP Federal</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-right">Income Bonus</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-right">HP Total</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-right">Solar Federal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {provinceComparison.map((row: ProvinceComparisonRow, i) => {
              const isNS = row.province === "NS";
              const rowClass = isNS
                ? "bg-green-50 hover:bg-green-100 cursor-pointer"
                : i % 2 === 0
                ? "bg-white hover:bg-gray-50 cursor-pointer"
                : "bg-gray-50 hover:bg-gray-100 cursor-pointer";
              return (
                <tr
                  key={row.province}
                  className={rowClass}
                  onClick={() => onSelectProvince(row.province as Province)}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    <span className={isNS ? "text-green-700" : ""}>{PROVINCE_FULL[row.province]}</span>
                    {isNS && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Best</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">${row.heatPumpProvincial.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-700">${row.heatPumpFederal.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {row.incomeBonus > 0 ? (
                      <span className="text-green-600 font-medium">+${row.incomeBonus.toLocaleString()}*</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${isNS ? "text-green-700" : "text-gray-800"}`}>
                    ${row.totalMax.toLocaleString()}
                    {isNS && <span className="text-xs font-normal text-gray-400 ml-0.5">*</span>}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">${row.solarFederal.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          *Income-qualified households in NS via CleanHeat + OHPA programs. Not automatic — application required.
        </p>
      </div>
    </div>
  );
}

function StackingGuide({ province }: { province: string }) {
  const steps = province === "NS" ? NS_STACKING_STEPS : PROVINCE_STACKING[province];
  if (!steps) return null;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 className="text-base font-bold text-gray-900 mb-4">Application Order — {PROVINCE_FULL[province]}</h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {steps.map((s, idx) => (
          <>
            <div key={s.step} className="flex-1 min-w-0">
              <div className={`text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2 ${s.color}`}>
                Step {s.step} — {s.who}
              </div>
              <div className="font-semibold text-gray-800 text-sm">{s.label}</div>
              <div className="text-green-600 font-bold text-lg">{s.amount}</div>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight key={`arrow-${idx}`} className="w-5 h-5 text-gray-400 shrink-0 rotate-90 sm:rotate-0" />
            )}
          </>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Complete the pre-retrofit home energy assessment before installation to be eligible for the federal grant.
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RebatesPage() {
  const [activeProvince, setActiveProvince] = useState<Province>("all");

  const provincePrograms = activeProvince === "all"
    ? []
    : getRebatesByProvince(activeProvince);

  const stats = activeProvince !== "all" ? PROVINCE_STATS[activeProvince] : null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">

      {/* ── Hero ── */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <DollarSign className="w-4 h-4" />
          Updated May 2026
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Green Energy Rebate Guide</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          NS, NB, PEI, NL &amp; Ontario — 2026 Programs. Stack provincial and federal grants for up to $15,000 back on your heat pump or solar install.
        </p>
      </div>

      {/* ── Province Tabs ── */}
      <div className="flex flex-wrap gap-2 mb-10">
        {PROVINCE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveProvince(tab.key)}
            className={
              activeProvince === tab.key
                ? "px-4 py-2 rounded-full text-sm font-semibold bg-green-600 text-white shadow-sm transition-colors"
                : "px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── All Provinces View ── */}
      {activeProvince === "all" && (
        <div className="space-y-8">
          <StackedBarChart />
          <ProvinceComparisonTable onSelectProvince={setActiveProvince} />
          <NSStackingChart />
        </div>
      )}

      {/* ── Individual Province View ── */}
      {activeProvince !== "all" && stats && (
        <div className="space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Provincial Max"
              value={`$${stats.provincial.toLocaleString()}`}
              sub="From provincial program"
              icon={<Zap className="w-3.5 h-3.5" />}
            />
            <StatCard
              label="Federal Max"
              value={`$${stats.federal.toLocaleString()}`}
              sub="Canada Greener Homes"
              icon={<DollarSign className="w-3.5 h-3.5" />}
            />
            <StatCard
              label="Total Stacked Max"
              value={`$${stats.total.toLocaleString()}`}
              sub={activeProvince === "NS" ? "incl. income bonus" : "combined max"}
              icon={<Sun className="w-3.5 h-3.5" />}
            />
          </div>

          {/* Stacking guide */}
          <StackingGuide province={activeProvince} />

          {/* Program cards */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Active Programs — {PROVINCE_FULL[activeProvince]}
            </h2>
            {provincePrograms.length === 0 ? (
              <p className="text-gray-400 text-sm">No programs found for this province.</p>
            ) : (
              <div className="space-y-5">
                {provincePrograms.map((program: RebateProgram) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Bottom CTA ── */}
      <div className="mt-16 bg-green-600 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Find Your Exact Programs in 60 Seconds</h2>
        <p className="text-green-100 mb-6 max-w-md mx-auto">
          Use our Rebate Quiz to get a personalised list of every program you qualify for — with amounts and application links.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/tools/rebate-quiz"
            className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2"
          >
            Take the Rebate Quiz <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/installers"
            className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors inline-flex items-center gap-2"
          >
            Compare Installers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
