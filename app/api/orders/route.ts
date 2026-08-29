import { getDb } from "@/db";
import { orderRequests } from "@/db/schema";
import { validateOrderInput } from "@/lib/order-validation";

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Unsupported request." }, { status: 415 });
    const validation = validateOrderInput(await request.json());
    if (!validation.ok) return Response.json({ error: validation.error }, { status: 400 });

    const [created] = await getDb().insert(orderRequests).values(validation.data).returning({ id: orderRequests.id });
    return Response.json({ reference: `MC-${String(created.id).padStart(4, "0")}` }, { status: 201 });
  } catch (error) {
    console.error("Order request failed", error);
    return Response.json({ error: "Milk & Cake's request box is taking a quick break. Please try again in a moment." }, { status: 500 });
  }
}
