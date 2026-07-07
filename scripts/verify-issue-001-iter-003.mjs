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
  // AC-001: search box and button exist
  {
    name: "AC-001: renders a text input",
    pass: /<input\b[^>]*(type=["']?(?:search|text)["']?)?[^>]*>/i.test(html),
  },
  {
    name: "AC-001: renders a search button",
    pass:
      /<button\b[^>]*>[\s\S]*?(搜索|Search)[\s\S]*?<\/button>/i.test(html) ||
      /<button\b[^>]*(aria-label=["']搜索["']|aria-label=["']Search["'])/i.test(html),
  },

  // AC-002: cat animation element above search box
  {
    name: "AC-002: cat element exists (emoji, SVG, or CSS cat)",
    pass:
      /[\u{1F431}\u{1F408}\u{1F639}\u{1F63A}\u{1F63B}\u{1F63C}\u{1F63D}\u{1F63E}\u{1F63F}\u{1F640}]/u.test(html) ||
      /cat/i.test(html) ||
      /svg[\s\S]*cat/i.test(html),
  },

  // AC-003: cat walks horizontally back and forth (CSS animation with translateX or left)
  {
    name: "AC-003: cat has horizontal walk animation",
    pass:
      /@keyframes\s+\w+[\s\S]{0,300}(translateX|left|right)/i.test(html) &&
      /animation[\s\S]{0,100}(alternate|infinite)/i.test(html),
  },

  // AC-004: no persistence on page refresh (animation auto-starts, no state check)
  {
    name: "AC-004: cat animation does not depend on localStorage or sessionStorage",
    pass: !/\b(localStorage|sessionStorage)\b/.test(html),
  },

  // AC-005: no cookies or backend state
  {
    name: "AC-005: no cookie or backend persistence",
    pass: !/\b(document\.cookie|fetch|XMLHttpRequest)\b/.test(html),
  },

  // AC-007: existing welcome message still works
  {
    name: "AC-007: search button click reveals welcome message",
    pass:
      /addEventListener\(["']click["']\s*,\s*showWelcomeMessage\)/.test(html) ||
      /onclick=["']showWelcomeMessage\(\)["']/i.test(html),
  },
  {
    name: "AC-007: showWelcomeMessage reveals fixed message",
    pass:
      /function\s+showWelcomeMessage\s*\(/.test(html) &&
      /welcome！good job！/.test(html) &&
      (/(hidden\s*=\s*false|removeAttribute\(["']hidden["']\)|classList\.remove\(["']is-hidden["']\))/.test(html)),
  },

  // AC-008: no external resources
  {
    name: "AC-008: does not call backend or external APIs",
    pass: !/\b(fetch|XMLHttpRequest|navigator\.sendBeacon|WebSocket|EventSource)\b/.test(html),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error("ISSUE-001 iteration-0.0.3 verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log("ISSUE-001 iteration-0.0.3 verification passed.");
