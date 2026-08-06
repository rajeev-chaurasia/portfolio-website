import type { MergedProject } from '@/lib/github';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

export default function Projects({ projects }: { projects: MergedProject[] }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-16 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <SectionHeading
            index={sectionIndex('projects')}
            title="Projects"
            id="projects-heading"
          />
        </Reveal>
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
