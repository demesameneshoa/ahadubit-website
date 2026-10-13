import { chromium } from "playwright";
const base = "http://localhost:3000";
const pages = ["/", "/about", "/services", "/portfolio", "/contact", "/missing-page"];
const log = (ok, m) => console.log(`${ok ? "PASS" : "FAIL"} ${m}`);
const browser = await chromium.launch();

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(80); }
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

for (const scheme of ["light", "dark"]) {
  for (const [w, h, tag] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 1 });
    for (const p of pages) {
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => m.type() === "error" && !/404|Failed to load resource/.test(m.text()) && errors.push(m.text()));
      await page.goto(base + p, { waitUntil: "networkidle" });
      await scrollThrough(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const name = (p === "/" ? "home" : p.slice(1)) + `-${tag}-${scheme}`;
      if (!(scheme === "dark" && tag === "mobile" && p !== "/")) await page.screenshot({ path: `shots/${name}.png`, fullPage: true });
      log(errors.length === 0 && overflow <= 1, `${name}: errors=${errors.length} hOverflow=${overflow}px ${errors.slice(0, 2).join(" | ")}`);
      await page.close();
    }
    await ctx.close();
  }
}

// 200% text size (browser text zoom) at phone width: no horizontal overflow
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  for (const p of pages.slice(0, 5)) {
    const page = await ctx.newPage();
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html{font-size:200% !important}" });
    await page.waitForTimeout(300);
    const res = await page.evaluate(() => {
      const over = document.documentElement.scrollWidth - window.innerWidth;
      const bad = [...document.querySelectorAll("h1,h2,h3,p,a,button,li")].filter((el) => el.getBoundingClientRect().right > window.innerWidth + 2).slice(0, 4).map((el) => el.tagName + "." + el.className + ":" + el.textContent.trim().slice(0, 30));
      return { over, bad };
    });
    log(res.over <= 1, `200% text ${p}: hOverflow=${res.over}px ${res.bad.join(" | ")}`);
    if (p === "/") await page.screenshot({ path: "shots/home-mobile-200pct.png", fullPage: false });
    await page.close();
  }
  await ctx.close();
}

// Viewport shot of the services page (sticky sidebar)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/services", { waitUntil: "networkidle" });
  await page.mouse.wheel(0, 700); await page.waitForTimeout(900);
  await page.screenshot({ path: "shots/services-viewport.png" });
  await page.close();
}

// Functional checks
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.mouse.wheel(0, 1500); await page.waitForTimeout(300);
  await page.click(".menu-toggle"); await page.waitForTimeout(400);
  log(await page.locator(".mobile-menu.is-open").count() === 1, "mobile menu opens after scrolling");
  await page.screenshot({ path: "shots/menu-mobile-light.png" });
  await page.locator(".mobile-menu a", { hasText: "Portfolio" }).click();
  await page.waitForURL(/portfolio/, { timeout: 8000 }).catch(() => {});
  log(page.url().includes("/portfolio"), "menu navigates to Portfolio");
  const before = await page.locator(".project-card").count();
  await page.getByRole("button", { name: /^ERP/ }).click(); await page.waitForTimeout(300);
  const after = await page.locator(".project-card").count();
  log(after > 0 && after < before, `portfolio filter ${before} -> ${after}`);
  await page.goto(base + "/contact", { waitUntil: "networkidle" });
  await page.click("button[type=submit]"); await page.waitForTimeout(300);
  const errs = await page.locator(".field__error").allTextContents();
  log(errs.length === 3, `form validation shows ${errs.length} field errors: ${errs.join(" / ")}`);
  await ctx.close();
}

// Keyboard: first Tab reaches skip link, focus ring visible
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  log(first === "Skip to content", `first Tab focuses: "${first}"`);
  await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  log(outline !== "none", `focus ring visible (outline ${outline})`);
  await page.close();
}

// Reduced motion: content visible without animation
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + "/about", { waitUntil: "networkidle" });
  const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((e) => getComputedStyle(e).opacity !== "1").length);
  log(hidden === 0, `reduced motion: ${hidden} hidden reveal elements`);
  await ctx.close();
}
await browser.close();
