"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type LoginFormProps = {
  initialMessage?: string;
  canSignOut: boolean;
};

function getBrowserSupabaseClient() {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!projectUrl || !publishableKey) {
    throw new Error("Supabase is not configured for admin sign-in.");
  }

  return createBrowserClient(projectUrl, publishableKey);
}

export default function LoginForm({
  initialMessage,
  canSignOut,
}: LoginFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState(initialMessage ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await getBrowserSupabaseClient().auth.signInWithPassword(
        { email, password },
      );
      if (error) {
        setMessage("Sign-in failed. Check your email and password.");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "Admin sign-in failed",
        error instanceof Error ? error.message : "Unexpected sign-in error",
      );
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    setMessage("");
    try {
      const { error } = await getBrowserSupabaseClient().auth.signOut();
      if (error) {
        throw error;
      }
      router.refresh();
      setMessage("You have been signed out.");
    } catch (error) {
      console.error(
        "Admin sign-out failed",
        error instanceof Error ? error.message : "Unexpected sign-out error",
      );
      setMessage("Unable to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#73777D]/15 bg-white p-7 shadow-xl shadow-[#73777D]/[0.08] sm:p-9">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D71920]">
          ISTRIVION Technologies
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#73777D]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#73777D]/80">
          Sign in with your authorized administrator account.
        </p>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="admin-email"
            className="mb-2 block text-sm font-semibold text-[#73777D]"
          >
            Email address
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-[#73777D]/25 bg-white px-4 py-3 text-[#73777D] outline-none focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/15"
          />
        </div>
        <div>
          <label
            htmlFor="admin-password"
            className="mb-2 block text-sm font-semibold text-[#73777D]"
          >
            Password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-[#73777D]/25 bg-white px-4 py-3 text-[#73777D] outline-none focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/15"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isSigningOut}
          aria-busy={isSubmitting}
          className="rounded-full bg-[#D71920] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#AC1018] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {message && (
        <p
          role={message.includes("signed out") ? "status" : "alert"}
          className={`mt-5 text-sm leading-6 ${
            message.includes("signed out") ? "text-[#73777D]" : "text-[#D71920]"
          }`}
        >
          {message}
        </p>
      )}

      {canSignOut && (
        <button
          type="button"
          disabled={isSigningOut || isSubmitting}
          onClick={handleSignOut}
          className="mt-4 text-sm font-semibold text-[#73777D] underline decoration-[#73777D]/40 underline-offset-4 hover:text-[#D71920]"
        >
          {isSigningOut ? "Signing out..." : "Sign out of this account"}
        </button>
      )}
    </div>
  );
}
