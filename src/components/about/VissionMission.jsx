import React from 'react'
import { 
  Target, 
  Eye, 
  Users, 
  TrendingUp, 
  Sparkles,
  Heart,
  BarChart3,
  Palette,
  Star,
  Award,
  Lightbulb,
  Zap
} from 'lucide-react'

const VisionMission = () => {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-gray-50 to-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Abstract Theme Background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-10">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Our Purpose</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Mission & Vision
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving innovation in mobile gaming with creative design and data-driven strategies
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 lg:mb-16">
          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 backdrop-blur-sm bg-white/90">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To craft fresh, engaging and memorable mobile game experiences that resonate with 
                younger players, blending fun gameplay, captivating design and smart analytics.
              </p>
              <div className="mt-8 pt-6 border-t border-gray-100">
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 backdrop-blur-sm bg-white/90 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 h-25">
                To become a go-to indie game studio from Chennai, known for innovation, creativity 
                and community-first games that stand out in the mobile market.
              </p>
              <div className="mt-8 pt-6 border-t border-gray-100">
              </div>
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <div className="mb-12 lg:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-gray-700" />
              Our Founders, MD & Strengths
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Led by a dynamic duo combining creative excellence with data-driven decision making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founder - Rubesh Kumar N A */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-100 backdrop-blur-sm bg-white/90">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Rubesh Kumar N A</h3>
                    <p className="text-blue-600 font-medium mb-2">Founder & Designer</p>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Creative Lead</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Leads creative direction, game design, user experience, and visual identity. 
                  Bringing innovative concepts to life with artistic excellence.
                </p>
              </div>
            </div>

            {/* MD - Bhagyalakshmi A B*/}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-300 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 sm:p-8 shadow-lg border border-purple-100 backdrop-blur-sm bg-white/90">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Bhagyalakshmi A B</h3>
                    <p className="text-purple-600 font-medium mb-2">MD & Data Analytics</p>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-700">Analytics Lead</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Leads analytics, data-driven decision making, player metrics, optimization, 
                  and post-launch live-ops. Ensuring success through measurable insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMission