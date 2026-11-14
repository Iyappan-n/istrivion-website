import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type AdminAuthorization =
  | {
      authorized: true;
      supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
      user: User;
    }
  | {
      authorized: false;
      status: 401 | 403 | 503;
      message: string;
    };

export async function getAdminAuthorization(): Promise<AdminAuthorization> {
  const adminUid = process.env.SUPABASE_ADMIN_UID?.trim();
  if (!adminUid || !uuidPattern.test(adminUid)) {
    return {
      authorized: false,
      status: 503,
      message: "Admin access is not configured. Set SUPABASE_ADMIN_UID on the server.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    const isUnauthenticated =
      error.status === 401 || error.name === "AuthSessionMissingError";
    if (!isUnauthenticated) {
      console.error("Admin identity verification failed", error.message);
      return {
        authorized: false,
        status: 503,
        message: "Unable to verify your sign-in. Please try again.",
      };
    }
    return {
      authorized: false,
      status: 401,
      message: "Please sign in to continue.",
    };
  }

  if (!data.user) {
    return {
      authorized: false,
      status: 401,
      message: "Please sign in to continue.",
    };
  }

  if (data.user.id !== adminUid) {
    return {
      authorized: false,
      status: 403,
      message: "This account is not authorized to access the admin dashboard.",
    };
  }

  return { authorized: true, supabase, user: data.user };
}
