-- AlterTable
-- Change specialSpecifications from jsonb to text[] (String[])
-- Set existing values to empty array since data structure changed
ALTER TABLE "trucks"
  ALTER COLUMN "specialSpecifications" DROP DEFAULT,
  ALTER COLUMN "specialSpecifications" TYPE text[] USING
    CASE
      WHEN "specialSpecifications" IS NULL THEN '{}'::text[]
      ELSE '{}'::text[]
    END,
  ALTER COLUMN "specialSpecifications" SET DEFAULT '{}'::text[];
