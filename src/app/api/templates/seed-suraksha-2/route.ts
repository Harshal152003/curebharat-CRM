import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';
import { ITemplatePage } from '@/types';

const SOURCE_TEMPLATE_NAMES = ['Curebharat-Suraksha', 'CB-Suraksha Special', 'CureBharat Suraksha Special'];
const TARGET_TEMPLATE_NAME = 'Curebharat-Suraksha 2';

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

function extractTermsHtml(page: ITemplatePage): string {
  const section = page.sections?.[0];
  const component = section?.components?.[0];
  const content = typeof component?.props?.content === 'string' ? component.props.content : '';
  return content.trim();
}

export async function POST() {
  try {
    await dbConnect();

    const sourceTemplate = await Template.findOne({ name: { $in: SOURCE_TEMPLATE_NAMES } }).lean();
    if (!sourceTemplate) {
      return NextResponse.json(
        {
          success: false,
          error: `Source Suraksha template not found. Checked: ${SOURCE_TEMPLATE_NAMES.join(', ')}`,
        },
        { status: 404 }
      );
    }

    await Template.deleteMany({ name: TARGET_TEMPLATE_NAME });

    const basePages = ((sourceTemplate.pages || []) as unknown as ITemplatePage[])
      .filter((page) => page.pageType !== 'terms')
      .slice(0, 4)
      .map((page, index) => ({
        ...page,
        pageIndex: index,
      }));

    const sourceTermsPages = ((sourceTemplate.pages || []) as unknown as ITemplatePage[]).filter(
      (page) => page.pageType === 'terms'
    );

    const termsPages = sourceTermsPages.map((page, index) =>
      createRawHtmlPage(
        basePages.length + index,
        `Terms & Conditions - Page ${index + 1}`,
        extractTermsHtml(page)
      )
    );

    const pages = [...basePages, ...termsPages].map((page, index) => ({
      ...page,
      pageIndex: index,
    }));

    const newTemplate = await Template.create({
      name: TARGET_TEMPLATE_NAME,
      description:
        'Duplicate of Curebharat-Suraksha with original 13-page Terms & Conditions converted to raw HTML pages for accurate PDF generation.',
      category: sourceTemplate.category || 'wellness',
      pageCount: pages.length,
      brandColors: sourceTemplate.brandColors,
      createdBy: sourceTemplate.createdBy || 'admin',
      pages,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: `${TARGET_TEMPLATE_NAME} created successfully with ${pages.length} pages`,
      data: {
        id: newTemplate._id,
        name: newTemplate.name,
        pageCount: newTemplate.pageCount,
        sourceTemplate: sourceTemplate.name,
      },
    });
  } catch (error) {
    console.error('Seed Suraksha 2 error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create duplicate template: ' + (error instanceof Error ? error.message : 'Unknown error'),
      },
      { status: 500 }
    );
  }
}
