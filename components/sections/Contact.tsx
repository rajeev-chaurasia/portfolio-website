import type { Site } from '@/lib/keystatic';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/motion/Reveal';
import Aurora from '@/components/visual/Aurora';

export default function Contact({ site }: { site: Site }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-28"
    >
      <Aurora variant="soft" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-10">
        <SectionHeading
          index={sectionIndex('contact')}
          title="Contact"
          id="contact-heading"
        />
        <Reveal>
          <div className="relative mx-auto max-w-xl text-center">
            <p className="mb-8 text-muted">
              I&apos;m currently open to new opportunities. Whether you have a
              question, a role in mind, or just want to say hi, my inbox is
              always open.
            </p>
            <ContactForm />
            {site.email && (
              <p className="mt-10 text-sm text-subtle">
                Prefer email?{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent underline decoration-1 underline-offset-2 transition-colors duration-200 hover:text-foreground"
                >
                  {site.email}
                </a>
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
