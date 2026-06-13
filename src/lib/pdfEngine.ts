import puppeteer, { Browser } from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

// Keep a global browser instance alive to massively speed up generation
let globalBrowser: Browser | null = null;

async function getBrowser() {
  if (globalBrowser && globalBrowser.isConnected()) {
    return globalBrowser;
  }

  const isProd = process.env.NODE_ENV === 'production';
  const localChromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const executablePath = isProd 
    ? await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v132.0.0/chromium-v132.0.0-pack.tar') 
    : localChromePath;

  globalBrowser = await puppeteer.launch({
    args: isProd ? chromium.args : [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    executablePath,
    headless: true,
  });

  return globalBrowser;
}

export async function generatePdfFromHtml(html: string): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // Set viewport to match A4 at 96dpi
    await page.setViewport({ width: 794, height: 1123 });

    // Use domcontentloaded for speed. Since we have inline CSS and
    // Puppeteer usually caches identical Cloudinary images locally, this is faster.
    await page.setContent(html, {
      waitUntil: 'load', 
      timeout: 30000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Raw HTML template pages should render as a single fitted PDF page,
    // matching the template preview instead of being clipped or reflowed.
    await page.evaluate(() => {
      const htmlPages = Array.from(document.querySelectorAll<HTMLElement>('.pdf-page--html'));

      htmlPages.forEach((pageEl) => {
        const root = pageEl.querySelector<HTMLElement>(':scope > .pdf-html-root');
        if (!root) return;

        root.style.transform = '';
        root.style.transformOrigin = 'top left';
        root.style.width = '100%';
        root.style.height = '100%';
        root.style.maxHeight = 'none';

        const pageWidth = pageEl.clientWidth;
        const pageHeight = pageEl.clientHeight;
        const contentWidth = root.scrollWidth;
        const contentHeight = root.scrollHeight;

        if (!pageWidth || !pageHeight || !contentWidth || !contentHeight) {
          return;
        }

        const scale = Math.min(pageWidth / contentWidth, pageHeight / contentHeight, 1);
        if (scale >= 0.999) {
          return;
        }

        root.style.transform = `scale(${scale})`;
        root.style.width = `${100 / scale}%`;
        root.style.height = `${100 / scale}%`;
      });
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    // ONLY close the page, keep the browser alive for the next task
    await page.close();
  }
}
