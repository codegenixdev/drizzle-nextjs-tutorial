ALTER TABLE "user" DROP CONSTRAINT "user_last_name_unique";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "fullName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "last_name";