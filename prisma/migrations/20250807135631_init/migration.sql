-- CreateEnum
CREATE TYPE "public"."StreamType" AS ENUM ('Spotify', 'Youtube');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Streamer', 'EndUser');

-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('Google');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" "public"."Provider" NOT NULL,
    "role" "public"."Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stream" (
    "id" TEXT NOT NULL,
    "type" "public"."StreamType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UpVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "streamdId" TEXT NOT NULL,

    CONSTRAINT "UpVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UpVote_userId_streamdId_key" ON "public"."UpVote"("userId", "streamdId");

-- AddForeignKey
ALTER TABLE "public"."Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UpVote" ADD CONSTRAINT "UpVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UpVote" ADD CONSTRAINT "UpVote_streamdId_fkey" FOREIGN KEY ("streamdId") REFERENCES "public"."Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
