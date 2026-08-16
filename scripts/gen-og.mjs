/**
 * Renders one Open Graph card per project into public/og/.
 *
 * Run locally after adding or renaming a project:
 *   node scripts/gen-og.mjs
 *
 * Deliberately a local one-off rather than a build step: SVG text is rasterized
 * with whatever fonts the machine has, and the CI runner has a different set
 * than a desktop. Generating here and committing the PNGs keeps every card
 * looking the way it was actually reviewed.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(new URL('.', import.meta.url)));
const contentDir = path.join(root, 'src', 'content', 'projects');
const outDir = path.join(root, 'public', 'og');

const WIDTH = 1200;
const HEIGHT = 630;
const MARGIN = 92;
const CONTENT_WIDTH = WIDTH - MARGIN * 2;

const categoryColor = {
  devops: '#60a5fa',
  ml: '#a78bfa',
  data: '#fbbf24',
  web: '#2dd4bf',
  research: '#fb7185',
};

const categoryLabel = {
  de: { devops: 'DevOps', ml: 'Machine Learning', data: 'Data', web: 'Web', research: 'Research' },
  en: { devops: 'DevOps', ml: 'Machine Learning', data: 'Data', web: 'Web', research: 'Research' },
};

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Rough advance width for the heading face; good enough to break lines sensibly. */
const textWidth = (text, fontSize) => text.length * fontSize * 0.545;

function wrap(text, fontSize, maxWidth, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, fontSize) > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = candidate;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);
  return lines;
}

/** Minimal reader for the flat frontmatter this collection uses. */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key] = kv;
    let value = kv[2].trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      continue;
    }
    value = value.replace(/^["']|["']$/g, '');
    data[key] = value === 'true' ? true : value === 'false' ? false : value;
  }
  return data;
}

function buildSvg({ title, category, stack, lang }) {
  const accent = categoryColor[category] ?? '#10b981';
  const titleSize = title.length > 34 ? 66 : 76;
  const lines = wrap(title, titleSize, CONTENT_WIDTH, 3);
  const lineHeight = titleSize * 1.16;
  // Keep the block bottom-anchored so one-line and three-line titles both sit well.
  const titleBaseline = 430 - (lines.length - 1) * lineHeight;

  const stackLine = stack.slice(0, 5).join('  ·  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="-10%" r="80%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a0a"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="0" y="626" width="${WIDTH}" height="4" fill="${accent}"/>
  <g transform="translate(${MARGIN},84)">
    <rect width="72" height="72" rx="14" fill="#111113" stroke="#27272a" stroke-width="2"/>
    <path d="M19 23 L35 36 L19 49" stroke="${accent}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="39" y="45" width="16" height="6" rx="3" fill="${accent}"/>
  </g>
  <text x="${MARGIN + 92}" y="130" font-family="Consolas, Courier New, monospace" font-size="27" letter-spacing="2.5" fill="${accent}">${escapeXml(
    (categoryLabel[lang][category] ?? category).toUpperCase(),
  )}</text>
  ${lines
    .map(
      (line, i) =>
        `<text x="${MARGIN}" y="${titleBaseline + i * lineHeight}" font-family="Segoe UI, Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="#fafafa" letter-spacing="-1.5">${escapeXml(line)}</text>`,
    )
    .join('\n  ')}
  <text x="${MARGIN}" y="502" font-family="Consolas, Courier New, monospace" font-size="26" fill="#71717a">${escapeXml(stackLine)}</text>
  <line x1="${MARGIN}" y1="540" x2="${WIDTH - MARGIN}" y2="540" stroke="#27272a" stroke-width="2"/>
  <text x="${MARGIN}" y="584" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" fill="#a1a1aa">Sebastian Rösch</text>
  <text x="${WIDTH - MARGIN}" y="584" text-anchor="end" font-family="Consolas, Courier New, monospace" font-size="26" fill="#71717a">spla4sh.github.io</text>
</svg>`;
}

const files = (await readdir(contentDir)).filter((f) => f.endsWith('.mdx'));
await mkdir(outDir, { recursive: true });

let written = 0;
for (const file of files) {
  const data = parseFrontmatter(await readFile(path.join(contentDir, file), 'utf8'));
  if (!data?.urlSlug || data.draft === true) continue;

  const svg = buildSvg({
    title: data.title,
    category: data.category,
    stack: data.stack ?? [],
    lang: data.lang,
  });
  const out = path.join(outDir, `${data.lang}-${data.urlSlug}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  written += 1;
  console.log(`  ${path.relative(root, out)}`);
}

console.log(`\n${written} OG cards written.`);
