import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: 'flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-80',
    variants: {
      color: {
        primary: 'bg-brend-primary text-white',
        ghost: 'bg-transparent text-brend-grey',
        secundary: 'bg-brend-secundary text-brend-darkGrey',
        danger: 'bg-brend-danger text-white',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-4 text-sm',
        medium: 'px-6 py-3 text-sm',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:opacity-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  })
  return (
    <button
      className={button({ color, size, className, disabled: rest.disabled })}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'ghost', 'secundary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
}
export default Button
