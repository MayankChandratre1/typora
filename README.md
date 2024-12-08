# Typora - Full Stack Blog Web App

[Live](https://typora-nine.vercel.app)

---

**Typora** is a full-featured blog application built with **Next.js** and **TypeScript** for the frontend, **PrismaORM** and **PostgreSQL** for the backend, and **Cloudinary** for image management. The app allows users to create, edit, and publish blogs using **Markdown** syntax, interact with others through likes and comments, and share blogs on various social media platforms.

## Features

### 1. User Authentication
- **Sign Up / Sign In** with email and password.
- **JWT** authentication strategy for secured sessions.
- Profile management: Users can add profile pictures, update their bio, and edit their display name.

### 2. Blog Management
- **Create Blog**: Write blog posts using Markdown syntax, add tags, and upload a thumbnail image.
- **Edit Blog**: Modify the title, content, tags, and publishing status of a blog.
- **Draft & Publish**: Save drafts and publish them when ready.
- **Like & Comment**: Users can like and comment on blogs and delete their own comments.

### 3. Blog Interaction
- **Search Blogs**: Find blogs by title or tag.
- **Tag-Based Browsing**: View all blogs associated with a particular tag.
- **Profile Viewing**: Access other users' profiles and see their published blogs.

### 4. Sharing & Deleting
- **Share Blogs**: Copy link to share, or post directly to LinkedIn, WhatsApp, and Instagram.
- **Account & Blog Management**: Users can delete their accounts and their own blogs.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Shadcn UI, TailwindCSS
- **Backend**: Next.js server actions, PrismaORM, PostgreSQL (using Neondb)
- **Image Management**: Cloudinary for profile pictures and blog thumbnails
- **Database**: PostgreSQL managed through PrismaORM

## Project Structure

### Database Schema

The application uses a relational database structure, which includes the following models:

- **User**: Stores user information and links to the user's blogs, likes, and comments.
- **Blog**: Holds blog content, metadata, and links to tags, likes, and comments.
- **Tag**: Manages tags associated with blogs.
- **Like**: Tracks user likes on specific blogs.
- **Comment**: Stores user comments on blogs.

### Frontend

The frontend is developed in Next.js with a black-and-white inspired theme resembling the Medium blog site. It is responsive and supports light/dark mode toggle for a better user experience.

### Backend

The backend is managed by Next.js server actions, with the following main actions:

- **AuthActions**: `SignIn`, `SignUp`
- **BlogActions**: `saveBlog`, `publishBlog`, `getBlogById`, etc.
- **UserActions**: `getUserById`, `updateUserById`, etc.
- **TagActions**: `getTagById`, `getTagsByBlogId`, etc.
- **CommentActions**: `addComment`, `deleteComment`, etc.

## Getting Started

### Prerequisites

- **Node.js** and **npm**
- **PostgreSQL** database
- **Cloudinary** account for image hosting

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/typora.git
   cd typora
2. **Install dependencies**:

    ```bash
    npm install
    ```
3. **Set up environment variables: Create a .env file and add your database URL, Cloudinary credentials, and other environment variables**:
    ```bash
    cp .env.example .env
    ```
 4. **Run database migrations**:
    ```bash
    npx prisma migrate dev
    ```

5. **Start the application**:
    ```bash
    npm run dev
    ```


Contact
For any questions or feedback, please reach out via LinkedIn or GitHub.

Typora is a powerful and customizable blogging app with a clean, minimalist design and robust functionality inspired by popular platforms like Medium and GitHub. Enjoy blogging with Markdown, managing tags, and connecting with others!


