"use server";

type State = { ok: boolean; error?: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function sendContact(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const sector = String(formData.get("sector") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) return { ok: false, error: "missing" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "email" };
  if (message.length > 5000) return { ok: false, error: "missing" };

  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "not_configured" };

  const to = process.env.CONTACT_TO_EMAIL || "contact@onelog.io";
  const from = process.env.CONTACT_FROM_EMAIL || "OneLog <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Nouveau message — ${name}${sector ? ` · ${sector}` : ""}`,
        text: `Nom : ${name}\nE-mail : ${email}\nSecteur : ${sector || "—"}\n\n${message}`,
      }),
    });
    if (!res.ok) return { ok: false, error: "send_failed" };
    return { ok: true };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}
