require('dotenv').config();
const mongoose = require('mongoose');

const fixTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Template = require('./src/models/Template').default;
    
    const templatesToFix = [
      { name: 'CureBharat Sampoorna Suraksha Plus', title: 'Sampoorna Suraksha Plus' },
      { name: 'CureBharat Suraksha Special', title: 'Suraksha Special' },
      { name: 'CureBharat Sampoorna Suraksha', title: 'Sampoorna Suraksha' },
      { name: 'CureBharat Super Suraksha', title: 'Super Suraksha' }
    ];

    for (const t of templatesToFix) {
      const doc = await Template.findOne({ name: t.name });
      if (!doc) continue;

      let updated = false;
      for (const page of doc.pages) {
        if (page.pageType === 'cover') {
          for (const section of page.sections) {
            for (const comp of section.components) {
              if (comp.type === 'text' && comp.props.content) {
                // Replace the double CureBharat placeholder logic with the hardcoded title like the premium template
                let newContent = comp.props.content.replace(
                  /<div style="color: #0B5D2A; font-family: 'Inter', sans-serif; font-size: \d+px; font-weight: 800; line-height: 1.1; margin-bottom: 25px;">\{\{plan_name\}\}<\/div>/g,
                  `<div style="color: #0B5D2A; font-family: 'Inter', sans-serif; font-size: 44px; font-weight: 800; line-height: 1.2; margin-bottom: 25px; text-transform: uppercase;">${t.title}</div>`
                );
                if (newContent !== comp.props.content) {
                  comp.props.content = newContent;
                  updated = true;
                }
              }
            }
          }
        }
      }

      if (updated) {
        await doc.save();
        console.log(`Updated cover page for: ${t.name}`);
      }
    }
    console.log('Done fixing database.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixTemplates();
