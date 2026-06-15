import { RebateProgram } from "@/lib/types";

export const rebatePrograms: RebateProgram[] = [
  // ── Nova Scotia ───────────────────────────────────────────────────────────
  {
    id: "efficiency-ns-heat-pump",
    name: "Efficiency Nova Scotia — Heat Pump Rebate",
    provider: "efficiency-ns",
    provinces: ["NS"],
    services: ["heat-pump"],
    maxAmount: 3000,
    description:
      "⚠️ CLOSED as of December 31, 2025. The Home Heating System Rebates program is no longer accepting applications. Homeowners may still qualify for the Oil to Heat Pump Affordability Program (OHPA) — see below — or the Moderate Income Rebates program. Confirm current offerings at efficiencyns.ca.",
    eligibility: [
      "Program closed December 31, 2025 — no new applications accepted",
      "See Oil to Heat Pump Affordability Program (OHPA) for current federal+provincial support",
      "Moderate Income Rebates program may be available for qualifying households",
    ],
    url: "https://www.efficiencyns.ca/programs-rebates/home-heating-system-rebates",
    active: false,
  },
  {
    id: "efficiency-ns-oil-to-heat-pump",
    name: "Efficiency NS — Oil-to-Heat-Pump Conversion",
    provider: "efficiency-ns",
    provinces: ["NS"],
    services: ["heat-pump"],
    maxAmount: 3000,
    description:
      "Enhanced rebate for homeowners replacing oil heating with a cold-climate heat pump as the primary heat source. Efficiency NS provides up to $3,000 plus potential additional support through the CleanHeat program for income-qualified households.",
    eligibility: [
      "Current oil heat user replacing with heat pump as primary source",
      "Efficiency NS approved installer required",
      "Cold-climate heat pump (HSPF2 ≥ 7.5)",
      "Income-qualified households may receive additional CleanHeat support",
    ],
    url: "https://www.efficiencyns.ca/residential/heating-cooling/heat-pumps/",
    active: true,
  },
  {
    id: "efficiency-ns-clean-heat",
    name: "Efficiency NS — CleanHeat Program",
    provider: "efficiency-ns",
    provinces: ["NS"],
    services: ["heat-pump"],
    maxAmount: 10000,
    description:
      "The CleanHeat program provides enhanced support for lower-income NS households transitioning from oil to clean electric heating. Rebates can reach up to $10,000 for qualifying households, with no-cost installation available for those meeting income thresholds. Priority for households spending >10% of income on energy.",
    eligibility: [
      "Nova Scotia resident with household income below program threshold",
      "Currently using oil, propane, or electric baseboard heating",
      "Primary residence",
      "Installed by CleanHeat approved contractor",
    ],
    url: "https://www.efficiencyns.ca/residential/heating-cooling/heat-pumps/",
    active: true,
  },
  {
    id: "ns-power-net-metering",
    name: "NS Power Net Metering (Self-Generating Option)",
    provider: "ns-power",
    provinces: ["NS"],
    services: ["solar"],
    maxAmount: 0,
    description:
      "Nova Scotia Power's residential net metering is offered through its Self-Generating Option. Excess solar power fed to the grid earns bill credits at the retail rate (~18.5¢/kWh — among the best in Canada), with credits rolling over up to 12 months. No upfront payment — savings appear as ongoing bill credits, significantly shortening solar payback. With the SolarHomes rebate and federal grants now closed, net metering is the primary solar incentive in NS.",
    eligibility: [
      "Nova Scotia Power residential customer",
      "Renewable generator ≤ 27 kW under the Self-Generating Option (residential typically 5–15 kW)",
      "NS Power interconnection agreement required",
      "Bi-directional meter installed by NS Power (at no charge)",
      "System must meet NS Power technical standards",
    ],
    url: "https://www.nspower.ca/your-home/save-money-energy/make-own-energy/self-generating-option",
    active: true,
  },

  // ── Federal (applies to all provinces) ───────────────────────────────────
  {
    id: "federal-greener-homes-heat-pump",
    name: "Canada Greener Homes Grant — Heat Pump",
    provider: "federal",
    provinces: ["NS", "NB", "PEI", "NL", "ON"],
    services: ["heat-pump"],
    maxAmount: 5000,
    description:
      "⚠️ CLOSED — The Canada Greener Homes Grant closed to new applicants on February 12, 2024. The replacement is the Canada Greener Homes Affordability Program (CGHAP), an $800M initiative for low-to-median income households delivered through provincial programs. Check canada.ca/greener-homes for current eligibility.",
    eligibility: [
      "Program closed February 12, 2024 — no new applications accepted",
      "Check canada.ca/greener-homes for replacement programs",
    ],
    url: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html",
    active: false,
  },
  {
    id: "federal-greener-homes-solar",
    name: "Canada Greener Homes Grant — Solar PV",
    provider: "federal",
    provinces: ["NS", "NB", "PEI", "NL", "ON"],
    services: ["solar"],
    maxAmount: 5000,
    description:
      "⚠️ CLOSED — The Canada Greener Homes Grant (solar PV) closed to new applicants on February 12, 2024. The Canada Greener Homes Affordability Program (CGHAP) may cover solar PV depending on province — check canada.ca/greener-homes. Provincial net metering programs remain active.",
    eligibility: [
      "Program closed February 12, 2024 — no new applications accepted",
      "Check canada.ca for replacement federal programs",
    ],
    url: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html",
    active: false,
  },

  // ── New Brunswick ─────────────────────────────────────────────────────────
  {
    id: "nb-power-heat-pump",
    name: "SaveEnergyNB Heat Pump Rebate (NB Power)",
    provider: "nb-power",
    provinces: ["NB"],
    services: ["heat-pump"],
    maxAmount: 2000,
    description:
      "NB Power's heat pump rebates are now delivered through SaveEnergyNB. The Total Home Energy Savings stream offers up to $2,000 for eligible cold-climate heat pumps, while income-qualified households can access the Enhanced Energy Savings program for up to $15,000 in advance funding or free upgrades. Rebates cover mini-split and central ducted systems installed by registered contractors.",
    eligibility: [
      "New Brunswick homeowner, primary or secondary residence",
      "NB Power electricity customer",
      "Installed by a SaveEnergyNB registered contractor",
      "Cold-climate heat pump meeting minimum efficiency requirements",
      "Income-qualified households may qualify for Enhanced Energy Savings (up to $15,000)",
    ],
    url: "https://www.saveenergynb.ca/for-home/enhanced-energy-savings-program/",
    active: true,
  },

  // ── PEI ───────────────────────────────────────────────────────────────────
  {
    id: "pei-heat-pump",
    name: "Island Prosperity Fund — Heat Pump Rebate",
    provider: "pei-fund",
    provinces: ["PEI"],
    services: ["heat-pump"],
    maxAmount: 2000,
    description:
      "⚠️ PAUSED — PEI's residential heat pump rebate program (efficiencyPEI / Island Prosperity Fund) suspended new intake as of April 2026. Applications are not currently being accepted. The program had offered up to $900 per unit for standard applicants prior to the pause. Monitor princeedwardisland.ca/en/topic/energy-efficiency for updates on resumption. Low-income households (under $35,000/yr) may still qualify for the separate free heat pump program.",
    eligibility: [
      "Program intake suspended April 2026 — no new applications being accepted",
      "Monitor princeedwardisland.ca for program resumption",
      "Low-income households (under $35,000/yr income) may qualify for free heat pump program",
    ],
    url: "https://www.princeedwardisland.ca/en/topic/rebates-and-programs",
    active: false,
  },

  // ── Newfoundland ──────────────────────────────────────────────────────────
  {
    id: "nl-heat-pump",
    name: "takeCHARGE Oil to Electric Incentive (NL)",
    provider: "nl-crown",
    provinces: ["NL"],
    services: ["heat-pump"],
    maxAmount: 9000,
    description:
      "Newfoundland & Labrador's takeCHARGE Oil to Electric program helps homeowners replace oil or propane heating with electric heat pumps. The general stream provides up to $9,000, while income-qualified households can receive up to $22,000 — covering equipment, installation, and electrical panel upgrades where needed. Applies to mini-split, multi-split, and central heat pumps. Delivered by Newfoundland Power and NL Hydro.",
    eligibility: [
      "Newfoundland & Labrador homeowner replacing oil or propane heating",
      "Primary residence connected to NL Hydro or Newfoundland Power grid",
      "Cold-climate heat pump installed by a participating contractor",
      "General stream up to $9,000; income-qualified up to $22,000",
      "Applications typically processed in 6–8 weeks",
    ],
    url: "https://takechargenl.ca/oiltoelectric/",
    active: true,
  },

  // ── Ontario ───────────────────────────────────────────────────────────────
  {
    id: "enbridge-her-plus",
    name: "Enbridge Home Efficiency Rebate Plus (closed — see HRS)",
    provider: "enbridge",
    provinces: ["ON"],
    services: ["heat-pump"],
    maxAmount: 5000,
    description:
      "⚠️ CLOSED — Enbridge Gas's Home Efficiency Rebate Plus (HER+) stopped accepting applications after December 31, 2025 (post-retrofit assessments were due December 1, 2025). Ontario's active replacement is the government-backed Home Renovation Savings (HRS) program, administered through Enbridge Gas, which offers heat pump and home-upgrade rebates. Visit homerenovationsavings.ca or enbridgegas.com for current offers.",
    eligibility: [
      "HER+ closed to new applications after December 31, 2025",
      "Replacement: Home Renovation Savings (HRS) program — homerenovationsavings.ca",
      "HRS covers heat pumps, insulation, and air sealing for Ontario homeowners",
    ],
    url: "https://www.enbridgegas.com/ontario/rebates-energy-conservation/home-efficiency-rebate-plus",
    active: false,
  },
];

