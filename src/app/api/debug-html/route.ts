import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';
import { buildFullHtml } from '@/lib/htmlBuilder';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const template = await Template.findOne({ name: 'CureBharat Super Suraksha' }).lean();
  if (!template) return NextResponse.json({ success: false });

  const customerData = {
    planName: template.name
  };

  const html = buildFullHtml(template.pages || [], customerData as any);
  
  // extract the cover page text to see what was generated
  const matches = html.match(/<div[^>]*>(CureBharat)<\/div>\s*<div[^>]*>([\s\S]*?)<\/div>/);
  
  return NextResponse.json({ success: true, coverText: matches ? matches[2] : 'Not found', full: html.substring(0, 3000) });
}
