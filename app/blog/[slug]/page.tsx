import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { posts } from "@/app/blog/page";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | GreenHomeNS`,
    description: post.excerpt,
  };
}

// Full article content keyed by slug
const articleContent: Record<string, React.ReactNode> = {
  "ohpa-program-2026-guide": (
    <div className="prose prose-gray max-w-none">
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        The Oil to Heat Pump Affordability Program (OHPA) was the most generous heat pump grant in Canadian history — up to $15,000 to switch from oil to an electric cold-climate heat pump. But 2026 brought changes. Here&apos;s the current state.
      </p>
      <h2>What OHPA Offered (at Peak)</h2>
      <p>At its peak, OHPA combined a federal grant of up to $10,000 with a provincial match of up to $5,000, totalling $15,000 for eligible households. It required heating with oil (minimum 500 litres per year) and income verification.</p>
      <h2>2026 Status</h2>
      <p>As of early 2026, OHPA funding in Nova Scotia has been fully allocated and a standby list is in place. New applications are not being processed. NB and PEI have varying availability — check directly with your provincial program administrator.</p>
      <h2>What&apos;s Still Available in NS</h2>
      <ul>
        <li><strong>Efficiency NS rebates (up to $3,000)</strong> — still active for ENS-approved installers and cold-climate units</li>
        <li><strong>Moderate Income Rebate (up to $15,000)</strong> — check eligibility at efficiencyns.ca</li>
        <li><strong>NS Power rebates</strong> — for NS Power account holders, separate program</li>
      </ul>
      <h2>Our Recommendation</h2>
      <p>Use our <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a> to find what&apos;s currently active for your situation. Program availability changes frequently — never rely on information more than 30 days old.</p>
    </div>
  ),
  "hspf2-rating-guide-ns-rebates": (
    <div className="prose prose-gray max-w-none">
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        When you request a heat pump quote in Nova Scotia, you&apos;ll encounter a specification called HSPF2. It looks like a small technical footnote on a spec sheet — but it&apos;s the gating metric for whether your unit qualifies for rebates from Efficiency NS and other provincial programs. Understanding it before you sign anything can save you thousands of dollars.
      </p>
      <h2>What Is HSPF2?</h2>
      <p>HSPF stands for Heating Seasonal Performance Factor. It measures how efficiently a heat pump converts electricity into heat over an entire heating season — the higher the number, the more heat you get per kilowatt-hour consumed. The &quot;2&quot; refers to an updated test standard that Natural Resources Canada adopted in 2023, replacing the original HSPF protocol.</p>
      <p>Think of it like fuel economy ratings on a car. HSPF was the old city/highway sticker. HSPF2 is a more realistic combined-cycle test that better reflects real-world conditions — including the colder outdoor temperatures that define Atlantic Canada winters.</p>
      <h2>HSPF vs. HSPF2 — What Changed?</h2>
      <p>The original HSPF test used a warmer climate profile that didn&apos;t represent Canadian winters. HSPF2 uses a revised procedure that:</p>
      <ul>
        <li>Tests across a wider range of outdoor temperatures, including sub-zero points</li>
        <li>Uses a colder design point for cold-climate performance measurement</li>
        <li>Applies a more conservative defrost cycle assumption</li>
      </ul>
      <p>Because the test is harder, HSPF2 ratings run roughly 10–15% lower than old HSPF ratings for the same unit. A heat pump once rated HSPF 10 may now appear as HSPF2 8.5. This is not a performance downgrade — it&apos;s a more honest measurement.</p>
      <h2>Why HSPF2 Matters for NS Rebates</h2>
      <p>Efficiency Nova Scotia and the CleanHeat program use HSPF2 as a minimum eligibility threshold. A unit must reach at least <strong>HSPF2 7.5</strong> to qualify for standard cold-climate rebates, with some higher-tier incentives requiring 8.2 or above. If your installer quotes a unit below that threshold — or quotes the old HSPF number without clarifying — you could install a system that disqualifies your entire rebate application.</p>
      <p>The NS provincial rebate structure (Efficiency NS up to $3,000 + CleanHeat up to $10,000 income-qualified) totals up to $13,000. That&apos;s too much to leave on the table over a spec sheet misread. See the full breakdown on our <a href="/rebates">NS rebates page</a>.</p>
      <h2>How to Find a Unit&apos;s HSPF2 Rating</h2>
      <p>Two reliable sources:</p>
      <ul>
        <li><strong>NRCan ENERGY STAR certified products list</strong> — Natural Resources Canada maintains a searchable database of certified heat pumps. Filter for &quot;air-source heat pump&quot; and the HSPF2 column is listed directly.</li>
        <li><strong>Manufacturer spec sheet</strong> — Look for the row labelled &quot;HSPF2&quot; specifically. If the sheet only shows HSPF, ask your installer for the HSPF2 figure or look it up in the AHRI certified ratings database.</li>
      </ul>
      <p>If your installer can&apos;t tell you the HSPF2 rating of what they&apos;re quoting, that&apos;s a meaningful red flag worth taking seriously before you commit.</p>
      <h2>What HSPF2 Rating Should You Aim For?</h2>
      <ul>
        <li><strong>Minimum for NS rebate eligibility:</strong> HSPF2 7.5</li>
        <li><strong>Recommended for Atlantic Canada winters:</strong> HSPF2 8.5 or higher</li>
        <li><strong>Best cold-climate units (Mitsubishi H2i, Fujitsu Halcyon AOU, Daikin Altherma):</strong> HSPF2 10–13+</li>
      </ul>
      <p>These top-tier units maintain strong heating output even at -25°C and carry meaningfully lower operating costs over a 15–20 year lifespan. The difference between an HSPF2 7.5 unit and an HSPF2 10.5 unit can amount to $300–$500 per heating season in a typical NS home — real money over a decade.</p>
      <h2>Verify Before You Sign</h2>
      <p>Before committing to any installation contract:</p>
      <ul>
        <li>Ask for the exact HSPF2 rating of the proposed model</li>
        <li>Cross-reference it on the NRCan certified products list</li>
        <li>Confirm it meets the 7.5 minimum for Efficiency NS rebate eligibility</li>
        <li>Use our <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a> to verify which programs apply to your situation</li>
      </ul>
      <p>Our <a href="/installers">installer directory</a> features contractors who regularly work with cold-climate, HSPF2-compliant systems. You can also browse our <a href="/heat-pumps">heat pump model tracker</a> for efficiency data and independent ratings. And if you&apos;re still comparing options, our <a href="/tools/rebate-quiz">rebate quiz</a> takes about two minutes and tells you exactly what&apos;s on the table for your household.</p>
      <p>HSPF2 is one of the most important numbers on a heat pump quote — and one of the least-explained. Now you know what to ask for.</p>
    </div>
  ),
  "heat-pump-winter-performance-atlantic": (
    <div className="prose prose-gray max-w-none">
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        &quot;My neighbour&apos;s heat pump stopped working at -15°C and they went back to oil.&quot; We hear this constantly. Here&apos;s what&apos;s actually happening — and why it doesn&apos;t have to be your story.
      </p>
      <h2>The Two Types of Heat Pumps</h2>
      <p>This is the key distinction most contractors don&apos;t explain clearly. There are <strong>standard heat pumps</strong> and <strong>cold-climate heat pumps</strong>. Standard units lose efficiency — and eventually stop working — below -10°C to -15°C. Cold-climate units (Mitsubishi Hyper-Heat, Fujitsu Halcyon, Daikin Fit) are rated to -25°C to -30°C and maintain meaningful output even at those temperatures.</p>
      <h2>Atlantic Canada&apos;s Reality</h2>
      <p>Nova Scotia rarely drops below -20°C. New Brunswick and Newfoundland see -25°C occasionally. The correct cold-climate unit handles this without issue. The problem arises when a contractor installs a standard unit and doesn&apos;t disclose the limitation — or when a homeowner buys on price alone without checking the spec sheet.</p>
      <h2>What to Ask Your Installer</h2>
      <ul>
        <li>What is the rated heating capacity at -15°C? At -25°C?</li>
        <li>Is this unit HSPF2-rated at 7.5 or higher? (Required for most rebate programs)</li>
        <li>Do you have a backup heat strip or will we need supplemental heat?</li>
      </ul>
      <p>Every installer in our directory installs cold-climate rated systems. Check our <a href="/tools/heat-pump-sizer">Heat Pump Size Calculator</a> to verify you&apos;re being quoted the right capacity for your home.</p>
    </div>
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = articleContent[slug];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm mb-8 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> All Articles
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${post.tagColor}`}>{post.tag}</span>
          <span className="text-xs text-gray-600 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime} read
          </span>
          <span className="text-xs text-gray-600">
            {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
      </div>

      <hr className="border-gray-200 mb-8" />

      {content ? (
        <div>{content}</div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <BookOpen className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <p className="font-semibold mb-1">Full article coming soon</p>
          <p className="text-sm text-gray-600">This article is being prepared. Check back shortly or use our tools in the meantime.</p>
          <Link href="/tools" className="mt-4 inline-block text-sm font-semibold text-green-700 hover:underline">
            Use Free Tools →
          </Link>
        </div>
      )}

      <hr className="border-gray-200 my-10" />

      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-gray-700 mb-1">GreenHomeNS Editorial Policy</p>
        <p className="text-xs text-gray-600">All articles are written independently. No installer or manufacturer reviewed or paid for this content. Installer ratings are set before any commercial discussion. <Link href="/about" className="text-green-700 hover:underline">Read our full methodology.</Link></p>
      </div>
    </main>
  );
}
