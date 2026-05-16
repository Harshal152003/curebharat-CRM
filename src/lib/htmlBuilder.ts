import { ITemplatePage, IComponent, ISection, ICustomer } from '@/types';

export function compilePlaceholders(text: string, customer: ICustomer): string {
  const map: Record<string, string> = {
    '{{member_name}}': customer.memberName || '',
    '{{member_id}}': customer.memberId || '',
    '{{dob}}': customer.dob || '',
    '{{gender}}': customer.gender || '',
    '{{phone}}': customer.phone || '',
    '{{email}}': customer.email || '',
    '{{address}}': customer.address || '',
    '{{nominee_name}}': customer.nomineeName || '',
    '{{nominee_dob}}': customer.nomineeDob || '',
    '{{nominee_gender}}': customer.nomineeGender || '',
    '{{relationship}}': customer.relationship || '',
    '{{plan_name}}': customer.planName || '',
    '{{plan_start}}': customer.planStart || '',
    '{{plan_end}}': customer.planEnd || '',
    '{{plan_price}}': customer.coveragePrice?.toString() || '',
    '{{coverage_price}}': customer.coveragePrice?.toString() || '',
    '{{members_covered}}': customer.membersCovered?.toString() || '',
    '{{coverage_details}}': customer.coverageDetails || '',
  };

  let result = text;
  for (const [placeholder, value] of Object.entries(map)) {
    result = result.replaceAll(placeholder, value);
  }
  return result;
}

export function buildPageHtml(page: ITemplatePage, customer: ICustomer, pageNum: number, totalPages: number): string {
  const bgCss = buildBackgroundCss(page);
  const watermarkHtml = page.watermark?.enabled ? buildWatermark(page) : '';
  const headerHtml = page.showGlobalHeader && page.header?.enabled ? buildHeader(page) : '';
  const footerHtml = page.showGlobalFooter && page.footer?.enabled ? buildFooter(page, pageNum, totalPages) : '';
  const contentHtml = page.sections.map((s) => buildSection(s, customer)).join('');

  return `<div class="pdf-page" style="${bgCss}">${watermarkHtml}${headerHtml}<div class="pdf-content">${contentHtml}</div>${footerHtml}</div>`;
}

function buildBackgroundCss(page: ITemplatePage): string {
  if (!page.background) return 'background: #ffffff;';
  switch (page.background.type) {
    case 'color': return `background-color: ${page.background.value};`;
    case 'gradient': return `background: ${page.background.value};`;
    case 'image': return `background-image: url(${page.background.value}); background-size: cover; background-position: center;`;
    default: return 'background: #ffffff;';
  }
}

function buildWatermark(page: ITemplatePage): string {
  const wm = page.watermark!;
  if (wm.type === 'text') {
    return `<div class="pdf-watermark" style="opacity: ${wm.opacity}; transform: translate(-50%, -50%) rotate(${wm.rotation || -30}deg); font-size: ${wm.size || '80px'}; color: #ccc;">${wm.value}</div>`;
  }
  return `<div class="pdf-watermark" style="opacity: ${wm.opacity}; transform: translate(-50%, -50%) rotate(${wm.rotation || 0}deg);"><img src="${wm.value}" style="width: ${wm.size || '200px'};" /></div>`;
}

function buildHeader(page: ITemplatePage): string {
  const h = page.header!;
  return `
    <div class="pdf-header" style="height: ${h.height}; background: ${h.backgroundColor}; color: ${h.textColor};">
      <div style="display: flex; align-items: center; gap: 12px; padding: 0 24px; height: 100%;">
        ${h.logo ? `<img src="${h.logo}" style="height: 40px;" />` : ''}
        <div>
          <div style="font-weight: 700; font-size: 16px;">${h.companyName || ''}</div>
          ${h.website ? `<div style="font-size: 11px; opacity: 0.7;">${h.website}</div>` : ''}
        </div>
        ${h.contactDetails ? `<div style="margin-left: auto; font-size: 11px; text-align: right;">${h.contactDetails}</div>` : ''}
      </div>
    </div>
  `;
}

function buildFooter(page: ITemplatePage, pageNum: number, totalPages: number): string {
  const f = page.footer!;
  return `
    <div class="pdf-footer" style="height: ${f.height}; background: ${f.backgroundColor}; color: ${f.textColor};">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 24px; height: 100%; font-size: 10px;">
        <span>${f.companyDetails || ''}</span>
        ${f.showPageNumbers ? `<span>Page ${pageNum} of ${totalPages}</span>` : ''}
      </div>
    </div>
  `;
}

function buildSection(section: ISection, customer: ICustomer): string {
  const gridCss = section.layout === 'two-column' ? 'display: grid; grid-template-columns: 1fr 1fr; gap: 12px;'
    : section.layout === 'three-column' ? 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;'
      : '';

  const styleCss = Object.entries((section.style || {}) as Record<string, string>).filter(([, v]) => v).map(([k, v]) => `${toKebab(k)}: ${v}`).join('; ');

  const comps = section.components.map((c) => buildComponent(c, customer)).join('');

  return `<div style="${gridCss} ${styleCss}">${comps}</div>`;
}

