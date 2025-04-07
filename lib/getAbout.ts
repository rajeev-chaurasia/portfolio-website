import { notion } from './notion';

const databaseId = process.env.NOTION_ABOUT_DB_ID;

export async function getAboutContent() {
  
  try {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'Published',
          checkbox: { equals: true },
        }
      });

    if (!response.results.length) {
      return {
        title: 'About Me',
        content: [],
      };
    }

    const page = response.results[0];
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
    });

    return {
      title: (page as any).properties?.Name?.title?.[0]?.plain_text || 'About Me',
      content: blocks.results,
    };
  } catch (error) {
    console.error('Error fetching Notion content:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    return {
      title: 'About Me',
      content: [],
    };
  }
} 