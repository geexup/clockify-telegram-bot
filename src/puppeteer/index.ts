import puppeteer from 'puppeteer';
import { EnvironmentManager } from '../environment';
import { renderWotermark} from './render/wotermark';
import { generateTableHtml, generateVerticalHtml, ITable } from './table';

let browser: puppeteer.Browser;
let browserContext: puppeteer.BrowserContext;

export class Puppeteer {
  static async init() {
    browser = await puppeteer.launch({
      args: [].concat(
        EnvironmentManager.current.NODE_ENV === 'development' ? ['--remote-debugging-port=9222'] : []
      ),
      headless: true
    });

    browserContext = await browser.createIncognitoBrowserContext();
  }

  static async free() {
    await browser.close();
    browser = null;
    browserContext = null;
  }

  static async newPage(): Promise<puppeteer.Page> {
    if (!browser) await Puppeteer.init();
    return await browserContext.newPage();
  }

  static async generateImage(html: string): Promise<Buffer> {
    const page = await Puppeteer.newPage();
    await page.setContent(html + renderWotermark());
    await page.setViewport({ width: 1, height: 1, deviceScaleFactor: 2 });

    const result = await page.screenshot({
      encoding: 'binary',
      fullPage: true,
      type: 'png'
    }) as unknown as Buffer;
    await page.close();

    return result;
  }

  static generateTableImage(table: ITable, direction: 'vertical' | 'horizontal' = 'horizontal') {
    const html = direction === 'horizontal'
      ? generateTableHtml(table)
      : generateVerticalHtml(table);

    return Puppeteer.generateImage(html);
  }
}
