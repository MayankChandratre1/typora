"use client"
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useState } from 'react';
 

import React from 'react'
import { Button } from '../ui/button';

const ImageUploadWidget = ({setUrl}:{
    setUrl:React.Dispatch<React.SetStateAction<string | CloudinaryUploadWidgetInfo | undefined>>,
    
}) => {
    const [resource, setResource] = useState<string | CloudinaryUploadWidgetInfo>();
  return (
    <CldUploadWidget
    options={{ sources: ['local', 'url'] }}
    uploadPreset="typora_preset"
  onSuccess={(result, { }) => {
    console.log("###CLOUDINARY:\n"+JSON.stringify(result));
    if(result.info)
        setResource(result?.info);
    if(typeof result.info !== "string"){
        setUrl(result.info?.url)
        console.log(resource);
        
    }  // { public_id, secure_url, etc }
  }}
  onError={(err)=>{
    console.log("###CLOUDINARY:\n"+JSON.stringify(err));
  }}
  onQueuesEnd={(result, { widget }) => {
    widget.close();
  }}
>
  {({ open }) => {
    function handleOnClick() {
      setResource(undefined);
      open();
    }
    return (
      <Button variant={"secondary"}
       onClick={handleOnClick}>
        Upload an Image
      </Button>
    );
  }}
</CldUploadWidget>
  )
}

export default ImageUploadWidget



 
