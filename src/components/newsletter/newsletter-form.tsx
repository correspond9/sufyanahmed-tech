"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const inputClassName = cn(
  "min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5",
  "text-[13px] text-white placeholder:text-white/30 outline-none",
  "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
);

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          website: formData.get("website"),
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        code?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(
          data.code === "NOT_CONFIGURED"
            ? "Newsletter is not configured yet. Email hello@sufyanahmed.tech to subscribe."
            : (data.error ?? "Could not subscribe."),
        );
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-[12px] font-semibold tracking-wide text-white/50 uppercase">
        Newsletter
      </p>
      <p className="mb-3 text-[12px] text-white/40">
        Occasional notes on product building and engineering.
      </p>
      {status === "success" ? (
        <p className="text-[13px] text-emerald-400/90">
          You&apos;re on the list. Thank you!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className={inputClassName}
            disabled={status === "loading"}
            aria-label="Email for newsletter"
          />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            className="hidden"
            aria-hidden
          />
          <Button
            type="submit"
            variant="premium-outline"
            disabled={status === "loading"}
            className="shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Mail className="size-4" />
                Subscribe
              </>
            )}
          </Button>
        </form>
      )}
      {status === "error" && error && (
        <p className="mt-2 text-[12px] text-red-300/90" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
