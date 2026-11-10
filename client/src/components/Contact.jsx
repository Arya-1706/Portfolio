
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Enter a valid email'),
  body: z.string().trim().min(10, 'Message is too short'),
  website: z.string().optional().default(''),
});

const inputClass =
  'mt-2 w-full rounded-lg border border-burgundy/60 bg-surface px-4 py-3 text-ink placeholder:text-muted/60 focus:border-cream focus:outline-none';

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </span>

      {children}

      {error && (
        <span role="alert" className="mt-1 block text-sm text-rose">
          {error}
        </span>
      )}
    </label>
  );
}

export default function Contact() {
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    console.log('🔥 SUBMIT HANDLER TRIGGERED', data);
    setStatus({ type: 'idle', text: '' });

    try {
      const res = await api.post('/contact', data);

      console.log('✅ API RESPONSE:', res.data);

      setStatus({ type: 'success', text: res.data.message });
      reset();
    } catch (err) {
      console.error('❌ API ERROR:', err);
      setStatus({
        type: 'error',
        text:
          err.response?.data?.message ||
          'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24"
    >
      <SectionHeading number="05" title="Contact">
        Open to internships, collaborations and learning opportunities.
      </SectionHeading>

      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="font-display text-5xl leading-tight text-cream md:text-6xl">
            Let us build something.
          </p>

          <p className="mt-6 text-muted">
            Send a message and I will reply to the address you give me.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit,
                    (errors) => console.log('⚠️ VALIDATION FAILED:', errors)
                  )}
            noValidate
            className="relative space-y-6"
          >
            {/* Honeypot field for bots */}
            <div hidden>
              <input
                type="text"
                autoComplete="off"
                {...register('website')}
              />
            </div>

            <Field label="Name" error={errors.name?.message}>
              <input
                type="text"
                autoComplete="name"
                className={inputClass}
                {...register('name')}
              />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                autoComplete="email"
                className={inputClass}
                {...register('email')}
              />
            </Field>

            <Field label="Message" error={errors.body?.message}>
              <textarea
                rows={5}
                className={inputClass}
                {...register('body')}
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-rose px-8 py-3 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-cream hover:text-base disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>

            {status.text && (
              <p
                role={status.type === 'error' ? 'alert' : 'status'}
                className={
                  status.type === 'success' ? 'text-cream' : 'text-rose'
                }
              >
                {status.text}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
