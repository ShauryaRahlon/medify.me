import React, { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

interface FormData {
  email: string;
  password: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  setIsOpen,
  setIsAuthModalOpen,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      const response = await fetch(
        "https://medify-me-1.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // const token = localStorage.getItem("authToken");

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      console.log(response);

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      onLoginSuccess();
      setIsOpen(false);
      setIsAuthModalOpen(false);
      window.dispatchEvent(new Event("authStateChanged"));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
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
      <div className="w-full max-w-4xl bg-navy-900 rounded-xl shadow-lg overflow-hidden relative z-10 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:h-[600px]">
          <div className="bg-[#1a2942] p-6 md:p-8 flex flex-col justify-center items-center md:w-1/2">
            <div className="bg-blue-500/10 p-4 md:p-6 rounded-full mb-4">
              <img
                src="/icons.webp"
                alt="Medify.me Logo"
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

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your email"
                    disabled={isLoading}
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
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
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
