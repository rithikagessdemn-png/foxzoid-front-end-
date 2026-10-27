import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiLogOut, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { PiBookOpenTextLight } from "react-icons/pi";
import { TfiGallery } from "react-icons/tfi";
import { IoGameControllerOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineDashboard, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { MdOutlineAnalytics } from 'react-icons/md';
import DashboardManagement from '../admin/components/DashboardManagement';
import UserManagement from '../admin/components/UserManagement';
import BlogManagement from '../admin/components/BlogManagement';
import GalleryManagement from '../admin/components/GalleryManagement';
import GameManagement from '../admin/components/GameManagement';
// ✅ REMOVED: UploadGame import — Internal Game Upload is handled inside Game Management

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  
  const profileRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setCollapsedMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sidebarItems = [
    { id: 'dashboard', icon: AiOutlineDashboard, label: 'Dashboard', color: 'text-blue-500' },
    { id: 'blog', icon: PiBookOpenTextLight, label: 'Blog Management', color: 'text-purple-500' },
    { id: 'gallery', icon: TfiGallery, label: 'Gallery Management', color: 'text-green-500' },
    { id: 'game', icon: IoGameControllerOutline, label: 'Game Management', color: 'text-yellow-500' },
    // ✅ REMOVED: Internal Game Upload — use Game Management instead
    { id: 'user', icon: AiOutlineTeam, label: 'User Management', color: 'text-pink-500' },
  ];

  // Render different content based on active menu
  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return <DashboardManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'game':
        return <GameManagement />;
      // ✅ REMOVED: upload-game case — no longer needed
      case 'user':
        return <UserManagement />;
      default:
        return <DashboardManagement />;
    }
  };

  // Hide navbar when admin page is open
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }

    return () => {
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);

  // Set body to full height and hide overflow
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        flex flex-col h-full transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-72' : 'w-20'}
        bg-gray-900
        border-r border-gray-800
        shadow-xl
        z-50
      `}>
        {/* Brand & Header */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center flex-1">
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-xl
              bg-gradient-to-br from-blue-600 to-blue-800
              ${sidebarOpen ? 'mr-3' : ''}
            `}>
              <HiOutlineEmojiHappy className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <span className="text-xl font-bold text-white truncate">AdminHub</span>
                <p className="text-xs text-gray-400 truncate">Control Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-2">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveMenu(item.id);
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                      ${activeMenu === item.id 
                        ? `bg-gray-800 ${item.color} shadow-lg border-l-4 ${item.color.replace('text-', 'border-')}`
                        : 'hover:bg-gray-800 text-gray-400 hover:text-gray-300'
                      }
                    `}
                  >
                    <div className={`${activeMenu === item.id ? item.color : 'text-gray-400'} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {sidebarOpen && (
                      <div className="ml-4 flex-1 text-left overflow-hidden">
                        <span className="font-medium truncate">{item.label}</span>
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-800 p-4" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={`
              w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
              hover:bg-gray-800
              ${profileOpen ? 'bg-gray-800' : ''}
            `}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {sidebarOpen && (
              <div className="ml-3 flex-1 overflow-hidden text-left">
                <div className="font-medium text-white truncate">Admin User</div>
                <div className="text-xs text-gray-400 truncate">admin@example.com</div>
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          {profileOpen && sidebarOpen && (
            <div className={`
              mt-2 rounded-xl overflow-hidden shadow-xl
              bg-gray-800 border border-gray-700
              animate-fadeIn
            `}>
              <ul className="py-2">
                <li className="border-t border-gray-700">
                  <button className="w-full flex items-center px-4 py-3 hover:bg-red-900/20 transition duration-200 text-red-400">
                    <FiLogOut className="w-5 h-5 mr-3" />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Minimal Header */}
        <div className={`
          transition-all duration-300
          ${sidebarOpen ? 'lg:pl-8' : 'lg:pl-4'}
          pt-6 pb-2 px-6
          border-b border-gray-800
          bg-gray-900
          flex items-center justify-between
        `}>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              <FiMenu className="w-5 h-5 text-gray-400" />
            </button>
            
            <div>
              <h1 className="text-xl font-bold text-white">
                {sidebarItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {activeMenu === 'dashboard' && 'Monitor your platform performance and statistics'}
                {activeMenu === 'blog' && 'Create, edit, and manage blog posts'}
                {activeMenu === 'gallery' && 'Upload and manage gallery images'}
                {activeMenu === 'game' && 'Add and manage games in your system'}
                {activeMenu === 'user' && 'Manage registered users and their information'}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-auto">
          <div className={`
            h-full transition-all duration-300
            ${sidebarOpen ? 'lg:pl-8' : 'lg:pl-4'}
            px-6 py-4
          `}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;