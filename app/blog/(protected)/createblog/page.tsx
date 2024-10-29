"use client"
import BlogView from '@/components/blog/BlogPreview';
import Toolbar from '@/components/blog/ToolBar';
import { Button } from '@/components/ui/button';
import { publishBlog, saveBlog } from '@/lib/actions/blogActions';
import markdownToHtml from '@/lib/markdown/markdownToHtml';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast, useToast } from "@/hooks/use-toast"


export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [html, setHtml] = useState('');
  const [blogId, setBlogId] = useState<string | undefined>();
  const session = useSession();

useEffect(() => {
    const title = localStorage.getItem('title')
    const content = localStorage.getItem('content')
    if(title){
      setTitle(title)
    }
    if(content){
      setContent(content)
    }
}, [])

useEffect(() => {
    const generatePreview = async () => {
      const newHtml = await markdownToHtml(content);
      setHtml(newHtml);
    }
    generatePreview();
}, [preview])

const handleSave = async () => {
  if(session.data){
    const title = localStorage.getItem('title')
    const content = localStorage.getItem('content') 
    if(title && content && session.data.user && session.data.user.id){
    console.log('Saving Blog:', { title, content });
    await saveBlog({ 
      title,
      content,
      authorId: session?.data?.user?.id
    });
  }
  }
}

const changeToPreview = () => { 
  setPreview(!preview)
}

const insertAtCursor = (text: string) => {
  const textarea = document.getElementById('content') as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const newText = content.slice(0, start) + text + content.slice(end);
  setContent(newText);
  textarea.focus();
  textarea.selectionEnd = start + text.length;
};

const handleBold = () => insertAtCursor('**Bold Text**');
const handleItalic = () => insertAtCursor('*Italic Text*');
const handleLink = () => insertAtCursor('[Link Text](url)');
const handleImage = () => insertAtCursor('![Alt Text](image-url)');
const handleList = () => insertAtCursor('- List item\n');
const handleCodeBlock = () => insertAtCursor('```\nCode Block\n```');

const handleHeader = (level: number) => {
  const headerMarkdown = '#'.repeat(level) + ' ';
  insertAtCursor(`${headerMarkdown}Header ${level}\n`);
};
  const clearStorage = () => {  
    localStorage.clear()
    setTitle('')
    setContent('')
  }
  const handlePublish = async () => {
    toast({
      title: "Blog Published",
      description: "Your blog has been published successfully"
    })
    // Add your publish logic here
    try {
      if(blogId){
        await publishBlog(blogId);
      }else{
        const blogId = await handleSaveAsDraft();
        if(blogId)
          await publishBlog(blogId);
      }
      clearStorage()
      
    } catch (error) {
      console.error(error)
    }
    console.log('Publishing Blog:', { title, content });
  };

  const handleSaveAsDraft = async () => {
    try {
      if(session.data?.user?.id){
        const res = await saveBlog({title, content, authorId: session.data?.user?.id})
        if(res && res.success){
          setBlogId(res.blogId)
          return res.blogId
        }
      }
    } catch (error) {
      console.error(error)
    }
    console.log('Saving as Draft:', { title, content });
  };

  const onChangeContent = (text:string) => {
    setContent(text);
    localStorage.setItem('content', text)
  }

  const onChangeTitle = (text:string) => {
    setTitle(text);
    localStorage.setItem('title', text)
  }


  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        

       {
        !preview && <>
        <h1 className="text-3xl font-bold mb-6">Create a New Blog✨</h1>
        {/* Title Input */}
     <div className="mb-6">
       <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
       <input
         type="text"
         id="title"
         value={title}
         onChange={(e) => onChangeTitle(e.target.value)}
         className="w-full p-3  border-l border-gray-600  focus:outline-none "
         placeholder="Enter your blog title"
       />
     </div>
     

     {/* Content Textarea */}
     <div className="mb-6">
       <label htmlFor="content" className="block text-lg font-medium mb-2">Content</label>
       <Toolbar
       onBold={handleBold}
       onItalic={handleItalic}
       onLink={handleLink}
       onImage={handleImage}
       onList={handleList}
       onCodeBlock={handleCodeBlock}
       onHeader={handleHeader}
     />
       <textarea
         id="content"
         value={content}
         onChange={(e) => onChangeContent(e.target.value)}
         className="w-full p-3 h-64  border-l border-gray-600  focus:outline-none "
         placeholder="Write your blog content..."
       />
     </div>
    </>
       }
        {/* Preview Section */}

        {
          preview && <>
          <Button
            onClick={changeToPreview}
            variant={"outline"}
          >
            &larr; Preview
          </Button>
            <BlogView title={title} html={html} />
          </>
        }

        {/* Action Buttons */}

        <div className="flex justify-end space-x-4">
          <Button
            onClick={changeToPreview}
            variant={"outline"}
          >
            Preview &rarr;
          </Button>
          <Button
            onClick={handleSaveAsDraft}
            variant={"outline"}
          >
            Save as Draft
          </Button>
          <Button
            variant={"green"}
            onClick={handlePublish}
          >
            Publish
          </Button>
          
        </div>
      </div>
    </div>
  );
}
