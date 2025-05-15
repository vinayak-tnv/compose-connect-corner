
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CommentSection from "../components/CommentSection";
import { posts } from "../lib/data";
import { Comment } from "../lib/types";
import { Button } from "../components/ui/button";
import { Heart, Share, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState(posts.find((p) => p.id === id));
  const [liked, setLiked] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  useEffect(() => {
    // Find post in our data
    const foundPost = posts.find((p) => p.id === id);
    if (!foundPost) {
      navigate("/");
    } else {
      setPost(foundPost);
    }
  }, [id, navigate]);
  
  if (!post) {
    return null;
  }
  
  const handleLike = () => {
    if (!liked) {
      // Update post likes in our data array
      const postIndex = posts.findIndex((p) => p.id === id);
      if (postIndex !== -1) {
        posts[postIndex] = {
          ...posts[postIndex],
          likes: posts[postIndex].likes + 1
        };
        setPost(posts[postIndex]);
        setLiked(true);
        toast.success("Post liked!");
      }
    }
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API
    toast.success("Sharing link copied to clipboard!");
  };
  
  const handleDelete = () => {
    if (confirmDelete) {
      // Remove post from our data array
      const postIndex = posts.findIndex((p) => p.id === id);
      if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        toast.success("Post deleted successfully");
        navigate("/");
      }
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };
  
  const handleAddComment = (newComment: Omit<Comment, "id" | "date" | "likes">) => {
    const comment: Comment = {
      id: uuid(),
      ...newComment,
      date: new Date().toISOString().split("T")[0],
      likes: 0
    };
    
    // Add comment to our post in the data array
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex !== -1) {
      posts[postIndex].comments.push(comment);
      setPost(posts[postIndex]);
      toast.success("Comment added!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            &larr; Back to posts
          </Link>
        </div>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Post Header */}
          <div className="p-6 md:p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category, index) => (
                <Link 
                  key={index}
                  to={`/?category=${category}`} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200"
                >
                  {category}
                </Link>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            {/* Author and Date */}
            <div className="flex items-center mb-6">
              <div>
                <div className="font-medium text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-500">{post.date}</div>
              </div>
            </div>
            
            {/* Post Content */}
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Post Actions */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-2 ${liked ? 'text-red-600' : ''}`}
              >
                <Heart size={18} className={liked ? 'fill-red-600' : ''} />
                {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share size={18} />
                Share
              </Button>
              
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="flex items-center gap-2"
                >
                  <Edit size={18} />
                  Edit
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className={`flex items-center gap-2 ${confirmDelete ? 'bg-red-100 text-red-600 border-red-300' : ''}`}
                >
                  <Trash2 size={18} />
                  {confirmDelete ? 'Confirm Delete' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        </article>
        
        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8">
          <CommentSection 
            comments={post.comments} 
            onAddComment={handleAddComment}
          />
        </div>
      </main>
    </div>
  );
};

export default Post;
