import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

const EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

function normalizeEmail(value: unknown): string {
  if (typeof value !== "string") throw new Error("email");
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) throw new Error("email");
  return email;
}

function readPayload(data: unknown): { email: string; company: string } {
  const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  return {
    email: normalizeEmail(record.email),
    company: typeof record.company === "string" ? record.company.trim() : "",
  };
}

export const subscribeEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => readPayload(data))
  .handler(async ({ data }) => {
    if (data.company) return { status: "saved" as const };
    const sql = await getSql();
    const rows = await sql<{ n: number }>`
      with ins as (
        insert into code_subscribers (email)
        values (${data.email})
        on conflict (email) do nothing
        returning 1
      )
      select count(*)::int as n from ins
    `;
    return { status: (rows[0]?.n ?? 0) > 0 ? ("saved" as const) : ("already" as const) };
  });

export const unsubscribeEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => readPayload(data))
  .handler(async ({ data }) => {
    if (data.company) return { removed: false };
    const sql = await getSql();
    const rows = await sql<{ n: number }>`
      with gone as (
        delete from code_subscribers where email = ${data.email} returning 1
      )
      select count(*)::int as n from gone
    `;
    return { removed: (rows[0]?.n ?? 0) > 0 };
  });
