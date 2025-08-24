/*
  Warnings:

  - You are about to drop the column `currentPlayingSongId` on the `SongQueue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SongQueue" DROP COLUMN "currentPlayingSongId",
ADD COLUMN     "currentPlaying" BOOLEAN NOT NULL DEFAULT false;
