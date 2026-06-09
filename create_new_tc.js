const mongoose = require('mongoose');
const fs = require('fs');

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const template = await db.collection('templates').findOne({ name: 'Curebharat-Suraksha' });
  if (!template) {
    console.log("Template not found");
    process.exit(1);
  }

  // Keep Cover Page (0), Welcome Page (1), Certificate (2), Benefits Page (3)
  const newPages = template.pages.slice(0, 4);

  // Read the raw text
  const fileContent = fs.readFileSync('C:\\\\Users\\\\harsh\\\\Documents\\\\curebharat-crm\\\\new_term.txt', 'utf8');
  const lines = fileContent.split(/\r?\n/);
  
  let rawText = '';
  for(let i=401; i<lines.length; i++) {
    rawText += lines[i] + '\n';
  }
  rawText = rawText.replace(/^<\/div>\(/, '');

  // Clean up "Terms and Conditions" and "Page X"
  // Wait, if we split by "Page X", we don't need to replace it because split removes it.
  const chunks = rawText.split(/^Page \d+\s*$/gm);
  
  for (let i = 0; i < chunks.length; i++) {
    let content = chunks[i];
    // Remove "Terms and Conditions" line which appears at the top of each page
    content = content.replace(/^\s*Terms and Conditions\s*$/gm, '');
    content = content.trim();

    if (!content) continue;

    // Convert • to bullet
    content = content.replace(/•/g, '&bull;');

    const pageNum = i + 1; // T&C pages start at 1 for their own numbering
    
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
  </div>

  <!-- CONTENT -->
  <div style="
    flex:1;
    font-size:10.5px;
    line-height:1.75;
    color:#334155;
    white-space: pre-wrap;
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

  console.log("Updated template with " + (newPages.length - 4) + " new T&C pages");
  process.exit(0);
}

run().catch(console.error);
