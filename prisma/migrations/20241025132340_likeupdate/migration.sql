/*
  Warnings:

  - A unique constraint covering the columns `[blogId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_blogId_userId_key" ON "Like"("blogId", "userId");
