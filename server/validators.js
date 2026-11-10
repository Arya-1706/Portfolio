
import { z } from 'zod';

const str = z.string().trim();
const list = z.array(str.min(1));

export const contactSchema = z.object({
  name: str.min(2, 'Please enter your name').max(80),
  email: str.email('Enter a valid email').max(120),
  body: str.min(10, 'Message is too short').max(2000),
  website: z.string().max(0).optional(),
});

export const loginSchema = z.object({
  email: str.email(),
  password: z.string().min(1),
});

export const projectSchema = z.object({
  title: str.min(1),
  slug: str.toLowerCase().regex(
    /^[a-z0-9-]+$/,
    'Use lowercase letters, numbers and hyphens'
  ),
  summary: str.min(1),
  problem: str.optional(),
  approach: str.optional(),
  challenge: str.optional(),
  highlights: list.optional(),
  techStack: list.optional(),
  githubUrl: str.optional(),
  liveUrl: str.optional(),
  images: list.optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});
