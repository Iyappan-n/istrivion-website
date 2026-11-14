import { redirect } from "next/navigation";
import { getAdminAuthorization } from "@/lib/admin-auth";
import type { Enquiry, EnquiryCounts, EnquiryStatus } from "@/lib/enquiries";
import AdminDashboard from "./dashboard";

export const dynamic = "force-dynamic";

const summaryStatuses: EnquiryStatus[] = [
  "new",
  "pending",
  "contacted",
  "completed",
];

function DashboardUnavailable({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4 py-12">
      <section
        role="alert"
        className="max-w-lg rounded-2xl border border-[#D71920]/20 bg-white p-8 shadow-lg"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71920]">
          Admin dashboard
        </p>
        <h1 className="mt-3 text-2xl font-bold text-[#73777D]">
          Dashboard unavailable
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#73777D]">{message}</p>
        <a
          href="/admin"
          className="mt-6 inline-flex rounded-full bg-[#D71920] px-5 py-3 text-sm font-bold text-white hover:bg-[#AC1018]"
        >
          Return to sign in
        </a>
      </section>
    </main>
  );
}

export default async function AdminDashboardPage() {
  const authorization = await getAdminAuthorization();
  if (!authorization.authorized) {
    if (authorization.status === 401) {
      redirect("/admin");
    }
    if (authorization.status === 403) {
      redirect("/admin?error=unauthorized");
    }
    return <DashboardUnavailable message={authorization.message} />;
  }

  const { supabase } = authorization;
  const selectedColumns =
    "id,enquiry_subject,full_name,email,phone,service_required,project_details,status,created_at";

  const [enquiryResult, totalResult, ...statusResults] = await Promise.all([
    supabase
      .from("enquiries")
      .select(selectedColumns)
      .order("created_at", { ascending: false }),
    supabase.from("enquiries").select("id", { count: "exact", head: true }),
    ...summaryStatuses.map((status) =>
      supabase
        .from("enquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", status),
    ),
  ]);

  const failedQuery = [
    enquiryResult.error,
    totalResult.error,
    ...statusResults.map((result) => result.error),
  ].find((error) => error !== null);

  if (failedQuery) {
    console.error("Admin enquiry load failed", failedQuery.message);
    return (
      <DashboardUnavailable message="Enquiries could not be loaded. Check the Supabase session and RLS policies, then try again." />
    );
  }

  const enquiries = (enquiryResult.data ?? []) as Enquiry[];
  const counts: EnquiryCounts = {
    total: totalResult.count ?? 0,
    new: statusResults[0].count ?? 0,
    pending: statusResults[1].count ?? 0,
    contacted: statusResults[2].count ?? 0,
    completed: statusResults[3].count ?? 0,
  };

  return <AdminDashboard initialEnquiries={enquiries} initialCounts={counts} />;
}
