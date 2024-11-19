import { BlogWithRelations } from "@/lib/types/blogTypes";
import React from "react";
import AuthorCard from "./AuthorCard";
import Interactions from "./Interactions";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import { deleteComment } from "@/lib/actions/commentActions";

const ReadBlogView = ({ html, blog }: { html: string, blog:BlogWithRelations }) => {

  const [comments, setComments] = React.useState(blog.comments);

  const handleDelete = async (id:string) => {
    await deleteComment(id);
    setComments(comments.filter(comment => comment.id !== id));
  }

  const handleAddComment = (comment:{
    id: string;
    content: string;
    userId: string;
    user:{
        username: string;
        avatar_url: string;
    },
    createdAt: Date;
  }) => {
    setComments([...comments, comment]);
  }
  


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div
        className="prose prose-sm dark:prose-dark md:prose-2xl overflow-scroll p-10 "
        style={{
          scrollbarColor: "transparent transparent",
        }}
        dangerouslySetInnerHTML={{ __html: html || "" }}
      ></div>
      <div className="max-lg:border-t-2 lg:border-l-2 overflow-y-scroll px-3  h-full" style={{
        scrollbarColor: "transparent transparent",
      }}>
        <AuthorCard authorId={blog.authorId} />
        <Interactions blog={blog}/>
        <CommentInput handleAddComment={handleAddComment} blogId={blog.id} />
        <Comments handleDelete={handleDelete} comments={comments} />
      </div>
    </div>
  );
};

export default ReadBlogView;
