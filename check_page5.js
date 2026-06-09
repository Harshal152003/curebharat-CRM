const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const templateId = new mongoose.Types.ObjectId("6a2691445f91109462c01999");
  const template = await db.collection('templates').findOne({ _id: templateId });
  
  if (template) {
     const html = template.pages[5].sections[0].components[0].props.content;
     console.log("Extracting body content...");
     
     // Quick regex to find content between <body> and </body>
     const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i) || html.match(/<div class="content">([\s\S]*?)<\/div>/i);
     if (bodyMatch) {
         console.log(bodyMatch[1].substring(0, 500));
     } else {
         console.log("No body found");
         console.log(html);
     }
  }
  process.exit(0);
}
run();
