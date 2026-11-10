
import SectionHeading from './SectionHeading.jsx';
import ProjectRow from './ProjectRow.jsx';

function ProjectSkeleton() {
  return (
    <div
      className="space-y-12"
      aria-busy="true"
      aria-label="Loading projects"
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className="grid animate-pulse gap-8 md:grid-cols-12"
        >
          <div className="aspect-[16/10] rounded-xl bg-surface md:col-span-7" />

          <div className="space-y-4 md:col-span-5">
            <div className="h-4 w-12 rounded bg-surface" />
            <div className="h-8 w-3/4 rounded bg-surface" />
            <div className="h-16 rounded bg-surface" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectsSection({
  projects = [],
  loading = false,
  error = null,
}) {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeading number="01" title="Selected work">
        Things I have built, and what each one taught me.
      </SectionHeading>

      {loading && <ProjectSkeleton />}

      {error && (
        <p role="alert" className="text-muted">
          Could not load projects. The server may be waking up,
          so please refresh in a few seconds.
        </p>
      )}

      {!loading &&
        !error &&
        projects.map((p, i) => (
          <ProjectRow key={p._id} project={p} index={i} />
        ))}
    </section>
  );
}
