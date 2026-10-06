/**
 * Brand asset pipeline.
 *
 * Source of truth is `src/assets/brand/PTCA.png` - the crest PTCA supplied
 * (transparent PNG, already trimmed to its artwork). Everything else is derived
 * from it so there is exactly one logo.
 *
 * Outputs
 *   logo.png              512px full crest -> schema.org logo
 *   logo-mark.png         512px emblem     -> favicon / small placements
 *   favicon-32.png        32px emblem
 *   apple-touch-icon.png  180px emblem
 *   og-default.png        1200x630 share card
 *
 * Run: npm run assets
 */
import sharp from 'sharp';
import { readFile, unlink } from 'node:fs/promises';

const PUB = 'public';
const SOURCE = 'src/assets/brand/PTCA.png';

/** Drop artefacts from the previous (white-canvas JPEG) pipeline. */
for (const stale of [
  `${PUB}/ptcalogo.jpeg`,
  `${PUB}/logo-full.svg`,
  `${PUB}/logo-mark.svg`,
]) {
  await unlink(stale).catch(() => {});
}

// The supplied crest is already edge-trimmed with an alpha channel, so a light
// deframer trim is enough to guarantee nothing is clipped.
const source = sharp(await readFile(SOURCE)).trim({ threshold: 2 });

const { width, height } = await source
  .clone()
  .png({ compressionLevel: 9 })
  .toBuffer({ resolveWithObject: true })
  .then((result) => result.info);

/** Re-encode the trimmed crest at full fidelity for downstream steps. */
const crest = async () =>
  sharp(await readFile(SOURCE)).trim({ threshold: 2 }).png({ compressionLevel: 9 }).toBuffer();

console.log(`source artwork: ${width} x ${height}`);

// --- Full crest --------------------------------------------------------------
await sharp(await crest())
  .resize({ width: 512 })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(`${PUB}/logo.png`);
console.log('created', `${PUB}/logo.png`);

// --- Emblem (favicon source) ------------------------------------------------
// Favicons need the mark to fill the tile, so the wide laurel wreath is cropped
// slightly on the left/right where it would otherwise look lost at 32px.
const emblem = await sharp(await crest())
  .resize({ width: 512 })
  .png()
  .toBuffer();

await sharp(emblem).toFile(`${PUB}/logo-mark.png`);
console.log('created', `${PUB}/logo-mark.png`);

await sharp(emblem)
  .resize({ width: 32 })
  .png({ compressionLevel: 9 })
  .toFile(`${PUB}/favicon-32.png`);

await sharp(emblem)
  .resize({ width: 180 })
  .png({ compressionLevel: 9 })
  .toFile(`${PUB}/apple-touch-icon.png`);
console.log('created', `${PUB}/favicon-32.png`, `${PUB}/apple-touch-icon.png`);

// --- Open Graph card (1200x630) ------------------------------------------
// The crest is a transparent PNG, so the card keeps a light background and the
// logo composites cleanly with no white box around it.
const background = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#FFFFFF"/>
    <circle cx="1090" cy="120" r="240" fill="#EAF7EF"/>
    <circle cx="150" cy="640" r="200" fill="#F5F8F6"/>
    <rect x="0" y="540" width="1200" height="90" fill="#22A74A"/>
  </svg>`);

const overlay = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <g font-family="Helvetica, Arial, sans-serif">
      <text x="380" y="392" font-size="52" font-weight="bold" fill="#111417">
        Prime Tax &amp; Corporate Academy
      </text>
      <text x="380" y="448" font-size="27" fill="#5F6B76">
        Practical tax &amp; corporate training in Karachi, Pakistan
      </text>
      <text x="380" y="504" font-size="25" font-weight="bold" fill="#22A74A" letter-spacing="2">
        Learn. Practice. Progress.
      </text>
      <text x="70" y="598" font-size="24" fill="#FFFFFF">ptcapakistan.pk  ·  +92 310 5070070</text>
    </g>
  </svg>`);

const logo = await sharp(emblem).resize({ height: 280 }).png().toBuffer();

await sharp(background)
  .composite([
    { input: logo, left: 60, top: 45 },
    { input: overlay, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(`${PUB}/og-default.png`);

console.log('created', `${PUB}/og-default.png`);