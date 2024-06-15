ALTER TABLE "comment" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;