import { toast } from "@/hooks/use-toast";
import { publishBlog, saveBlog } from "@/lib/actions/blogActions";
import markdownToHtml from "@/lib/markdown/markdownToHtml";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState("");
  const [blogId, setBlogId] = useState<string | undefined>();
  const session = useSession();

  useEffect(() => {
    const title = localStorage.getItem("title");
    const content = localStorage.getItem("content");
    if (title) {
      setTitle(title);
    }
    if (content) {
      setContent(content);
    }
  }, []);

  useEffect(() => {
    const generatePreview = async () => {
      const newHtml = await markdownToHtml(content);
      setHtml(newHtml);
    };
    generatePreview();
  }, [preview]);

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

  const handleBold = () => insertAtCursor("**Bold Text**");
  const handleItalic = () => insertAtCursor("*Italic Text*");
  const handleLink = () => insertAtCursor("[Link Text](url)");
  const handleImage = () => insertAtCursor("![Alt Text](image-url)");
  const handleList = () => insertAtCursor("- List item\n");
  const handleCodeBlock = () => insertAtCursor("```\nCode Block\n```");

  const handleHeader = (level: number) => {
    const headerMarkdown = "#".repeat(level) + " ";
    insertAtCursor(`${headerMarkdown}Header ${level}\n`);
  };
  const clearStorage = () => {
    localStorage.clear();
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
      } else {
        const blogId = await handleSaveAsDraft();
        if (blogId) await publishBlog(blogId);
      }
      clearStorage();
    } catch (error) {
      console.error(error);
    }
    console.log("Publishing Blog:", { title, content });
  };

  const handleSaveAsDraft = async () => {
    try {
      if (session.data?.user?.id) {
        const res = await saveBlog({
          title,
          content,
          authorId: session.data?.user?.id,
        });
        if (res && res.success) {
          setBlogId(res.blogId);
          return res.blogId;
        }
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Saving as Draft:", { title, content });
  };

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
  };
};

export default useEditor;
