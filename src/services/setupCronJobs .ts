import cron from 'node-cron';
import { scrape } from './scrapingService';
import { scrapList } from '../schema/schema';
import { db } from '../config/db';
import { insertJob } from '../controllers/jobController';

const setupCronJobs = async (croneExpression: string = '*/5 * * * *') => {
  cron.schedule(croneExpression, async () => {
    try {
      console.log('Cron job started');
      const scraperTitleList = await db.select().from(scrapList);

      for (const { title } of scraperTitleList) {
        const data = await scrape('https://afriworket.com/job', [title]);
        const result = await insertJob(data);

        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
export default setupCronJobs;
