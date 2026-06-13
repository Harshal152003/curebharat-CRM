import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Template from '@/models/Template';
import GeneratedPdf from '@/models/GeneratedPdf';
import { buildFullHtml } from '@/lib/htmlBuilder';
import { generatePdfFromHtml } from '@/lib/pdfEngine';
import { getPdfSafeTemplatePages } from '@/lib/templatePdfPages';

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

    // --- FETCH KYC DATA FROM GBM BACKEND ---
    let gbmKycData: any = {};
    try {
      const gbmApiUrl = process.env.GBM_BACKEND_URL || 'https://gbm-cure-bharat-backend.vercel.app';
      const kycResponse = await fetch(`${gbmApiUrl}/api/public/kyc/policy/${customer.memberId}`);
      if (kycResponse.ok) {
        const kycJson = await kycResponse.json();
        if (kycJson.success && kycJson.data && kycJson.data.kycData) {
          const kyc = kycJson.data.kycData;
          gbmKycData = {
            gender: kyc.gender || customer.gender,
            dob: kyc.dob || customer.dob,
            address: `${kyc.addressLine1 || ''} ${kyc.addressLine2 || ''} ${kyc.city || ''} ${kyc.state || ''} ${kyc.pincode || ''}`.trim().replace(/\s+/g, ' ') || customer.address,
            nomineeName: kyc.nomineeName || customer.nomineeName,
            nomineeDob: kyc.nomineeDOB || customer.nomineeDob,
            relationship: kyc.nomineeRelation || customer.relationship,
          };
        }
      }
    } catch (err) {
      console.error('[Generate PDF] Error fetching GBM KYC data:', err);
    }

    const finalPlanName = template.name || customer.planName || '';
    
    // Map the plan names to their actual prices
    let coveragePrice = 0;
    if (finalPlanName.includes('Suraksha Special')) coveragePrice = 1499;
    else if (finalPlanName.includes('Super Suraksha')) coveragePrice = 1999;
    else if (finalPlanName.includes('Sampoorna Suraksha Premium')) coveragePrice = 4999;
    else if (finalPlanName.includes('Sampoorna Suraksha Plus')) coveragePrice = 3999;
    else if (finalPlanName.includes('Sampoorna Suraksha')) coveragePrice = 2999;
    else if (finalPlanName.includes('Curebharat-Suraksha')) coveragePrice = 999;

    let membersCovered = '1';
    const normalizedPlan = finalPlanName.toLowerCase();
    if (normalizedPlan.includes('sampoorna suraksha premium') || normalizedPlan.includes('sampoorna suraksha plus')) {
      membersCovered = 'Self + Spouse + 2 Children + 2 Parents';
    } else if (normalizedPlan.includes('suraksha special') || normalizedPlan.includes('sampoorna suraksha')) {
      membersCovered = 'Self + Spouse + 2 Children';
    } else if (normalizedPlan.includes('curebharat-suraksha') || normalizedPlan.includes('cb-suraksha')) {
      membersCovered = '2A+2C';
    }

    const customerData = {
      ...(customer as any),
      planName: finalPlanName,
      coveragePrice: coveragePrice,
      membersCovered: membersCovered,
      ...gbmKycData
    };

    const pdfPages = getPdfSafeTemplatePages(
      template.name,
      (template.pages || []) as unknown as import('@/types').ITemplatePage[]
    );
    const html = buildFullHtml(pdfPages, customerData as unknown as import('@/types').ICustomer);

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
