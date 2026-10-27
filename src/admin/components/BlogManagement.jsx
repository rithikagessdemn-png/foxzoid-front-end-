import React, { useState, useEffect, useMemo } from "react";
import {
  FaPlus, FaTimes, FaImage, FaEdit, FaTrashAlt,
  FaSearch, FaClock, FaEye, FaFileAlt
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminBlogs,
  createAdminBlog,
  updateAdminBlog,
  deleteAdminBlog,
} from "../../redux/slices/adminBlogSlice";

// Constants
const CATEGORIES = ["All", "Technology", "Design", "Development", "Business", "Marketing", "Gaming", "Other"];
const INITIAL_FORM_DATA = {
  _id: null,
  title: "",
  content: "",
  excerpt: "",
  category: "Technology",
  tags: "",
  image: "",
  status: "draft",
  author: "Admin",
  readTime: 5,
};

const BlogManagement = () => {
  const dispatch = useDispatch();

  /* =======================
     REDUX STATE
  ======================= */
  const { posts, loading, error } = useSelector((state) => state.adminBlog);

  /* =======================
     LOCAL STATE
  ======================= */
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /* =======================
     FETCH BLOGS
  ======================= */
  useEffect(() => {
    dispatch(fetchAdminBlogs());
  }, [dispatch]);

  useEffect(() => {
    console.log("Posts State:", posts);
  }, [posts]);

  /* =======================
     MEMOS
  ======================= */
  const postsStats = useMemo(() => {
    if (!Array.isArray(posts)) {
      return { total: 0, published: 0, drafts: 0, totalViews: 0 };
    }
    return {
      total: posts.length,
      published: posts.filter((p) => p.status === "published").length,
      drafts: posts.filter((p) => p.status === "draft").length,
      totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];
    let results = posts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (post) =>
          post.title?.toLowerCase().includes(term) ||
          post.content?.toLowerCase().includes(term) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(term)))
      );
    }

    if (selectedCategory !== "All") {
      results = results.filter((post) => post.category === selectedCategory);
    }

    return results;
  }, [posts, searchTerm, selectedCategory]);

  /* =======================
     HANDLERS
  ======================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.title.trim()) {
      setSubmitError("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      setSubmitError("Content is required");
      return;
    }

    // Process tags into array
    const processedTags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // ✅ Create JSON object instead of FormData
    const blogData = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || "",
      category: formData.category,
      tags: processedTags,
      status: formData.status.toLowerCase(),
      author: formData.author || "Admin",
      readTime: formData.readTime || 5,
      image: formData.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop"
    };

    try {
      if (isEditing) {
        await dispatch(updateAdminBlog({ id: formData._id, data: blogData })).unwrap();
        alert("Blog updated successfully!");
      } else {
        await dispatch(createAdminBlog(blogData)).unwrap();
        alert("Blog created successfully!");
      }
      handleReset();
    } catch (err) {
      console.error("Submit error:", err);
      const errorMessage =
        err?.response?.data?.message || err.message || "Failed to save blog";
      setSubmitError(errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    });
    setPreviewImage(post.image || null);
    setIsEditing(true);
    setShowForm(true);
    setSubmitError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await dispatch(deleteAdminBlog(id)).unwrap();
        alert("Blog deleted successfully!");
      } catch (err) {
        console.error("Delete error:", err);
        const errorMessage =
          err?.response?.data?.message || err.message || "Failed to delete blog";
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setPreviewImage(null);
    setIsEditing(false);
    setShowForm(false);
    setSubmitError(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  /* =======================
     COMPONENTS
  ======================= */
  const StatsCard = ({ title, value, description, borderColor }) => (
    <div className={`bg-gray-800 rounded-lg p-6 border-l-4 ${borderColor}`}>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  );

  const BlogPostCard = ({ post }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop"}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop";
          }}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs ${
            post.status === "published" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-900"
          }`}>
            {post.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-xs">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt || "No excerpt available"}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags && Array.isArray(post.tags) && post.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            {formatDate(post.updatedAt || post.createdAt)}
          </div>
          <div className="flex items-center">
            <FaEye className="mr-1" />
            {post.views || 0}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => handleEdit(post)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => handleDelete(post._id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <FaTrashAlt className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
              <p className="text-gray-400">Full CRUD operations for blog posts</p>
              {error && <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>}
            </div>
            <button
              onClick={() => {
                handleReset();
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center"
            >
              <FaPlus className="w-5 h-5 mr-2" />
              Create New Post
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Total Posts" value={postsStats.total} description="All blog posts" borderColor="border-blue-500" />
          <StatsCard title="Published" value={postsStats.published} description="Live posts" borderColor="border-green-500" />
          <StatsCard title="Drafts" value={postsStats.drafts} description="In progress" borderColor="border-yellow-500" />
          <StatsCard title="Total Views" value={postsStats.totalViews.toLocaleString()} description="All time views" borderColor="border-purple-500" />
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {submitError && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
                <strong>Error:</strong> {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Post Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the post"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={8}
                      required
                      className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your blog post content here..."
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                      {previewImage ? (
                        <div className="relative">
                          <img src={previewImage} alt="Preview" className="w-full h-64 object-cover rounded-lg mb-4" />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              setFormData(prev => ({ ...prev, image: "" }));
                            }}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="py-8">
                          <FaImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400 mb-2">Upload a featured image</p>
                          <label className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg cursor-pointer">
                            Choose File
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          </label>
                          <p className="text-gray-400 text-sm mt-2">Max file size: 2MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {CATEGORIES.filter(c => c !== "All").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="React, JavaScript, Web Development"
                    />
                    <p className="text-gray-400 text-sm mt-1">Separate tags with commas</p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg"
                    >
                      {loading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Search & Filter */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <span className="text-gray-400 whitespace-nowrap">Category:</span>
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && !showForm && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-400 mt-4">Loading blogs...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <FaFileAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No blog posts found</h3>
            <p className="text-gray-400 mb-6">
              {posts.length === 0 ? "Create your first blog post to get started" : "Try adjusting your search or filter"}
            </p>
            <button
              onClick={() => {
                handleReset();
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
            >
              Create Your First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;