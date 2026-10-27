import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminBlogs } from '../redux/slices/adminBlogSlice.js';
import BlogList from '../components/Blog/BlogList';
import BlogDetail from '../components/Blog/BlogDetail';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.adminBlog);
  
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blogs from Redux store
  useEffect(() => {
    dispatch(fetchAdminBlogs());
  }, [dispatch]);

  // Get unique categories
  const categories = ["All", ...new Set(posts.map(post => post.category))];

  // Filter posts based on category and search
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Featured posts (for sidebar)
  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 p-4 md:p-8">
      {/* Gaming-style Header */}
      <header className="relative mb-12 overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-r from-gray-900 to-gray-800 p-6 md:p-8">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              GAME<span className="text-white">BLOG</span>
            </h1>
            <p className="text-gray-400">Insights, news, and analysis from the gaming universe</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="px-4 py-3 bg-gray-800 border border-cyan-500/30 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-3 text-cyan-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated gaming-style dots */}
        <div className="absolute bottom-2 right-4 flex space-x-1">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-4">Loading blogs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">Error: {error}</div>
            <button 
              onClick={() => dispatch(fetchAdminBlogs())}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : selectedPost ? (
          /* Blog Detail View */
          <BlogDetail 
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            blogPosts={posts}
          />
        ) : (
          /* Blog List View */
          <BlogList 
            blogPosts={posts}
            setSelectedPost={setSelectedPost}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredPosts={filteredPosts}
            featuredPosts={featuredPosts}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPage;