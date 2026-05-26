"use client";

import { useState, useMemo } from "react";
import { allInstallers, provinces, getCitiesForProvince, type Province } from "@/data/installers/index";
import InstallerCard from "@/components/InstallerCard";
import { ServiceType } from "@/lib/types";
import { Star } from "lucide-react";

const serviceOptions = [
  { value: "all", label: "All Services" },
  { value: "heat-pump", label: "Heat Pump" },
  { value: "solar", label: "Solar PV" },
  { value: "both", label: "Heat Pump + Solar" },
];

export default function RatingsPage() {
  const [province, setProvince] = useState<Province | "all">("all");
  const [service, setService] = useState<ServiceType | "all">("all");
  const [city, setCity] = useState("all");
  const [rebateOnly, setRebateOnly] = useState(false);

  const cities = useMemo(() => getCitiesForProvince(province), [province]);

  const filtered = useMemo(() =>
    allInstallers
      .filter((i) => {
        if (province !== "all" && i.province !== province) return false;
        if (service !== "all" && service !== "both") {
          if (i.services !== service && i.services !== "both") return false;
        }
        if (service === "both" && i.services !== "both") return false;
        if (city !== "all" && i.city !== city) return false;
        if (rebateOnly && !i.rebateAssistance) return false;
        return true;
      })
      .sort((a, b) => b.greenHomeScore.overall - a.greenHomeScore.overall),
    [province, service, city, rebateOnly]
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
          <Star className="w-4 h-4 fill-green-600" />
          Independent Research — Not Paid Placements
        </div>
        <h1 className="text-3xl font-bold mb-2">Heat Pump & Solar Installer Ratings</h1>
        <p className="text-gray-600">
          {allInstallers.length} installers across {provinces.length} provinces — ranked by GreenHome Score. Ratings based on research, set before any commercial discussion.
        </p>
      </div>

      {/* Province tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => { setProvince("all"); setCity("all"); }}
          className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
            province === "all"
              ? "bg-green-600 text-white border-green-600"
              : "border-gray-200 text-gray-700 hover:border-green-400"
          }`}
        >
          All Provinces
        </button>
        {provinces.map((p) => (
          <button
            key={p}
            onClick={() => { setProvince(p); setCity("all"); }}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
              province === p
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-200 text-gray-700 hover:border-green-400"
            }`}
          >
            {p === "Prince Edward Island" ? "PEI" : p}
          </button>
        ))}
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
          {cities.map((c) => (
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

        <div className="ml-auto text-sm text-gray-600 flex items-center">
          {filtered.length} installer{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

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
