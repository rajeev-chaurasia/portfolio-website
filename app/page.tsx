'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Hi, I'm <span className="text-primary dark:text-primary-light">Maverick</span> 👋
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300">
              Full Stack Developer & Problem Solver
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400">
              I build scalable web applications with modern technologies. Passionate about creating efficient solutions and delivering exceptional user experiences.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6">
              <Link 
                href="https://github.com/yourusername" 
                target="_blank"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link 
                href="https://linkedin.com/in/yourusername" 
                target="_blank"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </Link>
              <Link 
                href="https://twitter.com/yourusername" 
                target="_blank"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </Link>
              <Link 
                href="mailto:your.email@example.com" 
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
              >
                <HiOutlineMail className="w-6 h-6" />
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-4">
              <Link 
                href="/projects"
                className="px-6 py-3 bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary text-white rounded-lg transition-colors"
              >
                View My Work
              </Link>
              <Link 
                href="/contact"
                className="px-6 py-3 border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10 rounded-lg transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              {
                title: "5+ Years",
                description: "Professional Experience"
              },
              {
                title: "20+ Projects",
                description: "Completed"
              },
              {
                title: "Full Stack",
                description: "Development"
              },
              {
                title: "Problem Solver",
                description: "Analytical Mindset"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold text-primary dark:text-primary-light mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
