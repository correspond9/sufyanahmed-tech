import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { contactContent } from "@/constants/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sufyan Ahmed Ansari for product development, FinTech projects, consulting, and partnerships.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact | ${siteConfig.shortName}`,
    description:
      "Start a conversation about your project, product, or opportunity.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's Build Something Great"
        description={contactContent.description}
      />
      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            <Reveal>
              <GlassPanel className="h-fit p-6 sm:p-8">
                <h2 className="font-display mb-4 text-lg font-semibold text-white">
                  Direct Contact
                </h2>
                <a
                  href={`mailto:${contactContent.email}`}
                  className="text-primary hover:text-primary/80 mb-6 inline-flex items-center gap-2 text-[14px] font-medium transition-colors"
                >
                  <Mail className="size-4" />
                  {contactContent.email}
                </a>
                <p className="mb-4 text-[13px] text-white/45">
                  I typically respond within 1–2 business days.
                </p>
                <h3 className="mb-3 text-[12px] font-semibold tracking-wide text-white/60 uppercase">
                  Common Topics
                </h3>
                <ul className="space-y-2">
                  {contactContent.topics.map((topic) => (
                    <li
                      key={topic}
                      className="before:bg-primary/70 flex items-center gap-2 text-[13px] text-white/50 before:size-1.5 before:rounded-full before:content-['']"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/[0.06] pt-6">
                  <p className="text-[12px] text-white/35">
                    Prefer email?{" "}
                    <Link
                      href={`mailto:${contactContent.email}`}
                      className="text-primary/80 hover:text-primary underline-offset-2 hover:underline"
                    >
                      Send directly
                    </Link>
                  </p>
                </div>
              </GlassPanel>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
