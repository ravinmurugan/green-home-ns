import { RebateProgram } from "@/lib/types";

export const rebatePrograms: RebateProgram[] = [
  {
    id: "efficiency-ns-heat-pump",
    name: "Efficiency Nova Scotia — Heat Pump Rebate",
    provider: "efficiency-ns",
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
    id: "federal-greener-homes-heat-pump",
    name: "Canada Greener Homes Grant — Heat Pump",
    provider: "federal",
    services: ["heat-pump"],
    maxAmount: 5000,
    description:
      "CLOSED February 12, 2024. No longer accepting applications. The Oil to Heat Pump Affordability Program (OHPA) is the active federal replacement for oil-heated homes, offering up to $10,000–$15,000 for income-qualifying households. Visit natural-resources.canada.ca for current programs.",
    eligibility: [
      "Grant closed February 12, 2024 — no new applications",
      "Replacement: Oil to Heat Pump Affordability Program (OHPA) for oil-heated homes",
      "Canada Greener Homes Loan (interest-free up to $40,000) may still be available",
    ],
    url: "https://natural-resources.canada.ca/energy-efficiency/home-energy-efficiency/canada-greener-homes-initiative/canada-greener-homes-initiative",
    active: false,
  },
  {
    id: "federal-greener-homes-solar",
    name: "Canada Greener Homes Grant — Solar PV",
    provider: "federal",
    services: ["solar"],
    maxAmount: 5000,
    description:
      "CLOSED February 12, 2024. No longer accepting applications. The Canada Greener Homes Affordability Program (CGHAP) and Canada Greener Homes Loan remain active for qualifying households. Visit natural-resources.canada.ca for currently open federal programs.",
    eligibility: [
      "Grant closed February 12, 2024 — no new applications",
      "Canada Greener Homes Loan (interest-free up to $40,000) may still be available",
      "Check natural-resources.canada.ca for current federal solar incentives",
    ],
    url: "https://natural-resources.canada.ca/energy-efficiency/home-energy-efficiency/canada-greener-homes-initiative/canada-greener-homes-initiative",
    active: false,
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
  heatPump: 15000, // OHPA up to $15K (income-qualified, oil-heated homes); ENS standard + federal grant both closed
  solar: 0,        // No active federal grant; Canada Greener Homes Loan available (interest-free, up to $40K)
  both: 15000,
};
