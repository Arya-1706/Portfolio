
import { useState } from 'react';
import api from '../../lib/api.js';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toList = (text, separator) =>
  text.split(separator).map((s) => s.trim()).filter(Boolean);

const toForm = (p) => ({
  title: p?.title ?? '',
  slug: p?.slug ?? '',
  summary: p?.summary ?? '',
  problem: p?.problem ?? '',
  approach: p?.approach ?? '',
  challenge: p?.challenge ?? '',
  highlights: (p?.highlights ?? []).join('\n'),
  techStack: (p?.techStack ?? []).join(', '),
  githubUrl: p?.githubUrl ?? '',
  liveUrl: p?.liveUrl ?? '',
  images: (p?.images ?? []).join('\n'),
  featured: p?.featured ?? false,
  order: p?.order ?? 0,
});

const inputClass =
  'mt-2 w-full rounded-lg border border-burgundy/60 bg-surface px-4 py-2.5 text-ink focus:border-cream focus:outline-none';

const textFields = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug', hint: 'lowercase, hyphens only' },
  { key: 'githubUrl', label: 'GitHub URL' },
  { key: 'liveUrl', label: 'Live URL' },
  { key: 'techStack', label: 'Tech stack', hint: 'comma separated' },
];

const areaFields = [
  { key: 'summary', label: 'Summary', rows: 2 },
  { key: 'problem', label: 'The problem', rows: 3 },
  { key: 'approach', label: 'What I built', rows: 4 },
  { key: 'challenge', label: 'The hardest part', rows: 3 },
  { key: 'highlights', label: 'Highlights', hint: 'one per line', rows: 4 },
  {
    key: 'images',
    label: 'Image URLs',
    hint: 'one per line, e.g. /projects/resume-1.webp',
    rows: 3,
  },
];

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </span>

      {hint && (
        <span className="ml-2 text-xs text-muted/70">
          {hint}
        </span>
      )}

      {children}
    </label>
  );
}

export default function ProjectForm({ project, onSaved, onCancel }) {
  const [v, setV] = useState(() => toForm(project));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value;

    setV((prev) => ({
      ...prev,
      [key]: value,
      ...(key === 'title' && !project
        ? { slug: slugify(value) }
        : {}),
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setBusy(true);
    setError('');

    const payload = {
      title: v.title,
      slug: v.slug,
      summary: v.summary,
      problem: v.problem,
      approach: v.approach,
      challenge: v.challenge,
      highlights: toList(v.highlights, /\n/),
      techStack: toList(v.techStack, ','),
      githubUrl: v.githubUrl,
      liveUrl: v.liveUrl,
      images: toList(v.images, /\n/),
      featured: v.featured,
      order: Number(v.order) || 0,
    };

    try {
      if (project?._id) {
        await api.put(`/projects/${project._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }

      onSaved();
    } catch (err) {
      const details = err.response?.data?.errors
        ?.map((x) => `${x.field}: ${x.message}`)
        .join('; ');

      setError(
        details ||
        err.response?.data?.message ||
        'Save failed'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-xl border border-burgundy/40 bg-surface/50 p-6"
    >
      <h2 className="font-display text-2xl text-cream">
        {project ? 'Edit project' : 'New project'}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {textFields.map((f) => (
          <Field key={f.key} label={f.label} hint={f.hint}>
            <input
              className={inputClass}
              value={v[f.key]}
              onChange={set(f.key)}
            />
          </Field>
        ))}
      </div>

      {areaFields.map((f) => (
        <Field key={f.key} label={f.label} hint={f.hint}>
          <textarea
            rows={f.rows}
            className={inputClass}
            value={v[f.key]}
            onChange={set(f.key)}
          />
        </Field>
      ))}

      <div className="flex flex-wrap items-center gap-8">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={v.featured}
            onChange={set('featured')}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm text-ink">
          Order
          <input
            type="number"
            className="w-20 rounded border border-burgundy/60 bg-surface px-2 py-1"
            value={v.order}
            onChange={set('order')}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-rose">
          {error}
        </p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-rose px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-cream hover:text-base disabled:opacity-60"
        >
          {busy ? 'Saving...' : 'Save'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-cream/40 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-cream"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
