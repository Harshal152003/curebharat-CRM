import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Template from '@/models/Template';
import GeneratedPdf from '@/models/GeneratedPdf';
import { buildFullHtml } from '@/lib/htmlBuilder';
import { generatePdfFromHtml } from '@/lib/pdfEngine';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { customerId, templateId } = await request.json();

    if (!customerId || !templateId) {
      return NextResponse.json({ success: false, error: 'Customer and template are required' }, { status: 400 });
    }

    const [customer, template] = await Promise.all([
      Customer.findById(customerId).lean(),
      Template.findById(templateId).lean(),
    ]);

    if (!customer) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }
    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
    }

    // Build HTML from template + customer data
    const html = buildFullHtml(template.pages || [], customer as unknown as import('@/types').ICustomer);

    // Generate PDF
    const pdfBuffer = await generatePdfFromHtml(html);

    // Save record
    const fileName = `${customer.memberName.replace(/\s+/g, '-')}_${template.name.replace(/\s+/g, '-')}_${Date.now()}.pdf`;

    // For now, return PDF directly. In production, upload to Cloudinary
    const record = await GeneratedPdf.create({
      customerId: customer._id,
      templateId: template._id,
      customerName: customer.memberName,
      templateName: template.name,
      pdfUrl: '', // Will be set after upload
      fileName,
      fileSize: pdfBuffer.length,
      generatedBy: 'admin',
    });

    // Return PDF as downloadable response
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'X-PDF-Record-Id': record._id.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { success: false, error: 'PDF generation failed: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
