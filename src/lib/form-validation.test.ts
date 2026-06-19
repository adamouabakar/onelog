import { describe, expect, it } from "vitest";

import {
  isHoneypotTriggered,
  sanitizeName,
  validateEmail,
  validateMessage,
  validateName,
  validateSector,
} from "@/lib/form-validation";

describe("form-validation", () => {
  it("sanitizes name newlines", () => {
    expect(sanitizeName("Ada\nLovelace")).toBe("Ada Lovelace");
  });

  it("validates email", () => {
    expect(validateEmail("")).toBe("missing");
    expect(validateEmail("bad")).toBe("email");
    expect(validateEmail("ada@onelog.io")).toBeNull();
  });

  it("validates name", () => {
    expect(validateName("   ")).toBe("missing");
    expect(validateName("Ada")).toBeNull();
  });

  it("validates message length", () => {
    expect(validateMessage("")).toBe("missing");
    expect(validateMessage("a".repeat(5001))).toBe("too_long");
    expect(validateMessage("hello")).toBeNull();
  });

  it("validates sector keys", () => {
    expect(validateSector("finance")).toBeNull();
    expect(validateSector("other")).toBeNull();
    expect(validateSector("bogus")).toBe("invalid_sector");
    expect(validateSector("", true)).toBe("missing");
  });

  it("detects honeypot", () => {
    const fd = new FormData();
    expect(isHoneypotTriggered(fd)).toBe(false);
    fd.set("website", "spam");
    expect(isHoneypotTriggered(fd)).toBe(true);
  });
});