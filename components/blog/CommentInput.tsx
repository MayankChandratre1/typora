"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addComment } from "@/lib/actions/commentActions";
import useAuthSession from "@/lib/hooks/users/useAuthSession";
import { useState } from "react";


function CommentInput({ blogId, handleAddComment }: { blogId: string, handleAddComment: (comment: {
  id: string;
  content: string;
  userId: string;
  user: {
    username: string;
    avatar_url: string;
  },
  createdAt: Date;
}) => void }) {
  const {session} = useAuthSession();
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const res = await addComment(blogId, session?.user?.id || "",comment );
    if(!res.success){
      setError("Failed to add comment");
    }
    if(res?.comment){
      handleAddComment(res.comment);
    }
    setComment("");
    setLoading(false);
  }

  return (
    <div className="grid gap-2 w-1/2">
      <Textarea placeholder="Type your message here." className="h-8 max-h-32 overflow-y-auto" onChange={handleChange} value={comment}  />
      {
        error && <div className="text-red-500 bg-transparent">{error}</div>
      }
      <Button variant={"gray"} onClick={handleSubmit}>{
        loading ? "Loading..." : "Add Comment"
        }</Button>
    </div>
  )
}

export default CommentInput;