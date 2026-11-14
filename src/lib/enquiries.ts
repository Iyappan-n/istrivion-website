export const enquiryStatuses = [
  "new",
  "pending",
  "contacted",
  "completed",
] as const;

export type EnquiryStatus = (typeof enquiryStatuses)[number];

export type Enquiry = {
  id: string;
  enquiry_subject: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  service_required: string | null;
  project_details: string | null;
  status: string | null;
  created_at: string | null;
};

export type EnquiryCounts = {
  total: number;
  new: number;
  pending: number;
  contacted: number;
  completed: number;
};

export function isEnquiryStatus(value: unknown): value is EnquiryStatus {
  return (
    typeof value === "string" &&
    enquiryStatuses.includes(value as EnquiryStatus)
  );
}

export function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}
