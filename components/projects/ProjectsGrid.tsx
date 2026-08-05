'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaStar } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import type { MergedProject } from '@/lib/github';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import IconLink from '@/components/ui/IconLink';

const INITIAL_GRID_COUNT = 4;

function ProjectCard({
  project,
  featured = false,
}: {
  project: MergedProject;
  featured?: boolean;
}) {
  return (
    <Card
      className={`flex h-full flex-col gap-4 ${
        featured ? 'border-accent/30 bg-gradient-to-br from-accent/[0.06] to-accent2/[0.06]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base leading-snug">
          <a
            href={project.demo ?? project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold text-foreground transition-colors hover:text-accent"
          >
            {project.name}
          </a>
        </h3>
        {featured && (
          <span className="shrink-0 rounded-full bg-accent2/10 px-2.5 py-0.5 font-mono text-xs text-accent2">
            Featured
          </span>
        )}
      </div>
      {project.description.length > 0 && (
        <ul className="space-y-2 text-sm leading-relaxed text-muted">
          {project.description
            .slice(0, featured ? 3 : 2)
            .map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
        </ul>
      )}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center gap-4 pt-1 text-subtle">
        {project.stars > 0 && (
          <span
            aria-label={`${project.stars} GitHub stars`}
            className="flex items-center gap-1.5 font-mono text-xs"
          >
            <FaStar aria-hidden="true" className="h-4 w-4" />
            {project.stars}
          </span>
        )}
        <IconLink
          href={project.github}
          label={`${project.name} on GitHub`}
          Icon={FaGithub}
        />
        {project.demo && (
          <IconLink
            href={project.demo}
            label={`${project.name} live demo`}
            Icon={FiExternalLink}
          />
        )}
      </div>
    </Card>
  );
}

export default function ProjectsGrid({
  projects,
}: {
  projects: MergedProject[];
}) {
  const reduceMotion = useReducedMotion();
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const visible = showAll ? rest : rest.slice(0, INITIAL_GRID_COUNT);
  const hiddenCount = rest.length - INITIAL_GRID_COUNT;

  return (
    <div>
      {featured.length > 0 && (
        <div className="mb-4 space-y-4">
          {featured.map((project) => (
            <ProjectCard
              key={project.github || project.name}
              project={project}
              featured
            />
          ))}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.github || project.name}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hiddenCount > 0 && (
        <motion.div
          layout={!reduceMotion}
          className="mt-8 flex justify-center"
        >
          <Button
            variant="secondary"
            type="button"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll
              ? 'Show fewer projects'
              : `Show all ${projects.length} projects`}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
