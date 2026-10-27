import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogDetail = ({ selectedPost, blogPosts }) => {
  const navigate = useNavigate();

  // If there's no selectedPost (like on direct navigation), find it from URL params
  // or redirect back
  if (!selectedPost) {
    navigate('/blog');
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className="relative">
        {/* Back button - Fixed to use navigation */}
        <button 
          onClick={() => navigate('/blog')}
          className="absolute top-4 left-4 z-10 flex items-center px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-cyan-500/30 hover:bg-cyan-900/30 transition-colors"
        >
          Back to Articles
        </button>
        
        {/* Featured image */}
        {selectedPost.image && (
          <div className="h-64 md:h-96 relative overflow-hidden">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
              <div className="inline-block px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium mb-4">
                {selectedPost.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{selectedPost.title}</h1>
              <div className="flex items-center text-gray-300">
                <div className="w-10 h-10 rounded-full mr-3 border-2 border-cyan-500 bg-gray-700 flex items-center justify-center text-white font-bold">
                  {selectedPost.author ? selectedPost.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <div className="font-medium">{selectedPost.author || 'Admin'}</div>
                  <div className="text-sm text-gray-400">{formatDate(selectedPost.updatedAt)} • {selectedPost.readTime} min read</div>
                </div>
              </div>
            </div>
            
            {/* Gaming-style corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500"></div>
          </div>
        )}
        
        {!selectedPost.image && (
          <div className="h-64 md:h-96 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
              <div className="inline-block px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium mb-4">
                {selectedPost.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{selectedPost.title}</h1>
              <div className="flex items-center text-gray-300">
                <div className="w-10 h-10 rounded-full mr-3 border-2 border-cyan-500 bg-gray-700 flex items-center justify-center text-white font-bold">
                  {selectedPost.author ? selectedPost.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <div className="font-medium">{selectedPost.author || 'Admin'}</div>
                  <div className="text-sm text-gray-400">{formatDate(selectedPost.updatedAt)} • {selectedPost.readTime} min read</div>
                </div>
              </div>
            </div>
            
            {/* Gaming-style corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500"></div>
          </div>
        )}
      </div>
      
      <div className="p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg max-w-none text-gray-300">
              {selectedPost.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('<h2>')) {
                  return <h2 key={index} className="text-2xl font-bold mb-4 mt-6 text-cyan-300">{paragraph.replace('<h2>', '').replace('</h2>', '')}</h2>;
                } else if (paragraph.startsWith('<h3>')) {
                  return <h3 key={index} className="text-xl font-bold mb-3 mt-5 text-cyan-400">{paragraph.replace('<h3>', '').replace('</h3>', '')}</h3>;
                } else if (paragraph.startsWith('<img')) {
                  // Extract src from img tag
                  const srcMatch = paragraph.match(/src="([^"]+)"/);
                  const altMatch = paragraph.match(/alt="([^"]+)"/);
                  return (
                    <img 
                      key={index} 
                      src={srcMatch ? srcMatch[1] : ''} 
                      alt={altMatch ? altMatch[1] : ''} 
                      className="rounded-lg my-4 w-full" 
                    />
                  );
                } else if (paragraph.startsWith('<blockquote')) {
                  return (
                    <blockquote key={index} className="border-l-4 border-cyan-500 pl-4 italic my-6">
                      {paragraph.replace(/<[^>]*>/g, '')}
                    </blockquote>
                  );
                } else if (paragraph.startsWith('<strong>')) {
                  return <p key={index} className="mb-4"><strong>{paragraph.replace('<strong>', '').replace('</strong>', '')}</strong></p>;
                } else if (paragraph.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="mb-4">{paragraph.replace(/<[^>]*>/g, '')}</p>;
                }
              })}
            </div>
            
            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-cyan-300">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags && selectedPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gray-800 border border-cyan-500/30 rounded-full hover:bg-cyan-900/30 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Engagement stats */}
            <div className="mt-8 flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-lg hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                  {selectedPost.views || 0}
                </button>
                <button className="flex items-center text-lg hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  0 Comments
                </button>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all">
                Share Article
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Author info */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">About the Author</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full mr-4 border-2 border-cyan-500 bg-gray-700 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedPost.author ? selectedPost.author.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{selectedPost.author || 'Admin'}</div>
                    <div className="text-gray-400">Content Creator</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Passionate about creating engaging content. Follow for regular updates and insights.</p>
              </div>
              
              {/* Related articles */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">More to Read</h3>
                {blogPosts
                  .filter(post => post._id !== selectedPost._id)
                  .slice(0, 3)
                  .map(post => (
                    <div 
                      key={post._id} 
                      className="mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/blog/${post._id}`)}
                    >
                      <div className="font-medium mb-1">{post.title}</div>
                      <div className="text-sm text-gray-400 flex justify-between">
                        <span>{post.category}</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;