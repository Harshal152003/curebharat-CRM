import { buildFullHtml } from '@/lib/htmlBuilder';
import { generatePdfFromHtml } from '@/lib/pdfEngine';
import { getPdfSafeTemplatePages } from '@/lib/templatePdfPages';
import nodemailer from 'nodemailer';

// A simple in-memory queue for processing heavy PDF+Email tasks sequentially
// to prevent Server/Chrome crashes when blasting 800+ requests.
class EmailQueue {
  private queue: any[] = [];
  private isProcessing = false;
  // Limit concurrent Chrome instances to prevent Out of Memory
  private concurrencyLimit = 2;
  private activeCount = 0;

  public addJob(job: any) {
    this.queue.push(job);
    this.processQueue();
  }

  private async processQueue() {
    if (this.activeCount >= this.concurrencyLimit || this.queue.length === 0) {
      return;
    }

    this.activeCount++;
    const job = this.queue.shift();

    try {
      await this.executeJob(job);
    } catch (err) {
      console.error('[EmailQueue] Job failed:', err);
    } finally {
      this.activeCount--;
      // Try processing the next one
      this.processQueue();
    }
  }

  private async executeJob(job: any) {
    const { customer, template, customerData } = job;
    console.log(`[EmailQueue] Processing PDF/Email for: ${customer.memberName} (${this.queue.length} remaining)`);

    // 1. Build HTML
    const pdfPages = getPdfSafeTemplatePages(
      template.name,
      (template.pages || []) as unknown as import('@/types').ITemplatePage[]
    );
    const html = buildFullHtml(pdfPages, customerData);

    // 2. Generate PDF using Puppeteer
    const pdfBuffer = await generatePdfFromHtml(html);

    // 3. Nodemailer Configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || process.env.SMTP_USER,
        pass: process.env.EMAIL_PASS || process.env.SMTP_PASS,
      },
    });

    const fileName = `${customer.memberName.replace(/\\s+/g, '-')}_Certificate.pdf`;
    const senderEmail = process.env.SENDER_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER;

    // 4. Send Email
    const info = await transporter.sendMail({
      from: `"${process.env.NEXT_PUBLIC_APP_NAME || 'CureBharat'}" <${senderEmail}>`,
      to: customer.email,
      subject: `Your ${template.name} Certificate from CureBharat`,
      text: `Hello ${customer.memberName},\\n\\nPlease find your generated ${template.name} certificate attached to this email.\\n\\nBest regards,\\nCureBharat Team`,
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

    console.log(`[EmailQueue] Successfully sent to ${customer.email} (MessageID: ${info.messageId})`);
  }
}

// Global singleton to survive hot reloads in development
declare global {
  var _emailQueue: EmailQueue;
}

if (!global._emailQueue) {
  global._emailQueue = new EmailQueue();
}

export const emailQueue = global._emailQueue;
