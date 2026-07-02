import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildKnowledgeBase } from "@/lib/content/knowledge";
import { siteConfig } from "@/config/site";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatPayload {
  messages?: ChatMessage[];
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        error: "AI assistant is not configured.",
      },
      { status: 503 },
    );
  }

  let body: ChatPayload;
  try {
    body = (await request.json()) as ChatPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const messages = body.messages ?? [];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Message is required." },
      { status: 400 },
    );
  }

  if (lastUser.content.length > 2000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long." },
      { status: 400 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const history = messages
      .slice(0, -1)
      .filter((m) => m.content.trim())
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({
      history,
      systemInstruction: `You are the AI assistant for ${siteConfig.author.name}'s website (${siteConfig.url}).
Answer questions about Sufyan's work, projects, services, and blog using ONLY the knowledge below.
Be professional, concise, and helpful. If asked something outside this knowledge, say you don't know and suggest emailing ${siteConfig.author.email}.

KNOWLEDGE BASE:
${buildKnowledgeBase()}`,
    });

    const result = await chat.sendMessage(lastUser.content.trim());
    const reply = result.response.text();

    return NextResponse.json({ ok: true, reply });
  } catch {
    return NextResponse.json(
      { ok: false, error: "AI assistant is temporarily unavailable." },
      { status: 502 },
    );
  }
}
