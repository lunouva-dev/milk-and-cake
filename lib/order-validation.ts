export type ValidOrder = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  occasion: string;
  quantity: number;
  flavor: string;
  fulfillment: string;
  budget: string;
  theme: string;
  notes: string;
};

type ValidationResult = { ok: true; data: ValidOrder } | { ok: false; error: string };

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateOrderInput(value: unknown, today = new Date().toISOString().slice(0, 10)): ValidationResult {
  if (!value || typeof value !== "object") return { ok: false, error: "Please complete the order form." };
  const input = value as Record<string, unknown>;
  if (text(input.website, 100)) return { ok: false, error: "Unable to send this request." };

  const name = text(input.name, 80);
  const email = text(input.email, 120).toLowerCase();
  const phone = text(input.phone, 30);
  const eventDate = text(input.eventDate, 10);
  const occasion = text(input.occasion, 80);
  const quantity = Number(input.quantity);
  const flavor = text(input.flavor, 80);
  const fulfillment = text(input.fulfillment, 80);
  const budget = text(input.budget, 80);
  const theme = text(input.theme, 160);
  const notes = text(input.notes, 1200);

  if (!name || !email || !eventDate || !occasion || !flavor || !fulfillment || !budget) return { ok: false, error: "Please complete every required field." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (phone && !/^[+()\d\s.-]{7,30}$/.test(phone)) return { ok: false, error: "Please enter a valid phone number or leave it blank." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || eventDate < today) return { ok: false, error: "Please choose today or a future event date." };
  if (!Number.isInteger(quantity) || quantity < 12 || quantity > 1000) return { ok: false, error: "Custom orders begin at 12 cake pops." };
  if (input.consent !== "yes") return { ok: false, error: "Please allow Kaylee to contact you about this request." };

  return { ok: true, data: { name, email, phone, eventDate, occasion, quantity, flavor, fulfillment, budget, theme, notes } };
}
