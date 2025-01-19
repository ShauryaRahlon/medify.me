import React, { useState } from 'react';
import {
  Menu,
  X,
  Stethoscope,
  Brain,
  Apple,
  Pill,
  User,
  LogOut,
  Home,
  Settings,
  Bell,
  HelpCircle,
  Activity,
  Calendar,
  Heart,
  ChevronRight,
  Users,
  FileText,
  BarChart
} from 'lucide-react';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const sidebarItems = [
    { icon: <Home className="sidebar-icon" />, label: 'Dashboard', category: 'main' },
    { icon: <Bell className="sidebar-icon" />, label: 'Notifications', category: 'main' },
    { icon: <Calendar className="sidebar-icon" />, label: 'Appointments', category: 'main' },
    { icon: <Users className="sidebar-icon" />, label: 'Doctors', category: 'health' },
    { icon: <FileText className="sidebar-icon" />, label: 'Records', category: 'health' },
    { icon: <BarChart className="sidebar-icon" />, label: 'Analytics', category: 'health' },
    { icon: <Settings className="sidebar-icon" />, label: 'Settings', category: 'other' },
    { icon: <HelpCircle className="sidebar-icon" />, label: 'Help', category: 'other' }
  ];

  const features = [
    {
      title: 'Connect to Doctor',
      icon: <Stethoscope className="w-12 h-12 text-blue-500" />,
      description: 'Get instant consultation with certified doctors',
      bgGradient: 'from-blue-100 to-blue-200'
    },
    {
      title: 'Symptoms Detector',
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      description: 'Check your symptoms and get instant analysis',
      bgGradient: 'from-purple-100 to-purple-200'
    },
    {
      title: 'Food Nutrition Checker',
      icon: <Apple className="w-12 h-12 text-green-500" />,
      description: 'Analyze nutritional value of your meals',
      bgGradient: 'from-green-100 to-green-200'
    },
    {
      title: 'Prescription Check',
      icon: <Pill className="w-12 h-12 text-red-500" />,
      description: 'Verify and manage your prescriptions',
      bgGradient: 'from-red-100 to-red-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient">
      {/* Enhanced Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="logo-section flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'hidden'}`}>
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              HealthCare
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            {isSidebarOpen ? <X className="text-gray-600" /> : <Menu className="text-gray-600" />}
          </button>
        </div>

        <div className="nav-section px-4">
          {Object.entries(
            sidebarItems.reduce((acc, item) => {
              if (!acc[item.category]) acc[item.category] = [];
              acc[item.category].push(item);
              return acc;
            }, {})
          ).map(([category, items]) => (
            <div key={category} className="mb-8">
              {isSidebarOpen && (
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                  {category}
                </h2>
              )}
              {(items as typeof sidebarItems).map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveItem(item.label)}
                  className={`sidebar-item group ${activeItem === item.label ? 'active' : ''}`}
                >
                  <div className="flex items-center w-full">
                    <div className={`${activeItem === item.label ? 'text-white' : 'text-gray-600'}`}>
                      {item.icon}
                    </div>
                    {isSidebarOpen && (
                      <>
                        <span className="ml-4 font-medium">{item.label}</span>
                        <ChevronRight 
                          className={`ml-auto w-4 h-4 transition-transform duration-200 
                            ${activeItem === item.label ? 'text-white opacity-100' : 'opacity-0 group-hover:opacity-50'}
                            ${activeItem === item.label ? 'translate-x-0' : '-translate-x-2 group-hover:translate-x-0'}`}
                        />
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Rest of the content remains the same */}
        <header className="glass-effect shadow-lg p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Activity className="w-6 h-6 text-blue-500 animate-float" />
              <span className="text-lg font-semibold text-gray-700">Health Dashboard</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-all"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
                  alt="Profile"
                  className="w-10 h-10 rounded-full ring-2 ring-white shadow-lg"
                />
                <div className={`transition-all ${!isSidebarOpen && 'hidden'}`}>
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 glass-effect rounded-xl shadow-xl py-2 z-10">
                  <button className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors flex items-center text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 mb-8 transform hover:scale-[1.02] transition-all">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
              Welcome Back, John!
            </h1>
            <p className="text-gray-600">Your health journey continues. Here's your daily overview.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group cursor-pointer"
              >
                <div className={`card-content h-full bg-gradient-to-br ${feature.bgGradient} p-6 rounded-2xl shadow-lg 
                  transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-xl shadow-md transform transition-transform group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-effect rounded-2xl p-6 transform hover:scale-[1.01] transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Heart className="w-6 h-6 text-red-500 mr-2 animate-float" />
              Your Health Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Appointments', value: '3 Upcoming', icon: <Calendar className="w-6 h-6 text-blue-500" /> },
                { label: 'Prescriptions', value: '2 Active', icon: <Pill className="w-6 h-6 text-green-500" /> },
                { label: 'Health Score', value: '85/100', icon: <Activity className="w-6 h-6 text-purple-500" /> }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-white/50 to-white/30 rounded-xl p-4 shadow-lg
                    transform transition-all hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-600">{stat.label}</p>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;