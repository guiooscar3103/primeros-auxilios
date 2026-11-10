import PropTypes from 'prop-types'
import { AlertCircle, PhoneCall, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'
import { EMERGENCY_NUMBER, getAssetUrl } from '../utils/constants'
import './QuickActionCard.css'

export default function QuickActionCard({
  caseData,
  onOpenFullCase,
  compact = false,
}) {
  const { consultaRapida, title, category, images } = caseData

  if (!consultaRapida) return null

  return (
    <Card className={`quick-action-card ${compact ? 'quick-action-card--compact' : ''}`} borderVariant="danger">
      {/* Encabezado con Imagen Visual en Miniatura */}
      <div className="quick-action-card__top">
        {images?.scene && (
          <div className="quick-action-card__thumb-wrap">
            <img
              src={getAssetUrl(images.scene)}
              alt={images.sceneAlt || title}
              className="quick-action-card__thumb"
              loading="lazy"
            />
          </div>
        )}

        <div className="quick-action-card__header">
          <div className="quick-action-card__tags">
            <Badge variant="danger" size="sm" icon={<AlertCircle size={14} />}>
              Consulta de urgencia
            </Badge>
            <Badge variant="neutral" size="sm">
              {category}
            </Badge>
          </div>
          <h3 className="quick-action-card__title">{title}</h3>
        </div>
      </div>

      <p className="quick-action-card__question">
        <strong>Pregunta clave:</strong> {consultaRapida.preguntaDiagnostica}
      </p>

      <div className="quick-action-card__decision-grid">
        {/* Camino Leve (Verde) */}
        <div className="decision-box decision-box--safe">
          <div className="decision-box__header">
            <CheckCircle2 size={18} className="decision-icon decision-icon--safe" />
            <span className="decision-box__title">{consultaRapida.caminoLeve.condicion}</span>
          </div>
          <p className="decision-box__action">{consultaRapida.caminoLeve.accion}</p>
        </div>

        {/* Camino Grave (Ámbar / Rojo) */}
        <div className="decision-box decision-box--severe">
          <div className="decision-box__header">
            <AlertCircle size={18} className="decision-icon decision-icon--severe" />
            <span className="decision-box__title">{consultaRapida.caminoGrave.condicion}</span>
          </div>
          <p className="decision-box__action">{consultaRapida.caminoGrave.accion}</p>
        </div>
      </div>

      {/* Condición de Paro / Inconsciencia */}
      {consultaRapida.paroOInconsciencia && (
        <div className="emergency-alert-strip">
          <div className="emergency-alert-strip__icon">
            <PhoneCall size={20} />
          </div>
          <div className="emergency-alert-strip__content">
            <span className="emergency-alert-strip__tag">
              {consultaRapida.paroOInconsciencia.condicion} • LLAMAR AL {EMERGENCY_NUMBER}
            </span>
            <p className="emergency-alert-strip__text">{consultaRapida.paroOInconsciencia.accion}</p>
          </div>
        </div>
      )}

      {/* Prohibiciones de Seguridad */}
      {consultaRapida.prohibiciones && consultaRapida.prohibiciones.length > 0 && (
        <div className="prohibitions-block">
          <span className="prohibitions-heading">
            <XCircle size={15} className="prohibitions-icon" /> Acciones contraindicadas:
          </span>
          <ul className="prohibitions-list">
            {consultaRapida.prohibiciones.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {onOpenFullCase && (
        <div className="quick-action-card__footer">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFullCase}
            iconRight={<ArrowRight size={16} />}
          >
            Ver módulo y demostración visual completa
          </Button>
        </div>
      )}
    </Card>
  )
}

QuickActionCard.propTypes = {
  caseData: PropTypes.object.isRequired,
  onOpenFullCase: PropTypes.func,
  compact: PropTypes.bool,
}
