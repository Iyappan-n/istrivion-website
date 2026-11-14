"use client";

import { useRef, useState, type FormEvent } from "react";

type ContactFormProps = {
  selectedService: string;
  subject: string;
  services: string[];
};

const fieldClassName =
  "w-full rounded-lg border border-[#A7A9AC]/60 bg-white px-4 py-3 text-[#73777D] outline-none transition placeholder:text-[#A7A9AC] focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/15";

function getErrorDiagnostics(
  error: unknown,
  submittedValues: string[],
) {
  const record =
    error && typeof error === "object"
      ? (error as Record<string, unknown>)
      : {};
  const rawMessage =
    typeof record.message === "string"
      ? record.message
      : error instanceof Error
        ? error.message
        : String(error);

  const sanitize = (value: unknown) => {
    if (typeof value !== "string") {
      return null;
    }

    let safeValue = value;
    for (const submittedValue of submittedValues) {
      if (submittedValue.length > 0) {
        const escapedValue = submittedValue.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        safeValue = safeValue.replace(
          new RegExp(escapedValue, "gi"),
          "[redacted]",
        );
      }
    }

    return safeValue
      .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[redacted email]")
      .replace(/\b(sb_(?:publishable|secret)_[A-Za-z0-9_-]+)\b/g, "[redacted key]")
      .replace(
        /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
        "[redacted token]",
      )
      .replace(/\bBearer\s+\S+/gi, "Bearer [redacted]");
  };

  const code = typeof record.code === "string" ? record.code : null;
  const details = sanitize(record.details);
  const hint = sanitize(record.hint);
  const message = sanitize(rawMessage) ?? "An unexpected error occurred.";
  const category = /not configured|missing.*(?:url|key)|invalid.*url/i.test(
    rawMessage,
  )
    ? "configuration"
    : error instanceof TypeError ||
        /failed to fetch|network error|load failed/i.test(rawMessage)
      ? "network"
      : code || details || hint
        ? "database"
        : "unknown";

  return { category, message, code, details, hint };
}

export default function ContactForm({
  selectedService,
  subject,
  services,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const submissionInProgress = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const enquirySubject = String(formData.get("subject") ?? "").trim();
    const details = String(formData.get("message") ?? "").trim();

    if (name.length < 2) {
      setValidationError("Please enter your full name.");
      form.querySelector<HTMLInputElement>("#name")?.focus();
      return;
    }

    if (!email || !form.querySelector<HTMLInputElement>("#email")?.validity.valid) {
      setValidationError("Please enter a valid email address.");
      form.querySelector<HTMLInputElement>("#email")?.focus();
      return;
    }

    if (!service) {
      setValidationError("Please select a service.");
      form.querySelector<HTMLSelectElement>("#service")?.focus();
      return;
    }

    if (details.length < 10) {
      setValidationError("Please provide at least 10 characters of project details.");
      form.querySelector<HTMLTextAreaElement>("#message")?.focus();
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setValidationError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry_subject: enquirySubject,
          full_name: name,
          email,
          phone,
          service_required: service,
          project_details: details,
        }),
      });
      const result: unknown = await response.json();

      if (!response.ok) {
        throw new Error(
          result &&
            typeof result === "object" &&
            "error" in result &&
            typeof result.error === "string"
            ? result.error
            : "We could not submit your enquiry. Please try again later.",
        );
      }

      const notificationSent =
        result &&
        typeof result === "object" &&
        "notificationSent" in result &&
        result.notificationSent === true;
      setSuccessMessage(
        notificationSent
          ? "Thank you. Your enquiry has been submitted successfully."
          : "Thank you. Your enquiry was received, but email notification is temporarily unavailable.",
      );
      form.reset();
    } catch (error) {
      const diagnostics = getErrorDiagnostics(error, [
        name,
        email,
        phone,
        service,
        enquirySubject,
        details,
      ]);
      console.error(
        "Enquiry submission failed",
        JSON.stringify(diagnostics),
      );

      if (process.env.NODE_ENV === "development") {
        if (diagnostics.category === "network") {
          setValidationError(
            "Development diagnostic: the browser could not reach Supabase. Verify the Project URL and check that the project is active and DNS/network access is available.",
          );
        } else if (diagnostics.category === "configuration") {
          setValidationError(
            "Development diagnostic: Supabase configuration is missing or invalid. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
          );
        } else if (diagnostics.category === "database") {
          const code = diagnostics.code ? ` (${diagnostics.code})` : "";
          const databaseMessage = [diagnostics.message, diagnostics.details]
            .filter(Boolean)
            .join(" ");
          setValidationError(
            `Development diagnostic: Supabase returned a database/API error${code}. ${databaseMessage}`,
          );
        } else {
          setValidationError(
            `Development diagnostic: enquiry submission failed. ${diagnostics.message}`,
          );
        }
      } else {
        setValidationError(
          "We could not submit your enquiry. Please try again later.",
        );
      }
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  function clearMessages() {
    setSuccessMessage("");
    setValidationError("");
  }

  return (
    <form className="mt-8 grid gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
      <div className="sm:col-span-2">
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-semibold text-[#73777D]"
        >
          Enquiry Subject <span className="font-normal text-[#A7A9AC]">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          defaultValue={subject}
          onChange={clearMessages}
          className={fieldClassName}
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-[#73777D]"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          required
          onChange={clearMessages}
          className={fieldClassName}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#73777D]"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          onChange={clearMessages}
          className={fieldClassName}
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-semibold text-[#73777D]"
        >
          Phone Number{" "}
          <span className="font-normal text-[#A7A9AC]">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          pattern="[+]?[0-9 ()-]{7,20}"
          title="Enter a phone number with at least 7 digits."
          onChange={clearMessages}
          className={fieldClassName}
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="mb-2 block text-sm font-semibold text-[#73777D]"
        >
          Service Required
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue={selectedService}
          onChange={clearMessages}
          className={fieldClassName}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-[#73777D]"
        >
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          minLength={10}
          required
          onChange={clearMessages}
          placeholder="Tell us a little about your goals, requirements or timeline."
          className={`${fieldClassName} resize-y`}
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="min-h-11 rounded-full bg-[#D71920] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#AC1018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-4 sm:px-8 sm:py-4"
        >
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </button>
        {validationError && (
          <p className="mt-4 text-sm leading-6 text-[#D71920]" role="alert">
            {validationError}
          </p>
        )}
        {successMessage && (
          <p
            className="mt-4 text-sm leading-6 text-[#73777D]"
            role="status"
            aria-live="polite"
          >
            {successMessage}
          </p>
        )}
      </div>
    </form>
  );
}
