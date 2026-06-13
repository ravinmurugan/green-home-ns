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
      "Efficiency Nova Scotia offers rebates of up to $3,000 for cold-climate heat pump installations in NS homes. Mini-split systems receive up to $2,000; central ducted heat pump systems up to $3,000. Installer must be Efficiency NS approved. Application submitted by installer post-install.",
    eligibility: [
      "Nova Scotia homeowner (primary or secondary residence)",
      "Install performed by Efficiency NS approved contractor",
      "Cold-climate rated unit (minimum HSPF2 ≥ 7.5 for mini-split)",
      "Home must have existing heating system being supplemented or replaced",
    ],
    url: "https://www.efficiencyns.ca/residential/heating-cooling/heat-pumps/",
    active: true,
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
    name: "NS Power Net Metering Program",
    provider: "ns-power",
    provinces: ["NS"],
    services: ["solar"],
    maxAmount: 0,
    description:
      "Nova Scotia Power's net metering program credits residential solar customers at the retail electricity rate for excess power fed back to the grid. Credits roll over monthly and are settled annually. No upfront payment from NS Power — savings appear as bill credits. Reduces effective payback period significantly.",
    eligibility: [
      "Nova Scotia Power residential customer",
      "Grid-tied solar system ≤ 100 kW (residential typically 5–15 kW)",
      "NS Power interconnection agreement required",
      "Bi-directional meter installed by NS Power (at no charge)",
      "System must meet NS Power technical standards",
    ],
    url: "https://www.nspower.ca/for-home/green-energy/net-metering",
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
      "⚠️ CLOSED — The Canada Greener Homes Grant closed to new applicants on February 12, 2024. No new applications are being accepted. Check canada.ca for any replacement federal programs that may have launched. Provincial programs (Efficiency NS, NB Power Smart Saver, etc.) remain active.",
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
      "⚠️ CLOSED — The Canada Greener Homes Grant (solar PV) closed to new applicants on February 12, 2024. No new applications are being accepted. Provincial net metering programs remain active. Check canada.ca for any replacement federal solar programs.",
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
    name: "NB Power Smart Saver Heat Pump Rebate",
    provider: "nb-power",
    provinces: ["NB"],
    services: ["heat-pump"],
    maxAmount: 2000,
    description:
      "NB Power's Smart Saver program offers up to $2,000 in rebates for eligible cold-climate heat pump installations in New Brunswick homes. Rebate covers both mini-split and central ducted systems installed by NB Power registered contractors. Application is processed directly through your installer.",
    eligibility: [
      "New Brunswick homeowner, primary or secondary residence",
      "NB Power electricity customer",
      "Installed by NB Power registered Smart Saver contractor",
      "Cold-climate heat pump meeting minimum efficiency requirements",
      "Cannot be combined with other NB Power rebates for the same unit",
    ],
    url: "https://www.nbpower.com/en/save-energy/for-your-home/rebates-and-programs/",
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
      "PEI's Island Prosperity Fund provides up to $2,000 for residential heat pump installations on Prince Edward Island. The program is administered through the provincial government and supports homeowners switching from oil or electric baseboard to more efficient heat pump systems.",
    eligibility: [
      "PEI homeowner, primary residence",
      "Replacing oil heat or electric baseboard heating",
      "Minimum HSPF2 efficiency rating required",
      "Must use an approved Island contractor",
      "Application submitted within 90 days of installation",
    ],
    url: "https://www.princeedwardisland.ca/en/topic/rebates-and-programs",
    active: true,
  },

  // ── Newfoundland ──────────────────────────────────────────────────────────
  {
    id: "nl-heat-pump",
    name: "Newfoundland & Labrador Heat Pump Incentive",
    provider: "nl-crown",
    provinces: ["NL"],
    services: ["heat-pump"],
    maxAmount: 2000,
    description:
      "The NL provincial heat pump incentive program provides up to $2,000 for homeowners in Newfoundland and Labrador installing cold-climate air-source heat pumps. Program is delivered in partnership with Newfoundland Power and NL Hydro to support the province's clean energy transition.",
    eligibility: [
      "Newfoundland & Labrador homeowner",
      "Primary or secondary residence",
      "Cold-climate heat pump with minimum HSPF2 ≥ 7.5",
      "Installation by certified provincial contractor",
      "Must be connected to NL Hydro or Newfoundland Power grid",
    ],
    url: "https://www.gov.nl.ca/exec/oee/residential/",
    active: true,
  },

  // ── Ontario ───────────────────────────────────────────────────────────────
  {
    id: "enbridge-her-plus",
    name: "Enbridge Home Efficiency Rebate Plus",
    provider: "enbridge",
    provinces: ["ON"],
    services: ["heat-pump"],
    maxAmount: 5000,
    description:
      "Enbridge Gas's Home Efficiency Rebate Plus (HER+) program offers up to $5,000 for qualifying heat pump installations in Ontario homes. The program is co-funded by the federal government and available to Enbridge natural gas customers switching to cold-climate heat pumps. Includes coverage for insulation and air sealing upgrades.",
    eligibility: [
      "Ontario homeowner who is an Enbridge Gas natural gas customer",
      "Primary residence",
      "Pre-retrofit home energy assessment required",
      "Cold-climate heat pump replacing or supplementing gas heating",
      "Must use an HER+ registered contractor",
      "Post-retrofit assessment required to confirm savings",
    ],
    url: "https://www.enbridgegas.com/home-efficiency-rebate",
    active: true,
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
  heatPump: 13000, // ENS $3,000 + CleanHeat up to $10,000 (NS income-qualified)
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
  { province: "PEI", heatPumpProvincial: 2000, heatPumpFederal: 0, incomeBonus: 0,     solarFederal: 0, totalMax: 2000  },
  { province: "NL",  heatPumpProvincial: 2000, heatPumpFederal: 0, incomeBonus: 0,     solarFederal: 0, totalMax: 2000  },
  { province: "ON",  heatPumpProvincial: 5000, heatPumpFederal: 0, incomeBonus: 0,     solarFederal: 0, totalMax: 5000  },
];
