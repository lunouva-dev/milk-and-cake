"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = { state: "idle" | "sending" | "success" | "error"; message?: string; reference?: string };

export function OrderForm() {
  const [status, setStatus] = useState<FormState>({ state: "idle" });
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = (await response.json()) as { error?: string; reference?: string };
      if (!response.ok) throw new Error(result.error || "We couldn't send your request. Please try again.");
      form.reset();
      setStatus({ state: "success", reference: result.reference });
    } catch (error) {
      setStatus({ state: "error", message: error instanceof Error ? error.message : "We couldn't send your request. Please try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div className="order-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="section-kicker">Request received</p>
        <h3>You&apos;re on Kaylee&apos;s list!</h3>
        <p>Kaylee has your celebration details and will follow up using the contact information you shared.</p>
        <p className="reference">Request reference: <strong>{status.reference}</strong></p>
        <button type="button" onClick={() => setStatus({ state: "idle" })}>Send another request</button>
      </div>
    );
  }

  return (
    <form className="order-form" onSubmit={submitOrder}>
      <div className="form-heading">
        <span>Order request</span>
        <small>Fields marked * are required</small>
      </div>
      <div className="form-grid">
        <label>Full name *<input name="name" autoComplete="name" maxLength={80} required placeholder="Your name" /></label>
        <label>Email address *<input name="email" type="email" autoComplete="email" maxLength={120} required placeholder="you@example.com" /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Optional" /></label>
        <label>Event date *<input name="eventDate" type="date" min={minDate} required /></label>
        <label>What are we celebrating? *
          <select name="occasion" required defaultValue=""><option value="" disabled>Choose an occasion</option><option>Birthday</option><option>Baby or bridal shower</option><option>Wedding</option><option>Holiday</option><option>Work or school event</option><option>Just because</option><option>Something else</option></select>
        </label>
        <label>How many cake pops? *<input name="quantity" type="number" min="12" max="1000" step="6" required placeholder="Minimum 12" /></label>
        <label>Flavor *
          <select name="flavor" required defaultValue=""><option value="" disabled>Choose a flavor</option><option>Funfetti classic</option><option>Chocolate fudge</option><option>Red velvet</option><option>Cookies & cream</option><option>Seasonal special</option><option>Help me choose</option></select>
        </label>
        <label>Pickup or delivery? *
          <select name="fulfillment" required defaultValue=""><option value="" disabled>Choose one</option><option>Local pickup</option><option>Ask about delivery</option><option>Not sure yet</option></select>
        </label>
        <label>Budget range *
          <select name="budget" required defaultValue=""><option value="" disabled>Choose a range</option><option>$50–$100</option><option>$100–$175</option><option>$175–$300</option><option>$300+</option><option>I&apos;d like Kaylee&apos;s guidance</option></select>
        </label>
        <label>Theme or colors<input name="theme" maxLength={160} placeholder="Example: cherry red, white & black" /></label>
        <label className="full-field">Anything else Kaylee should know?<textarea name="notes" rows={4} maxLength={1200} placeholder="Share design ideas, allergy concerns, timing, or anything that will help." /></label>
        <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="consent full-field"><input name="consent" type="checkbox" value="yes" required /><span>I agree that Kaylee may contact me about this request. *</span></label>
      </div>
      <p className="form-note">Submitting a request does not confirm an order. Kaylee will follow up with availability and a custom quote. Your details are used only to respond to this request.</p>
      {status.state === "error" && <p className="form-error" role="alert">{status.message}</p>}
      <button className="submit-button" type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending your request…" : "Send my request"}<span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
