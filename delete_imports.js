const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;
  
  // Find the last 10 customers based on createdAt
  const last10 = await db.collection('customers').find().sort({createdAt: -1}).limit(10).toArray();
  
  if (last10.length === 0) {
    console.log("No customers found.");
    process.exit(0);
  }
  
  console.log("Found the following latest 10 customers:");
  last10.forEach(c => console.log(`- ${c.memberName} (Member ID: ${c.memberId})`));

  const idsToDelete = last10.map(c => c._id);
  const res = await db.collection('customers').deleteMany({ _id: { $in: idsToDelete } });
  
  console.log('Successfully deleted ' + res.deletedCount + ' customers.');
  process.exit(0);
}
run();
