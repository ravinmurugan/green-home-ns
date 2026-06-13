import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Phone, Globe, Star, Award, CheckCircle2,
  Clock, Navigation, Briefcase, Wrench, ShieldCheck, CreditCard, Zap,
} from "lucide-react";
import { allInstallers, getInstallerBySlug } from "@/data/installers/index";
import ScoreRadarChart from "@/components/ScoreRadarChart";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import InstallerLeadForm from "@/components/InstallerLeadForm";
import type { Metadata } from "next";
import { Installer } from "@/lib/types";

export function generateStaticParams() {
  return allInstallers.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const installer = getInstallerBySlug(slug);
  if (!installer) return {};
  return {
    title: `${installer.name} — GreenHomeNS`,
    description: `${installer.name} in ${installer.city}, ${installer.province}. GreenHome Score: ${installer.greenHomeScore.overall}/100. ${installer.description.slice(0, 120)}...`,
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
  "$": "Budget-friendly",
  "$$": "Mid-range",
  "$$$": "Premium",
};

function getAchievements(installer: Installer) {
  const badges: { label: string; color: string }[] = [];
  if (installer.featured) badges.push({ label: "Top Rated", color: "bg-green-600 text-white" });
  if (installer.avgRating >= 5.0) badges.push({ label: "5.0 Star Rating", color: "bg-amber-100 text-amber-800" });
  else if (installer.avgRating >= 4.9) badges.push({ label: "4.9+ Stars", color: "bg-amber-100 text-amber-800" });
  if (installer.reviewCount >= 1000) badges.push({ label: `${(installer.reviewCount / 1000).toFixed(1)}K+ Reviews`, color: "bg-blue-100 text-blue-800" });
  else if (installer.reviewCount >= 200) badges.push({ label: `${installer.reviewCount}+ Reviews`, color: "bg-blue-100 text-blue-800" });
  if (installer.yearsInBusiness >= 40) badges.push({ label: `${installer.yearsInBusiness}+ Years`, color: "bg-purple-100 text-purple-800" });
  else if (installer.yearsInBusiness >= 15) badges.push({ label: `${installer.yearsInBusiness}+ Years`, color: "bg-purple-100 text-purple-800" });
  if (installer.projectsCompleted >= 10000) badges.push({ label: `${(installer.projectsCompleted / 1000).toFixed(0)}K+ Projects`, color: "bg-indigo-100 text-indigo-800" });
  else if (installer.projectsCompleted >= 1000) badges.push({ label: `${(installer.projectsCompleted / 1000).toFixed(1)}K+ Projects`, color: "bg-indigo-100 text-indigo-800" });
  if (installer.emergency24hr) badges.push({ label: "24/7 Emergency", color: "bg-red-100 text-red-700" });
  if (installer.financing) badges.push({ label: "Financing Available", color: "bg-teal-100 text-teal-800" });
  if (installer.rebateAssistance) badges.push({ label: "Rebate Assistance", color: "bg-green-100 text-green-800" });
  if (installer.priceRange === "$") badges.push({ label: "Best Value", color: "bg-gray-100 text-gray-700" });
  return badges;
}

export default async function InstallerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const installer = getInstallerBySlug(slug);
  if (!installer) notFound();

  const score = installer.greenHomeScore;
  const achievements = getAchievements(installer);

  return (
    <main>
      <JsonLd data={localBusinessSchema(installer)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://greenhomens.com" },
          { name: "Installers", url: "https://greenhomens.com/installers" },
          { name: installer.name, url: `https://greenhomens.com/installers/${installer.slug}` },
        ])}
      />
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
                {installer.emergency24hr && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 24/7 Emergency
                  </span>
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
            {/* Score circle */}
            <div className="text-center shrink-0">
              <div className="w-24 h-24 rounded-full border-4 border-green-500 flex flex-col items-center justify-center bg-green-50">
                <div className="text-3xl font-bold text-green-600 leading-none">{score.overall}</div>
                <div className="text-xs text-gray-500 mt-0.5">/ 100</div>
              </div>
              <div className="text-xs text-gray-500 mt-1.5">GreenHome Score</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm">{installer.avgRating}</span>
                <span className="text-xs text-gray-500">({installer.reviewCount.toLocaleString()})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Briefcase, label: "Years in Business", value: `${installer.yearsInBusiness}+` },
              { icon: Wrench, label: "Projects Completed", value: `${installer.projectsCompleted.toLocaleString()}+` },
              { icon: Star, label: "Avg Rating", value: `${installer.avgRating} ⭐` },
              { icon: ShieldCheck, label: "Certifications", value: installer.certifications.length.toString() },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="md:col-span-2 space-y-8">

          {/* Achievement badges */}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3">Recognition & Features</h2>
              <div className="flex flex-wrap gap-2">
                {achievements.map((badge) => (
                  <span key={badge.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          )}

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

          {/* Score breakdown — radar chart */}
          <div>
            <h2 className="text-lg font-bold mb-1">GreenHome Score Breakdown</h2>
            <p className="text-xs text-gray-500 mb-3">Hover over each axis point to see the score</p>
            <ScoreRadarChart score={score} />
          </div>

          {/* Brands */}
          {installer.brands && installer.brands.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3">Brands Installed</h2>
              <div className="flex flex-wrap gap-2">
                {installer.brands.map((b) => (
                  <span key={b} className="border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-sm font-medium">{b}</span>
                ))}
              </div>
            </div>
          )}

          {/* Service area */}
          {installer.serviceArea && installer.serviceArea.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-green-600" /> Service Area
              </h2>
              <div className="flex flex-wrap gap-2">
                {installer.serviceArea.map((area) => (
                  <span key={area} className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">{area}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div className="space-y-5">
          {/* Website CTA */}
          <div className="bg-green-600 text-white rounded-xl p-5">
            <h3 className="font-bold mb-1">Get a Quote</h3>
            <p className="text-green-100 text-sm mb-4">Visit their website to request a quote directly.</p>
            <a
              href={`/go/${installer.slug}`}
              className="block bg-white text-green-700 font-semibold text-center py-2.5 rounded-lg hover:bg-green-50 transition-colors text-sm"
            >
              Visit Website →
            </a>
            <a
              href={`tel:${installer.phone}`}
              className="block mt-2 border border-green-400 text-white font-semibold text-center py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Call {installer.phone}
            </a>
          </div>

          {/* Quick facts */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-sm mb-3">Quick Facts</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Years in business</span>
                <span className="font-semibold">{installer.yearsInBusiness}+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" /> Projects done</span>
                <span className="font-semibold">{installer.projectsCompleted.toLocaleString()}+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pricing</span>
                <span className="font-semibold">{installer.priceRange} — {priceDesc[installer.priceRange]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Rebate help</span>
                <span className={`font-semibold ${installer.rebateAssistance ? "text-green-600" : "text-gray-500"}`}>
                  {installer.rebateAssistance ? "Yes ✓" : "No"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Financing</span>
                <span className={`font-semibold ${installer.financing ? "text-green-600" : "text-gray-500"}`}>
                  {installer.financing ? "Yes ✓" : "No"}
                </span>
              </div>
              {installer.emergency24hr !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> 24/7 Emergency</span>
                  <span className={`font-semibold ${installer.emergency24hr ? "text-red-600" : "text-gray-500"}`}>
                    {installer.emergency24hr ? "Yes ✓" : "No"}
                  </span>
                </div>
              )}
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

          {/* Score summary mini */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-sm mb-3">Score Summary</h3>
            <div className="space-y-1.5 text-xs">
              {[
                { label: "Install Quality", value: score.installationQuality },
                { label: "Value for Money", value: score.valueForMoney },
                { label: "Response Time", value: score.responseTime },
                { label: "Warranty", value: score.warranty },
                { label: "Certifications", value: score.certifications },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-2">
                  <span className="text-gray-600 truncate">{item.label}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="font-bold text-gray-700 w-6 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead capture */}
          <InstallerLeadForm installerSlug={installer.slug} installerName={installer.name} />
        </div>
      </div>
    </main>
  );
}
