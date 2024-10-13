"use client"
import { CldUploadButton } from 'next-cloudinary';
import React from 'react'
import { Button } from '../ui/button';

const ImageUploadButton = () => {
  return (
    <Button variant={"default"}>
        <CldUploadButton uploadPreset="<Upload Preset>" />
    </Button>
  )
}

export default ImageUploadButton