import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import IconLink from '@/components/ui/IconLink';

export default function SocialLinks({
  github,
  linkedin,
  email,
  className = '',
}: {
  github: string;
  linkedin: string;
  email: string;
  className?: string;
}) {
  const items = [
    { href: github, label: 'GitHub', Icon: FaGithub },
    { href: linkedin, label: 'LinkedIn', Icon: FaLinkedin },
    { href: email ? `mailto:${email}` : '', label: 'Email', Icon: FaEnvelope },
  ].filter((item) => item.href);

  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <IconLink href={href} label={label} Icon={Icon} className="text-muted" />
        </li>
      ))}
    </ul>
  );
}
