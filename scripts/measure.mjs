// Loads pages like a speed-test tool, lists every request, estimates the
// YSlow-style rules Pingdom grades, and runs a few functional smoke checks.
import { chromium } from "playwright";
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const browser = await chromium.launch();

async function measure(path) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const rows = [];
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", async (res) => {
    const req = res.request();
    let size = 0;
    try { size = (await res.body()).length; } catch {}
    const h = res.headers();
    rows.push({ type: req.resourceType(), status: res.status(), enc: h["content-encoding"] || "-", size, url: req.url().replace(base, "").slice(0, 80) });
  });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const js = rows.filter((r) => r.type === "script").length;
  const css = rows.filter((r) => r.type === "stylesheet").length;
  const text = rows.filter((r) => ["document", "script", "stylesheet", "fetch", "xhr"].includes(r.type) && r.size > 500).length;
  const numreq = Math.max(0, 100 - 4 * Math.max(0, js - 3) - 4 * Math.max(0, css - 2));
  console.log(`\n### ${path}`);
  console.table(rows);
  console.log(`SUMMARY ${path}: requests=${rows.length} js=${js} css=${css} text>500B=${text} numreq≈${numreq} bytes=${rows.reduce((a, r) => a + r.size, 0)} errors=${errors.length}`);
  errors.slice(0, 5).forEach((e) => console.log("  ERROR:", e.slice(0, 200)));
  return page;
}

for (const p of ["/", "/about", "/services", "/portfolio", "/contact"]) {
  const page = await measure(p);
  if (p === "/portfolio") {
    const before = await page.locator(".project-card").count();
    await page.getByRole("button", { name: /^ERP/ }).click();
    await page.waitForTimeout(600);
    const after = await page.locator(".project-card").count();
    console.log(`CHECK portfolio filter: ${before} -> ${after} ${after < before && after > 0 ? "OK" : "FAIL"}`);
  }
  if (p === "/") {
    const rev = await page.locator("[data-reveal].is-in").count();
    console.log(`CHECK scroll reveal active elements: ${rev} ${rev > 0 ? "OK" : "FAIL"}`);
    await page.setViewportSize({ width: 390, height: 800 });
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(400);
    await page.locator(".menu-toggle").click();
    await page.waitForTimeout(800);
    const open = await page.locator(".mobile-menu.is-open").count();
    console.log(`CHECK mobile menu opens: ${open ? "OK" : "FAIL"}`);
    await page.locator(".mobile-menu a", { hasText: "Services" }).click();
    await page.waitForURL(/\/services/, { timeout: 8000 }).catch(() => {});
    console.log(`CHECK client navigation: ${page.url().includes("/services") ? "OK" : "FAIL"} (${page.url()})`);
  }
  await page.close();
}
await browser.close();
