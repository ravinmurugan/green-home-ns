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
        When you start getting heat pump quotes in Nova Scotia, rebate application forms ask for the unit&apos;s &quot;HSPF2 rating.&quot; Most homeowners have never heard the term — and some contractors skip past it without explanation. But this single number can be the difference between qualifying for thousands of dollars in provincial rebates and getting nothing.
      </p>

      <h2>What Is HSPF2?</h2>
      <p>HSPF2 stands for Heating Seasonal Performance Factor, 2nd edition. It measures how efficiently a heat pump converts electricity into heat over an entire heating season — expressed in BTU per watt-hour. A higher number means less electricity consumed per unit of heat delivered.</p>
      <p>The &quot;2&quot; matters. In 2023, the Air Conditioning, Heating, and Refrigeration Institute (AHRI) updated its testing protocol to better reflect real-world conditions, including external ductwork losses. The new protocol produces lower numbers than the old HSPF test, so HSPF and HSPF2 values are <em>not</em> directly comparable.</p>

      <h2>HSPF vs HSPF2 — Why the Numbers Don&apos;t Match</h2>
      <p>An older Mitsubishi unit rated at HSPF 12 might show up as HSPF2 9.5 under the new standard. Same physical unit, different test. This trips up homeowners who look up an older review or spec sheet and see a number that doesn&apos;t match the current rebate form.</p>
      <p>Rule of thumb: HSPF2 is roughly 15–25% lower than the equivalent HSPF rating for the same unit.</p>
      <ul>
        <li>Old HSPF 10 → approximately HSPF2 8.0–8.5</li>
        <li>Old HSPF 12 → approximately HSPF2 9.5–10.0</li>
      </ul>
      <p>Always ask for the HSPF2 figure specifically, and cross-check it in the AHRI directory rather than trusting a sales brochure.</p>

      <h2>What HSPF2 Do You Need for NS Rebates?</h2>
      <p><a href="/rebates">Efficiency Nova Scotia rebate programs</a> require a minimum HSPF2 of 7.5 for most heat pump rebates, including the standard cold-climate unit rebate. Income-qualified programs (up to $10,000 through CleanHeat) maintain the same 7.5 floor but add additional eligibility criteria.</p>
      <p>The practical risk isn&apos;t the threshold itself — most modern cold-climate mini-splits exceed 7.5 comfortably. The risks are:</p>
      <ul>
        <li>Buying a low-cost standard unit (not cold-climate rated) that comes in at HSPF2 6.5–7.2</li>
        <li>Using a non-ENS-certified installer who can&apos;t submit rebate paperwork on your behalf</li>
        <li>Relying on old HSPF specs that appear to qualify but don&apos;t convert correctly under HSPF2</li>
      </ul>

      <h2>How to Read a Spec Sheet</h2>
      <p>When you receive a quote, ask for the AHRI certificate number. Look it up at ahridirectory.org and find the column labelled <strong>HSPF2 Region IV</strong> — Nova Scotia, New Brunswick, PEI, and Ontario all fall under AHRI Region IV (the coldest test zone). That is the number that appears on your rebate application.</p>
      <p>Spec sheets sometimes list multiple region values. Always use Region IV for Atlantic Canada — it&apos;s the most conservative and the one rebate administrators verify.</p>

      <h2>Models That Consistently Qualify (2026)</h2>
      <p>Several cold-climate units regularly appear on approved lists for NS and Atlantic Canada programs:</p>
      <ul>
        <li><strong>Mitsubishi Hyper-Heat (H2i) series</strong> — HSPF2 typically 9.5–10.5 depending on capacity</li>
        <li><strong>Fujitsu Halcyon XLTH series</strong> — HSPF2 typically 9.0–10.0</li>
        <li><strong>Daikin Aurora / Fit series</strong> — HSPF2 typically 8.5–9.5</li>
        <li><strong>LG LGRED° series</strong> — HSPF2 typically 8.5–9.5</li>
      </ul>
      <p>These are approximate ranges — ratings vary between the 9,000 BTU and 24,000 BTU versions of the same product line. Always verify the specific model and capacity in the AHRI directory before signing a contract.</p>

      <h2>The Bottom Line</h2>
      <p>HSPF2 is a gating criterion, not a complete quality measure. A unit that meets the 7.5 minimum qualifies for rebates — but if you&apos;re heating a home in Atlantic Canada, aim for HSPF2 9.0 or higher to maximize efficiency through a genuine Maritime winter.</p>
      <p>Use our <a href="/tools/rebate-quiz">Rebate Eligibility Quiz</a> to confirm which programs your chosen unit qualifies for, browse our <a href="/heat-pumps">heat pump model database</a> for verified HSPF2 ratings, and check our <a href="/installers">installer ratings</a> to find ENS-certified contractors who handle rebate paperwork correctly.</p>
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
