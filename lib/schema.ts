import { Installer } from "@/lib/types";

const BASE = "https://greenhomens.com";

const provinceRegionCode: Record<string, string> = {
  "Nova Scotia": "NS",
  "New Brunswick": "NB",
  "Prince Edward Island": "PE",
  Newfoundland: "NL",
  Ontario: "ON",
};

/** Organization + WebSite schema for the site root. */
export function organizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: "GreenHomeNS",
        url: BASE,
        logo: `${BASE}/favicon.ico`,
        description:
          "Independent heat pump and solar installer ratings and rebate guide for Nova Scotia and Atlantic Canada.",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        name: "GreenHomeNS",
        url: BASE,
        description:
          "Find and compare trusted heat pump and solar installers across Nova Scotia and Atlantic Canada, with an independent rebate guide.",
        publisher: { "@id": `${BASE}/#organization` },
      },
    ],
  };
}

/** LocalBusiness (HVACBusiness) schema for an installer profile. */
export function localBusinessSchema(installer: Installer): object {
  const ratingValue = Math.round((installer.greenHomeScore.overall / 20) * 10) / 10;

  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${BASE}/installers/${installer.slug}#business`,
    name: installer.name,
    url: `${BASE}/installers/${installer.slug}`,
    description: installer.description,
    telephone: installer.phone,
    priceRange: installer.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: installer.city,
      addressRegion: provinceRegionCode[installer.province] ?? installer.province,
      addressCountry: "CA",
    },
    areaServed: installer.serviceArea?.length
      ? installer.serviceArea.map((area) => ({ "@type": "Place", name: area }))
      : { "@type": "Place", name: `${installer.city}, ${installer.province}` },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      bestRating: 5,
      reviewCount: installer.reviewCount,
    },
  };
}

/** BreadcrumbList schema. items are ordered [{name, url}, ...]. */
export function breadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** FAQPage schema. qa is ordered [{question, answer}, ...]. */
export function faqSchema(qa: { question: string; answer: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