export function getRebatesByService(service: string): RebateProgram[] {
  if (service === "all") return rebatePrograms;
  return rebatePrograms.filter((r) => r.services.includes(service as "heat-pump" | "solar" | "both"));
}

export function getRebatesByProvince(province: string): RebateProgram[] {
  if (province === "all") return rebatePrograms;
  return rebatePrograms.filter((r) => r.provinces.includes(province));
}

export const totalMaxRebate = {
  heatPump: 13000, // ENS CleanHeat up to $10,000 (income-qualified) stacked; standard $3,000 closed Dec 2025
  solar: 0,        // No active federal upfront grant — net metering savings ongoing
  both: 13000,
};

export interface ProvinceComparisonRow {
  province: string;
  heatPumpProvincial: number;
  heatPumpFederal: number;
  incomeBonus: number;
  solarFederal: number;
  totalMax: number;
}

export const provinceComparison: ProvinceComparisonRow[] = [
  { province: "NS",  heatPumpProvincial: 3000, heatPumpFederal: 0, incomeBonus: 10000, solarFederal: 0, totalMax: 13000 },
  { province: "NB",  heatPumpProvincial: 2000, heatPumpFederal: 0, incomeBonus: 0,     solarFederal: 0, totalMax: 2000  },
  { province: "PEI", heatPumpProvincial: 0,    heatPumpFederal: 0, incomeBonus: 0,     solarFederal: 0, totalMax: 0     },
  { province: "NL",  heatPumpProvincial: 9000, heatPumpFederal: 0, incomeBonus: 0,     solarFederal: 0, totalMax: 9000  },
  { province: "ON",  heatPumpProvincial: 5000, heatPumpFederal: 0, incomeBonus: 0,     solarFederal: 0, totalMax: 5000  },
];
