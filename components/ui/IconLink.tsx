import type { IconType } from 'react-icons';

export default function IconLink({
  href,
  label,
  Icon,
  className = '',
  iconClassName = 'h-5 w-5',
}: {
  href: string;
  label: string;
  Icon: IconType;
  className?: string;
  iconClassName?: string;
}) {
  const isMailto = href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMailto ? undefined : '_blank'}
      rel={isMailto ? undefined : 'noopener noreferrer'}
      aria-label={label}
      className={`transition-colors duration-200 hover:text-accent ${className}`}
    >
      <Icon aria-hidden="true" className={iconClassName} />
    </a>
  );
}
