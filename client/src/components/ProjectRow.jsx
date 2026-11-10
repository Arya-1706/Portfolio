
import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

const monoLink = 'text-cream underline-offset-4 hover:underline';

export default function ProjectRow({ project, index }) {
  const flip = index % 2 === 1;
  const image = project.images?.[0];

  const initials = project.title
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3);

  return (
    <Reveal>
      <article className="grid items-center gap-8 border-t border-burgundy/40 py-12 md:grid-cols-12 md:gap-12">
        <Link
          to={`/projects/${project.slug}`}
          className={`group block overflow-hidden rounded-xl bg-surface md:col-span-7 ${
            flip ? 'md:order-2' : ''
          }`}
        >
          {image ? (
            <img
              src={image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-burgundy/60 to-surface">
              <span className="font-display text-7xl text-cream/70">
                {initials}
              </span>
            </div>
          )}
        </Link>

        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
            {String(index + 1).padStart(2, '0')}
          </p>

          <h3 className="mt-3 font-display text-3xl text-cream md:text-4xl">
            {project.title}
          </h3>

          <p className="mt-4 text-muted">{project.summary}</p>

          <p className="mt-4 font-mono text-xs leading-relaxed text-ink/70">
            {project.techStack?.join(' / ')}
          </p>

          <div className="mt-6 flex gap-6 font-mono text-xs uppercase tracking-widest">
            <Link to={`/projects/${project.slug}`} className={monoLink}>
              Case study
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={monoLink}
              >
                GitHub
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={monoLink}
              >
                Live
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
