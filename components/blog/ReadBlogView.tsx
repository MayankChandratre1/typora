import { BlogWithRelations } from "@/lib/types/blogTypes";
import React from "react";
import AuthorCard from "./AuthorCard";
import { Blog } from "@prisma/client";
import Interactions from "./Interactions";

const ReadBlogView = ({ html, blog }: { html: string, blog:BlogWithRelations | Blog }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div
        className="prose prose-sm md:prose-2xl overflow-scroll p-10"
        style={{
          scrollbarColor: "transparent transparent",
        }}
        dangerouslySetInnerHTML={{ __html: html || "" }}
      ></div>
      <div className="max-lg:border-t-2 lg:border-l-2 h-screen overflow-y-scroll" style={{
        scrollbarColor: "transparent transparent",
      }}>
        <AuthorCard authorId={blog.authorId} />
        <Interactions blog={blog}/>
      </div>
    </div>
  );
};

export default ReadBlogView;
