import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ArrowLeft,
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
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import QuickActionCard from '../components/QuickActionCard'
import NutriaGuideAnimation from '../components/NutriaGuideAnimation'
import './CaseDetailView.css'

export default function CaseDetailView({
  caseData,
  onStartSimulation,
  onBack,
  onNavigateToSources,
}) {
  const [activeTab, setActiveTab] = useState('protocolo') // 'protocolo' | 'ficha'

  if (!caseData) return null

  const {
    title,
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
          Volver a la Lista de Casos
        </Button>
        <div className="case-nav-bar__meta">
          <Badge variant="danger" size="sm">
            {category}
          </Badge>
          <span className="case-read-time">
            <Clock size={14} /> {estimatedMinutes} min de capacitación
          </span>
        </div>
      </nav>

      {/* Encabezado del Caso */}
      <header className="case-hero">
        <h1 className="case-hero__title">{title}</h1>
        <p className="case-hero__description">{caseData.shortDescription}</p>

        {/* Pestañas de Vista: Protocolo Completo vs Ficha Rápida */}
        <div className="case-tabs">
          <button
            type="button"
            className={`case-tab-btn ${activeTab === 'protocolo' ? 'case-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('protocolo')}
          >
            <BookOpen size={16} /> Módulo Pedagógico Completo
          </button>
          <button
            type="button"
            className={`case-tab-btn ${activeTab === 'ficha' ? 'case-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('ficha')}
          >
            <FileText size={16} /> Ficha Resumen de Urgencia
          </button>
        </div>
      </header>

      {/* CONTENIDO 1: FICHA RÁPIDA CONDENSADA */}
      {activeTab === 'ficha' && (
        <section className="case-quick-tab animate-fade-in">
          <QuickActionCard caseData={caseData} />
          <div className="quick-tab-action">
            <Button
              variant="primary"
              size="md"
              iconRight={<PlayCircle size={18} />}
              onClick={onStartSimulation}
            >
              Practicar con la Simulación Escolar
            </Button>
          </div>
        </section>
      )}

      {/* CONTENIDO 2: PROTOCOLO PEDAGÓGICO COMPLETO (8 SECCIONES) */}
      {activeTab === 'protocolo' && (
        <div className="case-sections-container animate-fade-in">
          {/* SECCIÓN 1: CASO INICIAL REALISTA */}
          <section className="pedagogical-section" id="caso-inicial">
            <div className="section-label">
              <Badge variant="primary" size="sm">1. Caso Inicial en el Colegio</Badge>
            </div>
            <Card className="scenario-card" borderVariant="primary">
              {caseData.images?.scene && (
                <div className="scenario-image-wrap">
                  <img
                    src={caseData.images.scene}
                    alt={caseData.images.sceneAlt || caseData.title}
                    className="scenario-img"
                    loading="lazy"
                  />
                  <span className="image-caption">
                    Escena contextual: {contextoEscolar.location}
                  </span>
                </div>
              )}
              <div className="scenario-header">
                <span className="scenario-location">
                  <strong>Entorno:</strong> {contextoEscolar.location}
                </span>
                <span className="scenario-student">
                  <strong>Afectado:</strong> {contextoEscolar.studentName}
                </span>
              </div>
              <p className="scenario-narrative">{contextoEscolar.scenario}</p>
              <div className="scenario-focus">
                <Eye size={16} className="focus-icon" />
                <span>
                  <strong>Observación prioritaria:</strong> {contextoEscolar.initialObservation}
                </span>
              </div>
            </Card>
          </section>

          {/* SECCIÓN 2: RECONOCIMIENTO Y SEÑALES */}
          <section className="pedagogical-section" id="reconocimiento">
            <div className="section-label">
              <Badge variant="warning" size="sm">2. Reconocimiento Temprano</Badge>
            </div>
            <p className="section-intro-text">{reconocimiento.description}</p>

            <div className="recognition-grid">
              {/* Leve */}
              <Card className="recognition-col recognition-col--mild" borderVariant="success">
                <div className="recognition-header">
                  <CheckCircle2 size={20} className="rec-icon rec-icon--mild" />
                  <h3 className="recognition-title">{reconocimiento.mild.title}</h3>
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
                  <h3 className="recognition-title">{reconocimiento.severe.title}</h3>
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
          </section>

          {/* SECCIÓN 3: ACTUACIÓN PASO A PASO Y DEMOSTRACIÓN DE LAS NUTRIAS */}
          <section className="pedagogical-section" id="actuacion">
            <div className="section-label">
              <Badge variant="primary" size="sm">3. Protocolo de Actuación Paso a Paso</Badge>
            </div>

            {/* Demostración visual clínica oficial */}
            {caseData.images?.action && (
              <Card className="clinical-action-card" borderVariant="primary">
                <div className="clinical-image-wrap">
                  <img
                    src={caseData.images.action}
                    alt={caseData.images.actionAlt || caseData.title}
                    className="clinical-action-img"
                    loading="lazy"
                  />
                  <div className="clinical-image-caption">
                    <span className="caption-tag">Técnica de Primeros Auxilios Recomendada</span>
                    <p className="caption-text">{caseData.images.actionAlt}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Exposición interactiva con la Nutria Mentora y Nutria Pequeña */}
            <div className="nutria-interactive-wrapper">
              <NutriaGuideAnimation incidentType={caseData.animationType || 'atragantamiento'} />
            </div>

            <div className="steps-flow">
              {actuacion.map((step) => (
                <div
                  key={step.stepNumber}
                  className={`step-card-flow step-card-flow--${step.ruleType}`}
                >
                  <div className="step-number-bubble">{step.stepNumber}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
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

          {/* SECCIÓN 4: SEÑALES DE ALARMA (123) */}
          <section className="pedagogical-section" id="alarmas">
            <div className="section-label">
              <Badge variant="danger" size="sm">4. Señales de Alarma (Activar Línea 123)</Badge>
            </div>
            <Card className="alarm-card" borderVariant="danger">
              <div className="alarm-card__intro">
                <PhoneCall size={24} className="alarm-phone-icon" />
                <div>
                  <h3 className="alarm-heading">Criterios de Activación Inmediata de Emergencias</h3>
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
          </section>

          {/* SECCIÓN 5: LO QUE NUNCA DEBE HACERSE */}
          <section className="pedagogical-section" id="contraindicaciones">
            <div className="section-label">
              <Badge variant="danger" size="sm">5. Errores Críticos y Contraindicaciones</Badge>
            </div>
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
          </section>

          {/* SECCIÓN 6: SIMULACIÓN DE DECISIONES */}
          <section className="pedagogical-section" id="simulacion-cta">
            <div className="section-label">
              <Badge variant="warning" size="sm">6. Simulación de Decisiones en el Colegio</Badge>
            </div>
            <Card className="sim-cta-card" borderVariant="primary">
              <div className="sim-cta-content">
                <h3 className="sim-cta-title">Pon a prueba tu criterio en el comedor escolar</h3>
                <p className="sim-cta-text">
                  Enfréntate al caso práctico de Camilo con 3 dilemas de actuación. Recibirás retroalimentación formativa inmediata en cada elección.
                </p>
              </div>
              <Button
                variant="secondary"
                size="lg"
                iconRight={<PlayCircle size={20} />}
                onClick={onStartSimulation}
              >
                Comenzar Simulación
              </Button>
            </Card>
          </section>

          {/* SECCIÓN 7: FUENTES Y REVISIÓN SANITARIA */}
          <section className="pedagogical-section" id="fuentes-caso">
            <div className="section-label">
              <Badge variant="neutral" size="sm">7 y 8. Fuentes y Estado de Revisión Sanitaria</Badge>
            </div>
            <Card className="sources-card">
              <div className="sources-disclaimer-box">
                <ShieldAlert size={20} className="disclaimer-icon" />
                <p className="disclaimer-text">{clinicalDisclaimer}</p>
              </div>

              <div className="sources-list">
                <h4 className="sources-title">Guías Clínicas Oficiales de Referencia:</h4>
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
                    Ver Registro General de Fuentes
                  </Button>
                )}
              </div>
            </Card>
          </section>
        </div>
      )}
    </div>
  )
}

CaseDetailView.propTypes = {
  caseData: PropTypes.object.isRequired,
  onStartSimulation: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNavigateToSources: PropTypes.func,
}
