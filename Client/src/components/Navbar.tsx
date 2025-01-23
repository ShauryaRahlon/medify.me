import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status whenever component mounts or auth state changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Check initial auth state
    checkAuth();

    // Listen for storage events (in case token is changed in another tab)
    window.addEventListener("storage", checkAuth);

    // Listen for custom auth event
    window.addEventListener("authStateChanged", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authStateChanged", checkAuth);
    };
  }, []);

  const { scrollY } = useScroll();

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // If you store user data

    // Update auth state
    setIsAuthenticated(false);

    // Close mobile menu
    setIsOpen(false);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authStateChanged"));
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authStateChanged"));
  };

  return (
    <>
      <nav className="fixed z-50 w-full bg-white-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent gap-3"
            >
              <img src="/icons.webp" alt="Logo" className="w-14 h-14" />
              <span>
                <button>medify.me</button>
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["Home", "Services", "Feedbacks", "About Us"]
                  .concat(isAuthenticated ? ["Log Out"] : ["Login"])
                  .map((item) => (
                    <motion.a
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      onClick={
                        item === "Login"
                          ? handleAuthClick
                          : item === "Log Out"
                          ? handleLogout
                          : () =>
                              document
                                .getElementById(item)
                                ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className={`relative px-3 py-2 rounded-md text-md font-medium cursor-pointer group ${
                        item === "Login"
                          ? "text-blue-500 hover:text-blue-700"
                          : item === "Log Out"
                          ? "text-red-500 hover:text-red-700"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </motion.a>
                  ))}
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
              {["Home", "Services", "Feedbacks", "About Us"]
                .concat(isAuthenticated ? ["Log Out"] : ["Login"])
                .map((item) => (
                  <a
                    key={item}
                    onClick={
                      item === "Login"
                        ? handleAuthClick
                        : item === "Log Out"
                        ? handleLogout
                        : () =>
                            document
                              .getElementById(item)
                              ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`block px-3 py-2 rounded-md text-base font-bold ${
                      item === "Login"
                        ? "text-blue-500 hover:text-blue-700"
                        : item === "Log Out"
                        ? "text-red-500 hover:text-red-700"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item}
                  </a>
                ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        setIsOpen={setIsOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
