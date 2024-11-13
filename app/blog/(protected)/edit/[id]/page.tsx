"use client"

import BlogView from '@/components/blog/BlogPreview';
import Toolbar from '@/components/blog/ToolBar';
import { Button } from '@/components/ui/button';

import React from 'react';
import useEditor from '@/lib/hooks/blog/useEditor';
import Loader from '@/components/custom_components/Loading';
import CenterText from '@/components/custom_components/CenterText';


export default function EditBlogPage({ params }: { 
    params: { id: string }
 }) {
  const {
    title,
    content,
    preview,
    html,
    notAuthor,
    onChangeTitle,
    onChangeContent,
    changeToPreview,
    handleEditPubslish,
    handleEditSave,
    handleUnpublish,
    handleBold,
    handleItalic,
    handleLink,
    handleImage,
    handleList,
    handleCodeBlock,
    handleHeader
  } = useEditor(params.id);
  
  if(!title || !content){
    return <Loader />
  }

  if(notAuthor){
    return <CenterText text='Not Authorised'/>
  }
  
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        

       {
        !preview && <>
        <h1 className="text-3xl font-bold mb-6">Make it better🖊️</h1>
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
            onClick={handleEditSave}
            variant={"outline"}
          >
            Save
          </Button>
          <Button
            onClick={handleUnpublish}
            variant={"outline"}
          >
            Unpublish
          </Button>
          <Button
            variant={"green"}
            onClick={handleEditPubslish}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
