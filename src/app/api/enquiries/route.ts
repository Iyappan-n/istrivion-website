import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type EnquirySubmission = {
  enquiry_subject: string;
  full_name: string;
  email: string;
  phone: string;
  service_required: string;
  project_details: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(
  body: Record<string, unknown>,
  key: keyof EnquirySubmission,
  maxLength: number,
) {
  const value = body[key];
  if (typeof value !== "string" || value.trim().length > maxLength) {
    return null;
  }
  return value.trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function emailContents(enquiry: EnquirySubmission) {
  const fields: Array<[string, string]> = [
    ["Name", enquiry.full_name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Service", enquiry.service_required],
    ["Subject", enquiry.enquiry_subject || "Not provided"],
    ["Project details", enquiry.project_details],
  ];

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const html = fields
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");

  return { text, html };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Please submit a valid enquiry." },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { error: "Please submit a valid enquiry." },
      { status: 400 },
    );
  }

  const fullName = readText(body, "full_name", 120);
  const email = readText(body, "email", 254);
  const phone = readText(body, "phone", 40);
  const service = readText(body, "service_required", 160);
  const subject = readText(body, "enquiry_subject", 200);
  const projectDetails = readText(body, "project_details", 5000);

  if (
    !fullName ||
    fullName.length < 2 ||
    !email ||
    !emailPattern.test(email) ||
    phone === null ||
    !service ||
    !projectDetails ||
    projectDetails.length < 10 ||
    subject === null
  ) {
    return NextResponse.json(
      { error: "Please check the enquiry details and try again." },
      { status: 400 },
    );
  }

  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!projectUrl || !publishableKey) {
    console.error("Public enquiry submission is not configured", {
      service: "supabase",
    });
    return NextResponse.json(
      { error: "We could not submit your enquiry. Please try again later." },
      { status: 503 },
    );
  }

  const enquiry: EnquirySubmission = {
    enquiry_subject: subject,
    full_name: fullName,
    email,
    phone,
    service_required: service,
    project_details: projectDetails,
  };

  const supabase = createClient(projectUrl, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  try {
    const { error } = await supabase.from("enquiries").insert(enquiry);
    if (error) {
      console.error("Public enquiry database insert failed", {
        code: error.code ?? "unknown",
      });
      return NextResponse.json(
        { error: "We could not submit your enquiry. Please try again later." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Public enquiry database request failed", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { error: "We could not submit your enquiry. Please try again later." },
      { status: 500 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  const recipient = process.env.RESEND_ADMIN_EMAIL;
  if (!apiKey || !sender || !recipient) {
    console.error("Enquiry email notification is not configured", {
      missingApiKey: !apiKey,
      missingSender: !sender,
      missingRecipient: !recipient,
    });
    return NextResponse.json(
      {
        ok: true,
        notificationSent: false,
        message:
          "Your enquiry was received, but email notification is temporarily unavailable.",
      },
      { status: 202 },
    );
  }

  const resend = new Resend(apiKey);
  const contents = emailContents(enquiry);
  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email,
      subject: `New website enquiry: ${service.replace(/[\r\n]/g, " ").slice(0, 160)}`,
      text: contents.text,
      html: contents.html,
    });

    if (error) {
      console.error("Enquiry email notification failed", {
        errorName: error.name || "ResendError",
      });
      return NextResponse.json(
        {
          ok: true,
          notificationSent: false,
          message:
            "Your enquiry was received, but email notification is temporarily unavailable.",
        },
        { status: 202 },
      );
    }
  } catch (error) {
    console.error("Enquiry email notification request failed", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      {
        ok: true,
        notificationSent: false,
        message:
          "Your enquiry was received, but email notification is temporarily unavailable.",
      },
      { status: 202 },
    );
  }

  return NextResponse.json({ ok: true, notificationSent: true });
}
