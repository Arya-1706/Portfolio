
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const steps = [
  ['01', 'Understand', 'Understand the problem, requirements, and who will use the solution.'],
  ['02', 'Plan', 'Break the problem into smaller components and define how they interact.'],
  ['03', 'Build', 'Implement, test, debug, and improve the solution incrementally.'],
  ['04', 'Explain', 'Document decisions and make the code easier to understand.'],
  ['05', 'Review', 'Reflect on what worked and identify what can be improved.'],
];

export default function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeading number="03" title="Process">
        How I approach a project.
      </SectionHeading>

      <ol className="border-t border-burgundy/40">
        {steps.map(([num, title, text], i) => (
            <li key={num} className="border-b border-burgundy/40 py-6">
              <Reveal delay={i * 0.05}>
              <div className="grid items-baseline gap-2 md:grid-cols-12">
                <span className="font-mono text-sm text-rose md:col-span-1">
                  {num}
                </span>

                <h3 className="font-display text-2xl text-cream md:col-span-4">
                  {title}
                </h3>

                <p className="text-muted md:col-span-7">{text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
