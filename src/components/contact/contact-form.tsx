"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { contactFormContent, contactContent } from "@/constants/content";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error" | "not-configured";

const inputClassName = cn(
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3",
  "text-[14px] text-white placeholder:text-white/30",
  "outline-none transition-colors",
  "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
);

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        code?: string;
      };

      if (response.status === 503 && data.code === "NOT_CONFIGURED") {
        setStatus("not-configured");
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? contactFormContent.error);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(contactFormContent.error);
    }
  }

  if (status === "success") {
    return (
      <GlassPanel className="p-8 text-center">
        <p className="text-[15px] leading-relaxed text-emerald-400/90">
          {contactFormContent.success}
        </p>
        <Button
          type="button"
          variant="premium-outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="p-6 sm:p-8">
      <h2 className="font-display mb-2 text-xl font-semibold text-white">
        {contactFormContent.title}
      </h2>
      <p className="mb-6 text-[13px] text-white/50">
        {contactFormContent.description}
      </p>

      {status === "not-configured" && (
        <div
          className="mb-6 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-[13px] text-amber-200/90"
          role="alert"
        >
          {contactFormContent.notConfigured}{" "}
          <a
            href={`mailto:${contactContent.email}`}
            className="text-primary underline-offset-2 hover:underline"
          >
            {contactContent.email}
          </a>
        </div>
      )}

      {status === "error" && errorMessage && (
        <div
          className="mb-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-[13px] text-red-200/90"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[12px] font-medium text-white/60"
            >
              {contactFormContent.fields.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={inputClassName}
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[12px] font-medium text-white/60"
            >
              {contactFormContent.fields.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClassName}
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-[12px] font-medium text-white/60"
          >
            {contactFormContent.fields.subject}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className={inputClassName}
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[12px] font-medium text-white/60"
          >
            {contactFormContent.fields.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={cn(inputClassName, "min-h-[120px] resize-y")}
            disabled={status === "loading"}
          />
        </div>

        {/* Honeypot — hidden from users, catches bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] opacity-0"
          aria-hidden
        />

        <Button
          type="submit"
          variant="premium"
          size="lg"
          disabled={status === "loading"}
          className="w-full sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" />
              {contactFormContent.submit}
            </>
          )}
        </Button>
      </form>
    </GlassPanel>
  );
}
