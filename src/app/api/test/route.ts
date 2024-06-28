import { NextResponse, NextRequest } from 'next/server';
import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';
import getlink from './getLink'; // Import the JavaScript function
import type { Page } from 'playwright-core'; // Import the type for type annotations

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  console.log(url);

  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage(); // Type annotation for page

  const data = await getlink(url, page); // Pass the URL and page to the JS function

  // Teardown
  await context.close();
  await browser.close();

  return NextResponse.json(data);
}
