/*
  Warnings:

  - The values [PAID,WAITING_FUNDS] on the enum `PayableStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [DEBIT_CARD,CREDIT_CARD] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PayableStatus_new" AS ENUM ('paid', 'waiting_funds');
ALTER TABLE "payables" ALTER COLUMN "status" TYPE "PayableStatus_new" USING ("status"::text::"PayableStatus_new");
ALTER TYPE "PayableStatus" RENAME TO "PayableStatus_old";
ALTER TYPE "PayableStatus_new" RENAME TO "PayableStatus";
DROP TYPE "PayableStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('debit_card', 'credit_card');
ALTER TABLE "transactions" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;
