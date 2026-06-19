import { chromium } from "playwright";

const base = "http://localhost:3000";
const pages = [
  { name: "home-fr", url: `${base}/fr` },
  { name: "home-en", url: `${base}/en` },
  { name: "sector-finance", url: `${base}/fr/solutions/finance` },
  { name: "about-fr", url: `${base}/fr/about` },
  { name: "contact-fr", url: `${base}/fr#contact` },
];

const browser = await chromium.launch();
for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(p.url, { waitUntil: "networkidle" });
  const data = await page.evaluate(() => {
    const fonts = [...new Set([...document.querySelectorAll("h1,h2,h3,body,p,a,button")].map((el) => getComputedStyle(el).fontFamily))];
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
      tag: h.tagName,
      text: (h.textContent || "").trim().slice(0, 60),
      size: getComputedStyle(h).fontSize,
      weight: getComputedStyle(h).fontWeight,
    }));
    const smallTargets = [...document.querySelectorAll("a,button,input,[role=button]")]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      })
      .map((e) => ({
        tag: e.tagName,
        text: (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 40),
        href: e.getAttribute("href"),
        w: Math.round(e.getBoundingClientRect().width),
        h: Math.round(e.getBoundingClientRect().height),
      }))
      .slice(0, 25);
    const heroCtas = [...document.querySelectorAll("main a, main button, header a, header button")]
      .filter((e) => {
        const t = (e.textContent || "").trim();
        return t.length > 2 && t.length < 50;
      })
      .slice(0, 8)
      .map((e) => ({
        text: (e.textContent || "").trim().slice(0, 40),
        href: e.getAttribute("href"),
        w: Math.round(e.getBoundingClientRect().width),
        h: Math.round(e.getBoundingClientRect().height),
      }));
    const deckLinks = [...document.querySelectorAll('a[href*="deck"]')].map((e) => ({
      text: (e.textContent || "").trim().slice(0, 40),
      href: e.getAttribute("href"),
    }));
    const hashLinks = [...document.querySelectorAll('a[href="#"]')].map((e) => ({
      text: (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 40),
    }));
    const bodySize = getComputedStyle(document.body).fontSize;
    return {
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim(),
      fonts,
      bodySize,
      headings: headings.slice(0, 12),
      heroCtas,
      smallTargets,
      deckLinks,
      hashLinks: hashLinks.slice(0, 10),
      hasWaitlist: !!document.querySelector("#waitlist"),
      hasContact: !!document.querySelector("#contact"),
    };
  });
  console.log(JSON.stringify({ page: p.name, ...data }, null, 2));
  await page.close();
}

// Deck 404 check
const page = await browser.newPage();
const deckRes = await page.goto(`${base}/deck/onelog-deck.pdf`, { waitUntil: "domcontentloaded" });
console.log(JSON.stringify({ deckPdfStatus: deckRes?.status(), deckPdfUrl: page.url() }));
await browser.close();