
import { useCallback, useEffect, useState } from 'react';

import api from '../../lib/api.js';
import ProjectForm from './ProjectForm.jsx';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
      setError('');
    } catch {
      setError('Could not load projects');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (project) => {
    if (!window.confirm(`Delete ${project.title}?`)) return;

    try {
      await api.delete(`/projects/${project._id}`);
      load();
    } catch {
      setError('Delete failed');
    }
  };

  const saved = () => {
    setEditing(null);
    load();
  };

  if (editing) {
    return (
      <ProjectForm
        project={editing === 'new' ? null : editing}
        onSaved={saved}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setEditing('new')}
        className="rounded-full bg-rose px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-cream hover:text-base"
      >
        New project
      </button>

      {error && (
        <p role="alert" className="mt-4 text-sm text-rose">
          {error}
        </p>
      )}

      <ul className="mt-6 divide-y divide-burgundy/40 border-y border-burgundy/40">
        {projects.map((p) => (
          <li
            key={p._id}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="text-cream">{p.title}</p>

              <p className="font-mono text-xs text-muted">
                /{p.slug} / order {p.order}
              </p>
            </div>

            <div className="flex gap-4 font-mono text-xs uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setEditing(p)}
                className="text-cream hover:underline"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => remove(p)}
                className="text-rose hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
