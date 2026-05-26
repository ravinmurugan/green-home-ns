"use client";

import Link from "next/link";
import { Star, MapPin, Award, DollarSign } from "lucide-react";
import { Installer } from "@/lib/types";

const serviceLabel: Record<string, string> = {
  "heat-pump": "Heat Pump",
  solar: "Solar PV",
  both: "Heat Pump + Solar",
};

const serviceColor: Record<string, string> = {
  "heat-pump": "bg-blue-100 text-blue-700",
  solar: "bg-amber-100 text-amber-700",
  both: "bg-green-100 text-green-700",
};

export default function InstallerCard({ installer }: { installer: Installer }) {
  return (
    <Link
      href={`/installers/${installer.slug}`}
      className="group block border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-md transition-all bg-white"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${serviceColor[installer.services]}`}>
              {serviceLabel[installer.services]}
            </span>
            {installer.featured && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-600 text-white">
                Top Rated
              </span>
            )}
          </div>
          <h3 className="font-bold text-base group-hover:text-green-700 transition-colors">{installer.name}</h3>
          <div className="flex items-center gap-1 text-gray-600 text-xs mt-0.5">
            <MapPin className="w-3 h-3" />
            {installer.city}, {installer.province}
          </div>
        </div>
        <div className="text-right shrink-0 ml-4">
          <div className="text-2xl font-bold text-green-600">{installer.greenHomeScore.overall}</div>
          <div className="text-xs text-gray-600">/ 100</div>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">{installer.description}</p>

      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1 text-gray-600">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{installer.avgRating}</span>
          <span>({installer.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Award className="w-3.5 h-3.5 text-green-600" />
          {installer.yearsInBusiness} yrs
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <DollarSign className="w-3.5 h-3.5" />
          {installer.priceRange}
        </div>
        {installer.rebateAssistance && (
          <span className="text-green-700 font-semibold">Rebate Help ✓</span>
        )}
        {installer.financing && (
          <span className="text-blue-700 font-semibold">Financing ✓</span>
        )}
      </div>
    </Link>
  );
}
