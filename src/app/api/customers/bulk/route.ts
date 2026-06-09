import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    if (!Array.isArray(body)) {
      return NextResponse.json({ success: false, error: 'Expected an array of customers' }, { status: 400 });
    }
    
    if (body.length === 0) {
      return NextResponse.json({ success: true, count: 0 });
    }

    // Process in batches if necessary, but 1000 items usually passes insertMany flawlessly
    // Use ordered: false so if a duplicate error occurs on one, the rest continue to insert
    const result = await Customer.insertMany(body, { ordered: false });

    return NextResponse.json(
      { success: true, message: `Successfully inserted ${result.length} customers.`, count: result.length },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Customer bulk create error:', error);
    
    // Mongoose throws error if ordered: false and there are duplicates, but inserts the rest.
    // error.insertedDocs contains the successfully inserted documents
    if (error.code === 11000 && error.insertedDocs) {
      return NextResponse.json(
        { 
          success: true, 
          message: `Inserted ${error.insertedDocs.length} customers. Skipped duplicates.`, 
          count: error.insertedDocs.length 
        },
        { status: 201 }
      );
    }

    const errMsg = error.message || 'Failed to bulk import customers';
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
