import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';
import { ITemplatePage } from '@/types';
import { termsSurakshaFinalPagesHtml } from '@/lib/termsSurakshaFinal';

function createRawHtmlPage(pageIndex: number, title: string, htmlContent: string): ITemplatePage {
  return {
    pageIndex,
    pageType: 'terms',
    title,
    background: { type: 'color', value: '#ffffff', opacity: 1, overlay: '' },
    header: { enabled: false, height: '0px' },
    footer: { enabled: false, height: '0px', showPageNumbers: false },
    watermark: { enabled: false, type: 'text', value: '', opacity: 0 },
    showGlobalHeader: false,
    showGlobalFooter: false,
    showGlobalWatermark: false,
    html: htmlContent,
    sections: [],
  };
}

export async function POST() {
  try {
    await dbConnect();

    // The user's exact template name
    const templateName = 'Curebharat-Suraksha';
    const template = await Template.findOne({ name: templateName });

    if (!template) {
      return NextResponse.json(
        { success: false, error: `Template '${templateName}' not found.` },
        { status: 404 }
      );
    }

    // Keep all pages that are NOT terms
    const basePages = ((template.pages || []) as unknown as ITemplatePage[])
      .filter((page) => page.pageType !== 'terms')
      .map((page, index) => ({
        ...page,
        pageIndex: index,
      }));

    // The Protection Plan Benefits HTML exactly as requested
    const protectionPlanBenefitsHtml = `
      <div style="padding: 40px; height: 100%; display: flex; flex-direction: column; background: #fff;">
        <!-- Header -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
          <div style="width: 150px; height: 150px; display: flex; justify-content: center; align-items: center; margin-bottom: 5px;">
            <img src="https://res.cloudinary.com/dn65pq1ej/image/upload/v1780915274/Logo_kjqrdc.png" alt="CureBharat Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
          </div>
        </div>

        <div style="text-align: center; font-size: 14px; font-weight: 700; text-decoration: underline; margin-bottom: 30px;">
          Protection Plan Benefits-
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 2px solid #000; font-size: 11px;">
          <thead>
            <tr style="background: #007399; color: white;">
              <th style="border: 2px solid #000; padding: 8px; text-align: left; width: 50%;">Protection Benefit (Age 18-65 Year)</th>
              <th style="border: 2px solid #000; padding: 8px; text-align: left;">For Primary Member Only (1 Person)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Accidental Death benefit</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">1000000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Permanent Partial Disability and Permanent total<br/>Disability</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Up to 1000000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 50px; vertical-align: top;">Accidental Hospitalisation</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">Up to 75000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Children Education Benefit- Up to 2 Children in case of<br/>Accidental Death and PTD</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">50000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 40px; vertical-align: top;">Ambulance Cover</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">2000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 40px; vertical-align: top;">Burn</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">10000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 50px; vertical-align: top;">Fracture</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">10000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 60px; vertical-align: top;">Life Style Modification</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">5000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 80px; vertical-align: middle;">Hospi Cash Benefit 1000 Per day for 30 Days in a Policy<br/>Year, (*24 Hours hospitalisation = 1 Day)</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">30000</td>
            </tr>
            <tr style="background: #007399; height: 20px;">
              <td style="border: 2px solid #000;" colspan="2"></td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 80px; font-size: 8px; color: #666; line-height: 1.5;">
          *Protection Plan is only for the Primary Member age 18-65 Years in Good Health<br/>
          ** Refer Terms & Conditions for coverage, claim and policy details<br/>
          *** Protection benefit facilitator- Go Digit General Insurance Ltd, IndusInd General Insurance Company Limited
        </div>

        <div style="margin-top: 40px; font-size: 11px; color: #333; line-height: 1.5;">
          Registered Address- CureBharat Wellness Private Limited, 6th Floor, Hiranandani<br/>
          Business Park, LightBridge, Andheri East Mumbai-400072
        </div>
      </div>
    `;

    const protectionPage = createRawHtmlPage(
      basePages.length,
      'Protection Plan Benefits',
      protectionPlanBenefitsHtml
    );
    // Overwrite the type to be 'benefits' instead of 'terms'
    protectionPage.pageType = 'benefits';

    const allBasePages = [...basePages, protectionPage];

    // Create the new perfectly paginated terms pages
    const newTermsPages = termsSurakshaFinalPagesHtml.map((htmlContent, index) =>
      createRawHtmlPage(
        allBasePages.length + index,
        `Terms & Conditions - Page ${index + 1}`,
        htmlContent
      )
    );

    // Combine them
    template.pages = [...allBasePages, ...newTermsPages];
    template.pageCount = template.pages.length;
    
    // Save to DB
    await template.save();

    return NextResponse.json({
      success: true,
      message: `Successfully fixed T&C alignment for ${templateName}! Added ${newTermsPages.length} perfectly paginated T&C pages.`,
    });
  } catch (error) {
    console.error('Fix T&C error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fix T&C: ' + (error instanceof Error ? error.message : 'Unknown error'),
      },
      { status: 500 }
    );
  }
}
