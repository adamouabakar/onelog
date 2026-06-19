import fs from "node:fs";
import path from "node:path";

const DECK_PATH = path.join(process.cwd(), "public/deck/onelog-deck.pdf");

/** True when the investor deck PDF exists and is non-empty. */
export function isDeckAvailable(): boolean {
  try {
    return fs.existsSync(DECK_PATH) && fs.statSync(DECK_PATH).size > 0;
  } catch {
    return false;
  }
}

export const DECK_HREF = "/deck/onelog-deck.pdf";