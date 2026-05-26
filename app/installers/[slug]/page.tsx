import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Globe, Star, Award, CheckCircle2 } from "lucide-react";
import { allInstallers, getInstallerBySlug } from "@/data/installers/index";
import ScoreBar from "@/components/ScoreBar";
import type { Metadata } from "next";

export function generateStaticParams() {
  return allInstallers.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const installer = getInstallerBySlug(slug);
  if (!installer) return {};
  return {
    title: `${installer.name} — GreenHomeNS`,
    description: `${installer.name} in ${installer.city}, NS. GreenHome Score: ${installer.greenHomeScore.overall}/100. ${installer.description.slice(0, 120)}...`,
  };
}

const serviceLabel: Record<string, string> = {
  "heat-pump": "Heat Pump",
  solar: "Solar PV",
  both: "Heat Pump + Solar",
};

const certLabel: Record<string, string> = {
  "efficiency-ns-approved": "Efficiency NS Approved",
  hrai: "HRAI Certified",
  eccc: "ECCC Registered",
  tssa: "TSSA Certified",
  nsesa: "NSESA Certified",
};

const priceDesc: Record<string, string> = {
  "$": "Budget-friendly pricing",
  "$$": "Mid-range pricing",
  "$$$": "Premium pricing",
};

export default async function InstallerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const installer = getInstallerBySlug(slug);
  if (!installer) notFound();

  const score = installer.greenHomeScore;

  return (
    <main>
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link href="/installers" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All Installers
          </Link>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  {serviceLabel[installer.services]}
                </span>
                {installer.featured && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-600 text-white">Top Rated</span>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{installer.name}</h1>
              <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {installer.city}, {installer.province}
                {installer.address && <span className="hidden sm:inline"> · {installer.address}</span>}
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href={`tel:${installer.phone}`} className="flex items-center gap-1.5 text-green-700 hover:underline">
                  <Phone className="w-4 h-4" /> {installer.phone}
                </a>
                <a href={`/go/${installer.slug}`} className="flex items-center gap-1.5 text-green-700 hover:underline">
                  <Globe className="w-4 h-4" /> Website
                </a>
              </div>
            </div>
            <div className="text-center shrink-0">
              <div className="text-5xl font-bold text-green-600">{score.overall}</div>
              <div className="text-sm text-gray-600">/ 100</div>
              <div className="text-xs text-gray-600 mt-0.5">GreenHome Score</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm">{installer.avgRating}</span>
                <span className="text-xs text-gray-600">({installer.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-lg font-bold mb-3">About {installer.name}</h2>
            <p className="text-gray-600 leading-relaxed">{installer.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="text-lg font-bold mb-3">Why Choose Them</h2>
            <ul className="space-y-2">
              {installer.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Score breakdown */}
          <div>
            <h2 className="text-lg font-bold mb-4">GreenHome Score Breakdown</h2>
            <div className="space-y-4">
              <ScoreBar label="Installation Quality" value={score.installationQuality} />
              <ScoreBar label="Value for Money" value={score.valueForMoney} />
              <ScoreBar label="Response Time" value={score.responseTime} />
              <ScoreBar label="Warranty" value={score.warranty} />
              <ScoreBar label="Certifications" value={score.certifications} />
            </div>
          </div>

          {/* Brands */}
          {installer.brands && (
            <div>
              <h2 className="text-lg font-bold mb-3">Brands Installed</h2>
              <div className="flex flex-wrap gap-2">
                {installer.brands.map((b) => (
                  <span key={b} className="border border-gray-200 rounded-lg px-3 py-1 text-sm">{b}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div className="space-y-5">
          {/* Website CTA */}
          <div className="bg-green-600 text-white rounded-xl p-5">
            <h3 className="font-bold mb-2">Visit {installer.name}</h3>
            <p className="text-green-100 text-sm mb-4">Go to their website to request a quote directly.</p>
            <a
              href={`/go/${installer.slug}`}
              className="block bg-white text-green-700 font-semibold text-center py-2.5 rounded-lg hover:bg-green-50 transition-colors text-sm"
            >
              Visit Website →
            </a>
          </div>

          {/* Quick facts */}
          <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-sm">Quick Facts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Years in business</span>
                <span className="font-semibold">{installer.yearsInBusiness}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projects completed</span>
                <span className="font-semibold">{installer.projectsCompleted.toLocaleString()}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pricing</span>
                <span className="font-semibold">{installer.priceRange} — {priceDesc[installer.priceRange]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rebate assistance</span>
                <span className={`font-semibold ${installer.rebateAssistance ? "text-green-600" : "text-gray-600"}`}>
                  {installer.rebateAssistance ? "Yes ✓" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Financing available</span>
                <span className={`font-semibold ${installer.financing ? "text-green-600" : "text-gray-600"}`}>
                  {installer.financing ? "Yes ✓" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-sm mb-3">Certifications</h3>
            <div className="space-y-2">
              {installer.certifications.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-green-600 shrink-0" />
                  {certLabel[c] ?? c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
