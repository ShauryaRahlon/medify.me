import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
    setIsOpen(false); // Close the menu if it's open
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 text-xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent"
            >
              HealthTech
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'Features', 'About', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  onClick={handleAuthClick}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-black to-black text-gray-300 rounded-full hover:shadow-lg hover:shadow-gray-700/50 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'Features', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={handleAuthClick}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-gray-300 rounded-full hover:shadow-lg hover:shadow-gray-700/50 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
