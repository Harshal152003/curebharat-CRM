const mongoose = require('mongoose');

const uri = "mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.useDb('test'); 
    const collection = db.collection('templates');
    const templates = await collection.find({}).toArray();

    for (const t of templates) {
      let pagesStr = JSON.stringify(t.pages);
      let changed = false;

      if (pagesStr.includes('{{email}}')) {
         pagesStr = pagesStr.replace(/flex:\s*1;\s*word-wrap:\s*break-word;"([^>]*>\{\{email\}\})/g, 'flex: 1; word-break: break-all; word-wrap: break-word;"$1');
         changed = true;
      }
      if (pagesStr.includes('{{address}}')) {
         pagesStr = pagesStr.replace(/font-weight:\s*500;([^>]*>\{\{address\}\})/g, 'font-weight: 700;$1');
         changed = true;
      }

      if (changed) {
         const newPages = JSON.parse(pagesStr);
         await collection.updateOne({ _id: t._id }, { $set: { pages: newPages } });
         console.log("Updated", t.name);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
