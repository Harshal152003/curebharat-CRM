import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Template from '@/models/Template';
import { buildFullHtml } from '@/lib/htmlBuilder';
import { generatePdfFromHtml } from '@/lib/pdfEngine';
import { getPdfSafeTemplatePages } from '@/lib/templatePdfPages';
import nodemailer from 'nodemailer';

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

    const customerData = {
      ...(customer as any),
      planName: template.name || customer.planName || '',
      ...gbmKycData
    };

    // 1. Build HTML from template + customer data
    const pdfPages = getPdfSafeTemplatePages(
      template.name,
      (template.pages || []) as unknown as import('@/types').ITemplatePage[]
    );
    const html = buildFullHtml(pdfPages, customerData as unknown as import('@/types').ICustomer);

    // 2. Generate PDF
    const pdfBuffer = await generatePdfFromHtml(html);

    // 3. Configure Nodemailer
    // NOTE: These should be in your .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || process.env.SMTP_USER, // Check both for compatibility
        pass: process.env.EMAIL_PASS || process.env.SMTP_PASS, // Check both
      },
    });

    const fileName = `${customer.memberName.replace(/\s+/g, '-')}_Certificate.pdf`;
    const senderEmail = process.env.SENDER_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER;

    // 4. Send Email
    const info = await transporter.sendMail({
      from: `"${process.env.NEXT_PUBLIC_APP_NAME || 'CureBharat'}" <${senderEmail}>`,
      to: customer.email,
      subject: `Your ${template.name} Certificate from CureBharat`,
      text: `Hello ${customer.memberName},\n\nPlease find your generated ${template.name} certificate attached to this email.\n\nBest regards,\nCureBharat Team`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0d7c3e;">Hello ${customer.memberName},</h2>
          <p>We are pleased to share your <strong>${template.name}</strong> certificate with you.</p>
          <p>Please find the PDF document attached to this email for your records.</p>
          <br />
          <p style="color: #666; font-size: 14px;">If you have any questions, please feel free to contact us.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated message from ${process.env.NEXT_PUBLIC_APP_NAME || 'CureBharat CRM'}.</p>
        </div>
      `,
      attachments: [
        {
          filename: fileName,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    console.log('Email sent: %s', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
