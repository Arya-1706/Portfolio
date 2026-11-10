
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

const inputClass =
  'mt-2 w-full rounded-lg border border-burgundy/60 bg-surface px-4 py-3 text-ink focus:border-cream focus:outline-none';

export default function Login() {
  const { login, isAuthed } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  usePageTitle('Admin login');

  useEffect(() => {
    if (isAuthed) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthed, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setBusy(true);
    setError('');

    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-6 pb-24 pt-40">
      <h1 className="font-display text-4xl text-cream">
        Admin
      </h1>

      <p className="mt-3 text-sm text-muted">
        Sign in to manage your portfolio.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Email
          </span>

          <input
            type="email"
            autoComplete="username"
            className={inputClass}
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </label>

        <label className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Password
          </span>

          <input
            type="password"
            autoComplete="current-password"
            className={inputClass}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-rose">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-rose px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-cream hover:text-base disabled:opacity-60"
        >
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
