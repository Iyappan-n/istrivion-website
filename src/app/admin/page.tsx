import { redirect } from "next/navigation";
import { getAdminAuthorization } from "@/lib/admin-auth";
import LoginForm from "./login-form";

type AdminPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const [authorization, params] = await Promise.all([
    getAdminAuthorization(),
    searchParams,
  ]);

  if (authorization.authorized) {
    redirect("/admin/dashboard");
  }

  const isUnauthorized =
    authorization.status === 403 || params.error === "unauthorized";
  const message =
    authorization.status === 503
      ? authorization.message
      : isUnauthorized
        ? "This account is not authorized to access the admin dashboard."
        : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4 py-12">
      <LoginForm
        initialMessage={message}
        canSignOut={authorization.status === 403}
      />
    </main>
  );
}
