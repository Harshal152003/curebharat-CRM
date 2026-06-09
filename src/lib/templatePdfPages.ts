import { ITemplatePage } from '@/types';
import { termsSampoornaPagesHtml } from '@/lib/termsSampoorna';
import { termsSampoornaPlusPagesHtml } from '@/lib/termsSampoornaPlus';
import { termsSampoornaPremiumPagesHtml } from '@/lib/termsSampoornaPremium';
import { termsSuperSurakshaPagesHtml } from '@/lib/termsSuperSuraksha';
import { termsSurakshaSpecialPagesHtml } from '@/lib/termsSurakshaSpecial';

const canonicalTermsByTemplate: Record<string, string[]> = {
  'CureBharat Sampoorna Suraksha': termsSampoornaPagesHtml,
  'CureBharat Sampoorna Suraksha Plus': termsSampoornaPlusPagesHtml,
  'CureBharat Sampoorna Suraksha Premium': termsSampoornaPremiumPagesHtml,
  'CureBharat Super Suraksha': termsSuperSurakshaPagesHtml,
  'CureBharat Suraksha Special': termsSurakshaSpecialPagesHtml,
};

const alwaysCanonicalTemplates = new Set<string>();

export function getPdfSafeTemplatePages(templateName: string, pages: ITemplatePage[]): ITemplatePage[] {
  const canonicalTerms = canonicalTermsByTemplate[templateName];
  if (!canonicalTerms || pages.length === 0) {
    return pages;
  }

  const firstTermsIndex = pages.findIndex((page) => page.pageType === 'terms');
  if (firstTermsIndex === -1) {
    return pages;
  }

  let lastTermsIndex = firstTermsIndex;
  for (let i = firstTermsIndex; i < pages.length; i++) {
    if (pages[i].pageType !== 'terms') {
      break;
    }
    lastTermsIndex = i;
  }

  const existingTermsPages = pages.slice(firstTermsIndex, lastTermsIndex + 1);
  const shouldReplaceTerms =
    alwaysCanonicalTemplates.has(templateName) ||
    existingTermsPages.length !== canonicalTerms.length ||
    existingTermsPages.some((page) => !page.html);

  if (!shouldReplaceTerms) {
    return pages;
  }

  const beforeTerms = pages.slice(0, firstTermsIndex);
  const afterTerms = pages.slice(lastTermsIndex + 1);
  const baseTermsPage = existingTermsPages[0];

  const replacementTermsPages: ITemplatePage[] = canonicalTerms.map((html, index) => ({
    ...baseTermsPage,
    _id: undefined,
    templateId: baseTermsPage.templateId,
    pageIndex: firstTermsIndex + index,
    pageType: 'terms',
    title: `Terms & Conditions - Page ${index + 1}`,
    sections: [],
    html,
    showGlobalHeader: false,
    showGlobalFooter: false,
    showGlobalWatermark: false,
  }));

  return [...beforeTerms, ...replacementTermsPages, ...afterTerms].map((page, index) => ({
    ...page,
    pageIndex: index,
  }));
}
