/*
  Warnings:

  - You are about to drop the column `streamdId` on the `UpVote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,streamId]` on the table `UpVote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `streamId` to the `UpVote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."UpVote" DROP CONSTRAINT "UpVote_streamdId_fkey";

-- DropIndex
DROP INDEX "public"."UpVote_userId_streamdId_key";

-- AlterTable
ALTER TABLE "public"."UpVote" DROP COLUMN "streamdId",
ADD COLUMN     "streamId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UpVote_userId_streamId_key" ON "public"."UpVote"("userId", "streamId");

-- AddForeignKey
ALTER TABLE "public"."UpVote" ADD CONSTRAINT "UpVote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "public"."Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
