import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';

export async function GET() {
  try {
    await dbConnect();
    const templates = await Template.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error('Template list error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const template = await Template.create(body);
    return NextResponse.json({ success: true, data: template }, { status: 201 });
  } catch (error: unknown) {
    console.error('Template create error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to create template';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
