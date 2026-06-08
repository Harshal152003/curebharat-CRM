const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const templateId = new mongoose.Types.ObjectId("6a2691445f91109462c01999");
  const template = await db.collection('templates').findOne({ _id: templateId });
  
  console.log("Pages:", template.pages.map((p, i) => `${i}: ${p.title} (${p.pageType})`));
  process.exit(0);
}
run();
