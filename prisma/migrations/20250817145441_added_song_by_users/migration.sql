/*
  Warnings:

  - You are about to drop the column `songQueueId` on the `SpaceUsers` table. All the data in the column will be lost.
  - Added the required column `songByUserId` to the `SongQueue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SpaceUsers" DROP CONSTRAINT "SpaceUsers_songQueueId_fkey";

-- AlterTable
ALTER TABLE "public"."SongQueue" ADD COLUMN     "songByUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."SpaceUsers" DROP COLUMN "songQueueId";

-- AddForeignKey
ALTER TABLE "public"."SongQueue" ADD CONSTRAINT "SongQueue_songByUserId_fkey" FOREIGN KEY ("songByUserId") REFERENCES "public"."SpaceUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
