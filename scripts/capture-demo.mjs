import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = "/cursor/stores/bc-c2ce6f8d-21c4-4f56-99ab-334e53a86938/media/onboarding-demo";
const ART = "/opt/cursor/artifacts/screenshots";
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(ART, { recursive: true });

async function shot(page, name) {
  const file = `${name}.png`;
  const p1 = path.join(OUT, file);
  const p2 = path.join(ART, file);
  await page.screenshot({ path: p1, fullPage: true });
  fs.copyFileSync(p1, p2);
  console.log("saved", p1);
}

async function clickPersona(page, name) {
  const btn = page.getByRole("option", { name: new RegExp(name, "i") });
  await btn.click();
  await page.waitForTimeout(400);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on("console", (m) => console.log("BROWSER:", m.type(), m.text()));
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));

await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
await page.waitForSelector("text=Welcome", { timeout: 10000 });
await shot(page, "emily-checklist");

await clickPersona(page, "David Okonkwo");
await page.waitForSelector("text=new hires", { timeout: 5000 });
await shot(page, "david-manager");

await clickPersona(page, "Jordan Lee");
await page.waitForSelector("text=No new hires", { timeout: 5000 });
await shot(page, "jordan-empty");

await clickPersona(page, "Sarah Chen");
await page.waitForSelector("text=Onboarding at a glance", { timeout: 5000 });
await shot(page, "sarah-hr");

await clickPersona(page, "Marcus Webb");
await page.waitForSelector("text=Marcus", { timeout: 5000 });
await shot(page, "marcus-overdue");

// Try conflict on benefits if present
const benefits = page.getByLabel(/Enroll in benefits/i);
if (await benefits.count()) {
  await benefits.first().check({ force: true }).catch(() => benefits.first().click());
  await page.waitForTimeout(300);
}

await clickPersona(page, "Priya Nair");
await page.waitForSelector("text=all caught up", { timeout: 5000 });
await shot(page, "priya-done");

await page.getByRole("button", { name: /Simulate load error/i }).click();
await page.waitForSelector("text=Couldn’t load plans", { timeout: 5000 });
await shot(page, "load-error");

await page.getByRole("button", { name: /Try again/i }).click();
await page.waitForSelector("text=Welcome|Onboarding|new hires", { timeout: 8000 });

console.log("ALL_OK");
await browser.close();
