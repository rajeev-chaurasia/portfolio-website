'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const firstName = "Rajeev Ranjan".split("");
  const lastName = "Chaurasia".split("");

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          {/* Left Column - Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 md:space-y-10 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white flex flex-wrap gap-x-3 mb-2 justify-center lg:justify-start">
                Hi, I'm{" "}
                <span className="text-primary dark:text-primary-light flex flex-wrap">
                  {firstName.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      className="inline-block hover:text-secondary dark:hover:text-secondary-light transition-colors"
                      whileHover={{ scale: 1.2, rotate: [-5, 5, 0] }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
              </h1>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white flex items-center gap-x-3 justify-center lg:justify-start">
                <span className="text-primary dark:text-primary-light flex flex-wrap">
                  {lastName.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index + firstName.length}
                      className="inline-block hover:text-secondary dark:hover:text-secondary-light transition-colors"
                      whileHover={{ scale: 1.2, rotate: [-5, 5, 0] }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
                <motion.span
                  initial={{ rotate: -45 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="inline-block"
                >
                  👋
                </motion.span>
              </h1>
            </div>
            
            <motion.h2 
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Enterprise Software Engineer
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              I'm a Software Engineering graduate student at San Jose State University with prior professional experience as a Software Engineer at Tekion Corp. I'm passionate about building scalable backend systems, designing efficient microservices, and contributing to impactful full-stack applications.
            </motion.p>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                href="https://github.com/rajeev-chaurasia" 
                target="_blank"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-all hover:scale-110"
              >
                <FaGithub className="w-7 h-7" />
              </Link>
              <Link 
                href="https://linkedin.com/in/rajeev-chaurasia" 
                target="_blank"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-all hover:scale-110"
              >
                <FaLinkedin className="w-7 h-7" />
              </Link>
              <Link 
                href="mailto:rajeev.chaurasia@sjsu.edu" 
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-all hover:scale-110"
              >
                <HiOutlineMail className="w-7 h-7" />
              </Link>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link 
                href="/projects"
                className="px-8 py-3 bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary text-white rounded-lg transition-all hover:scale-105 text-center text-lg"
              >
                View My Work
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-3 border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10 rounded-lg transition-all hover:scale-105 text-center text-lg"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/profile.jpg"
                  alt="Rajeev Ranjan Chaurasia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 384px"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
