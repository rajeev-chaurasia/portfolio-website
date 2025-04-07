'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { FaCode, FaLaptopCode, FaServer, FaDatabase, FaCloud, FaJava, FaStream } from 'react-icons/fa';
import { SiSpring, SiMongodb, SiElasticsearch, SiMysql, SiCplusplus, SiJavascript, SiGit, SiPostman, SiJira } from 'react-icons/si';

export default function About() {
  const techStack = [
    { icon: FaJava, name: 'Java' },
    { icon: SiCplusplus, name: 'C++' },
    { icon: SiJavascript, name: 'JavaScript' },
    { icon: SiSpring, name: 'Spring Boot' },
    { icon: FaStream, name: 'Kafka' },
    { icon: SiElasticsearch, name: 'Elasticsearch' },
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiMysql, name: 'MySQL' },
    { icon: SiGit, name: 'Git' },
    { icon: SiPostman, name: 'Postman' },
    { icon: SiJira, name: 'JIRA' },
  ];

  const expertise = [
    {
      icon: FaLaptopCode,
      title: 'Backend Development',
      description: 'Building robust and scalable backend systems using Java, Spring Boot, and microservices architecture.'
    },
    {
      icon: FaDatabase,
      title: 'Database Systems',
      description: 'Working with SQL and NoSQL databases, implementing efficient data storage and retrieval solutions.'
    },
    {
      icon: FaCloud,
      title: 'Distributed Systems',
      description: 'Designing and implementing distributed applications with a focus on scalability and reliability.'
    },
    {
      icon: FaServer,
      title: 'System Design',
      description: 'Creating efficient system architectures following best practices and design patterns.'
    }
  ];

  return (
    <PageLayout 
      title="About Me" 
      description="Software Engineer passionate about building scalable solutions"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rajeev Ranjan Chaurasia
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building the future of enterprise software, one line of code at a time
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 mb-16"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <FaCode className="text-primary" />
            My Journey
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Currently pursuing MS in Software Engineering at San Jose State University, 
              I am deeply passionate about distributed systems and enterprise software development. 
              My academic journey has equipped me with strong theoretical foundations, while my 
              professional experience has given me practical insights into building real-world solutions.
            </p>
            <p>
              I believe in writing clean, maintainable code and creating systems that are not just 
              functional but also scalable and efficient. My approach combines technical expertise 
              with a keen understanding of business requirements to deliver impactful solutions.
            </p>
          </div>
        </motion.div>

        {/* Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <item.icon className="text-3xl mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Technologies I Work With</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <tech.icon className="text-3xl mb-2 text-primary" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
  