import assert from "node:assert/strict";
import test from "node:test";
import { validateOrderInput } from "../lib/order-validation.ts";

const complete = { name: "Jamie", email: "jamie@example.com", phone: "555-0100", eventDate: "2026-09-10", occasion: "Birthday", quantity: "24", flavor: "Chocolate fudge", fulfillment: "Local pickup", budget: "$100–$175", theme: "Red and white", notes: "No rush", consent: "yes", website: "" };

test("rejects an empty request", () => assert.equal(validateOrderInput({}, "2026-08-28").ok, false));
test("rejects invalid email", () => assert.deepEqual(validateOrderInput({ ...complete, email: "wrong" }, "2026-08-28"), { ok: false, error: "Please enter a valid email address." }));
test("rejects invalid phone values", () => assert.deepEqual(validateOrderInput({ ...complete, phone: "not-a-number" }, "2026-08-28"), { ok: false, error: "Please enter a valid phone number or leave it blank." }));
test("rejects past event dates", () => assert.deepEqual(validateOrderInput({ ...complete, eventDate: "2026-08-01" }, "2026-08-28"), { ok: false, error: "Please choose today or a future event date." }));
test("accepts and normalizes a complete request", () => { const result = validateOrderInput(complete, "2026-08-28"); assert.equal(result.ok, true); if (result.ok) { assert.equal(result.data.quantity, 24); assert.equal(result.data.email, "jamie@example.com"); } });
