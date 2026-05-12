import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Template from '@/models/Template';
import GeneratedPdf from '@/models/GeneratedPdf';

export async function GET() {
  try {
    await dbConnect();

    const [totalCustomers, activeCustomers, totalTemplates, totalPdfs] =
      await Promise.all([
        Customer.countDocuments(),
        Customer.countDocuments({ status: 'active' }),
        Template.countDocuments({ isActive: true }),
        GeneratedPdf.countDocuments(),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        totalCustomers,
        activeCustomers,
        totalTemplates,
        totalPdfs,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
