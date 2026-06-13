"use client";

import Link from "next/link";
import { Star, MapPin, Award, DollarSign, Zap, GitCompare, Check } from "lucide-react";
import { Installer } from "@/lib/types";
import { useCompare } from "./CompareContext";

const serviceTopColor: Record<string, string> = {
  "heat-pump": "#3b82f6",
  solar: "#f59e0b",
  both: "#16a34a",
};

const serviceLabel: Record<string, string> = {
  "heat-pump": "Heat Pump",
  solar: "Solar PV",
  both: "Heat Pump + Solar",
};

const serviceChip: Record<string, string> = {
  "heat-pump": "bg-blue-100 text-blue-700",
  solar: "bg-amber-100 text-amber-700",
  both: "bg-green-100 text-green-700",
};

const rankBadge: Record<number, { bg: string; label: string }> = {
  1: { bg: "#f59e0b", label: "#1" },
  2: { bg: "#9ca3af", label: "#2" },
  3: { bg: "#92400e", label: "#3" },
};

function ScoreCircle({ score, size = 56 }: { score: number; size?: number }) {
  const cx = size / 2;
  const r = size / 2 - 5;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const fontSize = size > 60 ? 16 : 13;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle
        cx={cx} cy={cx} r={r} fill="none"
        stroke="#16a34a" strokeWidth="4"
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
      />
      <text
        x={cx} y={cx + fontSize * 0.4}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="bold"
        fill="#111827"
      >
        {score}
      </text>
    </svg>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600">{rating} ({count.toLocaleString()})</span>
    </div>
  );
}

interface Props {
  installer: Installer;
  rank: number;
  hero?: boolean;
  isBestInProvince?: boolean;
}

export default function InstallerCard({ installer, rank, hero = false, isBestInProvince }: Props) {
  const topColor = serviceTopColor[installer.services];
  const badge = rankBadge[rank];
  const { toggle, isSelected, isFull } = useCompare();
  const selected = isSelected(installer.id);

  function CompareButton({ className }: { className?: string }) {
    return (
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(installer.id); }}
        disabled={!selected && isFull}
        title={isFull && !selected ? "Max 4 installers" : selected ? "Remove from comparison" : "Add to compare"}
        className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
          selected
            ? "bg-green-600 text-white border-green-600"
            : isFull
            ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-600 border-gray-300 hover:border-green-500 hover:text-green-700"
        } ${className ?? ""}`}
      >
        {selected ? <Check className="w-3 h-3" /> : <GitCompare className="w-3 h-3" />}
        {selected ? "Added" : "Compare"}
      </button>
    );
  }

  if (hero) {
    return (
      <Link
        href={`/installers/${installer.slug}`}
        className="group block rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all overflow-hidden"
        style={{ borderTop: `5px solid ${topColor}` }}
      >
        <div className="p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-sm font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#f59e0b" }}>
                #1 Rated
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${serviceChip[installer.services]}`}>
                {serviceLabel[installer.services]}
              </span>
              {isBestInProvince && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-600 text-white">
                  Best in Province
                </span>
              )}
              {installer.emergency24hr && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> 24/7
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold mb-1 group-hover:text-green-700 transition-colors">{installer.name}</h2>
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
              <MapPin className="w-3.5 h-3.5" />
              {installer.city}, {installer.province}
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{installer.description}</p>
            <StarRating rating={installer.avgRating} count={installer.reviewCount} />
            <div className="flex flex-wrap gap-2 mt-3">
              {installer.rebateAssistance && (
                <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg">Rebate Help ✓</span>
              )}
              {installer.financing && (
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg">Financing ✓</span>
              )}
              <span className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg flex items-center gap-1">
                <Award className="w-3 h-3" /> {installer.yearsInBusiness} yrs experience
              </span>
              <CompareButton />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0 sm:pt-2">
            <ScoreCircle score={installer.greenHomeScore.overall} size={72} />
            <div className="text-xs text-gray-500 text-center">GreenHome Score</div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/installers/${installer.slug}`}
      className="group block rounded-xl bg-white border border-gray-200 hover:border-green-400 hover:shadow-md transition-all overflow-hidden"
      style={{ borderTop: `4px solid ${topColor}` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {badge ? (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: badge.bg }}>
                  {badge.label}
                </span>
              ) : (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  #{rank}
                </span>
              )}
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${serviceChip[installer.services]}`}>
                {serviceLabel[installer.services]}
              </span>
              {isBestInProvince && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-600 text-white">Best in Province</span>
              )}
            </div>
            <h3 className="font-bold text-base group-hover:text-green-700 transition-colors leading-tight">{installer.name}</h3>
            <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
              <MapPin className="w-3 h-3" />
              {installer.city}, {installer.province}
            </div>
          </div>
          <ScoreCircle score={installer.greenHomeScore.overall} />
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">{installer.description}</p>

        <div className="space-y-2">
          <StarRating rating={installer.avgRating} count={installer.reviewCount} />
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-green-600" />
              {installer.yearsInBusiness} yrs
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              {installer.priceRange}
            </div>
            {installer.emergency24hr && (
              <div className="flex items-center gap-1 text-orange-600 font-semibold">
                <Zap className="w-3.5 h-3.5" /> 24/7
              </div>
            )}
            {installer.rebateAssistance && (
              <span className="text-green-700 font-semibold">Rebate Help ✓</span>
            )}
            {installer.financing && (
              <span className="text-blue-700 font-semibold">Financing ✓</span>
            )}
          </div>
          <div className="mt-3">
            <CompareButton />
          </div>
        </div>
      </div>
    </Link>
  );
}
