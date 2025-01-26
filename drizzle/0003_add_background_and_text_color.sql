ALTER TABLE "card_type" RENAME COLUMN "color" TO "background_color";--> statement-breakpoint
ALTER TABLE "card_type" ADD COLUMN "text_color" text NOT NULL;