const fs = require('fs');
const mongoose = require('mongoose');

function parseBlocks(text) {
  text = text.replace(/^Page \d+\s*\r?\nTerms and Conditions\s*\r?\n?/gm, '\n');
  text = text.replace(/^Page \d+\s*$/gm, '\n');
  text = text.replace(/^\s*Terms and Conditions\s*$/gm, '\n');

  const lines = text.split(/\r?\n/);
  
  const blocks = [];
  
  for(let i=0; i<lines.length; i++) {
    let line = lines[i].trim();
    if(!line) continue;
    
    if (line === 'TERMS & CONDITIONS – PROTECTION PLAN (WITH ANNEXURE)') {
      blocks.push({ type: 'subtitle', text: line });
    } else if (line === 'TERMS & CONDITIONS – WELLNESS PLAN') {
      blocks.push({ type: 'subtitle', text: line });
    } else if (line.match(/^\d+\.\s+[A-Z]/) || (line.match(/^[A-Z\s&]+$/) && line.length > 8)) {
      blocks.push({ type: 'heading', text: line });
    } else if (line.match(/^\d+\.\d+\s+[A-Z]/)) {
      blocks.push({ type: 'subheading', text: line });
    } else if (line.startsWith('•')) {
      blocks.push({ type: 'bullet1', text: line.substring(1).trim() });
    } else if (line.startsWith('o ')) {
      blocks.push({ type: 'bullet2', text: line.substring(2).trim() });
    } else if (line.startsWith('→')) {
      blocks.push({ type: 'bullet1', text: line.substring(1).trim(), isArrow: true });
    } else if (line.match(/^[a-z]\.\s/) || line.match(/^[ivx]+\.\s/)) {
      blocks.push({ type: 'bullet1', text: line });
    } else {
      blocks.push({ type: 'text', text: line });
    }
  }
  return blocks;
}

function renderHtml(blocks) {
  let html = '';
  
  let inUl1 = false;
  let inUl2 = false;

  const closeUl2 = () => { if (inUl2) { html += '</ul>'; inUl2 = false; } };
  const closeUl1 = () => { closeUl2(); if (inUl1) { html += '</ul>'; inUl1 = false; } };

  for (let block of blocks) {
    if (block.type !== 'bullet1' && block.type !== 'bullet2') {
      closeUl1();
    }
    
    if (block.type === 'subtitle') {
      html += `
  <div style="font-size:11px; font-weight:700; color:#1E293B; margin-bottom:18px; border-left:4px solid #F07A1F; padding-left:10px; line-height:1.5;">
    ${block.text}
  </div>`;
    } else if (block.type === 'heading') {
      html += `
  <div style="font-size:11px; font-weight:700; color:#0B5D2A; margin-bottom:6px; margin-top:10px;">
    ${block.text}
  </div>`;
    } else if (block.type === 'subheading') {
      html += `
  <div style="font-size:10.5px; font-weight:700; color:#1E293B; margin-bottom:3px; margin-top:8px;">
    ${block.text}
  </div>`;
    } else if (block.type === 'text') {
      html += `
  <div style="margin-bottom:6px; margin-top:0;">${block.text}</div>`;
    } else if (block.type === 'bullet1') {
      closeUl2();
      if (!inUl1) {
        html += `\n<ul style="margin:0 0 12px 18px; padding:0;">`;
        inUl1 = true;
      }
      let bulletChar = block.isArrow ? '→ ' : '';
      html += `\n  <li style="margin-bottom:4px;">${bulletChar}${block.text}</li>`;
    } else if (block.type === 'bullet2') {
      if (!inUl1) {
        html += `\n<ul style="margin:0 0 12px 18px; padding:0; list-style-type:none;">`;
        inUl1 = true;
      }
      if (!inUl2) {
        html += `\n  <ul style="margin:5px 0 6px 18px; padding:0; list-style-type:circle;">`;
        inUl2 = true;
      }
      html += `\n    <li style="margin-bottom:3px;">${block.text}</li>`;
    }
  }
  closeUl1();
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

  const chunks = rawText.split(/^Page \d+\s*$/gm);
  
  for (let i = 0; i < chunks.length; i++) {
    let content = chunks[i];
    
    const blocks = parseBlocks(content);
    const parsedHtml = renderHtml(blocks);

    if (!parsedHtml.trim()) continue;

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
  
  ${pageNum === 1 ? `
  <!-- MAIN TITLE -->
  <div style="
    font-size:20px;
    font-weight:700;
    color:#0B5D2A;
    margin-bottom:10px;
    text-transform:uppercase;
    letter-spacing:0.4px;
  ">
    Terms & Conditions
  </div>` : ''}

  <!-- CONTENT -->
  <div style="
    flex:1;
    font-size:10.5px;
    line-height:1.75;
    color:#334155;
  ">
${parsedHtml}
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

  console.log("Updated template with " + (newPages.length - 4) + " perfectly formatted HTML T&C pages");
  process.exit(0);
}

run().catch(console.error);
