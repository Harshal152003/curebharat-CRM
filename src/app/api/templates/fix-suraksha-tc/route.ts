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

    // Create the new perfectly paginated terms pages
    const newTermsPages = termsSurakshaFinalPagesHtml.map((htmlContent, index) =>
      createRawHtmlPage(
        basePages.length + index,
        `Terms & Conditions - Page ${index + 1}`,
        htmlContent
      )
    );

    // Combine them
    template.pages = [...basePages, ...newTermsPages];
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
