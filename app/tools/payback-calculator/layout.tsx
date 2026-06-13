import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Payback Calculator NS | GreenHomeNS",
  description:
    "Calculate how long solar panels take to pay back in Nova Scotia. Enter system size, cost, and NS Power net metering rate.",
};

export default function PaybackCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
