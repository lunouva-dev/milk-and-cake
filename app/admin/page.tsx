import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { orderRequests, siteAdmins } from "@/db/schema";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { ClaimInbox } from "./ClaimInbox";
import { RequestStatus } from "./RequestStatus";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Request Inbox | Milk & Cake", description: "Protected order request inbox for Milk & Cake.", robots: { index: false, follow: false }, openGraph: { title: "Request Inbox | Milk & Cake", description: "Protected order request inbox.", images: [] }, twitter: { title: "Request Inbox | Milk & Cake", description: "Protected order request inbox.", images: [] } };

function prettyDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  const db = getDb();
  const admin = await db.select().from(siteAdmins).where(eq(siteAdmins.userId, user.userId)).limit(1);
  if (!admin.length) return <main className="admin-page"><a className="admin-brand" href="/">Milk &amp; Cake</a><ClaimInbox email={user.email} /></main>;

  const requests = await db.select().from(orderRequests).orderBy(desc(orderRequests.createdAt), desc(orderRequests.id)).limit(100);
  return (
    <main className="admin-page">
      <header className="admin-header"><div><a className="admin-brand" href="/">Milk &amp; Cake</a><h1>Request inbox</h1><p>{requests.length ? `${requests.length} recent request${requests.length === 1 ? "" : "s"}` : "New requests will appear here."}</p></div><a className="view-site" href="/">View public site ↗</a></header>
      <div className="request-list">
        {requests.length === 0 && <div className="empty-inbox"><span aria-hidden="true">✦</span><h2>The inbox is ready</h2><p>When someone submits an order request, all the celebration details will appear here.</p></div>}
        {requests.map((item) => (
          <article className="request-card" key={item.id}>
            <div className="request-top"><div><span className="request-ref">MC-{String(item.id).padStart(4, "0")}</span><h2>{item.name}</h2><p>{item.occasion} · {item.quantity} pops · {prettyDate(item.eventDate)}</p></div><RequestStatus id={item.id} initialStatus={item.status} /></div>
            <dl><div><dt>Flavor</dt><dd>{item.flavor}</dd></div><div><dt>Theme</dt><dd>{item.theme || "Open to ideas"}</dd></div><div><dt>Fulfillment</dt><dd>{item.fulfillment}</dd></div><div><dt>Budget</dt><dd>{item.budget}</dd></div></dl>
            {item.notes && <div className="request-notes"><strong>Notes from {item.name}</strong><p>{item.notes}</p></div>}
            <div className="request-contact"><a href={`mailto:${item.email}?subject=${encodeURIComponent(`Milk & Cake request MC-${String(item.id).padStart(4, "0")}`)}`}>Email {item.name}</a>{item.phone && <a href={`tel:${item.phone}`}>Call {item.phone}</a>}<span>Received {item.createdAt}</span></div>
          </article>
        ))}
      </div>
    </main>
  );
}
