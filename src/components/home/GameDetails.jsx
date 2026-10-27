import React, { useState, useRef } from 'react'
import HorizontalAd from '../ad/HorizontalAd'
import { Swords, Target, Users, Brain, Heart, Trophy, Puzzle, Globe, Sparkles, Castle, ChevronRight, X, Play, Bookmark, ChevronLeft } from 'lucide-react'

const GameDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedGame, setSelectedGame] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  
  const scrollContainerRef = useRef(null)

  const gameCategories = [
    { id: 1, name: "Action", icon: <Swords size={24} />, description: "Fast-paced combat and intense gameplay", color: "from-red-600 to-pink-600", bgColor: "bg-red-950/30", games: 245 },
    { id: 2, name: "FPS", icon: <Target size={24} />, description: "First-person shooter precision", color: "from-blue-600 to-cyan-600", bgColor: "bg-blue-950/30", games: 189 },
    { id: 3, name: "Multiplayer", icon: <Users size={24} />, description: "Play with friends worldwide", color: "from-green-600 to-emerald-600", bgColor: "bg-green-950/30", games: 312 },
    { id: 4, name: "Strategy", icon: <Brain size={24} />, description: "Tactical thinking and planning", color: "from-purple-600 to-violet-600", bgColor: "bg-purple-950/30", games: 156 },
    { id: 5, name: "RPG", icon: <Heart size={24} />, description: "Character development and stories", color: "from-orange-600 to-amber-600", bgColor: "bg-orange-950/30", games: 278 },
    { id: 6, name: "Competitive", icon: <Trophy size={24} />, description: "Ranked matches and tournaments", color: "from-yellow-600 to-amber-500", bgColor: "bg-yellow-950/30", games: 134 },
    { id: 7, name: "Puzzle", icon: <Puzzle size={24} />, description: "Mind-bending challenges", color: "from-indigo-600 to-blue-600", bgColor: "bg-indigo-950/30", games: 98 },
    { id: 8, name: "Open World", icon: <Globe size={24} />, description: "Explore vast environments", color: "from-emerald-600 to-teal-600", bgColor: "bg-emerald-950/30", games: 167 },
    { id: 9, name: "Fantasy", icon: <Sparkles size={24} />, description: "Magic and mythical creatures", color: "from-fuchsia-600 to-purple-600", bgColor: "bg-fuchsia-950/30", games: 223 },
    { id: 10, name: "Adventure", icon: <Castle size={24} />, description: "Epic quests and exploration", color: "from-rose-600 to-pink-600", bgColor: "bg-rose-950/30", games: 198 }
  ]

  const categoryGames = {
    1: [
      { id: 101, name: "Cyber Legends", rating: 4.8, players: "2.4M", description: "Futuristic combat with advanced weaponry" },
      { id: 102, name: "Shadow Strike", rating: 4.5, players: "1.8M", description: "Stealth-based tactical action" }
    ],
    2: [
      { id: 201, name: "Precision Ops", rating: 4.7, players: "3.1M", description: "Military-grade shooting experience" },
      { id: 202, name: "Arena Shooter", rating: 4.3, players: "1.2M", description: "Fast-paced arena combat" }
    ],
    3: [
      { id: 301, name: "World of Unity", rating: 4.9, players: "4.2M", description: "Massive multiplayer online world" },
      { id: 302, name: "Co-op Legends", rating: 4.6, players: "2.7M", description: "Team-based cooperative gameplay" }
    ]
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setSelectedGame(categoryGames[category.id]?.[0] || null)
  }

  const CARDS_PER_PAGE = 3
  const totalPages = Math.ceil(gameCategories.length / CARDS_PER_PAGE)

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  // Calculate which categories to show based on current page
  const startIndex = currentPage * CARDS_PER_PAGE
  const visibleCategories = gameCategories.slice(startIndex, startIndex + CARDS_PER_PAGE)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden relative">
      {/* Gaming Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-32 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top Ad (Mobile) */}
      {/* <div className="lg:hidden fixed top-0 left-0 right-0 z-40">
        <HorizontalAd />
      </div> */}

      {/* Left Side Ad (Desktop) */}
      {/* <div className="hidden lg:block fixed left-0 top-0 h-full w-60 z-30">
        <div className="h-full flex items-center justify-center p-2">
          <HorizontalAd />
        </div>
      </div> */}

      {/* Right Side Ad (Desktop) */}
      {/* <div className="hidden lg:block fixed right-0 top-0 h-full w-60 z-30">
        <div className="h-full flex items-center justify-center p-2">
          <HorizontalAd />
        </div>
      </div> */}

      {/* Main Content Container */}
      <div className="relative z-10 lg:mx-60">
        <div className="container mx-auto px-4 py-8 pt-20 lg:pt-8 pb-20 lg:pb-8">
          {/* Header with Gaming Theme */}
          <header className="text-center mb-12 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl rounded-full opacity-50"></div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative">
              GAME <span className="text-cyan-300">UNIVERSE</span>
            </h1>
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="mx-4 text-gray-400 text-sm">EXPLORE REALMS</span>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Dive into epic gaming adventures across diverse genres. 
              Select a category to discover trending games and start your journey.
            </p>
          </header>

          {/* Game Categories Carousel Section */}
          <div className="relative mb-16">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  GENRES
                </h2>
                <p className="text-gray-400 mt-2">Browse through our curated game categories</p>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
                <span className="px-3 py-1 bg-gray-800/50 rounded-full">PAGE {currentPage + 1}/{totalPages}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`flex items-center justify-center w-14 h-14 rounded-full bg-gray-900/80 border border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-500'}`}
              >
                <ChevronLeft size={28} className="text-gray-300" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400">CURRENT</div>
                  <div className="text-2xl font-bold text-cyan-300">{currentPage + 1}</div>
                </div>
                <div className="text-gray-500">/</div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">TOTAL</div>
                  <div className="text-2xl font-bold">{totalPages}</div>
                </div>
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className={`flex items-center justify-center w-14 h-14 rounded-full bg-gray-900/80 border border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-500'}`}
              >
                <ChevronRight size={28} className="text-gray-300" />
              </button>
            </div>

            {/* Game Categories Grid - Showing 2 cards */}
            <div className="relative">
              {/* Grid Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent rounded-3xl"></div>
              
              <div 
                ref={scrollContainerRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
              >
                {visibleCategories.map((category) => (
                  <div 
                    key={category.id}
                    className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] ${category.bgColor} border border-gray-800/50 hover:border-transparent backdrop-blur-sm`}
                  >
                    {/* Animated Gradient Background */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.color} blur-xl`} />
                    
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${category.color}`} />
                    
                    {/* Top Corner Accent */}
                    <div className={`absolute top-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-bl ${category.color} rounded-full -translate-y-12 translate-x-12`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with Glow */}
                      <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl group-hover:shadow-current/30 transition-all duration-300`}>
                        <div className="text-white">
                          {category.icon}
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                      </div>

                      {/* Category Name */}
                      <h3 className="text-2xl font-bold mb-3 relative group-hover:text-white transition-colors duration-300">
                        {category.name}
                        <div className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${category.color} group-hover:w-12 transition-all duration-300`}></div>
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-300/80 text-sm mb-6 group-hover:text-gray-200 transition-colors duration-300">{category.description}</p>
                      
                      {/* Stats and Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="px-3 py-1 bg-gray-900/50 rounded-full border border-gray-700/50 text-xs">
                            <span className="text-cyan-300 font-bold">{category.games}</span>
                            <span className="text-gray-400 ml-1">GAMES</span>
                          </div>
                        </div>

                        {/* View Button */}
                        <button
                          onClick={() => handleCategoryClick(category)}
                          className={`relative overflow-hidden py-3 px-6 rounded-xl bg-gradient-to-r from-gray-900/80 to-black/80 border border-gray-700/50 hover:border-transparent transition-all duration-300 flex items-center justify-center group/btn hover:scale-105`}
                        >
                          <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${category.color}`}></div>
                          <span className="relative z-10 mr-2 font-medium group-hover/btn:text-white">EXPLORE</span>
                          <ChevronRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Gradient Border */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${category.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPage ? 'bg-gradient-to-r from-cyan-500 to-blue-500 scale-125' : 'bg-gray-700 hover:bg-gray-600'}`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Game Details Section (Visible when category is selected) */}
          {selectedCategory && (
            <div className="mt-12 mb-16 animate-fadeIn">
              <div className="relative bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 rounded-3xl border border-gray-800/50 backdrop-blur-sm overflow-hidden">
                {/* Animated Background */}
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${selectedCategory.color}`}></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-6 right-6 z-50 p-3 rounded-full bg-gray-900/80 border border-gray-700/50 hover:bg-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:scale-110 lg:relative lg:float-right lg:m-6 lg:top-0 lg:right-0"
                >
                  <X size={20} className="text-gray-300" />
                </button>

                <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8 relative z-10">
                  {/* Left Column - Category Info */}
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center mb-8">
                      <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mr-6 bg-gradient-to-br ${selectedCategory.color} shadow-xl`}>
                        {selectedCategory.icon}
                        <div className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-md"></div>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <h2 className="text-3xl font-bold mr-4">{selectedCategory.name}</h2>
                          <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm border border-gray-700/50">
                            {selectedCategory.games} GAMES
                          </span>
                        </div>
                        <p className="text-gray-300 text-lg">{selectedCategory.description}</p>
                      </div>
                    </div>

                    {/* Popular Games List */}
                    <div className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mr-3"></div>
                        <h3 className="text-xl font-bold">POPULAR IN THIS GENRE</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {(categoryGames[selectedCategory.id] || []).map((game) => (
                          <div 
                            key={game.id}
                            className={`group relative p-4 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 ${selectedGame?.id === game.id ? 'border-cyan-500/50 bg-gradient-to-r from-cyan-900/20 to-blue-900/20' : 'border-gray-800/50 bg-gray-900/30'} hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-cyan-900/20 hover:to-blue-900/20`}
                            onClick={() => setSelectedGame(game)}
                          >
                            {/* Hover Glow Effect */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${selectedCategory.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                            
                            <div className="relative flex justify-between items-center">
                              <div>
                                <h4 className="font-bold text-lg mb-1 group-hover:text-cyan-300 transition-colors">{game.name}</h4>
                                <div className="flex items-center">
                                  {/* Rating Stars */}
                                  <div className="flex mr-3">
                                    {[...Array(5)].map((_, i) => (
                                      <div 
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(game.rating) ? 'text-yellow-400' : 'text-gray-700'}`}
                                      >
                                        ★
                                      </div>
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-400">
                                    {game.rating}/5.0 • <span className="text-green-400">{game.players}</span> Online
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm mt-2">{game.description}</p>
                              </div>
                              <div className="flex items-center">
                                <div className="px-3 py-1 bg-gray-800/50 rounded-full text-sm mr-4 border border-gray-700/50">
                                  #{game.id.toString().slice(-2)}
                                </div>
                                <ChevronRight size={24} className="text-gray-400 group-hover:text-cyan-300 transition-colors group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Selected Game Details */}
                  <div className="lg:pl-8 lg:border-l lg:border-gray-800/50">
                    {selectedGame ? (
                      <div className="space-y-8">
                        {/* Game Banner */}
                        <div className="relative rounded-3xl overflow-hidden">
                          <div className="aspect-video bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative">
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>
                            
                            {/* Game Logo/Image */}
                            <div className="relative z-10 text-center">
                              <div className="text-7xl mb-6 animate-float">🎮</div>
                              <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {selectedGame.name}
                              </h3>
                            </div>
                            
                            {/* Status Badges */}
                            <div className="absolute top-4 left-4 flex flex-col space-y-2">
                              <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                                🔥 TRENDING
                              </div>
                              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                                🎯 LIVE
                              </div>
                            </div>
                            
                            {/* Player Count */}
                            <div className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700/50">
                              <div className="text-sm text-gray-400">ACTIVE PLAYERS</div>
                              <div className="text-xl font-bold text-green-400">{selectedGame.players}</div>
                            </div>
                          </div>
                        </div>

                        {/* Game Details */}
                        <div className="space-y-6">
                          {/* Rating Section */}
                          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="text-sm text-gray-400">USER RATING</div>
                                <div className="text-3xl font-bold text-yellow-400">{selectedGame.rating}<span className="text-gray-400 text-lg">/5.0</span></div>
                              </div>
                              <div className="flex text-2xl">
                                {[...Array(5)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className={`w-6 h-6 ${i < Math.floor(selectedGame.rating) ? 'text-yellow-400' : 'text-gray-700'}`}
                                  >
                                    ★
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                                style={{ width: `${(selectedGame.rating / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
                            <h4 className="text-lg font-bold mb-4 flex items-center">
                              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                              GAME OVERVIEW
                            </h4>
                            <p className="text-gray-300 leading-relaxed">
                              Immerse yourself in {selectedGame.name.toLowerCase()}, where cutting-edge graphics meet 
                              revolutionary gameplay mechanics. Experience breathtaking multiplayer battles, 
                              dynamic environments that react to your every move, and a rich narrative that 
                              evolves based on your decisions. Join millions of players worldwide in this 
                              epic gaming adventure.
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button className="group relative overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center font-bold text-lg hover:scale-105">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                              <Play size={24} className="mr-3" />
                              LAUNCH GAME
                            </button>
                            <button className="group relative overflow-hidden py-4 px-6 rounded-2xl bg-gray-900/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center hover:scale-105">
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                              <Bookmark size={24} className="mr-3 text-purple-400" />
                              ADD TO LIBRARY
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-12">
                        <div className="text-6xl mb-6">🎯</div>
                        <h3 className="text-xl font-bold mb-2">SELECT A GAME</h3>
                        <p className="text-center text-gray-400">Choose a game from the list to view detailed information</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Gradient Border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedCategory.color} opacity-50`}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Ad (Mobile) */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <HorizontalAd />
      </div> */}
    </div>
  )
}

export default GameDetails