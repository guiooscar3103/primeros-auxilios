import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Clock,
  BookOpen,
  FileText,
  ShieldAlert,
  PlayCircle,
  Eye,
  Activity,
  Compass,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import QuickActionCard from '../components/QuickActionCard'
import NutriaGuideAnimation from '../components/NutriaGuideAnimation'
import ZoomableImage from '../components/ZoomableImage'
import { getAssetUrl } from '../utils/constants'
import './CaseDetailView.css'

export default function CaseDetailView({
  caseData,
  isCompleted = false,
  nextCase = null,
  onStartSimulation,
  onGoToNextCase,
  onBack,
  onNavigateToSources,
}) {
  const [activeTab, setActiveTab] = useState('protocolo') // 'protocolo' | 'ficha'

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (tab === 'protocolo') {
      const stepElement = document.getElementById('paso-1-aprende')
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  if (!caseData) return null

  const {
    title,
    number,
    category,
    estimatedMinutes,
    lastReviewed,
    clinicalDisclaimer,
    contextoEscolar,
    reconocimiento,
    actuacion,
    senalesAlarma,
    queNoHacer,
    sources,
  } = caseData

  return (
    <div className="case-detail-page animate-fade-in">
      {/* Barra de Navegación Superior del Caso */}
      <nav className="case-nav-bar">
        <Button variant="ghost" size="sm" iconLeft={<ArrowLeft size={16} />} onClick={onBack}>
          Volver al Inicio
        </Button>
        <div className="case-nav-bar__meta">
          <span className="case-step-pill">Caso {number || '1'} de 5</span>
          <Badge variant="primary" size="sm">
            {category}
          </Badge>
          <span className="case-read-time">
            <Clock size={14} /> {estimatedMinutes} min
          </span>
        </div>
      </nav>

      {/* Encabezado del Caso */}
      <header className="case-hero">
        <div className="case-hero__content">
          <span className="case-hero__lead-tag">Módulo de capacitación docente</span>
          <h1 className="case-hero__title">{title}</h1>
          <p className="case-hero__description">{caseData.shortDescription}</p>
        </div>

        {/* Selector de Pestañas de Vista: Protocolo Guiado vs Ficha Rápida */}
        <div className="case-tabs-container">
          <span className="case-tabs-label">Vista del caso:</span>
          <div className="case-tabs" role="tablist" aria-label="Modo de visualización del caso">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'protocolo'}
              className={`case-tab-btn ${activeTab === 'protocolo' ? 'case-tab-btn--active' : ''}`}
              onClick={() => handleTabClick('protocolo')}
            >
              <BookOpen size={16} /> Capacitación guiada (4 pasos)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'ficha'}
              className={`case-tab-btn ${activeTab === 'ficha' ? 'case-tab-btn--active' : ''}`}
              onClick={() => handleTabClick('ficha')}
            >
              <FileText size={16} /> Ficha resumen de urgencia
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO 1: FICHA RÁPIDA CONDENSADA */}
      {activeTab === 'ficha' && (
        <section className="case-quick-tab animate-fade-in">
          <QuickActionCard caseData={caseData} onOpenFullCase={() => handleTabClick('protocolo')} />
          <div className="quick-tab-action">
            <Button
              variant="primary"
              size="md"
              iconRight={<PlayCircle size={18} />}
              onClick={onStartSimulation}
            >
              Practicar con la simulación escolar
            </Button>
          </div>
        </section>
      )}

      {/* CONTENIDO 2: PROTOCOLO PEDAGÓGICO COMPLETO ORGANIZADO EN 4 PASOS LINEALES */}
      {activeTab === 'protocolo' && (
        <div className="case-sections-container animate-fade-in">
          {/* Barra de Progreso Lineal de 4 Pasos */}
          <div className="case-steps-quick-nav">
            <a href="#paso-1-aprende" className="step-nav-chip">
              <span className="step-chip-num">1</span>
              <span>Aprende</span>
            </a>
            <span className="step-chip-arrow">→</span>
            <a href="#paso-2-observa" className="step-nav-chip">
              <span className="step-chip-num">2</span>
              <span>Observa</span>
            </a>
            <span className="step-chip-arrow">→</span>
            <a href="#paso-3-practica" className="step-nav-chip">
              <span className="step-chip-num">3</span>
              <span>Practica</span>
            </a>
            <span className="step-chip-arrow">→</span>
            <a href="#paso-4-repasa" className="step-nav-chip">
              <span className="step-chip-num">4</span>
              <span>Repasa</span>
            </a>
          </div>

          {/* PASO 1: APRENDE (ESCENA EN EL COLEGIO Y RECONOCIMIENTO TEMPRANO) */}
          <section className="pedagogical-section" id="paso-1-aprende">
            <div className="section-label">
              <Badge variant="primary" size="sm">
                Paso 1: Aprende • Escena y reconocimiento temprano
              </Badge>
            </div>

            {/* Galería Visual de 2 Fotos: Escena Escolar 🆚 Maniobra Oficial */}
            <div className="case-photos-split-grid">
              {caseData.images?.scene && (
                <Card className="photo-card" borderVariant="primary">
                  <div className="photo-card__badge-row">
                    <span className="photo-pill photo-pill--scene">📸 Escena en el colegio</span>
                    <span className="photo-meta-tag">{contextoEscolar.location}</span>
                  </div>
                  <div className="scenario-image-wrap">
                    <ZoomableImage
                      src={getAssetUrl(caseData.images.scene)}
                      alt={caseData.images.sceneAlt || caseData.title}
                      className="scenario-img"
                      caption={caseData.images.sceneAlt}
                    />
                  </div>
                  <div className="photo-card__caption">
                    <div className="photo-card__student-row">
                      <strong>Estudiante afectado:</strong> {contextoEscolar.studentName}
                    </div>
                    <p className="scenario-narrative-short">{contextoEscolar.scenario}</p>
                    <div className="scenario-focus-pill">
                      <Eye size={15} className="focus-icon" />
                      <span>
                        <strong>Observación prioritaria:</strong> {contextoEscolar.initialObservation}
                      </span>
                    </div>
                  </div>
                </Card>
              )}

              {caseData.images?.action && (
                <Card className="photo-card photo-card--action" borderVariant="danger">
                  <div className="photo-card__badge-row">
                    <span className="photo-pill photo-pill--action">⚡ Maniobra oficial recomendada</span>
                    <span className="photo-meta-tag">Protocolo vital</span>
                  </div>
                  <div className="scenario-image-wrap">
                    <ZoomableImage
                      src={getAssetUrl(caseData.images.action)}
                      alt={caseData.images.actionAlt || caseData.title}
                      className="clinical-action-img"
                      caption={caseData.images.actionAlt}
                    />
                  </div>
                  <div className="photo-card__caption">
                    <div className="photo-card__student-row">
                      <strong>Técnica de primeros auxilios:</strong>
                    </div>
                    <p className="clinical-action-short">{caseData.images.actionAlt}</p>
                    <div className="scenario-focus-pill scenario-focus-pill--action">
                      <Activity size={15} className="focus-icon" />
                      <span>
                        <strong>Objetivo:</strong> Respuesta inmediata sin pérdida de tiempo.
                      </span>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Clasificación Diagnóstica: Leve vs Grave */}
            <div className="recognition-box-wrap">
              <h3 className="sub-section-title">Reconocimiento temprano: ¿cuándo es leve o grave?</h3>
              <p className="section-intro-text">{reconocimiento.description}</p>

              <div className="recognition-grid">
                {/* Leve */}
                <Card className="recognition-col recognition-col--mild" borderVariant="success">
                  <div className="recognition-header">
                    <CheckCircle2 size={20} className="rec-icon rec-icon--mild" />
                    <h4 className="recognition-title">{reconocimiento.mild.title}</h4>
                  </div>
                  <ul className="signs-list">
                    {reconocimiento.mild.signs.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                  <div className="recognition-action-summary mild">
                    <strong>Conducta:</strong> {reconocimiento.mild.actionSummary}
                  </div>
                </Card>

                {/* Grave */}
                <Card className="recognition-col recognition-col--severe" borderVariant="danger">
                  <div className="recognition-header">
                    <AlertTriangle size={20} className="rec-icon rec-icon--severe" />
                    <h4 className="recognition-title">{reconocimiento.severe.title}</h4>
                  </div>
                  <ul className="signs-list">
                    {reconocimiento.severe.signs.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                  <div className="recognition-action-summary severe">
                    <strong>Conducta:</strong> {reconocimiento.severe.actionSummary}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* PASO 2: OBSERVA (DEMOSTRACIÓN DE LA NUTRIA DOC Y PASOS OFICIALES) */}
          <section className="pedagogical-section" id="paso-2-observa">
            <div className="section-label">
              <Badge variant="primary" size="sm">
                Paso 2: Observa • Demostración visual con la nutria Doc
              </Badge>
            </div>

            {/* Guía Interactiva de Nutrias */}
            <div className="nutria-interactive-wrapper">
              <NutriaGuideAnimation incidentType={caseData.animationType || 'atragantamiento'} />
            </div>

            {/* Pasos Oficiales Numerados */}
            <div className="steps-flow">
              <h3 className="sub-section-title">Pasos de actuación oficial</h3>
              {actuacion.map((step) => (
                <div
                  key={step.stepNumber}
                  className={`step-card-flow step-card-flow--${step.ruleType}`}
                >
                  <div className="step-number-bubble">{step.stepNumber}</div>
                  <div className="step-content">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-instruction">{step.instruction}</p>
                    <div className="step-visual-note">
                      <Activity size={14} className="visual-icon" />
                      <span>{step.visualAid}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PASO 3: PRACTICA (SIMULACIÓN DE DILEMAS INTERACTIVOS) */}
          <section className="pedagogical-section" id="paso-3-practica">
            <div className="section-label">
              <Badge variant="warning" size="sm">
                Paso 3: Practica • Simulación de decisiones escolares
              </Badge>
            </div>

            <Card className="sim-cta-card" borderVariant="primary">
              <div className="sim-cta-content">
                <span className="sim-tag-lead">Actividad práctica guiada</span>
                <h3 className="sim-cta-title">
                  {caseData.simulacion?.title || 'Pon a prueba tu criterio en este caso'}
                </h3>
                <p className="sim-cta-text">
                  {caseData.simulacion?.scenarioSummary ||
                    'Enfréntate a los dilemas de actuación con ilustraciones didácticas y recibe retroalimentación formativa inmediata.'}
                </p>
              </div>
              <Button
                variant="secondary"
                size="lg"
                iconRight={<PlayCircle size={20} />}
                onClick={onStartSimulation}
                className="sim-cta-btn"
              >
                Comenzar simulación práctica
              </Button>
            </Card>
          </section>

          {/* PASO 4: REPASA (SEÑALES DE ALARMA 123, LO QUE NUNCA DEBE HACERSE Y FUENTES) */}
          <section className="pedagogical-section" id="paso-4-repasa">
            <div className="section-label">
              <Badge variant="danger" size="sm">
                Paso 4: Repasa • Señales de alarma (123) y seguridad
              </Badge>
            </div>

            {/* Señales de Alarma 123 */}
            <Card className="alarm-card" borderVariant="danger">
              <div className="alarm-card__intro">
                <PhoneCall size={24} className="alarm-phone-icon" />
                <div>
                  <h3 className="alarm-heading">Criterios de activación inmediata de emergencias (123)</h3>
                  <p className="alarm-sub">
                    Si se presenta cualquiera de estos signos, active inmediatamente la Línea 123 y el protocolo directivo del colegio:
                  </p>
                </div>
              </div>
              <ul className="alarm-checklist">
                {senalesAlarma.map((sign, idx) => (
                  <li key={idx} className="alarm-item">
                    <AlertTriangle size={16} className="alarm-item-icon" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Lo que NUNCA debe hacerse */}
            <div className="prohibitions-section-block">
              <h3 className="sub-section-title">Lo que NUNCA debes hacer (errores críticos)</h3>
              <div className="prohibitions-grid">
                {queNoHacer.map((item, idx) => (
                  <Card key={idx} className="contra-card" borderVariant="danger">
                    <div className="contra-title-row">
                      <XCircle size={18} className="contra-icon" />
                      <h4 className="contra-action">{item.action}</h4>
                    </div>
                    <p className="contra-consequence">
                      <strong>Riesgo real:</strong> {item.consequence}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Fuentes Oficiales de Referencia */}
            <Card className="sources-card">
              <div className="sources-disclaimer-box">
                <ShieldAlert size={20} className="disclaimer-icon" />
                <p className="disclaimer-text">{clinicalDisclaimer}</p>
              </div>

              <div className="sources-list">
                <h4 className="sources-title">Guías clínicas oficiales de referencia:</h4>
                {sources.map((src, idx) => (
                  <div key={idx} className="source-item">
                    <span className="source-inst">{src.institution} ({src.year})</span>
                    <span className="source-doc">{src.document}</span>
                    <span className="source-note">Estado: {src.clinicalReviewNote}</span>
                  </div>
                ))}
              </div>

              <div className="sources-footer-meta">
                <span>Fecha de última revisión editorial: {lastReviewed}</span>
                {onNavigateToSources && (
                  <Button variant="ghost" size="sm" onClick={onNavigateToSources}>
                    Ver registro general de fuentes
                  </Button>
                )}
              </div>
            </Card>
          </section>

          {/* BARRA INFERIOR DE FINALIZACIÓN Y SIGUIENTE PASO LINEAL */}
          <section className="case-bottom-nav-bar">
            {isCompleted ? (
              <div className="case-bottom-nav case-bottom-nav--completed">
                <div className="bottom-nav-status">
                  <CheckCircle2 size={26} className="bottom-status-icon bottom-status-icon--success" />
                  <div>
                    <h4 className="bottom-status-title">¡Caso {number} completado con éxito!</h4>
                    <p className="bottom-status-sub">
                      {nextCase
                        ? `Siguiente caso en la ruta: Caso ${nextCase.number} • ${nextCase.title}`
                        : '¡Excelente labor! Has completado todos los casos escolares del programa.'}
                    </p>
                  </div>
                </div>
                <div className="bottom-nav-actions">
                  <Button variant="outline" onClick={onBack}>
                    Volver al Inicio
                  </Button>
                  {nextCase && (
                    <Button
                      variant="primary"
                      size="md"
                      iconRight={<ArrowRight size={18} />}
                      onClick={onGoToNextCase}
                    >
                      Avanzar al Caso {nextCase.number}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="case-bottom-nav">
                <div className="bottom-nav-status">
                  <PlayCircle size={26} className="bottom-status-icon bottom-status-icon--primary" />
                  <div>
                    <h4 className="bottom-status-title">¿Listo para practicar?</h4>
                    <p className="bottom-status-sub">
                      Aplica lo aprendido en el Paso 3 con dilemas interactivos de recreo o aula.
                    </p>
                  </div>
                </div>
                <div className="bottom-nav-actions">
                  <Button variant="outline" onClick={onBack}>
                    Volver al Inicio
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    iconRight={<ArrowRight size={18} />}
                    onClick={onStartSimulation}
                  >
                    Comenzar simulación práctica
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

CaseDetailView.propTypes = {
  caseData: PropTypes.object.isRequired,
  isCompleted: PropTypes.bool,
  nextCase: PropTypes.object,
  onStartSimulation: PropTypes.func.isRequired,
  onGoToNextCase: PropTypes.func,
  onBack: PropTypes.func.isRequired,
  onNavigateToSources: PropTypes.func,
}
