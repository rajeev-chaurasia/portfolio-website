'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/contact-schema';
import Button from '@/components/ui/Button';

const inputClasses =
  'w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function ContactForm() {
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          website: data.website ?? '',
        }),
      });
      if (res.ok) {
        setStatus({ type: 'success', text: 'Message sent successfully!' });
        reset();
      } else {
        const body = await res.json().catch(() => null);
        setStatus({
          type: 'error',
          text:
            body?.error ?? 'Failed to send message. Please try again later.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="block text-left text-sm text-muted">
          Name
        </label>
        <input
          id="contact-name"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={errors.name ? true : undefined}
          className={inputClasses}
          {...register('name')}
        />
        {errors.name && (
          <p role="alert" className="text-left text-sm text-accent">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="block text-left text-sm text-muted">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="your.email@example.com"
          aria-invalid={errors.email ? true : undefined}
          className={inputClasses}
          {...register('email')}
        />
        {errors.email && (
          <p role="alert" className="text-left text-sm text-accent">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-left text-sm text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Your message here..."
          aria-invalid={errors.message ? true : undefined}
          className={inputClasses}
          {...register('message')}
        />
        {errors.message && (
          <p role="alert" className="text-left text-sm text-accent">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: visually hidden anti-bot trap. Real users never fill this. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>

      {status && (
        <p
          role="status"
          className={`text-sm ${
            status.type === 'success' ? 'text-accent' : 'text-muted'
          }`}
        >
          {status.text}
        </p>
      )}
    </form>
  );
}
