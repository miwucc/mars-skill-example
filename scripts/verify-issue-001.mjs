import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const htmlPath = resolve("index.html");
let html;

try {
  html = readFileSync(htmlPath, "utf8");
} catch (error) {
  throw new Error(`index.html must exist for ISSUE-001 verification: ${error.message}`);
}

const checks = [
  {
    name: "renders a text input",
    pass: /<input\b[^>]*(type=["']?(?:search|text)["']?)?[^>]*>/i.test(html),
  },
  {
    name: "renders a search button",
    pass:
      /<button\b[^>]*>[\s\S]*?(搜索|Search)[\s\S]*?<\/button>/i.test(html) ||
      /<button\b[^>]*(aria-label=["']搜索["']|aria-label=["']Search["'])/i.test(html),
  },
  {
    name: "welcome message starts hidden",
    pass:
      /id=["']welcomeMessage["'][\s\S]{0,180}(hidden|aria-hidden=["']true["'])/i.test(html) ||
      /class=["'][^"']*\bis-hidden\b[^"']*["'][\s\S]{0,180}welcome！good job！/i.test(html),
  },
  {
    name: "button click calls showWelcomeMessage",
    pass:
      /addEventListener\(["']click["']\s*,\s*showWelcomeMessage\)/.test(html) ||
      /onclick=["']showWelcomeMessage\(\)["']/i.test(html),
  },
  {
    name: "showWelcomeMessage reveals the fixed message",
    pass:
      /function\s+showWelcomeMessage\s*\(/.test(html) &&
      /welcome！good job！/.test(html) &&
      (/(hidden\s*=\s*false|removeAttribute\(["']hidden["']\)|classList\.remove\(["']is-hidden["']\))/.test(html)),
  },
  {
    name: "does not call backend or external APIs",
    pass: !/\b(fetch|XMLHttpRequest|navigator\.sendBeacon|WebSocket|EventSource)\b/.test(html),
  },
  {
    name: "uses animated gradient glow presentation",
    pass:
      /@keyframes\s+\w+/.test(html) &&
      /(linear-gradient|radial-gradient)/.test(html) &&
      /text-shadow/.test(html) &&
      /(transform|scale|translateY)/.test(html) &&
      /animation/.test(html),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error("ISSUE-001 verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log("ISSUE-001 verification passed.");
