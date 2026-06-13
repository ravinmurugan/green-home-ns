import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pump Sizer Tool NS | GreenHomeNS",
  description:
    "Find the right heat pump size for your Nova Scotia home. Enter square footage and heating zone for a BTU recommendation.",
};

export default function HeatPumpSizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
