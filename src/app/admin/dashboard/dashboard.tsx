"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  enquiryStatuses,
  isEnquiryStatus,
  type Enquiry,
  type EnquiryCounts,
  type EnquiryStatus,
} from "@/lib/enquiries";

type AdminDashboardProps = {
  initialEnquiries: Enquiry[];
  initialCounts: EnquiryCounts;
};

const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  pending: "Pending",
  contacted: "Contacted",
  completed: "Completed",
};

const statusStyles: Record<EnquiryStatus, string> = {
  new: "bg-[#D71920]/10 text-[#D71920]",
  pending: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
};

function getBrowserSupabaseClient() {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!projectUrl || !publishableKey) {
    throw new Error("Supabase is not configured for admin sign-out.");
  }
  return createBrowserClient(projectUrl, publishableKey);
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

function statusCountsAfterChange(
  counts: EnquiryCounts,
  previous: string | null,
  next: EnquiryStatus,
): EnquiryCounts {
  if (previous === next) {
    return counts;
  }

  const updated = { ...counts };
  if (isEnquiryStatus(previous)) {
    updated[previous] = Math.max(0, updated[previous] - 1);
  }
  updated[next] += 1;
  return updated;
}

function statusCountsAfterDelete(
  counts: EnquiryCounts,
  status: string | null,
): EnquiryCounts {
  const updated = { ...counts, total: Math.max(0, counts.total - 1) };
  if (isEnquiryStatus(status)) {
    updated[status] = Math.max(0, updated[status] - 1);
  }
  return updated;
}

function errorMessageFromPayload(payload: unknown, fallback: string) {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }
  return fallback;
}

