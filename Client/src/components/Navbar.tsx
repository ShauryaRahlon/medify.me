import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // For AuthModal
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks auth state

  const { scrollY } = useScroll(); // Handle scroll-based animations
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.8)"]
  );

  // const [springs, api] = useSpring(() => ({
  //   from: { transform: "perspective(1000px) rotateX(0deg)" },
  // }));

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const rotation =
  //       window.scrollY > 50
  //         ? "perspective(1000px) rotateX(-2deg)"
  //         : "perspective(1000px) rotateX(0deg)";
  //     api.start({ transform: rotation });
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [api]);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
    setIsOpen(false); // Closes mobile menu
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsOpen(false);
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
              <button className="ml-10 flex items-baseline space-x-8">
                {[
                  "Home",
                  "Appointment",
                  "Services",
                  "Feedbacks",
                  "About Us",
                  "Login",
                  "Sign Up",
                  "Log Out",
                ].map((item) =>
                  item === "Login" ||
                  item === "Log Out" ||
                  item === "Sign Up" ? (
                    <motion.a
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      onClick={handleAuthClick} // Opens the modal
                      className="relative text-blue-500 hover:text-blue-700 px-3 py-2 rounded-md text-md font-medium cursor-pointer group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </motion.a>
                  ) : (
                    <motion.a
                      key={item}
                      onClick={() =>
                        document
                          .getElementById(item)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      whileHover={{ scale: 1.05 }}
                      className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md text-md font-medium cursor-pointer group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </motion.a>
                  )
                )}
              </button>
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
              {[
                "Home",
                "Appointment",
                "Services",
                "Feedbacks",
                "About Us",
                "Login",
                "Sign Up",
                "Log Out",
              ].map((item) =>
                item === "Login" ? (
                  <a
                    key={item}
                    onClick={handleAuthClick} // Opens the modal
                    className="text-blue-500 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-extrabold"
                  >
                    {item}
                  </a>
                ) : (
                  <a
                    key={item}
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item}
                  </a>
                )
              )}

              {!isAuthenticated ? (
                <>
                  <a
                    onClick={handleAuthClick}
                    className="text-blue-500 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-bold"
                  >
                    Login
                  </a>
                </>
              ) : (
                <a
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 block px-3 py-2 rounded-md text-base font-bold"
                >
                  Log Out
                </a>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        setIsOpen={setIsOpen}
        setIsAuthModelOpen={setIsAuthModalOpen}
      />
    </>
  );
};

export default Navbar;
