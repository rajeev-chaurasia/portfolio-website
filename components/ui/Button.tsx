const VARIANTS = {
  primary: 'bg-accent text-background hover:bg-accent/90',
  secondary: 'border border-accent/40 text-accent hover:bg-accent/10',
  ghost: 'text-muted hover:text-foreground',
} as const;

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
  href?: string;
  download?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  download,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${VARIANTS[variant]} ${className}`;

  if (href !== undefined) {
    return (
      <a href={href} download={download ? true : undefined} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
