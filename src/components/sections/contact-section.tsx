"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import { contactContent } from "@/constants/content";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";
import { SectionHeader, Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Twitter", href: siteConfig.links.twitter, icon: Twitter },
] as const;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${siteConfig.author.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <Section id={contactContent.id} spacing="lg" className="relative">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <SectionHeader
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        description={contactContent.description}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="space-y-6">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="glass-card group hover:border-primary/25 flex items-center gap-4 rounded-xl p-5 transition-colors"
            >
              <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Email
                </p>
                <p className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                  {siteConfig.author.email}
                </p>
              </div>
            </a>

            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "glass-card flex size-11 items-center justify-center rounded-lg",
                    "text-muted-foreground transition-all duration-300",
                    "hover:border-primary/25 hover:text-primary hover:shadow-glow",
                  )}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="glass-card space-y-5 rounded-2xl p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-foreground text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-foreground text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-foreground text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full sm:w-auto"
            >
              {submitted ? "Opening email client..." : contactContent.cta}
              <Send className="size-4" />
            </Button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
