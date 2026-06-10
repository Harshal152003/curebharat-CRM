const mongoose = require('mongoose');

const uri = "mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(uri);
    
    const db = mongoose.connection.useDb('test'); 
    const templates = await db.collection('templates').find({ name: 'Curebharat-Suraksha' }).toArray();

    if (templates.length > 0) {
      console.log("Template name:", templates[0].name);
      console.log("Pages count:", templates[0].pages.length);
      for (let i=0; i<templates[0].pages.length; i++) {
         console.log(`Page ${i} length: ${templates[0].pages[i].html ? templates[0].pages[i].html.length : 0}`);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
