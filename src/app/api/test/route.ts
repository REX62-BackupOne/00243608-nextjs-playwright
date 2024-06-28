import { NextResponse,NextRequest } from 'next/server';
import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  console.log(url)
  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  async function getlink(url){
    const f1 = Date.now()
    try {
      if (url) {
        await page.goto('https://webtor.io/#/torrent-to-ddl');
        await page.keyboard.press('Enter');
        await wait(2000);
        await page.waitForSelector('#__BVID__67');
        await page.type('#__BVID__67', url);
        await wait(1000);
        await page.keyboard.press('Enter');
        await wait(2000);
  
        await page.waitForSelector('#app > div.content > div > div > div > div:nth-child(1) > div > div.card > div.card-body.header > div > a.btn.my-btn-link.zip');
        await page.click('#app > div.content > div > div > div > div:nth-child(1) > div > div.card > div.card-body.header > div > a.btn.my-btn-link.zip');
  
        const dllink = await page.evaluate(() => {
          const range = document.createRange();
          const element = document.querySelector('#download-modal___BV_modal_body_ > div > div > div.input-group.copy');
          range.selectNodeContents(element);
          const copiedValue = range.startContainer.children[1]._value;
          return copiedValue;
        });
  
        const link = convertToURL(dllink);
  
        const f2= Date.now();
        console.log((f2-f1)/1000)
        return { status: true, link: link };
        
      } else {
        return {
          status: false,
          error: 'please add url',
        };
      }
    } catch (error) {
      return { status: false, error: error };
    } 
  };
const data = await  getlink(url);
  // Teardown
  await context.close();
  await browser.close();

  return NextResponse.json(data);
}
