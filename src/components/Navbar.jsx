import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Shield,
  BookOpen,
  PhoneCall,
  CheckCircle2,
  FileText,
  Menu,
  X,
  Home as HomeIcon,
} from 'lucide-react'
import { EMERGENCY_NUMBER, SCREENS } from '../utils/constants'
import './Navbar.css'

export default function Navbar({
  currentScreen,
  onNavigate,
  completedCount = 0,
  totalCases = 5,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = (screen) => {
    onNavigate(screen)
    setMobileMenuOpen(false)
  }

  return (
    <header className="hero-navbar">
      <div className="hero-navbar__container">
        {/* Logotipo / Marca principal */}
        <button
          type="button"
          className="hero-navbar__brand"
          onClick={() => handleLinkClick(SCREENS.HOME)}
          aria-label="Ir al inicio de Pequeños Héroes"
        >
          <div className="hero-navbar__logo-icon">
            <Shield size={22} className="logo-shield" />
          </div>
          <div className="hero-navbar__brand-text">
            <span className="hero-navbar__logo-text">Pequeños Héroes</span>
            <span className="hero-navbar__sub-tag">Primeros auxilios escolares</span>
          </div>
        </button>

        {/* Acceso Directo de Emergencia (Siempre Visible) */}
        <button
          type="button"
          className={`navbar-urgent-btn ${
            currentScreen === SCREENS.QUICK_REFERENCE ? 'navbar-urgent-btn--active' : ''
          }`}
          onClick={() => handleLinkClick(SCREENS.QUICK_REFERENCE)}
          title="Consulta rápida de primeros auxilios y Línea 123"
        >
          <PhoneCall size={16} className="urgent-btn-icon" />
          <span className="urgent-btn-text">Consulta rápida ({EMERGENCY_NUMBER})</span>
        </button>

        {/* Navegación Principal de Escritorio */}
        <nav className="hero-navbar__nav" aria-label="Navegación principal">
          <button
            type="button"
            className={`nav-link-btn ${
              currentScreen === SCREENS.HOME ? 'nav-link-btn--active' : ''
            }`}
            onClick={() => handleLinkClick(SCREENS.HOME)}
          >
            <HomeIcon size={16} />
            <span>Inicio</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${
              currentScreen === SCREENS.MAP || currentScreen === SCREENS.CASE_DETAIL
                ? 'nav-link-btn--active'
                : ''
            }`}
            onClick={() => handleLinkClick(SCREENS.MAP)}
          >
            <BookOpen size={16} />
            <span>Capacitación</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${
              currentScreen === SCREENS.SOURCES ? 'nav-link-btn--active' : ''
            }`}
            onClick={() => handleLinkClick(SCREENS.SOURCES)}
          >
            <FileText size={16} />
            <span>Fuentes</span>
          </button>

          {/* Resumen Discreto de Progreso Real */}
          <div
            className="hero-navbar__progress-badge"
            title={`Has completado ${completedCount} de ${totalCases} casos`}
          >
            <CheckCircle2 size={14} className="progress-badge-icon" />
            <span>
              {completedCount}/{totalCases}
            </span>
          </div>
        </nav>

        {/* Botón de Menú Móvil */}
        <button
          type="button"
          className="hero-navbar__toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="hero-navbar__mobile-drawer animate-fade-in">
          <button
            type="button"
            className={`mobile-nav-item ${
              currentScreen === SCREENS.HOME ? 'mobile-nav-item--active' : ''
            }`}
            onClick={() => handleLinkClick(SCREENS.HOME)}
          >
            <HomeIcon size={18} />
            <span>Inicio</span>
          </button>

          <button
            type="button"
            className={`mobile-nav-item ${
              currentScreen === SCREENS.MAP || currentScreen === SCREENS.CASE_DETAIL
                ? 'mobile-nav-item--active'
                : ''
            }`}
            onClick={() => handleLinkClick(SCREENS.MAP)}
          >
            <BookOpen size={18} />
            <span>Ruta de Capacitación</span>
          </button>

          <button
            type="button"
            className={`mobile-nav-item mobile-nav-item--urgent ${
              currentScreen === SCREENS.QUICK_REFERENCE ? 'mobile-nav-item--active' : ''
            }`}
            onClick={() => handleLinkClick(SCREENS.QUICK_REFERENCE)}
          >
            <PhoneCall size={18} />
            <span>Consulta Rápida (Línea {EMERGENCY_NUMBER})</span>
          </button>

          <button
            type="button"
            className={`mobile-nav-item ${
              currentScreen === SCREENS.SOURCES ? 'mobile-nav-item--active' : ''
            }`}
            onClick={() => handleLinkClick(SCREENS.SOURCES)}
          >
            <FileText size={18} />
            <span>Fuentes Sanitarias Oficiales</span>
          </button>

          <div className="mobile-progress-row">
            <CheckCircle2 size={16} />
            <span>
              Progreso docente: {completedCount} de {totalCases} casos completados
            </span>
          </div>
        </div>
      )}
    </header>
  )
}

Navbar.propTypes = {
  currentScreen: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  completedCount: PropTypes.number,
  totalCases: PropTypes.number,
}
