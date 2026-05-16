import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export async function generatePdfFromHtml(html: string): Promise<Buffer> {
  const isProd = process.env.NODE_ENV === 'production';
  
  // Use a local chrome path if not in production
  const localChromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  // For Vercel, we use @sparticuz/chromium-min with a fallback URL to ensure it always works
  // even if the local bin folder is missing after bundling.
  const executablePath = isProd 
    ? await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v132.0.0/chromium-v132.0.0-pack.tar') 
    : localChromePath;

  const browser = await puppeteer.launch({
    args: isProd ? chromium.args : [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // Set viewport to match A4 at 96dpi
    await page.setViewport({ width: 794, height: 1123 });

    await page.setContent(html, {
      waitUntil: 'load',
      timeout: 30000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
