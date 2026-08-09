'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal as progressive enhancement: the server renders content
 * visible, and only elements still below the viewport at hydration time are
 * hidden and revealed on scroll. Content is never gated on JS. If a bundle
 * fails to load (flaky mobile networks, script blockers), everything simply
 * shows without the animation.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Anything already on screen stays visible; hiding it now would flash.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add('reveal-hidden');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.remove('reveal-hidden');
          observer.disconnect();
        }
      },
      { rootMargin: '-64px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
