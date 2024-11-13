import React from "react";

const BlogView = ({ title, html }: { title: string; html: string }) => {
  return (
    <div className="p-4 rounded">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div
        className="prose prose-md md:prose-xl dark:prose-dark"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
};

export default BlogView;
