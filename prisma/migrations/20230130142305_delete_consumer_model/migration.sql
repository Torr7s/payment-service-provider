/*
  Warnings:

  - You are about to drop the column `consumerId` on the `payables` table. All the data in the column will be lost.
  - You are about to drop the column `consumerId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `consumers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `payables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "consumers" DROP CONSTRAINT "consumers_userId_fkey";

-- DropForeignKey
ALTER TABLE "payables" DROP CONSTRAINT "payables_consumerId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_consumerId_fkey";

-- AlterTable
ALTER TABLE "payables" DROP COLUMN "consumerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "consumerId",
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "consumers";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
