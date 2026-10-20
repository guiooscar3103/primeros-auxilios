import PropTypes from 'prop-types'
import './Badge.css'

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon = null,
  className = '',
}) {
  return (
    <span className={`hero-badge hero-badge--${variant} hero-badge--${size} ${className}`}>
      {Icon && <span className="hero-badge__icon">{Icon}</span>}
      <span className="hero-badge__text">{children}</span>
    </span>
  )
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'neutral']),
  size: PropTypes.oneOf(['sm', 'md']),
  icon: PropTypes.node,
  className: PropTypes.string,
}
