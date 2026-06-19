import { isSectorKey } from "@/lib/sectors";

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const MAX_MESSAGE_LENGTH = 5000;

export type FieldError =
  | "missing"
  | "email"
  | "too_long"
  | "invalid_sector";

export function sanitizeName(name: string): string {
  return name.replace(/[\r\n]+/g, " ").trim();
}

export function validateEmail(email: string): FieldError | null {
  if (!email) return "missing";
  if (!EMAIL_RE.test(email)) return "email";
  return null;
}

export function validateName(name: string): FieldError | null {
  if (!sanitizeName(name)) return "missing";
  return null;
}

export function validateMessage(message: string): FieldError | null {
  if (!message.trim()) return "missing";
  if (message.length > MAX_MESSAGE_LENGTH) return "too_long";
  return null;
}

export function validateSector(sector: string, required = false): FieldError | null {
  if (!sector) return required ? "missing" : null;
  if (sector === "other") return null;
  if (!isSectorKey(sector)) return "invalid_sector";
  return null;
}

export function isHoneypotTriggered(formData: FormData, field = "website"): boolean {
  return String(formData.get(field) ?? "").trim().length > 0;
}