import React from 'react'
import { 
  Target,
  Smartphone,
  Users,
  Globe,
  TrendingUp,
  Handshake,
  MessageSquare,
  Zap,
  BarChart,
  Heart,
  DollarSign,
  Calendar,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PremiumGamingBackground from '../ui/PremiumGamingBackground' // Adjust the import path

const Partnership = () => {
  return (
    <section className="relative min-h-screen w-full text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Add the premium background */}
      <PremiumGamingBackground />
      
      {/* Content container with proper z-index */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-blue-400/20">
            <Handshake className="w-5 h-5" />
            <span className="text-sm font-medium">Partnership Opportunities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Let's Build
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 ml-2">
              Together
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto backdrop-blur-sm bg-black/20 rounded-lg p-2">
            Join us in creating innovative mobile games with global impact
          </p>
        </div>

        {/* Target Market & Platform Section */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-600/80 backdrop-blur-sm rounded-lg border border-blue-400/30">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">Target Market & Platform</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Platform & Audience */}
            <div className="space-y-6">
              {/* Platform Card */}
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/30 backdrop-blur-sm rounded-lg border border-blue-400/20">
                    <Smartphone className="w-5 h-5 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Platform</h3>
                </div>
                <p className="text-gray-200 mb-4">
                  Primarily mobile (Android + iOS) — given large youth base, accessibility in India and global reach.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm border border-blue-400/20">Android</span>
                  <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm border border-blue-400/20">iOS</span>
                  <span className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700/50">Mobile First</span>
                </div>
              </div>

              {/* Audience Card */}
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/30 backdrop-blur-sm rounded-lg border border-purple-400/20">
                    <Users className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Audience</h3>
                </div>
                <p className="text-gray-200 mb-4">
                  Young players (teens to early 30s), casual to mid-core gamers who enjoy vibrant design, 
                  quick sessions, but depth enough to stay engaged.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Age Range</span>
                    <span className="font-medium text-white">Teens - Early 30s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Player Type</span>
                    <span className="font-medium text-white">Casual to Mid-core</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Geography & Monetization */}
            <div className="space-y-6">
              {/* Geography Card */}
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/30 backdrop-blur-sm rounded-lg border border-green-400/20">
                    <Globe className="w-5 h-5 text-green-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Geography</h3>
                </div>
                <p className="text-gray-200 mb-4">
                  Local (India) + global. India gives huge user base; global markets offer scale.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/40 rounded-lg p-4 text-center border border-gray-700/30">
                    <MapPin className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                    <span className="font-medium text-white">Local Focus</span>
                    <p className="text-sm text-gray-300">India</p>
                  </div>
                  <div className="bg-gray-800/40 rounded-lg p-4 text-center border border-gray-700/30">
                    <Globe className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                    <span className="font-medium text-white">Global Reach</span>
                    <p className="text-sm text-gray-300">Worldwide</p>
                  </div>
                </div>
              </div>

              {/* Monetization Card */}
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-500/30 backdrop-blur-sm rounded-lg border border-yellow-400/20">
                    <DollarSign className="w-5 h-5 text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Monetisation</h3>
                </div>
                <p className="text-gray-200 mb-4">
                  Free-to-play model with in-app purchases / game-integrated monetisation, 
                  with strong emphasis on retention and community.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-200">Free-to-play model</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-200">In-app purchases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-200">Retention-focused</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Partner With Us / Call to Action */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-600/80 backdrop-blur-sm rounded-lg border border-purple-400/30">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">Why Partner With Us</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Collaborators Card */}
            <div className="group bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4 border border-blue-400/20">
                <Users className="w-7 h-7 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Collaborators Welcome</h3>
              <p className="text-gray-200 mb-4">
                Looking for collaborators (artists, developers), publishers, investors who believe in 
                creative mobile games with strong analytics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm border border-blue-400/20">Artists</span>
                <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm border border-blue-400/20">Developers</span>
                <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm border border-blue-400/20">Publishers</span>
              </div>
            </div>

            {/* Global Ambition Card */}
            <div className="group bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-500/30 rounded-xl flex items-center justify-center mb-4 border border-purple-400/20">
                <Globe className="w-7 h-7 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Global Ambition</h3>
              <p className="text-gray-200 mb-4">
                If you are interested in helping bring bold mobile games out of India with global ambition, 
                let's talk.
              </p>
              <div className="inline-flex items-center gap-2 text-purple-300 font-medium">
                <MessageSquare className="w-4 h-4" />
                <span>Let's have a conversation</span>
              </div>
            </div>

            {/* Investors Card */}
            <div className="group bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center mb-4 border border-green-400/20">
                <TrendingUp className="w-7 h-7 text-green-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Early-Seed Investors</h3>
              <p className="text-gray-200 mb-4">
                We invite early-seed investors or strategic partners who can support our launch in 2025 
                just as we hit prototypes.
              </p>
              <div className="flex items-center gap-2 text-green-300">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Launch Timeline: 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-2xl p-8 lg:p-12 border border-gray-700/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30"></div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join us in creating the next generation of mobile gaming experiences from India to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 border border-blue-400/30">
                Start Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <p className="mt-6 text-white/80">
              Contact us at: <span className="font-medium text-white">foxzoidgamestudio@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnership