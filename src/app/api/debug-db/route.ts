import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  const premium = await Template.findOne({ name: 'CureBharat Sampoorna Suraksha Premium' }).lean();
  if (!premium) return NextResponse.json({ success: false, error: 'Premium not found' });

  const templatesToFix = [
    { name: 'CureBharat Sampoorna Suraksha Plus', title: 'Sampoorna Suraksha Plus' },
    { name: 'CureBharat Suraksha Special', title: 'Suraksha Special' },
    { name: 'CureBharat Sampoorna Suraksha', title: 'Sampoorna Suraksha' },
    { name: 'CureBharat Super Suraksha', title: 'Super Suraksha' }
  ];

  let results = [];

  for (const t of templatesToFix) {
    const doc = await Template.findOne({ name: t.name });
    if (!doc) continue;

    // Deep clone the premium pages
    const newPages = JSON.parse(JSON.stringify(premium.pages));

    // Update the cover page title for the specific plan
    for (const page of newPages) {
      if (page.pageType === 'cover') {
        for (const section of page.sections) {
          for (const comp of section.components) {
            if (comp.type === 'text' && comp.props.content) {
              let newContent = comp.props.content;
              newContent = newContent.replace(
                /<div style="color: #0B5D2A; font-family: 'Inter', sans-serif; font-size: \d+px; font-weight: 800; line-height: 1\.2; margin-bottom: 25px; text-transform: uppercase;">(.*?)<\/div>/g,
                `<div style="color: #0B5D2A; font-family: 'Inter', sans-serif; font-size: 44px; font-weight: 800; line-height: 1.2; margin-bottom: 25px; text-transform: uppercase;">${t.title}</div>`
              );
              comp.props.content = newContent;
            }
          }
        }
      }
    }

    doc.pages = newPages;
    doc.pageCount = newPages.length;
    doc.markModified('pages');
    await doc.save();
    results.push(`Updated ${t.name} to ${newPages.length} pages matching Premium layout`);
  }

  return NextResponse.json({ success: true, results });
}
