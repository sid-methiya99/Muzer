/*
  Warnings:

  - You are about to drop the column `playedTs` on the `SongQueue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SongQueue" DROP COLUMN "playedTs";
