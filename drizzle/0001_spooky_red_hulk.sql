CREATE TABLE IF NOT EXISTS "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" varchar,
	"deadline" timestamp,
	"description" text,
	"experience_level" varchar,
	"job_type" varchar,
	"location" varchar,
	"sector" varchar,
	"skill_requirements" text,
	"title" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"job_id" serial NOT NULL,
	"message" text NOT NULL,
	"read" varchar DEFAULT 'false' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "api_key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "full_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "phone";