import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { auth, googleProvider, signInWithPopup } from "../firebaseConfig";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google sign-in successful:", user);
      // Handle the user object as needed, e.g., save in a global state or database
      onClose(); // Close the modal on successful login
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="w-full max-w-4xl bg-navy-900 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden relative z-10 animate-[fadeIn_0.3s_ease-out]">
        <div className="flex flex-col md:flex-row md:h-[600px]">
          <div className="bg-[#1a2942] p-6 md:p-8 flex flex-col justify-center items-center md:w-1/2">
            <div className="bg-blue-500/10 p-4 md:p-6 rounded-full mb-4">
              <img
                src="/icons.webp"
                className="w-12 h-12 md:w-16 md:h-16 text-blue-400"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              medify.me
            </h1>
            <p className="text-blue-200 text-center text-sm md:text-base">
              Your trusted healthcare companion. Connect with doctors and manage
              your health journey seamlessly.
            </p>
          </div>

          <div className="bg-[#0f172a] p-6 md:p-8 flex flex-col justify-center md:w-1/2">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-white text-center mb-6 md:mb-8">
                Sign In
              </h2>

              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 md:py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                {isLoading ? "Signing in..." : "Continue with Google"}
              </button>

              <div className="relative flex items-center gap-3 py-2">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="text-sm text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Sign In
                </button>
              </form>
              <div className="flex flex-col items-center space-y-2 pt-4">
                <a
                  href="/signup"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Sign up for an account
                </a>
                <a
                  href="/doctor-auth"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Are you a doctor?
                </a>
              </div>

              <p className="text-xs md:text-sm text-gray-400 text-center mt-4 md:mt-6">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
