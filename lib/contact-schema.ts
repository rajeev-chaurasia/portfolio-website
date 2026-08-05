import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(200, 'Name must be at most 200 characters'),
  email: z
    .string()
    .trim()
    .max(254, 'Email is too long')
    .email('Invalid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be at most 5000 characters'),
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
