import Link from "next/link";
import { Leaf, X } from "lucide-react";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-green-700 mb-3">
              <Leaf className="w-4 h-4" />
              GreenHomeNS
            </Link>
            <p className="text-xs text-gray-600 leading-relaxed">
              Independent ratings for heat pump and solar installers across Atlantic Canada and Ontario. Free to use, always.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Directory</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><Link href="/installers" className="hover:text-gray-900">All Installers</Link></div>
              <div><Link href="/installers?service=heat-pump" className="hover:text-gray-900">Heat Pump</Link></div>
              <div><Link href="/installers?service=solar" className="hover:text-gray-900">Solar PV</Link></div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Rebates</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><Link href="/rebates" className="hover:text-gray-900">Rebate Guide</Link></div>
              <div><Link href="/rebates#efficiency-ns" className="hover:text-gray-900">Efficiency NS</Link></div>
              <div><Link href="/rebates#federal" className="hover:text-gray-900">Greener Homes</Link></div>
              <div><Link href="/tools/rebate-quiz" className="hover:text-gray-900">Rebate Quiz</Link></div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">More</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><Link href="/guides" className="hover:text-gray-900">Guides</Link></div>
              <div><Link href="/tools" className="hover:text-gray-900">Free Tools</Link></div>
              <div><Link href="/blog" className="hover:text-gray-900">Blog</Link></div>
              <div><Link href="/about" className="hover:text-gray-900">About & Methodology</Link></div>
              <div><a href="mailto:info@greenhomens.com" className="hover:text-gray-900">info@greenhomens.com</a></div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-4 text-xs text-gray-500 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
          Rebate data verified weekly by automated agent · Last checked May 2026 · Always confirm program status at your provincial program website before applying
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} GreenHomeNS.com — Independent. Not affiliated with any installer, utility, or government program.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-gray-700 transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gray-700 transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-4 h-4" />
              </a>
            </div>
            <Link href="/affiliate-disclosure" className="hover:text-gray-900">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
