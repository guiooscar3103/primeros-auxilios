import PropTypes from 'prop-types'
import {
  AlertTriangle,
  Smile,
  Activity,
  Brain,
  ShieldAlert,
  PhoneCall,
  ShieldCheck,
  Star,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Compass,
  Gamepad2,
  FileText,
  Clock,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import missionsData from '../data/missions.json'
import './MissionMap.css'

// Mapa de iconos dinámicos clínicos
const iconMap = {
  AlertTriangle: AlertTriangle,
  Smile: Smile,
  Activity: Activity,
  Brain: Brain,
  ShieldAlert: ShieldAlert,
  PhoneCall: PhoneCall,
  ShieldCheck: ShieldCheck,
}

export default function MissionMap({
  completedMissionIds = [],
  onSelectMission,
  onOpenMinigame,
  onOpenSimulation,
  onBackToHome,
}) {
  const totalMissions = missionsData.length
  const completedCount = completedMissionIds.length
  const progressPercent = Math.round((completedCount / totalMissions) * 100)

  return (
    <div className="mission-map-page animate-fade-in">
      {/* Encabezado del Mapa */}
      <header className="map-header">
        <div className="map-header__meta">
          <Badge variant="primary" icon={<Compass size={16} />}>
            Plan de Formación Docente
          </Badge>
          <h1 className="map-title">Módulos de Formación en Primeros Auxilios</h1>
          <p className="map-description">
            Domina los protocolos oficiales de actuación inmediata, revisa señales de alarma y entrena con simulaciones de toma de decisiones para proteger a tus estudiantes.
          </p>
        </div>

        {/* Resumen de Progreso General */}
        <Card className="map-progress-card">
          <div className="map-progress-card__content">
            <div>
              <span className="map-progress-card__label">Progreso de Capacitación</span>
              <p className="map-progress-card__value">
                {completedCount} de {totalMissions} módulos completados ({progressPercent}%)
              </p>
            </div>
            <div className="map-progress-card__bar">
              <ProgressBar
                value={progressPercent}
                max={100}
                showPercent
                color="success"
              />
            </div>
          </div>
        </Card>
      </header>

      {/* Lista interactiva de Módulos */}
      <section className="missions-timeline">
        {missionsData.map((mission) => {
          const isCompleted = completedMissionIds.includes(mission.id)
          const IconComponent = iconMap[mission.icon] || ShieldCheck

          return (
            <Card
              key={mission.id}
              className={`mission-card ${isCompleted ? 'mission-card--completed' : ''}`}
              borderVariant={isCompleted ? 'success' : mission.color}
            >
              <div className="mission-card__inner">
                {/* Columna Izquierda: Número e Icono */}
                <div className="mission-card__badge-col">
                  <div className={`mission-avatar mission-avatar--${mission.color}`}>
                    <IconComponent size={32} />
                  </div>
                  <span className="mission-number">Módulo {mission.number}</span>
                </div>

                {/* Columna Central: Contenido */}
                <div className="mission-card__body">
                  <div className="mission-card__tags">
                    <Badge variant={mission.color} size="sm">
                      {mission.category}
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      {mission.targetAudience || 'Docentes de Primaria'}
                    </Badge>
                    {mission.estimatedMinutes && (
                      <Badge variant="neutral" size="sm" icon={<Clock size={12} />}>
                        {mission.estimatedMinutes} min
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="success" size="sm" icon={<CheckCircle2 size={12} />}>
                        ¡Completado!
                      </Badge>
                    )}
                  </div>

                  <h2 className="mission-title-text">{mission.title}</h2>
                  <p className="mission-description-text">{mission.shortDescription}</p>

                  <div className="mission-goals">
                    <span className="goals-heading">Competencias clave que desarrollarás:</span>
                    <ul className="goals-list">
                      {mission.learningGoals.map((goal, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={14} className="goal-check" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Columna Derecha: Recompensa y Acción */}
                <div className="mission-card__action-col">
                  <div className="reward-badge">
                    <Star size={18} className="reward-star" />
                    <span>+{mission.pointsReward || 50} Puntos</span>
                  </div>

                  <Button
                    variant={isCompleted ? 'outline' : 'secondary'}
                    size="md"
                    iconRight={mission.isLocked ? <Lock size={18} /> : <ArrowRight size={18} />}
                    disabled={mission.isLocked}
                    onClick={() => onSelectMission(mission)}
                    className="mission-cta-btn"
                  >
                    {mission.isLocked
                      ? 'Bloqueado'
                      : isCompleted
                      ? 'Repasar Módulo'
                      : 'Estudiar Módulo'}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </section>

      {/* SECCIÓN ESPECIAL: EJERCICIOS PRÁCTICOS DE TOMA DE DECISIONES */}
      <section className="special-training-section">
        <div className="section-title-wrap">
          <Badge variant="warning" icon={<Sparkles size={16} />}>
            Área de Práctica Interactiva
          </Badge>
          <h2 className="special-training-heading">Talleres de Aplicación Práctica</h2>
          <p className="special-training-sub">
            Pon a prueba tu criterio docente con el clasificador de triage escolar y resuelve dilemas ético-clínicos simulados.
          </p>
        </div>

        <div className="special-training-grid">
          {/* Tarjeta de Triage */}
          <Card className="training-card" borderVariant="primary">
            <div className="training-card__icon-box primary">
              <Gamepad2 size={36} />
            </div>
            <div className="training-card__content">
              <Badge variant="primary" size="sm">Ejercicio Práctico</Badge>
              <h3 className="training-card__title">Triage de Urgencias Escolares</h3>
              <p className="training-card__text">
                Distingue rápidamente qué incidentes se resuelven en la enfermería escolar y cuáles exigen activar la Línea 123.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={onOpenMinigame}
                iconRight={<ArrowRight size={18} />}
              >
                Iniciar Triage (+30 pts)
              </Button>
            </div>
          </Card>

          {/* Tarjeta de Simulación */}
          <Card className="training-card" borderVariant="warning">
            <div className="training-card__icon-box warning">
              <ShieldAlert size={36} />
            </div>
            <div className="training-card__content">
              <Badge variant="warning" size="sm">Simulación Clínica</Badge>
              <h3 className="training-card__title">Simulación de Dilemas de Urgencia</h3>
              <p className="training-card__text">
                Entrena tus decisiones ante asfixia (OVACE), trauma dental, paro cardíaco, chichones y fracturas en la escuela.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={onOpenSimulation}
                iconRight={<ArrowRight size={18} />}
              >
                Ir a Casos Clínicos
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Navegación al pie */}
      <div className="map-footer-actions">
        <Button variant="ghost" onClick={onBackToHome}>
          ← Volver a la Portada
        </Button>
      </div>
    </div>
  )
}

MissionMap.propTypes = {
  completedMissionIds: PropTypes.arrayOf(PropTypes.string),
  onSelectMission: PropTypes.func.isRequired,
  onOpenMinigame: PropTypes.func.isRequired,
  onOpenSimulation: PropTypes.func.isRequired,
  onBackToHome: PropTypes.func.isRequired,
}
