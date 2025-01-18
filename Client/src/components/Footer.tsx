import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              Medify.me
            </h3>
            <p className="text-gray-400">
              The future of health monitoring and diagnosis
            </p>
          </div>
          
          {['Company', 'Features', 'Resources'].map((section, index) => (
            <div key={section} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">{section}</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Contact', 'Support'].map((item) => (
                  <li key={item}>
                    <a className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400">
            © 2024 HealthTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;