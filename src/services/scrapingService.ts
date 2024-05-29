const path = require('path');
const cheerio = require('cheerio'); // Library for parsing HTML
const fs = require('fs');
const puppeteer = require('puppeteer-extra');

require('dotenv').config();

const stealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(stealthPlugin());

export const scrape = async (url: string, filterOption: string[]) => {
  try {
    console.log(url, filterOption);

    const browser = await puppeteer.launch({
      args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
      ],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    //await page.setDefaultNavigationTimeout(1000);
    await page.goto(url, { timeout: 0 });

    await page.viewport({ width: 2920, height: 1080 });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    //click all see more buttons
    const seeMoreBtn = await page.$$(
      "button[class='text-center text-small text-primary']",
    );
    seeMoreBtn.forEach(async (el: any) => {
      await el.evaluate((b: any) => b.click());
      //await el.click();
    });

    //await new Promise((resolve) => setTimeout(resolve, 1000));

    filterOption.forEach(async (option) => {
      const filterBox = await page.waitForSelector(`input[value="${option}"]`);
      await filterBox.evaluate((b: any) => b.click());
      //await filterBox.click();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    //await new Promise((resolve) => setTimeout(resolve, 2000));

    //click filter button
    const filterBtn = await page.waitForSelector(
      'button[class="bg-primary my-4 text-sm text-white px-4 py-1 rounded disabled:bg-gray-200"]',
    );

    await filterBtn.evaluate((b: any) => b.click());
    //await filterBtn.click();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const loadMoreBtn = await page.waitForSelector(
      'span ::-p-text(Load More Jobs)',
    );

    loadMoreBtn.evaluate((b: any) => b.click());
    //await loadMoreBtn.click();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const html = await page.content();

    const body = await page.evaluate(() => {
      return document.body.innerHTML;
    });

    const jobs = await parseAfriworketJobs(html);

    console.log('done');

    await browser.close();

    return jobs.map((job) => ({
      ...job,
      deadline: new Date(job?.deadline).toLocaleDateString(),
    }));
  } catch (error) {
    return [];
  }
};

async function parseAfriworketJobs(html: any) {
  const $ = cheerio.load(html);

  const jobsList: {
    title: string;
    description: string;
    skillrequirements: string;
    jobType: string;
    experienceLevel: string;
    deadline: string;
    location: string;
    sector: string;
    company: string;
  }[] = [];

  $(
    "div[class='cursor-pointer my-2 py-4 hover:bg-gray-100 border-b border-[#E3E3E3] w-full']",
  ).each((i: number, element: any) => {
    const title = $(element)
      .find(
        "h3[class='text-base md:text-xl capitalize font-medium mb-2 text-gray-800 md:font-semibold']",
      )
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    const description = $(element)
      .find('p[class="text-black text-sm px-2 md:px-6"]')
      .text()
      .replace(/\s+/g, ' ')
      .trim();
    const skillrequirements = $(element)
      .find('div[class="skill-chip"]')
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    const jobType = $(element)
      .find('div[class="skill-chip capitalize"]')
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    const experienceLevel = $(element)
      .find('div[class="flex flex-col"]:contains("Experience Level")')
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    const deadline = $(element)
      .find('span[class="text-xs text-[#828282]"]:contains("Deadline")')
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    const location = $(element)
      .find(
        'div[class="mb-3 flex w-full px-2 md:px-6 gap-1 md:gap-7 justify-between md:justify-start"] > div:nth-child(3)',
      )
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    const sector = $(element)
      .find('div[class="skill-chip"]')
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    const company = $(element)
      .find(
        'div[class="mb-3 flex w-full px-2 md:px-6 gap-1 md:gap-7 justify-between md:justify-start"] > div:nth-child(1)',
      )
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    jobsList.push({
      title,
      description,
      skillrequirements,
      jobType,
      experienceLevel,
      deadline,
      location,
      sector,
      company,
    });
  });

  return jobsList;
}
