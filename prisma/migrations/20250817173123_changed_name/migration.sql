/*
  Warnings:

  - You are about to drop the column `streamId` on the `UpVote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,songId]` on the table `UpVote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `songId` to the `UpVote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."UpVote" DROP CONSTRAINT "UpVote_streamId_fkey";

-- DropIndex
DROP INDEX "public"."UpVote_userId_streamId_key";

-- AlterTable
ALTER TABLE "public"."UpVote" DROP COLUMN "streamId",
ADD COLUMN     "songId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UpVote_userId_songId_key" ON "public"."UpVote"("userId", "songId");

-- AddForeignKey
ALTER TABLE "public"."UpVote" ADD CONSTRAINT "UpVote_songId_fkey" FOREIGN KEY ("songId") REFERENCES "public"."SongQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
