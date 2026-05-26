"use client";

import { useState, useMemo } from "react";
import { Thermometer, Home, Info } from "lucide-react";

type InsulationType = "poor" | "average" | "good";
type HomeAge = "pre1980" | "1980to2000" | "post2000";
type HeatSource = "oil" | "baseboard" | "propane" | "other";

interface Inputs {
  sqft: number;
  homeAge: HomeAge;
  insulation: InsulationType;
  ceilingHeight: "8" | "9" | "10plus";
  heatSource: HeatSource;
  numExteriorWalls: number;
}

const insulationMultiplier: Record<InsulationType, number> = {
  poor: 1.30,
  average: 1.10,
  good: 1.00,
};

const homeAgeMultiplier: Record<HomeAge, number> = {
  pre1980: 1.25,
  "1980to2000": 1.10,
  post2000: 1.00,
};

const ceilingMultiplier: Record<string, number> = {
  "8": 1.00,
  "9": 1.08,
  "10plus": 1.15,
};

function calcSizing(inputs: Inputs) {
  const { sqft, homeAge, insulation, ceilingHeight, numExteriorWalls } = inputs;
  // NS baseline: 25 BTU/sqft (cold climate)
  const baseBtu = sqft * 25;
  const wallFactor = 1 + (numExteriorWalls - 2) * 0.05;
  const rawBtu =
    baseBtu *
    insulationMultiplier[insulation] *
    homeAgeMultiplier[homeAge] *
    ceilingMultiplier[ceilingHeight] *
    wallFactor;

  const btu = Math.round(rawBtu / 1000) * 1000;
  const tons = btu / 12000;

  let unitType = "";
  let unitModel = "";
  let zoneCount = 1;

  if (tons <= 1.25) {
    unitType = "Single-zone mini-split";
    unitModel = "9,000–15,000 BTU unit";
    zoneCount = 1;
  } else if (tons <= 2.0) {
    unitType = "Single-zone mini-split";
    unitModel = "18,000–24,000 BTU unit";
    zoneCount = 1;
  } else if (tons <= 3.0) {
    unitType = "Multi-zone or central ducted";
    unitModel = "24,000–36,000 BTU system";
    zoneCount = sqft > 1800 ? 2 : 1;
  } else if (tons <= 4.0) {
    unitType = "Central ducted heat pump";
    unitModel = "36,000–48,000 BTU system";
    zoneCount = 2;
  } else {
    unitType = "Central ducted heat pump";
    unitModel = "48,000+ BTU system";
    zoneCount = 3;
  }

  const installCostLow = Math.round((tons * 2200 + 800) / 100) * 100;
  const installCostHigh = Math.round((tons * 3200 + 1200) / 100) * 100;

  return {
    btu,
    tons: Math.round(tons * 10) / 10,
    unitType,
    unitModel,
    zoneCount,
    installCostLow,
    installCostHigh,
  };
}

