"use client";

import { useState } from "react";
import { allInstallers, nsCities } from "@/data/installers/index";
import InstallerCard from "@/components/InstallerCard";
import { ServiceType } from "@/lib/types";

const serviceOptions = [
  { value: "all", label: "All Services" },
  { value: "heat-pump", label: "Heat Pump" },
  { value: "solar", label: "Solar PV" },
  { value: "both", label: "Heat Pump + Solar" },
];

export default function InstallersPage() {
  const [service, setService] = useState<ServiceType | "all">("all");
  const [city, setCity] = useState("all");
  const [rebateOnly, setRebateOnly] = useState(false);

  const filtered = allInstallers
    .filter((i) => {
      if (service !== "all" && service !== "both") {
        if (i.services !== service && i.services !== "both") return false;
      }
      if (service === "both" && i.services !== "both") return false;
      if (city !== "all" && i.city !== city) return false;
      if (rebateOnly && !i.rebateAssistance) return false;
      return true;
    })
    .sort((a, b) => b.greenHomeScore.overall - a.greenHomeScore.overall);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nova Scotia Heat Pump & Solar Installers</h1>
        <p className="text-gray-600">
          {allInstallers.length} certified installers — independently rated by GreenHome Score.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={service}
          onChange={(e) => setService(e.target.value as ServiceType | "all")}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="all">All Cities</option>
          {nsCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white cursor-pointer">
          <input
            type="checkbox"
            checked={rebateOnly}
            onChange={(e) => setRebateOnly(e.target.checked)}
            className="rounded"
          />
          Rebate Assistance
        </label>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          No installers match your filters. Try adjusting the criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((installer) => (
            <InstallerCard key={installer.id} installer={installer} />
          ))}
        </div>
      )}
    </main>
  );
}
