import { getDb } from "@/db";
import { orderRequests, siteAdmins } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { and, eq } from "drizzle-orm";

const allowedStatuses = new Set(["new", "contacted", "booked", "closed"]);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Not signed in." }, { status: 401 });

  const db = getDb();
  const admin = await db.select({ userId: siteAdmins.userId }).from(siteAdmins).where(eq(siteAdmins.userId, user.userId)).limit(1);
  if (!admin.length) return Response.json({ error: "Not authorized." }, { status: 403 });

  const { id } = await context.params;
  const orderId = Number(id);
  const body = await request.json() as { status?: string };
  if (!Number.isInteger(orderId) || !body.status || !allowedStatuses.has(body.status)) return Response.json({ error: "Invalid update." }, { status: 400 });

  const updated = await db.update(orderRequests).set({ status: body.status }).where(and(eq(orderRequests.id, orderId))).returning({ id: orderRequests.id });
  if (!updated.length) return Response.json({ error: "Request not found." }, { status: 404 });
  return Response.json({ success: true });
}
