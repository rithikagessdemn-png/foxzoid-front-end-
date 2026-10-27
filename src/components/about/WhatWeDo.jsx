import React from 'react'
import { 
  Rocket, 
  Cpu, 
  BarChart3, 
  Palette, 
  Users, 
  Smartphone,
  Gamepad2,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Shield
} from 'lucide-react'
import PremiumGamingBackground from '../ui/PremiumGamingBackground'

const WhatWeDo = () => {
  const services = [
    {
      icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Concept-to-launch Game Development",
      description: "Concept-to-launch mobile game development for Windows + Android platforms. We transform ideas into fully functional, engaging games.",
      features: ["Windows Platform", "Android Platform", "Cross-platform Architecture"],
      gradient: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Full Cycle Development",
      description: "End-to-end development pipeline covering design, art, animation, development, analytics, launch & live-ops. We handle every stage with precision.",
      features: ["Design & Art", "Animation", "Development", "Analytics", "Launch & Live-ops"],
      gradient: "from-purple-500 to-pink-500",
      delay: 100
    },
    {
      icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Data-driven Design",
      description: "Data-driven design leveraging analytics to improve retention, monetisation and player experience. We optimize based on real player data.",
      features: ["Retention Optimization", "Monetization Strategy", "Player Behavior Analysis", "Experience Enhancement"],
      gradient: "from-green-500 to-emerald-500",
      delay: 200
    },
    {
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Creative Branding & Identity",
      description: "Creative branding and identity for our games, thanks to expertise in design & visual identity. We make games stand out in crowded marketplaces.",
      features: ["Visual Identity", "UI/UX Design", "Marketing Assets", "Brand Strategy"],
      gradient: "from-orange-500 to-red-500",
      delay: 300
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Collaboration & Co-development",
      description: "Future collaboration opportunities with other studios/publishers or co-development. We partner for innovative game projects.",
      features: ["Publisher Relations", "Co-development", "Joint Ventures", "Strategic Partnerships"],
      gradient: "from-indigo-500 to-blue-500",
      delay: 400
    }
  ]

  return (
    <section className="relative min-h-screen w-full text-white py-8 px-4 sm:py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Premium Background */}
      <PremiumGamingBackground />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center">
        {/* Header - Premium Styled */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 relative">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 sm:mb-6 border border-blue-400/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 animate-shimmer"></div>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
            <span className="text-xs sm:text-sm font-medium text-blue-300 relative">Our Expertise</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 relative">
            <span className="relative">
              {/* <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></span> */}
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                What We Do
              </span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 rounded-2xl blur-xl"></div>
            <p className="relative text-lg sm:text-xl md:text-2xl text-gray-200 backdrop-blur-sm bg-black/20 rounded-xl p-4 sm:p-6 border border-gray-800/50">
              Comprehensive mobile game development services from concept through launch and beyond
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500/30 rounded-tr-lg"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500/30 rounded-bl-lg"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 rounded-br-lg"></div>
        </div>

        {/* Core Services Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20 relative">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-70 animate-pulse"></div>
              <div className="relative p-2 sm:p-3 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg border border-gray-700/50">
                <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                Core Services
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50">
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                  We specialize in <span className="text-blue-300 font-semibold">concept-to-launch mobile game development</span> for 
                  Windows and Android, covering the full cycle from design, art, and animation to 
                  development, analytics, launch, and live-ops. Our <span className="text-purple-300 font-semibold">data-driven approach</span> 
                  improves retention, monetisation, and player experience. We also provide creative 
                  branding and identity, and are open to future collaborations and co-development.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Smartphone className="w-5 h-5 text-blue-300" />
                    </div>
                    <span className="text-lg font-bold text-white">2+</span>
                  </div>
                  <span className="text-sm text-gray-300">Platforms Supported</span>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 backdrop-blur-sm rounded-xl p-4 border border-purple-700/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <Target className="w-5 h-5 text-purple-300" />
                    </div>
                    <span className="text-lg font-bold text-white">5</span>
                  </div>
                  <span className="text-sm text-gray-300">Core Services</span>
                </div>
                
                <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 backdrop-blur-sm rounded-xl p-4 border border-green-700/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-600/20 rounded-lg">
                      <Shield className="w-5 h-5 text-green-300" />
                    </div>
                    <span className="text-lg font-bold text-white">360°</span>
                  </div>
                  <span className="text-sm text-gray-300">Full Cycle</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 overflow-hidden group">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Hex Grid */}
                <div className="absolute inset-0 opacity-10"
                     style={{
                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 30 0 L 60 15 L 60 45 L 30 60 L 0 45 L 0 15 Z' fill='none' stroke='%230066ff' stroke-width='0.5'/%3E%3C/svg%3E")`,
                       backgroundSize: '60px 60px'
                     }}>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div 
                        key={i} 
                        className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl flex items-center justify-center border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300"
                      >
                        <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-lg sm:text-xl font-medium text-gray-200 italic relative">
                      "Turning creative visions into successful gaming experiences"
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-blue-500"></div>
                      <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                      <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-purple-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="relative">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Our Development Stack
              </span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive services covering every aspect of game development
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/60 to-gray-950/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${service.delay}ms` }}
              >
                {/* Animated Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 text-sm sm:text-base text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-left">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-3/4 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo