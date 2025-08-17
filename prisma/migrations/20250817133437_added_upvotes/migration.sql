/*
  Warnings:

  - You are about to drop the column `haveVoted` on the `SpaceUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."SpaceUsers" DROP COLUMN "haveVoted";

-- CreateTable
CREATE TABLE "public"."UpVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,

    CONSTRAINT "UpVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UpVote_userId_streamId_key" ON "public"."UpVote"("userId", "streamId");

-- AddForeignKey
ALTER TABLE "public"."UpVote" ADD CONSTRAINT "UpVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UpVote" ADD CONSTRAINT "UpVote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "public"."Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
