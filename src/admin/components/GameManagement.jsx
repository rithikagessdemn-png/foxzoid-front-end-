import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGames,
  addGame,
  updateGame,
  deleteGame,
} from "../../redux/slices/adminGameSlice";

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL || "https://foxzoidgamestudio.com/api";

const GameManagement = () => {
  const dispatch = useDispatch();
  const admingame = useSelector((state) => state.admingame);
  const games = admingame?.games || [];
  const loading = admingame?.loading || false;
  const uploadProgress = admingame?.uploadProgress || 0;

  /* =======================
     LOAD FROM BACKEND
  ======================= */
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  /* =======================
     STATE MANAGEMENT
  ======================= */
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    icon: "🎮",
    description: "",
    category: "",
    playOption: "internal",
    url: "",
    zipFileName: "",
    uploadPath: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Adventure",
    "Strategy",
    "Action",
    "Puzzle",
    "RPG",
    "Sports",
  ];
  const iconOptions = [
    "🎮",
    "🚀",
    "♟️",
    "🎯",
    "🎲",
    "🕹️",
    "🎪",
    "🌐",
    "⚽",
    "🎨",
    "🧩",
    "👾",
  ];

  /* =======================
     VALIDATION FUNCTIONS
  ======================= */
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = "Game name is required";
    if (!formData.category) errors.category = "Category is required";
    if (formData.playOption === "external" && !formData.url.trim()) {
      errors.url = "External URL is required";
    }
    if (formData.playOption === "internal" && !zipFile && !editingGame) {
      errors.zipFile = "Unity WebGL ZIP file is required";
    }
    
    return errors;
  };

  /* =======================
     HANDLERS
  ======================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleZipChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.endsWith(".zip")) {
        setFormErrors(prev => ({ ...prev, zipFile: "File must be a .zip archive" }));
        return;
      }
      setZipFile(file);
      setFormData(prev => ({ ...prev, zipFileName: file.name }));
      setFormErrors(prev => ({ ...prev, zipFile: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFormErrors(prev => ({ ...prev, image: "File must be an image" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFormErrors(prev => ({ ...prev, image: "Image must be less than 5MB" }));
        return;
      }
      setImageFile(file);
      setFormErrors(prev => ({ ...prev, image: "" }));
    }
  };

  const handleAddNew = () => {
    setEditingGame(null);
    setZipFile(null);
    setImageFile(null);
    setFormErrors({});
    setFormData({
      id: "",
      name: "",
      icon: "🎮",
      description: "",
      category: "",
      playOption: "internal",
      url: "",
      zipFileName: "",
      uploadPath: "",
    });
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleEdit = useCallback((game) => {
    setEditingGame(game);
    setImageFile(null);
    setZipFile(null);
    setFormErrors({});
    setFormData({
      id: game._id,
      name: game.name,
      icon: game.icon || "🎮",
      description: game.description || "",
      category: game.category || "",
      playOption: game.playOption || "external",
      url: game.gameUrl || game.url || "",
      zipFileName: game.zipFileName || "",
      uploadPath: game.uploadPath || "",
    });
    setShowForm(true);
    // Scroll the form into view — works inside overflow-auto containers
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const data = new FormData();

    // ── Always append every text field ─────────────────────────────────────
    // The backend's buildGameData() maps "url" → "gameUrl" in MongoDB.
    // We must append ALL fields even if empty so the backend can clear stale values.
    data.append("name",        formData.name);
    data.append("icon",        formData.icon || "🎮");
    data.append("description", formData.description || "");
    data.append("category",    formData.category);
    data.append("playOption",  formData.playOption);

    // "url" field → backend stores this as gameUrl in MongoDB
    data.append("url", formData.playOption === "external" ? (formData.url || "") : "");

    // ── File uploads (only if new file selected) ───────────────────────────
    if (zipFile) {
      data.append("zip", zipFile, zipFile.name);
    }
    if (imageFile) {
      data.append("image", imageFile, imageFile.name);
    }

    let result;
    if (editingGame) {
      result = await dispatch(updateGame({ id: editingGame._id, data }));
    } else {
      result = await dispatch(addGame(data));
    }

    // Close form and refresh list only on success
    if (result.meta.requestStatus === "fulfilled") {
      handleCancel();
      dispatch(fetchGames());
    }
  };


  const handleCancel = () => {
    setShowForm(false);
    setEditingGame(null);
    setZipFile(null);
    setImageFile(null);
    setFormErrors({});
  };

  const handleDelete = (id) => {
    dispatch(deleteGame(id));
    setDeleteConfirm(null);
  };

  /* =======================
     GET IMAGE URL (Helper function)
  ======================= */
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    
    // If image already has full URL, return as is
    if (imagePath.startsWith("http")) return imagePath;
    
    // If image starts with /, use it directly, otherwise add /
    const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    
    // Return full URL using BACKEND_URL
    return `${BACKEND_URL}${path}`;
  };

  /* =======================
     MEMOIZED VALUES
  ======================= */
  const stats = useMemo(
    () => ({
      total: games.length,
      unity: games.filter((g) => g.playOption === "internal").length,
      external: games.filter((g) => g.playOption === "external").length,
      categories: [...new Set(games.map(g => g.category).filter(Boolean))].length,
    }),
    [games]
  );

  const filteredGames = useMemo(
    () =>
      games.filter((game) => {
        const matchesSearch =
          game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || game.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [games, searchTerm, selectedCategory]
  );

  /* =======================
     FORM FIELD COMPONENTS
  ======================= */
  const renderFormField = (label, name, type = "text", required = false, placeholder = "") => (
    <div>
      <label className="block text-gray-300 mb-2 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
          formErrors[name] ? "border-red-500" : "border-gray-600"
        }`}
        placeholder={placeholder}
      />
      {formErrors[name] && (
        <p className="text-red-400 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🎮 Game Management
            </h1>
            <p className="text-gray-400">
              Add, edit, and manage Unity WebGL & external games
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            <span className="text-xl mr-2">+</span>
            <span>Add New Game</span>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Games",
            value: stats.total,
            icon: "🎮",
            color: "from-blue-900/30 to-blue-800/20",
            textColor: "text-blue-400"
          },
          {
            label: "Unity Games",
            value: stats.unity,
            icon: "📦",
            color: "from-green-900/30 to-green-800/20",
            textColor: "text-green-400"
          },
          {
            label: "External Games",
            value: stats.external,
            icon: "🌐",
            color: "from-purple-900/30 to-purple-800/20",
            textColor: "text-purple-400"
          },
          {
            label: "Categories",
            value: stats.categories,
            icon: "🏷️",
            color: "from-amber-900/30 to-amber-800/20",
            textColor: "text-amber-400"
          },
        ].map((stat, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`text-3xl p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Form Section */}
      {showForm && (
        <div ref={formRef} className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingGame ? "✏️ Edit Game" : "➕ Add New Game"}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white text-2xl bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Icon Selection */}
                <div>
                  <label className="block text-gray-300 mb-3 font-medium">
                    Game Icon <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-6 gap-3 mb-4">
                    {iconOptions.map((icon) => (
                      <button
                        type="button"
                        key={icon}
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`text-2xl p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                          formData.icon === icon
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 ring-2 ring-blue-500 scale-105"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-xl">
                    <div className="text-5xl mb-2">{formData.icon}</div>
                    <p className="text-gray-400 text-sm">Selected Icon</p>
                  </div>
                </div>

                {/* Game Name */}
                {renderFormField("Game Name", "name", "text", true, "Enter game name")}

                {/* Category */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                      formErrors.category ? "border-red-500" : "border-gray-600"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories
                      .filter((c) => c !== "all")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                  {formErrors.category && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.category}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Enter game description"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Game Image (Thumbnail)
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    {formErrors.image && (
                      <p className="text-red-400 text-sm mt-2">{formErrors.image}</p>
                    )}
                  </div>

                  {(imageFile || editingGame?.image) && (
                    <div className="mt-4">
                      <p className="text-gray-400 text-sm mb-2">Preview</p>
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : getImageUrl(editingGame?.image)
                        }
                        alt="Preview"
                        className="h-32 w-full rounded-lg border border-gray-600 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Play Option */}
                <div>
                  <label className="block text-gray-300 mb-3 font-medium">
                    Play Option <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          playOption: "internal",
                          url: "",
                        })
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                        formData.playOption === "internal"
                          ? "border-green-500 bg-gradient-to-br from-green-900/30 to-green-800/20 text-green-400 shadow-lg"
                          : "border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <span className="text-2xl mb-2">📦</span>
                      <span className="font-medium">Unity WebGL</span>
                      <span className="text-sm mt-1">Upload ZIP file</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          playOption: "external",
                          zipFileName: "",
                          uploadPath: "",
                        })
                      }
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                        formData.playOption === "external"
                          ? "border-blue-500 bg-gradient-to-br from-blue-900/30 to-blue-800/20 text-blue-400 shadow-lg"
                          : "border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <span className="text-2xl mb-2">🌐</span>
                      <span className="font-medium">External URL</span>
                      <span className="text-sm mt-1">Link to external site</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Fields based on Play Option */}
                {formData.playOption === "internal" ? (
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Unity WebGL ZIP File <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-4 hover:border-green-500 transition-colors duration-200">
                      <input
                        type="file"
                        accept=".zip"
                        onChange={handleZipChange}
                        required={!editingGame}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
                      />
                      {formErrors.zipFile && (
                        <p className="text-red-400 text-sm mt-2">{formErrors.zipFile}</p>
                      )}
                      {formData.zipFileName && (
                        <div className="mt-3 p-3 bg-gray-700 rounded-lg">
                          <p className="text-green-400 text-sm font-medium">
                            📦 Selected: {formData.zipFileName}
                          </p>
                          {formData.uploadPath && (
                            <p className="text-gray-400 text-xs mt-1">
                              Path: {formData.uploadPath}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {renderFormField(
                      "Game URL",
                      "url",
                      "url",
                      true,
                      "https://example.com/game"
                    )}
                  </div>
                )}

                {/* Upload Progress Bar */}
                {loading && uploadProgress > 0 && (
                  <div className="pt-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>📦 Uploading game files...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Please wait — large ZIP files may take a minute on production.
                    </p>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading
                      ? uploadProgress > 0
                        ? `Uploading... ${uploadProgress}%`
                        : "Processing..."
                      : editingGame
                      ? "🔄 Update Game"
                      : "✅ Add Game"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Controls Section */}
      <div className="mb-6 p-5 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute left-4 top-3.5 text-gray-400">🔍</div>
            <input
              type="text"
              placeholder="Search games by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-400 font-medium">Filter by:</div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-750 to-gray-700">
              <tr>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                  Icon
                </th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                  Game Details
                </th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                  Category
                </th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                  Type
                </th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                  File/URL
                </th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 px-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                      <div className="text-gray-400 text-lg">Loading games...</div>
                    </div>
                  </td>
                </tr>
              ) : filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <tr
                    key={game._id}
                    className="border-t border-gray-700 hover:bg-gray-750 transition-all duration-150"
                  >
                    <td className="py-4 px-6">
                      <div className="text-3xl">{game.icon}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="font-bold text-white text-lg mb-1">
                          {game.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {game.description}
                        </p>
                        {game.image && (
                          <div className="mt-2">
                            <img
                              src={getImageUrl(game.image)}
                              alt={game.name}
                              className="h-16 w-24 object-cover rounded-lg border border-gray-600"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1.5 bg-gray-700 rounded-full text-sm text-gray-300 font-medium">
                        {game.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          game.playOption === "internal"
                            ? "bg-green-900/30 text-green-400 border border-green-800"
                            : "bg-blue-900/30 text-blue-400 border border-blue-800"
                        }`}
                      >
                        {game.playOption === "internal"
                          ? "Internal"
                          : "External"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        {game.playOption === "internal" ? (
                          <div>
                            <div className="text-green-400 flex items-center">
                              <span className="mr-2">📦</span>
                              <span className="truncate max-w-xs">
                                {game.zipFileName || "No file"}
                              </span>
                            </div>
                            {game.uploadPath && (
                              <div className="text-xs text-gray-500 mt-1 truncate">
                                Path: {game.uploadPath}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-blue-400 truncate max-w-xs flex items-center">
                            <span className="mr-2">🔗</span>
                            <a
                              href={game.gameUrl || game.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-300 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {game.gameUrl || game.url}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                        <button
                          onClick={() => handleEdit(game)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 flex items-center justify-center transform hover:scale-[1.02]"
                        >
                          <span>✏️</span>
                          <span className="ml-2">Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(game._id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 flex items-center justify-center transform hover:scale-[1.02]"
                        >
                          <span>🗑️</span>
                          <span className="ml-2">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-16 px-6 text-center">
                    <div className="text-gray-400 text-xl mb-4">🎮 No games found</div>
                    <p className="text-gray-500 mb-6">
                      {searchTerm || selectedCategory !== "all"
                        ? "Try adjusting your search or filter"
                        : "Get started by adding your first game"}
                    </p>
                    <button
                      onClick={handleAddNew}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Add Your First Game
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gray-750 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border-t border-gray-700">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            Showing {filteredGames.length} of {games.length} games
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              ← Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
              2
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl w-full max-w-md p-8 border border-gray-700">
            <div className="text-center">
              <div className="text-5xl mb-6">⚠️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Delete Game</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Are you sure you want to delete this game? This action cannot be
                undone and all game data will be permanently removed.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-200 font-medium transform hover:scale-[1.02]"
                >
                  Delete Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameManagement;