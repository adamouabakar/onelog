export type ResendResult = { ok: true } | { ok: false; error: "not_configured" | "send_failed" };

type SendEmailInput = {
  subject: string;
  text: string;
  replyTo: string;
};

export async function sendResendEmail(input: SendEmailInput): Promise<ResendResult> {
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
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
      }),
    });

    if (!res.ok) {
      console.error("[resend] send failed", {
        status: res.status,
        statusText: res.statusText,
      });
      return { ok: false, error: "send_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[resend] network error", err);
    return { ok: false, error: "send_failed" };
  }
}