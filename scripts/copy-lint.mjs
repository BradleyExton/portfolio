#!/usr/bin/env node
/**
 * copy-lint — deterministic voice gate for user-facing copy.
 *
 * Enforces the mechanical tier of VOICE.frontend.md over src/copy/** and any
 * colocated copy.ts files under src/features/**:
 *
 *   errors (exit 1):
 *     - em dash (—) or en dash (–) anywhere in a copy module
 *     - banned AI-puffery vocabulary
 *     - more than one negative-parallelism construction per file
 *   warnings (reported, exit 0):
 *     - watchlist vocabulary that should be a deliberate choice
 *     - the first negative-parallelism construction in a file
 *
 * Zero dependencies. Run via `npm run lint:copy` (part of `npm run verify`).
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

const BANNED = [
  /\bdelve(?:s|d)?\b/i,
  /\btapestry\b/i,
  /\bsynerg(?:y|ies|istic)\b/i,
  /\bparadigm\b/i,
  /\bunprecedented\b/i,
  /\bgame.chang(?:er|ing)\b/i,
  /\bcutting.edge\b/i,
  /\bgroundbreaking\b/i,
  /\btransformative\b/i,
  /\btestament\b/i,
  /\bpivotal\b/i,
  /\bevolving landscape\b/i,
  /\bin the heart of\b/i,
  /\bnestled\b/i,
  /\bboasts?\b/i,
  /\bseamless(?:ly)?\b/i,
];

const WATCHLIST = [
  /\bleverag(?:e|es|ed|ing)\b/i,
  /\butiliz(?:e|es|ed|ing)\b/i,
  /\bstreamlin(?:e|es|ed|ing)\b/i,
  /\bharness(?:es|ed|ing)?\b/i,
  /\bunlock(?:s|ed|ing)?\b/i,
  /\bunleash(?:es|ed|ing)?\b/i,
  /\belevat(?:e|es|ed|ing)\b/i,
  /\bempower(?:s|ed|ing)?\b/i,
  /\brobust\b/i,
  /\bvibrant\b/i,
  /\bmeticulous(?:ly)?\b/i,
  /\bunderscor(?:e|es|ed|ing)\b/i,
  /\bfoster(?:s|ed|ing)?\b/i,
  /\bgarner(?:s|ed|ing)?\b/i,
  /\bshowcas(?:e|es|ed|ing)\b/i,
  /\bserves? as\b/i,
  /\bfunctions? as\b/i,
];

// "not just X" / "isn't X, it's Y" — capped at one per file (VOICE §2.3).
const NEGATIVE_PARALLELISM =
  /\bnot just\b|\bnot only\b|\b(?:isn't|aren't|it's not)\b[^.!?"]{0,60},\s*(?:it's|they're|but)\b/i;

function collectFiles(dir, isCopyFile, out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      if (entry !== "node_modules") collectFiles(path, isCopyFile, out);
    } else if (isCopyFile(entry)) {
      out.push(path);
    }
  }
  return out;
}

const files = [
  ...collectFiles(join(ROOT, "src", "copy"), (name) => name.endsWith(".ts") && !name.endsWith(".test.ts")),
  ...collectFiles(join(ROOT, "src", "features"), (name) => name === "copy.ts"),
];

const errors = [];
const warnings = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, "utf8").split("\n");
  let parallelismCount = 0;

  lines.forEach((line, i) => {
    const loc = `${rel}:${i + 1}`;

    if (line.includes("—")) errors.push(`${loc}  em dash (use period, comma, colon, or parentheses)`);
    if (line.includes("–")) errors.push(`${loc}  en dash (use a hyphen for ranges)`);

    for (const pattern of BANNED) {
      const match = line.match(pattern);
      if (match) errors.push(`${loc}  banned word "${match[0]}" (VOICE.frontend.md §2)`);
    }
    for (const pattern of WATCHLIST) {
      const match = line.match(pattern);
      if (match) warnings.push(`${loc}  watchlist word "${match[0]}" (deliberate? VOICE.frontend.md §3)`);
    }

    const parallelism = line.match(NEGATIVE_PARALLELISM);
    if (parallelism) {
      parallelismCount += 1;
      if (parallelismCount > 1) {
        errors.push(`${loc}  negative parallelism "${parallelism[0]}" (max one per file, VOICE.frontend.md §2)`);
      } else {
        warnings.push(`${loc}  negative parallelism "${parallelism[0]}" (1 allowed per file; this is it)`);
      }
    }
  });
}

if (warnings.length > 0) {
  console.log(`copy-lint: ${warnings.length} warning(s)`);
  for (const warning of warnings) console.log(`  warn  ${warning}`);
}
if (errors.length > 0) {
  console.error(`copy-lint: ${errors.length} error(s)`);
  for (const error of errors) console.error(`  error ${error}`);
  process.exit(1);
}
console.log(`copy-lint: ${files.length} file(s) clean`);
