import PropTypes from 'prop-types'
import {
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Clock,
  BookOpen,
  Eye,
  PlayCircle,
  ShieldAlert,
  Compass,
  FileText,
  AlertTriangle,
} from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import { EMERGENCY_NUMBER, getAssetUrl } from '../utils/constants'
import { SCHOOL_CASES } from '../data/schoolCases'
import './Home.css'

export default function Home({
  completedMissions = [],
  onContinueTraining,
  onSelectCase,
  onOpenQuickReference,
  onOpenSources,
}) {
  const totalCases = SCHOOL_CASES.length
  const completedCount = completedMissions.length
  const progressPercent = Math.round((completedCount / totalCases) * 100)

  // Determinar el caso activo actual (primer caso no completado o el primero si no hay)
  const activeCase =
    SCHOOL_CASES.find((c) => !completedMissions.includes(c.id)) || SCHOOL_CASES[0]
  const isAllCompleted = completedCount === totalCases

  return (
    <div className="home-page animate-fade-in">
      {/* 1. SECCIÓN DE BIENVENIDA Y ORIENTACIÓN DOCENTE */}
      <section className="welcome-section">
        <div className="welcome-card">
          <div className="welcome-text-col">
            <div className="welcome-meta-pill">
              <span className="platform-tag">Plataforma Docente</span>
              <span className="dot-divider">•</span>
              <span className="audience-tag">Educación Primaria</span>
            </div>

            <h1 className="welcome-title">
              Aprende a actuar con seguridad ante una emergencia escolar.
            </h1>

            <p className="welcome-subtitle">
              Capacitación paso a paso en primeros auxilios escolares. Aprende a tu propio ritmo
              o consulta qué hacer en segundos ante cualquier incidente en el colegio.
            </p>

            {/* Acción Principal Clara y Dominante */}
            <div className="welcome-action-group">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={20} />}
                onClick={onContinueTraining}
                className="main-cta-btn"
              >
                {completedCount === 0
                  ? 'Comenzar capacitación'
                  : isAllCompleted
                  ? 'Repasar capacitación completa'
                  : `Continuar capacitación: Caso ${activeCase.number}`}
              </Button>

              <button
                type="button"
                className="consult-inline-link"
                onClick={onOpenQuickReference}
              >
                <PhoneCall size={16} className="inline-icon" />
                <span>¿Urgencia en el aula? Ver consulta rápida (123)</span>
              </button>
            </div>

            {/* Resumen Discreto de Progreso Real */}
            <div className="welcome-progress-strip">
              <div className="progress-info-row">
                <span className="progress-status-text">
                  {completedCount === 0
                    ? 'Por comenzar • 5 casos disponibles'
                    : isAllCompleted
                    ? '¡Capacitación completada! 5 de 5 casos superados'
                    : `Has completado ${completedCount} de ${totalCases} casos de primeros auxilios`}
                </span>
                <span className="progress-percent-text">{progressPercent}%</span>
              </div>
              <ProgressBar value={progressPercent} max={100} color="primary" />
            </div>
          </div>

          {/* Imagen de Orientación con la Nutria Doc */}
          <div className="welcome-visual-col">
            <div className="mascot-guide-card">
              <img
                src={getAssetUrl('/images/personaje/nutria-hero-bienvenida.jpg')}
                alt="Nutria médica Doc, guía educativa de primeros auxilios escolares"
                className="mascot-guide-img"
                loading="eager"
              />
              <div className="mascot-guide-caption">
                <strong className="mascot-name">Doc la Nutria Médica</strong>
                <span className="mascot-role">Tu guía visual en cada procedimiento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RUTA DE APRENDIZAJE: 4 PASOS ESENCIALES (NÚCLEO DE LA CAPACITACIÓN) */}
      <section className="learning-route-section">
        <div className="section-heading-clean">
          <Badge variant="primary" icon={<Compass size={15} />}>
            Ruta de Capacitación Lineal
          </Badge>
          <h2 className="section-main-title">Cómo se aprende cada caso: 4 pasos clave</h2>
          <p className="section-sub-text">
            Cada módulo organiza la capacitación en una secuencia lógica para que sepas qué hacer sin dudar:
          </p>
        </div>

        <div className="linear-route-track">
          {/* Paso 1: APRENDE */}
          <div className="route-step-node">
            <div className="route-step-indicator">
              <div className="route-step-circle route-step-circle--1">
                <BookOpen size={20} />
              </div>
              <span className="step-tag-number">Paso 1</span>
            </div>
            <div className="route-step-details">
              <h3 className="route-step-title">Aprende</h3>
              <span className="route-step-subtitle">Reconocimiento Temprano</span>
              <p className="route-step-desc">
                Comprende la situación en el colegio y aprende a distinguir signos leves de emergencias de riesgo vital.
              </p>
            </div>
          </div>

          <div className="route-connector-line" aria-hidden="true" />

          {/* Paso 2: OBSERVA */}
          <div className="route-step-node">
            <div className="route-step-indicator">
              <div className="route-step-circle route-step-circle--2">
                <Eye size={20} />
              </div>
              <span className="step-tag-number">Paso 2</span>
            </div>
            <div className="route-step-details">
              <h3 className="route-step-title">Observa</h3>
              <span className="route-step-subtitle">Demostración Visual</span>
              <p className="route-step-desc">
                Revisa la técnica oficial y la postura correcta con las infografías de Doc y la animación guiada.
              </p>
            </div>
          </div>

          <div className="route-connector-line" aria-hidden="true" />

          {/* Paso 3: PRACTICA */}
          <div className="route-step-node">
            <div className="route-step-indicator">
              <div className="route-step-circle route-step-circle--3">
                <PlayCircle size={20} />
              </div>
              <span className="step-tag-number">Paso 3</span>
            </div>
            <div className="route-step-details">
              <h3 className="route-step-title">Practica</h3>
              <span className="route-step-subtitle">Simulación de Dilemas</span>
              <p className="route-step-desc">
                Resuelve situaciones reales en patio o comedor escolar y recibe retroalimentación formativa inmediata.
              </p>
            </div>
          </div>

          <div className="route-connector-line" aria-hidden="true" />

          {/* Paso 4: REPASA */}
          <div className="route-step-node">
            <div className="route-step-indicator">
              <div className="route-step-circle route-step-circle--4">
                <ShieldAlert size={20} />
              </div>
              <span className="step-tag-number">Paso 4</span>
            </div>
            <div className="route-step-details">
              <h3 className="route-step-title">Repasa</h3>
              <span className="route-step-subtitle">Señales de Alarma 123</span>
              <p className="route-step-desc">
                Ten claras las prohibiciones de seguridad (qué NO hacer) y las pautas para activar la Línea 123.
              </p>
            </div>
          </div>
        </div>

        {/* Acceso Directo al Caso Activo de la Ruta */}
        <div className="route-active-banner">
          <div className="active-banner-info">
            <span className="active-banner-label">
              {isAllCompleted ? 'Capacitación Completada' : 'Tu siguiente paso en la ruta:'}
            </span>
            <strong className="active-banner-title">
              Caso {activeCase.number}: {activeCase.title}
            </strong>
          </div>
          <Button
            variant="secondary"
            size="md"
            iconRight={<ArrowRight size={18} />}
            onClick={() => onSelectCase(activeCase)}
          >
            {isAllCompleted ? 'Revisar Caso' : 'Abrir este Módulo'}
          </Button>
        </div>
      </section>

      {/* 3. CASOS DE PRIMEROS AUXILIOS (CONSULTA O AVANCE ESPECÍFICO) */}
      <section className="school-cases-clean-section">
        <div className="section-heading-clean">
          <Badge variant="neutral" icon={<FileText size={15} />}>
            Casos de Primeros Auxilios
          </Badge>
          <h2 className="section-main-title">Situaciones escolares disponibles</h2>
          <p className="section-sub-text">
            Accede a cualquier caso directamente si necesitas consultar un procedimiento concreto o estudiar fuera de orden:
          </p>
        </div>

        <div className="cases-linear-list">
          {SCHOOL_CASES.map((schoolCase) => {
            const isCompleted = completedMissions.includes(schoolCase.id)
            const isCurrent = activeCase.id === schoolCase.id && !isAllCompleted

            return (
              <div
                key={schoolCase.id}
                className={`case-row-card ${isCurrent ? 'case-row-card--current' : ''} ${
                  isCompleted ? 'case-row-card--completed' : ''
                }`}
                onClick={() => onSelectCase(schoolCase)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectCase(schoolCase)}
              >
                {/* Miniatura Ilustrada */}
                <div className="case-row-thumb-wrap">
                  <img
                    src={getAssetUrl(schoolCase.images?.scene)}
                    alt={schoolCase.title}
                    className="case-row-thumb"
                    loading="lazy"
                  />
                  <span className="case-number-badge">#{schoolCase.number}</span>
                </div>

                {/* Información Central */}
                <div className="case-row-content">
                  <div className="case-row-meta">
                    <span className="case-category-tag">{schoolCase.category}</span>
                    <span className="dot-divider">•</span>
                    <span className="case-time-tag">
                      <Clock size={13} /> {schoolCase.estimatedMinutes} min
                    </span>
                  </div>

                  <h3 className="case-row-title">{schoolCase.title}</h3>
                  <p className="case-row-desc">{schoolCase.shortDescription}</p>
                </div>

                {/* Estado y Acción */}
                <div className="case-row-action-col">
                  {isCompleted ? (
                    <Badge variant="success" icon={<CheckCircle2 size={13} />}>
                      Completado
                    </Badge>
                  ) : isCurrent ? (
                    <Badge variant="primary" icon={<Clock size={13} />}>
                      Siguiente
                    </Badge>
                  ) : (
                    <Badge variant="neutral">Por comenzar</Badge>
                  )}

                  <span className="case-open-link">
                    Ver caso <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. BANNER PERMANENTE DE CONSULTA RÁPIDA (PARA URGENCIAS) */}
      <section className="emergency-direct-strip">
        <div className="emergency-strip-content">
          <div className="emergency-strip-icon-box">
            <PhoneCall size={26} />
          </div>
          <div className="emergency-strip-text">
            <h3 className="emergency-strip-title">
              ¿Necesitas actuar ante una emergencia ahora mismo?
            </h3>
            <p className="emergency-strip-desc">
              Si estás atendiendo a un estudiante en este momento, no necesitas completar la ruta de capacitación.
              Consulta directamente las fichas de actuación prioritaria y activa la Línea{' '}
              <strong>{EMERGENCY_NUMBER}</strong>.
            </p>
          </div>
        </div>
        <Button
          variant="danger"
          size="md"
          iconLeft={<AlertTriangle size={18} />}
          onClick={onOpenQuickReference}
          className="emergency-strip-btn"
        >
          Abrir Consulta Rápida ({EMERGENCY_NUMBER})
        </Button>
      </section>

      {/* 5. PIE INSTITUCIONAL DISCRETO */}
      <footer className="home-clean-footer">
        <p className="footer-sources-note">
          Protocolos alineados con directrices de la Cruz Roja, AHA, IADT y CDC Heads Up.
        </p>
        <button
          type="button"
          className="sources-link-btn"
          onClick={onOpenSources}
        >
          Consultar fuentes sanitarias oficiales y ficha técnica →
        </button>
      </footer>
    </div>
  )
}

Home.propTypes = {
  completedMissions: PropTypes.arrayOf(PropTypes.string),
  onContinueTraining: PropTypes.func.isRequired,
  onSelectCase: PropTypes.func.isRequired,
  onOpenQuickReference: PropTypes.func.isRequired,
  onOpenSources: PropTypes.func.isRequired,
}
