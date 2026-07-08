const variants = {
  primary: 'bg-button text-sidebar-text hover:bg-button/90',
  success: 'bg-success text-sidebar-text hover:bg-success/90',
  warning: 'bg-warning text-sidebar-text hover:bg-warning/90',
  error: 'bg-error text-sidebar-text hover:bg-error/90',
  outline: 'bg-transparent border border-border-line text-text-body hover:bg-background/60',
  ghost: 'bg-transparent text-text-body hover:bg-background/60',
};

const Btn=({ children, variant = 'primary', className = '', as: As = 'button', ...props })=> {
  return (
    <As
      className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </As>
  );
}
export default Btn;