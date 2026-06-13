import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CompareProvider } from "@/components/CompareContext";
import CompareBar from "@/components/CompareBar";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://greenhomens.com"),
  title: "GreenHomeNS — Nova Scotia Heat Pump & Solar Installer Directory",
  description:
    "Find trusted heat pump and solar installers in Nova Scotia. Compare ratings, see Efficiency NS rebates up to $8,000, and get free quotes from certified contractors.",
  keywords: ["heat pump Nova Scotia", "solar panels Nova Scotia", "Efficiency NS rebate", "heat pump installer Halifax"],
  openGraph: {
    type: "website",
    siteName: "GreenHomeNS",
    locale: "en_CA",
    url: "https://greenhomens.com",
    title: "GreenHomeNS — Nova Scotia Heat Pump & Solar Installer Directory",
    description:
      "Find trusted heat pump and solar installers in Nova Scotia. Compare ratings, see Efficiency NS rebates, and get free quotes from certified contractors.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenHomeNS — Nova Scotia Heat Pump & Solar Installer Directory",
    description:
      "Find trusted heat pump and solar installers in Nova Scotia. Compare ratings, see Efficiency NS rebates, and get free quotes from certified contractors.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geist.className} flex flex-col min-h-screen bg-white text-gray-900`}>
        <JsonLd data={organizationSchema()} />
        <CompareProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <CompareBar />
        </CompareProvider>
        <Analytics />
      </body>
    </html>
  );
}
