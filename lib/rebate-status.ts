import verified from "@/data/rebates/last-verified.json";

/** Reads the weekly rebate-verification agent's output for the footer status line. */
export function rebateVerification() {
  const checkedAt = new Date(verified.checkedAt);
  const lastChecked = checkedAt.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return {
    lastChecked,
    reachable: verified.reachable,
    total: verified.total,
  };
}
