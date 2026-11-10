
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../lib/api.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Footer from '../components/Footer.jsx';

function Block({ label, children }) {
  if (!children) return null;

  return (
    <section className="mt-12">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
        {label}
      </h2>

      <p className="mt-3 text-lg leading-relaxed text-ink/90">
        {children}
      </p>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    setState('loading');

    api
      .get(`/projects/${slug}`)
      .then((res) => {
        setProject(res.data);
        setState('ready');
      })
      .catch((err) => {
        setState(
          err.response?.status === 404 ? 'notfound' : 'error'
        );
      });
  }, [slug]);

  usePageTitle(project?.title);

  if (state !== 'ready') {
    const text = {
      loading: 'Loading...',
      notfound: 'That project does not exist.',
      error: 'Could not load this project. Please try again in a moment.',
    }[state];

    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-muted">
        <p>{text}</p>

        <Link
          to="/"
          className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-cream"
        >
          Back home
        </Link>
      </div>
    );
  }

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <Link
          to="/#projects"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-cream"
        >
          &larr; All projects
        </Link>

        <h1 className="mt-8 font-display text-5xl leading-tight text-cream md:text-6xl">
          {project.title}
        </h1>

        <p className="mt-6 text-xl text-muted">
          {project.summary}
        </p>

        <p className="mt-6 font-mono text-xs leading-relaxed text-ink/70">
          {project.techStack?.join(' / ')}
        </p>

        <div className="mt-6 flex gap-6 font-mono text-xs uppercase tracking-widest">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cream hover:underline"
            >
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cream hover:underline"
            >
              Live
            </a>
          )}
        </div>

        {project.images?.length > 0 && (
          <div className="mt-12 space-y-6">
            {project.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
                className="w-full rounded-xl"
              />
            ))}
          </div>
        )}

        <Block label="The problem">{project.problem}</Block>
        <Block label="What I built">{project.approach}</Block>
        <Block label="The hardest part">{project.challenge}</Block>

        {project.highlights?.length > 0 && (
          <section className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-rose">
              Highlights
            </h2>

            <ul className="mt-4 space-y-3 text-lg text-ink/90">
              {project.highlights.map((h) => (
                <li key={h} className="border-l border-rose pl-4">
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <Footer />
    </>
  );
}
