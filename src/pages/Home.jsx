import PropTypes from 'prop-types'
import {
  ShieldAlert,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Eye,
  Zap,
  BookOpen,
  AlertTriangle,
  Activity,
  Smile,
  Brain,
  Clock,
} from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import Badge from '../components/Badge'
import { EMERGENCY_NUMBER } from '../utils/constants'
import { SCHOOL_CASES } from '../data/schoolCases'
import './Home.css'

export default function Home({
  onOpenQuickReference,
  onSelectCase,
  onExploreModules,
  onOpenSources,
}) {
  const pilotCase = SCHOOL_CASES[0] // Atragantamiento

  return (
    <div className="home-page animate-fade-in">
      {/* Banner Principal Docente */}
      <section className="hero-banner">
        <div className="hero-banner__badge">
          <Badge variant="primary" icon={<ShieldCheck size={16} />}>
            Plataforma para Docentes de Primaria
          </Badge>
        </div>

        <h1 className="hero-banner__title">
          Primeros Auxilios y Gestión de <span className="highlight-text">Emergencias Escolares</span>
        </h1>

        <p className="hero-banner__description">
          Protocolos de actuación inmediata, simulación de toma de decisiones y consulta rápida ante situaciones que ocurren en el entorno de la escuela primaria.
        </p>

        <div className="hero-banner__actions">
          <Button
            variant="danger"
            size="lg"
            iconLeft={<Zap size={20} />}
            onClick={onOpenQuickReference}
            className="cta-urgent-btn"
          >
            Consulta Rápida de Urgencia
          </Button>
          <Button
            variant="secondary"
            size="lg"
            iconRight={<ArrowRight size={20} />}
            onClick={onExploreModules}
          >
            Ver Módulos de Capacitación
          </Button>
        </div>

        {/* Banner de seguridad y Línea 123 */}
        <div className="emergency-banner">
          <div className="emergency-banner__icon">
            <PhoneCall size={28} />
          </div>
          <div className="emergency-banner__info">
            <h2 className="emergency-banner__title">
              Protocolo Oficial de Emergencia: Línea <strong>{EMERGENCY_NUMBER}</strong>
            </h2>
            <p className="emergency-banner__text">
              En caso de asfixia grave, pérdida de conciencia o traumatismo severo, asigne a un adulto la llamada al {EMERGENCY_NUMBER} mientras usted asume el control del protocolo y protege al estudiante.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE FUNDAMENTOS PARA DOCENTES: ¿QUÉ SON Y POR QUÉ SABERLOS? */}
      <section className="foundations-section">
        <div className="section-header">
          <Badge variant="primary" icon={<BookOpen size={16} />}>
            Formación Docente Esencial
          </Badge>
          <h2 className="section-title">¿Qué son y por qué los adultos deben saber Primeros Auxilios?</h2>
          <p className="section-subtitle">
            Durante la jornada escolar, los primeros minutos tras un accidente dependen exclusivamente de la serenidad y conocimiento del docente a cargo:
          </p>
        </div>

        <div className="foundations-grid">
          <Card className="foundation-def-card" borderVariant="primary">
            <h3 className="foundation-def-title">¿Qué son los Primeros Auxilios en la Escuela?</h3>
            <p className="foundation-def-text">
              Son el conjunto de actuaciones y cuidados iniciales que brinda el personal docente o administrativo a un estudiante tras un accidente o descompensación repentina, preservando la vida, minimizando el daño y facilitando la labor del personal de emergencias médicas.
            </p>
          </Card>

          <div className="why-adults-grid">
            <Card className="why-card" borderVariant="warning">
              <h4 className="why-card__title">1. Los primeros minutos son vitales</h4>
              <p className="why-card__desc">
                En asfixia o paro cardíaco, el daño cerebral irreversible empieza a los 4 minutos. La ambulancia suele demorar más: usted es el primer respondedor.
              </p>
            </Card>

            <Card className="why-card" borderVariant="success">
              <h4 className="why-card__title">2. Evitar secuelas permanentes</h4>
              <p className="why-card__desc">
                Conservar un diente permanente en leche o inmovilizar una extremidad sin mover el hueso previene secuelas irreparables de por vida.
              </p>
            </Card>

            <Card className="why-card" borderVariant="primary">
              <h4 className="why-card__title">3. Calma y liderazgo en el aula</h4>
              <p className="why-card__desc">
                Ante el pánico infantil por sangre o dolor, un docente preparado proyecta seguridad, evita mitos peligrosos y organiza la respuesta.
              </p>
            </Card>

            <Card className="why-card" borderVariant="primary">
              <h4 className="why-card__title">4. Deber de custodia y cuidado</h4>
              <p className="why-card__desc">
                Las familias confían la integridad de sus hijos a la escuela. Saber actuar con base científica es un compromiso ético y profesional.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE LOS INCIDENTES ESCOLARES (TODOS ACTIVOS) */}
      <section className="school-cases-section">
        <div className="section-header">
          <Badge variant="danger" icon={<ShieldAlert size={16} />}>
            Catálogo de Incidentes Escolares
          </Badge>
          <h2 className="section-title">Incidentes que Ocurren en el Entorno Escolar</h2>
          <p className="section-subtitle">
            Seleccione un incidente para ver el protocolo, la demostración con nutrias, las banderas rojas y la simulación interactiva:
          </p>
        </div>

        <div className="cases-grid">
          {SCHOOL_CASES.map((schoolCase) => {
            const isDanger = schoolCase.color === 'danger'
            return (
              <Card
                key={schoolCase.id}
                interactive
                borderVariant={schoolCase.color}
                className="case-card-home case-card-home--active"
                onClick={() => onSelectCase(schoolCase)}
              >
                <div className="case-card-home__badge-row">
                  <div className={`case-avatar case-avatar--${schoolCase.color}`}>
                    {schoolCase.id === 'atragantamiento-ovace' && <AlertTriangle size={26} />}
                    {schoolCase.id === 'perdida-dientes-avulsion' && <Smile size={26} />}
                    {schoolCase.id === 'paro-cardiaco-infarto' && <Activity size={26} />}
                    {schoolCase.id === 'chichones-golpes-cabeza' && <Brain size={26} />}
                    {schoolCase.id === 'caidas-fracturas-torceduras' && <ShieldAlert size={26} />}
                  </div>
                  <Badge variant={isDanger ? 'danger' : 'primary'} size="sm">
                    {schoolCase.category}
                  </Badge>
                </div>
                <h3 className="case-card-home__title">{schoolCase.title}</h3>
                <p className="case-card-home__desc">{schoolCase.shortDescription}</p>
                <div className="case-card-home__meta">
                  <span className="meta-time">
                    <Clock size={14} /> {schoolCase.estimatedMinutes} min • Guía Nutria 🐾
                  </span>
                  <span className="meta-action-link">
                    Estudiar Caso <ArrowRight size={16} />
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* MÉTODO P.A.S. ADAPTADO A DOCENTES */}
      <section className="pas-section">
        <div className="section-header">
          <Badge variant="primary" icon={<ShieldCheck size={16} />}>
            Marco de Intervención Docente
          </Badge>
          <h2 className="section-title">El Protocolo P.A.S. en la Escuela</h2>
          <p className="section-subtitle">
            Tres pasos esenciales para actuar con serenidad y liderazgo ante cualquier incidente con alumnos:
          </p>
        </div>

        <div className="pas-grid">
          <Card borderVariant="warning" className="pas-card">
            <div className="pas-card__badge-row">
              <span className="pas-letter">P</span>
              <Badge variant="warning" icon={<Eye size={14} />}>1° Proteger</Badge>
            </div>
            <h3 className="pas-card__title">PROTEGER</h3>
            <p className="pas-card__text">
              Asegure el salón o patio. Aparte a los demás estudiantes para mantener la calma y despejar la zona de riesgo antes de actuar.
            </p>
          </Card>

          <Card borderVariant="primary" className="pas-card">
            <div className="pas-card__badge-row">
              <span className="pas-letter">A</span>
              <Badge variant="primary" icon={<PhoneCall size={14} />}>2° Avisar</Badge>
            </div>
            <h3 className="pas-card__title">AVISAR</h3>
            <p className="pas-card__text">
              Comunique a coordinación o enfermería escolar. Si hay señales de alarma, ordene la llamada inmediata a la Línea {EMERGENCY_NUMBER}.
            </p>
          </Card>

          <Card borderVariant="success" className="pas-card">
            <div className="pas-card__badge-row">
              <span className="pas-letter">S</span>
              <Badge variant="success" icon={<HeartHandshake size={14} />}>3° Socorrer</Badge>
            </div>
            <h3 className="pas-card__title">SOCORRER</h3>
            <p className="pas-card__text">
              Aplique únicamente las maniobras básicas autorizadas. No suministre medicamentos ni aplique remedios caseros no validados.
            </p>
          </Card>
        </div>
      </section>

      {/* TRANSPARENCIA Y FUENTES */}
      <section className="home-transparency-strip">
        <div className="transparency-content">
          <ShieldAlert size={22} className="transparency-icon" />
          <p className="transparency-text">
            Contenido técnico basado en consensos AHA, Cruz Roja y CDC. Pendiente de validación sanitaria colegiada.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onOpenSources}>
          Consultar Fuentes y Términos Sanitarios →
        </Button>
      </section>
    </div>
  )
}

Home.propTypes = {
  onOpenQuickReference: PropTypes.func.isRequired,
  onSelectCase: PropTypes.func.isRequired,
  onExploreModules: PropTypes.func.isRequired,
  onOpenSources: PropTypes.func.isRequired,
}
