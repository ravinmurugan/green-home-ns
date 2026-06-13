"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { allInstallers, provinces, getCitiesForProvince, type Province } from "@/data/installers/index";
import InstallerCard from "@/components/InstallerCard";
import { ServiceType } from "@/lib/types";
import { ShieldCheck, Sun, Thermometer, Zap } from "lucide-react";

const serviceOptions: { value: ServiceType | "all"; label: string; icon?: React.ReactNode }[] = [
  { value: "all", label: "All Services" },
  { value: "heat-pump", label: "Heat Pump", icon: <Thermometer className="w-3.5 h-3.5" /> },
  { value: "solar", label: "Solar PV", icon: <Sun className="w-3.5 h-3.5" /> },
  { value: "both", label: "HP + Solar", icon: <Zap className="w-3.5 h-3.5" /> },
];

const provinceShort: Record<string, string> = {
  "Prince Edward Island": "PEI",
  "Nova Scotia": "NS",
  "New Brunswick": "NB",
  "Newfoundland": "NL",
  "Ontario": "ON",
};

function RatingsPage() {
  const params = useSearchParams();
  const initService = (params.get("service") as ServiceType | null) ?? "all";
  const initProvince = (params.get("province") as Province | null) ?? "all";

  const [province, setProvince] = useState<Province | "all">(initProvince);
  const [service, setService] = useState<ServiceType | "all">(initService);
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

  const [hero, ...rest] = filtered;
  const selectedProvinceName = province !== "all" ? province : null;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Heat Pump & Solar Installer Ratings</h1>
        <p className="text-gray-600">
          {allInstallers.length} installers across {provinces.length} provinces — ranked by GreenHome Score.
        </p>
      </div>

      {/* Trust banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
        <p className="text-sm text-green-800 font-medium">
          Independent research — not paid placements. Ratings set before any commercial discussion. Scores based on certifications, reviews, warranty, and install quality.
        </p>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-14 z-40 bg-white border-b border-gray-100 -mx-4 px-4 py-3 mb-8">
        {/* Province pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => { setProvince("all"); setCity("all"); }}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
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
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
                province === p
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-200 text-gray-700 hover:border-green-400"
              }`}
            >
              {provinceShort[p] ?? p}
            </button>
          ))}
        </div>

        {/* Second row: service pills + city + rebate + count */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Service pills */}
          <div className="flex gap-1.5">
            {serviceOptions.map((o) => (
              <button
                key={o.value}
                onClick={() => setService(o.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                  service === o.value
                    ? "bg-gray-800 text-white border-gray-800"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {o.icon}
                {o.label}
              </button>
            ))}
          </div>

          {/* City select — styled */}
          {cities.length > 0 && (
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border-2 border-gray-200 rounded-full px-3 py-1.5 text-xs font-semibold bg-white text-gray-600 hover:border-gray-400 transition-all"
            >
              <option value="all">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}

          {/* Rebate toggle */}
          <label className="flex items-center gap-1.5 text-xs font-semibold border-2 border-gray-200 rounded-full px-3 py-1.5 bg-white cursor-pointer hover:border-gray-400 transition-all select-none">
            <input
              type="checkbox"
              checked={rebateOnly}
              onChange={(e) => setRebateOnly(e.target.checked)}
              className="rounded"
            />
            Rebate Help
          </label>

          {/* Result count */}
          <div className="ml-auto">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
              {filtered.length} installer{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <div className="font-semibold text-gray-700 mb-1">No installers match your filters</div>
          <div className="text-sm text-gray-500">Try adjusting province, service type, or removing the rebate filter.</div>
        </div>
      ) : (
        <div>
          {/* Hero card — #1 ranked */}
          {hero && (
            <div className="mb-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                {selectedProvinceName ? `#1 in ${selectedProvinceName}` : "Top Rated Overall"}
              </div>
              <InstallerCard
                installer={hero}
                rank={1}
                hero={true}
                isBestInProvince={selectedProvinceName !== null}
              />
            </div>
          )}

          {/* Rest of grid */}
          {rest.length > 0 && (
            <>
              {rest.length > 0 && (
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  {filtered.length - 1} More Installer{rest.length !== 1 ? "s" : ""}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((installer, i) => (
                  <InstallerCard
                    key={installer.id}
                    installer={installer}
                    rank={i + 2}
                    isBestInProvince={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}

export default function InstallerPageWrapper() {
  return (
    <Suspense>
      <RatingsPage />
    </Suspense>
  );
}