export default function HeatPumpSizerPage() {
  const [inputs, setInputs] = useState<Inputs>({
    sqft: 1400,
    homeAge: "1980to2000",
    insulation: "average",
    ceilingHeight: "8",
    heatSource: "oil",
    numExteriorWalls: 4,
  });

  const result = useMemo(() => calcSizing(inputs), [inputs]);

  const tonPercent = Math.min(100, Math.round((result.tons / 5) * 100));

  const gaugeColor =
    result.tons <= 1.5 ? "bg-blue-400" :
    result.tons <= 2.5 ? "bg-green-500" :
    result.tons <= 3.5 ? "bg-amber-500" :
    "bg-red-500";

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
          <Thermometer className="w-4 h-4" />
          NS Cold-Climate Sizing Tool
        </div>
        <h1 className="text-3xl font-bold mb-2">Heat Pump Size Calculator</h1>
        <p className="text-gray-600">NS-specific sizing based on cold climate (HDD 4,000+). Adjust your home details to get the right capacity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Square footage */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Home Size</label>
              <span className="text-2xl font-bold text-blue-600">{inputs.sqft.toLocaleString()} sq ft</span>
            </div>
            <input
              type="range"
              min={600}
              max={4000}
              step={50}
              value={inputs.sqft}
              onChange={(e) => setInputs((s) => ({ ...s, sqft: Number(e.target.value) }))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>600 sqft</span>
              <span>4,000 sqft</span>
            </div>
          </div>

          {/* Home age */}
          <div>
            <label className="font-semibold text-sm block mb-2">Year Built</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "pre1980", label: "Before 1980", sub: "+25% load" },
                { value: "1980to2000", label: "1980–2000", sub: "+10% load" },
                { value: "post2000", label: "After 2000", sub: "Baseline" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setInputs((s) => ({ ...s, homeAge: opt.value }))}
                  className={`p-3 border-2 rounded-xl text-center transition-all ${
                    inputs.homeAge === opt.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-xs text-gray-600">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Insulation */}
          <div>
            <label className="font-semibold text-sm block mb-2">Insulation Quality</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "poor", label: "Poor", sub: "Drafty, single-pane" },
                { value: "average", label: "Average", sub: "Typical NS home" },
                { value: "good", label: "Good", sub: "Well insulated" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setInputs((s) => ({ ...s, insulation: opt.value }))}
                  className={`p-3 border-2 rounded-xl text-center transition-all ${
                    inputs.insulation === opt.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-xs text-gray-600">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Ceiling height */}
          <div>
            <label className="font-semibold text-sm block mb-2">Ceiling Height</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "8", label: "8 ft" },
                { value: "9", label: "9 ft" },
                { value: "10plus", label: "10+ ft" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setInputs((s) => ({ ...s, ceilingHeight: opt.value }))}
                  className={`p-3 border-2 rounded-xl text-center transition-all ${
                    inputs.ceilingHeight === opt.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Exterior walls */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-sm">Exterior Walls Exposed</label>
              <span className="text-xl font-bold text-blue-600">{inputs.numExteriorWalls}</span>
            </div>
            <input
              type="range"
              min={2}
              max={4}
              step={1}
              value={inputs.numExteriorWalls}
              onChange={(e) => setInputs((s) => ({ ...s, numExteriorWalls: Number(e.target.value) }))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>2 walls (townhouse)</span>
              <span>4 walls (detached)</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* Capacity gauge */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-sm font-semibold text-gray-700 mb-4">Recommended Capacity</div>

            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-blue-600">{result.tons}</div>
              <div className="text-lg text-gray-700 font-medium">tons</div>
              <div className="text-sm text-gray-600">{result.btu.toLocaleString()} BTU/hr</div>
            </div>

            <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all duration-700 ${gaugeColor}`}
                style={{ width: `${tonPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>1 ton (small)</span>
              <span>5 tons (large)</span>
            </div>
          </div>

          {/* Unit recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-5 h-5 text-blue-600" />
              <div className="font-bold text-blue-800">Recommended System</div>
            </div>
            <div className="text-lg font-bold mb-1">{result.unitType}</div>
            <div className="text-sm text-gray-700 mb-3">{result.unitModel}</div>
            {result.zoneCount > 1 && (
              <div className="text-sm text-gray-700 mb-3">
                Suggested zones: <strong>{result.zoneCount} indoor units</strong>
              </div>
            )}
            <div className="text-sm text-gray-700">
              Estimated installed cost:{" "}
              <strong className="text-blue-700">
                ${result.installCostLow.toLocaleString()} – ${result.installCostHigh.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Size breakdown visual */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-sm font-semibold text-gray-700 mb-4">Load Factors</div>
            <div className="space-y-3">
              {[
                { label: "Base load (sq ft)", value: Math.round(inputs.sqft * 25), max: 100000 },
                { label: "Age adjustment", value: Math.round(inputs.sqft * 25 * (homeAgeMultiplier[inputs.homeAge] - 1)), max: 30000 },
                { label: "Insulation adjustment", value: Math.round(inputs.sqft * 25 * (insulationMultiplier[inputs.insulation] - 1)), max: 30000 },
                { label: "Ceiling + wall adjustment", value: result.btu - Math.round(inputs.sqft * 25 * insulationMultiplier[inputs.insulation] * homeAgeMultiplier[inputs.homeAge]), max: 20000 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="font-semibold">+{Math.max(0, row.value).toLocaleString()} BTU</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, Math.round((row.value / row.max) * 100)))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">
              This is an estimate. NS installers use Manual J load calculations for exact sizing. Always get a professional assessment before purchasing equipment.
            </p>
          </div>

          <a
            href="/installers?service=heat-pump"
            className="block w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-center text-sm hover:bg-blue-700 transition-colors"
          >
            Find NS Heat Pump Installers →
          </a>
        </div>
      </div>
    </main>
  );
}
