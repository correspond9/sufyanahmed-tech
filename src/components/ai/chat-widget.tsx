"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi — I'm Sufyan's site assistant. Ask about projects, services, or how he builds products.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        reply?: string;
        code?: string;
        error?: string;
      };

      if (res.status === 503 && data.code === "NOT_CONFIGURED") {
        setNotConfigured(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "The AI assistant is not active yet. Please use the contact page or email hello@sufyanahmed.tech.",
          },
        ]);
        return;
      }

      if (!res.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error ?? "Sorry, I could not respond right now.",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply! },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {open && (
        <GlassPanel className="mb-3 flex h-[min(70vh,480px)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <p className="text-[13px] font-semibold text-white">AI Assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[90%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary/20 ml-auto text-white"
                    : "bg-white/[0.04] text-white/70",
                )}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="inline-flex items-center gap-2 text-[12px] text-white/40">
                <Loader2 className="size-3 animate-spin" />
                Thinking…
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-white/[0.06] p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  notConfigured ? "Assistant unavailable" : "Ask a question…"
                }
                disabled={loading || notConfigured}
                className="focus:border-primary/40 min-w-0 flex-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[13px] text-white outline-none"
                aria-label="Chat message"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || notConfigured}
                aria-label="Send"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </GlassPanel>
      )}
      <Button
        type="button"
        variant="premium"
        size="icon"
        className="size-12 rounded-full shadow-lg"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        <MessageCircle className="size-5" />
      </Button>
    </div>
  );
}
