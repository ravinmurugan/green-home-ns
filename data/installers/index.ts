import { Installer } from "@/lib/types";
import { novaScotiaInstallers } from "./nova-scotia";

export const allInstallers: Installer[] = [...novaScotiaInstallers];

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

export const nsCities = [...new Set(novaScotiaInstallers.map((i) => i.city))].sort();

export const stats = {
  total: allInstallers.length,
  heatPump: allInstallers.filter((i) => i.services === "heat-pump" || i.services === "both").length,
  solar: allInstallers.filter((i) => i.services === "solar" || i.services === "both").length,
  rebateApproved: allInstallers.filter((i) => i.certifications.includes("efficiency-ns-approved")).length,
};
