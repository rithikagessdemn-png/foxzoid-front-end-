import React from 'react';

const BlogList = ({ 
  blogPosts, 
  setSelectedPost, 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery,
  filteredPosts,
  featuredPosts,
  categories
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main content */}
      <div className="lg:w-2/3">
        {/* Category filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full whitespace-nowrap border transition-all ${activeCategory === category 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-transparent' 
                  : 'bg-gray-900 border-gray-700 hover:border-cyan-500/50'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured post (large) */}
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <div 
            className="relative rounded-2xl overflow-hidden border border-gray-800 mb-10 group cursor-pointer"
            onClick={() => setSelectedPost(filteredPosts.filter(post => post.featured)[0])}
          >
            {filteredPosts.filter(post => post.featured)[0].image && (
              <img 
                src={filteredPosts.filter(post => post.featured)[0].image} 
                alt={filteredPosts.filter(post => post.featured)[0].title} 
                className="w-full h-full object-cover" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <div className="relative z-20 p-8 md:p-12">
              <div className="inline-block px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium mb-4">
                {filteredPosts.filter(post => post.featured)[0].category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">
                {filteredPosts.filter(post => post.featured)[0].title}
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl">{filteredPosts.filter(post => post.featured)[0].excerpt}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 border-2 border-cyan-500 bg-gray-700 flex items-center justify-center text-white font-bold">
                  {filteredPosts.filter(post => post.featured)[0].author ? filteredPosts.filter(post => post.featured)[0].author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <div className="font-medium">{filteredPosts.filter(post => post.featured)[0].author || 'Admin'}</div>
                  <div className="text-sm text-gray-400">{formatDate(filteredPosts.filter(post => post.featured)[0].updatedAt)} • {filteredPosts.filter(post => post.featured)[0].readTime} min read</div>
                </div>
              </div>
            </div>
            
            {/* Gaming-style corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-purple-500"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-green-500"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500"></div>
          </div>
        )}
        
        {/* Blog posts grid */}
        <h3 className="text-2xl font-bold mb-6 text-cyan-300">Latest Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <div 
              key={post._id} 
              className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="px-3 py-1 bg-gray-800 text-cyan-300 rounded-full text-sm">
                    {post.category}
                  </div>
                  <div className="text-sm text-gray-400">{post.readTime} min read</div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full mr-2 border border-cyan-500 bg-gray-700 flex items-center justify-center text-white text-sm font-bold">
                      {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <span className="text-sm">{post.author || 'Admin'}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span className="flex items-center mr-4">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                      </svg>
                      {post.views || 0}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                      0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 border border-gray-800 rounded-xl">
            <div className="text-cyan-400 text-5xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Sidebar */}
      <div className="lg:w-1/3">
        <div className="sticky top-8">
          {/* Popular tags */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPosts && blogPosts.length > 0 && [...new Set(blogPosts.flatMap(post => post.tags || []))].slice(0, 8).map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm hover:border-cyan-500/50 transition-colors cursor-pointer"
                  onClick={() => setSearchQuery(tag)}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Featured articles */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Featured</h3>
            {featuredPosts.map(post => (
              <div 
                key={post._id} 
                className="mb-4 pb-4 border-b border-gray-800 last:border-0 last:mb-0 last:pb-0 group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="font-medium mb-1 group-hover:text-cyan-300 transition-colors">{post.title}</div>
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>{post.category}</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Newsletter signup */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-2 text-cyan-300">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest gaming news and analysis in your inbox</p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;