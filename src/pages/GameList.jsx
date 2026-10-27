import React, { useEffect, useState } from "react";
import axios from "axios";

// Use environment variable for backend URL
// IMPORTANT: API_URL already includes /api  (e.g. https://foxzoidgamestudio.com/api)
// server.js serves game static files at: app.use("/api/games", express.static(...))
// So game URL = API_URL + game.gameUrl = /api + /games/123/index.html ✅
const API_URL = import.meta.env.VITE_API_URL || "https://foxzoidgamestudio.com/api";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  /* =========================
     FETCH GAMES
     FIX: Changed from /api/games (old Game model) to
     /api/admingames (AdminGame model) — this is where
     the admin panel uploads games to.
     Also: AdminGame.find() returns a plain array, not { games: [] }
  ========================= */
  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/admingames`);
      // adminGameController.getGames returns array directly (not { games: [...] })
      setGames(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching games", error);
      setError("Failed to load games. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  /* =========================
     BACK BUTTON HANDLER
  ========================= */
  const handleBack = () => {
    window.location.href = "/games";
  };

  /* =========================
     GET GAME URL
     FIX: Internal games → gameUrl is /games/{id}/index.html
     Static files served at /api/games/... on server.
     So: API_URL (/api) + gameUrl (/games/123/index.html)
       = https://foxzoidgamestudio.com/api/games/123/index.html ✅

     External games → gameUrl is a full http/https URL, return as-is.
  ========================= */
  const getGameUrl = (game) => {
    if (!game?.gameUrl) return "";

    // External game — already a full URL
    if (game.gameUrl.startsWith("http")) return game.gameUrl;

    // Internal game — gameUrl is /games/{id}/index.html
    // server.js: app.use("/api/games", express.static(...))
    // So correct URL = API_URL + gameUrl
    const path = game.gameUrl.startsWith("/") ? game.gameUrl : `/${game.gameUrl}`;
    return `${API_URL}${path}`;
  };

  /* =========================
     GET IMAGE URL
     FIX: image is stored as /game-images/filename.jpg
     server.js: app.use("/api/game-images", express.static(...))
     So: API_URL + /game-images/xyz.jpg ✅
  ========================= */
  const getImageUrl = (game) => {
    if (!game?.image) return null;
    if (game.image.startsWith("http")) return game.image;
    const path = game.image.startsWith("/") ? game.image : `/${game.image}`;
    return `${API_URL}${path}`;
  };

  /* =========================
     FULLSCREEN TOGGLE
  ========================= */
  const toggleFullscreen = () => {
    const iframe = document.querySelector('iframe');
    if (!iframe) return;

    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  /* =========================
     HANDLE FULLSCREEN CHANGE
  ========================= */
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-gray-200 flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 ${fullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className={`w-full md:w-1/4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-4 md:p-5 ${fullscreen ? 'hidden' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            🎮 Game Library
          </h2>
          <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
            {games.length} games
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400 text-sm">Loading games...</p>
          </div>
        ) : error ? (
          <div className="text-center p-4 bg-red-900/20 border border-red-700/50 rounded-xl">
            <p className="text-red-400 mb-2">{error}</p>
            <button
              onClick={fetchGames}
              className="mt-2 text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition flex items-center mx-auto"
            >
              🔄 Retry
            </button>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center p-6 bg-gray-700/30 border border-gray-600/50 rounded-xl">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-400 font-medium">No games uploaded yet</p>
            <p className="text-xs text-gray-500 mt-1">Upload games via admin panel</p>
          </div>
        ) : (
          <div className="space-y-3">
            {games.map((game, index) => {
              const imgUrl = getImageUrl(game);
              return (
                <button
                  key={game._id || index}
                  onClick={() => setSelectedGame(game)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]
                    ${
                      selectedGame?._id === game._id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg ring-2 ring-blue-500/50"
                        : "bg-gray-700/30 hover:bg-gray-700/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Game thumbnail or icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center
                      ${selectedGame?._id === game._id
                        ? "bg-white/20"
                        : "bg-gray-600/50"
                      }`}
                    >
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={game.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-lg">{game.icon || "🎮"}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm md:text-base">
                        {game.name || `Game ${index + 1}`}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          game.playOption === "internal"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}>
                          {game.playOption === "internal" ? "Internal" : "External"}
                        </span>
                        <span className="text-xs text-gray-400 truncate">
                          {game.category || "Game"}
                        </span>
                      </div>
                    </div>
                    {selectedGame?._id === game._id && (
                      <span className="animate-pulse text-blue-300">▶</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </aside>

      {/* ================= RIGHT PLAYER ================= */}
      <main className={`flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-4 md:p-6 ${fullscreen ? 'w-full' : ''}`}>
        {/* HEADER WITH BACK BUTTON */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              {fullscreen ? '🕹 Playing Fullscreen' : '🕹 Game Player'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {fullscreen
                ? 'Press ESC to exit fullscreen'
                : 'Play games directly in your browser'
              }
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedGame && (
              <button
                onClick={toggleFullscreen}
                className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {fullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
              </button>
            )}
            {!fullscreen && (
              <button
                onClick={handleBack}
                className="text-sm bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                ← Back to Games
              </button>
            )}
          </div>
        </div>

        {!selectedGame ? (
          <div className="flex flex-col items-center justify-center h-[400px] md:h-[500px] text-gray-400 border-2 border-dashed border-gray-600/50 rounded-2xl p-8">
            <div className="text-6xl mb-4 opacity-50">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-300">No Game Selected</h3>
            <p className="text-gray-500 text-center max-w-md">
              Choose a game from the library to start playing. All games are playable directly in your browser.
            </p>
            {games.length > 0 && (
              <button
                onClick={() => setSelectedGame(games[0])}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Play First Game
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Player Header */}
            {!fullscreen && (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-700/30 rounded-xl">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-blue-400">🎮</span>
                    {selectedGame.name || "Game"}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      selectedGame.playOption === "internal"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}>
                      {selectedGame.playOption === "internal" ? "Internal Game" : "External Game"}
                    </span>
                    <span className="text-xs px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
                      Browser Playable
                    </span>
                    {selectedGame.category && (
                      <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                        {selectedGame.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="text-sm bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 px-4 py-2 rounded-lg transition flex items-center gap-2"
                  >
                    ✖ Close Game
                  </button>
                </div>
              </div>
            )}

            {/* Game Frame */}
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-700/50">
              {getGameUrl(selectedGame) ? (
                <iframe
                  src={getGameUrl(selectedGame)}
                  title={selectedGame.name || "Game"}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
                  allowFullScreen
                  allow="autoplay; fullscreen; gamepad; vr"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <div className="text-center p-6">
                    <div className="text-5xl mb-4 opacity-50">⚠️</div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-300">Game URL Not Found</h4>
                    <p className="text-gray-400 mb-4">This game cannot be loaded.</p>
                    <button
                      onClick={() => setSelectedGame(null)}
                      className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg transition"
                    >
                      Select Another Game
                    </button>
                  </div>
                </div>
              )}

              {/* Fullscreen Overlay */}
              {!fullscreen && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-gray-900/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col items-center gap-4 mb-10">
                    <button
                      onClick={toggleFullscreen}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition transform hover:scale-105 shadow-lg"
                    >
                      ⛶ Enter Fullscreen
                    </button>
                    <p className="text-sm text-gray-300">For the best experience</p>
                  </div>
                </div>
              )}
            </div>

            {/* Game Info */}
            {!fullscreen && selectedGame.description && (
              <div className="p-4 bg-gray-700/30 rounded-xl">
                <h4 className="font-semibold mb-2 text-blue-300 flex items-center gap-2">
                  <span>📝</span>
                  About This Game
                </h4>
                <p className="text-gray-300">{selectedGame.description}</p>
              </div>
            )}

            {/* Game Controls */}
            {!fullscreen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-700/30 rounded-xl">
                  <h5 className="text-xs text-gray-400 mb-1">Controls</h5>
                  <p className="text-sm">Mouse + Keyboard or Gamepad</p>
                </div>
                <div className="p-3 bg-gray-700/30 rounded-xl">
                  <h5 className="text-xs text-gray-400 mb-1">Performance</h5>
                  <p className="text-sm">Best on Chrome/Firefox</p>
                </div>
                <div className="p-3 bg-gray-700/30 rounded-xl">
                  <h5 className="text-xs text-gray-400 mb-1">Tips</h5>
                  <p className="text-sm">Use fullscreen for best experience</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Fullscreen Exit Hint */}
      {fullscreen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
          Press ESC to exit fullscreen • Click outside to see controls
        </div>
      )}
    </div>
  );
};

export default GameList;