"use client";

import { useState, useMemo } from "react";
import { Sun, Info, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";

const provinceData: Record<string, {
  name: string;
  utility: string;
  rate: number;
  sunHours: number;
  rebateNote: string;
}> = {
  NS:  { name: "Nova Scotia",       utility: "NS Power",         rate: 0.185,  sunHours: 1450, rebateNote: "Greener Homes CLOSED; CGHAP (low-med income) may apply — canada.ca/greener-homes" },
  NB:  { name: "New Brunswick",     utility: "NB Power",         rate: 0.1539, sunHours: 1420, rebateNote: "Greener Homes CLOSED; CGHAP (low-med income) may apply — canada.ca/greener-homes" },
  PEI: { name: "Prince Edward Is.", utility: "Maritime Electric", rate: 0.172,  sunHours: 1480, rebateNote: "Greener Homes CLOSED; CGHAP (low-med income) may apply — canada.ca/greener-homes" },
  NL:  { name: "Newfoundland",      utility: "NL Power",         rate: 0.148,  sunHours: 1300, rebateNote: "Greener Homes CLOSED; CGHAP (low-med income) may apply — canada.ca/greener-homes" },
  ON:  { name: "Ontario",           utility: "Local LDC",        rate: 0.175,  sunHours: 1530, rebateNote: "Greener Homes CLOSED; CGHAP (low-med income) may apply — canada.ca/greener-homes" },
};

const DEGRADATION = 0.005;

function calcResults(systemKw: number, systemCost: number, rebate: number, province: string) {
  const { rate, sunHours } = provinceData[province];
  const annualGen = systemKw * sunHours;
  const annualSavingsY1 = annualGen * rate;
  const netCost = Math.max(0, systemCost - rebate);
  const payback = annualSavingsY1 > 0 ? netCost / annualSavingsY1 : null;

  let totalSavings25 = 0;
  for (let y = 0; y < 25; y++) {
    totalSavings25 += annualGen * Math.pow(1 - DEGRADATION, y) * rate;
  }
  const year25Net = Math.round(totalSavings25 - netCost);

  const cumulativeData = Array.from({ length: 26 }, (_, yr) => {
    let savings = 0;
    for (let y = 0; y < yr; y++) {
      savings += annualGen * Math.pow(1 - DEGRADATION, y) * rate;
    }
    return { year: yr === 0 ? "Now" : `Yr ${yr}`, netSavings: Math.round(savings - netCost) };
  });

  const breakEvenYear = cumulativeData.findIndex((d, i) => i > 0 && d.netSavings >= 0);

  return { annualGen, annualSavingsY1, netCost, payback, year25Net, cumulativeData, breakEvenYear };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export default function PaybackCalculatorPage() {
  const [province, setProvince] = useState("NS");
  const [systemKw, setSystemKw] = useState(8);
  const [systemCost, setSystemCost] = useState(22000);
  const [rebate, setRebate] = useState(5000);

  const prov = provinceData[province];
  const r = useMemo(() => calcResults(systemKw, systemCost, rebate, province), [systemKw, systemCost, rebate, province]);

  // Province comparison for same system
  const provinceComparison = useMemo(() =>
    Object.entries(provinceData).map(([code, p]) => {
      const annualSavings = systemKw * p.sunHours * p.rate;
      const netCost = Math.max(0, systemCost - rebate);
      const payback = annualSavings > 0 ? netCost / annualSavings : null;
      return { code, name: p.name, rate: p.rate, sunHours: p.sunHours, payback };
    }).sort((a, b) => (a.payback ?? 99) - (b.payback ?? 99)),
    [systemKw, systemCost, rebate]
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-3">
          <Sun className="w-4 h-4" />
          Solar Payback Calculator
        </div>
        <h1 className="text-3xl font-bold mb-2">Solar Panel ROI — Province by Province</h1>
        <p className="text-gray-600 mb-5">
          Adjust system size, cost, and rebates. See your payback period, 25-year return, and how your province compares.
        </p>

        {/* Province selector */}
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.entries(provinceData).map(([code, p]) => (
            <button
              key={code}
              onClick={() => setProvince(code)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                province === code
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "border-gray-200 text-gray-600 hover:border-amber-300"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500">
          {prov.name} — {prov.utility} ${prov.rate}/kWh · {prov.sunHours.toLocaleString()} peak sun hrs/yr · {prov.rebateNote}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">System size</label>
              <span className="text-lg font-bold text-amber-600">{systemKw} kW</span>
            </div>
            <input
              type="range" min={3} max={20} step={1}
              value={systemKw}
              onChange={(e) => setSystemKw(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3 kW</span><span>20 kW</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Generates ~{Math.round(systemKw * prov.sunHours).toLocaleString()} kWh/yr in {prov.name}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Installed cost</label>
              <span className="text-lg font-bold text-amber-600">{fmt(systemCost)}</span>
            </div>
            <input
              type="range" min={8000} max={60000} step={500}
              value={systemCost}
              onChange={(e) => setSystemCost(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$8K</span><span>$60K</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              ~${((systemCost / systemKw) / 1000).toFixed(2)}/watt · Atlantic avg $2.50–$2.80/W
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Rebates & grants</label>
              <span className="text-lg font-bold text-green-600">{fmt(rebate)}</span>
            </div>
            <input
              type="range" min={0} max={15000} step={500}
              value={rebate}
              onChange={(e) => setRebate(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span><span>$15K</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{prov.rebateNote}</p>
          </div>

          {/* Net cost box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-600 mb-1">Net out-of-pocket</div>
            <div className="text-2xl font-bold text-gray-800">{fmt(r.netCost)}</div>
            <div className="text-xs text-gray-500 mt-0.5">after {fmt(rebate)} in rebates</div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-5">
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Annual generation", value: `${Math.round(r.annualGen).toLocaleString()} kWh`, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
              { label: "Annual savings", value: fmt(r.annualSavingsY1), color: "text-green-600", bg: "bg-green-50 border-green-200" },
              { label: "Payback period", value: r.payback && r.payback < 30 ? `${r.payback.toFixed(1)} yrs` : "—", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
              { label: "Year 25 net return", value: r.year25Net > 0 ? fmt(r.year25Net) : "—", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
            ].map((card) => (
              <div key={card.label} className={`border rounded-xl p-3 text-center ${card.bg}`}>
                <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
                <div className="text-xs text-gray-600 mt-0.5">{card.label}</div>
              </div>
            ))}
          </div>

          {/* 25-year chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-1">
              <div className="font-semibold text-gray-700">25-year cumulative return</div>
              {r.breakEvenYear > 0 && (
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Break-even: Year {r.breakEvenYear}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mb-4">
              Red = still recouping install cost · Green = profit · 0.5%/yr panel degradation factored in
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={r.cumulativeData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} interval={4} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(v) => {
                    const val = Number(v);
                    return [val >= 0 ? `+${fmt(val)}` : `-${fmt(Math.abs(val))}`, "Net savings"];
                  }}
                />
                <ReferenceLine y={0} stroke="#374151" strokeWidth={1.5} />
                <Bar dataKey="netSavings" radius={[3, 3, 0, 0]}>
                  {r.cumulativeData.map((entry, i) => (
                    <Cell key={i} fill={entry.netSavings >= 0 ? "#16a34a" : "#ef4444"} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {r.year25Net > 0 && (
              <div className="mt-3 flex items-center justify-between text-sm border-t border-gray-100 pt-3">
                <span className="text-gray-600">Year 25 net gain:</span>
                <span className="font-bold text-green-600 text-lg flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {fmt(r.year25Net)}
                </span>
              </div>
            )}
          </div>

          {/* Province comparison */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-semibold text-gray-700 mb-1">Province comparison — same {systemKw} kW system</div>
            <div className="text-xs text-gray-500 mb-4">Higher electricity rate = faster payback. Payback varies by province even with same install cost.</div>
            <div className="space-y-2">
              {provinceComparison.map(({ code, rate, sunHours, payback }) => {
                const isSelected = code === province;
                const maxPayback = 16;
                const barWidth = payback ? Math.max(10, Math.round((1 - (payback - 7) / (maxPayback - 7)) * 100)) : 10;
                return (
                  <div key={code} className={`flex items-center gap-3 p-2 rounded-lg ${isSelected ? "bg-amber-50" : ""}`}>
                    <div className={`w-8 text-xs font-bold shrink-0 ${isSelected ? "text-amber-600" : "text-gray-600"}`}>{code}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div
                        className={`h-full rounded-full flex items-center pl-2 ${isSelected ? "bg-amber-500" : "bg-gray-300"}`}
                        style={{ width: `${Math.min(100, Math.max(15, barWidth))}%` }}
                      >
                        <span className="text-xs font-semibold text-white drop-shadow">
                          {payback ? `${payback.toFixed(1)} yrs` : "—"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 shrink-0 w-20 text-right">
                      ${rate}/kWh · {sunHours.toLocaleString()} hrs
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">
              Using {prov.name} rates: {prov.utility} ${prov.rate}/kWh · {prov.sunHours.toLocaleString()} peak sun hours/yr. Assumes net metering at 1:1 retail rate. Rate held flat — actual returns likely higher as electricity prices rise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/installers?service=solar" className="flex-1 bg-amber-500 text-white font-semibold py-3 rounded-xl text-center text-sm hover:bg-amber-600 transition-colors">
              Find Solar Installers →
            </a>
            <a href="/tools/carbon-calculator" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-center text-sm hover:bg-gray-50 transition-colors">
              See CO₂ Savings
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
