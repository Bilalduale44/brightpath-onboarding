import { chromium } from "playwright";
import fs from "fs";

const OUT = "/opt/cursor/artifacts";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: OUT, size: { width: 1280, height: 800 } },
});
const page = await context.newPage();

async function clickPersona(name) {
  await page.getByRole("option", { name: new RegExp(name, "i") }).click();
  await page.waitForTimeout(700);
}

await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
await page.waitForSelector("text=Welcome");
await page.waitForTimeout(800);
await clickPersona("David Okonkwo");
await page.waitForSelector("text=new hires");
await page.waitForTimeout(900);
await clickPersona("Jordan Lee");
await page.waitForSelector("text=No new hires");
await page.waitForTimeout(800);
await clickPersona("Sarah Chen");
await page.waitForSelector("text=Onboarding at a glance");
await page.waitForTimeout(700);
await page.getByRole("tab", { name: "Sales" }).click();
await page.waitForTimeout(800);
await clickPersona("Marcus Webb");
await page.waitForTimeout(900);
await clickPersona("Priya Nair");
await page.waitForSelector("text=all caught up");
await page.waitForTimeout(900);
await clickPersona("Emily Park");
await page.waitForTimeout(600);

await context.close();
await browser.close();

const vids = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm"));
const latest = vids.map((f) => ({ f, t: fs.statSync(`${OUT}/${f}`).mtimeMs })).sort((a,b)=>b.t-a.t)[0];
if (latest) {
  const dest = `${OUT}/brightpath_onboarding_walkthrough.webm`;
  fs.renameSync(`${OUT}/${latest.f}`, dest);
  fs.copyFileSync(dest, "/cursor/stores/bc-c2ce6f8d-21c4-4f56-99ab-334e53a86938/media/onboarding-demo/brightpath_onboarding_walkthrough.webm");
  console.log("video", dest);
}
console.log("DONE");
