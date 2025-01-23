import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Stethoscope,
  Calendar,
  MessageSquare,
  Users,
  User,
  LogOut,
  Home,
  Settings,
  HelpCircle,
  ChevronRight,
  FileText,
  BarChart,
  Clock,
} from "lucide-react";

function DocHomePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    {
      icon: <Home className="sidebar-icon" />,
      label: "Dashboard",
      category: "main",
    },
    {
      icon: <Calendar className="sidebar-icon" />,
      label: "Appointments",
      category: "main",
    },
    {
      icon: <MessageSquare className="sidebar-icon" />,
      label: "Messages",
      category: "main",
    },
    {
      icon: <Users className="sidebar-icon" />,
      label: "Patients",
      category: "clinical",
    },
    {
      icon: <FileText className="sidebar-icon" />,
      label: "Records",
      category: "clinical",
    },
    {
      icon: <BarChart className="sidebar-icon" />,
      label: "Analytics",
      category: "clinical",
    },
    {
      icon: <Settings className="sidebar-icon" />,
      label: "Settings",
      category: "other",
    },
    {
      icon: <HelpCircle className="sidebar-icon" />,
      label: "Help",
      category: "other",
    },
  ];

  const mockAppointments = [
    {
      id: 1,
      patient: "John Doe",
      time: "10:00 AM",
      notes: "Regular checkup",
      status: "Upcoming",
    },
    {
      id: 2,
      patient: "Sarah Smith",
      time: "11:30 AM",
      notes: "Follow-up",
      status: "Upcoming",
    },
    {
      id: 3,
      patient: "Mike Johnson",
      time: "2:00 PM",
      notes: "Consultation",
      status: "Upcoming",
    },
    {
      id: 4,
      patient: "Emma Wilson",
      time: "3:30 PM",
      notes: "Test results review",
      status: "Upcoming",
    },
  ];

  const mockQueries = [
    {
      id: 1,
      patient: "Alice Brown",
      question: "Can I adjust my medication dosage?",
      time: "2 hours ago",
    },
    {
      id: 2,
      patient: "Tom Davis",
      question: "When should I schedule my next visit?",
      time: "5 hours ago",
    },
    {
      id: 3,
      patient: "Linda White",
      question: "Are these side effects normal?",
      time: "1 day ago",
    },
  ];

  // Mobile overlay for sidebar
  const Overlay = () => (
    <div
      className={`fixed inset-0 bg-black/50 z-10 transition-opacity ${
        isSidebarOpen && isMobile
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setSidebarOpen(false)}
    />
  );
  const handleLogOutClick = () => {
    localStorage.removeItem("token"); // If you're using token-based authentication
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Overlay />
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 z-20 bg-gray-900/90 backdrop-blur-lg border-r border-gray-700/50
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          ${isSidebarOpen ? "w-72" : "w-fit"}
          ${isMobile ? "w-72" : ""}`}
      >
        <div className="p-4 md:p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center space-x-3 ${
                !isSidebarOpen && !isMobile && "hidden"
              }`}
            >
              <Stethoscope className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              <h1 className="font-bold text-lg md:text-xl text-blue-400 neon-glow">
                DocPortal
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div className="px-2 md:px-4 mt-4 md:mt-6">
          {Object.entries(
            sidebarItems.reduce((acc: Record<string, any[]>, item) => {
              if (!acc[item.category]) acc[item.category] = [];
              acc[item.category].push(item);
              return acc;
            }, {})
          ).map(([category, items]) => (
            <div key={category} className="mb-6 md:mb-8">
              {(isSidebarOpen || isMobile) && (
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 md:mb-4 px-2">
                  {category}
                </h2>
              )}
              {(items as typeof sidebarItems).map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveItem(item.label);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full px-4 md:px-6 py-3 md:py-4 text-left transition-all duration-300 flex items-center rounded-lg mb-1
                    ${
                      activeItem === item.label
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-gray-300 hover:bg-gray-700/30"
                    }`}
                >
                  <div className="flex items-center w-full">
                    <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-center">
                      {item.icon}
                    </div>
                    {(isSidebarOpen || isMobile) && (
                      <>
                        <span className="ml-3 md:ml-4 font-medium text-sm md:text-base">
                          {item.label}
                        </span>
                        <ChevronRight
                          className={`ml-auto w-4 h-4 transition-transform duration-200 
                            ${
                              activeItem === item.label
                                ? "opacity-100"
                                : "opacity-0"
                            }
                            ${
                              activeItem === item.label
                                ? "translate-x-0"
                                : "-translate-x-2"
                            }`}
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
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "ml-72" : "ml-0 md:ml-20"
        }`}
      >
        <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 mr-2 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-300"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <span className="text-base md:text-lg font-semibold text-gray-100 ml-5">
                Doctor Dashboard
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700/50 transition-all"
              >
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3"
                  alt="Doctor Profile"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-gray-700"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-100">
                    Dr. Sarah Johnson
                  </p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-xl py-2 z-10 border border-gray-700/50">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700/50 transition-colors flex items-center text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogOutClick}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700/50 transition-colors flex items-center text-red-400"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8 border border-gray-700/50 transform hover:scale-[1.01] transition-all">
            <h1 className="text-2xl md:text-4xl font-bold text-blue-400 neon-glow mb-2 md:mb-4">
              Welcome, Dr. Sarah!
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              Here's your practice overview for today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Appointments",
                value: mockAppointments.length,
                icon: <Calendar className="text-blue-400" />,
              },
              {
                label: "Patient Queries",
                value: mockQueries.length,
                icon: <MessageSquare className="text-green-400" />,
              },
              {
                label: "Total Patients",
                value: "120",
                icon: <Users className="text-purple-400" />,
              },
              {
                label: "Hours Today",
                value: "8.5",
                icon: <Clock className="text-orange-400" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/30 transition-all hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-gray-900/50 rounded-lg">
                    {React.cloneElement(stat.icon, {
                      className: `w-5 h-5 md:w-6 md:h-6 ${stat.icon.props.className}`,
                    })}
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-400">
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>

          {/* Today's Schedule */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                Today's Appointments
              </h2>
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">
                          {appointment.patient}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {appointment.notes}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-blue-400">
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Queries */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 text-green-400 mr-2" />
                Recent Patient Queries
              </h2>
              <div className="space-y-4">
                {mockQueries.map((query) => (
                  <div
                    key={query.id}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30 hover:border-green-500/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">
                        {query.patient}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {query.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{query.question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DocHomePage;
