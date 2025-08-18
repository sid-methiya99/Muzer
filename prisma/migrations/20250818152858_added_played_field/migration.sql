-- AlterTable
ALTER TABLE "public"."SongQueue" ADD COLUMN     "played" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playedTs" TIMESTAMP(3);
