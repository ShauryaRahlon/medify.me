import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)']
  );

  const [springs, api] = useSpring(() => ({
    from: { transform: 'perspective(1000px) rotateX(0deg)' },
  }));

  useEffect(() => {
    const handleScroll = () => {
      const rotation = window.scrollY > 50 ? 'perspective(1000px) rotateX(-2deg)' : 'perspective(1000px) rotateX(0deg)';
      api.start({ transform: rotation });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [api]);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
    setIsOpen(false);
  };

  const menuItems = ['Home', 'Features', 'About', 'Contact','Sign In'];

  const menuVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  return (
    <>
      <motion.nav
        style={{ backgroundColor }}
        className="fixed w-full z-50 backdrop-blur-xl border-b border-white/10"
      >
        <animated.div style={springs} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 text-2xl font-bold relative ml-8"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                medify.me
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 ml-12">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  custom={i}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgb(255,255,255)",
                  }}
                  className="text-gray-300 hover:text-white px-3 py-2 text-lg font-medium cursor-pointer relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.a>
              ))}
            
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </animated.div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-black/80 backdrop-blur-lg"
        >
          <div className="px-4 py-3 space-y-3">
            {menuItems.map((item, i) => (
              <motion.a
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium border-l-2 border-transparent hover:border-cyan-400 transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              onClick={handleAuthClick}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-full
                        hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Sign In
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;