/*
  Warnings:

  - The `playedTs` column on the `SongQueue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."SongQueue" DROP COLUMN "playedTs",
ADD COLUMN     "playedTs" BIGINT;
