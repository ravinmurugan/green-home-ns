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
        If you&apos;ve been comparing heat pump quotes lately, you&apos;ve almost certainly seen &quot;HSPF2&quot; on spec sheets. It&apos;s the number that describes a heat pump&apos;s seasonal heating efficiency — and in Nova Scotia, it&apos;s now the gating criterion for provincial and federal rebates. Understanding it takes five minutes and can protect thousands of dollars in incentives.
      </p>

      <h2>HSPF vs HSPF2 — What Changed in 2023</h2>
      <p>Until 2023, heat pump efficiency was measured using HSPF (Heating Seasonal Performance Factor). The problem: HSPF was based on test conditions that didn&apos;t reflect real-world Atlantic winters. In 2023, the industry switched to HSPF2, which uses lower outdoor test temperatures, updated duct leakage assumptions, and a revised calculation methodology that better mirrors actual heating-season performance.</p>
      <p>The practical result: HSPF2 numbers are roughly 15–25% lower than old HSPF numbers <em>for the same unit</em>. A unit previously rated HSPF 10 will now show approximately HSPF2 7.5–8.5. The unit hasn&apos;t gotten less efficient — the measurement is simply more honest.</p>
      <p><strong>Why this matters:</strong> If a contractor hands you a spec sheet showing only an HSPF number (not HSPF2), ask for the current rating. Comparing old HSPF figures against HSPF2 rebate thresholds will mislead you about eligibility.</p>

      <h2>What HSPF2 Numbers Actually Mean</h2>
      <p>HSPF2 is the ratio of seasonal heating output (BTUs) to electrical energy input (watt-hours). In plain terms, an HSPF2 of 7.5 means you get 7.5 units of heat for every 1 unit of electricity consumed. Compare this to electric baseboard heat, which has an effective ratio of about 3.4 — it cannot exceed a 1:1 energy conversion. Even a mid-range heat pump is roughly twice as efficient as a baseboard. Top-tier units with HSPF2 of 10+ are three times more efficient, which translates directly into lower monthly electricity bills.</p>

      <h2>Minimum HSPF2 Thresholds for NS Rebates</h2>
      <p>This is where it gets practical. Both Efficiency Nova Scotia and the CleanHeat rebate program enforce minimum HSPF2 thresholds:</p>
      <ul>
        <li><strong>Efficiency NS cold-climate rebate (up to $3,000):</strong> HSPF2 ≥ 7.5 required</li>
        <li><strong>CleanHeat program (up to $10,000 for income-qualified households):</strong> HSPF2 ≥ 7.5 at rated conditions</li>
        <li><strong>Canada Greener Homes Loan</strong> (0% interest, still active as of 2026): HSPF2 ≥ 7.1 for most heat pump types</li>
      </ul>
      <p>Note: the federal Greener Homes <em>Grant</em> closed February 12, 2024 and is no longer accepting applications. The loan program remained active — check Natural Resources Canada for current status.</p>
      <p>The combined maximum provincial rebate in NS is up to approximately <strong>$13,000</strong> (Efficiency NS $3K + CleanHeat up to $10K for income-qualified households). That&apos;s real money — and you lose it entirely if the installed unit doesn&apos;t hit the HSPF2 threshold. Use the <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a> to see exactly what you qualify for.</p>

      <h2>How Cold-Climate Rating and HSPF2 Work Together</h2>
      <p>HSPF2 is a seasonal average, but Atlantic Canadian winters also demand performance at extreme cold. Look for two specs side by side on every quote:</p>
      <ul>
        <li><strong>HSPF2</strong> — seasonal efficiency (determines rebate eligibility)</li>
        <li><strong>Rated heating capacity at -15°C and -25°C</strong> — how much heat the unit delivers during the coldest stretches</li>
      </ul>
      <p>Well-regarded cold-climate models typically achieve HSPF2 ratings of 9–13 while maintaining meaningful output at -25°C. Budget units may technically pass the 7.5 threshold but lose significant capacity at -20°C. For NS, NB, and especially NL, verify both numbers before signing a contract. Browse our <a href="/heat-pumps">heat pump ratings</a> to compare models side by side.</p>

      <h2>How to Check HSPF2 Before You Buy</h2>
      <p>Three reliable ways to verify a unit&apos;s HSPF2 rating:</p>
      <ul>
        <li><strong>AHRI Directory</strong> (ahridirectory.org): The official certification database. Search by model number to confirm the certified HSPF2 rating directly from the manufacturer&apos;s submission.</li>
        <li><strong>NRCan Product List:</strong> Natural Resources Canada&apos;s qualifying products list for Greener Homes programs.</li>
        <li><strong>Efficiency NS Approved Equipment List:</strong> Published at efficiencyns.ca, this is the fastest way to confirm rebate eligibility for a specific NS installation.</li>
      </ul>
      <p>If your installer cannot produce a spec sheet showing HSPF2 ≥ 7.5 for the unit they&apos;re quoting, your rebate eligibility is at risk. Every installer in our <a href="/installers">NS and Atlantic Canada directory</a> uses certified cold-climate equipment — but asking for the exact model number before signing is always worth doing.</p>

      <h2>Quick Reference: HSPF2 and NS Rebate Eligibility</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 border border-gray-200 font-semibold">HSPF2 Rating</th>
              <th className="text-left p-3 border border-gray-200 font-semibold">What It Means for NS Rebates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-200">Below 7.1</td>
              <td className="p-3 border border-gray-200">Does not qualify for any NS or federal rebates</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 border border-gray-200">7.1 – 7.4</td>
              <td className="p-3 border border-gray-200">Greener Homes Loan only (grant closed Feb 2024)</td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-200">7.5 – 8.9</td>
              <td className="p-3 border border-gray-200">Qualifies for Efficiency NS + CleanHeat provincial rebates</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 border border-gray-200">9.0 and above</td>
              <td className="p-3 border border-gray-200">Premium efficiency; highest-tier rebate tiers where applicable</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Ready to find out what rebates apply to your specific situation? Try the <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a>, compare <a href="/installers">rated heat pump installers near you</a>, or read our guide to <a href="/rebates">all current NS and Atlantic Canada rebate programs</a>.</p>
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
