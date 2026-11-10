
import { useCallback, useEffect, useState } from 'react';
import api from '../../lib/api.js';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data);
      setError('');
    } catch {
      setError('Could not load messages');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`);
      load();
    } catch {
      setError('Could not update message');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;

    try {
      await api.delete(`/messages/${id}`);
      load();
    } catch {
      setError('Could not delete message');
    }
  };

  if (error) {
    return (
      <p role="alert" className="text-sm text-rose">
        {error}
      </p>
    );
  }

  if (messages.length === 0) {
    return <p className="text-muted">No messages yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li
          key={m._id}
          className="rounded-xl border border-burgundy/40 bg-surface/50 p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-cream">
              {!m.read && (
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full bg-rose"
                  aria-label="Unread"
                />
              )}
              {m.name}
            </p>

            <p className="font-mono text-xs text-muted">
              {new Date(m.createdAt).toLocaleString()}
            </p>
          </div>

          <a
            href={`mailto:${m.email}`}
            className="font-mono text-xs text-cream hover:underline"
          >
            {m.email}
          </a>

          <p className="mt-3 whitespace-pre-wrap text-ink/90">
            {m.body}
          </p>

          <div className="mt-4 flex gap-4 font-mono text-xs uppercase tracking-widest">
            {!m.read && (
              <button
                type="button"
                onClick={() => markRead(m._id)}
                className="text-cream hover:underline"
              >
                Mark read
              </button>
            )}

            <button
              type="button"
              onClick={() => remove(m._id)}
              className="text-rose hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
