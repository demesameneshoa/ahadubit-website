// Loads a page like a speed-test tool and lists every request, then estimates
// the YSlow-style rules Pingdom grades (requests, compression).
import { chromium } from "playwright";
const url = process.argv[2] || "http://localhost:3000/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const rows = [];
page.on("response", async (res) => {
  const req = res.request();
  let size = 0;
  try { size = (await res.body()).length; } catch {}
  const h = res.headers();
  rows.push({ type: req.resourceType(), status: res.status(), ct: (h["content-type"] || "").split(";")[0], enc: h["content-encoding"] || "-", size, url: req.url().replace(url, "/") });
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
console.table(rows.map((r) => ({ ...r, url: r.url.slice(0, 90) })));
const js = rows.filter((r) => r.type === "script").length;
const css = rows.filter((r) => r.type === "stylesheet").length;
const text = rows.filter((r) => ["document", "script", "stylesheet", "fetch", "xhr"].includes(r.type) && r.size > 500).length;
const numreq = Math.max(0, 100 - 4 * Math.max(0, js - 3) - 4 * Math.max(0, css - 2));
console.log(`TOTAL requests=${rows.length} js=${js} css=${css} textComponents>500B=${text} numreqScore≈${numreq}`);
console.log("TOTAL bytes", rows.reduce((a, r) => a + r.size, 0));
await browser.close();
