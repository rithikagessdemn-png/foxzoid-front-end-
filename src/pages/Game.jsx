import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../redux/slices/adminGameSlice";
import {
  FaPlay,
  FaGamepad,
  FaTag,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";

// Use environment variable for backend URL
// NOTE: BACKEND_URL already includes /api (e.g. https://foxzoidgamestudio.com/api)
// Static files are served at /api/games and /api/game-images on the server
// So we use BACKEND_URL directly — do NOT strip /api
const BACKEND_URL = import.meta.env.VITE_API_URL || "https://foxzoidgamestudio.com/api";

/* =========================
   FALLBACK IMAGE (Improved)
========================= */
const FALLBACK_IMAGE = `
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="250" fill="url(#grad)"/>
  <text x="50%" y="50%" fill="#9ca3af" font-size="20" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">
    No Image Available
  </text>
</svg>`;
const encodedFallback = `data:image/svg+xml;base64,${btoa(FALLBACK_IMAGE)}`;

const Game = () => {
  const dispatch = useDispatch();
  const { games, loading, error } = useSelector((state) => state.admingame);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  /* =========================
     INTERNAL REDIRECT
  ========================= */
  const handleInternalRedirect = (game) => {
    console.log("INTERNAL GAME:", game);
    window.location.href = "/getG";
  };

  /* =========================
     PLAY GAME HANDLER
     FIX: Use BACKEND_URL directly for internal games.
     server.js serves static files at /api/games/... so:
     BACKEND_URL (/api) + game.gameUrl (/games/123/index.html)
     = https://foxzoidgamestudio.com/api/games/123/index.html ✅
  ========================= */
  const handlePlay = (game) => {
    if (game.playOption === "external") {
      const url = game.gameUrl || game.url;
      if (!url) return alert("External game URL not found");
      const finalUrl = url.startsWith("http") ? url : `https://${url}`;
      window.open(finalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (game.playOption === "internal") {
      if (!game.gameUrl) return alert("Internal game file not found");
      // game.gameUrl is stored as /games/{id}/index.html
      // server.js: app.use("/api/games", express.static(...)) → served at /api/games/...
      // So correct URL = BACKEND_URL + game.gameUrl
      const gameUrl = `${BACKEND_URL}${game.gameUrl}`;
      console.log("Opening internal game at:", gameUrl);
      window.open(gameUrl, "_blank");
      return;
    }

    alert("This game is not playable yet.");
  };

  /* =========================
     GET GAME TYPE BADGE
  ========================= */
  const getGameTypeBadge = (game) => {
    if (game.playOption === "internal") {
      return {
        color: "from-emerald-500 to-green-600",
        icon: <FaDownload className="text-xs" />,
        text: "Internal"
      };
    } else {
      return {
        color: "from-blue-500 to-cyan-600",
        icon: <FaExternalLinkAlt className="text-xs" />,
        text: "External"
      };
    }
  };

  /* =========================
     GET GAME STATUS
  ========================= */
  const getGameStatus = (game) => {
    const isPlayable =
      (game.playOption === "external" && (game.gameUrl || game.url)) ||
      (game.playOption === "internal" && (game.gameUrl || game.uploadPath));

    return {
      isPlayable,
      statusText: isPlayable ? "Ready to Play" : "Not Available",
      statusColor: isPlayable ? "text-green-400" : "text-yellow-400"
    };
  };

  /* =========================
     GET IMAGE URL
     FIX: Use BACKEND_URL directly (already includes /api).
     server.js: app.use("/api/game-images", express.static(...))
     So image path /game-images/xyz.jpg → BACKEND_URL + /game-images/xyz.jpg ✅
  ========================= */
  const getImageUrl = (game) => {
    if (!game.image) return encodedFallback;

    // If image already has full URL, return as is
    if (game.image.startsWith("http")) return game.image;

    // Ensure path starts with /
    const imagePath = game.image.startsWith("/") ? game.image : `/${game.image}`;

    // BACKEND_URL already ends with /api, so:
    // /api + /game-images/xyz.jpg = /api/game-images/xyz.jpg ✅
    return `${BACKEND_URL}${imagePath}`;
  };

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-gray-900 to-black">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="text-6xl animate-spin text-blue-500" />
          <h2 className="text-2xl font-semibold">Loading Games...</h2>
          <p className="text-gray-400">Fetching the latest game collection</p>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Games</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchGames())}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900 to-black py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
              Featured Games
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Explore our collection of handcrafted gaming experiences
          </p>
        </div>

        {/* GAMES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => {
            const imageUrl = getImageUrl(game);
            const gameType = getGameTypeBadge(game);
            const gameStatus = getGameStatus(game);

            return (
              <div
                key={game._id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
              >
                {/* GAME TYPE BADGE */}
                <div className="absolute top-3 left-3 z-10">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${gameType.color} text-white text-xs font-semibold`}>
                    {gameType.icon}
                    {gameType.text}
                  </div>
                </div>

                {/* GAME ID */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-sm text-gray-300 font-mono">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={game.name}
                    onError={(e) => {
                      e.currentTarget.src = encodedFallback;
                    }}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                  {/* BUTTON OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {/* INTERNAL BUTTON */}
                    {game.playOption === "internal" && (
                      <button
                        onClick={() => handleInternalRedirect(game)}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-full flex items-center gap-2 font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        <FaDownload /> Internal
                      </button>
                    )}

                    {/* EXTERNAL BUTTON */}
                    {game.playOption === "external" && (
                      <button
                        onClick={() => handlePlay(game)}
                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full flex items-center gap-2 font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        <FaExternalLinkAlt /> External
                      </button>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {/* GAME NAME & ICON */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <FaGamepad className="text-blue-400 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                        {game.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${gameStatus.statusColor} bg-gray-800/50`}>
                          {gameStatus.statusText}
                        </span>
                        <span className="text-xs text-gray-500">
                          {game.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-4">
                    <div className="flex items-start gap-2">
                      <FaInfoCircle className="text-gray-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {game.description || "No description available"}
                      </p>
                    </div>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <FaTag className="text-gray-500" />
                      <span className="text-gray-300 text-sm">
                        {game.category || "Uncategorized"}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePlay(game)}
                      disabled={!gameStatus.isPlayable}
                      className={`${
                        gameStatus.isPlayable
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                          : 'bg-gray-700 cursor-not-allowed'
                      } text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110`}
                      title={gameStatus.isPlayable ? "Play Game" : "Game Not Available"}
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {games.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 max-w-md">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Games Available</h3>
              <p className="text-gray-400 mb-6">
                Check back later or contact the administrator to add games.
              </p>
              <div className="text-sm text-gray-500">
                Total Games: 0 • Unity: 0 • External: 0
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Game;