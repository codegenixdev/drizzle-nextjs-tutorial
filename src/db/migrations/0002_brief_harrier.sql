ALTER TABLE "comment" DROP CONSTRAINT "comment_parent_root_id_comment_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" DROP COLUMN IF EXISTS "parent_root_id";