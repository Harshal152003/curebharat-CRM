const fs = require('fs');

async function run() {
  const fileContent = fs.readFileSync('C:\\\\Users\\\\harsh\\\\Documents\\\\curebharat-crm\\\\new_term.txt', 'utf8');
  
  // The first 401 lines are the HTML template.
  const lines = fileContent.split(/\r?\n/);
  // line 402 is "}</div>(TERMS & CONDITIONS...". We need to extract the raw text starting there.
  
  let rawText = '';
  for(let i=401; i<lines.length; i++) {
    rawText += lines[i] + '\n';
  }
  
  // Remove the wrapper artifacts if any
  rawText = rawText.replace(/^<\/div>\(/, '');

  // Let's just remove "Page X" and "Terms and Conditions" entirely.
  // Then split by arbitrary character count, or actually split by "Page X".
  // Let's see how many "Page X" are there:
  const pages = rawText.split(/^Page \d+\s*$/gm);
  console.log("Split by ^Page \\d+$ gives:", pages.length, "chunks");
  
  // Since some "Page X" might not be on their own line, let's use a simpler regex:
  const pages2 = rawText.split(/Page \d+\s*Terms and Conditions\s*/g);
  console.log("Split by Page X Terms and Conditions gives:", pages2.length, "chunks");

}
run();
