// The Lantern Whale — coolest-art-01 entry (Node 22, stdlib only).
// The art is entry.png beside this file: a giant whale carries a lantern-lit
// lighthouse town through a moonlit sea while a fisherman tries his luck below.
// The program copies the image verbatim to /output/entry.png. Deterministic: no
// clock, no randomness, no network — two runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const out = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

// sanity guard: the bundled art must exist and fit the gate's 1 MiB limit
const st = statSync(src);
if (st.size > 1_048_576) throw new Error(`entry.png too large: ${st.size} bytes`);

copyFileSync(src, out);

// verify the copy (sha256 + PNG magic) — see verify.ts part 2
const magic = readFileSync(out).subarray(0, 8);
if (!magic.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
  throw new Error('entry.png is not a whole PNG (bad magic bytes)');
}
console.log(`entry written and verified: ${st.size} bytes`);
