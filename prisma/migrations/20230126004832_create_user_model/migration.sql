/*
  Warnings:

  - You are about to drop the column `email` on the `consumers` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `consumers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `consumers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `consumers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `consumers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "consumers_email_key";

-- AlterTable
ALTER TABLE "consumers" DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "password",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "consumers_userId_key" ON "consumers"("userId");

-- AddForeignKey
ALTER TABLE "consumers" ADD CONSTRAINT "consumers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
