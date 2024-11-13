import React from 'react'
import { Button } from '../ui/button'

const TagPreview = ({
    title, removeTag
}:{
    title:string,
    removeTag:()=>void
}) => {
  return (
    <Button onClick={removeTag} className='mx-1 my-1' variant={"secondary"}>
        {title}
    </Button>
  )
}

export default TagPreview