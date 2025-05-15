
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import TagsInput from "../components/TagsInput";
import { Button } from "../components/ui/button";
import { posts } from "../lib/data";
import { Post } from "../lib/types";
import { toast } from "sonner";
import { v4 as uuid } from 'uuid';

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For editing, fetch the post data
  useEffect(() => {
    if (isEditing) {
      const post = posts.find((p) => p.id === id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCoverImage(post.coverImage || "");
        setCategories(post.categories);
        setTags(post.tags);
      }
    }
  }, [id, isEditing]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title for your post");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new post object
    const postData: Post = {
      id: isEditing ? id! : uuid(),
      title,
      content,
      excerpt: excerpt || title.substring(0, 120) + "...",
      coverImage,
      author: "Current User", // In a real app, this would come from authentication
      date: new Date().toISOString().split("T")[0],
      categories,
      tags,
      likes: isEditing ? (posts.find((p) => p.id === id)?.likes || 0) : 0,
      comments: isEditing ? (posts.find((p) => p.id === id)?.comments || []) : [],
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be an API call
      if (isEditing) {
        // Find and update post in array
        const postIndex = posts.findIndex((p) => p.id === id);
        if (postIndex !== -1) {
          posts[postIndex] = postData;
        }
        toast.success("Post updated successfully!");
      } else {
        // Add new post to array
        posts.unshift(postData);
        toast.success("Post created successfully!");
      }
      
      setIsSubmitting(false);
      navigate(`/post/${postData.id}`);
    }, 1000);
  };
  
  // Mock image upload options
  const coverImageOptions = [
    { url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", label: "Computer Code" },
    { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", label: "Programming" },
    { url: "https://images.unsplash.com/photo-1518770660439-4636190af475", label: "Circuit Board" },
    { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", label: "Laptop" },
    { url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", label: "Woman with Laptop" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a captivating title"
                required
              />
            </div>
            
            {/* Cover Image Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {coverImageOptions.map((option) => (
                  <div 
                    key={option.url}
                    onClick={() => setCoverImage(option.url)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden h-32 border-2 ${
                      coverImage === option.url ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={option.url} 
                      alt={option.label}
                      className="w-full h-full object-cover"
                    />
                    {coverImage === option.url && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {coverImage && (
                <button 
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove cover image
                </button>
              )}
            </div>
            
            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt (optional)
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a brief description of your post (will be auto-generated if left empty)"
              />
            </div>
            
            {/* Categories and Tags */}
            <div className="grid gap-6 md:grid-cols-2">
              <TagsInput
                label="Categories"
                tags={categories}
                setTags={setCategories}
                placeholder="Add category and press Enter"
              />
              <TagsInput
                label="Tags"
                tags={tags}
                setTags={setTags}
                placeholder="Add tag and press Enter"
              />
            </div>
            
            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <Editor content={content} setContent={setContent} />
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 
                  (isEditing ? "Updating..." : "Publishing...") : 
                  (isEditing ? "Update Post" : "Publish Post")}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Create;
