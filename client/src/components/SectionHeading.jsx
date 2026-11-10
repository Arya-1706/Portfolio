export default function SectionHeading({
  number,
  title,
  children,
}) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
        {number} / {title}
      </p>

      {children && (
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-cream md:text-5xl">
          {children}
        </h2>
      )}
    </div>
  );
}