'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <p
        aria-hidden="true"
        className="font-mono text-sm tracking-widest text-accent"
      >
        ERROR
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Something went wrong
      </h1>
      <p className="max-w-md leading-relaxed text-muted">
        An unexpected error occurred. Try again, or come back in a bit.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
