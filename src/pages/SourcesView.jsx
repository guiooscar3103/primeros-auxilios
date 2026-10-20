import PropTypes from 'prop-types'
import { ShieldAlert, BookOpen, ArrowLeft, Clock } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { EMERGENCY_NUMBER } from '../utils/constants'
import { SCHOOL_CASES } from '../data/schoolCases'
import './SourcesView.css'

export default function SourcesView({ onBack }) {
  return (
    <div className="sources-page animate-fade-in">
      <header className="sources-header">
        <Badge variant="primary" icon={<BookOpen size={16} />}>
          Transparencia y Evidencia Sanitaria
        </Badge>
        <h1 className="sources-main-title">Fuentes Clínicas y Advertencias de Seguridad</h1>
        <p className="sources-subtitle">
          Fundamentación técnica de los protocolos escolares conforme a consensos y guías de soporte vital de organizaciones de referencia.
        </p>
      </header>

      {/* Declaración de Advertencia Sanitaria Obligatoria */}
      <Card className="disclaimer-banner" borderVariant="warning">
        <div className="disclaimer-banner__icon">
          <ShieldAlert size={32} />
        </div>
        <div className="disclaimer-banner__text">
          <h2 className="disclaimer-heading">Delimitación de Responsabilidad y Alcance Educativo</h2>
          <p>
            <strong>Pequeños Héroes</strong> es una plataforma de apoyo pedagógico para docentes de educación primaria. Provee pautas organizadas de primera respuesta ante incidentes escolares comunes.
          </p>
          <p>
            <strong>Advertencia obligatoria:</strong> Este contenido <em>NO sustituye</em> los servicios médicos de emergencia (Línea {EMERGENCY_NUMBER}), la atención por personal de enfermería o medicina escolar, ni una certificación presencial oficial en Primeros Auxilios y RCP.
          </p>
          <div className="review-badge-strip">
            <span className="review-pill">
              <Clock size={14} /> Estado técnico: Contenido pedagógico sujeto a validación periódica por profesional sanitario colegiado
            </span>
          </div>
        </div>
      </Card>

      {/* Lista de Referencias Oficiales Utilizadas */}
      <section className="sources-catalog">
        <h2 className="catalog-title">Guías y Organismos Internacionales y Nacionales de Referencia</h2>

        <div className="sources-grid">
          <Card className="source-org-card" borderVariant="primary">
            <h3 className="org-name">American Heart Association (AHA)</h3>
            <p className="org-focus">
              Guías para Reanimación Cardiopulmonar (RCP) y Atención Cardiovascular de Emergencia (ECC). Actualización en Soporte Vital Básico Pediátrico y Adultos.
            </p>
            <span className="org-topic">Aplicado a: Atragantamiento (OVACE) y Sospecha de Infarto.</span>
          </Card>

          <Card className="source-org-card" borderVariant="primary">
            <h3 className="org-name">American Red Cross / Cruz Roja Colombiana</h3>
            <p className="org-focus">
              Manuales de Primeros Auxilios para Escuelas y Cuidadores. Protocolo de atención inicial de heridas, contusiones y emergencias infantiles comunitarias.
            </p>
            <span className="org-topic">Aplicado a: Cadena de socorro P.A.S. y articulación con la Línea 123.</span>
          </Card>

          <Card className="source-org-card" borderVariant="primary">
            <h3 className="org-name">Centros para el Control y la Prevención de Enfermedades (CDC)</h3>
            <p className="org-focus">
              Iniciativa HEADS UP: Información y señales de alarma sobre traumatismo craneoencefálico y conmoción cerebral en entornos escolares y deportivos.
            </p>
            <span className="org-topic">Aplicado a: Golpes en la cabeza y banderas rojas de TEC.</span>
          </Card>

          <Card className="source-org-card" borderVariant="primary">
            <h3 className="org-name">Asociación Internacional de Traumatología Dental (IADT)</h3>
            <p className="org-focus">
              Guías clínicas para el manejo de lesiones dentales traumáticas en niños y adolescentes: conservación y transporte del diente avulsionado.
            </p>
            <span className="org-topic">Aplicado a: Pérdida traumática de dientes por impacto.</span>
          </Card>
        </div>
      </section>

      {/* Desglose por Módulo de Capacitación */}
      <section className="cases-sources-summary">
        <h2 className="catalog-title">Trazabilidad por Caso</h2>
        <div className="cases-sources-list">
          {SCHOOL_CASES.map((sc) => (
            <Card key={sc.id} className="case-source-row">
              <div className="case-source-row__header">
                <h3 className="case-row-title">{sc.title}</h3>
                <span className="case-row-date">Última revisión: {sc.lastReviewed}</span>
              </div>
              <ul className="case-row-sources">
                {sc.sources.map((s, idx) => (
                  <li key={idx}>
                    <strong>{s.institution}:</strong> {s.document} ({s.year}) — <em>{s.clinicalReviewNote}</em>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <div className="sources-back">
        <Button variant="outline" iconLeft={<ArrowLeft size={16} />} onClick={onBack}>
          Volver
        </Button>
      </div>
    </div>
  )
}

SourcesView.propTypes = {
  onBack: PropTypes.func.isRequired,
}
