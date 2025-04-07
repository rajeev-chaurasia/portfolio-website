'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { 
  FaCode, 
  FaServer, 
  FaTools, 
} from 'react-icons/fa';

interface Skill {
  skill: string;
  category: string;
}

interface SkillsListProps {
  skills: Skill[];
}

const categoryIcons: Record<string, any> = {
  'Development Technologies': FaServer,
  'Programming': FaCode,
  'Tools': FaTools
};

const categoryColors: Record<string, string> = {  
  'Development Technologies': 'from-blue-500 to-blue-600',
  'Programming': 'from-indigo-500 to-indigo-600',
  'Tools': 'from-violet-500 to-violet-600'
};

export default function SkillsList({ skills }: SkillsListProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <PageLayout 
      title="Skills" 
      description="My technical expertise and capabilities"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(groupedSkills).map(([category, items], idx) => {
            const Icon = categoryIcons[category] || FaTools;
            const gradient = categoryColors[category] || 'from-purple-500 to-purple-600';
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="relative p-6 rounded-xl border border-gray-300 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm group-hover:shadow-lg transition-all duration-300 h-full"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
                      {category}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className={`px-4 py-2 rounded-full text-lg font-medium 
                          bg-gradient-to-r ${gradient} text-white/90 dark:text-white/90
                          hover:shadow-md transition-all duration-300`}
                      >
                        {skill.skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </PageLayout>
  );
} 