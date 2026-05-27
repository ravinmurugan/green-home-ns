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
  "hspf2-rating-guide-nova-scotia": (
    <div className="prose prose-gray max-w-none">
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        When you&apos;re shopping for a heat pump in Nova Scotia, you&apos;ll encounter a spec called &quot;HSPF2.&quot; Most contractors mention it in passing, but few explain what it actually means — or why choosing a unit with the wrong rating could disqualify you from thousands of dollars in provincial rebates.
      </p>

      <h2>What Is HSPF2?</h2>
      <p>
        HSPF stands for Heating Seasonal Performance Factor. The &quot;2&quot; marks the updated test standard introduced by the Air Conditioning, Heating and Refrigeration Institute (AHRI) in 2023, which simulates colder, more realistic climate conditions than the original HSPF test. The number tells you how much heat a system delivers per unit of electricity consumed over a full heating season — the higher the number, the more efficient the system.
      </p>
      <p>
        A unit with an HSPF2 of 10, for example, delivers 10 BTUs of heat for every watt-hour of electricity it uses. Older, single-speed units often rate around 7–8 HSPF2. Modern cold-climate inverter-driven systems regularly hit 10–13.
      </p>

      <h2>HSPF vs. HSPF2 — Why the Number Looks Lower Now</h2>
      <p>
        If you&apos;re comparing quotes and one spec sheet says &quot;12 HSPF&quot; while another says &quot;8.5 HSPF2,&quot; the test methodology change explains the gap. HSPF2 uses a colder test region (Region IV) than the legacy HSPF test, which makes the two numbers directly incomparable. A rough rule of thumb: <strong>HSPF2 ≈ HSPF × 0.85</strong>, though this varies by unit.
      </p>
      <p>Always compare HSPF2 to HSPF2. Mixing the two in a side-by-side gives you a false picture of efficiency.</p>

      <h2>Why HSPF2 Controls Your Rebate Eligibility in Nova Scotia</h2>
      <p>Both Efficiency Nova Scotia (ENS) and the provincial CleanHeat rebate program use HSPF2 thresholds as eligibility gates. As of 2026:</p>
      <ul>
        <li><strong>ENS cold-climate heat pump rebates (up to $3,000):</strong> require HSPF2 ≥ 7.5</li>
        <li><strong>CleanHeat income-qualified rebates (up to $10,000):</strong> typically require HSPF2 ≥ 8.2 for the top rebate tier</li>
        <li><strong>Canada Greener Homes Loan (still active as of 2026):</strong> requires EnerGuide-verified efficiency, which includes HSPF2 thresholds determined at assessment</li>
      </ul>
      <p>
        If your installer quotes a unit below the minimum HSPF2, you won&apos;t qualify for ENS or CleanHeat rebates — and some contractors don&apos;t check the approved equipment list before writing a proposal. Always verify before signing. Use our <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a> to see what programs you currently qualify for.
      </p>

      <h2>What HSPF2 Means for Your Heating Bill</h2>
      <p>For a typical NS home currently heating with oil at around $1.35–$1.50/litre, efficiency differences add up fast:</p>
      <ul>
        <li>An HSPF2 7.5 unit typically cuts annual heating costs by <strong>40–50%</strong> compared to oil</li>
        <li>An HSPF2 10+ unit typically cuts costs by <strong>55–65%</strong></li>
        <li>Each full HSPF2 point above the minimum saves roughly <strong>$100–$200/year</strong> in a 1,500 sq ft home, depending on electricity rates and usage</li>
      </ul>
      <p>
        Over 15–20 years of operation, the gap between a 7.5 and a 10.5 HSPF2 unit can compound to $2,000–$4,000 in electricity savings — on top of the higher upfront rebate you unlock with the better-rated unit.
      </p>

      <h2>High-HSPF2 Cold-Climate Units Common in Atlantic Canada</h2>
      <p>Several brands widely installed across NS, NB, and PEI hit HSPF2 ratings well above the rebate threshold:</p>
      <ul>
        <li><strong>Mitsubishi Hyper-Heat (MXZ / MSZ series):</strong> HSPF2 10–13 depending on model and capacity</li>
        <li><strong>Fujitsu Halcyon AOU series:</strong> HSPF2 9–12</li>
        <li><strong>Daikin Fit:</strong> HSPF2 8.5–9.5</li>
        <li><strong>Bosch IDS 2.0:</strong> HSPF2 9–11</li>
      </ul>
      <p>
        Note: HSPF2 varies by tonnage within the same product line. Always ask for — and verify — the AHRI certificate for the exact model and capacity you&apos;re being quoted.
      </p>

      <h2>How to Confirm HSPF2 Before Signing Any Quote</h2>
      <ol>
        <li>Ask your installer for the <strong>AHRI certificate number</strong> for the specific model and indoor/outdoor unit combination</li>
        <li>Look up the certificate at <strong>ahridirectory.org</strong> to confirm the HSPF2 rating</li>
        <li>Cross-reference with the <strong>ENS approved equipment list</strong> at efficiencyns.ca to confirm rebate eligibility</li>
        <li>Run our <a href="/tools/rebate-quiz">Rebate Quiz</a> with your province, income level, and equipment spec to see your total potential rebate stack</li>
      </ol>
      <p>
        Every installer in our <a href="/installers">NS installer directory</a> is rated in part on whether they consistently specify qualifying, high-HSPF2 equipment. Check ratings before you request quotes.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        HSPF2 is not a footnote. In Nova Scotia in 2026, it&apos;s the number that sits between you and up to $13,000 in combined ENS and CleanHeat rebates. It also determines what you&apos;ll spend on electricity every winter for the next two decades.
      </p>
      <p>
        Before you sign any installation quote, confirm your unit&apos;s HSPF2 rating on the AHRI directory — not from a brochure, not from the contractor&apos;s word. Then visit our <a href="/rebates">rebates page</a> for current program details, or use the <a href="/tools/rebate-quiz">Rebate Quiz</a> to calculate your specific eligibility.
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
