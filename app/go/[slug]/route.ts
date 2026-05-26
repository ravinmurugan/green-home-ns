import { NextRequest, NextResponse } from "next/server";
import { getInstallerBySlug } from "@/data/installers/index";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const installer = getInstallerBySlug(slug);

  if (!installer) {
    return NextResponse.redirect(new URL("/installers", request.url));
  }

  console.log(
    JSON.stringify({
      event: "outbound_click",
      slug,
      installer: installer.name,
      timestamp: new Date().toISOString(),
      referrer: request.headers.get("referer") ?? "",
      userAgent: request.headers.get("user-agent") ?? "",
      ip: request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "",
    })
  );

  return NextResponse.redirect(installer.website, { status: 302 });
}
