import { RebateProgram } from "@/lib/types";

export const rebatePrograms: RebateProgram[] = [
  {
    id: "efficiency-ns-heat-pump",
    name: "Efficiency Nova Scotia — Heat Pump Rebate",
    provider: "efficiency-ns",
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
    id: "federal-greener-homes-heat-pump",
    name: "Canada Greener Homes Grant — Heat Pump",
    provider: "federal",
    services: ["heat-pump"],
    maxAmount: 5000,
    description:
      "The federal Canada Greener Homes Grant provides up to $5,000 for cold-climate air-source heat pumps and up to $5,000 for ground-source heat pumps. Requires a pre-install EnerGuide home energy assessment (grant covers up to $600 of assessment cost). Application through Natural Resources Canada.",
    eligibility: [
      "Canadian homeowner, primary residence",
      "Pre-retrofit EnerGuide energy evaluation required",
      "ENERGY STAR certified or equivalent heat pump",
      "Post-retrofit evaluation required to claim grant",
      "Maximum one grant per home",
    ],
    url: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html",
    active: true,
  },
  {
    id: "federal-greener-homes-solar",
    name: "Canada Greener Homes Grant — Solar PV",
    provider: "federal",
    services: ["solar"],
    maxAmount: 5000,
    description:
      "Up to $5,000 for residential solar photovoltaic systems under the Canada Greener Homes Grant. System must be grid-tied (not off-grid). Requires pre and post EnerGuide evaluations. Can be combined with NS Power net metering for maximum savings.",
    eligibility: [
      "Canadian homeowner, primary residence",
      "Grid-tied solar PV system only (not off-grid)",
      "Pre and post EnerGuide home energy evaluations",
      "System installed by qualified electrician",
      "Maximum one grant per home",
    ],
    url: "https://www.canada.ca/en/natural-resources-canada/news/2021/05/canada-greener-homes-grant.html",
    active: true,
  },
  {
    id: "ns-power-net-metering",
    name: "NS Power Net Metering Program",
    provider: "ns-power",
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
  {
    id: "efficiency-ns-oil-to-heat-pump",
    name: "Efficiency NS — Oil-to-Heat-Pump Conversion",
    provider: "efficiency-ns",
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
];

export function getRebatesByService(service: string): RebateProgram[] {
  if (service === "all") return rebatePrograms;
  return rebatePrograms.filter((r) => r.services.includes(service as "heat-pump" | "solar" | "both"));
}

export const totalMaxRebate = {
  heatPump: 8000,  // ENS $3,000 + federal $5,000
  solar: 5000,     // federal $5,000 (net metering is ongoing savings, not upfront)
  both: 13000,
};
