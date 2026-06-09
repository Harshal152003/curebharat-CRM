const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  // Search for the template by name
  const template = await db.collection('templates').findOne({ name: "Curebharat-Suraksha-Backup" });
  
  if (!template) {
    console.log("Template 'Curebharat-Suraksha-Backup' not found.");
    process.exit(1);
  }

  console.log(`Found template with ID: ${template._id}`);

  // Find the index to insert the Certificate page
  let insertIndex = -1;
  for (let i = 0; i < template.pages.length; i++) {
    if (template.pages[i].pageType === 'welcome' || template.pages[i].title.toLowerCase().includes('welcome')) {
      insertIndex = i + 1; // Insert AFTER the welcome page
      break;
    }
  }

  if (insertIndex === -1) {
    console.log("Could not find Welcome page. Inserting at index 1 as fallback.");
    insertIndex = 1;
  }

  console.log(`Inserting Certificate page at index: ${insertIndex}`);

  const newPage = {
    pageIndex: insertIndex,
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
  
  // Insert at the calculated index
  pages.splice(insertIndex, 0, newPage);
  
  pages.forEach((page, i) => {
    page.pageIndex = i;
  });

  await db.collection('templates').updateOne(
    { _id: template._id },
    { $set: { pages: pages, pageCount: pages.length } }
  );

  console.log("Successfully inserted Certificate Page to Curebharat-Suraksha-Backup");
  process.exit(0);
}
run();
