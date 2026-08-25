import {
  getSite,
  getExperience,
  getEducation,
  getSkills,
  getContributions,
  getCredentials,
} from '@/lib/keystatic';
import { getProjects } from '@/lib/github';
import { buildProfileJsonLd } from '@/lib/jsonld';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import OpenSource from '@/components/sections/OpenSource';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

export default async function Home() {
  const [site, experience, education, skills, projects, contributions, credentials] =
    await Promise.all([
      getSite(),
      getExperience(),
      getEducation(),
      getSkills(),
      getProjects(),
      getContributions(),
      getCredentials(),
    ]);

  const jsonLd = buildProfileJsonLd(site, education, experience, skills, credentials);

  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero site={site} />
      <About site={site} />
      <Experience items={experience} />
      <OpenSource items={contributions} />
      <Projects projects={projects} />
      <Skills groups={skills} />
      <Education items={education} credentials={credentials} />
      <Contact site={site} />
    </main>
  );
}
