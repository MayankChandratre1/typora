-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "avatar_url" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dvsl1aslo/image/upload/c_thumb,w_200,g_face/v1727793532/Profile_avatar_placeholder_large_gmzpse.png';
