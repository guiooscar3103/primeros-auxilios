import PropTypes from 'prop-types'
import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft = null,
  iconRight: IconRight = null,
  onClick,
  disabled = false,
  fullWidth = false,
  ariaLabel,
  className = '',
  type = 'button',
}) {
  const classNames = [
    'hero-btn',
    `hero-btn--${variant}`,
    `hero-btn--${size}`,
    fullWidth ? 'hero-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {IconLeft && <span className="hero-btn__icon hero-btn__icon--left">{IconLeft}</span>}
      <span className="hero-btn__text">{children}</span>
      {IconRight && <span className="hero-btn__icon hero-btn__icon--right">{IconRight}</span>}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'ghost', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
}
