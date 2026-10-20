import PropTypes from 'prop-types'
import { Zap, PhoneCall, ArrowLeft, ShieldAlert } from 'lucide-react'
import QuickActionCard from '../components/QuickActionCard'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Card from '../components/Card'
import { EMERGENCY_NUMBER } from '../utils/constants'
import { SCHOOL_CASES } from '../data/schoolCases'
import './QuickReferenceView.css'

export default function QuickReferenceView({ onBackToHome, onOpenCaseDetail }) {
  return (
    <div className="quick-reference-page animate-fade-in">
      <header className="quick-reference-header">
        <div className="quick-reference-header__meta">
          <Badge variant="danger" icon={<Zap size={16} />}>
            Consulta Rápida de Emergencia
          </Badge>
          <h1 className="quick-reference-title">Fichas de Actuación Prioritaria</h1>
          <p className="quick-reference-subtitle">
            Acceso inmediato a los pasos esenciales para actuar en el aula o patio escolar. Diseñado para lectura en menos de 30 segundos.
          </p>
        </div>

        {/* Banner de Emergencia Permanente */}
        <Card className="urgent-call-box" borderVariant="danger">
          <div className="urgent-call-box__icon">
            <PhoneCall size={28} />
          </div>
          <div className="urgent-call-box__content">
            <h2 className="urgent-call-box__title">Línea de Emergencias Oficial: {EMERGENCY_NUMBER}</h2>
            <p className="urgent-call-box__text">
              Ante riesgo vital, pérdida de conciencia o dificultad respiratoria grave, asigne a otra persona la llamada inmediata al {EMERGENCY_NUMBER} mientras usted aplica el protocolo.
            </p>
          </div>
        </Card>
      </header>

      {/* Lista de Fichas de Casos */}
      <section className="quick-cards-grid">
        {SCHOOL_CASES.map((schoolCase) => (
          <QuickActionCard
            key={schoolCase.id}
            caseData={schoolCase}
            onOpenFullCase={() => onOpenCaseDetail(schoolCase)}
          />
        ))}
      </section>

      {/* Advertencia Sanitaria de Respaldo */}
      <footer className="quick-reference-footer">
        <div className="clinical-notice">
          <ShieldAlert size={18} className="notice-icon" />
          <span>
            Protocolos orientativos para personal docente. Contenido técnico pendiente de validación por un profesional de la salud colegiado.
          </span>
        </div>

        <div className="footer-actions">
          <Button variant="ghost" iconLeft={<ArrowLeft size={18} />} onClick={onBackToHome}>
            Volver al Inicio
          </Button>
        </div>
      </footer>
    </div>
  )
}

QuickReferenceView.propTypes = {
  onBackToHome: PropTypes.func.isRequired,
  onOpenCaseDetail: PropTypes.func.isRequired,
}
