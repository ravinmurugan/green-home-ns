import Link from "next/link";
import { Leaf } from "lucide-react";

const nav = [
  { href: "/installers", label: "Find Installers" },
  { href: "/rebates", label: "NS Rebates" },
  { href: "/heat-pumps", label: "Heat Pumps" },
  { href: "/solar", label: "Solar" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-green-700 text-lg">
          <Leaf className="w-5 h-5" />
          GreenHomeNS
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-gray-600 hover:text-gray-900 transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/installers"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Find Installers
        </Link>
      </div>
    </header>
  );
}
