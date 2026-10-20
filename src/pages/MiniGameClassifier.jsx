import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  HeartHandshake,
  PhoneCall,
  Flame,
  Thermometer,
  AlertTriangle,
  Wind,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Gamepad2,
  HelpCircle,
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import minigamesData from '../data/minigames.json'
import './MiniGameClassifier.css'

const situationIcons = {
  Flame: Flame,
  Thermometer: Thermometer,
  AlertTriangle: AlertTriangle,
  Wind: Wind,
}

export default function MiniGameClassifier({ onFinishGame, onBack }) {
  const gameData = minigamesData.classifierGame
  const cards = gameData.cards

  const [cardIndex, setCardIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isGameCompleted, setIsGameCompleted] = useState(false)

  const currentCard = cards[cardIndex]
  const IconComponent = currentCard ? situationIcons[currentCard.icon] || HelpCircle : HelpCircle
  const totalCards = cards.length
  const progressPercent = Math.round(((cardIndex + (isAnswered ? 1 : 0)) / totalCards) * 100)

  // Manejar clasificación de la tarjeta
  const handleClassify = (categoryId) => {
    if (isAnswered) return

    setSelectedCategory(categoryId)
    setIsAnswered(true)

    if (categoryId === currentCard.correctCategory) {
      setCorrectCount((prev) => prev + 1)
    }
  }

  const handleNextCard = () => {
    if (cardIndex < totalCards - 1) {
      setCardIndex((prev) => prev + 1)
      setSelectedCategory(null)
      setIsAnswered(false)
    } else {
      setIsGameCompleted(true)
    }
  }

  const handleRestart = () => {
    setCardIndex(0)
    setSelectedCategory(null)
    setIsAnswered(false)
    setCorrectCount(0)
    setIsGameCompleted(false)
  }

  const totalPointsWon = correctCount * 10 + 20 // Puntos de competencia

  // Pantalla de Resultados del Triage
  if (isGameCompleted) {
    return (
      <div className="classifier-results-wrap animate-fade-in">
        <Card className="classifier-results-card" borderVariant="success">
          <Award size={52} className="celebration-star animate-float" />
          <Badge variant="success" size="md">Triage Escolar Completado</Badge>
          <h2 className="results-heading">Competencia en Triage y Criterio de Urgencia</h2>
          <p className="results-lead">
            Has clasificado correctamente {correctCount} de {totalCards} situaciones escolares de primeros auxilios.
          </p>

          <div className="results-stars-badge">
            <span className="stars-earned-text">+{totalPointsWon} Puntos de Competencia</span>
          </div>

          <div className="results-actions-row">
            <Button variant="outline" iconLeft={<RotateCcw size={18} />} onClick={handleRestart}>
              Repetir Triage
            </Button>
            <Button
              variant="success"
              size="lg"
              iconRight={<ArrowRight size={20} />}
              onClick={() => onFinishGame(totalPointsWon)}
            >
              Guardar Puntos y Continuar
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const isCorrect = selectedCategory === currentCard?.correctCategory

  return (
    <div className="minigame-classifier-page animate-fade-in">
      {/* Encabezado del Triage */}
      <header className="classifier-header">
        <div className="classifier-meta">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Volver a Módulos
          </Button>
          <Badge variant="secondary" icon={<Gamepad2 size={16} />}>
            Ejercicio Práctico de Triage
          </Badge>
        </div>

        <h1 className="classifier-title">{gameData.title}</h1>
        <p className="classifier-instruction" style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          {gameData.instruction}
        </p>
        <ProgressBar
          value={progressPercent}
          max={100}
          label={`Caso ${cardIndex + 1} de ${totalCards}`}
          showPercent
          color="primary"
        />
      </header>

      {/* Tarjeta de Situación Activa */}
      {currentCard && (
        <Card className="situation-card" borderVariant="primary">
          <div className="situation-card__badge-row">
            <Badge variant="neutral">Incidente Escolar #{cardIndex + 1}</Badge>
            <span className="aciertos-counter">Aciertos: {correctCount}</span>
          </div>

          <div className="situation-card__center">
            <div className="situation-icon-box">
              <IconComponent size={44} />
            </div>
            <p className="situation-description-text">{currentCard.situation}</p>
          </div>

          {/* Botones Dinámicos de Clasificación */}
          <div className="classification-actions-grid">
            {gameData.categories.map((cat) => {
              const isTargetCorrect = isAnswered && currentCard.correctCategory === cat.id
              const isSelectedWrong = isAnswered && selectedCategory === cat.id && !isCorrect

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`classify-btn classify-btn--${cat.color} ${
                    isTargetCorrect ? 'classify-btn--target-correct' : ''
                  } ${isSelectedWrong ? 'classify-btn--target-wrong' : ''}`}
                  onClick={() => handleClassify(cat.id)}
                  disabled={isAnswered}
                >
                  {cat.id === 'emergency_123' ? (
                    <PhoneCall size={28} className="classify-icon" />
                  ) : (
                    <HeartHandshake size={28} className="classify-icon" />
                  )}
                  <div>
                    <strong>{cat.name}</strong>
                    <span>{cat.description}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Feedback Didáctico */}
          {isAnswered && (
            <div
              className={`classifier-feedback animate-fade-in ${
                isCorrect ? 'feedback--good' : 'feedback--retry'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 size={28} className="feedback-icon-check" />
              ) : (
                <Lightbulb size={28} className="feedback-icon-hint" />
              )}
              <p>{currentCard.feedback}</p>
            </div>
          )}

          {/* Botón de Siguiente */}
          {isAnswered && (
            <div className="classifier-footer animate-fade-in">
              <Button
                variant="secondary"
                size="md"
                iconRight={<ArrowRight size={18} />}
                onClick={handleNextCard}
              >
                {cardIndex < totalCards - 1 ? 'Siguiente Situación' : 'Ver Puntuación Final ⭐'}
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

MiniGameClassifier.propTypes = {
  onFinishGame: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}
