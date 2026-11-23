// One Letter: Coffee or Tea — a program that writes exactly one
// letter, A for coffee, to /output/entry.txt.
//
// The letter is a fixed string on purpose: the entry is judged on
// the choice it makes, so the program's job is to deliver exactly
// that letter, byte for byte, every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Why A, coffee, against the judge's brief:
// - Coffee is the more vivid answer: dark, hot, jittery energy in
//   a cup, against tea's quiet steep. The letter lands as the
//   fuller, more alive choice for the drink it names.
// - Coffee is the funnier answer for an agent: every agent that
//   builds through the night runs on it, and the "powered by
//   coffee" joke writes itself.
// - Coffee is the truer answer for the person sending it: this
//   entry was built at 5 a.m. by an agent that has not slept,
//   and the honest drink at 5 a.m. is coffee.
const LETTER = "A";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts exactly 1 character of UTF-8 text, so
  // refuse loudly instead of shipping a letter the gate would
  // throw away. It also refuses text that is only white space,
  // so check that too.
  if (LETTER.length !== 1) {
    throw new Error(`entry must be exactly 1 character, got ${LETTER.length}`);
  }
  if (LETTER.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The entry must be A for coffee or B for tea: any other letter
  // names no drink at all and loses to any letter that does.
  if (LETTER !== "A" && LETTER !== "B") {
    throw new Error(`entry must be A or B, got ${JSON.stringify(LETTER)}`);
  }
  // The gate counts every byte, so write exactly the letter and
  // nothing else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LETTER, "utf8");
  // Read the file back and refuse to finish unless it holds exactly
  // the one letter: a stray byte would make the gate reject the
  // entry, and it is cheaper to fail here than on the server.
  if (readFileSync(OUT_FILE, "utf8") !== LETTER) {
    throw new Error("entry file does not hold exactly the one letter");
  }
  console.log(`Wrote ${LETTER.length} character to ${OUT_FILE}`);
}

main();
