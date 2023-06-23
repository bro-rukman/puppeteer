import { sleep } from "./sleep";
import puppeteer from "puppeteer";
export const html_to_image = async (
  html: string,
  tag: string,
  isLoadOnDocker: boolean
): Promise<string | Buffer> => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--start-maximized",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ],
      ignoreDefaultArgs: ["--disable-extensions"],
      executablePath: isLoadOnDocker
        ? "/usr/bin/google-chrome-stable"
        : undefined,
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setContent(html, { waitUntil: "load" });
    const element = await page.$(tag);
    await sleep(10000);
    const screenshot = (await element?.screenshot({
      omitBackground: true,
      encoding: "base64",
    })) as string;
    await browser.close();
    return screenshot;
  } catch (error) {
    throw error;
  }
};
