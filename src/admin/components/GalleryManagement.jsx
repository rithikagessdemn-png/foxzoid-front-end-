import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlus,
  FaTimes,
  FaImage,
  FaUpload,
  FaSearch,
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaAward,
  FaBuilding,
  FaUserPlus,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import {
  fetchGallery,
  addGallery,
  updateGallery,
  deleteGallery,
  toggleFeatured as toggleFeaturedAction,
} from "../../redux/slices/adminGallerySlice";

/* ===================== SINGLE LOADING COMPONENT ===================== */
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

/* ===================== LAZY LOADED COMPONENTS ===================== */
const StatsCards = lazy(() => Promise.resolve({ 
  default: ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[
        { title: "Total Gallery", value: stats.total, icon: <FaUsers />, color: "border-blue-500", text: "Gallery items" },
        { title: "Featured", value: stats.featured, icon: <FaAward />, color: "border-green-500", text: "Highlighted profiles" },
        { title: "Departments", value: stats.departments, icon: <FaBuilding />, color: "border-purple-500", text: "Active teams" },
        { title: "New This Month", value: stats.newThisMonth, icon: <FaUserPlus />, color: "border-yellow-500", text: "Recent additions" }
      ].map((stat, idx) => (
        <div key={idx} className={`bg-gray-800 rounded-lg p-6 border-l-4 ${stat.color}`}>
          <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-white mr-3">{stat.value}</span>
            <span className="text-2xl text-gray-400">{stat.icon}</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">{stat.text}</p>
        </div>
      ))}
    </div>
  )
}));

