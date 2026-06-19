import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/fr", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const data = await page.evaluate(() => {
  const localeBtns = [...document.querySelectorAll("button")].filter((b) =>
    ["fr", "en"].includes((b.textContent || "").trim().toLowerCase()),
  );
  const deckEl = document.querySelector('main a[download], main p[role="status"]');
  return {
    locale: localeBtns.map((b) => ({
      w: Math.round(b.getBoundingClientRect().width),
      h: Math.round(b.getBoundingClientRect().height),
    })),
    deck: deckEl
      ? { tag: deckEl.tagName, text: (deckEl.textContent || "").trim().slice(0, 80) }
      : null,
    hashLinks: document.querySelectorAll('a[href="#"]').length,
    h1Opacity: getComputedStyle(document.querySelector("h1")).opacity,
    primaryCta: document.querySelector('main a[href="#contact"]')?.textContent?.trim(),
  };
});

console.log(JSON.stringify(data, null, 2));
await page.screenshot({
  path: "C:/Users/HP/.gstack/projects/onelog/designs/design-audit-20260618/screenshots/finding-001-after.png",
});
await browser.close();