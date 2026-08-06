import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <p className="font-mono text-7xl font-bold text-accent md:text-8xl">
        404
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        This page doesn&apos;t exist
      </h1>
      <p className="max-w-md leading-relaxed text-muted">
        The page you&apos;re looking for was moved, removed, or never existed.
      </p>
      <Button href="/">Back home</Button>
    </main>
  );
}
