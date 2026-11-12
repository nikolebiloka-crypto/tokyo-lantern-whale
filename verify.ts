// Part 2 — revise: verify the copied bytes match the source byte-for-byte before
// declaring success, so a truncated disk or a bad copy can never ship a broken entry.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const a = createHash('sha256').update(readFileSync(src)).digest();
const b = createHash('sha256').update(readFileSync(out)).digest();
if (!a.equals(b)) throw new Error('copy mismatch: output bytes differ from entry.png');

// PNG magic check: the gate reads the first bytes to tell PNG from JPEG.
const magic = Buffer.from(readFileSync(out).subarray(0, 8));
if (!magic.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
  throw new Error('entry.png is not a whole PNG (bad magic bytes)');
}
console.log('verified: byte-identical PNG copy');
