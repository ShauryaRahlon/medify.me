import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, Loader2 } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      setTimeout(() => {
        navigate("/userhome");
      }, 2000);
    } else {
      console.log(token);
      alert("Please log in to continue.");
    }
  };

  return (
    <div className="relative pt-32 pb-20 sm:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl -z-10"
          />
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-500 via-green-400 to-blue-600 bg-clip-text text-transparent mb-4 animate-gradient bg-300% relative pb-2.5">
            The Future of Health Technology
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Experience the next generation of health monitoring and diagnosis
            with our AI-powered platform
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={handleClick}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 cursor-pointer">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-3 transition-opacity duration-300" />
            </button>
          </motion.div>

          {/* Enhanced Loading Animation */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      className="relative"
                    >
                      <div className="w-16 h-16 rounded-full border-4 border-blue-500/30">
                        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
                      </div>
                      <Loader2 className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white font-medium"
                    >
                      Starting your health Journey...
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 relative"
        >
          {/* Rest of the phone UI code remains the same */}
          <div className="relative mx-auto w-full max-w-lg perspective-1000">
            <motion.div
              initial={{ rotateY: 25 }}
              animate={{
                rotateY: [-25, 25, -25],
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-72 h-[600px] mx-auto"
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-xl transform preserve-3d">
                {/* Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-6 bg-black flex items-center justify-between px-6">
                    <span className="text-white text-xs">9:41</span>
                    <div className="flex space-x-2">
                      <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Health Data */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 space-y-4"
                  >
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <h3 className="text-green-400 text-sm font-medium">
                        Heart Rate
                      </h3>
                      <motion.p
                        className="text-2xl font-bold text-white"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        72 BPM
                      </motion.p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <h3 className="text-blue-400 text-sm font-medium">
                        Steps Today
                      </h3>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-2 bg-blue-400 rounded-full mt-2"
                      />
                      <p className="text-xl font-bold text-white mt-2">7,543</p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <h3 className="text-purple-400 text-sm font-medium">
                        Sleep Quality
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <motion.div
                          animate={{
                            height: ["100%", "60%", "100%"],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-12 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{
                            height: ["60%", "100%", "60%"],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-8 bg-purple-400 rounded-full"
                        />
                        <motion.div
                          animate={{
                            height: ["80%", "40%", "80%"],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-10 bg-purple-400 rounded-full"
                        />
                      </div>
                      <p className="text-xl font-bold text-white mt-2">
                        8h 12m
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-[3rem] pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,100,255,0.1),transparent_50%)]" />
    </div>
  );
};

export default Hero;
