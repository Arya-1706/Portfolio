
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function Fact({ label, value }) {
  return (
    <div className="flex justify-between gap-6 py-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-cream">{value}</dd>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeading number="02" title="About">
        A little about me and how I think.
      </SectionHeading>

      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="space-y-5 text-lg leading-relaxed text-ink/90 md:col-span-7">
          <p>
            I enjoy exploring how software works and turning ideas
            into practical applications. My interest in programming
            grew through building projects and solving real problems.
          </p>

          <p>
            I particularly enjoy full-stack development, backend
            engineering, and experimenting with AI-powered applications.
            I like understanding the architecture behind a system,
            not just writing code that works.
          </p>

          <p>
            Currently, I'm strengthening my data structures and
            algorithms, improving my development skills, and
            exploring how intelligent systems can solve practical problems.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5">
          <dl className="divide-y divide-burgundy/40 border-y border-burgundy/40 font-mono text-sm">
            <Fact label="Studying" value="B.Tech CS & Business Systems" />
            <Fact label="College" value="IET-DAVV, Indore" />
            <Fact label="Interested in" value="AI, Backend, Full-Stack" />
            <Fact label="Practicing" value="DSA, C++, Web Development" />
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
