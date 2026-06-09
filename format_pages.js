const mongoose = require('mongoose');

const getWrapper = (content, pageNum) => `
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

    <img
      src="https://www.curebharat.com/Logo.png"
      style="
        height:30px;
        width:auto;
        display:block;
      "
    />

  </div>

  <!-- CONTENT -->
  <div style="
    flex:1;
    font-size:10.5px;
    line-height:1.75;
    color:#334155;
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

</div>
`;

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const templateId = new mongoose.Types.ObjectId("6a2691445f91109462c01999");
  const template = await db.collection('templates').findOne({ _id: templateId });
  
  if (!template) process.exit(1);

  const pages = template.pages;
  
  // Starting from index 5 (which is the 2nd T&C page)
  for (let i = 5; i < pages.length; i++) {
    if (pages[i].pageType !== 'terms') continue;
    
    const component = pages[i].sections[0]?.components[0];
    if (!component || component.type !== 'text') continue;
    
    let html = component.props.content || '';
    
    // Extract body content
    const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
       html = bodyMatch[1];
    }
    
    // Remove the old hardcoded header like <div class="page-header"...>Terms and Conditions </div>
    html = html.replace(/<div class="page-header"[\s\S]*?<\/div>/ig, '');
    // Remove old footer if exists
    html = html.replace(/<div class="page-footer"[\s\S]*?<\/div>/ig, '');
    
    // Re-style h3 to match the new design
    html = html.replace(/<h3>/g, '<div style="font-size:11px;font-weight:700;color:#0B5D2A;margin-bottom:6px;margin-top:10px;">');
    html = html.replace(/<\/h3>/g, '</div>');
    
    // Re-style ul to match the new design
    html = html.replace(/<ul>/g, '<ul style="margin:0 0 12px 18px;padding:0;">');
    html = html.replace(/<li>/g, '<li style="margin-bottom:4px;">');
    
    // Apply new wrapper
    // The first T&C page is Page 1, so index 5 is Page 2.
    const pageNum = (i - 4) + 1; 
    
    const newHtml = getWrapper(html, pageNum);
    
    pages[i].showGlobalHeader = false;
    pages[i].showGlobalFooter = false;
    pages[i].sections[0].style.padding = '0px';
    component.props.content = newHtml;
  }

  await db.collection('templates').updateOne(
    { _id: templateId },
    { $set: { pages: pages } }
  );

  console.log("Successfully formatted all Terms & Conditions pages!");
  process.exit(0);
}
run();
