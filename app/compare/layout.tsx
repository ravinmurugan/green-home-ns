import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Heat Pump Installers NS | GreenHomeNS",
  description:
    "Side-by-side comparison of Nova Scotia heat pump and solar installers. Compare GreenHome Scores, pricing, certifications, and rebate eligibility.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
