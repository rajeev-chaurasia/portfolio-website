'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { getAboutContent } from '@/lib/getAbout';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface NotionContent {
  title: string;
  content: string;
}

export default function About() {
  const [content, setContent] = useState<NotionContent>({
    title: 'About Me',
    content: [],
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getAboutContent();
        setContent(data as NotionContent);
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };
    fetchContent();
  }, []);

  const renderBlock = (block: BlockObjectResponse) => {
    switch (block.type) {
      case 'heading_1':
        return (
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {block.heading_1.rich_text[0]?.plain_text}
          </h1>
        );
      case 'heading_2':
        return (
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {block.heading_2.rich_text[0]?.plain_text}
          </h2>
        );
      case 'heading_3':
        return (
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-3">
            {block.heading_3.rich_text[0]?.plain_text}
          </h3>
        );
      case 'paragraph':
        return (
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {block.paragraph.rich_text.map((text, index) => (
              <span
                key={index}
                className={`
                  ${text.annotations.bold ? 'font-bold' : ''}
                  ${text.annotations.italic ? 'italic' : ''}
                  ${text.annotations.code ? 'font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded' : ''}
                `}
              >
                {text.plain_text}
              </span>
            ))}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout title={content.title} description="Learn more about my journey and expertise">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {content.content.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {renderBlock(block)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}
  