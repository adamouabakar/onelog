import { chromium } from "playwright";

const base = "http://localhost:3000";
const pages = [
  { name: "home-fr", url: `${base}/fr` },
  { name: "sector-finance", url: `${base}/fr/solutions/finance` },
  { name: "about-fr", url: `${base}/fr/about` },
];

const browser = await chromium.launch();
for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(p.url, { waitUntil: "networkidle" });
  const data = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const primary = document.querySelector('a[href="#contact"], button');
    const fonts = [...new Set([...document.querySelectorAll("h1,h2,body")].map((el) => getComputedStyle(el).fontFamily))];
    const ctas = [...document.querySelectorAll("a,button")].slice(0, 12).map((el) => ({
      text: (el.textContent || "").trim().slice(0, 40),
      tag: el.tagName,
      href: el.getAttribute("href"),
      w: Math.round(el.getBoundingClientRect().width),
      h: Math.round(el.getBoundingClientRect().height),
    }));
    return {
      title: document.title,
      h1: h1?.textContent?.trim(),
      fonts,
      ctas,
      hasWaitlist: !!document.querySelector("#waitlist"),
      deckLink: !!document.querySelector('a[href*="onelog-deck"]'),
    };
  });
  console.log(JSON.stringify({ page: p.name, ...data }, null, 2));
  await page.close();
}
await browser.close();