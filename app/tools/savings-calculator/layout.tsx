import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heat Pump Savings Calculator NS | GreenHomeNS",
  description:
    "Calculate how much you save switching from oil or baseboard heat to a heat pump in Nova Scotia. See payback period and annual savings.",
};

export default function SavingsCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
