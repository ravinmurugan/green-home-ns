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
  "hspf2-rating-explained-ns-rebates": (
    <div className="prose prose-gray max-w-none">
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        HSPF2 is the efficiency number printed on every heat pump spec sheet — and since 2023 it&apos;s the number that determines whether your installation qualifies for Nova Scotia rebates. Understanding it takes about five minutes and could save you thousands.
      </p>

      <h2>What HSPF2 Actually Measures</h2>
      <p>HSPF2 stands for Heating Seasonal Performance Factor (second edition). It measures how many BTUs of heat a unit delivers per watt-hour of electricity consumed over a full heating season. A unit rated HSPF2 9.0 delivers roughly 9 BTUs per watt-hour — compared to an electric baseboard&apos;s effective rate of about 3.4 BTUs per watt-hour. That&apos;s why a heat pump can cut your heating bill by 50–65% compared to straight electric resistance heat.</p>
      <p>The higher the HSPF2 number, the more efficient the unit. Cold-climate models from Mitsubishi, Fujitsu, Bosch, and Daikin typically score between 7.5 and 12.5 HSPF2 depending on the model and configuration.</p>

      <h2>Why HSPF2 Is Not the Same as the Old HSPF Rating</h2>
      <p>This is where most homeowner confusion starts. Before 2023, heat pump efficiency was reported as HSPF (now called HSPF1). Natural Resources Canada and the US Department of Energy switched to HSPF2 because the old test protocol overstated real-world efficiency — it used milder temperature assumptions that didn&apos;t reflect Canadian winters.</p>
      <p>The HSPF2 test is stricter, so the numbers are lower for the same equipment — typically 15–20% lower. A unit that was marketed as &quot;HSPF 10&quot; before 2023 will often show HSPF2 8.1–8.5 on its updated NRCan data sheet. <strong>This is not a degradation in performance — it&apos;s a more honest measurement.</strong></p>
      <p>Watch out: some manufacturer brochures and older installer quotes still list only the HSPF1 number. Always ask which standard a quoted number uses.</p>

      <h2>NS Rebate Programs Require HSPF2 7.5 Minimum</h2>
      <p>Both active Nova Scotia incentive programs gate eligibility on the HSPF2 rating:</p>
      <ul>
        <li><strong>Efficiency Nova Scotia (ENS) rebates — up to $3,000:</strong> Unit must be on the NRCan approved product list and meet HSPF2 ≥ 7.5</li>
        <li><strong>CleanHeat rebate — up to $10,000 (income-qualified):</strong> Same HSPF2 threshold applies; income limits determine the exact amount</li>
      </ul>
      <p>Units below 7.5 HSPF2 do not qualify, regardless of brand or installer. Use the <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a> to see what you can stack based on your household income and current heating system.</p>

      <h2>How to Read a Spec Sheet Before You Sign a Quote</h2>
      <p>When your installer provides a quote, request the NRCan product data sheet for the specific model being installed. Check for:</p>
      <ul>
        <li><strong>HSPF2 (not just HSPF):</strong> Must be 7.5 or higher for rebate eligibility</li>
        <li><strong>Rated heating capacity at -15°C:</strong> Confirms the unit can keep up on a cold NS night</li>
        <li><strong>Rated heating capacity at -25°C:</strong> Relevant for inland NB, northern NS, and Newfoundland homeowners</li>
        <li><strong>NRCan listing status:</strong> Only listed products qualify for federal and most provincial rebates</li>
      </ul>
      <p>If a spec sheet only shows &quot;HSPF&quot; without the &quot;2,&quot; ask for the updated figure or search the unit on the NRCan product database yourself.</p>

      <h2>What a Higher HSPF2 Means for Your Annual Energy Cost</h2>
      <p>The efficiency difference between a baseline 7.5 and a premium 10.5 HSPF2 unit is real money over time. For a typical NS home requiring 3,500 kWh of heat pump output annually, at $0.165/kWh (2026 NS Power residential rate):</p>
      <ul>
        <li><strong>HSPF2 7.5 unit:</strong> ~$770/year in electricity for heating</li>
        <li><strong>HSPF2 10.5 unit:</strong> ~$550/year in electricity for heating</li>
      </ul>
      <p>That&apos;s roughly $220/year in savings — and higher-efficiency units often carry larger rebates, compressing the payback period further. That said, the most efficient units (HSPF2 12.0+) carry a meaningful price premium. They make the most sense for homes with high heating loads or those pairing the heat pump with <a href="/solar">solar PV</a> to offset electricity costs.</p>

      <h2>Don&apos;t Confuse HSPF2 With COP or EER</h2>
      <p>You may also see COP (Coefficient of Performance) on spec sheets. COP is a point-in-time efficiency measurement at a specific outdoor temperature — not a seasonal average. An HSPF2 rating of 8.0 corresponds very roughly to a seasonal average COP around 2.35. COP at -15°C is a useful comparison point for cold-climate performance; HSPF2 is what rebate programs care about.</p>

      <h2>Bottom Line</h2>
      <p>HSPF2 7.5 is the rebate floor, not a performance target. Most cold-climate units sold by reputable NS installers today hit 8.5–10.5 HSPF2 — comfortably above the threshold. The more important question to ask your installer is the <strong>rated heating capacity at -15°C</strong>, because a high HSPF2 score doesn&apos;t help if the unit can&apos;t keep pace on the coldest nights.</p>
      <p>Browse <a href="/installers">rated NS installers</a> who specify HSPF2 on every quote, or compare <a href="/heat-pumps">heat pump models</a> side by side before your first installer conversation.</p>
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
