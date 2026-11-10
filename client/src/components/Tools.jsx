
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const groups = {
  Languages: ['JavaScript', 'Python', 'C++', 'SQL', 'HTML / CSS'],

  'Web stack': [
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'Tailwind CSS',
    'Flask',
  ],

  Workflow: ['Git & GitHub', 'VS Code', 'Linux (basics)'],

  Fundamentals: [
    'Data Structures & Algorithms',
    'OOP',
    'DBMS',
    'Operating Systems',
  ],
};

export default function Tools() {
  return (
    <section
      id="tools"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeading number="04" title="Tools">
        What I work with.
      </SectionHeading>

      <div className="grid gap-px overflow-hidden rounded-xl border border-burgundy/40 bg-burgundy/40 sm:grid-cols-2">
        {Object.entries(groups).map(([name, items]) => (
          <Reveal key={name} className="bg-base p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
              {name}
            </h3>

            <ul className="mt-5 space-y-2 text-ink/90">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
