import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carbon Footprint Calculator NS | GreenHomeNS",
  description:
    "Calculate your home's carbon footprint reduction from switching to heat pump or solar in Nova Scotia.",
};

export default function CarbonCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
