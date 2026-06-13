import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utility Bill Impact Estimator | GreenHomeNS",
  description:
    "See how a heat pump affects your NS Power and oil bills. Estimate monthly savings based on your current heating costs.",
};

export default function BillImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
