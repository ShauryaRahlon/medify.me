import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorAuthModal: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your sign-in/sign-up logic here (e.g., API call).
    // On success:
    navigate('/home'); // Redirect to the Doctor's homepage.
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="w-full max-w-4xl bg-navy-900 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] relative z-10 animate-[fadeIn_0.3s_ease-out]">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="bg-[#1a2942] p-6 md:w-1/2">
            <h1 className="text-white text-2xl mb-2">Welcome, Doctor!</h1>
            <p className="text-blue-200">
              Manage your patients and appointments with ease.
            </p>
          </div>

          {/* Right Section */}
          <div className="bg-[#0f172a] p-6 md:w-1/2">
            <h2 className="text-xl text-white text-center mb-4">
              {showSignUp ? 'Sign Up as Doctor' : 'Doctor Sign In'}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your professional email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200"
              >
                {showSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={() => setShowSignUp((prev) => !prev)}
                className="text-blue-400 hover:text-blue-300"
              >
                {showSignUp ? 'Already have an account? Sign In' : 'New here? Sign Up'}
              </button>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate('/')}
                className="text-red-400 hover:text-red-300"
              >
                Return to Patient/User Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAuthModal;
