const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const templateId = new mongoose.Types.ObjectId("6a2691445f91109462c01999");
  const template = await db.collection('templates').findOne({ _id: templateId });
  
  if (!template) {
    console.log("Template not found.");
    process.exit(1);
  }

  const newPage = {
    pageIndex: 2, // Will be inserted at index 2
    pageType: 'certificate',
    title: 'Certificate',
    background: { type: 'color', value: '#ffffff', opacity: 1, overlay: '' },
    watermark: { enabled: false, type: 'text', value: '', opacity: 0.1, rotation: -30, size: '200px', repeat: false },
    header: { enabled: true, height: '80px', logo: '', companyName: 'CureBharat', website: 'www.curebharat.com', address: '', contactDetails: '', backgroundColor: '#ffffff', textColor: '#333333' },
    footer: { enabled: true, height: '60px', showPageNumbers: true, companyDetails: '', legalText: '', backgroundColor: '#1a5c2e', textColor: '#ffffff' },
    sections: [],
    showGlobalHeader: true,
    showGlobalFooter: true,
    showGlobalWatermark: true,
  };

  const pages = template.pages || [];
  
  // Insert at index 2 (After Welcome Page)
  pages.splice(2, 0, newPage);
  
  pages.forEach((page, i) => {
    page.pageIndex = i;
  });

  await db.collection('templates').updateOne(
    { _id: templateId },
    { $set: { pages: pages, pageCount: pages.length } }
  );

  console.log("Successfully inserted Certificate Page at index 2");
  process.exit(0);
}
run();