export default function AdminDashboard({
  initialEnquiries,
  initialCounts,
}: AdminDashboardProps) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [counts, setCounts] = useState(initialCounts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus>("new");
  const [busyAction, setBusyAction] = useState<"save" | "delete" | "logout" | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return enquiries.filter((enquiry) => {
      const matchesStatus =
        statusFilter === "all" || enquiry.status === statusFilter;
      const searchableText = [
        enquiry.full_name,
        enquiry.email,
        enquiry.phone,
        enquiry.service_required,
        enquiry.enquiry_subject,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();
      return matchesStatus && (!query || searchableText.includes(query));
    });
  }, [enquiries, search, statusFilter]);

  function openDetails(enquiry: Enquiry) {
    setSelectedEnquiry(enquiry);
    setSelectedStatus(
      isEnquiryStatus(enquiry.status) ? enquiry.status : "new",
    );
    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleStatusSave() {
    if (!selectedEnquiry) {
      return;
    }

    setBusyAction("save");
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: selectedStatus,
        }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(
          errorMessageFromPayload(payload, "The status could not be updated."),
        );
      }

      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === selectedEnquiry.id
            ? { ...enquiry, status: selectedStatus }
            : enquiry,
        ),
      );
      setCounts((current) =>
        statusCountsAfterChange(
          current,
          selectedEnquiry.status,
          selectedStatus,
        ),
      );
      setSelectedEnquiry({ ...selectedEnquiry, status: selectedStatus });
      setSuccessMessage("Enquiry status updated.");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The status could not be updated. Please try again.",
      );
    } finally {
      setBusyAction(null);
    }
  }

  async function handleDelete() {
    if (!selectedEnquiry) {
      return;
    }
    const confirmed = window.confirm(
      `Delete the enquiry from ${selectedEnquiry.full_name || "this customer"}? This cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }

    setBusyAction("delete");
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedEnquiry.id }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(
          errorMessageFromPayload(payload, "The enquiry could not be deleted."),
        );
      }

      setEnquiries((current) =>
        current.filter((enquiry) => enquiry.id !== selectedEnquiry.id),
      );
      setCounts((current) =>
        statusCountsAfterDelete(current, selectedEnquiry.status),
      );
      setSelectedEnquiry(null);
      setSuccessMessage("Enquiry deleted.");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The enquiry could not be deleted. Please try again.",
      );
    } finally {
      setBusyAction(null);
    }
  }

  async function handleLogout() {
    setBusyAction("logout");
    setErrorMessage("");
    try {
      const { error } = await getBrowserSupabaseClient().auth.signOut();
      if (error) {
        throw error;
      }
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error(
        "Admin sign-out failed",
        error instanceof Error ? error.message : "Unexpected sign-out error",
      );
      setErrorMessage("Unable to sign out. Please try again.");
      setBusyAction(null);
    }
  }

  const summaryCards = [
    { label: "Total enquiries", value: counts.total },
    { label: "New", value: counts.new },
    { label: "Pending", value: counts.pending },
    { label: "Contacted", value: counts.contacted },
    { label: "Completed", value: counts.completed },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-4 py-8 text-[#73777D] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-[#73777D]/15 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D71920]">
              ISTRIVION Technologies
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#73777D]">
              Enquiry dashboard
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={busyAction !== null}
            className="w-fit rounded-full border border-[#73777D]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#73777D] transition hover:border-[#D71920] hover:text-[#D71920] disabled:opacity-60"
          >
            {busyAction === "logout" ? "Signing out..." : "Log out"}
          </button>
        </header>

        <section
          aria-label="Enquiry summary"
          className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {summaryCards.map((card, index) => (
            <article
              key={card.label}
              className="rounded-xl border border-[#73777D]/10 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-[#73777D]/80">
                {card.label}
              </p>
              <p
                className={`mt-3 text-3xl font-bold ${
                  index === 1 ? "text-[#D71920]" : "text-[#73777D]"
                }`}
              >
                {card.value}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 overflow-hidden rounded-xl border border-[#73777D]/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#73777D]/10 p-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#73777D]">Enquiries</h2>
              <p className="mt-1 text-sm text-[#73777D]/75">
                {filteredEnquiries.length} shown
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[minmax(14rem,1fr)_12rem]">
              <label className="sr-only" htmlFor="enquiry-search">
                Search enquiries
              </label>
              <input
                id="enquiry-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, phone or service"
                className="min-w-0 rounded-lg border border-[#73777D]/25 px-4 py-2.5 text-sm outline-none placeholder:text-[#73777D]/55 focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/10"
              />
              <label className="sr-only" htmlFor="enquiry-status-filter">
                Filter by status
              </label>
              <select
                id="enquiry-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-[#73777D]/25 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/10"
              >
                <option value="all">All statuses</option>
                {enquiryStatuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {successMessage && (
            <p
              role="status"
              className="border-b border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-800"
            >
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p
              role="alert"
              className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-[#D71920]"
            >
              {errorMessage}
            </p>
          )}

          {filteredEnquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-[#73777D]">
                {enquiries.length === 0 ? "No enquiries yet" : "No results found"}
              </h3>
              <p className="mt-2 text-sm text-[#73777D]/75">
                {enquiries.length === 0
                  ? "New customer submissions will appear here."
                  : "Try changing the search term or status filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                <thead className="bg-[#F5F5F5] text-xs uppercase tracking-wide text-[#73777D]/80">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Customer
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Phone
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Service
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Submitted
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#73777D]/10">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-[#F5F5F5]/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#73777D]">
                          {enquiry.full_name || "—"}
                        </p>
                        <p className="mt-1 text-[#73777D]/75">
                          {enquiry.email || "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4">{enquiry.phone || "—"}</td>
                      <td className="px-5 py-4">
                        {enquiry.service_required || "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        {formatDate(enquiry.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        {isEnquiryStatus(enquiry.status) ? (
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[enquiry.status]}`}
                          >
                            {statusLabels[enquiry.status]}
                          </span>
                        ) : (
                          <span className="text-xs text-[#73777D]/70">
                            {enquiry.status || "Unknown"}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => openDetails(enquiry)}
                          className="whitespace-nowrap font-semibold text-[#D71920] hover:underline"
                          aria-label={`View enquiry from ${enquiry.full_name || "customer"}`}
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <button
            type="button"
            aria-label="Close enquiry details"
            onClick={() => setSelectedEnquiry(null)}
            className="absolute inset-0 cursor-default"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-details-title"
            className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71920]">
                  Customer enquiry
                </p>
                <h2
                  id="enquiry-details-title"
                  className="mt-2 text-2xl font-bold text-[#73777D]"
                >
                  {selectedEnquiry.full_name || "Customer details"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-full border border-[#73777D]/20 px-3 py-1.5 text-sm font-semibold hover:border-[#D71920] hover:text-[#D71920]"
              >
                Close
              </button>
            </div>

            <dl className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#73777D]/65">
                  Email
                </dt>
                <dd className="mt-1 break-words text-sm text-[#73777D]">
                  {selectedEnquiry.email || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#73777D]/65">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-[#73777D]">
                  {selectedEnquiry.phone || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#73777D]/65">
                  Service
                </dt>
                <dd className="mt-1 text-sm text-[#73777D]">
                  {selectedEnquiry.service_required || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#73777D]/65">
                  Submitted
                </dt>
                <dd className="mt-1 text-sm text-[#73777D]">
                  {formatDate(selectedEnquiry.created_at)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#73777D]/65">
                  Subject
                </dt>
                <dd className="mt-1 text-sm text-[#73777D]">
                  {selectedEnquiry.enquiry_subject || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#73777D]/65">
                  Project details
                </dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[#73777D]">
                  {selectedEnquiry.project_details || "—"}
                </dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-[#73777D]/15 pt-6">
              <label
                htmlFor="update-enquiry-status"
                className="mb-2 block text-sm font-semibold text-[#73777D]"
              >
                Enquiry status
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  id="update-enquiry-status"
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(event.target.value as EnquiryStatus)
                  }
                  disabled={busyAction !== null}
                  className="min-w-0 flex-1 rounded-lg border border-[#73777D]/25 bg-white px-4 py-3 text-sm outline-none focus:border-[#D71920]"
                >
                  {enquiryStatuses.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleStatusSave}
                  disabled={
                    busyAction !== null ||
                    selectedStatus === selectedEnquiry.status
                  }
                  className="rounded-full bg-[#D71920] px-5 py-3 text-sm font-bold text-white hover:bg-[#AC1018] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busyAction === "save" ? "Saving..." : "Save status"}
                </button>
              </div>
              <button
                type="button"
                onClick={handleDelete}
                disabled={busyAction !== null}
                className="mt-6 rounded-full border border-[#D71920]/40 px-5 py-2.5 text-sm font-semibold text-[#D71920] hover:bg-[#D71920]/5 disabled:opacity-50"
              >
                {busyAction === "delete" ? "Deleting..." : "Delete enquiry"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
