import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  HelpCircle,
  Award,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import './CaseSimulationView.css'

export default function CaseSimulationView({
  caseData,
  onCompleteSimulation,
  onBackToCase,
}) {
  const simulation = caseData?.simulacion
  const steps = simulation?.steps || []

  const [stepIndex, setStepIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  if (!simulation || steps.length === 0) {
    return (
      <div className="simulation-empty">
        <p>No hay simulación disponible para este caso.</p>
        <Button onClick={onBackToCase}>Volver al caso</Button>
      </div>
    )
  }

  const currentStep = steps[stepIndex]
  const totalSteps = steps.length
  const progressPercent = Math.round(((stepIndex + (isAnswered ? 1 : 0)) / totalSteps) * 100)

  const handleSelectOption = (option) => {
    if (isAnswered) return
    setSelectedOptionId(option.id)
    setIsAnswered(true)
    if (option.isCorrect) {
      setCorrectCount((prev) => prev + 1)
    }
  }

  const handleNextStep = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1)
      setSelectedOptionId(null)
      setIsAnswered(false)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRestart = () => {
    setStepIndex(0)
    setSelectedOptionId(null)
    setIsAnswered(false)
    setIsCompleted(false)
    setCorrectCount(0)
  }

  const selectedOption = currentStep?.options.find((o) => o.id === selectedOptionId)

  // Pantalla de Finalización
  if (isCompleted) {
    return (
      <div className="simulation-complete-wrap animate-fade-in">
        <Card className="simulation-complete-card" borderVariant="success">
          <div className="complete-badge-avatar">
            <Award size={56} className="badge-trophy" />
          </div>
          <Badge variant="success" size="md">
            Simulación de Toma de Decisiones Finalizada
          </Badge>
          <h2 className="complete-heading">
            {caseData.title}: {simulation.title}
          </h2>
          <p className="complete-description">
            Has completado los {totalSteps} dilemas de actuación escolar. Tu resultado:{' '}
            <strong>{correctCount} de {totalSteps} decisiones correctas</strong>.
          </p>

          <div className="complete-summary-box">
            <span className="summary-title">Competencia Docente Evaluada:</span>
            <p className="summary-text">
              {simulation.competenceSummary ||
                `Capacidad de resolver dilemas críticos en ${caseData.title.toLowerCase()}, evitando prácticas contraindicadas y aplicando protocolos oficiales.`}
            </p>
          </div>

          <div className="complete-actions">
            <Button
              variant="outline"
              iconLeft={<RotateCcw size={18} />}
              onClick={handleRestart}
            >
              Repetir Simulación
            </Button>
            <Button
              variant="success"
              size="lg"
              iconRight={<ArrowRight size={20} />}
              onClick={() => onCompleteSimulation(caseData.id)}
            >
              Guardar Progreso y Continuar
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="case-simulation-page animate-fade-in">
      {/* Encabezado */}
      <header className="case-sim-header">
        <div className="case-sim-header__meta">
          <Badge variant="primary" icon={<ShieldAlert size={14} />}>
            Simulación Clínica Docente
          </Badge>
          <h1 className="case-sim-title">{simulation.title}</h1>
          <p className="case-sim-sub">{simulation.scenarioSummary}</p>
        </div>

        {/* Barra de Progreso */}
        <div className="case-sim-progress">
          <span className="progress-label">
            Dilema {stepIndex + 1} de {totalSteps}
          </span>
          <ProgressBar value={progressPercent} max={100} color="primary" />
        </div>
      </header>

      {/* Tarjeta del Dilema */}
      <Card className="dilemma-card" borderVariant="primary">
        <div className="dilemma-situation">
          <span className="situation-tag">Situación en el colegio:</span>
          <p className="situation-text">{currentStep.situation}</p>
        </div>

        <div className="dilemma-question-box">
          <HelpCircle size={20} className="question-icon" />
          <h3 className="dilemma-question">{currentStep.question}</h3>
        </div>

        {/* Lista de Opciones */}
        <div className="options-grid">
          {currentStep.options.map((option) => {
            const isSelected = selectedOptionId === option.id
            let optionClass = 'option-btn'

            if (isAnswered) {
              if (option.isCorrect) {
                optionClass += ' option-btn--correct'
              } else if (isSelected && !option.isCorrect) {
                optionClass += ' option-btn--incorrect'
              } else {
                optionClass += ' option-btn--dimmed'
              }
            } else if (isSelected) {
              optionClass += ' option-btn--selected'
            }

            return (
              <button
                key={option.id}
                type="button"
                className={optionClass}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
              >
                <div className="option-btn__icon">
                  {isAnswered ? (
                    option.isCorrect ? (
                      <CheckCircle2 size={20} className="status-ico correct" />
                    ) : isSelected ? (
                      <XCircle size={20} className="status-ico incorrect" />
                    ) : (
                      <span className="option-bullet" />
                    )
                  ) : (
                    <span className="option-bullet" />
                  )}
                </div>
                <span className="option-btn__text">{option.text}</span>
              </button>
            )
          })}
        </div>

        {/* Retroalimentación Formativa Inmediata */}
        {isAnswered && selectedOption && (
          <div
            className={`feedback-box ${
              selectedOption.isCorrect ? 'feedback-box--correct' : 'feedback-box--incorrect'
            }`}
          >
            <div className="feedback-box__header">
              {selectedOption.isCorrect ? (
                <>
                  <CheckCircle2 size={20} className="feedback-ico correct" />
                  <span className="feedback-title">Decisión Correcta</span>
                </>
              ) : (
                <>
                  <XCircle size={20} className="feedback-ico incorrect" />
                  <span className="feedback-title">Riesgo Clínico / Conducta Inadecuada</span>
                </>
              )}
            </div>
            <p className="feedback-text">{selectedOption.feedback}</p>
          </div>
        )}

        {/* Botón para Avanzar */}
        {isAnswered && (
          <div className="dilemma-footer-action">
            <Button
              variant="primary"
              size="md"
              iconRight={<ArrowRight size={18} />}
              onClick={handleNextStep}
            >
              {stepIndex < totalSteps - 1 ? 'Siguiente Situación' : 'Finalizar Simulación'}
            </Button>
          </div>
        )}
      </Card>

      <div className="case-sim-back">
        <Button variant="ghost" iconLeft={<ArrowLeft size={16} />} onClick={onBackToCase}>
          Volver a la Lección Teórica
        </Button>
      </div>
    </div>
  )
}

CaseSimulationView.propTypes = {
  caseData: PropTypes.object.isRequired,
  onCompleteSimulation: PropTypes.func.isRequired,
  onBackToCase: PropTypes.func.isRequired,
}
