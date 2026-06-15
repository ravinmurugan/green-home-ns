"use client";

import { useState, useMemo } from "react";
import { TrendingDown, Info } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";

const provinceData: Record<string, {
  name: string;
  electricRate: number;
  oilRate: number;
  propaneRate: number;
  maxRebateHP: number;
  rebateNote: string;
}> = {
  NS:  { name: "Nova Scotia",        electricRate: 0.185, oilRate: 1.55, propaneRate: 1.20, maxRebateHP: 13000, rebateNote: "ENS CleanHeat up to $10K (income-qual); standard $3K rebate closed Dec 2025 — efficiencyns.ca" },
  NB:  { name: "New Brunswick",      electricRate: 0.1539, oilRate: 1.52, propaneRate: 1.15, maxRebateHP: 2000,  rebateNote: "SaveEnergyNB up to $2K — verify at saveenergynb.ca" },
  PEI: { name: "Prince Edward Is.",  electricRate: 0.172, oilRate: 1.58, propaneRate: 1.22, maxRebateHP: 0,     rebateNote: "⚠️ Program paused Apr 2026 — verify at princeedwardisland.ca" },
  NL:  { name: "Newfoundland",       electricRate: 0.148, oilRate: 1.60, propaneRate: 1.25, maxRebateHP: 9000,  rebateNote: "takeCHARGE up to $9K — verify at takechargenl.ca" },
  ON:  { name: "Ontario",            electricRate: 0.175, oilRate: 1.48, propaneRate: 1.10, maxRebateHP: 5000,  rebateNote: "Home Renovation Savings (HRS) up to $7.5K — HER+ closed — enbridgegas.com" },
};

// Energy content in MJ/litre ÷ 3.6 = kWh/litre, then × furnace efficiency
const fuelCosts: Record<string, { label: string; unit: string; kwhPerUnit: number }> = {
  oil:                { label: "Heating Oil",       unit: "litres/yr", kwhPerUnit: (38.6 / 3.6) * 0.85 },
  "electric-baseboard": { label: "Electric Baseboard", unit: "kWh/yr",    kwhPerUnit: 1 },
  propane:            { label: "Propane",           unit: "litres/yr", kwhPerUnit: (25.3 / 3.6) * 0.92 },
};

const HP_COP = 2.8;

function calcResults(fuel: string, usageRaw: number, installCost: number, rebate: number, province: string) {
  const prov = provinceData[province];
  const { kwhPerUnit } = fuelCosts[fuel];
  const costPerUnit = fuel === "oil" ? prov.oilRate : fuel === "propane" ? prov.propaneRate : prov.electricRate;
  const currentCost = usageRaw * costPerUnit;
  const heatingKwh = usageRaw * kwhPerUnit;
  const hpKwh = heatingKwh / HP_COP;
  const hpCost = hpKwh * prov.electricRate;
  const annualSavings = currentCost - hpCost;
  const netInstall = Math.max(0, installCost - rebate);
  const payback = annualSavings > 0 ? netInstall / annualSavings : null;

  const cumulativeData = Array.from({ length: 21 }, (_, yr) => {
    const netSavings = Math.round(-installCost + rebate + yr * annualSavings);
    return { year: yr === 0 ? "Now" : `Yr ${yr}`, netSavings };
  });

  return { currentCost, hpCost, annualSavings, netInstall, payback, hpKwh, cumulativeData };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export default function SavingsCalculatorPage() {
  const [province, setProvince] = useState("NS");
  const [fuel, setFuel] = useState("oil");
  const [usage, setUsage] = useState(2000);
  const [installCost, setInstallCost] = useState(9000);
  const [rebate, setRebate] = useState(8000);

  const prov = provinceData[province];
  const r = useMemo(() => calcResults(fuel, usage, installCost, rebate, province), [fuel, usage, installCost, rebate, province]);

  const breakEvenYear = r.cumulativeData.findIndex(
    (d, i) => i > 0 && d.netSavings >= 0
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
          <TrendingDown className="w-4 h-4" />
          Heat Pump Savings Calculator
        </div>
        <h1 className="text-3xl font-bold mb-2">Oil vs Heat Pump: What Do You Actually Save?</h1>
        <p className="text-gray-600 mb-5">Enter your real fuel usage — see annual savings, payback period, and 20-year return. Rates are province-specific.</p>

        {/* Province selector */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(provinceData).map(([code, p]) => (
            <button
              key={code}
              onClick={() => { setProvince(code); setRebate(p.maxRebateHP > 8000 ? 8000 : p.maxRebateHP); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                province === code
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-200 text-gray-600 hover:border-blue-300"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {prov.name} — electricity ${prov.electricRate}/kWh · oil ${prov.oilRate}/L · max rebate ${prov.maxRebateHP.toLocaleString()}
        </div>
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
                ? "Atlantic Canada avg: 1,800–2,400 litres/yr for primary oil heat"
                : fuel === "propane"
                ? "Atlantic Canada avg: 1,500–2,500 litres/yr for primary propane heat"
                : "Avg: 12,000–18,000 kWh/yr for electric baseboard"}
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
            <p className="text-xs text-gray-600 mt-1">{prov.rebateNote}. Max: ${prov.maxRebateHP.toLocaleString()}.</p>
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

          {/* Cumulative savings chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-1">
              <div className="font-semibold text-gray-700">20-year net savings</div>
              {breakEvenYear > 0 && (
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Break-even: Year {breakEvenYear}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mb-4">
              Red bars = still recouping install cost. Green bars = money in your pocket.
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={r.cumulativeData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={4} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(v) => {
                    const val = Number(v);
                    return [val >= 0 ? `+$${val.toLocaleString()}` : `-$${Math.abs(val).toLocaleString()}`, "Net savings"];
                  }}
                  labelFormatter={(l) => `${l}`}
                />
                <ReferenceLine y={0} stroke="#374151" strokeWidth={1.5} />
                <Bar dataKey="netSavings" radius={[3, 3, 0, 0]}>
                  {r.cumulativeData.map((entry, index) => (
                    <Cell key={index} fill={entry.netSavings >= 0 ? "#16a34a" : "#ef4444"} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {r.payback && r.payback < 25 && (
              <div className="mt-3 flex items-center justify-between text-sm border-t border-gray-100 pt-3">
                <span className="text-gray-600">Year 20 net gain:</span>
                <span className="font-bold text-green-600 text-lg">
                  {fmt(r.annualSavings * 20 - r.netInstall)}
                </span>
              </div>
            )}
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
              Using {prov.name} rates: electricity ${prov.electricRate}/kWh, oil ${prov.oilRate}/L, propane ${prov.propaneRate}/L. COP 2.8 is a seasonal average for cold-climate units. Results vary with home size, insulation, and thermostat habits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/tools/rebate-quiz" className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl text-center text-sm hover:bg-green-700 transition-colors">
              Check My Rebate Eligibility →
            </a>
            <a href="/installers?service=heat-pump" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-center text-sm hover:bg-gray-50 transition-colors">
              Find {prov.name} Installers
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
