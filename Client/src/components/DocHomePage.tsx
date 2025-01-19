import React, { useState } from 'react';
import { 
  UserCircle, 
  Calendar, 
  MessageSquare, 
  ClipboardList, 
  Users,
  ChevronDown,
  LogOut,
  User
} from 'lucide-react';

function DocHomePage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const mockAppointments = [
    { id: 1, patient: "John Doe", time: "10:00 AM", notes: "Regular checkup" },
    { id: 2, patient: "Sarah Smith", time: "11:30 AM", notes: "Follow-up" },
    { id: 3, patient: "Mike Johnson", time: "2:00 PM", notes: "Consultation" },
    { id: 4, patient: "Emma Wilson", time: "3:30 PM", notes: "Test results review" },
  ];

  const mockQueries = [
    { id: 1, patient: "Alice Brown", question: "Can I adjust my medication dosage?", time: "2 hours ago" },
    { id: 2, patient: "Tom Davis", question: "When should I schedule my next visit?", time: "5 hours ago" },
    { id: 3, patient: "Linda White", question: "Are these side effects normal?", time: "1 day ago" },
  ];

  const mockRequests = [
    { id: 1, type: "Reschedule", patient: "Peter Parker", details: "Request to move appointment to next week" },
    { id: 2, type: "Certificate", patient: "Mary Jane", details: "Medical certificate for work" },
    { id: 3, type: "Prescription", patient: "Harry Osborn", details: "Prescription renewal request" },
  ];

  const mockPatients = [
    { id: 1, name: "James Wilson", contact: "+1 234-567-8900", lastVisit: "2024-02-15" },
    { id: 2, name: "Emily Davis", contact: "+1 234-567-8901", lastVisit: "2024-02-14" },
    { id: 3, name: "Robert Brown", contact: "+1 234-567-8902", lastVisit: "2024-02-13" },
    { id: 4, name: "Lisa Anderson", contact: "+1 234-567-8903", lastVisit: "2024-02-12" },
  ];

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-navy-950 to-navy-900 border-b border-navy-800/50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <div className="flex items-center space-x-2">
            <UserCircle className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
              Doctor Dashboard
            </span>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <UserCircle className="h-5 w-5" />
              <ChevronDown className="h-3 w-3" />
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-navy-900 rounded-lg shadow-xl border border-navy-800/50 py-1 z-10">
                <button className="flex items-center px-4 py-2 text-gray-300 hover:bg-navy-800/50 w-full">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </button>
                <button className="flex items-center px-4 py-2 text-gray-300 hover:bg-navy-800/50 w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Current Appointments */}
          <div className="group relative bg-gradient-to-br from-navy-900 to-navy-950 rounded-lg p-4 border border-navy-800/30 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                <span className="text-2xl font-bold text-white">{mockAppointments.length}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-400">Appointments</h3>
            </div>
          </div>

          {/* Other Content Sections */}
          {/* Queries */}
          {/* Requests */}
          {/* Patients */}
        </div>
      </div>
    </div>
  );
}

export default DocHomePage;
