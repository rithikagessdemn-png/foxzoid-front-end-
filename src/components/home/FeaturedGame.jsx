import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Download,
  Play,
  User,
} from "lucide-react";

// Mock game data
const games = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    category: "Action RPG",
    rating: 4.5,
    downloads: "2.4M",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
    price: "$49.99",
    discount: "-20%",
    tags: ["Open World", "Futuristic", "Single Player"],
  },
  {
    id: 2,
    title: "Valorant",
    category: "FPS",
    rating: 4.3,
    downloads: "15M",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFeatured: false,
    price: "Free",
    tags: ["Multiplayer", "Competitive", "Tactical"],
  },
  {
    id: 3,
    title: "Minecraft",
    category: "Sandbox",
    rating: 4.8,
    downloads: "200M",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
    price: "$26.95",
    discount: "-10%",
    tags: ["Creative", "Survival", "Multiplayer"],
  },
  {
    id: 4,
    title: "Elden Ring",
    category: "Action RPG",
    rating: 4.7,
    downloads: "17.5M",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFeatured: false,
    price: "$59.99",
    tags: ["Dark Fantasy", "Open World", "Souls-like"],
  },
  {
    id: 5,
    title: "Fortnite",
    category: "Battle Royale",
    rating: 4.2,
    downloads: "350M",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
    price: "Free",
    discount: "",
    tags: ["Battle Royale", "Multiplayer", "Free-to-play"],
  },
  {
    id: 6,
    title: "The Witcher 3",
    category: "RPG",
    rating: 4.9,
    downloads: "30M",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isFeatured: false,
    price: "$39.99",
    discount: "-40%",
    tags: ["Fantasy", "Story-rich", "Open World"],
  },
];

const FeaturedGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const carouselRef = useRef(null);

  const cardsPerView = () => {
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 3; // md
    if (window.innerWidth >= 640) return 2; // sm
    return 1; // xs
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, games.length - cardsPerView());
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, games.length - cardsPerView());
      return prev === maxIndex ? 0 : prev + 1;
    });
  };

  const scrollToCard = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-gray-900/50 to-gray-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Featured Games
              </span>
            </h2>
            <p className="text-gray-400">
              Discover the most popular games right now
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Previous games"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Next games"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* View All Button */}
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              View All
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Cards Carousel */}
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / cardsPerView())
              }%)`,
              gap: "24px",
            }}
          >
            {games.map((game) => (
              <div
                key={game.id}
                className="flex-shrink-0 relative group"
                style={{
                  width: `calc((100% - (${
                    cardsPerView() - 1
                  } * 24px)) / ${cardsPerView()})`,
                }}
                onMouseEnter={() => setHoveredCard(game.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Game Card */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                    <div className="absolute top-4 left-4 px-3 py-1 font-bold text-white rounded-full z-10">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < Math.floor(game.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-400">
                          {game.rating}
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 px-3 py-1 font-bold text-white rounded-full z-10">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <Eye size={14} className="mr-1" />
                          {game.downloads}
                        </div>
                        <Download size={14} className="text-gray-400" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 px-3 py-1 font-bold text-white rounded-full z-10">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <User size={14} className="mr-1" />
                          {game.category}
                        </div>
                      </div>
                    </div>

                    <div className="absolute w-full h-full flex items-center justify-center top-0 left-0 font-bold text-white z-10">
                      <div className="flex items-center">
                        <div className="flex items-center text-md">
                          {game.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: games.length - cardsPerView() + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGame;
