import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { LegalDocument } from "@/components/legal/legal-document";
import { siteConfig } from "@/config/site";
import { legalContent } from "@/constants/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for SufyanAhmed.Tech — how we handle your information.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const { privacy } = legalContent;
  return (
    <>
      <PageHeader label="Legal" title={privacy.title} showBack />
      <LegalDocument updated={privacy.updated} sections={privacy.sections} />
    </>
  );
}
