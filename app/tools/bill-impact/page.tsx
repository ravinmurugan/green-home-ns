"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Zap, TrendingDown, Info } from "lucide-react";

type HeatSource = "oil" | "baseboard" | "propane";

// NS averages 2025-2026
const NS_ELEC_RATE = 0.185; // $/kWh NS Power
const OIL_PRICE = 1.55; // $/litre
const PROPANE_PRICE = 1.20; // $/litre
const BASEBOARD_RATE = 0.185;
const HEAT_PUMP_COP = 2.8; // cold-climate COP average over NS season

// Seasonal distribution of heating demand (% of annual)
const MONTHS = [
  { month: "Jan", pct: 0.20 },
  { month: "Feb", pct: 0.17 },
  { month: "Mar", pct: 0.13 },
  { month: "Apr", pct: 0.08 },
  { month: "May", pct: 0.03 },
  { month: "Jun", pct: 0.01 },
  { month: "Jul", pct: 0.01 },
  { month: "Aug", pct: 0.01 },
  { month: "Sep", pct: 0.03 },
  { month: "Oct", pct: 0.07 },
  { month: "Nov", pct: 0.12 },
  { month: "Dec", pct: 0.14 },
];

function calcBillImpact(source: HeatSource, annualSpend: number, baseNSPower: number) {
  // Current annual heating cost
  let annualHeatingCost = annualSpend;

  // Estimate heating kWh equivalent
  let heatingKwh: number;
  if (source === "oil") {
    // ~38.6 kWh per litre oil, 85% furnace efficiency
    const litres = annualSpend / OIL_PRICE;
    heatingKwh = litres * 38.6 * 0.85;
  } else if (source === "propane") {
    const litres = annualSpend / PROPANE_PRICE;
    heatingKwh = litres * 25.3 * 0.92;
  } else {
    // baseboard: direct kWh
    heatingKwh = annualSpend / BASEBOARD_RATE;
  }

  // Heat pump equivalent kWh (COP 2.8)
  const heatPumpKwh = heatingKwh / HEAT_PUMP_COP;
  const heatPumpHeatingCost = heatPumpKwh * NS_ELEC_RATE;

  const annualSavings = annualHeatingCost - heatPumpHeatingCost;

  // Monthly chart data
  const monthlyData = MONTHS.map(({ month, pct }) => ({
    month,
    [source === "oil" ? "Oil heat" : source === "propane" ? "Propane heat" : "Baseboard"]:
      Math.round(annualHeatingCost * pct),
    "Heat pump": Math.round(heatPumpHeatingCost * pct),
    "Base NS Power": Math.round(baseNSPower / 12),
  }));

  return {
    annualHeatingCost: Math.round(annualHeatingCost),
    heatPumpHeatingCost: Math.round(heatPumpHeatingCost),
    annualSavings: Math.round(annualSavings),
    monthlyAvgBefore: Math.round(annualHeatingCost / 12),
    monthlyAvgAfter: Math.round(heatPumpHeatingCost / 12),
    monthlyData,
    heatPumpKwh: Math.round(heatPumpKwh),
    heatingKwh: Math.round(heatingKwh),
    pctReduction: Math.round((annualSavings / annualHeatingCost) * 100),
  };
}

const sourceColors: Record<HeatSource, string> = {
  oil: "#ef4444",
  baseboard: "#f59e0b",
  propane: "#8b5cf6",
};

const sourceBarColors: Record<HeatSource, string> = {
  oil: "#fca5a5",
  baseboard: "#fcd34d",
  propane: "#c4b5fd",
};

