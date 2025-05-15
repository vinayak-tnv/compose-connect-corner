
import React, { useState } from "react";
import { Comment } from "../lib/types";
import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Omit<Comment, "id" | "date" | "likes">) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && author.trim()) {
      setIsSubmitting(true);
      
      // Simulate network delay
      setTimeout(() => {
        onAddComment({
          author: author.trim(),
          content: newComment.trim(),
        });
        setNewComment("");
        setAuthor("");
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      
      {/* Comment form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your thoughts..."
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{comment.author}</h4>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
                <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                  <Heart size={16} className="mr-1" />
                  <span className="text-xs">{comment.likes}</span>
                </button>
              </div>
              <p className="mt-2 text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
