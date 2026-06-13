"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Star, MapPin, CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";
import { allInstallers } from "@/data/installers/index";
import { Installer } from "@/lib/types";

const certLabel: Record<string, string> = {
  "efficiency-ns-approved": "Efficiency NS",
  hrai: "HRAI",
  eccc: "ECCC",
  tssa: "TSSA",
  nsesa: "NSESA",
};

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

const serviceTopColor: Record<string, string> = {
  "heat-pump": "#3b82f6",
  solar: "#f59e0b",
  both: "#16a34a",
};

function ScoreCircle({ score }: { score: number }) {
  const size = 64;
  const cx = size / 2;
  const r = cx - 5;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#16a34a" strokeWidth="4"
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeLinecap="round" transform={`rotate(-90 ${cx} ${cx})`} />
      <text x={cx} y={cx + 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111827">{score}</text>
    </svg>
  );
}

function ScoreBar({ value, label }: { value: number; label: string }) {
  const color = value >= 80 ? "bg-green-500" : value >= 65 ? "bg-yellow-400" : "bg-red-400";
  return (
    <div className="mb-1.5">
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Bool({ val }: { val: boolean }) {
  return val
    ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
    : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />;
}

function CompareContent() {
  const params = useSearchParams();
  const rawIds = params.get("ids") ?? "";
  const ids = rawIds.split(",").filter(Boolean).slice(0, 4);
  const installers = ids
    .map((id) => allInstallers.find((i) => i.id === id))
    .filter((i): i is Installer => !!i);

  if (installers.length < 2) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Select at least 2 installers to compare.</p>
        <Link href="/installers" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2">
          Browse Installers <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const colWidth = installers.length === 2 ? "w-1/2" : installers.length === 3 ? "w-1/3" : "w-1/4";

  function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <tr className="border-b border-gray-100">
        <td className="py-3 pr-4 text-sm font-medium text-gray-500 whitespace-nowrap w-32 shrink-0">{label}</td>
        {children}
      </tr>
    );
  }

  return (
    <div>
      {/* Header cards */}
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: `repeat(${installers.length}, 1fr)` }}>
        {installers.map((inst) => (
          <div key={inst.id} className="border border-gray-200 rounded-xl overflow-hidden"
            style={{ borderTop: `4px solid ${serviceTopColor[inst.services]}` }}>
            <div className="p-4 text-center">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block ${serviceColor[inst.services]}`}>
                {serviceLabel[inst.services]}
              </span>
              <h3 className="font-bold text-base leading-tight mb-1">{inst.name}</h3>
              <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-3">
                <MapPin className="w-3 h-3" />{inst.city}, {inst.province}
              </div>
              <ScoreCircle score={inst.greenHomeScore.overall} />
              <div className="text-xs text-gray-500 mt-1">GreenHome Score</div>
              <div className="flex items-center justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-3 h-3 ${i <= Math.round(inst.avgRating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                ))}
                <span className="text-xs text-gray-500 ml-1">{inst.avgRating} ({inst.reviewCount.toLocaleString()})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {/* Score breakdown */}
            <tr className="bg-gray-50">
              <td colSpan={installers.length + 1} className="py-2 px-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                Score Breakdown
              </td>
            </tr>
            {(["installationQuality", "valueForMoney", "responseTime", "warranty", "certifications"] as const).map((key) => {
              const labels: Record<string, string> = {
                installationQuality: "Install Quality",
                valueForMoney: "Value",
                responseTime: "Response",
                warranty: "Warranty",
                certifications: "Certs",
              };
              return (
                <tr key={key} className="border-b border-gray-100">
                  <td className="py-3 pr-4 text-sm font-medium text-gray-500 w-36">{labels[key]}</td>
                  {installers.map((inst) => (
                    <td key={inst.id} className="py-3 px-2">
                      <ScoreBar value={inst.greenHomeScore[key]} label="" />
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* Details */}
            <tr className="bg-gray-50">
              <td colSpan={installers.length + 1} className="py-2 px-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                Details
              </td>
            </tr>
            <Row label="Experience">
              {installers.map((inst) => (
                <td key={inst.id} className="py-3 px-2 text-sm text-center font-medium">{inst.yearsInBusiness} yrs</td>
              ))}
            </Row>
            <Row label="Projects">
              {installers.map((inst) => (
                <td key={inst.id} className="py-3 px-2 text-sm text-center font-medium">{inst.projectsCompleted.toLocaleString()}+</td>
              ))}
            </Row>
            <Row label="Price Range">
              {installers.map((inst) => (
                <td key={inst.id} className="py-3 px-2 text-sm text-center font-semibold">{inst.priceRange}</td>
              ))}
            </Row>

            {/* Features */}
            <tr className="bg-gray-50">
              <td colSpan={installers.length + 1} className="py-2 px-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                Features
              </td>
            </tr>
            <Row label="Rebate Help">
              {installers.map((inst) => <td key={inst.id} className="py-3 px-2"><Bool val={inst.rebateAssistance} /></td>)}
            </Row>
            <Row label="Financing">
              {installers.map((inst) => <td key={inst.id} className="py-3 px-2"><Bool val={inst.financing} /></td>)}
            </Row>
            <Row label="24/7 Emergency">
              {installers.map((inst) => <td key={inst.id} className="py-3 px-2"><Bool val={!!inst.emergency24hr} /></td>)}
            </Row>

            {/* Certifications */}
            <tr className="bg-gray-50">
              <td colSpan={installers.length + 1} className="py-2 px-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
                Certifications
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4 text-sm font-medium text-gray-500 w-36">Held</td>
              {installers.map((inst) => (
                <td key={inst.id} className="py-3 px-2">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {inst.certifications.map((c) => (
                      <span key={c} className="text-xs bg-green-50 border border-green-200 text-green-700 px-1.5 py-0.5 rounded font-medium">
                        {certLabel[c] ?? c}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="py-4" />
              {installers.map((inst) => (
                <td key={inst.id} className="py-4 px-2">
                  <div className="flex flex-col gap-2">
                    <Link href={`/installers/${inst.slug}`}
                      className="block text-center text-sm font-semibold bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors">
                      View Profile
                    </Link>
                    <a href={inst.website} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg py-1.5 px-3 transition-colors">
                      Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Link href="/installers" className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1">
          ← Back to all installers
        </Link>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Compare Installers</h1>
        <p className="text-gray-500 text-sm">Side-by-side comparison of GreenHome Scores, features, and certifications.</p>
      </div>
      <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading comparison…</div>}>
        <CompareContent />
      </Suspense>
    </main>
  );
}
