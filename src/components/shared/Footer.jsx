import React from 'react';
import { Facebook, Twitter, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-[#F83002] to-[#ff6b4a] bg-clip-text text-transparent cursor-pointer"
              >
                Job<span className="text-white">Hunt</span>
              </motion.span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs font-medium">
              Connecting talent with opportunity. Find your dream job or the perfect candidate with our seamless recruitment platform.
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: Facebook, href: "#", color: "hover:bg-[#1877F2] hover:text-white" },
                { icon: Twitter, href: "#", color: "hover:bg-[#1DA1F2] hover:text-white" },
                { icon: Linkedin, href: "#", color: "hover:bg-[#0A66C2] hover:text-white" },
                { icon: Github, href: "#", color: "hover:bg-white hover:text-black" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`p-2.5 rounded-full bg-gray-900 text-gray-400 border border-gray-800 transition-all duration-300 shadow-lg ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              For Job Seekers
            </h3>
            <ul className="space-y-4">
              {[
                'Frontend Developer',
                'Backend Developer',
                'FullStack Developer',
                'UI/UX Designer',
                'Data Science',
                'Mobile Developer'
              ].map((link) => (
                <li key={link} className='relative group w-fit'>
                  <a href="#" className="text-gray-400 hover:text-[#F83002] transition-colors inline-block font-medium">
                    {link}
                    <span className='absolute left-0 bottom-[-2px] w-0 h-[1.5px] bg-[#F83002] transition-all duration-300 group-hover:w-full'></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              For Employers
            </h3>
            <ul className="space-y-4">
              {['Post a Job', 'Browse Candidates', 'Pricing', 'Resources'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#F83002] transition-colors inline-block font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={20} className="text-[#F83002] shrink-0 mt-1" />
                <span className="font-medium">123 Job Lane, Career City, ST 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="text-[#F83002] shrink-0" />
                <span className="font-medium">+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="text-[#F83002] shrink-0" />
                <span className="font-medium">support@jobhunt.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-white text-sm font-bold tracking-tight">
            Made with <span className="text-[#F83002] animate-pulse">❤️</span> by <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-extrabold uppercase">Avengers</span>
          </p>
          <p className="text-gray-500 text-xs tracking-wide">
            © {new Date().getFullYear()} JobHunt. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm mt-2 font-medium">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
