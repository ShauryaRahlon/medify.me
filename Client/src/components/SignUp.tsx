import { Stethoscope } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        "https://medify-me-ahko.onrender.com/api/auth/signup",
        {
          userName: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Signup successful:", response.data);

      localStorage.setItem("email", formData.email);

      toast.success("OTP generated successfully! Redirecting...");
      setTimeout(() => {
        navigate("/otp");
      }, 2000);
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
      toast.error(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1a2e] flex items-center justify-center">
      <div className="w-full max-w-6xl flex bg-[#111c32] rounded-lg shadow-lg overflow-hidden">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <div className="hidden md:flex flex-col justify-center items-center bg-[#0d243c] text-white p-6 w-1/2">
          <h1 className="text-3xl font-semibold mb-4">We at MediCare</h1>
          <p className="text-lg text-gray-300 mb-6">
            are always fully focused on helping you and your loved ones.
          </p>
          <div className="w-3/4 flex justify-center">
            <Stethoscope className="text-white w-16 h-16" />
          </div>
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white"
                placeholder="Enter your full name"
              />
            </div>

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
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white"
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
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white"
                placeholder="Re-enter your password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-400">
              Already have an account?{" "}
              <Link to="/" className="text-blue-400 hover:text-blue-300">
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
