import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";

export async function getBrowserInstance() {
  const isDev = process.env.NODE_ENV === 'development';
  console.log(`Puppeteer launching in ${isDev ? 'development' : 'production'} mode.`);

  if (isDev) {
    // In development, use local Chrome installation
    const puppeteerFull = await import('puppeteer');
    return puppeteerFull.default.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
  }

  console.log("Using @sparticuz/chromium for Puppeteer in production.");

  // In production, use @sparticuz/chromium for serverless compatibility
  const executablePath = await chromium.executablePath();

  return puppeteerCore.launch({
    args: chromium.args,
    executablePath,
    headless: true,
  });
}
