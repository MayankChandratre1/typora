import { toast } from "@/hooks/use-toast";
import { getBlogById, publishBlog, saveBlog, updateBlog } from "@/lib/actions/blogActions";
import markdownToHtml from "@/lib/markdown/markdownToHtml";


import { useEffect, useState } from "react";

import useAuthSession from "../users/useAuthSession";


const useEditor = (id?:string) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState("");
  const [blogId, setBlogId] = useState<string | undefined>(id);
  const [notAuthor, setNotAuthor] = useState(false);
  const {session} = useAuthSession();
  

  useEffect(() => {
    if(id){
        getBlogById(id).then((res) => {
            setNotAuthor(false);
            console.log(JSON.stringify(session));
            if(res?.blogs && session?.user?.id != res?.blogs[0].authorId) {
                setNotAuthor(true);
                return
            }
            if(res && res.success && res.blogs){
                setTitle(res.blogs[0]?.title);
                setContent(res.blogs[0]?.content);
                localStorage.setItem("title", res.blogs[0]?.title);
                localStorage.setItem("content", res.blogs[0]?.content);
            }
        })
        
    }
    const title = localStorage.getItem("title");
    const content = localStorage.getItem("content");
    if (title) {
      setTitle(title);
    }
    if (content) {
      setContent(content);
    }
    return () => {
      localStorage.removeItem("title");
      localStorage.removeItem("content");
    }
  }, [id, session]);

  useEffect(() => {
    const generatePreview = async () => {
      const newHtml = await markdownToHtml(content);
      setHtml(newHtml);
    };
    generatePreview();
  }, [preview, content]);

  const changeToPreview = () => {
    setPreview(!preview);
  };

  const insertAtCursor = (text: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newText = content.slice(0, start) + text + content.slice(end);
    setContent(newText);
    textarea.focus();
    textarea.selectionEnd = start + text.length;
  };

  const handleBold = () => insertAtCursor("**Bold**");
  const handleItalic = () => insertAtCursor("*Italic*");
  const handleLink = () => insertAtCursor("[Title](url)");
  const handleImage = () => insertAtCursor("![Alt](image-url)");
  const handleList = () => insertAtCursor("- Item\n");
  const handleCodeBlock = () => insertAtCursor("```\nCode\n```");

  const handleHeader = (level: number) => {
    const headerMarkdown = "#".repeat(level) + " ";
    insertAtCursor(`${headerMarkdown}Header${level}\n`);
  };
  const clearStorage = () => {
    localStorage.removeItem("title");
    localStorage.removeItem("content");
    setTitle("");
    setContent("");
  };

  const handlePublish = async () => {
    toast({
      title: "Blog Published",
      description: "Your blog has been published successfully",
    });
    // Add your publish logic here
    try {
      if (blogId) {
        await publishBlog(blogId);
        return blogId;
      } else {
        const blogId = await handleSaveAsDraft();
        if (blogId) await publishBlog(blogId);
        return blogId;
      }
      clearStorage();
    } catch (error) {
      console.error(error);
    }
    console.log("Publishing Blog:", { title, content });
  };

  const handleSaveAsDraft = async () => {
    try {
      if (session?.user?.id) {
        const res = await saveBlog({
          title,
          content,
          authorId: session?.user?.id,
        });
        if (res && res.success) {
          setBlogId(res.blogId);
          return res.blogId;
        }
      }
      toast({
        title: "Blog Saved",
        description: "Your blog has been saved successfully",
      })
      
    } catch (error) {
      console.error(error);
    }
    console.log("Saving as Draft:", { title, content });
  };

  const handleUnpublish = async () => {
    try {
      if (blogId) {
        await updateBlog(blogId,{
          published: false,
        });
        clearStorage();
        toast({
          title: "Blog Unpublished",
          description: "Your blog has been unpublished successfully",
        })
      }
     
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditSave = async () => {
    try {
      if (blogId) {
        await updateBlog(blogId,{
          title,
          content
        });
        toast({
          title: "Blog Saved",
          description: "Your blog has been saved successfully",
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditPubslish = async () => {
    await handleEditSave()
    await handlePublish()
  }

  const onChangeContent = (text: string) => {
    setContent(text);
    localStorage.setItem("content", text);
  };

  const onChangeTitle = (text: string) => {
    setTitle(text);
    localStorage.setItem("title", text);
  };

  return {
    title,
    content,
    preview,
    html,
    blogId,
    changeToPreview,
    insertAtCursor,
    handleBold,
    handleItalic,
    handleLink,
    handleImage,
    handleList,
    handleCodeBlock,
    handleHeader,
    clearStorage,
    handlePublish,
    handleSaveAsDraft,
    onChangeContent,
    onChangeTitle,
    handleUnpublish,
    handleEditPubslish,
    handleEditSave,
    notAuthor
  };
};

export default useEditor;
