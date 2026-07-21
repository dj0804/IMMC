// One-off utility: normalise everything in public/photos to WebP.
//
//   node scripts/to-webp.mjs          → convert, keep originals
//   node scripts/to-webp.mjs --clean  → convert, then delete the originals
//
// Re-runnable: files already in WebP are left alone.

import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = path.resolve('public/photos')
const CLEAN = process.argv.includes('--clean')
const CONVERTIBLE = new Set(['.png', '.jpg', '.jpeg', '.tif', '.tiff', '.avif'])

// The logo needs its alpha channel preserved if it has one; photos do not.
const LOSSLESS = new Set(['logo'])

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

const files = await readdir(DIR)
let saved = 0
let before = 0
let after = 0

for (const file of files.sort()) {
  const ext = path.extname(file).toLowerCase()
  const base = path.basename(file, ext)
  const src = path.join(DIR, file)

  if (ext === '.webp') {
    const { size } = await stat(src)
    before += size
    after += size
    console.log(`  =  ${file.padEnd(24)} already WebP  ${kb(size)}`)
    continue
  }

  if (!CONVERTIBLE.has(ext)) continue

  const out = path.join(DIR, `${base}.webp`)
  const inSize = (await stat(src)).size

  await sharp(src)
    .webp(
      LOSSLESS.has(base)
        ? { lossless: true, effort: 6 }
        : { quality: 82, effort: 6 }
    )
    .toFile(out)

  const outSize = (await stat(out)).size
  before += inSize
  after += outSize
  saved++

  const delta = (((inSize - outSize) / inSize) * 100).toFixed(0)
  console.log(
    `  →  ${file.padEnd(24)} ${kb(inSize).padStart(8)} → ${kb(outSize).padStart(8)}  (−${delta}%)`
  )

  if (CLEAN) await unlink(src)
}

console.log(
  `\n  ${saved} converted · total ${kb(before)} → ${kb(after)} ` +
    `(−${(((before - after) / before) * 100).toFixed(0)}%)` +
    (CLEAN ? ' · originals removed' : ' · originals kept')
)