export default function BillImpactPage() {
  const [heatSource, setHeatSource] = useState<HeatSource>("oil");
  const [annualSpend, setAnnualSpend] = useState(2800);
  const [baseNSPower, setBaseNSPower] = useState(120);

  const result = useMemo(() => calcBillImpact(heatSource, annualSpend, baseNSPower), [heatSource, annualSpend, baseNSPower]);

  const sourceLabel = heatSource === "oil" ? "Oil heat" : heatSource === "propane" ? "Propane heat" : "Baseboard";

  const fmt = (n: number) => `$${Math.abs(n).toLocaleString()}`;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
          <Zap className="w-4 h-4" />
          NS Power Bill Impact Tool
        </div>
        <h1 className="text-3xl font-bold mb-2">How Will a Heat Pump Change My NS Power Bill?</h1>
        <p className="text-gray-600">
          The #1 fear: "My neighbour switched and their bill spiked." See the full picture — old heating cost + new bill.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="font-semibold text-sm block mb-2">Current heat source</label>
            <div className="space-y-2">
              {([
                { value: "oil", label: "🛢️ Heating Oil", avg: "Avg NS: $2,800/yr" },
                { value: "baseboard", label: "⚡ Electric Baseboard", avg: "Avg NS: $2,200/yr" },
                { value: "propane", label: "🔵 Propane", avg: "Avg NS: $2,400/yr" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setHeatSource(opt.value)}
                  className={`w-full flex items-center justify-between p-3 border-2 rounded-xl text-sm transition-all ${
                    heatSource === opt.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-xs text-gray-600">{opt.avg}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Annual heating spend</label>
              <span className="text-xl font-bold text-blue-600">{fmt(annualSpend)}</span>
            </div>
            <input
              type="range"
              min={500}
              max={6000}
              step={100}
              value={annualSpend}
              onChange={(e) => setAnnualSpend(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>$500</span>
              <span>$6,000</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {heatSource === "oil"
                ? `≈ ${Math.round(annualSpend / OIL_PRICE).toLocaleString()} litres at $${OIL_PRICE}/L`
                : heatSource === "propane"
                ? `≈ ${Math.round(annualSpend / PROPANE_PRICE).toLocaleString()} litres at $${PROPANE_PRICE}/L`
                : `≈ ${Math.round(annualSpend / BASEBOARD_RATE).toLocaleString()} kWh at $0.185/kWh`}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Current monthly NS Power bill</label>
              <span className="text-xl font-bold text-blue-600">${baseNSPower}</span>
            </div>
            <input
              type="range"
              min={60}
              max={400}
              step={10}
              value={baseNSPower}
              onChange={(e) => setBaseNSPower(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>$60</span>
              <span>$400</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Lights, appliances, hot water — everything except heating</p>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-5">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-600 mb-1">Current heating/yr</div>
              <div className="text-2xl font-bold text-red-600">{fmt(result.annualHeatingCost)}</div>
              <div className="text-xs text-gray-600">{sourceLabel}</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-600 mb-1">Heat pump cost/yr</div>
              <div className="text-2xl font-bold text-blue-600">{fmt(result.heatPumpHeatingCost)}</div>
              <div className="text-xs text-gray-600">electricity only</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-xs text-gray-600 mb-1">Annual savings</div>
              <div className="text-2xl font-bold text-green-600">{fmt(result.annualSavings)}</div>
              <div className="text-xs text-gray-600">{result.pctReduction}% reduction</div>
            </div>
          </div>

          {/* Monthly comparison chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-semibold text-gray-700 mb-1">Monthly heating cost — before vs after</div>
            <div className="text-xs text-gray-600 mb-4">Heating cost only. Your base NS Power bill (${ baseNSPower}/mo) is separate and stays.</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={result.monthlyData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v) => [`$${v}`, ""]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey={sourceLabel} fill={sourceColors[heatSource]} radius={[3, 3, 0, 0]} />
                <Bar dataKey="Heat pump" fill="#22c55e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total monthly bill */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-semibold text-gray-700 mb-4">Total monthly bill — what changes</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">Before heat pump</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Base NS Power</span>
                    <span className="font-semibold">${baseNSPower}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{sourceLabel} (avg/mo)</span>
                    <span className="font-semibold text-red-600">{fmt(result.monthlyAvgBefore)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold">
                    <span>Total avg/mo</span>
                    <span>${(baseNSPower + result.monthlyAvgBefore).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">After heat pump</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Base NS Power</span>
                    <span className="font-semibold">${baseNSPower}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Heat pump (avg/mo)</span>
                    <span className="font-semibold text-blue-600">{fmt(result.monthlyAvgAfter)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold">
                    <span>Total avg/mo</span>
                    <span className="text-green-600">${(baseNSPower + result.monthlyAvgAfter).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-green-600 shrink-0" />
              <div className="text-sm">
                <strong className="text-green-700">Monthly bill drops by ~${Math.round((result.monthlyAvgBefore - result.monthlyAvgAfter))}</strong>
                <span className="text-gray-700"> on average. Peak winter months higher — summer months near-zero heating cost.</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">
              Uses NS avg rates: electricity $0.185/kWh, oil $1.55/L, propane $1.20/L. Heat pump COP 2.8 (cold-climate average over NS heating season). Actual savings vary with home insulation, system sizing, and usage.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
