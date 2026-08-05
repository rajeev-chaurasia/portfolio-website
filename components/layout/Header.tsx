'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { SECTIONS, sectionIndex } from '@/lib/sections';
import useScrollSpy from '@/hooks/useScrollSpy';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Header({ resumeHref }: { resumeHref: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy();
  const reduceMotion = useReducedMotion();

  const panelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // rAF-throttled scroll listener for the backdrop treatment.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // While the mobile menu is open: lock body scroll, trap focus inside the
  // panel, close on Escape, and restore focus to the hamburger on close.
  useEffect(() => {
    if (!menuOpen) return;

    const hamburger = hamburgerRef.current;

    const getFocusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      );

    const raf = requestAnimationFrame(() => getFocusables()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = getFocusables();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      hamburger?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16">
      {/* Glass layer kept OFF the <header> itself: backdrop-filter on an
          ancestor would become the containing block for the fixed mobile
          panel below, breaking its viewport positioning. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b transition-colors duration-300 ${
          scrolled
            ? 'border-border bg-background/80 backdrop-blur'
            : 'border-transparent bg-transparent'
        }`}
      />
      <div className="relative mx-auto flex h-full max-w-content items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          aria-label="RRC — home"
          className="text-gradient font-display text-lg font-bold"
        >
          RRC
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-6">
              {SECTIONS.map(({ id, label }) => (
                <li key={id} className="relative">
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'true' : undefined}
                    className={`text-sm transition-colors duration-200 ${
                      active === id
                        ? 'text-accent'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-accent"
                    >
                      {sectionIndex(id)}.
                    </span>{' '}
                    {label}
                  </a>
                  {active === id && (
                    <motion.span
                      aria-hidden="true"
                      layoutId="nav-underline"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 400, damping: 32 }
                      }
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-gradient-to-r from-accent to-accent2"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="secondary" href={resumeHref} download className="px-4 py-2">
            Resume
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-foreground"
          >
            {menuOpen ? (
              <FiX aria-hidden="true" className="h-5 w-5" />
            ) : (
              <FiMenu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 md:hidden"
            />
            <motion.div
              key="panel"
              ref={panelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-xs flex-col border-l border-border bg-background px-8 py-6 md:hidden"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-foreground"
                >
                  <FiX aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <nav aria-label="Primary" className="mt-8 flex-1">
                <ul className="flex flex-col gap-6">
                  {SECTIONS.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={closeMenu}
                        aria-current={active === id ? 'true' : undefined}
                        className={`block text-2xl font-semibold tracking-tight transition-colors duration-200 ${
                          active === id
                            ? 'text-accent'
                            : 'text-foreground hover:text-accent'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="mr-3 font-mono text-sm font-normal text-accent"
                        >
                          {sectionIndex(id)}.
                        </span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button variant="secondary" href={resumeHref} download className="w-full">
                Resume
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