const GalleryItemCard = lazy(() => Promise.resolve({ 
  default: React.memo(({ item, onEdit, onDelete, onToggleFeatured, formatDate, getTimeAtCompany }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition duration-200 group">
      <div className="relative h-64 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <div className="absolute top-4 right-4">
          <button onClick={() => onToggleFeatured(item._id)} className={`p-2 rounded-full ${item.featured ? 'bg-yellow-500 text-gray-900' : 'bg-gray-900 text-gray-400'}`}>
            {item.featured ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">{item.department}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
        <p className="text-blue-400 font-medium mb-3">{item.role}</p>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{item.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center"><FaCalendarAlt className="mr-1" /> {formatDate(item.joinDate)}</div>
          <div className="flex items-center"><FaClock className="mr-1" /> {getTimeAtCompany(item.joinDate)}</div>
        </div>
        
        <div className="flex space-x-3">
          <button onClick={() => onEdit(item)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center">
            <FaEdit className="mr-2" /> Edit
          </button>
          <button onClick={() => onDelete(item._id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center">
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  ))
}));

const GalleryManagement = () => {
  const dispatch = useDispatch();

  /* ===================== REDUX STATE ===================== */
  const galleryItems = useSelector((state) => state.gallery.items || []);

  /* ===================== LOCAL UI STATE ===================== */
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    role: "",
    description: "",
    department: "Development",
    joinDate: new Date().toISOString().split("T")[0],
    featured: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ===================== CONSTANTS ===================== */
  const departments = ["All", "Development", "Design", "Operations", "Product", "Marketing", "Sales", "Support"];

  /* ===================== MEMOIZED VALUES ===================== */
  const stats = useMemo(() => {
    const featuredCount = galleryItems.filter(item => item.featured).length;
    const uniqueDepartments = new Set(galleryItems.map(item => item.department)).size;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newThisMonth = galleryItems.filter(item => new Date(item.joinDate) > thirtyDaysAgo).length;

    return {
      total: galleryItems.length,
      featured: featuredCount,
      departments: uniqueDepartments,
      newThisMonth
    };
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    let results = galleryItems;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.role.toLowerCase().includes(term) ||
        item.department.toLowerCase().includes(term)
      );
    }

    if (selectedDepartment !== "All") {
      results = results.filter(item => item.department === selectedDepartment);
    }

    return results;
  }, [searchTerm, selectedDepartment, galleryItems]);

  const featuredItems = useMemo(() => 
    galleryItems.filter(item => item.featured), 
    [galleryItems]
  );

  const slidesPerView = 3;
  const totalSlides = Math.ceil(featuredItems.length / slidesPerView);
  const currentSlideItems = useMemo(() => {
    const startIndex = currentSlide * slidesPerView;
    return featuredItems.slice(startIndex, startIndex + slidesPerView);
  }, [currentSlide, featuredItems, slidesPerView]);

  /* ===================== EFFECTS ===================== */
  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  /* ===================== EVENT HANDLERS ===================== */
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      image: previewImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    };

    if (isEditing) {
      dispatch(updateGallery({ id: formData._id, data: payload }));
    } else {
      dispatch(addGallery(payload));
    }

    handleReset();
    setShowForm(false);
  }, [dispatch, formData, isEditing, previewImage]);

  const handleEdit = useCallback((item) => {
    setFormData({
      ...item,
      joinDate: item.joinDate.split("T")[0],
    });
    setPreviewImage(item.image);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      dispatch(deleteGallery(id));
    }
  }, [dispatch]);

  const handleReset = useCallback(() => {
    setFormData({
      _id: null,
      name: "",
      role: "",
      description: "",
      department: "Development",
      joinDate: new Date().toISOString().split("T")[0],
      featured: false,
    });
    setPreviewImage(null);
    setImageFile(null);
    setIsEditing(false);
  }, []);

  const toggleFeatured = useCallback((id) => {
    dispatch(toggleFeaturedAction(id));
  }, [dispatch]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  /* ===================== UTILITIES ===================== */
  const formatDate = useCallback((dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }), []);

  const getTimeAtCompany = useCallback((joinDate) => {
    const join = new Date(joinDate);
    const now = new Date();

    let years = now.getFullYear() - join.getFullYear();
    let months = now.getMonth() - join.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0 && months > 0)
      return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;

    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;

    return `${months} month${months > 1 ? "s" : ""}`;
  }, []);

  /* ===================== RENDER ===================== */
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Gallery Management</h1>
              <p className="text-gray-400">Manage staff gallery with images, roles, and descriptions</p>
            </div>
            <button onClick={() => { handleReset(); setShowForm(true); }} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center">
              <FaPlus className="mr-2" /> Add New Staff
            </button>
          </div>
        </div>

        {/* Stats Cards - Lazy Loaded */}
        <Suspense fallback={<LoadingSpinner />}>
          <StatsCards stats={stats} />
        </Suspense>

        {/* Staff Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">Staff Photo *</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    {previewImage ? (
                      <div className="relative">
                        <img src={previewImage} alt="Preview" className="w-64 h-64 object-cover rounded-lg mx-auto mb-4" />
                        <button type="button" onClick={() => { setPreviewImage(null); setImageFile(null); }} className="absolute top-2 right-1/2 transform translate-x-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <div className="w-64 h-64 bg-gray-700 rounded-lg mx-auto mb-6 flex items-center justify-center">
                          <FaImage className="w-20 h-20 text-gray-400" />
                        </div>
                        <p className="text-gray-400 mb-4">Upload a professional staff photo</p>
                        <label className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg cursor-pointer transition duration-200 inline-block">
                          <span className="flex items-center"><FaUpload className="mr-2" /> Choose Photo</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" required={!isEditing} />
                        </label>
                        <p className="text-gray-500 text-sm mt-4">Recommended: Square image, 500x500px, max 2MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter staff member name" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Role/Position *</label>
                      <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Senior Developer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Department *</label>
                      <select name="department" value={formData.department} onChange={handleInputChange} className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {departments.filter(dept => dept !== 'All').map(dept => <option key={dept} value={dept}>{dept}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Join Date</label>
                    <input type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Work Description *</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="4" className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe their role, expertise, and responsibilities..." />
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                    <label htmlFor="featured" className="ml-3 text-gray-300">Mark as Featured (will appear in featured section)</label>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                      {isEditing ? 'Update Staff' : 'Add Staff'}
                    </button>
                    <button type="button" onClick={handleReset} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input type="text" placeholder="Search staff by name, role, or department..." className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="absolute left-4 top-3.5"><FaSearch className="text-gray-400" /></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 whitespace-nowrap">Department:</span>
                <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Featured Staff</h2>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">
                  {currentSlide + 1} of {totalSlides}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    disabled={totalSlides <= 1}
                    className={`p-2 rounded-full ${totalSlides <= 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                    aria-label="Previous slide"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={totalSlides <= 1}
                    className={`p-2 rounded-full ${totalSlides <= 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                    aria-label="Next slide"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSlideItems.map((item) => (
                <div key={item._id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-full border-4 border-blue-500" />
                      <div>
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        <p className="text-blue-400 font-medium">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">{item.department}</span>
                      <span className="text-yellow-400"><FaStar /></span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Joined {getTimeAtCompany(item.joinDate)} ago</span>
                      <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300">
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-blue-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gallery Grid - Lazy Loaded Items */}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <GalleryItemCard
                key={item._id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleFeatured={toggleFeatured}
                formatDate={formatDate}
                getTimeAtCompany={getTimeAtCompany}
              />
            ))}
          </div>
        </Suspense>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <FaImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No staff members found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or add a new staff member</p>
            <button onClick={() => { handleReset(); setShowForm(true); setSearchTerm(''); setSelectedDepartment('All'); }} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
              Add First Staff Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(GalleryManagement);