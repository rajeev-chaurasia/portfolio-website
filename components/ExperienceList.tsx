'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Experience {
  company: string;
  role: string;
  location: string;
  startDateText: string;
  endDateText: string;
  description: string;
  logo: string;
}

interface ExperienceListProps {
  experienceList: Experience[];
}

export default function ExperienceList({ experienceList }: ExperienceListProps) {
  return (
    <PageLayout 
      title="Experience" 
      description="My professional journey and work experience"
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[180px] md:left-[200px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {experienceList.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex"
              >
                {/* Role Title on Left */}
                <div className="w-[180px] md:w-[200px] pr-8 pt-6 flex justify-end">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-right whitespace-nowrap hover:text-primary dark:hover:text-primary-light transition-colors">
                    {job.role}
                  </h2>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-[178px] md:left-[198px] top-6 w-3 h-3 rounded-full bg-primary dark:bg-primary-light z-10 border-2 border-gray-50 dark:border-gray-900" />

                {/* Card Content */}
                <div className="flex-1 pl-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="card hover-lift border border-gray-300 dark:border-gray-700/50 group"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      {job.logo && (
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="h-12 w-12 object-contain rounded"
                        />
                      )}
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                          {job.company}
                        </h3>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {job.startDateText} – {job.endDateText}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <FaMapMarkerAlt className="w-3 h-3" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        {job.description.split('\n').map((line, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                          >
                            {line.trim()}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
} 