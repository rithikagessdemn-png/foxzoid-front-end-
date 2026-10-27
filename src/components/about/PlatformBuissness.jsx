import React from 'react'
import { 
  Trophy,
  MapPin,
  Users,
  Target,
  Shield,
  Heart,
  BarChart3,
  Palette,
  Clock,
  Rocket,
  Calendar,
  TrendingUp,
  Zap,
  Star,
  Award,
  Lightbulb,
  PieChart,
  CheckCircle,
  Code,
  Gamepad2,
  Briefcase,
  ChevronRight,
  Smartphone
} from 'lucide-react'

const PlatformBusiness = () => {
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
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Our Business Edge</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Platform & Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic advantages, company values, and our development roadmap for sustainable growth
          </p>
        </div>

        {/* Competitive Advantage Section */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Competitive Advantage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Chennai Advantage",
                description: "Access to growing ecosystem of creative professionals, lower cost base compared to many global studios.",
                color: "green"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Agile Team",
                description: "Small, agile team means faster iterations, better creative freedom, more responsive to trends.",
                color: "blue"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Hybrid Skill-set",
                description: "Design + analytics allows us to optimize both user acquisition & retention from early stages.",
                color: "purple"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Strong Ownership",
                description: "Founders equally invested (50/50) fosters strong partnership and shared vision.",
                color: "red"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "IP Control",
                description: "Joint ownership means we retain control and long-term value of intellectual property.",
                color: "yellow"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Growth Focus",
                description: "Strategic positioning for scalable growth in the mobile gaming market.",
                color: "indigo"
              }
            ].map((advantage, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm bg-white/90"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  advantage.color === 'green' ? 'bg-gradient-to-br from-green-100 to-green-50' :
                  advantage.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-blue-50' :
                  advantage.color === 'purple' ? 'bg-gradient-to-br from-purple-100 to-purple-50' :
                  advantage.color === 'red' ? 'bg-gradient-to-br from-red-100 to-red-50' :
                  advantage.color === 'yellow' ? 'bg-gradient-to-br from-yellow-100 to-yellow-50' :
                  'bg-gradient-to-br from-indigo-100 to-indigo-50'
                }`}>
                  <div className={
                    advantage.color === 'green' ? 'text-green-600' :
                    advantage.color === 'blue' ? 'text-blue-600' :
                    advantage.color === 'purple' ? 'text-purple-600' :
                    advantage.color === 'red' ? 'text-red-600' :
                    advantage.color === 'yellow' ? 'text-yellow-600' :
                    'text-indigo-600'
                  }>
                    {advantage.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Culture & Values */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Company Culture & Values</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Core Values */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 backdrop-blur-sm bg-white/90">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Core Principles</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Palette className="w-6 h-6" />,
                      title: "Creativity First",
                      description: "We encourage bold ideas and strong visual identity built around branding and aesthetics.",
                      color: "purple"
                    },
                    {
                      icon: <BarChart3 className="w-6 h-6" />,
                      title: "Data-Informed",
                      description: "Every design choice is backed by analytics, user feedback and metrics.",
                      color: "blue"
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Player-Centric",
                      description: "We design for players, not just for features — focusing on fun, fairness, replayability.",
                      color: "green"
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "Transparency & Teamwork",
                      description: "With co-founders aligned, decisions are mutual, respect is built-in.",
                      color: "orange"
                    },
                    {
                      icon: <Award className="w-6 h-6" />,
                      title: "Quality & Polish",
                      description: "Even as an indie studio, we commit to high production values and smooth user experience.",
                      color: "red"
                    }
                  ].map((value, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        value.color === 'purple' ? 'bg-purple-100' :
                        value.color === 'blue' ? 'bg-blue-100' :
                        value.color === 'green' ? 'bg-green-100' :
                        value.color === 'orange' ? 'bg-orange-100' :
                        'bg-red-100'
                      }`}>
                        <div className={
                          value.color === 'purple' ? 'text-purple-600' :
                          value.color === 'blue' ? 'text-blue-600' :
                          value.color === 'green' ? 'text-green-600' :
                          value.color === 'orange' ? 'text-orange-600' :
                          'text-red-600'
                        }>
                          {value.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{value.title}</h4>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Visual & Stats */}
            <div className="space-y-8">
              {/* Culture Visual */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-white/80 rounded-xl flex items-center justify-center">
                      <Heart className="w-8 h-8 text-purple-400" />
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-700 italic text-lg">
                  "A culture that balances creativity with data, passion with precision"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Projects & Roadmap */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Current Projects & Roadmap</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 col-span-1 backdrop-blur-sm bg-white/90">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-indigo-600">Active Project</span>
                    <h3 className="text-xl font-bold">"The Trap"</h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Interactive game adaptation — converting short-film concept into an immersive game experience.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Currently in development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Interactive narrative game</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Based on existing IP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 col-span-1 backdrop-blur-sm bg-white/90">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-600">Planned Project</span>
                    <h3 className="text-xl font-bold">"Endless Runner"</h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Android-based endless runner game targeting 2025–2026 release.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">2025–2026 Timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Android Mobile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Casual gameplay focus</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap Overview */}
            <div className="group relative lg:col-span-2">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 backdrop-blur-sm bg-white/90">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-600">Development Roadmap</span>
                    <h3 className="text-xl font-bold">Growth Timeline</h3>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Short Term */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                      <h4 className="font-bold">Short Term (Now - 2026)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 ml-6">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Develop and launch at least one mobile game
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Monitor live-ops and player feedback
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Expand team with 1-2 hires (artist, developer)
                      </li>
                    </ul>
                  </div>

                  {/* Long Term */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronRight className="w-4 h-4 text-purple-500" />
                      <h4 className="font-bold">Long Term (2027+)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 ml-6">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Build catalogue of 2-3 titles/year
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Explore partnerships/publishing deals
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Explore cross-platform (tablet / PC)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformBusiness