const fs = require('fs');
const mongoose = require('mongoose');

function formatToHtml(text) {
  text = text.replace(/^Page \d+\s*\r?\nTerms and Conditions\s*\r?\n?/gm, '\n\n');
  text = text.replace(/^Page \d+\s*$/gm, '\n\n');
  text = text.replace(/^\s*Terms and Conditions\s*$/gm, '\n\n');

  const lines = text.split(/\r?\n/);
  
  let html = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      if (html && !html.endsWith('<br/><br/>')) {
        html += '<br/><br/>';
      }
      continue;
    }

    let isBullet = line.startsWith('•') || line.startsWith('→') || line.match(/^[a-z]\.\s/) || line.match(/^[ivx]+\.\s/);
    let isSubBullet = line.startsWith('o ');
    let isHeading = line.match(/^\d+\.\s+[A-Z]/) || line.match(/^[A-Z\s&]+$/) && line.length > 5;

    if (isHeading) {
      if (html && !html.endsWith('<br/><br/>')) html += '<br/>';
      html += `<div style="font-size:11.5px; font-weight:700; color:#0B5D2A; margin-top:8px; margin-bottom:4px;">${line}</div>`;
    } else if (isBullet) {
      line = line.replace('•', '&bull;');
      html += `<div style="margin-left: 12px; margin-bottom: 2px;">${line}</div>`;
    } else if (isSubBullet) {
      line = line.replace(/^o /, '<span style="font-family: monospace; font-size:10px;">o</span> ');
      html += `<div style="margin-left: 24px; margin-bottom: 2px;">${line}</div>`;
    } else {
      if (html.endsWith('</div>') || html.endsWith('<br/><br/>') || html === '') {
        html += `<span>${line}</span>`;
      } else {
        html += ` <span>${line}</span>`;
      }
    }
  }

  return html;
}

const fileContent = fs.readFileSync('C:\\\\Users\\\\harsh\\\\Documents\\\\curebharat-crm\\\\new_term.txt', 'utf8');
const fileLines = fileContent.split(/\r?\n/);
let rawText = '';
for(let i=401; i<fileLines.length; i++) {
  rawText += fileLines[i] + '\n';
}
rawText = rawText.replace(/^<\/div>\(/, '');
const chunks = rawText.split(/^Page \d+\s*$/gm);

fs.writeFileSync('C:\\\\Users\\\\harsh\\\\Documents\\\\curebharat-crm\\\\chunk0.html', formatToHtml(chunks[0]));
console.log("Written chunk 0");
