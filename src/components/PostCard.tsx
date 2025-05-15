
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../lib/types";
import { Heart, MessageSquare, Share } from "lucide-react";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${featured ? 'lg:flex' : ''}`}>
      {post.coverImage && (
        <Link to={`/post/${post.id}`} className={`block ${featured ? 'lg:w-2/5' : ''}`}>
          <div className="h-48 md:h-64 lg:h-full w-full bg-gray-200 overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </Link>
      )}
      <div className={`p-6 ${featured ? 'lg:w-3/5' : ''}`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {post.categories.map((category, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        <Link to={`/post/${post.id}`}>
          <h2 className={`font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-medium text-sm text-gray-800">{post.author}</div>
            <span className="mx-2 text-gray-500">•</span>
            <div className="text-sm text-gray-500">{post.date}</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
              <Heart size={18} className="mr-1" />
              <span className="text-xs">{post.likes}</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
              <MessageSquare size={18} className="mr-1" />
              <span className="text-xs">{post.comments.length}</span>
            </button>
            <button className="text-gray-500 hover:text-blue-600 transition-colors">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
