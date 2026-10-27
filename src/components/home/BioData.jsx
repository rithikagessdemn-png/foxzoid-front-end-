import React, { useState, useEffect } from "react";

const BioData = () => {
  const [activeShape, setActiveShape] = useState(0);
  
  // Abstract shapes for the background
  const abstractShapes = [
    { id: 0, color: "from-indigo-500/20 to-purple-500/20", rotation: "rotate-45" },
    { id: 1, color: "from-cyan-500/20 to-blue-500/20", rotation: "-rotate-12" },
    { id: 2, color: "from-pink-500/20 to-rose-500/20", rotation: "rotate-12" },
    { id: 3, color: "from-emerald-500/20 to-teal-500/20", rotation: "-rotate-45" },
  ];

  // Rotate through shapes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShape((prev) => (prev + 1) % abstractShapes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className={`absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br ${abstractShapes[activeShape].color} rounded-full filter blur-3xl animate-pulse transition-all duration-3000`} />
        <div className={`absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br ${abstractShapes[(activeShape + 1) % abstractShapes.length].color} rounded-full filter blur-3xl animate-pulse transition-all duration-3000`} />
        
        {/* Abstract lines */}
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

        {/* Animated floating shapes */}
        {abstractShapes.map((shape) => (
          <div
            key={shape.id}
            className={`absolute w-16 h-16 bg-gradient-to-br ${shape.color} ${shape.rotation} rounded-lg filter blur-sm transition-all duration-1000 ${
              shape.id === activeShape ? 'opacity-100 scale-125' : 'opacity-30 scale-100'
            }`}
            style={{
              top: `${20 + shape.id * 15}%`,
              left: `${10 + shape.id * 20}%`,
              animation: `float ${4 + shape.id * 2}s infinite ease-in-out ${shape.id * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          
          {/* Abstract Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                Foxzoid
              </span>
            </h1>
            <p className="text-lg text-gray-600 font-light tracking-widest uppercase">
              Game Studio • Chennai, India
            </p>
            
            {/* Abstract divider */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full" />
              <div className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-4" />
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full" />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-8">
              
              {/* Mission Card */}
              <AbstractCard 
                title="Mission"
                color="from-indigo-500/10 to-purple-500/10"
                borderColor="border-indigo-200"
              >
                <p className="text-gray-700 leading-relaxed">
                  To craft fresh, engaging and memorable mobile game experiences
                  that resonate with younger players by blending fun gameplay,
                  captivating design and smart analytics.
                </p>
              </AbstractCard>

              {/* Vision Card */}
              <AbstractCard 
                title="Vision"
                color="from-cyan-500/10 to-blue-500/10"
                borderColor="border-cyan-200"
              >
                <p className="text-gray-700 leading-relaxed">
                  To become a go-to indie game studio from Chennai, known for
                  innovation, creativity and community-first games that stand out
                  in the mobile market.
                </p>
              </AbstractCard>

              {/* Services Card */}
              <AbstractCard 
                title="Core Services"
                color="from-emerald-500/10 to-teal-500/10"
                borderColor="border-emerald-200"
              >
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-2 mr-3" />
                    <span className="text-gray-700">Concept-to-launch mobile game development (Android & Windows)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-2 mr-3" />
                    <span className="text-gray-700">Full cycle: design, art, animation, development & live-ops</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-2 mr-3" />
                    <span className="text-gray-700">Data-driven design using player analytics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-2 mr-3" />
                    <span className="text-gray-700">Creative branding & visual identity for games</span>
                  </li>
                </ul>
              </AbstractCard>

              {/* Advantage Card */}
              <AbstractCard 
                title="Competitive Advantage"
                color="from-amber-500/10 to-orange-500/10"
                borderColor="border-amber-200"
              >
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mt-2 mr-3" />
                    <span className="text-gray-700">Agile indie team with faster iterations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mt-2 mr-3" />
                    <span className="text-gray-700">Hybrid expertise in design + analytics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mt-2 mr-3" />
                    <span className="text-gray-700">Lower operational cost with high creative freedom</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mt-2 mr-3" />
                    <span className="text-gray-700">Joint IP ownership for long-term value</span>
                  </li>
                </ul>
              </AbstractCard>

              {/* Contact Card - MOVED TO LEFT SIDE */}
              <AbstractCard 
                title="Contact"
                color="from-violet-500/10 to-purple-500/10"
                borderColor="border-violet-200"
              >
                <div className="space-y-4">
                  <ContactItem
                    icon="📍"
                    label="Location"
                    value="Chennai, Tamil Nadu, India"
                  />
                  <ContactItem
                    icon="📞"
                    label="Phone"
                    value="+91 7708356728"
                  />
                  <ContactItem
                    icon="✉️"
                    label="Email"
                    value="foxzoidgamestudio@gmail.com"
                  />
                </div>
              </AbstractCard>

            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* Founders Card */}
              <AbstractCard 
                title="Founders"
                color="from-rose-500/10 to-pink-500/10"
                borderColor="border-rose-200"
              >
                <div className="space-y-6">
                  <FounderCard
                    name="Rubesh Kumar N A"
                    role="Founder & Designer"
                    description="Leads creative direction, game design, UI/UX and visual identity."
                    color="from-indigo-500 to-purple-500"
                  />
                  <FounderCard
                    name="Bhagyalakshmi A B"
                    role="Managing Director & Data Analytics"
                    description="Leads analytics, player metrics, optimisation and live-ops."
                    color="from-cyan-500 to-blue-500"
                  />
                </div>
              </AbstractCard>

              {/* Market Card */}
              <AbstractCard 
                title="Target Market"
                color="from-sky-500/10 to-cyan-500/10"
                borderColor="border-sky-200"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/50 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Platform</div>
                    <div className="font-semibold text-gray-800">Mobile (Android & iOS)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Audience</div>
                    <div className="font-semibold text-gray-800">Teens to early 30s</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Geography</div>
                    <div className="font-semibold text-gray-800">India + Global</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Monetisation</div>
                    <div className="font-semibold text-gray-800">Free-to-play with IAP</div>
                  </div>
                </div>
              </AbstractCard>

              {/* Projects Card */}
              <AbstractCard 
                title="Current Projects"
                color="from-gray-500/10 to-gray-600/10"
                borderColor="border-gray-200"
              >
                <div className="space-y-4">
                  <ProjectCard
                    title="The Trap"
                    description="Interactive Game Adaptation"
                    status="In Development"
                    color="from-sky-500 to-cyan-500"
                  />
                  <ProjectCard
                    title="Endless Runner"
                    description="Android game (2025–2026)"
                    status="Early Development"
                    progress={35}
                    color="from-violet-500 to-purple-500"
                  />
                </div>
              </AbstractCard>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation)); }
          50% { transform: translateY(-20px) rotate(var(--rotation)); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Abstract Card Component
const AbstractCard = ({ title, children, color, borderColor }) => (
  <div className={`relative group`}>
    {/* Background shape */}
    <div className={`absolute -inset-1 bg-gradient-to-br ${color} rounded-2xl blur opacity-60 group-hover:opacity-80 transition-all duration-500`} />
    
    {/* Main card */}
    <div className={`relative bg-white/70 backdrop-blur-sm rounded-xl border ${borderColor} p-6 hover:bg-white/80 transition-all duration-300`}>
      {/* Title with abstract line */}
      <div className="flex items-center mb-4">
        <div className={`w-8 h-1 bg-gradient-to-r ${color.split('/10')[0].replace('from-', 'from-')} rounded-full mr-3`} />
        <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </div>
);

// Founder Card Component
const FounderCard = ({ name, role, description, color }) => (
  <div className="p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start space-x-3">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg`}>
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{role}</p>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  </div>
);

// Project Card Component
const ProjectCard = ({ title, description, status, progress, color }) => (
  <div className="p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === 'In Development' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
      }`}>
        {status}
      </span>
    </div>
    <div className="mb-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

// Contact Item Component
const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-all duration-300">
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-white border border-gray-200 flex items-center justify-center text-lg">
      {icon}
    </div>
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  </div>
);

export default BioData;