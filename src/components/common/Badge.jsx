const toneMap = {
  neutral: 'bg-background text-text border-border-line',
  primary: 'bg-primary/10 text-primary border-primary/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  success: 'bg-success/10 text-success border-success/30',
  error: 'bg-error/10 text-error border-error/30',
};

const Badge = ({ children, tone = 'neutral' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wide ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}

export default Badge;