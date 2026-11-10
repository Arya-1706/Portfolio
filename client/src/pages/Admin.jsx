
import { useState } from 'react';

import { useAuth } from '../context/AuthContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

import ProjectsAdmin from '../components/admin/ProjectsAdmin.jsx';
import MessagesAdmin from '../components/admin/MessagesAdmin.jsx';

const tabs = ['projects', 'messages'];

export default function Admin() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('projects');

  usePageTitle('Admin');

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-cream">
          Admin
        </h1>

        <button
          type="button"
          onClick={logout}
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-cream"
        >
          Log out
        </button>
      </div>

      <div
        role="tablist"
        className="mt-8 flex gap-6 border-b border-burgundy/40"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`pb-3 font-mono text-xs uppercase tracking-widest ${
              tab === t
                ? 'border-b-2 border-rose text-cream'
                : 'text-muted'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'projects'
          ? <ProjectsAdmin />
          : <MessagesAdmin />}
      </div>
    </div>
  );
}
