import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    const skip = (page - 1) * limit;

    // Build filter
    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { memberName: { $regex: search, $options: 'i' } },
        { memberId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const [customers, total] = await Promise.all([
      Customer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Customer.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: customers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Customer list error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    
    // Check for existing email, phone, or memberId
    const existing = await Customer.findOne({
      $or: [
        { email: body.email },
        { phone: body.phone },
        { memberId: body.memberId }
      ]
    });

    if (existing) {
      let field = 'A record';
      if (existing.email === body.email) field = 'Email';
      else if (existing.phone === body.phone) field = 'Phone number';
      else if (existing.memberId === body.memberId) field = 'Member ID';
      
      return NextResponse.json(
        { success: false, error: `${field} already exists in the system` },
        { status: 400 }
      );
    }

    const customer = await Customer.create(body);

    return NextResponse.json(
      { success: true, data: customer },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Customer create error:', error);
    const errMsg = error instanceof Error ? error.message : 'Failed to create customer';
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
