import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('serial').primaryKey(),
    email:varchar('email').notNull(),
    api_key: text('api_key')
    .array().default(sql`ARRAY[]::text[]`),
    role: varchar('role').notNull().default('user'),
    notify:boolean('notify').default(false),
    notifyAbout:text('notify_about')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

export const jobs = pgTable('jobs', {
    id: serial('id').primaryKey(),
    company: varchar('company'),
    deadline: timestamp('deadline'),
    description: text('description'),
    experienceLevel: varchar('experience_level'),
    jobType: varchar('job_type'),
    location: varchar('location'),
    sector: varchar('sector'),
    skillrequirements: text('skill_requirements'),
    title: varchar('title'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const scrapList = pgTable('scrap_list', {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
})