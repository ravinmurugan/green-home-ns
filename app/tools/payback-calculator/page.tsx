"use client";

import { useState } from "react";
import { Sun } from "lucide-react";

const NS_RATE = 0.18;
const NS_SUN_HOURS = 1450;
const PANEL_DEGRADATION = 0.005;

export default function PaybackCalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [systemKw, setSystemKw] = useState("8");
  const [systemCost, setSystemCost] = useState("22000");
  const [grant, setGrant] = useState("5000");
  const [result, setResult] = useState<null | {
    annualGeneration: number;
    annualSavings: number;
    netCost: number;
    payback: number;
    twentyFiveYearSavings: number;
  }>(null);

  function calculate() {
    const kw = parseFloat(systemKw);
    const cost = parseFloat(systemCost);
    const grantAmt = parseFloat(grant);
    const annualGeneration = kw * NS_SUN_HOURS;
    const annualSavings = annualGeneration * NS_RATE;
    const netCost = cost - grantAmt;
    const payback = netCost / annualSavings;
    let totalSavings = 0;
    for (let y = 0; y < 25; y++) {
      totalSavings += annualGeneration * Math.pow(1 - PANEL_DEGRADATION, y) * NS_RATE;
    }
    setResult({ annualGeneration, annualSavings, netCost, payback, twentyFiveYearSavings: totalSavings - netCost });
  }

  const fmt = (n: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
          <Sun className="w-4 h-4" /> Solar Payback Calculator
        </div>
        <h1 className="text-2xl font-bold mb-2">Solar Payback Period for NS Homes</h1>
        <p className="text-gray-600 text-sm">Uses NS average 1,450 peak sun hours/year and NS Power rate of $0.18/kWh.</p>
      </div>

      <div className="space-y-5 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Monthly NS Power bill ($)</label>
          <input
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            placeholder="e.g. 180"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Solar system size (kW)</label>
          <input type="number" value={systemKw} onChange={(e) => setSystemKw(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
          <p className="text-xs text-gray-600 mt-1">Typical NS home: 6–10 kW</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Installed system cost ($)</label>
          <input type="number" value={systemCost} onChange={(e) => setSystemCost(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Federal grant amount ($)</label>
          <input type="number" value={grant} onChange={(e) => setGrant(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
          <p className="text-xs text-gray-600 mt-1">Max federal Greener Homes Grant: $5,000</p>
        </div>
        <button
          onClick={calculate}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Calculate Payback
        </button>
      </div>

      {result && (
        <div className="border border-amber-200 rounded-2xl p-6 bg-amber-50 space-y-4">
          <h2 className="font-bold text-lg mb-2">Your Solar Estimate</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-xl font-bold text-amber-600">{Math.round(result.annualGeneration).toLocaleString()} kWh</div>
              <div className="text-xs text-gray-600">Annual generation</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-xl font-bold text-green-600">{fmt(result.annualSavings)}</div>
              <div className="text-xs text-gray-600">Annual bill savings</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-xl font-bold text-gray-700">{fmt(result.netCost)}</div>
              <div className="text-xs text-gray-600">Net cost after grant</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100">
              <div className="text-xl font-bold text-blue-600">{result.payback.toFixed(1)} yrs</div>
              <div className="text-xs text-gray-600">Payback period</div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{fmt(result.twentyFiveYearSavings)}</div>
            <div className="text-sm text-gray-600">Net 25-year return (after costs, 0.5%/yr panel degradation)</div>
          </div>
          <p className="text-xs text-gray-600">Assumes NS Power rate stays flat. Actual returns may be higher if electricity rates increase. Net metering at 1:1 retail rate.</p>
        </div>
      )}
    </main>
  );
}
