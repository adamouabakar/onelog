"use server";

import {
  isHoneypotTriggered,
  sanitizeName,
  validateEmail,
  validateName,
  validateSector,
} from "@/lib/form-validation";
import { sendResendEmail } from "@/lib/resend";

export type WaitlistState = { ok: boolean; error?: string; tracked?: boolean };

export async function sendWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  if (isHoneypotTriggered(formData)) {
    return { ok: true, tracked: false };
  }

  const name = sanitizeName(String(formData.get("name") ?? ""));
  const email = String(formData.get("email") ?? "").trim();
  const sector = String(formData.get("sector") ?? "").trim();
  const locale = String(formData.get("locale") ?? "fr").trim() || "fr";

  const nameErr = validateName(name);
  if (nameErr) return { ok: false, error: nameErr };
  const emailErr = validateEmail(email);
  if (emailErr) return { ok: false, error: emailErr };
  const sectorErr = validateSector(sector, true);
  if (sectorErr) return { ok: false, error: sectorErr };

  const subject = `[waitlist] sector=${sector} locale=${locale} — ${name}`;
  const text =
    locale === "en"
      ? `Waitlist signup\nName: ${name}\nEmail: ${email}\nSector: ${sector}`
      : `Inscription liste d'attente\nNom : ${name}\nE-mail : ${email}\nSecteur : ${sector}`;

  const result = await sendResendEmail({ subject, text, replyTo: email });
  if (!result.ok) return { ok: false, error: result.error };

  return { ok: true, tracked: true };
}