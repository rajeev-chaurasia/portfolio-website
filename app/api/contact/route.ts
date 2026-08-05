import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { contactSchema } from '@/lib/contact-schema';

// In-memory sliding-window rate limit. Best-effort and per-instance on
// serverless — acceptable for a portfolio contact form.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_MAX_KEYS = 500;

const rateLimitMap = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (rateLimitMap.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitMap.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(key, recent);

  while (rateLimitMap.size > RATE_LIMIT_MAX_KEYS) {
    const oldestKey = rateLimitMap.keys().next().value;
    if (oldestKey === undefined) break;
    rateLimitMap.delete(oldestKey);
  }

  return false;
}

// Lazy singleton so warm instances reuse the SMTP connection and builds
// don't require SMTP env vars.
let transporter: Transporter | undefined;

function getTransporter(): Transporter {
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Bot trap: the hidden "website" field is never filled by real users.
  // Pretend success without sending anything.
  const website = (body as { website?: unknown } | null)?.website;
  if (typeof website === 'string' && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const ip =
    (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() ||
    'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    );
  }
  const { name, email, message } = parsed.data;

  try {
    await getTransporter().sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
