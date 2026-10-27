import React, { useState, useEffect } from "react";
import axios from "axios";

// Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL || "https://foxzoidgamestudio.com/api";

const UploadGame = () => {
  const [gameName, setGameName] = useState("");
  const [gameZip, setGameZip] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loadingGames, setLoadingGames] = useState(true);

  /* =======================
     SHOW MESSAGE HELPER
  ======================= */
  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  /* =======================
     FETCH GAMES
  ======================= */
  const fetchGames = async () => {
    try {
      setLoadingGames(true);
      const res = await axios.get(`${API_URL}/games`);
      setGames(res.data.games || []);
    } catch (err) {
      console.error("Failed to fetch games:", err);
      showMessage("Failed to load games", "error");
      setGames([]);
    } finally {
      setLoadingGames(false);
    }
  };

  /* =======================
     UPLOAD GAME
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!gameZip) {
      showMessage("Please select a ZIP file", "error");
      return;
    }

    if (!gameName.trim()) {
      showMessage("Please enter a game name", "error");
      return;
    }

    const formData = new FormData();
    formData.append("gameZip", gameZip);
    formData.append("gameName", gameName);

    try {
      setUploading(true);
      setProgress(0);

      const res = await axios.post(`${API_URL}/upload-game`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      showMessage("Game uploaded successfully!", "success");
      fetchGames();
      setGameName("");
      setGameZip(null);
      setProgress(0);
    } catch (err) {
      console.error("Upload failed:", err);
      showMessage(
        err.response?.data?.message || "Upload failed. Please try again.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  /* =======================
     DELETE GAME
  ======================= */
  const deleteGame = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    
    try {
      await axios.delete(`${API_URL}/game/${id}`);
      showMessage("Game deleted successfully!", "success");
      setSelectedGame(null);
      fetchGames();
    } catch (err) {
      console.error("Delete failed:", err);
      showMessage(
        err.response?.data?.message || "Failed to delete game",
        "error"
      );
    }
  };

  /* =======================
     GET GAME URL
  ======================= */
  const getGameUrl = (game) => {
    if (!game?.gameUrl) return "";
    
    // If URL already has protocol, return as is
    if (game.gameUrl.startsWith("http")) return game.gameUrl;
    
    // If URL starts with /, add to API_URL
    if (game.gameUrl.startsWith("/")) return `${API_URL}${game.gameUrl}`;
    
    // Otherwise, add slash and combine with API_URL
    return `${API_URL}/${game.gameUrl}`;
  };

  /* =======================
     INITIAL LOAD
  ======================= */
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
            🎮 Unity Game Dashboard
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload, manage, and play Unity WebGL games
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`max-w-2xl mx-auto mb-6 p-4 rounded-xl border ${
            message.type === "success" 
              ? "bg-green-900/30 border-green-800 text-green-400" 
              : "bg-red-900/30 border-red-800 text-red-400"
          }`}>
            {message.type === "success" ? "✅ " : "⚠️ "}
            {message.text}
          </div>
        )}

        {/* Upload Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">📤</span>
              Upload New Game
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Game Name */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">
                  Game Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter game name"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  required
                  disabled={uploading}
                />
              </div>

              {/* ZIP File */}
              <div className="mb-8">
                <label className="block text-gray-300 mb-2 font-medium">
                  Unity WebGL ZIP File <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl p-6 transition-colors duration-200">
                  <input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setGameZip(e.target.files[0])}
                    className="w-full text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-blue-700 file:text-white hover:file:from-blue-700 hover:file:to-blue-800 file:cursor-pointer disabled:opacity-50"
                    required
                    disabled={uploading}
                  />
                  {gameZip && (
                    <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-green-400 flex items-center">
                        <span className="mr-2">📦</span>
                        Selected: {gameZip.name}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Size: {(gameZip.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {uploading && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {uploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "🚀 Upload Game"
                )}
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-500">
              <p>⚠️ Make sure your ZIP file contains Unity WebGL build files (index.html, Build/, TemplateData/)</p>
            </div>
          </div>
        </div>

        {/* Games Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">
              <span className="mr-3">📂</span>
              Uploaded Games
              <span className="ml-3 text-lg text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                {games.length} {games.length === 1 ? "game" : "games"}
              </span>
            </h2>
            
            <button
              onClick={fetchGames}
              disabled={loadingGames}
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors duration-200 flex items-center disabled:opacity-50"
            >
              {loadingGames ? "🔄 Refreshing..." : "🔄 Refresh"}
            </button>
          </div>

          {loadingGames ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Loading games...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/50 rounded-2xl border border-gray-700">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No games uploaded yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Upload your first Unity WebGL game to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <div
                  key={game.id || index}
                  className="group bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl bg-gray-700 p-3 rounded-xl">🎮</div>
                    <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {game.name || `Game ${index + 1}`}
                  </h3>

                  {game.gameUrl && (
                    <p className="text-sm text-gray-400 mb-4 truncate">
                      {game.gameUrl}
                    </p>
                  )}

                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => setSelectedGame(game)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center group-hover:scale-[1.02]"
                    >
                      <span className="mr-2">▶</span>
                      Play Game
                    </button>

                    <button
                      onClick={() => deleteGame(game.id)}
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-300 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center"
                    >
                      <span className="mr-2">🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Game Player */}
        {selectedGame && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3">🕹️</span>
                Playing: {selectedGame.name || "Unity Game"}
              </h2>
              <button
                onClick={() => setSelectedGame(null)}
                className="mt-3 md:mt-0 px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors duration-200 flex items-center"
              >
                <span className="mr-2">✕</span>
                Close Player
              </button>
            </div>

            <div className="relative pt-[56.25%] rounded-xl overflow-hidden border border-gray-700 bg-black">
              <iframe
                src={getGameUrl(selectedGame)}
                title={selectedGame.name || "Unity Game"}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen; gamepad; vr"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-400">
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                🎮 Unity WebGL Game
              </div>
              {selectedGame.gameUrl && (
                <div className="bg-gray-800/50 px-4 py-2 rounded-lg truncate max-w-xs">
                  🔗 {selectedGame.gameUrl}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t border-gray-800">
          <p>Unity WebGL Game Dashboard • Built with React & Node.js</p>
          <p className="mt-1">Upload size limit: 100MB • Supported format: .zip</p>
        </div>
      </div>
    </div>
  );
};

export default UploadGame;