import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = process.argv[2];
const base = "http://localhost:3000";

const shots = [
  { name: "home-fr-hero", url: `${base}/fr`, width: 1440, height: 900, fullPage: false },
  { name: "home-fr-mobile-hero", url: `${base}/fr`, width: 390, height: 844, fullPage: false },
  { name: "sector-finance-waitlist", url: `${base}/fr/solutions/finance`, width: 1440, height: 900, fullPage: false, scroll: "#waitlist" },
  { name: "about-deck", url: `${base}/fr/about`, width: 1440, height: 900, fullPage: false, scroll: "Deck investisseur" },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.goto(shot.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  if (shot.scroll) {
    const loc = shot.scroll.startsWith("#")
      ? page.locator(shot.scroll)
      : page.getByText(shot.scroll, { exact: false }).first();
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }
  await page.screenshot({
    path: path.join(outDir, `${shot.name}.png`),
    fullPage: shot.fullPage,
  });
  await page.close();
}
await browser.close();
console.log("CAPTURED", shots.length);