import React, { useEffect } from "react";
import { Input } from "../ui/input";
import TagPreview from "../tag/TagPreview";
import Image from "next/image";
import ImageUploadWidget from "../cloudinary/ImageUploadWidget";
import { Button } from "../ui/button";
import { addTagToBlog, createTag } from "@/lib/actions/tagActions";
import { updateBlog } from "@/lib/actions/blogActions";
import { toast } from "@/hooks/use-toast";

const MetadataModal = ({ close, publish }: { close: () => void, publish: ()=>Promise<string | undefined> }) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [thumbnail, setThumbnail] = React.useState<string | null>(null);
  const [tagIds, setTagIds] = React.useState<string[]>([]);

  useEffect(() => {}, [tags, tagIds, thumbnail]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.trim() && text.endsWith(" ")) {
      setTags([...tags, "#" + text.slice(0, -1).trim()]);
      e.target.value = "";
    }
  };
  const createTags = async () => {
    const results = await Promise.all(
      tags.map(async (tag) => {
        const { tagId } = await createTag(tag);
        return  tagId ? tagId : null;
      })
    );

    setTagIds([...tagIds, ...results.filter((tagId) => tagId !== null)]);
    return [...tagIds, ...results.filter((tagId) => tagId !== null)]
  };
  const addTags = async (blogId:string, tagIds:string[]) => {
    console.log("### Adding tags to blog: ", tagIds);
    
    
   await Promise.all(
      tagIds.map(async (tagId) => {
        console.log("### Adding tag to blog: ", tagId);
        
        const { success } = await addTagToBlog(blogId, tagId);
        return success ;
      })
    );
  };
  const addThumbnail = async (blogId:string) => {
    if(!thumbnail) return;
    const result = await updateBlog(blogId, {
        thumbnail_url: thumbnail
    })
    return result?.success
  };

  const handleFinish = async () => {
    const tagIds = await createTags();
    const savedBlogId =  await publish();
    if(savedBlogId){
      await addTags(savedBlogId, tagIds);
      await addThumbnail(savedBlogId);
      toast({
          title: "Metadata Updated",
          description: "Tags and Thumbnail has been updated successfully"
      })
      close();
    }
  };

  return (
    <div
      className="p-10 z-50 rounded-lg w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-500/10 "
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="my-2 w-full flex justify-end">
        <Button onClick={close} className="" variant={"destructive"}>
          X
        </Button>
      </div>
      <div id="tagsInputBox">
        <h3 className="font-semibold mb-3 text-xl">Add Some Tags</h3>
        <Input
          type="text"
          className="dark:border-gray-400"
          placeholder="Add tags"
          onChange={handleTagsChange}
        />
        <div id="tags" className="my-2">
          {tags.map((tag) => (
            <TagPreview
              key={tag}
              removeTag={() => {
                setTags(tags.filter((t) => t !== tag));
              }}
              title={tag}
            />
          ))}
        </div>
      </div>
      <div id="thumbnailInputBox">
        <h3 className="font-semibold my-3 text-xl">
          Add a thumbnail <i className="text-xs text-gray-400">(optional)</i>
        </h3>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`thumbnail`}
            className="w-full max-h-[300px] object-cover rounded-lg mb-4"
            width={500}
            height={500}
          />
        ) : (
          <div className="w-full h-[300px] rounded-lg bg-gray-200 dark:bg-gray-600 mb-4 grid place-items-center">
            No Thumbnail
          </div>
        )}
        <ImageUploadWidget
          setUrl={(value) => {
            setThumbnail(value?.toString() || "");
          }}
        />
      </div>
      <div className="my-2 w-full flex justify-end">
        <Button onClick={handleFinish} className="" variant={"green"} >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default MetadataModal;
