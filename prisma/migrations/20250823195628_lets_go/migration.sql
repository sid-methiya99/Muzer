/*
  Warnings:

  - You are about to drop the column `active` on the `SongQueue` table. All the data in the column will be lost.
  - You are about to drop the column `currentPlaying` on the `SongQueue` table. All the data in the column will be lost.
  - You are about to drop the column `playedTs` on the `SongQueue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SongQueue" DROP COLUMN "active",
DROP COLUMN "currentPlaying",
DROP COLUMN "playedTs",
ADD COLUMN     "currentPlayingSongId" TEXT DEFAULT '';
