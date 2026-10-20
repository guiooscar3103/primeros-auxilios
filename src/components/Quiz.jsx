import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Star,
  Award,
  HelpCircle,
  Sparkles,
  PhoneCall,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Eye,
  Flame,
  HeartHandshake,
} from 'lucide-react'
import Card from './Card'
import Button from './Button'
import Badge from './Badge'
import ProgressBar from './ProgressBar'
import './Quiz.css'

const quizIcons = {
  PhoneCall: PhoneCall,
  MapPin: MapPin,
  ShieldCheck: ShieldCheck,
  AlertTriangle: AlertTriangle,
  Eye: Eye,
  Flame: Flame,
  HeartHandshake: HeartHandshake,
}

export default function Quiz({
  questions = [],
  missionTitle = 'Quiz de Entrenamiento',
  starsPerQuestion = 10,
  onFinishQuiz,
  onExitQuiz,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const totalQuestions = questions.length
  const currentQuestion = questions[currentIndex]
  const IconComponent = currentQuestion ? quizIcons[currentQuestion.icon] || HelpCircle : HelpCircle

  const progressPercent = Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / totalQuestions) * 100)

  // Manejador al seleccionar una opción
  const handleSelectOption = (option) => {
    if (hasAnswered) return // Bloquea cambios una vez seleccionada la respuesta

    setSelectedOptionId(option.id)
    setHasAnswered(true)

    if (option.isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1)
    }
  }

  // Avanzar a la siguiente pregunta o mostrar pantalla final
  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOptionId(null)
      setHasAnswered(false)
    } else {
      setIsCompleted(true)
    }
  }

  // Reiniciar el quiz para repasar
  const handleRestartQuiz = () => {
    setCurrentIndex(0)
    setSelectedOptionId(null)
    setHasAnswered(false)
    setCorrectAnswersCount(0)
    setIsCompleted(false)
  }

  // Total de estrellas ganadas
  const totalStarsEarned = Math.max(correctAnswersCount * starsPerQuestion, 10) // Al menos 10 por intentarlo

  // PANTALLA FINAL DE RESULTADOS
  if (isCompleted) {
    return (
      <section className="quiz-results-container animate-fade-in">
        <Card className="quiz-results-card" borderVariant="success">
          <div className="results-celebration">
            <Sparkles size={52} className="celebration-star animate-float" />
            <Badge variant="success" size="md" icon={<Award size={16} />}>
              ¡Reto de Conocimiento Completado!
            </Badge>
            <h2 className="results-title">¡Gran Trabajo, Superdetective!</h2>
            <p className="results-subtitle">
              Has demostrado que sabes cómo reaccionar y pedir ayuda ante una emergencia.
            </p>
          </div>

          <div className="results-stats-row">
            <div className="result-stat-box">
              <span className="stat-value">{correctAnswersCount} de {totalQuestions}</span>
              <span className="stat-desc">Preguntas Acertadas</span>
            </div>

            <div className="result-stat-box highlight-stat">
              <div className="stars-earned-wrap">
                <Star size={24} className="star-icon-gold" />
                <span className="stat-value">+{totalStarsEarned}</span>
              </div>
              <span className="stat-desc">Estrellas Ganadas</span>
            </div>
          </div>

          <div className="results-actions">
            <Button
              variant="outline"
              iconLeft={<RotateCcw size={18} />}
              onClick={handleRestartQuiz}
            >
              Repasar Preguntas
            </Button>

            <Button
              variant="success"
              size="lg"
              iconRight={<ArrowRight size={20} />}
              onClick={() => onFinishQuiz(totalStarsEarned, correctAnswersCount)}
            >
              ¡Reclamar Estrellas y Continuar!
            </Button>
          </div>
        </Card>
      </section>
    )
  }

  const selectedOption = currentQuestion?.options.find((o) => o.id === selectedOptionId)

  return (
    <div className="quiz-container animate-fade-in">
      {/* Barra de progreso superior del Quiz */}
      <header className="quiz-header">
        <div className="quiz-header__meta">
          <span className="quiz-mission-name">{missionTitle}</span>
          <Button variant="ghost" size="sm" onClick={onExitQuiz}>
            Salir del Reto
          </Button>
        </div>

        <ProgressBar
          value={progressPercent}
          max={100}
          label={`Pregunta ${currentIndex + 1} de ${totalQuestions}`}
          showPercent
          color="secondary"
        />
      </header>

      {/* Tarjeta de Pregunta Activa */}
      {currentQuestion && (
        <Card className="quiz-card" borderVariant="primary">
          <div className="question-header">
            <div className="question-icon-badge">
              <IconComponent size={28} />
            </div>
            <div>
              <Badge variant="primary" size="sm">
                Desafío de Héroe
              </Badge>
              <h1 className="question-text">{currentQuestion.question}</h1>
            </div>
          </div>

          {/* Lista de Opciones */}
          <div className="options-list" role="radiogroup" aria-label="Opciones de respuesta">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id
              let optionClass = 'quiz-option-btn'

              if (hasAnswered) {
                if (option.isCorrect) {
                  optionClass += ' quiz-option-btn--correct'
                } else if (isSelected && !option.isCorrect) {
                  optionClass += ' quiz-option-btn--incorrect'
                } else {
                  optionClass += ' quiz-option-btn--dimmed'
                }
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  className={optionClass}
                  onClick={() => handleSelectOption(option)}
                  disabled={hasAnswered}
                  aria-pressed={isSelected}
                >
                  <span className="option-letter-badge">{option.letter}</span>
                  <span className="option-label">{option.text}</span>
                  {hasAnswered && option.isCorrect && (
                    <CheckCircle2 size={22} className="option-status-icon correct" />
                  )}
                  {hasAnswered && isSelected && !option.isCorrect && (
                    <Lightbulb size={22} className="option-status-icon hint" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Panel de Retroalimentación Inmediata */}
          {hasAnswered && selectedOption && (
            <div
              className={`quiz-feedback-box animate-fade-in ${
                selectedOption.isCorrect ? 'feedback--correct' : 'feedback--hint'
              }`}
            >
              <div className="feedback-icon-col">
                {selectedOption.isCorrect ? (
                  <CheckCircle2 size={32} className="feedback-check" />
                ) : (
                  <Lightbulb size={32} className="feedback-lightbulb" />
                )}
              </div>
              <div className="feedback-text-col">
                <strong className="feedback-title">
                  {selectedOption.isCorrect
                    ? '¡Respuesta Brillante!'
                    : '¡Buen intento! Te enseñamos el porqué:'}
                </strong>
                <p className="feedback-explanation">{selectedOption.feedback}</p>
              </div>
            </div>
          )}

          {/* Pie con botón de avance */}
          {hasAnswered && (
            <div className="quiz-footer-actions animate-fade-in">
              <Button
                variant="secondary"
                size="md"
                iconRight={<ArrowRight size={18} />}
                onClick={handleNextQuestion}
              >
                {currentIndex < totalQuestions - 1 ? 'Siguiente Pregunta' : 'Ver Resultados ⭐'}
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      icon: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          letter: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          isCorrect: PropTypes.bool.isRequired,
          feedback: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  missionTitle: PropTypes.string,
  starsPerQuestion: PropTypes.number,
  onFinishQuiz: PropTypes.func.isRequired,
  onExitQuiz: PropTypes.func.isRequired,
}
