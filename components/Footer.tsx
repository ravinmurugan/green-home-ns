import Link from "next/link";
import { Leaf } from "lucide-react";

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
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} GreenHomeNS.com — Independent. Not affiliated with any installer, utility, or government program.</span>
          <Link href="/affiliate-disclosure" className="hover:text-gray-900">Affiliate Disclosure</Link>
        </div>
      </div>
    </footer>
  );
}
