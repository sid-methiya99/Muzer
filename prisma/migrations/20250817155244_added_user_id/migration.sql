/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `SpaceUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."SongQueue" DROP CONSTRAINT "SongQueue_songByUserId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "SpaceUsers_userId_key" ON "public"."SpaceUsers"("userId");

-- AddForeignKey
ALTER TABLE "public"."SongQueue" ADD CONSTRAINT "SongQueue_songByUserId_fkey" FOREIGN KEY ("songByUserId") REFERENCES "public"."SpaceUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
