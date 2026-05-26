import Link from "next/link";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Heat Pump & Solar Research | GreenHomeNS",
  description:
    "Research articles, program updates, and homeowner guides on heat pumps and solar across Atlantic Canada and Ontario.",
};

export const posts = [
  {
    slug: "ohpa-program-2026-guide",
    title: "OHPA 2026: Is the Oil-to-Heat-Pump Grant Still Available?",
    excerpt:
      "The Oil to Heat Pump Affordability program changed significantly in 2026. Here's what NS, NB, and PEI homeowners need to know about current eligibility, amounts, and application status.",
    date: "2026-05-20",
    readTime: "6 min",
    tag: "Rebates",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    slug: "heat-pump-winter-performance-atlantic",
    title: "Do Heat Pumps Actually Work in Atlantic Canada Winters?",
    excerpt:
      "The #1 concern we hear from NS, NB, and NL homeowners: \"My neighbour said their heat pump stopped working at -15°C.\" Here's the real story on cold-climate performance.",
    date: "2026-05-10",
    readTime: "8 min",
    tag: "Heat Pumps",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    slug: "solar-ns-power-billing-explained",
    title: "NS Power Net Metering Explained: What Your Bill Actually Shows",
    excerpt:
      "Net metering credits confuse even experienced solar owners. We break down exactly how NS Power calculates credits, when they reset, and how to read your bill after going solar.",
    date: "2026-04-28",
    readTime: "5 min",
    tag: "Solar",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    slug: "how-greenhome-scores-are-calculated",
    title: "How We Calculate GreenHome Scores — Full Methodology",
    excerpt:
      "Every number has a source. This post walks through exactly how we score installation quality, value for money, response time, warranty, and certifications — and why we weight them the way we do.",
    date: "2026-04-15",
    readTime: "7 min",
    tag: "About",
    tagColor: "bg-gray-100 text-gray-700",
  },
  {
    slug: "oil-heat-to-heat-pump-true-cost",
    title: "The True Cost of Switching from Oil Heat to a Heat Pump in NS",
    excerpt:
      "Beyond the installation quote: permits, panel upgrades, EnerGuide assessments, and the rebate timing gap. What a full oil-to-heat-pump conversion actually costs in Nova Scotia.",
    date: "2026-04-05",
    readTime: "9 min",
    tag: "Heat Pumps",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    slug: "nb-heat-pump-rebates-2026",
    title: "New Brunswick Heat Pump Rebates 2026: NB Power Programs Explained",
    excerpt:
      "NB Power's heat pump rebate program differs from NS and PEI. Here's the current state of NB rebates, eligibility rules, and how they stack with federal programs.",
    date: "2026-03-20",
    readTime: "6 min",
    tag: "New Brunswick",
    tagColor: "bg-purple-100 text-purple-700",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-3">
          <BookOpen className="w-4 h-4" />
          Research & Updates
        </div>
        <h1 className="text-3xl font-bold mb-3">GreenHomeNS Blog</h1>
        <p className="text-gray-600 leading-relaxed max-w-2xl">
          Program changes, homeowner research, and independent analysis — no sponsored content, no installer-submitted articles.
        </p>
      </div>

      {/* Featured post */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group block border-2 border-green-200 hover:border-green-500 rounded-2xl p-7 mb-8 bg-green-50 transition-all hover:shadow-md"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${featured.tagColor}`}>{featured.tag}</span>
          <span className="text-xs text-gray-600">Latest</span>
        </div>
        <h2 className="text-2xl font-bold mb-3 group-hover:text-green-700 transition-colors">{featured.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-4">{featured.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span>{new Date(featured.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} read</span>
          </div>
          <span className="text-sm font-semibold text-green-600 group-hover:gap-2 flex items-center gap-1">
            Read article <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Post list */}
      <div className="space-y-4">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-5 p-5 border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all bg-white"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${post.tagColor}`}>{post.tag}</span>
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{post.readTime}
                </span>
              </div>
              <h2 className="font-bold mb-1.5 group-hover:text-green-700 transition-colors">{post.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors shrink-0 mt-1" />
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
        <p className="text-sm text-gray-600">
          New articles published weekly. Program changes, rating updates, and homeowner research.
        </p>
      </div>
    </main>
  );
}
