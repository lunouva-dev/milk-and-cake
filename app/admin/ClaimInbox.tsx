"use client";

import { FormEvent, useState } from "react";

export function ClaimInbox({ email }: { email: string }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function claim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const code = new FormData(event.currentTarget).get("code");
    const response = await fetch("/api/admin/claim", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }) });
    const result = await response.json() as { error?: string };
    if (response.ok) window.location.reload();
    else { setError(result.error || "Unable to claim the inbox."); setSending(false); }
  }

  return (
    <div className="claim-card">
      <span className="admin-badge">Owner setup</span>
      <h1>Claim the Milk &amp; Cake inbox</h1>
      <p>You&apos;re signed in as <strong>{email}</strong>. Enter the one-time claim code shared with the site owner.</p>
      <form onSubmit={claim}><label>Claim code<input name="code" autoComplete="one-time-code" required /></label>{error && <p role="alert">{error}</p>}<button disabled={sending}>{sending ? "Claiming…" : "Claim this inbox"}</button></form>
    </div>
  );
}
