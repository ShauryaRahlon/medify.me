import { Stethoscope } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword
  });
  const [error, setError] = useState<string | null>(null); // Error state for validation

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear the error on user input
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    console.log('Form Data:', formData);

    // Redirect to Medical History page
    navigate('/userhome');
  };

  return (
    <div className="min-h-screen bg-[#0a1a2e] flex items-center justify-center">
      <div className="w-full max-w-6xl flex bg-[#111c32] rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#0d243c] text-white p-6 w-1/2">
          <h1 className="text-3xl font-semibold mb-4">We at MediCare</h1>
          <p className="text-lg text-gray-300 mb-6">
            are always fully focused on helping you and your loved ones.
          </p>
          <div className="w-3/4 flex justify-center">
            <Stethoscope className="text-white w-16 h-16" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
            Create Account
          </h2>

          {/* Social Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className="flex items-center bg-[#3b5998] text-white px-4 py-2 rounded-lg hover:bg-[#314e88] transition-all"
            >
              <i className="fab fa-google mr-2"></i> Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="text-gray-400 mx-4">OR</span>
            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          {/* Form */}
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
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 bg-[#1a2942] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter your password"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <span className="text-gray-400">
              Already have an account?{' '}
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
