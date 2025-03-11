import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Reply } from "lucide-react";

type Comment = {
  id: number;
  user: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  attachments: Array<{
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  replies?: Comment[];
};

type CommentThreadProps = {
  comments: Comment[];
};

export function CommentThread({ comments }: CommentThreadProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-2">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {comment.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {comment.role}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {comment.timestamp}
                </span>
              </div>
              <p className="text-sm">{comment.text}</p>

              {comment.attachments && comment.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {comment.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center mr-2">
                          {attachment.type.includes("image") ? "📷" : "📄"}
                        </div>
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2 mt-2">
                <Button variant="ghost" size="sm">
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-11 pl-4 border-l-2 border-muted space-y-4 mt-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start space-x-3">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {reply.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">
                          {reply.user}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {reply.role}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {reply.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Separator className="mt-4" />
        </div>
      ))}
    </div>
  );
}
