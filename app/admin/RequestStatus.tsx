"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RequestStatus({ id, initialStatus }: { id: number; initialStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  async function update(nextStatus: string) {
    setStatus(nextStatus);
    setSaving(true);
    const response = await fetch(`/api/admin/orders/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status: nextStatus }) });
    setSaving(false);
    if (response.ok) router.refresh();
  }

  return <label className="status-control"><span className={`status-dot ${status}`} aria-hidden="true" />Status<select value={status} onChange={(event) => update(event.target.value)} disabled={saving}><option value="new">New</option><option value="contacted">Contacted</option><option value="booked">Booked</option><option value="closed">Closed</option></select></label>;
}
