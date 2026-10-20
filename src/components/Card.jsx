import PropTypes from 'prop-types'
import './Card.css'

export default function Card({
  children,
  className = '',
  interactive = false,
  borderVariant = 'default',
  onClick = null,
  as: Component = 'div',
}) {
  const classNames = [
    'hero-card',
    `hero-card--border-${borderVariant}`,
    interactive ? 'hero-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component
      className={classNames}
      onClick={onClick}
      role={interactive && onClick ? 'button' : undefined}
      tabIndex={interactive && onClick ? 0 : undefined}
      onKeyDown={
        interactive && onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick(e)
              }
            }
          : undefined
      }
    >
      {children}
    </Component>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  interactive: PropTypes.bool,
  borderVariant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
  onClick: PropTypes.func,
  as: PropTypes.elementType,
}
