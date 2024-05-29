import { db } from '../config/db';
import { jobs } from '../schema/schema';
import { Response, Request } from 'express';

import { jobType } from './types';
import { and, eq, ilike, or } from 'drizzle-orm';

const getJob = async (req: Request, res: Response) => {
  try {
    const {
      title,
      company,
      experience,
      deadline,
      sector,
      location,
      type,
      category,
      postedDate,
      sortBy = 'postedDate',
      sortOrder = 'desc',
      search,
    } = req.query;

    const queryFilters = [];

    if (title) queryFilters.push(ilike(jobs.title, `%${title}%`));
    if (company) queryFilters.push(ilike(jobs.company, `%${company}%`));
    if (location) queryFilters.push(ilike(jobs.location, `%${location}%`));
    if (type) queryFilters.push(ilike(jobs.jobType, `%${type}%`));
    if (sector) queryFilters.push(ilike(jobs.sector, `%${category}%`));
    if (experience)
      queryFilters.push(ilike(jobs.experienceLevel, `%${category}%`));

    if (search) {
      queryFilters.push(
        or(
          ilike(jobs.title, `%${search}%`),
          ilike(jobs.description, `%${search}%`),
          ilike(jobs.company, `%${search}%`),
        ),
      );
    }

    const filter = queryFilters.length ? and(...queryFilters) : undefined;

    const result = await db
      .select()
      .from(jobs)
      .where(filter)
      .orderBy(
        sortBy === 'postedDate' ? jobs.deadline : jobs[sortBy as keyof jobType],
      )
      .execute();

    res.status(201).json({
      status: 200,
      message: 'Request successful',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message ?? 'Something went wrong',
    });
  }
};

const insertJob = async (data: jobType[]) => {
  try {
    const foundJob = await db.select().from(jobs);

    const newjobs = data
      .map((job) => ({ ...job, deadline: new Date() }))
      .filter(
        (job) =>
          foundJob.findIndex(
            (found) =>
              job.title === found.title &&
              job.company === found.company &&
              job.description.slice(0, 100) ===
                `${found?.description}`.slice(0, 100),
          ) === -1,
      );

    if (newjobs.length > 0) {
      const newJob = await db
        .insert(jobs)
        .values([...newjobs.map((job) => ({ ...job, deadline: new Date() }))]);
    }
    return { status: 'successful' };
  } catch (error) {
    console.log(error);
    return { status: 'failed' };
  }
};

const deleteJob = async () => {
  try {
    const deletedJob: {}[] = [];

    const jobsList = await db.select().from(jobs);

    jobsList.map(async (job) => {
      if (job.deadline && job.deadline < new Date()) {
        const deleteJobId = await db
          .delete(jobs)
          .where(eq(jobs.id, job.id))
          .returning({
            deletedJobId: jobs.id,
            deleteJobTItle: jobs.title,
          });

        deletedJob.push(deleteJobId);
      }
    });
    return deletedJob;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getJob, insertJob };
