import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — GreenHomeNS",
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 prose prose-sm">
      <h1>Affiliate Disclosure</h1>
      <p>
        GreenHomeNS.com is an independent directory and information resource for Nova Scotia homeowners researching heat pump and solar installations. We are not affiliated with Efficiency Nova Scotia, NS Power, the Government of Canada, or any specific installer.
      </p>
      <h2>How We Make Money</h2>
      <p>
        GreenHomeNS may earn a referral fee when homeowners submit a quote request and are connected with a participating installer. This fee is paid by the installer, not the homeowner. Quote requests are always free for homeowners.
      </p>
      <p>
        We may also display advertising and participate in affiliate programs. Any affiliate links are identified as such.
      </p>
      <h2>Our Editorial Independence</h2>
      <p>
        GreenHomeNS Scores and installer rankings are determined independently based on our rating methodology. Installers cannot pay to improve their score. Featured placement may be sponsored, and will be clearly labelled as &ldquo;Sponsored&rdquo; when applicable.
      </p>
      <h2>Accuracy of Information</h2>
      <p>
        Rebate amounts, eligibility criteria, and program details are updated regularly but may not reflect the most current program changes. Always verify directly with Efficiency Nova Scotia, Natural Resources Canada, or NS Power before making decisions based on rebate information.
      </p>
      <p>Last updated: May 2025</p>
    </main>
  );
}
