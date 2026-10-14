import { chromium } from "playwright";
const base = "http://localhost:3000";
const pages = ["/", "/about", "/services", "/portfolio", "/contact"];
const log = (ok, m) => console.log(`${ok ? "PASS" : "FAIL"} ${m}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch();
const watch = (page) => { const e = []; page.on("pageerror", (x) => e.push(x.message)); page.on("console", (m) => m.type() === "error" && !/Failed to load resource/.test(m.text()) && e.push(m.text())); return e; };
async function scrollThrough(page, step = 300) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += step) { await page.evaluate((y) => window.scrollTo(0, y), y); await sleep(40); }
  await sleep(600);
}

// 1. Every page, light/dark, desktop/mobile: no errors, no sideways scroll, all reveals end visible
for (const scheme of ["light", "dark"]) for (const [w, h, tag] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
  for (const p of pages) {
    const page = await ctx.newPage(); const errors = watch(page);
    await page.goto(base + p, { waitUntil: "networkidle" });
    await scrollThrough(page);
    const r = await page.evaluate(() => ({
      over: document.documentElement.scrollWidth - window.innerWidth,
      hidden: [...document.querySelectorAll("[data-reveal]")].filter((e) => !e.classList.contains("is-in")).length,
    }));
    log(errors.length === 0 && r.over <= 1 && r.hidden === 0, `${p} ${tag} ${scheme}: errors=${errors.length} hOverflow=${r.over} unrevealed=${r.hidden} ${errors.slice(0, 2).join(" | ")}`);
    await page.close();
  }
  await ctx.close();
}

// 2. Home interactions (desktop)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage(); const errors = watch(page);
  await page.goto(base + "/", { waitUntil: "networkidle" }); await sleep(1200);
  await page.screenshot({ path: "shots/1-hero.png" });
  // pointer parallax on hero
  await page.mouse.move(1200, 300); await sleep(500);
  const mx = await page.evaluate(() => getComputedStyle(document.querySelector(".hero")).getPropertyValue("--mx"));
  log(Number(mx) > 0.3, `hero follows pointer (--mx=${mx})`);
  // hero exit progress
  await page.evaluate(() => window.scrollTo(0, 400)); await sleep(400);
  const hp = await page.evaluate(() => getComputedStyle(document.querySelector(".hero")).getPropertyValue("--p"));
  log(Number(hp) > 0.2, `hero scroll progress (--p=${hp})`);
  // statement words light up
  const st = await page.evaluate(() => document.querySelector(".statement").getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 500), st); await sleep(500);
  const partial = await page.evaluate(() => [document.querySelectorAll(".hl-word.is-on").length, document.querySelectorAll(".hl-word").length]);
  await page.screenshot({ path: "shots/2-statement.png" });
  await page.evaluate((y) => window.scrollTo(0, y + 200), st); await sleep(500);
  const full = await page.evaluate(() => [document.querySelectorAll(".hl-word.is-on").length, document.querySelectorAll(".hl-word").length]);
  log(partial[0] > 0 && partial[0] < partial[1] && full[0] === full[1], `statement words light progressively (${partial[0]}/${partial[1]} → ${full[0]}/${full[1]})`);
  // tilt on service card
  const card = page.locator(".service-card").first(); await card.scrollIntoViewIfNeeded(); await sleep(900);
  const box = await card.boundingBox(); await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.2); await sleep(400);
  const tf = await card.evaluate((e) => getComputedStyle(e).transform);
  log(tf !== "none" && tf !== "matrix(1, 0, 0, 1, 0, 0)", `service card tilts toward pointer (${tf.slice(0, 40)})`);
  // pinned horizontal gallery
  const hs = await page.evaluate(() => { const el = document.querySelector(".hscroll"); return { pinned: el.classList.contains("is-pinned"), top: el.getBoundingClientRect().top + window.scrollY, h: el.offsetHeight }; });
  log(hs.pinned, `work gallery pinned on desktop (section height ${hs.h}px)`);
  await page.evaluate((y) => window.scrollTo(0, y + 10), hs.top); await sleep(500);
  await page.screenshot({ path: "shots/3-gallery-start.png" });
  await page.evaluate((y) => window.scrollTo(0, y), hs.top + (hs.h - 900) / 2); await sleep(500);
  await page.screenshot({ path: "shots/4-gallery-mid.png" });
  await page.evaluate((y) => window.scrollTo(0, y), hs.top + hs.h - 900 - 5); await sleep(500);
  const end = await page.evaluate(() => { const cards = [...document.querySelectorAll(".hscroll .work-card")]; const last = cards[cards.length - 1].getBoundingClientRect(); const first = cards[0].getBoundingClientRect(); const sticky = document.querySelector(".hscroll__sticky").getBoundingClientRect(); return { lastRight: last.right, firstRight: first.right, vw: innerWidth, stickyTop: sticky.top, p: getComputedStyle(document.querySelector(".hscroll")).getPropertyValue("--p") }; });
  log(end.lastRight <= end.vw && end.firstRight < 0 && Math.abs(end.stickyTop - 64) < 3, `gallery scrolls sideways to the last card (p=${end.p}, last right=${Math.round(end.lastRight)}/${end.vw}, sticky top=${Math.round(end.stickyTop)})`);
  await page.screenshot({ path: "shots/5-gallery-end.png" });
  // why: active item + count-up
  const why = page.locator(".feature-list__item").nth(2); await why.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -200)); await sleep(1600);
  const act = await page.evaluate(() => document.querySelectorAll(".feature-list__item.is-active").length);
  const counts = await page.evaluate(() => [...document.querySelectorAll(".facts dd")].map((d) => d.textContent));
  log(act >= 1 && act <= 3, `reasons light up near centre (${act} active)`);
  log(counts.join(",") === "12+,5+ years,8", `facts count up to final values (${counts.join(", ")})`);
  await page.screenshot({ path: "shots/6-why.png" });
  // back to top
  const shown = await page.evaluate(() => document.documentElement.classList.contains("show-top"));
  await page.click(".to-top"); await sleep(1200);
  const y = await page.evaluate(() => window.scrollY);
  log(shown && y < 5, `back-to-top appears and returns to top (y=${y})`);
  // CTA pointer light
  log(errors.length === 0, `home interactions: no errors ${errors.join(" | ")}`);
  await ctx.close();
}

// 3. Services: sidebar scroll-spy + process line
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }); const errors = watch(page);
  await page.goto(base + "/services", { waitUntil: "networkidle" });
  await page.click('.services-index a[href="#cloud"]'); await sleep(1500);
  const cur = await page.evaluate(() => document.querySelector(".services-index a.is-current")?.textContent);
  log(cur === "Cloud Services", `services sidebar highlights current section ("${cur}")`);
  await page.screenshot({ path: "shots/7-services-spy.png" });
  await page.locator(".process").scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, 150)); await sleep(800);
  const pp = await page.evaluate(() => getComputedStyle(document.querySelector(".process")).getPropertyValue("--p"));
  log(Number(pp) > 0.3, `process line fills with scroll (--p=${pp})`);
  await page.screenshot({ path: "shots/8-process.png" });
  log(errors.length === 0, `services: no errors ${errors.join(" | ")}`);
  await page.close();
}

// 4. Portfolio: animated filter
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }); const errors = watch(page);
  await page.goto(base + "/portfolio", { waitUntil: "networkidle" }); await sleep(800);
  await page.getByRole("button", { name: /^ERP/ }).click(); await sleep(150);
  const midAnim = await page.evaluate(() => document.getAnimations().length);
  await sleep(700);
  const erp = await page.evaluate(() => [...document.querySelectorAll(".project-card")].map((c) => getComputedStyle(c).opacity));
  await page.getByRole("button", { name: /^All/ }).click(); await sleep(900);
  const all = await page.evaluate(() => [...document.querySelectorAll(".project-card")].filter((c) => getComputedStyle(c).opacity === "1" && c.getBoundingClientRect().height > 0).length);
  const pill = await page.evaluate(() => !!document.querySelector(".segmented__pill"));
  log(midAnim > 0, `filter animates cards (${midAnim} animations running)`);
  log(erp.length === 5 && erp.every((o) => o === "1") && all === 12, `filtered cards visible (ERP ${erp.length}, back to All ${all})`);
  log(pill, "segmented control has sliding selection");
  await page.screenshot({ path: "shots/9-portfolio.png" });
  log(errors.length === 0, `portfolio: no errors ${errors.join(" | ")}`);
  await page.close();
}

// 5. Mobile gallery is swipeable (not pinned)
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const m = await page.evaluate(() => { const el = document.querySelector(".hscroll"); const vp = el.querySelector(".hscroll__viewport"); return { pinned: el.classList.contains("is-pinned"), scrollable: vp.scrollWidth > vp.clientWidth }; });
  log(!m.pinned && m.scrollable, `mobile gallery swipes sideways instead of pinning (${JSON.stringify(m)})`);
  await page.locator(".hscroll").scrollIntoViewIfNeeded(); await sleep(900);
  await page.screenshot({ path: "shots/10-mobile-gallery.png" });
  await page.close();
}

// 6. Reduce Motion: nothing hidden, nothing pinned, words lit, no transforms
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" }); await sleep(500);
  const r = await page.evaluate(() => ({
    hidden: [...document.querySelectorAll("[data-reveal]")].filter((e) => getComputedStyle(e).opacity !== "1").length,
    pinned: document.querySelector(".hscroll").classList.contains("is-pinned"),
    dim: [...document.querySelectorAll(".hl-word")].filter((w) => !w.classList.contains("is-on")).length,
    heroTf: getComputedStyle(document.querySelector(".hero__waves")).transform,
  }));
  log(r.hidden === 0 && !r.pinned && r.dim === 0 && (r.heroTf === "none"), `reduced motion: ${JSON.stringify(r)}`);
  await ctx.close();
}

// 7. Keyboard: gallery region focusable, focus ring
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.focus(".hscroll__viewport"); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight"); await sleep(600);
  const sl = await page.evaluate(() => document.querySelector(".hscroll__viewport").scrollLeft);
  log(sl > 0, `gallery scrolls with arrow keys on mobile (scrollLeft=${sl})`);
  await page.close();
}

// 8. 200% text at phone width
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  for (const p of pages) {
    const page = await ctx.newPage();
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html{font-size:200% !important}" }); await sleep(300);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    log(over <= 1, `200% text ${p}: hOverflow=${over}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
