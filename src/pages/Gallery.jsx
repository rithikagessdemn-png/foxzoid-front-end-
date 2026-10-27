import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "../redux/slices/adminGallerySlice";

const GalleryPage = () => {
  const dispatch = useDispatch();

  /* ===================== REDUX STATE ===================== */
  const staffMembers = useSelector((state) => state.gallery?.items || []);
  const loading = useSelector((state) => state.gallery?.loading);

  /* ===================== LOCAL UI STATE ===================== */
  const [filter, setFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState("stats");

  /* ===================== FETCH BACKEND DATA ===================== */
  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  /* ===================== DYNAMIC ROLES (FROM BACKEND) ===================== */
  const roles = useMemo(() => {
    const uniqueRoles = [
      ...new Set(staffMembers.map((member) => member.role).filter(Boolean)),
    ];
    return ["All", ...uniqueRoles];
  }, [staffMembers]);

  /* ===================== FILTER ===================== */
  const filteredStaff =
    filter === "All"
      ? staffMembers
      : staffMembers.filter((member) => member.role === filter);

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 text-xl">
        Loading Gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8 font-sans">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with gaming style */}
        <header className="mb-12 text-center relative">
          <div className="inline-block mb-4">
            <div className="text-5xl md:text-7xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                GAME DEV TEAM
              </span>
            </div>
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mt-6">
            Meet the elite squad crafting the next generation of gaming experiences. 
            <span className="block text-cyan-300 font-semibold mt-2">Each member brings unique skills to level up our projects!</span>
          </p>
        </header>

        {/* ===================== DYNAMIC ROLE FILTER ===================== */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl">
          {roles.map(role => (
            <button
              key={role}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${filter === role 
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 transform scale-105' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-cyan-500/50'
              }`}
              onClick={() => setFilter(role)}
            >
              <span className="flex items-center">
                {role === "All" && "🎮"}
                {role.toLowerCase().includes("developer") && "👨‍💻"}
                {role.toLowerCase().includes("artist") && "🎨"}
                {role.toLowerCase().includes("programmer") && "⚡"}
                {role.toLowerCase().includes("sound") && "🎵"}
                {role.toLowerCase().includes("level") && "🗺️"}
                {role.toLowerCase().includes("director") && "👑"}
                {role.toLowerCase().includes("designer") && "🎨"}
                {role.toLowerCase().includes("lead") && "👑"}
                {role.toLowerCase().includes("manager") && "👔"}
                <span className="ml-2">{role}</span>
              </span>
            </button>
          ))}
        </div>

        {/* ===================== STAFF GALLERY - GAMING CARDS ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredStaff.map(member => (
            <div 
              key={member._id} 
              className="group relative cursor-pointer h-full"
              onClick={() => setSelectedMember(member)}
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
              
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group-hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col">
                {/* Member Image with overlay */}
                <div className="h-48 overflow-hidden relative flex-shrink-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  
                  {/* Role overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full border border-cyan-500/30">
                      <span className="text-cyan-300 font-medium text-sm">{member.role}</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Content - Fixed height container */}
                <div className="p-6 flex flex-col flex-grow min-h-0">
                  <h3 className="text-xl font-bold text-white mb-2 flex-shrink-0">{member.name}</h3>
                  
                  {/* Scrollable description */}
                  <div className="mb-4 flex-grow overflow-y-auto min-h-0">
                    <p className="text-gray-400 text-sm">
                      {member.description}
                    </p>
                  </div>
                  
                  {/* Skills - Fixed height */}
                  <div className="mb-4 flex-shrink-0">
                    <div className="flex flex-wrap gap-2">
                      {(member.skills || []).slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-800 text-cyan-300 text-xs rounded border border-cyan-900"
                        >
                          {skill}
                        </span>
                      ))}
                      {(member.skills || []).length > 3 && (
                        <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                          +{(member.skills || []).length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-300 font-medium rounded-lg border border-cyan-800 hover:border-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group-hover:from-cyan-900/20 group-hover:to-purple-900/20 flex-shrink-0">
                    <span className="flex items-center justify-center">
                      View Profile
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===================== SELECTED MEMBER MODAL ===================== */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-800 shadow-2xl shadow-cyan-500/10">
              <div className="p-8">
                {/* Header with close button */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg">
                        <img 
                          src={selectedMember.image} 
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                      <div className="mt-2 px-4 py-1 bg-gradient-to-r from-cyan-900 to-purple-900 text-cyan-300 rounded-full text-sm font-medium border border-cyan-700">
                        {selectedMember.role}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-400 hover:text-white text-2xl hover:scale-125 transition-transform"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-800 mb-6">
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'stats' ? 'text-cyan-300 border-b-2 border-cyan-500' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('stats')}
                  >
                    🎮 Stats
                  </button>
                </div>
                
                {/* Tab Content */}
                {activeTab === 'stats' && (
                  <>
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-4 text-lg flex items-center">
                        <span className="text-cyan-300 mr-2">⚡</span> About
                      </h4>
                      <p className="text-gray-300">{selectedMember.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-4 text-lg flex items-center">
                        <span className="text-cyan-300 mr-2">🎯</span> Skills & Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(selectedMember.skills || []).map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-300 rounded-lg border border-cyan-900 hover:border-cyan-500 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 'games' && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-4 text-lg flex items-center">
                      <span className="text-purple-400 mr-2">🏆</span> Featured Games
                    </h4>
                    <div className="space-y-3">
                      {(selectedMember.games || []).map((game, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{game}</div>
                            <div className="text-gray-400 text-sm">Lead {selectedMember.role.split(' ')[0]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'contact' && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-4 text-lg flex items-center">
                      <span className="text-green-400 mr-2">📧</span> Contact & Connect
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                          📧
                        </div>
                        <div>
                          <div className="text-white font-medium">Email</div>
                          <div className="text-cyan-300">{selectedMember.email || 'N/A'}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <button className="p-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg border border-blue-700 hover:border-blue-500 transition-colors flex items-center justify-center">
                          <span className="mr-2">💬</span> Message
                        </button>
                        <button className="p-3 bg-gradient-to-r from-purple-900 to-purple-800 text-white rounded-lg border border-purple-700 hover:border-purple-500 transition-colors flex items-center justify-center">
                          <span className="mr-2">👥</span> Team Chat
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-gray-800">
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-lg border border-gray-700 hover:border-gray-500 hover:text-white transition-colors flex-1"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;