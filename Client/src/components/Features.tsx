import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Microscope, ScanSearch } from 'lucide-react';

const features = [
  {
    icon: <Activity className="w-8 h-8" />,
    title: 'Health Monitoring',
    description: 'Real-time tracking of vital signs and health metrics',
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Symptom Detector',
    description: 'AI-powered analysis for accurate symptom detection',
  },
  {
    icon: <Microscope className="w-8 h-8" />,
    title: 'Lab Results',
    description: 'Instant access to your medical test results',
  },
  {
    icon: <ScanSearch className="w-8 h-8" />,
    title: 'Label Checker',
    description: 'Scan and analyze nutrition labels instantly',
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-black/50 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.15),transparent_70%)]"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
          />
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent relative">
            Cutting-Edge Features
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Discover our advanced health monitoring tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.01, easings: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-white/10 group hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;