"use client";

import {
  getAllPublishedBlogs,
  getBlogById,
  getBlogsByAuthorId,
  getBlogsByTagId,
} from "@/lib/actions/blogActions";
import { BlogWithRelations } from "@/lib/types/blogTypes";

import { useEffect, useState } from "react";

export const useBlogs = (
  type: "All" | "ByBlogId" | "ByAuthorId" | "ByTagId",
  value?: string
) => {
  const [blogs, setBlogs] = useState<BlogWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let response;
        if (type === "ByBlogId" && value) {
          response = await getBlogById(value);
        } else if (type === "ByTagId" && value) {
          response = await getBlogsByTagId(value);
        } else if (type === "ByAuthorId" && value) {
          response = await getBlogsByAuthorId(value);
        } else if (type === "All") {
          response = await getAllPublishedBlogs();
        }
        if (response?.success && response.blogs) {
          setBlogs(response.blogs);
        }
      } catch (err) {
        console.log(err);
        
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [type, value]);

  return { blogs, loading, error };
};
