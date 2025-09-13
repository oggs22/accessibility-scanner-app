interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className || ''}`.trim();

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;