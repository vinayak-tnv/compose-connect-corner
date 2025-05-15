
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { posts } from "../lib/data";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get unique categories from posts
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.categories))
  );
  
  const filteredPosts = activeCategory 
    ? posts.filter((post) => post.categories.includes(activeCategory)) 
    : posts;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blogify</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover stories, insights, and ideas from writers on any topic.
          </p>
        </section>
        
        {/* Featured Post */}
        {posts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            <PostCard post={posts[0]} featured={true} />
          </section>
        )}
        
        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
        
        {/* Latest Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeCategory ? `${activeCategory} Posts` : "Latest Posts"}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
