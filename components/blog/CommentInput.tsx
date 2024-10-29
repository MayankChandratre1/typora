import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

function CommentInput() {
  return (
    <div className="grid gap-2 w-1/2">
      <Textarea placeholder="Type your message here." className="h-8 max-h-32 overflow-y-auto"  />
      <Button variant={"gray"}>Send message</Button>
    </div>
  )
}

export default CommentInput;