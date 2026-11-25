// Weirdest Job Title: Blind Judge Showdown
// Writes one job title (60 chars max) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "Professional Mourner for Strangers' Goldfish Funerals";

function validateTitle(title: string): string {
  const trimmed = title.trim();
  if (trimmed.length < 1 || trimmed.length > 60) {
    throw new Error(`title must be 1-60 chars, got ${trimmed.length}`);
  }
  if (!/\S/.test(trimmed)) {
    throw new Error("title must not be only whitespace");
  }
  // A job title is a single line: no newlines, and at least two words
  // so it reads like a real role, not a lone word.
  if (/[\r\n]/.test(trimmed)) {
    throw new Error("title must be a single line");
  }
  if (trimmed.split(/\s+/).length < 2) {
    throw new Error("title must contain at least two words");
  }
  return trimmed;
}

const title = validateTitle(TITLE);
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), title, "utf8");
console.log(title);
