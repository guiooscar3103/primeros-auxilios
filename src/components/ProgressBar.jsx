import PropTypes from 'prop-types'
import './ProgressBar.css'

export default function ProgressBar({
  value = 0,
  max = 100,
  label = '',
  showPercent = false,
  color = 'primary',
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100)

  return (
    <div className="hero-progress">
      {(label || showPercent) && (
        <div className="hero-progress__labels">
          {label && <span className="hero-progress__text">{label}</span>}
          {showPercent && <span className="hero-progress__percent">{percentage}%</span>}
        </div>
      )}
      <div
        className="hero-progress__track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progreso'}
      >
        <div
          className={`hero-progress__bar hero-progress__bar--${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  label: PropTypes.string,
  showPercent: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
}