function buildComponent(comp: IComponent, customer: ICustomer): string {
  const props = comp.props as Record<string, string>;
  const styleCss = Object.entries(comp.style || {}).filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => `${toKebab(k)}: ${v}`).join('; ');
  const positionCss = comp.position.type === 'absolute' ? `position: absolute; top: ${comp.position.top || 0}; left: ${comp.position.left || 0};` : '';

  switch (comp.type) {
    case 'text':
      return `<div style="${styleCss} ${positionCss}">${compilePlaceholders(props.content || '', customer)}</div>`;
    case 'dynamic-field':
      return `<span style="${styleCss} ${positionCss}">${compilePlaceholders(props.placeholder || '', customer)}</span>`;
    case 'image':
      return props.src ? `<img src="${props.src}" alt="${props.alt || ''}" style="max-width: 100%; ${styleCss} ${positionCss}" />` : '';
    case 'logo':
      return props.src ? `<img src="${props.src}" alt="Logo" style="max-width: ${props.maxWidth || '150px'}; ${styleCss} ${positionCss}" />` : '';
    case 'divider':
      return `<hr style="border: none; border-top: 2px ${props.style || 'solid'} ${props.color || '#e2e8f0'}; margin: 8px 0; ${positionCss}" />`;
    case 'table': {
      const headers = (comp.props.headers || []) as string[];
      const rows = (comp.props.rows || []) as string[][];
      const hBg = props.headerBg || '#1a5c2e';
      const hColor = props.headerColor || '#fff';
      let html = `<table style="width: 100%; border-collapse: collapse; font-size: 12px; ${styleCss}"><thead><tr>`;
      headers.forEach((h: string) => { html += `<th style="padding: 10px 14px; background: ${hBg}; color: ${hColor}; text-align: left; font-weight: 600; border: 1px solid ${hBg};">${compilePlaceholders(h, customer)}</th>`; });
      html += '</tr></thead><tbody>';
      rows.forEach((row: string[], ri: number) => {
        html += `<tr style="background: ${ri % 2 === 0 ? '#f8f9fa' : '#fff'}">`;
        row.forEach((cell: string) => { html += `<td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">${compilePlaceholders(cell, customer)}</td>`; });
        html += '</tr>';
      });
      html += '</tbody></table>';
      return html;
    }
    case 'card':
      return `<div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.06); ${styleCss} ${positionCss}"><h4 style="font-weight: 600; font-size: 15px; margin-bottom: 8px; color: #1a5c2e;">${compilePlaceholders(props.title || '', customer)}</h4><p style="font-size: 13px; color: #666; line-height: 1.5;">${compilePlaceholders(props.content || '', customer)}</p></div>`;
    case 'qr-code':
      return `<div style="width: 100px; height: 100px; background: #f3f4f6; border: 2px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; ${positionCss}"><span style="font-size: 10px; color: #999;">QR</span></div>`;
    case 'signature':
      return `<div style="text-align: center; padding: 20px 0; ${styleCss} ${positionCss}"><div style="border-bottom: 2px solid #333; width: 200px; margin: 0 auto 8px; height: 40px;"></div><p style="font-size: 12px; color: #666;">${props.label || 'Authorized Signatory'}</p></div>`;
    case 'icon-block':
      return `<div style="display: flex; align-items: center; gap: 12px; padding: 12px; ${styleCss} ${positionCss}"><span style="font-size: 28px;">${props.icon || '🏥'}</span><div><div style="font-weight: 600; font-size: 13px;">${compilePlaceholders(props.title || '', customer)}</div><div style="font-size: 12px; color: #666;">${compilePlaceholders(props.description || '', customer)}</div></div></div>`;
    case 'spacer':
      return `<div style="height: ${props.height || '20px'};"></div>`;
    default:
      return '';
  }
}

function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function buildFullHtml(pages: ITemplatePage[], customer: ICustomer): string {
  const pagesHtml = pages.map((p, i) => buildPageHtml(p, customer, i + 1, pages.length)).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    width: 210mm;
    font-family: 'Inter', 'Outfit', Arial, sans-serif;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  @page {
    size: A4;
    margin: 0;
  }

  .pdf-page {
    width: 210mm;
    height: 297mm;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    page-break-after: always;
    page-break-inside: avoid;
    color: #333;
  }

  .pdf-page:last-child {
    page-break-after: auto;
  }

  .pdf-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    pointer-events: none;
    z-index: 0;
    white-space: nowrap;
  }

  .pdf-header {
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    border-bottom: 2px solid rgba(0,0,0,0.08);
  }

  .pdf-content {
    flex: 1;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .pdf-footer {
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    border-top: 2px solid rgba(0,0,0,0.08);
  }

  /* --- Certificate Field Row --- */
  .cb-field { display: flex; align-items: flex-start; gap: 8px; padding: 5px 0; }
  .cb-icon { width: 20px; height: 20px; min-width: 20px; border-radius: 50%; background: #0B5D2A; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .cb-icon svg { width: 11px; height: 11px; fill: white; }
  .cb-icon.orange { background: #E8742A; }
  .cb-lbl { font-size: 11.5px; color: #333; white-space: nowrap; padding-top: 2px; }
  .cb-sep { font-size: 11.5px; color: #333; padding-top: 2px; margin: 0 6px; font-weight: 700; }
  .cb-val { font-size: 12.5px; font-weight: 700; color: #1a1a1a; padding-top: 1px; }

  /* --- Section Header Bar --- */
  .cb-section-hdr { background: #0B5D2A; color: white; padding: 8px 16px; font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 10px; border-radius: 10px 10px 0 0; letter-spacing: 0.5px; }
  .cb-section-hdr .hdr-icon { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; }
  .cb-section-hdr .hdr-icon svg { width: 14px; height: 14px; fill: white; }

  /* --- Tricolor Strips --- */
  .tricolor-l { position: absolute; left: 0; top: 0; bottom: 0; width: 18px; display: flex; z-index: 5; }
  .tricolor-r { position: absolute; right: 0; top: 0; bottom: 0; width: 18px; display: flex; z-index: 5; }
  .tc-green { background: #138808; flex: 1; }
  .tc-white { background: #FFFFFF; flex: 0.7; }
  .tc-saffron { background: #FF9933; flex: 1; }
</style>
</head>
<body>${pagesHtml}</body>
</html>`;
}
