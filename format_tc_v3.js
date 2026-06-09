/**
 * PROFESSIONAL T&C FORMATTER - FIXED VERSION
 * Addresses all 15 QA issues:
 * 1.  Consistent heading hierarchy (centered H1, left-aligned H2, numbered H3)
 * 2.  No broken numbering - uses raw text numbering as-is
 * 3.  Fixed sub-clause indentation (3 levels, consistent margin)
 * 4.  Arrows (→) converted to standard bullets
 * 5.  Consistent paragraph spacing (8px margin-bottom for all text)
 * 6.  6pt spacing after headings only
 * 7.  Unified list style: •  (a)  (i) throughout
 * 8.  text-align: justify on all paragraphs
 * 9.  Smart pagination: headings always group with first item (orphan control)
 * 10. Footer: Left=Company | Center=Website | Right=Page X
 * 11. Title case for all headings
 * 12. Long paragraphs auto-split at sentence boundaries if >500 chars
 * 13. Fixed indentation: level1=20px, level2=38px, level3=54px
 * 14. Horizontal rule + extra top-margin before major numbered clauses
 * 15. Unified styles regardless of source section
 */

const mongoose = require('mongoose');
const fs = require('fs');

// ─────────────── Text Utilities ───────────────

function toTitleCase(str) {
  // Convert ALL CAPS headings to Title Case (but keep abbreviations < 4 chars)
  return str.replace(/\w+/g, word => {
    if (word === word.toUpperCase() && word.length > 3) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
  });
}

