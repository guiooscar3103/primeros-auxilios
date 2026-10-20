import PropTypes from 'prop-types'
import { Shield, BookOpen, Zap, PhoneCall, Award, FileText } from 'lucide-react'
import { EMERGENCY_NUMBER, SCREENS } from '../utils/constants'
import './Navbar.css'

export default function Navbar({
  currentScreen,
  onNavigate,
  starsCount = 0,
}) {
  return (
    <header className="hero-navbar">
      <div className="hero-navbar__container">
        {/* Logotipo / Marca principal */}
        <button
          type="button"
          className="hero-navbar__brand"
          onClick={() => onNavigate(SCREENS.HOME)}
          aria-label="Ir a la portada de Pequeños Héroes"
        >
          <div className="hero-navbar__logo-icon">
            <Shield size={24} className="logo-shield" />
          </div>
          <div className="hero-navbar__brand-text">
            <span className="hero-navbar__logo-text">Pequeños Héroes</span>
            <span className="hero-navbar__sub-tag">Primeros Auxilios Docentes</span>
          </div>
        </button>

        {/* Indicador de Emergencia 123 */}
        <div className="hero-navbar__emergency" title="Número de emergencias oficial en Colombia">
          <PhoneCall size={16} className="emergency-icon" />
          <span>Línea <strong>{EMERGENCY_NUMBER}</strong></span>
        </div>

        {/* Controles de navegación */}
        <nav className="hero-navbar__nav" aria-label="Navegación principal">
          <button
            type="button"
            className={`nav-link-btn nav-link-btn--urgent ${
              currentScreen === SCREENS.QUICK_REFERENCE ? 'nav-link-btn--active' : ''
            }`}
            onClick={() => onNavigate(SCREENS.QUICK_REFERENCE)}
          >
            <Zap size={17} />
            <span className="nav-link-text">Consulta Rápida</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${
              currentScreen === SCREENS.MAP || currentScreen === SCREENS.CASE_DETAIL
                ? 'nav-link-btn--active'
                : ''
            }`}
            onClick={() => onNavigate(SCREENS.MAP)}
          >
            <BookOpen size={17} />
            <span className="nav-link-text">Módulos</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${
              currentScreen === SCREENS.SOURCES ? 'nav-link-btn--active' : ''
            }`}
            onClick={() => onNavigate(SCREENS.SOURCES)}
          >
            <FileText size={17} />
            <span className="nav-link-text">Fuentes</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${
              currentScreen === SCREENS.ACHIEVEMENTS ? 'nav-link-btn--active' : ''
            }`}
            onClick={() => onNavigate(SCREENS.ACHIEVEMENTS)}
            title="Competencias docentes y progreso acumulado"
          >
            <Award size={17} />
            <span className="nav-link-text">Progreso ({starsCount} pts)</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  currentScreen: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  starsCount: PropTypes.number,
}
