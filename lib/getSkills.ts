import { notion } from './notion';

const databaseId = process.env.NOTION_SKILLS_DB_ID!;

export async function getSkills() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
  });

  // For each skill, extract the Skill name and the Category (as a single select value)
  const skills = response.results.map((page: any) => {
    const props = page.properties;
    return {
      skill: props.Skill?.title[0]?.plain_text || '',
      category: props.Category?.select?.name || 'Uncategorized',
    };
  });
  return skills;
}
