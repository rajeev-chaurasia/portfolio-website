'use client';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { 
  FaCode, 
  FaTools,
  FaDatabase,
  FaCloud,
  FaLaptopCode,
  FaBrain,
  FaExchangeAlt,
  FaGraduationCap,
  FaPalette,
  FaJava,
  FaMapMarkerAlt,
  FaJira,
  FaRocket,
  FaSearch,
  FaRobot,
  FaTelegram,
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiReact, 
  SiDocker, 
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiCplusplus,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiSpring,
  SiNextdotjs,
  SiMysql,
  SiPostman,
  SiSwagger,
  SiApachekafka,
  SiIntellijidea,
  SiHibernate,
  SiFlask,
} from 'react-icons/si';

interface Skill {
  skill: string;
  category: string;
}

interface SkillsListProps {
  skills: Skill[];
}

// Enhanced skill icons mapping
const skillIcons: Record<string, any> = {
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Spring Boot': SiSpring,
  'Docker': SiDocker,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'Redis': SiRedis,
  'AWS': SiAmazon,
  'Google Cloud': SiGooglecloud,
  'Git': SiGit,
  'SQL': FaDatabase,
  'Java': FaJava,
  'Google Maps API': FaMapMarkerAlt,
  'JIRA': FaJira,
  'RabbitMQ': FaRocket,
  'React.js': SiReact,
  'C++': SiCplusplus,
  'ElasticSearch': FaSearch,
  'CrewAI': FaRobot,
  'Postman': SiPostman,
  'Swagger / OpenAPI': SiSwagger,
  'Kafka': SiApachekafka,
  'IntelliJ IDEA': SiIntellijidea,
  'Hibernate': SiHibernate,
  'Python (Flask)': SiFlask,
  'Telegram Bot API': FaTelegram,
  'Serper API': FaSearch,
};

const categoryIcons: Record<string, any> = {
  'Languages': FaLaptopCode,
  'Backend & Frameworks': FaCode,
  'Tools': FaTools,
  'Databases': FaDatabase,
  'Cloud & DevOps': FaCloud,
  'AI/ML & Agentic AI': FaBrain,
  'Messaging/Streams': FaExchangeAlt,
  'Core Concepts': FaGraduationCap,
  'Frontend': FaPalette
};

const categoryColors: Record<string, any> = {  
  'Languages': {
    bg: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    accent: 'bg-blue-500'
  },
  'Backend & Frameworks': {
    bg: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    accent: 'bg-emerald-500'
  },
  'Frontend': {
    bg: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-200 dark:border-pink-800',
    text: 'text-pink-700 dark:text-pink-300',
    accent: 'bg-pink-500'
  },
  'Tools & APIs': {
    bg: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    accent: 'bg-purple-500'
  },
  'Databases': {
    bg: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    accent: 'bg-orange-500'
  },
  'Cloud & DevOps': {
    bg: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-700 dark:text-cyan-300',
    accent: 'bg-cyan-500'
  },
  'AI/ML & Agentic AI': {
    bg: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-200 dark:border-violet-800',
    text: 'text-violet-700 dark:text-violet-300',
    accent: 'bg-violet-500'
  },
  'Messaging/Streams': {
    bg: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
    accent: 'bg-amber-500'
  },
  'Core Concepts': {
    bg: 'from-slate-500/20 to-gray-500/20',
    border: 'border-slate-200 dark:border-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    accent: 'bg-slate-500'
  }
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

  const getDefaultColors = () => ({
    bg: 'from-gray-500/20 to-slate-500/20',
    border: 'border-gray-200 dark:border-gray-700',
    text: 'text-gray-700 dark:text-gray-300',
    accent: 'bg-gray-500'
  });

  return (
    <PageLayout 
      title="Skills & Technologies" 
      description="My technical expertise and capabilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {Object.entries(groupedSkills).map(([category, items], idx) => {
            const Icon = categoryIcons[category] || FaTools;
            const colors = categoryColors[category] || getDefaultColors();
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.border} border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1`}>
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-xl ${colors.accent} text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`text-lg sm:text-xl font-bold ${colors.text}`}>
                          {category}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {items.length} {items.length === 1 ? 'skill' : 'skills'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((skill, i) => {
                        const SkillIcon = skillIcons[skill.skill];
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: (idx * 0.1) + (i * 0.05) }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-all duration-200"
                          >
                            {SkillIcon && (
                              <SkillIcon className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                            )}
                            <span className={`text-sm font-medium ${colors.text} leading-tight`}>
                              {skill.skill}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className={`w-full h-full rounded-bl-full ${colors.accent}`}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Always learning and exploring new technologies
            </span>
            <span className="text-lg">🚀</span>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
} 