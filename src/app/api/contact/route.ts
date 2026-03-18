import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://danielkingmedia.com",
  "https://www.danielkingmedia.com",
  "http://localhost:3000",
];

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field, real users leave it empty
  if (body.website) {
    // Return 200 so bots think it worked
    return NextResponse.json({ success: true });
  }

  const { name, email, message, source, propertyAddress } = body as {
    name?: string;
    email?: string;
    message?: string;
    source?: string;
    propertyAddress?: string;
  };

  if (!name || !email || !message || !source) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message, source" },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const webhookToken = process.env.N8N_WEBHOOK_TOKEN;

  if (!webhookUrl || !webhookToken) {
    console.error("Missing N8N_WEBHOOK_URL or N8N_WEBHOOK_TOKEN env vars");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${webhookToken}`,
      },
      body: JSON.stringify({ name, email, message, source, propertyAddress }),
    });

    if (!res.ok) {
      console.error("n8n webhook error:", res.status, await res.text());
      return NextResponse.json(
        { error: "Failed to process submission" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("n8n webhook fetch error:", err);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 502 },
    );
  }
}
