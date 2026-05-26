import { Installer } from "@/lib/types";
import { novaScotiaInstallers } from "./nova-scotia";
import { newBrunswickInstallers } from "./new-brunswick";
import { peiInstallers } from "./pei";
import { newfoundlandInstallers } from "./newfoundland";
import { ontarioInstallers } from "./ontario";

export const allInstallers: Installer[] = [
  ...novaScotiaInstallers,
  ...newBrunswickInstallers,
  ...peiInstallers,
  ...newfoundlandInstallers,
  ...ontarioInstallers,
];

export const provinces = [
  "Nova Scotia",
  "New Brunswick",
  "Prince Edward Island",
  "Newfoundland",
  "Ontario",
] as const;

export type Province = (typeof provinces)[number];

export function getInstallerBySlug(slug: string): Installer | undefined {
  return allInstallers.find((i) => i.slug === slug);
}

export function getFeaturedInstallers(limit = 3): Installer[] {
  return allInstallers.filter((i) => i.featured).slice(0, limit);
}

export function getInstallersByService(service: string): Installer[] {
  if (service === "all") return allInstallers;
  return allInstallers.filter((i) => i.services === service || i.services === "both");
}

export function getInstallersByProvince(province: string): Installer[] {
  if (province === "all") return allInstallers;
  return allInstallers.filter((i) => i.province === province);
}

export function getCitiesForProvince(province: string): string[] {
  const src = province === "all" ? allInstallers : allInstallers.filter((i) => i.province === province);
  return [...new Set(src.map((i) => i.city))].sort();
}

export const nsCities = [...new Set(novaScotiaInstallers.map((i) => i.city))].sort();

export const stats = {
  total: allInstallers.length,
  heatPump: allInstallers.filter((i) => i.services === "heat-pump" || i.services === "both").length,
  solar: allInstallers.filter((i) => i.services === "solar" || i.services === "both").length,
  provinces: provinces.length,
};
