"use client";

import { useState, useMemo } from "react";
import { Leaf, ArrowRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// kg CO2e per kWh — Environment Canada 2024 National Inventory Report
const gridEmissions: Record<string, { name: string; factor: number; gridType: string }> = {
  NS:  { name: "Nova Scotia",       factor: 0.660, gridType: "Coal-heavy" },
  NB:  { name: "New Brunswick",     factor: 0.290, gridType: "Mixed" },
  PEI: { name: "Prince Edward Is.", factor: 0.220, gridType: "Wind + imports" },
  NL:  { name: "Newfoundland",      factor: 0.023, gridType: "~98% hydro" },
  ON:  { name: "Ontario",           factor: 0.029, gridType: "Nuclear + hydro" },
};

// kg CO2 per litre of fuel (NRCan)
const OIL_CO2_PER_LITRE = 2.68;
const PROPANE_CO2_PER_LITRE = 1.51;

// Energy content (MJ/litre ÷ 3.6 = kWh/litre) × efficiency
const OIL_KWH_PER_LITRE = (38.6 / 3.6) * 0.85;
const PROPANE_KWH_PER_LITRE = (25.3 / 3.6) * 0.92;
const HP_COP = 2.8;

type Fuel = "oil" | "propane" | "baseboard";

function calcCarbon(fuel: Fuel, usage: number, province: string) {
  const { factor } = gridEmissions[province];

  let currentCO2Kg: number;
  let heatingKwh: number;

  if (fuel === "oil") {
    currentCO2Kg = usage * OIL_CO2_PER_LITRE;
    heatingKwh = usage * OIL_KWH_PER_LITRE;
  } else if (fuel === "propane") {
    currentCO2Kg = usage * PROPANE_CO2_PER_LITRE;
    heatingKwh = usage * PROPANE_KWH_PER_LITRE;
  } else {
    // baseboard: usage is already kWh
    currentCO2Kg = usage * factor;
    heatingKwh = usage;
  }

  const hpKwh = heatingKwh / HP_COP;
  const hpCO2Kg = hpKwh * factor;
  const savedKg = currentCO2Kg - hpCO2Kg;
  const savedTonnes = savedKg / 1000;

  return {
    currentTonnes: currentCO2Kg / 1000,
    hpTonnes: hpCO2Kg / 1000,
    savedTonnes,
    savedKg,
    trees: Math.round(savedKg / 22),          // 1 tree absorbs ~22 kg CO2/yr
    carMonths: Math.round((savedKg / 4600) * 12), // avg car = 4,600 kg/yr
    flights: Math.round(savedKg / 900),        // transatlantic one-way ~900 kg
  };
}

const fuelLabels: Record<Fuel, { label: string; unit: string; min: number; max: number; step: number; default: number }> = {
  oil:      { label: "Heating Oil",        unit: "litres/yr", min: 500,   max: 5000,  step: 100, default: 2000 },
  propane:  { label: "Propane",            unit: "litres/yr", min: 500,   max: 5000,  step: 100, default: 1800 },
  baseboard:{ label: "Electric Baseboard", unit: "kWh/yr",    min: 3000,  max: 30000, step: 500, default: 14000 },
};

export default function CarbonCalculatorPage() {
  const [province, setProvince] = useState("NS");
  const [fuel, setFuel] = useState<Fuel>("oil");
  const [usage, setUsage] = useState(2000);

  const prov = gridEmissions[province];
  const r = useMemo(() => calcCarbon(fuel, usage, province), [fuel, usage, province]);

  const chartData = [
    { label: fuelLabels[fuel].label, tonnes: parseFloat(r.currentTonnes.toFixed(2)), fill: "#ef4444" },
    { label: "Heat Pump", tonnes: parseFloat(r.hpTonnes.toFixed(2)), fill: "#16a34a" },
  ];

  const pctReduction = r.currentTonnes > 0
    ? Math.round((r.savedTonnes / r.currentTonnes) * 100)
    : 0;

  function handleFuelChange(f: Fuel) {
    setFuel(f);
    setUsage(fuelLabels[f].default);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <Leaf className="w-4 h-4" />
          CO₂ Savings Calculator
        </div>
        <h1 className="text-3xl font-bold mb-2">How Much Carbon Does a Heat Pump Save?</h1>
        <p className="text-gray-600 mb-5">
          Province matters — NL and ON have near-zero-carbon grids. NS is coal-heavy. See exactly how clean your heat pump would be.
        </p>

        {/* Province selector */}
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.entries(gridEmissions).map(([code, p]) => (
            <button
              key={code}
              onClick={() => setProvince(code)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                province === code
                  ? "bg-green-600 border-green-600 text-white"
                  : "border-gray-200 text-gray-600 hover:border-green-400"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 mb-0">
          {prov.name} grid: <strong>{prov.gridType}</strong> — {prov.factor} kg CO₂/kWh
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="font-semibold text-sm block mb-2">Current heat source</label>
            <div className="space-y-2">
              {(Object.entries(fuelLabels) as [Fuel, typeof fuelLabels[Fuel]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => handleFuelChange(key)}
                  className={`w-full p-3 border-2 rounded-xl text-sm font-semibold text-left transition-all ${
                    fuel === key ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 hover:border-green-300"
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
              <span className="text-lg font-bold text-green-600">
                {usage.toLocaleString()} {fuelLabels[fuel].unit.split("/")[0]}
              </span>
            </div>
            <input
              type="range"
              min={fuelLabels[fuel].min}
              max={fuelLabels[fuel].max}
              step={fuelLabels[fuel].step}
              value={usage}
              onChange={(e) => setUsage(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{fuelLabels[fuel].min.toLocaleString()}</span>
              <span>{fuelLabels[fuel].max.toLocaleString()}</span>
            </div>
          </div>

          {/* Grid emissions context */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Grid Emissions by Province</div>
            <div className="space-y-2">
              {Object.entries(gridEmissions).map(([code, p]) => (
                <div key={code} className="flex items-center gap-2">
                  <div className="w-7 text-xs font-bold text-gray-600">{code}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${code === province ? "bg-green-600" : "bg-gray-400"}`}
                      style={{ width: `${Math.round((p.factor / 0.66) * 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 w-20 text-right">{p.factor} kg/kWh</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-5">
          {/* Hero number */}
          <div className={`rounded-2xl p-6 text-center ${r.savedTonnes > 0 ? "bg-green-600 text-white" : "bg-gray-100"}`}>
            <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Annual CO₂ Avoided</div>
            <div className="text-6xl font-bold mb-1">
              {r.savedTonnes > 0 ? r.savedTonnes.toFixed(2) : "—"}
            </div>
            <div className="text-lg opacity-90">tonnes CO₂ per year</div>
            {pctReduction > 0 && (
              <div className="mt-2 inline-block bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">
                {pctReduction}% reduction vs {fuelLabels[fuel].label.toLowerCase()}
              </div>
            )}
          </div>

          {/* Equivalencies */}
          {r.savedKg > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌳", value: r.trees.toLocaleString(), label: "trees planted", sub: "absorbing CO₂ for a year" },
                { icon: "🚗", value: `${r.carMonths} mo`, label: "car off the road", sub: "avg vehicle 4,600 kg/yr" },
                { icon: "✈️", value: r.flights > 0 ? r.flights.toString() : "<1", label: "transatlantic flights", sub: "one-way ~900 kg CO₂" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-1">{item.icon}</div>
                  <div className="text-xl font-bold text-gray-800">{item.value}</div>
                  <div className="text-xs font-semibold text-gray-700">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          )}

          {/* Bar chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="font-semibold text-gray-700 mb-1">Annual CO₂ emissions comparison</div>
            <div className="text-xs text-gray-500 mb-4">tonnes CO₂e per year — current heat source vs heat pump</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}t`} />
                <Tooltip formatter={(v) => [`${Number(v).toFixed(2)} tonnes CO₂`, ""]} />
                <Bar dataKey="tonnes" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-3">
              {province === "NS"
                ? "NS has a coal-heavy grid — heat pump still cuts CO₂ but savings are lower than hydro provinces. Grid is decarbonizing as NS adds offshore wind."
                : province === "NL" || province === "ON"
                ? `${prov.name}'s near-zero-carbon grid makes heat pumps one of the cleanest heating options available anywhere.`
                : `${prov.name}'s grid mix gives heat pumps a strong carbon advantage over oil and propane.`}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/tools/savings-calculator" className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl text-center text-sm hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2">
              See Financial Savings <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/installers?service=heat-pump" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-center text-sm hover:bg-gray-50 transition-colors">
              Find Heat Pump Installers
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
