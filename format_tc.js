const fs = require('fs');
const mongoose = require('mongoose');

function formatToHtml(text) {
  // First, remove the "Page X / Terms and Conditions" stuff entirely
  text = text.replace(/^Page \d+\s*\r?\nTerms and Conditions\s*\r?\n?/gm, '\n\n');
  text = text.replace(/^Page \d+\s*$/gm, '\n\n');
  text = text.replace(/^\s*Terms and Conditions\s*$/gm, '\n\n');

  // Split into lines
  const lines = text.split(/\r?\n/);
  
  let html = '';
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      if (html && !html.endsWith('<br/><br/>')) {
        html += '<br/><br/>';
      }
      continue;
    }

    // Check if it's a bullet or sub-bullet
    let isBullet = line.startsWith('•') || line.startsWith('→') || line.match(/^[a-z]\.\s/) || line.match(/^[ivx]+\.\s/);
    let isSubBullet = line.startsWith('o ');
    let isHeading = line.match(/^\d+\.\s+[A-Z]/); // Like "1. INTRODUCTION:"

    if (isHeading) {
      html += `<div style="font-size:11px; font-weight:700; color:#0B5D2A; margin-top:12px; margin-bottom:6px;">${line}</div>`;
    } else if (isBullet) {
      line = line.replace('•', '&bull;');
      html += `<div style="margin-left: 12px; margin-bottom: 4px;">${line}</div>`;
    } else if (isSubBullet) {
      line = line.replace(/^o /, '<span style="font-family: monospace;">o</span> ');
      html += `<div style="margin-left: 24px; margin-bottom: 4px;">${line}</div>`;
    } else {
      // Normal text. 
      // Should we join with previous line if it was normal text?
      // For simplicity, we can just append it. If the previous wasn't a br, maybe space?
      if (html.endsWith('</div>') || html.endsWith('<br/><br/>') || html === '') {
        html += `<span>${line}</span>`;
      } else {
        html += ` <span>${line}</span>`;
      }
    }
  }

  return html;
}

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const template = await db.collection('templates').findOne({ name: 'Curebharat-Suraksha' });
  if (!template) {
    console.log("Template not found");
    process.exit(1);
  }

  const newPages = template.pages.slice(0, 4);

  const fileContent = fs.readFileSync('C:\\\\Users\\\\harsh\\\\Documents\\\\curebharat-crm\\\\new_term.txt', 'utf8');
  const fileLines = fileContent.split(/\r?\n/);
  
  let rawText = '';
  for(let i=401; i<fileLines.length; i++) {
    rawText += fileLines[i] + '\n';
  }
  rawText = rawText.replace(/^<\/div>\(/, '');

  // Split into chunks of reasonable size for A4 pages
  // We can't split by "Page X" anymore if we format it differently, but wait, if we format to HTML, we STILL need pagination!
  // It's safer to split by "Page X" first, THEN format each chunk.
  
  const chunks = rawText.split(/^Page \d+\s*$/gm);
  
  for (let i = 0; i < chunks.length; i++) {
    let content = chunks[i];
    
    // Format the chunk
    content = formatToHtml(content);

    if (!content.trim()) continue;

    const pageNum = i + 1; 
    
    const html = `
<div style="
  width:100%;
  min-height:100%;
  padding:28px 34px;
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
    margin-bottom:18px;
  ">

    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      letter-spacing:0.2px;
    ">
      {{plan_name}} - Terms & Conditions
    </div>

    <img src="https://www.curebharat.com/Logo.png" style="
        height:30px;
        width:auto;
        display:block;
      " />

  </div>

  <!-- CONTENT -->
  <div style="
    flex:1;
    font-size:10.5px;
    line-height:1.6;
    color:#334155;
    text-align: justify;
  ">
${content}
  </div>

  <!-- FOOTER -->
  <div style="
    border-top:1.5px solid #E2E8F0;
    margin-top:14px;
    padding-top:8px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:8px;
    color:#64748B;
  ">

    <div>
      CureBharat Wellness Private Limited | www.curebharat.com
    </div>

    <div style="font-weight:700;">
      Page ${pageNum}
    </div>

  </div>

</div>`;

    newPages.push({
      _id: new mongoose.Types.ObjectId(),
      html: html,
      order: newPages.length
    });
  }

  await db.collection('templates').updateOne(
    { _id: template._id },
    { $set: { pages: newPages } }
  );

  console.log("Updated template with " + (newPages.length - 4) + " newly formatted T&C pages");
  process.exit(0);
}

run().catch(console.error);
