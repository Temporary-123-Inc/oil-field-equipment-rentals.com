import { randomUUID } from "node:crypto";
import type { Resend } from "resend";
import type { AdminRealtimeDatabase } from "./realtime-database.js";
export type Mail = NonNullable<Parameters<Resend["emails"]["send"]>[0]>;
type DeliveryRecord = Record<string, unknown> & {
  status: "queued" | "sent" | "manual_review";
  createdAt: number;
  leaseId?: string;
  leaseUntil?: number;
  message?: Mail;
  emailId?: string;
};
export type DeliveryDeps = {
  db: AdminRealtimeDatabase;
  send: (message: Mail, key: string) => Promise<string>;
  createMessage: (data: Record<string, unknown>, id: string) => Mail;
  now?: () => number;
};
export async function processDelivery(
  id: string,
  { db, send, createMessage, now = Date.now }: DeliveryDeps,
) {
  const ref = db.ref<DeliveryRecord>("inquiries/" + id),
    leaseId = randomUUID();
  // null must be returned (not aborted) on an uncached first transaction pass.
  // The SDK retries against the actual server state before committing.
  const claim = await ref.transaction((current) => {
    if (!current) return null;
    if (current.status !== "queued" || (current.leaseUntil ?? 0) > now()) return;
    if (now() - current.createdAt >= 23 * 3600000)
      return { ...current, status: "manual_review" };
    return {
      ...current,
      message: current.message || createMessage(current, id),
      leaseId,
      leaseUntil: now() + 60000,
    };
  });
  const value = claim.snapshot.val();
  if (
    !claim.committed ||
    value?.leaseId !== leaseId ||
    value.status !== "queued" ||
    !value.message
  )
    return false;
  try {
    const emailId = await send(value.message, `temporary-kitchen-rental/${id}`);
    await ref.transaction((current) =>
      !current
        ? null
        : current.leaseId === leaseId
          ? { ...current, status: "sent", emailId }
          : undefined,
    );
    return true;
  } catch {
    await ref.transaction((current) =>
      !current
        ? null
        : current.leaseId === leaseId && current.status === "queued"
          ? { ...current, leaseUntil: 0 }
          : undefined,
    );
    throw Error("Delivery failed; retained for retry");
  }
}
