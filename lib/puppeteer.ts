import chromium from "chrome-aws-lambda";
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

  console.log("Using chrome-aws-lambda for Puppeteer in production.");

  // In production, use chrome-aws-lambda for serverless compatibility
  const executablePath = await chromium.executablePath;

  return puppeteerCore.launch({
    args: chromium.args,
    executablePath,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });
}
