import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { siteAdmins } from "@/db/schema";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in with ChatGPT first." }, { status: 401 });

  try {
    const db = getDb();
    const existing = await db.select().from(siteAdmins).where(eq(siteAdmins.userId, user.userId)).limit(1);
    if (existing.length) return Response.json({ success: true });
    const owner = await db.select({ userId: siteAdmins.userId }).from(siteAdmins).limit(1);
    if (owner.length) return Response.json({ error: "This inbox already has an owner." }, { status: 403 });

    const body = await request.json() as { code?: string };
    const configuredCode = (env as unknown as { ADMIN_CLAIM_CODE?: string }).ADMIN_CLAIM_CODE;
    if (!configuredCode || body.code?.trim() !== configuredCode) return Response.json({ error: "That claim code isn't correct." }, { status: 403 });

    await db.insert(siteAdmins).values({ userId: user.userId, email: user.email });
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Admin claim failed", error);
    return Response.json({ error: "The inbox couldn't be claimed right now. Please try again." }, { status: 500 });
  }
}
