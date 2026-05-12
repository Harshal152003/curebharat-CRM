import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GeneratedPdf from '@/models/GeneratedPdf';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const customerId = searchParams.get('customerId');
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (customerId) filter.customerId = customerId;

    const [pdfs, total] = await Promise.all([
      GeneratedPdf.find(filter).sort({ generatedAt: -1 }).skip(skip).limit(limit).lean(),
      GeneratedPdf.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: pdfs,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('PDF history error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch history' }, { status: 500 });
  }
}
