export default function SectionHeading({
  index,
  title,
  id,
}: {
  index: string;
  title: string;
  id: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4 md:mb-12">
      <h2
        id={id}
        className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
      >
        <span
          aria-hidden="true"
          className="font-mono text-base font-normal text-accent md:text-lg"
        >
          {index}.
        </span>
        {title}
      </h2>
      <div aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
