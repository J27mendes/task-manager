const Button = ({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-brend-primary text-white'
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-brend-grey'
    }

    if (variant === 'secundary') {
      return 'bg-brend-secundary text-brend-darkGrey'
    }
  }

  const getSizeClasses = () => {
    if (size === 'small') {
      return 'py-1 text-xs'
    }

    if (size === 'large') {
      return 'py-4 text-sm'
    }
  }
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-80 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
export default Button
