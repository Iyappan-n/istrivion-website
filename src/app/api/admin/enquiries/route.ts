import { NextResponse } from "next/server";
import { getAdminAuthorization } from "@/lib/admin-auth";
import { isEnquiryStatus, isUuid } from "@/lib/enquiries";

type EnquiryMutation = {
  id?: unknown;
  status?: unknown;
};

async function authorizeRequest() {
  const authorization = await getAdminAuthorization();
  if (!authorization.authorized) {
    return {
      response: NextResponse.json(
        { error: authorization.message },
        { status: authorization.status },
      ),
    };
  }
  return { authorization };
}

async function readMutation(request: Request) {
  try {
    const body = (await request.json()) as EnquiryMutation;
    return { body };
  } catch {
    return {
      response: NextResponse.json(
        { error: "Request body must be valid JSON." },
        { status: 400 },
      ),
    };
  }
}

export async function PATCH(request: Request) {
  const access = await authorizeRequest();
  if (access.response) {
    return access.response;
  }

  const parsed = await readMutation(request);
  if (parsed.response) {
    return parsed.response;
  }

  const { id, status } = parsed.body;
  if (!isUuid(id) || !isEnquiryStatus(status)) {
    return NextResponse.json(
      { error: "A valid enquiry ID and status are required." },
      { status: 400 },
    );
  }

  const { data, error } = await access.authorization.supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Admin enquiry status update failed", error.message);
    return NextResponse.json(
      { error: "The enquiry status could not be updated." },
      { status: 500 },
    );
  }
  if (!data) {
    return NextResponse.json(
      { error: "Enquiry not found or update is not permitted." },
      { status: 404 },
    );
  }

  return NextResponse.json({ id, status });
}

export async function DELETE(request: Request) {
  const access = await authorizeRequest();
  if (access.response) {
    return access.response;
  }

  const parsed = await readMutation(request);
  if (parsed.response) {
    return parsed.response;
  }

  const { id } = parsed.body;
  if (!isUuid(id)) {
    return NextResponse.json(
      { error: "A valid enquiry ID is required." },
      { status: 400 },
    );
  }

  const { data, error } = await access.authorization.supabase
    .from("enquiries")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Admin enquiry deletion failed", error.message);
    return NextResponse.json(
      { error: "The enquiry could not be deleted." },
      { status: 500 },
    );
  }
  if (!data) {
    return NextResponse.json(
      { error: "Enquiry not found or deletion is not permitted." },
      { status: 404 },
    );
  }

  return NextResponse.json({ id });
}