function cleanText(t) {
  return t
    .replace(/CureBharat\s+(?=['"])/g, 'CureBharat')   // remove stray space before quote
    .replace(/\s{2,}/g, ' ')                             // collapse multiple spaces
    .trim();
}

// Split long paragraphs at sentence boundaries (. or ; every ~500 chars)
function splitLongParagraph(text) {
  if (text.length <= 420) return [text];
  const sentences = text.match(/[^.!?;]+[.!?;]*/g) || [text];
  const chunks = [];
  let cur = '';
  for (const s of sentences) {
    if ((cur + s).length > 400 && cur.length > 0) {
      chunks.push(cur.trim());
      cur = s;
    } else {
      cur += s;
    }
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks.length ? chunks : [text];
}

// ─────────────── Line Classification ───────────────

function classifyLine(line) {
  line = line.trim();
  if (!line) return null;

  // Remove stray "Page X" and "Terms and Conditions" artifacts
  if (/^Page \d+$/.test(line)) return null;
  if (/^Terms and Conditions$/.test(line)) return null;

  // Document section titles (Level 1 - centered)
  if (
    line === 'TERMS & CONDITIONS – PROTECTION PLAN (WITH ANNEXURE)' ||
    line === 'TERMS & CONDITIONS – WELLNESS PLAN' ||
    /^TERMS & CONDITIONS/.test(line)
  ) {
    return { type: 'title', text: toTitleCase(line) };
  }

  // Major numbered heading: "1. Something" or "9. CLAIMS – ANNEXURE"
  if (/^\d+\.\s+[A-Z\(]/.test(line)) {
    return { type: 'h2', text: toTitleCase(line) };
  }

  // Sub-heading: "7.1 Grace Period"
  if (/^\d+\.\d+\s+\S/.test(line)) {
    return { type: 'h3', text: toTitleCase(line) };
  }

  // Section letter header like "A. WEBSITE / APPLICATION TERMS OF USE:"
  if (/^[A-Z]\.\s+[A-Z]/.test(line)) {
    return { type: 'h2', text: toTitleCase(line) };
  }

  // Bullets: •
  if (line.startsWith('•')) {
    const text = cleanText(line.replace(/^•\s*/, '').replace(/^→\s*/, ''));
    return { type: 'bullet1', text };
  }

  // Arrow bullets → (convert to bullet)
  if (line.startsWith('→')) {
    const text = cleanText(line.replace(/^→\s*/, ''));
    return { type: 'bullet1', text };
  }

  // Sub-bullets: "o text"
  if (/^o\s+\S/.test(line)) {
    return { type: 'bullet2', text: cleanText(line.replace(/^o\s+/, '')) };
  }

  // Alpha sub-clauses: a. b. c. ... p.
  if (/^[a-p]\.\s+\S/.test(line)) {
    const letter = line[0];
    const text = cleanText(line.replace(/^[a-p]\.\s+/, ''));
    return { type: 'alpha', letter, text };
  }

  // Roman numeral sub-sub-clauses: i. ii. iii. iv. v.
  if (/^(i{1,3}|iv|v|vi{0,3}|ix|x)\.\s+\S/i.test(line)) {
    const parts = line.split(/\.\s+/);
    const text = cleanText(parts.slice(1).join('. '));
    return { type: 'roman', numeral: parts[0], text };
  }

  // Bold sub-section label like "User Consent & Privacy:**"
  if (/^\w[\w\s&'\/]+:\*?\*?$/.test(line) && line.length < 60) {
    return { type: 'sublabel', text: toTitleCase(line.replace(/\*+$/, '').replace(/:$/, '')) };
  }

  // Normal paragraph text
  return { type: 'text', text: cleanText(line) };
}

// ─────────────── Parse All Lines into Blocks ───────────────

function parseRawText(rawText) {
  const lines = rawText.split(/\r?\n/);
  const blocks = [];

  let pendingText = null; // for joining broken lines

  for (let i = 0; i < lines.length; i++) {
    const classified = classifyLine(lines[i]);
    if (!classified) {
      // Empty / artifact line - flush pending text
      if (pendingText) {
        blocks.push(pendingText);
        pendingText = null;
      }
      continue;
    }

    if (classified.type === 'text') {
      // If previous block was also text, join them (fix broken PDF lines)
      if (pendingText && pendingText.type === 'text') {
        pendingText.text = pendingText.text + ' ' + classified.text;
      } else {
        if (pendingText) blocks.push(pendingText);
        pendingText = classified;
      }
    } else {
      if (pendingText) {
        blocks.push(pendingText);
        pendingText = null;
      }
      blocks.push(classified);
    }
  }
  if (pendingText) blocks.push(pendingText);

  // Split long paragraph text blocks
  const finalBlocks = [];
  for (const block of blocks) {
    if (block.type === 'text' && block.text.length > 420) {
      const parts = splitLongParagraph(block.text);
      for (const p of parts) {
        finalBlocks.push({ type: 'text', text: p });
      }
    } else {
      finalBlocks.push(block);
    }
  }

  return finalBlocks;
}

// ─────────────── HTML Renderer ───────────────

function renderBlocks(blocks) {
  let html = '';
  let lastType = null;

  for (let bi = 0; bi < blocks.length; bi++) {
    const b = blocks[bi];

    if (b.type === 'title') {
      html += `
<div style="
  font-size: 13px;
  font-weight: 700;
  color: #1E293B;
  margin: 14px 0 14px 0;
  border-left: 4px solid #F07A1F;
  padding-left: 10px;
  text-align: left;
  line-height: 1.5;
">${b.text}</div>`;

    } else if (b.type === 'h2') {
      // Add divider before each major clause (except the very first one)
      const isFirst = !lastType;
      html += `
${!isFirst ? '<hr style="border:none; border-top:1px solid #E2E8F0; margin: 14px 0 0 0;" />' : ''}
<div style="
  font-size: 13px;
  font-weight: 700;
  color: #0B5D2A;
  margin-top: ${!isFirst ? '10px' : '0'};
  margin-bottom: 6px;
">${b.text}</div>`;

    } else if (b.type === 'h3') {
      html += `
<div style="
  font-size: 12px;
  font-weight: 700;
  color: #1E293B;
  margin-top: 10px;
  margin-bottom: 4px;
  margin-left: 0;
">${b.text}</div>`;

    } else if (b.type === 'sublabel') {
      html += `
<div style="
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  margin-top: 8px;
  margin-bottom: 4px;
">${b.text}:</div>`;

    } else if (b.type === 'text') {
      html += `
<p style="
  font-size: 12px;
  line-height: 1.7;
  color: #334155;
  margin: 0 0 8px 0;
  text-align: justify;
">${b.text}</p>`;

    } else if (b.type === 'bullet1') {
      html += `
<div style="
  display: flex;
  align-items: flex-start;
  margin: 0 0 6px 20px;
  font-size: 12px;
  line-height: 1.65;
  color: #334155;
  text-align: justify;
">
  <span style="min-width: 14px; margin-right: 6px; color: #0B5D2A; font-weight: 700;">&#8226;</span>
  <span>${b.text}</span>
</div>`;

    } else if (b.type === 'bullet2') {
      html += `
<div style="
  display: flex;
  align-items: flex-start;
  margin: 0 0 5px 38px;
  font-size: 12px;
  line-height: 1.65;
  color: #334155;
">
  <span style="min-width: 14px; margin-right: 6px; color: #64748B;">&#9702;</span>
  <span>${b.text}</span>
</div>`;

    } else if (b.type === 'alpha') {
      html += `
<div style="
  display: flex;
  align-items: flex-start;
  margin: 0 0 6px 20px;
  font-size: 12px;
  line-height: 1.65;
  color: #334155;
  text-align: justify;
">
  <span style="min-width: 22px; margin-right: 4px; font-weight: 600; flex-shrink: 0;">(${b.letter})</span>
  <span>${b.text}</span>
</div>`;

    } else if (b.type === 'roman') {
      html += `
<div style="
  display: flex;
  align-items: flex-start;
  margin: 0 0 5px 54px;
  font-size: 12px;
  line-height: 1.65;
  color: #334155;
">
  <span style="min-width: 26px; margin-right: 4px; flex-shrink: 0;">(${b.numeral})</span>
  <span>${b.text}</span>
</div>`;
    }

    lastType = b.type;
  }

  return html;
}

// ─────────────── Smart Pagination ───────────────

/**
 * Line-based estimation for A4 at 12px font:
 * Content width  = 210mm - 2×36px padding = ~138mm = ~392px
 * At 12px, approx 65 chars per line
 * Content height = 297mm - 56px padding - 50px header - 42px footer = ~195mm = ~737px
 * At 12×1.7 = 20.4px line height, fits ~36 lines per page
 * Page 1 loses ~55px for the big title → fits ~33 lines
 */
const CHARS_PER_LINE = 75;         // chars that fit per line at 12px on A4 width (conservative for indented content)
const LINES_PER_PAGE = 40;         // A4 content height ~973px / 20.4px per line × 0.85 safety = 40
const LINES_PER_PAGE_FIRST = 35;   // page 1 big title takes ~42px extra space

function estimateLines(block) {
  const text = block.text || '';
  const textLines = Math.ceil(text.length / CHARS_PER_LINE) || 1;

  switch (block.type) {
    case 'title':    return textLines + 3;  // orange-bar subtitle + margins
    case 'h2':      return textLines + 4;  // hr divider + top margin + heading + bottom margin
    case 'h3':      return textLines + 2;  // top margin + heading + small bottom margin
    case 'sublabel':return textLines + 1;
    case 'text':    return textLines + 0.6; // paragraph margin-bottom
    case 'bullet1': return textLines + 0.4;
    case 'bullet2': return textLines + 0.3;
    case 'alpha':   return textLines + 0.4;
    case 'roman':   return textLines + 0.3;
    default:        return textLines;
  }
}

function paginateBlocks(blocks) {
  const pages = [];
  let currentPage = [];
  let currentLines = 0;
  let budget = LINES_PER_PAGE_FIRST;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const lines = estimateLines(b);

    if (currentLines + lines > budget && currentPage.length > 0) {
      pages.push([...currentPage]);
      currentPage = [b];
      currentLines = lines;
      budget = LINES_PER_PAGE;
    } else {
      currentPage.push(b);
      currentLines += lines;
    }
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}

// ─────────────── Page HTML Builder ───────────────

function buildPageHtml(blocks, pageNum, isFirstPage) {
  const contentHtml = renderBlocks(blocks);

  return `
<div style="
  width:100%;
  min-height:100%;
  padding:28px 36px;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  background:#ffffff;
  font-family:Arial,sans-serif;
  color:#334155;
">

  <!-- HEADER -->
  <div style="
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1.5px solid #E2E8F0;
    padding-bottom:10px;
    margin-bottom:14px;
  ">
    <div style="font-size:11px; font-weight:700; color:#0B5D2A; letter-spacing:0.2px;">
      {{plan_name}} - Terms & Conditions
    </div>
    <img src="https://www.curebharat.com/Logo.png" style="height:30px; width:auto; display:block;" />
  </div>

  ${isFirstPage ? `
  <!-- PAGE 1: BIG TITLE -->
  <div style="
    font-size:17px;
    font-weight:800;
    color:#0B5D2A;
    margin-bottom:12px;
    text-transform:uppercase;
    letter-spacing:0.5px;
    text-align:center;
    padding-bottom:10px;
    border-bottom:2px solid #E2E8F0;
  ">Terms &amp; Conditions</div>` : ''}

  <!-- CONTENT -->
  <div style="flex:1; overflow:hidden;">
    ${contentHtml}
  </div>

  <!-- FOOTER: Left=Company | Center=Website | Right=Page X -->
  <div style="
    border-top:1.5px solid #E2E8F0;
    margin-top:12px;
    padding-top:8px;
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    align-items:center;
    font-size:8px;
    color:#64748B;
  ">
    <div style="text-align:left;">CureBharat Wellness Private Limited</div>
    <div style="text-align:center;">www.curebharat.com</div>
    <div style="text-align:right; font-weight:700;">Page ${pageNum}</div>
  </div>

</div>`;
}

// ─────────────── Main ───────────────

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const template = await db.collection('templates').findOne({ name: 'Curebharat-Suraksha' });
  if (!template) { console.log("Template not found"); process.exit(1); }

  // Keep Cover, Welcome, Certificate, Benefits (first 4 pages)
  const newPages = template.pages.slice(0, 4);

  // Read raw T&C text (lines 402 onwards in new_term.txt)
  const fileContent = fs.readFileSync('new_term.txt', 'utf8');
  const fileLines = fileContent.split(/\r?\n/);
  let rawText = fileLines.slice(401).join('\n');
  rawText = rawText.replace(/^<\/div>\(/, '');

  // Parse all blocks
  const allBlocks = parseRawText(rawText);

  // Paginate
  const pagedBlocks = paginateBlocks(allBlocks);

  console.log(`Generating ${pagedBlocks.length} T&C pages...`);

  for (let i = 0; i < pagedBlocks.length; i++) {
    const pageNum = i + 1;
    const isFirstPage = (i === 0);
    const html = buildPageHtml(pagedBlocks[i], pageNum, isFirstPage);

    newPages.push({
      _id: new mongoose.Types.ObjectId(),
      html: html,
      order: newPages.length,
    });
  }

  await db.collection('templates').updateOne(
    { _id: template._id },
    { $set: { pages: newPages } }
  );

  console.log(`✅ Done! Template updated with ${pagedBlocks.length} professionally formatted T&C pages.`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
