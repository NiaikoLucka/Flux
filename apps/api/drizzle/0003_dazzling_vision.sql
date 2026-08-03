ALTER TABLE "workspace" RENAME COLUMN "owner_id" TO "created_By";--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_owner_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_created_By_user_id_fk" FOREIGN KEY ("created_By") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;