"use client";

import { useState, useMemo } from "react";
import { TrendingDown, Info } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const fuelCosts: Record<string, { label: string; unit: string; costPerUnit: number; kwhPerUnit: number }> = {
  oil: { label: "Heating Oil", unit: "litres/yr", costPerUnit: 1.55, kwhPerUnit: 38.6 * 0.85 },
  "electric-baseboard": { label: "Electric Baseboard", unit: "kWh/yr", costPerUnit: 0.185, kwhPerUnit: 1 },
  propane: { label: "Propane", unit: "litres/yr", costPerUnit: 1.20, kwhPerUnit: 25.3 * 0.92 },
};

const HP_COP = 2.8;
const HP_ELEC_RATE = 0.185;

function calcResults(fuel: string, usageRaw: number, installCost: number, rebate: number) {
  const { costPerUnit, kwhPerUnit } = fuelCosts[fuel];
  const currentCost = usageRaw * costPerUnit;
  const heatingKwh = usageRaw * kwhPerUnit;
  const hpKwh = heatingKwh / HP_COP;
  const hpCost = hpKwh * HP_ELEC_RATE;
  const annualSavings = currentCost - hpCost;
  const netInstall = Math.max(0, installCost - rebate);
  const payback = annualSavings > 0 ? netInstall / annualSavings : null;

  const cumulativeData = Array.from({ length: 21 }, (_, yr) => {
    const withoutHeatPump = -yr * currentCost;
    const withHeatPump = -installCost + rebate + yr * annualSavings;
    return {
      year: `Yr ${yr}`,
      "Without heat pump": Math.round(withoutHeatPump),
      "With heat pump": Math.round(withHeatPump),
    };
  });

  return { currentCost, hpCost, annualSavings, netInstall, payback, hpKwh, cumulativeData };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export default function SavingsCalculatorPage() {
  const [fuel, setFuel] = useState("oil");
  const [usage, setUsage] = useState(2000);
  const [installCost, setInstallCost] = useState(9000);
  const [rebate, setRebate] = useState(8000);

  const r = useMemo(() => calcResults(fuel, usage, installCost, rebate), [fuel, usage, installCost, rebate]);

  const breakEvenYear = r.cumulativeData.findIndex(
    (d, i) => i > 0 && d["With heat pump"] >= d["Without heat pump"]
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
          <TrendingDown className="w-4 h-4" />
          Heat Pump Savings — NS Specific
        </div>
        <h1 className="text-3xl font-bold mb-2">Oil vs Heat Pump: What Do You Actually Save?</h1>
        <p className="text-gray-600">Enter your real fuel usage — see annual savings, payback period, and 20-year cumulative return.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="font-semibold text-sm block mb-2">Current heat source</label>
            <div className="space-y-2">
              {Object.entries(fuelCosts).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setFuel(key)}
                  className={`w-full p-3 border-2 rounded-xl text-sm font-semibold text-left transition-all ${
                    fuel === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Annual usage</label>
              <span className="text-lg font-bold text-blue-600">
                {usage.toLocaleString()} {fuelCosts[fuel].unit.split("/")[0]}
              </span>
            </div>
            <input
              type="range"
              min={fuel === "electric-baseboard" ? 3000 : 500}
              max={fuel === "electric-baseboard" ? 30000 : 5000}
              step={fuel === "electric-baseboard" ? 500 : 100}
              value={usage}
              onChange={(e) => setUsage(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-600 mt-1">
              {fuel === "oil"
                ? "NS avg: 1,800–2,400 litres/yr for primary oil heat"
                : fuel === "propane"
                ? "NS avg: 1,500–2,500 litres/yr for primary propane heat"
                : "NS avg: 12,000–18,000 kWh/yr for baseboard"}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Heat pump installed cost</label>
              <span className="text-lg font-bold text-blue-600">{fmt(installCost)}</span>
            </div>
            <input
              type="range" min={4000} max={20000} step={500}
              value={installCost}
              onChange={(e) => setInstallCost(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-600 mt-1">Mini-split: $5K–$9K. Central: $10K–$18K</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Rebates expected</label>
              <span className="text-lg font-bold text-green-600">{fmt(rebate)}</span>
            </div>
            <input
              type="range" min={0} max={15000} step={500}
              value={rebate}
              onChange={(e) => setRebate(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <p className="text-xs text-gray-600 mt-1">ENS up to $3K + federal up to $5K = $8K max standard. OHPA up to $15K if eligible.</p>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-5">
          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Current heating/yr", value: fmt(r.currentCost), color: "text-red-600", bg: "bg-red-50 border-red-200" },
              { label: "Heat pump/yr", value: fmt(r.hpCost), color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
              { label: "Annual savings", value: fmt(r.annualSavings), color: "text-green-600", bg: "bg-green-50 border-green-200" },
              { label: "Payback period", value: r.payback && r.payback < 30 ? `${r.payback.toFixed(1)} yrs` : "—", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
            ].map((card) => (
              <div key={card.label} className={`border rounded-xl p-3 text-center ${card.bg}`}>
                <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
                <div className="text-xs text-gray-600 mt-0.5">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Cumulative chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-semibold text-gray-700 mb-1">20-year cumulative cost comparison</div>
            <div className="text-xs text-gray-600 mb-4">
              Negative = money spent. Heat pump line rises above oil line at year {breakEvenYear > 0 ? breakEvenYear : "?"} — that&apos;s your break-even.
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={r.cumulativeData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorOil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={4} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v) => [`$${Math.abs(Number(v)).toLocaleString()}`, ""]} />
                <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="4 4" />
                <Area
                  type="monotone"
                  dataKey="Without heat pump"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#colorOil)"
                />
                <Area
                  type="monotone"
                  dataKey="With heat pump"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorHP)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Efficiency breakdown */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-semibold text-gray-700 mb-4">Why heat pumps are cheaper: efficiency</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">{fuelCosts[fuel].label}</div>
                <div className="text-3xl font-bold text-red-500 mb-1">1×</div>
                <div className="text-gray-700">efficiency (combustion or resistance)</div>
                <div className="mt-2 text-gray-600">{Math.round(r.currentCost / 12)}/mo average</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Cold-Climate Heat Pump</div>
                <div className="text-3xl font-bold text-green-600 mb-1">2.8×</div>
                <div className="text-gray-700">efficiency (COP 2.8 — moves heat, not creates it)</div>
                <div className="mt-2 text-gray-600">{Math.round(r.hpCost / 12)}/mo average</div>
              </div>
            </div>
            <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.round((1 / 2.8) * 100)}%` }} />
            </div>
            <div className="text-xs text-gray-600 mt-1">Heat pump uses only {Math.round((1 / 2.8) * 100)}% of the electricity equivalent for the same heat output</div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">
              Uses NS avg rates: electricity $0.185/kWh, oil $1.55/L, propane $1.20/L. COP 2.8 is a seasonal average for NS cold-climate units. Results vary with home size, insulation, and thermostat habits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/tools/rebate-quiz" className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl text-center text-sm hover:bg-green-700 transition-colors">
              Check My Rebate Eligibility →
            </a>
            <a href="/installers?service=heat-pump" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-center text-sm hover:bg-gray-50 transition-colors">
              Find NS Installers
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
