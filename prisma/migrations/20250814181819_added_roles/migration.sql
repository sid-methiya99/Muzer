/*
  Warnings:

  - You are about to drop the column `streamerId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the `Streamer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Streamer', 'EndUser');

-- DropForeignKey
ALTER TABLE "public"."Stream" DROP CONSTRAINT "Stream_streamerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Stream" DROP CONSTRAINT "Stream_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Stream" DROP COLUMN "streamerId",
DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL;

-- DropTable
DROP TABLE "public"."Streamer";

-- CreateTable
CREATE TABLE "public"."CurrentSpaceUsers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "streamId" TEXT,

    CONSTRAINT "CurrentSpaceUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Stream" ADD CONSTRAINT "Stream_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurrentSpaceUsers" ADD CONSTRAINT "CurrentSpaceUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurrentSpaceUsers" ADD CONSTRAINT "CurrentSpaceUsers_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "public"."Stream"("id") ON DELETE SET NULL ON UPDATE CASCADE;
