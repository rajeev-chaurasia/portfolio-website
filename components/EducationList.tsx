'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Education {
  institution: string;
  degree: string;
  location: string;
  startDateText: string;
  endDateText: string;
  grade: string;
  coursework: string[];
  logo: string;
}

interface EducationListProps {
  educationList: Education[];
}

export default function EducationList({ educationList }: EducationListProps) {
  return (
    <PageLayout 
      title="Education" 
      description="My academic journey and qualifications"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {educationList.map((edu, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="card hover-lift border border-gray-300 dark:border-gray-700/50"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex gap-4 items-center">
                  {edu.logo && (
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="h-12 w-12 object-contain rounded"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      {edu.degree}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {edu.institution}
                    </p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 flex flex-col items-end">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.startDateText} – {edu.endDateText}
                  </span>
                  {edu.location && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                {edu.grade && (
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Grade: {edu.grade}
                  </p>
                )}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.coursework.map((course, i) => (
                      <span
                        key={i}
                        className="bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light text-sm px-3 py-1 rounded-full"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
} 