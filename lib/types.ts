export type ServiceType = "heat-pump" | "solar" | "both";
export type HeatPumpType = "mini-split" | "central" | "ground-source" | "cold-climate";
export type CertificationType = "efficiency-ns-approved" | "hrai" | "eccc" | "tssa" | "nsesa";

export interface GreenHomeScore {
  overall: number;
  installationQuality: number;
  valueForMoney: number;
  responseTime: number;
  warranty: number;
  certifications: number;
}

export interface Installer {
  id: string;
  slug: string;
  name: string;
  province: string;
  city: string;
  address?: string;
  phone: string;
  website: string;
  email?: string;
  services: ServiceType;
  heatPumpTypes?: HeatPumpType[];
  brands?: string[];
  certifications: CertificationType[];
  greenHomeScore: GreenHomeScore;
  description: string;
  highlights: string[];
  reviewCount: number;
  avgRating: number;
  featured?: boolean;
  yearsInBusiness: number;
  projectsCompleted: number;
  priceRange: "$" | "$$" | "$$$";
  rebateAssistance: boolean;
  financing: boolean;
}

export interface RebateProgram {
  id: string;
  name: string;
  provider: "efficiency-ns" | "federal" | "ns-power" | "municipal" | "nb-power" | "pei-fund" | "nl-crown" | "enbridge";
  provinces: string[];
  services: ServiceType[];
  maxAmount: number;
  description: string;
  eligibility: string[];
  deadline?: string;
  url: string;
  active: boolean;
}

export interface FilterState {
  service: ServiceType | "all";
  city: string;
  priceRange: string;
  rebateAssistance: boolean | null;
  financing: boolean | null;
}
