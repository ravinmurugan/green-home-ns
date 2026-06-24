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
  "hspf2-rating-explained-ns-rebates": (
    <div className="prose prose-gray max-w-none">
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        When you&apos;re shopping for a heat pump in Nova Scotia, the acronym HSPF2 appears on every spec sheet, every rebate eligibility guide, and probably your installer&apos;s quote. It&apos;s not marketing fluff — it&apos;s the number that determines whether your new heat pump qualifies for provincial rebates and how much it will cost to run all winter. Here&apos;s what it actually means.
      </p>

      <h2>What Is HSPF2?</h2>
      <p>
        HSPF stands for Heating Seasonal Performance Factor. The &quot;2&quot; refers to the updated 2023 AHRI (Air-Conditioning, Heating, and Refrigeration Institute) test standard, which replaced the original HSPF rating system. The updated protocol is more realistic: it tests units across a wider range of outdoor temperatures, including the cold extremes that Atlantic Canada homeowners actually experience every January.
      </p>
      <p>
        In plain terms, HSPF2 measures how efficiently a heat pump converts electricity into heat over a full heating season. The unit is BTU per watt-hour (BTU/Wh). A higher number means more heat per kilowatt-hour of electricity — and a lower operating cost for you.
      </p>

      <h2>How to Read the Number</h2>
      <p>Think of it on a scale relative to alternatives:</p>
      <ul>
        <li><strong>Electric baseboard:</strong> equivalent to roughly 3.4 HSPF2 (100% conversion, no multiplication — a watt in equals a watt of heat out)</li>
        <li><strong>Standard heat pumps:</strong> HSPF2 5.5–7.4 — efficient, but often not cold-climate rated</li>
        <li><strong>Cold-climate heat pumps:</strong> HSPF2 8.0–12.5+ — what NS rebate programs require, and what actually works in a Halifax or Truro winter</li>
      </ul>
      <p>
        A unit rated HSPF2 10.0 delivers roughly three times the heat output per dollar of electricity compared to a baseboard heater at the same outdoor temperature. That&apos;s the efficiency gap that makes heat pumps worth the upfront cost.
      </p>

      <h2>Why NS Rebate Programs Use HSPF2</h2>
      <p>
        Both Efficiency NS and the CleanHeat program use HSPF2 thresholds to gatekeep which equipment qualifies for rebates. As of mid-2026:
      </p>
      <ul>
        <li><strong>Efficiency NS standard rebate (up to $3,000):</strong> requires HSPF2 ≥ 7.5 and an approved cold-climate model</li>
        <li><strong>CleanHeat program (income-qualified, up to $10,000):</strong> requires HSPF2 ≥ 8.2 for maximum rebate tiers — units barely above the floor get lower amounts</li>
        <li><strong>NS Power rebate:</strong> thresholds vary by program cycle; check ns power&apos;s current program documents before purchasing</li>
      </ul>
      <p>
        The minimum rating requirements exist so public funds support equipment that will actually reduce energy consumption — not just swap one inefficient source for another. A unit that barely squeaks above 7.5 HSPF2 will save you money, but a unit rated 10+ will save significantly more.
      </p>

      <h2>HSPF vs HSPF2 — Don&apos;t Get Confused</h2>
      <p>
        This is where homeowners get misled. Manufacturers and sales reps sometimes quote the older <strong>HSPF</strong> rating because the numbers are higher and look more impressive on a brochure. A unit rated HSPF 10 (old standard) translates to roughly HSPF2 8.1 (new standard) — a meaningful difference when rebate cutoffs sit at 7.5 or 8.2.
      </p>
      <p>
        Always ask specifically for the <strong>HSPF2</strong> rating. If a contractor quotes only HSPF and can&apos;t or won&apos;t provide the HSPF2 equivalent, treat it as a red flag. Reputable installers in our <a href="/installers">rated directory</a> will provide AHRI certificate numbers on request.
      </p>

      <h2>Top Cold-Climate Units by HSPF2 (2026)</h2>
      <p>These models are commonly installed in NS and comfortably clear rebate thresholds:</p>
      <ul>
        <li><strong>Mitsubishi Hyper-Heat MSZ-FS series:</strong> HSPF2 10.0–12.5 (varies by capacity); rated to -25°C</li>
        <li><strong>Fujitsu Halcyon AOU series:</strong> HSPF2 9.5–11.0; rated to -25°C</li>
        <li><strong>Daikin Fit:</strong> HSPF2 8.5–9.5; compact ducted option for older homes</li>
        <li><strong>Bosch IDS Ultra:</strong> HSPF2 9.0–10.5; strong warranty support in Atlantic Canada</li>
      </ul>
      <p>All of the above qualify for NS rebates and maintain meaningful heating output at the coldest temperatures Nova Scotia typically sees.</p>

      <h2>How to Verify a Unit&apos;s HSPF2 Rating</h2>
      <p>
        Don&apos;t rely on a sales rep&apos;s word. Three ways to verify:
      </p>
      <ul>
        <li><strong>AHRI Certified Directory</strong> (ahridirectory.org) — search by brand and model number; the certificate lists the HSPF2 rating officially</li>
        <li><strong>Natural Resources Canada Eligible Equipment List</strong> — updated regularly for programs tied to federal requirements</li>
        <li><strong>Efficiency NS approved product list</strong> — the most reliable source for NS-specific rebate eligibility</li>
      </ul>
      <p>
        Your installer should provide the AHRI certificate number in the quote. If it&apos;s missing, ask before signing.
      </p>

      <h2>Bottom Line</h2>
      <p>
        HSPF2 is the single most important spec on a heat pump data sheet. It determines rebate eligibility, predicts your operating cost, and signals whether the equipment will perform during a Nova Scotia winter. Use our <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a> to check current program thresholds for your situation, or browse our <a href="/installers">rated installers</a> to find contractors who will walk you through the specs — not around them. You can also compare the full rebate landscape at our <a href="/rebates">rebates overview page</a>.
      </p>
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
