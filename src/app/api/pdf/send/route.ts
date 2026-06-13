import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Template from '@/models/Template';
import { emailQueue } from '@/lib/emailQueue';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { customerId, templateId } = await request.json();

    if (!customerId) {
      return NextResponse.json({ success: false, error: 'Customer is required' }, { status: 400 });
    }

    const customer = await Customer.findById(customerId).lean();
    if (!customer) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    let template;
    if (templateId && templateId !== 'auto') {
      template = await Template.findById(templateId).lean();
    } else {
      // Auto-match logic
      const templates = await Template.find().lean();
      const normalize = (str: string) => str.toLowerCase()
        .replace(/^(cb|curebharat)\s*-?\s*/, '')
        .replace(/[^a-z0-9]/g, '');

      const normPlan = normalize(customer.planName || '');
      template = templates.find(t => normalize(t.name) === normPlan) || templates[0];
    }

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found and no auto-match possible' }, { status: 404 });
    }

    if (!customer.email) {
      return NextResponse.json({ success: false, error: 'Customer does not have an email address' }, { status: 400 });
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

// src/app/api/pdf/send/route.ts
// src/app/api/pdf/send/route.ts
    // Queue the job to the robust background processor
    emailQueue.addJob({
      customer,
      template,
      customerData
    });

    // Return immediately to the client
    return NextResponse.json({
      success: true,
      message: "Email queued for background delivery. It will arrive shortly.",
      messageId: 'queued_in_background',
    });
  } catch (error) {
    console.error('Email route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate email task: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
