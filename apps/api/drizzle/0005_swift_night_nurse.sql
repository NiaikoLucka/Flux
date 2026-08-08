ALTER TABLE "transaction" DROP CONSTRAINT "transaction_account_id_financial_account_id_fk";
--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "to_account_id" uuid;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_to_account_id_financial_account_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."financial_account"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_account_id_financial_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."financial_account"("id") ON DELETE restrict ON UPDATE no action;