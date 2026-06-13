import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Heat Pump & Solar Installers NS | GreenHomeNS",
  description:
    "Browse certified heat pump and solar installers across Nova Scotia. Filter by service type, city, and rebate eligibility. Free quotes available.",
};

export default function InstallersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
