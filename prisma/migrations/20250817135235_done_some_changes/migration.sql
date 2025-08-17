/*
  Warnings:

  - You are about to drop the column `streamerId` on the `SpaceUsers` table. All the data in the column will be lost.
  - You are about to drop the `Stream` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `spaceId` to the `SpaceUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SpaceUsers" DROP CONSTRAINT "SpaceUsers_streamerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Stream" DROP CONSTRAINT "Stream_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UpVote" DROP CONSTRAINT "UpVote_streamId_fkey";

-- DropIndex
DROP INDEX "public"."SpaceUsers_streamerId_userId_key";

-- AlterTable
ALTER TABLE "public"."SpaceUsers" DROP COLUMN "streamerId",
ADD COLUMN     "songQueueId" TEXT,
ADD COLUMN     "spaceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Stream";

-- CreateTable
CREATE TABLE "public"."SongQueue" (
    "id" TEXT NOT NULL,
    "type" "public"."StreamType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "smallImg" TEXT NOT NULL DEFAULT '',
    "bigImg" TEXT NOT NULL DEFAULT '',
    "extractedId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,

    CONSTRAINT "SongQueue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SongQueue" ADD CONSTRAINT "SongQueue_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "public"."Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpaceUsers" ADD CONSTRAINT "SpaceUsers_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "public"."Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpaceUsers" ADD CONSTRAINT "SpaceUsers_songQueueId_fkey" FOREIGN KEY ("songQueueId") REFERENCES "public"."SongQueue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UpVote" ADD CONSTRAINT "UpVote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "public"."SongQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
