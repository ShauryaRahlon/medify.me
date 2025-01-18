import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Users,
  LifeBuoy,
  Newspaper,
  Building2,
  Contact,
  HelpCircle
} from 'lucide-react';

const Footer = () => {
  const companyLinks = [
    { name: 'About Us', icon: <Building2 size={16} /> },
    { name: 'Blog', icon: <Newspaper size={16} /> },
    { name: 'Careers', icon: <Users size={16} /> },
    { name: 'Contact', icon: <Contact size={16} /> }
  ];

  const featuresLinks = [
    { name: 'Health Monitoring', icon: <Heart size={16} /> },
    { name: 'Consultations', icon: <MessageCircle size={16} /> },
    { name: 'Resources', icon: <BookOpen size={16} /> },
    { name: 'Support', icon: <LifeBuoy size={16} /> }
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: 'contact@healthtech.com' },
    { icon: <Phone size={16} />, text: '+1 (555) 123-4567' },
    { icon: <MapPin size={16} />, text: 'San Francisco, CA' },
    { icon: <HelpCircle size={16} />, text: '24/7 Support' }
  ];

  const socialIcons = [
    { icon: <Facebook size={20} />, name: 'Facebook' },
    { icon: <Twitter size={20} />, name: 'Twitter' },
    { icon: <Instagram size={20} />, name: 'Instagram' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-gradient-x"></div>
      
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-blue-500" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                medify.me
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Revolutionizing healthcare through innovative technology solutions. Monitoring your health has never been easier.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <motion.li key={link.name}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 group"
                >
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    {link.icon}
                  </span>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Features Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Features</h4>
            <ul className="space-y-4">
              {featuresLinks.map((link) => (
                <motion.li key={link.name}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 group"
                >
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    {link.icon}
                  </span>
                  <a className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.li key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-gray-400 group"
                >
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    {info.icon}
                  </span>
                  <span className="group-hover:text-white transition-colors">
                    {info.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} HealthTech. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;