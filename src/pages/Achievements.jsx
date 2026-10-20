import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Trophy,
  Star,
  Award,
  Medal,
  ShieldCheck,
  Lock,
  Trash2,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  FileCheck,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import './Achievements.css'

// Catálogo de competencias docentes de Pequeños Héroes
const ALL_BADGES = [
  {
    id: 'b_docente_inicial',
    name: 'Docente en Capacitación',
    legacyAliases: ['Cadete de Primeros Auxilios'],
    description: 'Iniciaste el plan de preparación en primeros auxilios y emergencias escolares.',
    icon: Medal,
  },
  {
    id: 'b_ovace',
    name: 'Gestión de Asfixia y OVACE',
    legacyAliases: ['Héroe de Atragantamiento (OVACE)'],
    description: 'Dominas la maniobra de Heimlich adaptada al escolar y la transición inmediata a RCP.',
    icon: ShieldCheck,
  },
  {
    id: 'b_dental',
    name: 'Preservación de Trauma Dental',
    legacyAliases: ['Héroe de Pérdida de Dientes por Golpe'],
    description: 'Conoces la sujeción por corona, medios húmedos de transporte y la ventana de 30-60 min.',
    icon: Award,
  },
  {
    id: 'b_rcp_dea',
    name: 'Soporte Vital Básico y DEA',
    legacyAliases: ['Héroe de Sospecha de Infarto y Paro Cardíaco'],
    description: 'Capacidad para liderar la respuesta, compresiones a 100-120 cpm y uso del DEA escolar.',
    icon: Trophy,
  },
  {
    id: 'b_craneal',
    name: 'Vigilancia de Trauma Craneal',
    legacyAliases: ['Héroe de Golpes en la Cabeza y Chichón'],
    description: 'Manejo seguro de hematomas con frío indirecto y detección de banderas rojas neurológicas.',
    icon: ShieldCheck,
  },
  {
    id: 'b_fracturas',
    name: 'Inmovilización y Protocolo RICE',
    legacyAliases: ['Héroe de Caídas, Fracturas y Torceduras'],
    description: 'Inmovilización anatómica en posición encontrada y protocolo RICE en torceduras.',
    icon: Award,
  },
  {
    id: 'b_triage',
    name: 'Criterio y Triage Escolar',
    legacyAliases: ['Experto en Clasificación de Peligros'],
    description: 'Capacidad rápida de discernir entre manejo en enfermería escolar y activación del 123.',
    icon: Trophy,
  },
]

export default function Achievements({
  stars = 0,
  completedMissions = [],
  unlockedBadges = [],
  onResetProgress,
  onNavigateToMap,
}) {
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleConfirmReset = () => {
    onResetProgress()
    setShowConfirmReset(false)
  }

  const isBadgeUnlocked = (badge) => {
    if (unlockedBadges.includes(badge.name)) return true
    if (badge.legacyAliases && badge.legacyAliases.some((alias) => unlockedBadges.includes(alias))) {
      return true
    }
    // Desbloqueo implícito si completó el caso
    if (badge.id === 'b_docente_inicial') return true
    return false
  }

  return (
    <div className="achievements-page animate-fade-in">
      {/* Encabezado */}
      <header className="achievements-header">
        <Badge variant="warning" icon={<Trophy size={16} />}>
          Acreditación y Certificación Docente
        </Badge>
        <h1 className="achievements-title">Panel de Competencias Escolares</h1>
        <p className="achievements-subtitle">
          Registro formal de horas de capacitación, competencias de primeros auxilios demostradas y módulos acreditados.
        </p>
      </header>

      {/* Resumen de Estadísticas */}
      <div className="stats-cards-grid">
        <Card borderVariant="warning" className="stat-card">
          <Star size={40} className="stat-icon-gold" />
          <span className="stat-big-number">{stars}</span>
          <span className="stat-label-text">Puntos de Formación</span>
        </Card>

        <Card borderVariant="success" className="stat-card">
          <FileCheck size={40} className="stat-icon-green" />
          <span className="stat-big-number">{completedMissions.length} de 5</span>
          <span className="stat-label-text">Módulos Acreditados</span>
        </Card>

        <Card borderVariant="primary" className="stat-card">
          <Award size={40} className="stat-icon-primary" />
          <span className="stat-big-number">
            {ALL_BADGES.filter((b) => isBadgeUnlocked(b)).length} de {ALL_BADGES.length}
          </span>
          <span className="stat-label-text">Competencias Obtenidas</span>
        </Card>
      </div>

      {/* Catálogo de Insignias y Competencias */}
      <section className="badges-section">
        <h2 className="badges-section-title">Insignias de Competencia Clínica Escolar</h2>
        <p className="badges-section-sub">
          Se otorgan al resolver con éxito los dilemas de simulación y completar los módulos de formación:
        </p>

        <div className="badges-grid">
          {ALL_BADGES.map((badge) => {
            const unlocked = isBadgeUnlocked(badge)
            const IconComp = badge.icon

            return (
              <Card
                key={badge.id}
                className={`badge-card ${unlocked ? 'badge-card--unlocked' : 'badge-card--locked'}`}
                borderVariant={unlocked ? 'success' : 'neutral'}
              >
                <div className="badge-card__top">
                  <div className={`badge-icon-wrap ${unlocked ? 'badge-icon--active' : ''}`}>
                    {unlocked ? <IconComp size={34} /> : <Lock size={30} />}
                  </div>
                  <Badge variant={unlocked ? 'success' : 'neutral'} size="sm">
                    {unlocked ? 'Acreditada' : 'Por Acreditar'}
                  </Badge>
                </div>

                <h3 className="badge-name">{badge.name}</h3>
                <p className="badge-description">{badge.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Zona de Acciones de Usuario y Reset Seguro */}
      <section className="achievements-management-section">
        <Card className="management-card">
          <div className="management-card__info">
            <Info size={22} className="info-icon" />
            <div>
              <h4 className="management-title">Almacenamiento Local de tu Progreso</h4>
              <p className="management-text">
                Tu progreso y competencias se conservan de forma segura en este navegador (localStorage). Si deseas reiniciar tu entrenamiento para una nueva práctica, puedes restablecerlo aquí.
              </p>
            </div>
          </div>

          <div className="management-card__actions">
            {!showConfirmReset ? (
              <Button
                variant="outline"
                size="sm"
                iconLeft={<Trash2 size={16} />}
                onClick={() => setShowConfirmReset(true)}
              >
                Restablecer Progreso
              </Button>
            ) : (
              <div className="confirm-reset-box animate-fade-in">
                <span className="confirm-warn-text">¿Confirmas reiniciar todos los puntos e insignias?</span>
                <div className="confirm-btns-row">
                  <Button variant="danger" size="sm" onClick={handleConfirmReset}>
                    Sí, Restablecer
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowConfirmReset(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <Button
              variant="primary"
              size="md"
              iconRight={<ArrowRight size={18} />}
              onClick={onNavigateToMap}
            >
              Continuar Capacitación
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}

Achievements.propTypes = {
  stars: PropTypes.number,
  completedMissions: PropTypes.arrayOf(PropTypes.string),
  unlockedBadges: PropTypes.arrayOf(PropTypes.string),
  onResetProgress: PropTypes.func.isRequired,
  onNavigateToMap: PropTypes.func.isRequired,
}
