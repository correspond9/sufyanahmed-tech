import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { LegalDocument } from "@/components/legal/legal-document";
import { siteConfig } from "@/config/site";
import { legalContent } from "@/constants/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for SufyanAhmed.Tech.",
  alternates: { canonical: `${siteConfig.url}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const { terms } = legalContent;
  return (
    <>
      <PageHeader label="Legal" title={terms.title} showBack />
      <LegalDocument updated={terms.updated} sections={terms.sections} />
    </>
  );
}
