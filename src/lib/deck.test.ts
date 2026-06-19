import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DECK_HREF, isDeckAvailable } from "./deck";

const DECK_PATH = path.join(process.cwd(), "public/deck/onelog-deck.pdf");

describe("isDeckAvailable", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when the deck file is missing", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(isDeckAvailable()).toBe(false);
  });

  it("returns false when the deck file is empty", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "statSync").mockReturnValue({ size: 0 } as fs.Stats);
    expect(isDeckAvailable()).toBe(false);
  });

  it("returns true when the deck file has content", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "statSync").mockReturnValue({ size: 1024 } as fs.Stats);
    expect(isDeckAvailable()).toBe(true);
  });

  it("exposes the public deck path", () => {
    expect(DECK_HREF).toBe("/deck/onelog-deck.pdf");
    expect(DECK_PATH.replaceAll("\\", "/")).toContain("public/deck/onelog-deck.pdf");
  });
});