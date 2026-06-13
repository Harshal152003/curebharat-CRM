import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Template from '@/models/Template';
import { getRequiredFieldsForTemplate, PLACEHOLDER_FIELD_MAP } from '@/lib/templateAnalyzer';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const filterType = searchParams.get('filterType') || 'all';
    
    // New filters
    const planName = searchParams.get('planName') || '';
    const importDate = searchParams.get('importDate') || '';
    const coverageStart = searchParams.get('coverageStart') || '';
    const coverageEnd = searchParams.get('coverageEnd') || '';

    const skip = (page - 1) * limit;

    // Build filter
    const filter: Record<string, unknown> = {};
    const andConditions = [];

    if (search) {
      andConditions.push({
        $or: [
          { memberName: { $regex: search, $options: 'i' } },
          { memberId: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ]
      });
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (planName) {
      filter.planName = { $regex: planName, $options: 'i' };
    }

    if (importDate) {
      const start = new Date(importDate);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(importDate);
      end.setUTCHours(23, 59, 59, 999);
      filter.createdAt = { $gte: start, $lte: end };
    }

    if (coverageStart) {
      filter.planStart = coverageStart;
    }

    if (coverageEnd) {
      filter.planEnd = coverageEnd;
    }

    if (filterType === 'incomplete' || filterType === 'complete') {
      const missingStringValues = ['N/A', 'n/a', '', 'Pending', 'Pending KYC', 'Unknown'];
      const missingDateValues = ['2000-01-01', '1900-01-01', 'N/A', 'n/a', ''];
      
      const templates = await Template.find({}, { name: 1, pages: 1, sections: 1 }).lean();
      
      const planConditions = [];
      
      for (const template of templates) {
        const requiredFields = getRequiredFieldsForTemplate(template);
        if (requiredFields.length === 0) continue;

        const fieldMissingOr = requiredFields.map(field => {
           const isDate = PLACEHOLDER_FIELD_MAP.find(m => m.field === field)?.isDate || false;
           const missingVals = isDate ? missingDateValues : missingStringValues;
           
           if (field === 'coveragePrice') {
              return { $or: [{ coveragePrice: { $in: [0, null, ''] } }, { coveragePrice: { $exists: false } }] };
           }
           if (field === 'membersCovered') {
              return { $or: [{ membersCovered: { $in: [0, null, ''] } }, { membersCovered: { $exists: false } }] };
           }
           return {
             $or: [
               { [field]: { $in: [...missingVals, null] } },
               { [field]: { $exists: false } }
             ]
           };
        });

        // Use regex for flexible matching between customer.planName and template.name
        // E.g., template name "CureBharat Premium Wellness", customer might have "Premium Wellness" or "Curebharat-Premium Wellness"
        // Actually, matching the first 5 chars of the core name usually works, or just regex the template name 
        const coreName = template.name.replace(/^(cb|curebharat)\s*-?\s*/i, '').trim();
        const escapedCoreName = coreName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        planConditions.push({
          $and: [
            { planName: { $regex: new RegExp(escapedCoreName, 'i') } },
            { $or: fieldMissingOr }
          ]
        });
      }

      // Fallback condition: If a customer's plan doesn't match any template (or is completely missing), 
      // we just check if ANY basic field is missing (the old logic)
      const allFields = PLACEHOLDER_FIELD_MAP.map(m => m.field);
      const fallbackMissingOr = allFields.map(field => {
         const isDate = PLACEHOLDER_FIELD_MAP.find(m => m.field === field)?.isDate || false;
         const missingVals = isDate ? missingDateValues : missingStringValues;
         if (field === 'coveragePrice') return { $or: [{ coveragePrice: { $in: [0, null, ''] } }, { coveragePrice: { $exists: false } }] };
         if (field === 'membersCovered') return { $or: [{ membersCovered: { $in: [0, null, ''] } }, { membersCovered: { $exists: false } }] };
         return { $or: [{ [field]: { $in: [...missingVals, null] } }, { [field]: { $exists: false } }] };
      });

      // To apply fallback correctly without catching properly matched ones, we can just say:
      // if NO templates matched, they are incomplete if basic fields are missing.
      // But Mongoose makes it hard to do "if not matched by any previous $and block". 
      // Instead, we just require `planName` to not be empty
      planConditions.push({
         $or: [
            { planName: { $in: [...missingStringValues, null] } },
            { planName: { $exists: false } }
         ]
      });

      if (filterType === 'incomplete') {
        andConditions.push({
          $or: planConditions
        });
      } else if (filterType === 'complete') {
        andConditions.push({
          $nor: planConditions
        });
      }
    }

    if (andConditions.length > 0) {
      filter.$and = andConditions;
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
    
    // Check for existing email, phone, or memberId, ignoring N/A defaults
    const orConditions = [];
    if (body.email && body.email !== 'N/A') orConditions.push({ email: body.email });
    if (body.phone && body.phone !== 'N/A') orConditions.push({ phone: body.phone });
    if (body.memberId && body.memberId !== 'N/A') orConditions.push({ memberId: body.memberId });

    let existing = null;
    if (orConditions.length > 0) {
      existing = await Customer.findOne({ $or: orConditions });
    }

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
