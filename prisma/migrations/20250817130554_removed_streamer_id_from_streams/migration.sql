/*
  Warnings:

  - You are about to drop the column `streamerId` on the `Stream` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Stream" DROP CONSTRAINT "Stream_streamerId_fkey";

-- AlterTable
ALTER TABLE "public"."Stream" DROP COLUMN "streamerId";
