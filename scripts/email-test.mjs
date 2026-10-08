import { chromium } from "playwright";
const base = "http://localhost:3000";
const hog = "http://localhost:8025/api/v2/messages";
const log = (ok, msg) => console.log(`${ok ? "PASS" : "FAIL"} ${msg}`);
const post = (body) => fetch(base + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": body.__ip || "1.1.1.1" }, body: JSON.stringify(body) });

// 1. Validation
let r = await post({ name: "", email: "bad", message: "hi", __ip: "2.2.2.2" });
let j = await r.json();
log(r.status === 422 && j.errors?.email && j.errors?.name && j.errors?.message, `validation -> ${r.status} ${JSON.stringify(j)}`);

// 2. Honeypot: accepted silently, nothing sent
await fetch("http://localhost:8025/api/v1/messages", { method: "DELETE" });
r = await post({ name: "Bot", email: "bot@x.com", message: "buy cheap stuff now", website: "http://spam", __ip: "3.3.3.3" });
await new Promise((s) => setTimeout(s, 1000));
let count = (await (await fetch(hog)).json()).total;
log(r.status === 200 && count === 0, `honeypot -> ${r.status}, emails sent: ${count}`);

// 3. Real submission through the browser UI
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base + "/contact", { waitUntil: "networkidle" });
await page.fill("#cf-name", "Abebe Kebede");
await page.fill("#cf-email", "abebe@example.et");
await page.fill("#cf-org", "Test Org <b>PLC</b>");
await page.fill("#cf-phone", "+251 900 000 000");
await page.selectOption("#cf-interest", "ERP Solutions");
await page.fill("#cf-message", "We would like an Odoo ERP for our factory.\nPlease call us.");
await page.click("button[type=submit]");
await page.waitForSelector(".contact-form__success", { timeout: 15000 }).catch(() => {});
const success = await page.locator(".contact-form__success").count();
log(success === 1, `UI shows success message (page errors: ${errors.length})`);
await page.screenshot({ path: "/tmp/out-success.png" });
await browser.close();

await new Promise((s) => setTimeout(s, 1000));
const msgs = (await (await fetch(hog)).json()).items;
const m = msgs[0];
if (!m) log(false, "email received by SMTP server");
else {
  const h = m.Content.Headers;
  const to = (h.To || []).join(","), from = (h.From || []).join(","), rt = (h["Reply-To"] || []).join(","), subj = (h.Subject || []).join(",");
  log(msgs.length === 1, `exactly one email received (${msgs.length})`);
  log(/info@ahadubit\.com/.test(to), `To: ${to}`);
  log(/info@ahadubit\.com/.test(from), `From: ${from}`);
  log(/abebe@example\.et/.test(rt), `Reply-To: ${rt}`);
  log(/Abebe Kebede/.test(subj) && /ERP/.test(subj), `Subject: ${subj}`);
  const raw = m.Raw.Data;
  log(/Odoo ERP for our factory/.test(raw) && /\+251 900 000 000/.test(raw), "body contains message and phone");
  log(!/<b>PLC<\/b>/.test(raw.split("text/html")[1] || ""), "HTML body escapes user input");
}

// 4. Rate limit: same IP, 6th message blocked
let last = 0;
for (let i = 0; i < 6; i++) last = (await post({ name: "R", email: "r@x.com", message: "rate limit test " + i, __ip: "9.9.9.9" })).status;
log(last === 429, `rate limit after 5 messages -> ${last}`);
