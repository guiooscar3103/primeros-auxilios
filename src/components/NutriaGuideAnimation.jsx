import { useState } from 'react'
import PropTypes from 'prop-types'
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react'
import Button from './Button'
import Badge from './Badge'
import Card from './Card'
import './NutriaGuideAnimation.css'

export default function NutriaGuideAnimation({ incidentType = 'atragantamiento' }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  const scenes = {
    atragantamiento: [
      {
        title: 'Paso 1: Reconocer y Calmar',
        description: 'La nutria pequeña tose con dificultad. La nutria docente se coloca a su altura para verificar si puede emitir sonidos.',
        tip: 'Si tose con fuerza, anímala a seguir tosiendo sin tocar su espalda.',
      },
      {
        title: 'Paso 2: Abrazar por la Cintura',
        description: 'La nutria adulta se sitúa detrás de la pequeña, rodea su cintura con ambos brazos bajando su centro de gravedad.',
        tip: 'Mantén una postura firme para soportar el peso de la nutria pequeña.',
      },
      {
        title: 'Paso 3: Maniobra en "J" (Heimlich)',
        description: 'La nutria adulta cierra su patita en puño 2 dedos sobre el ombligo y empuja con energía hacia adentro y hacia arriba.',
        tip: 'Continúa los empujes hasta que el objeto sea expulsado.',
      },
    ],
    diente: [
      {
        title: 'Paso 1: Localizar el Diente Caído',
        description: 'Tras el golpe, la nutria adulta ubica la pieza dental en el suelo de la cancha.',
        tip: 'Actúa con rapidez: los primeros 30 a 60 minutos son decisivos.',
      },
      {
        title: 'Paso 2: Tomar Solo por la Corona',
        description: 'La nutria docente toma el diente exclusivamente por la corona blanca, dejando la raíz sin tocar.',
        tip: '¡NUNCA frotes la raíz con paños ni alcohol!',
      },
      {
        title: 'Paso 3: Sumergir en Leche Fría',
        description: 'Deposita el diente en un vasito con leche fresca. La nutria pequeña muerde una gasa suave para detener el sangrado.',
        tip: 'Traslado urgente al odontólogo de inmediato.',
      },
    ],
    rcp: [
      {
        title: 'Paso 1: Comprobar Respuesta',
        description: 'La nutria pequeña no responde. La nutria adulta sacude suavemente sus hombros y pide llamar al 123.',
        tip: 'Asigna a un colega específico la llamada y la búsqueda del DEA escolar.',
      },
      {
        title: 'Paso 2: Brazos Rectos en el Pecho',
        description: 'Coloca el talón de su patita en el centro del pecho con los codos bloqueados a 90 grados.',
        tip: 'Comprime fuerte y rápido: 100 a 120 compresiones por minuto.',
      },
      {
        title: 'Paso 3: Asistencia con el DEA',
        description: 'Abre el desfibrilador, coloca los parches autoadhesivos y sigue las instrucciones de voz.',
        tip: 'Nadie toca al paciente mientras el DEA analiza el ritmo.',
      },
    ],
    chichon: [
      {
        title: 'Paso 1: Evaluar Conciencia',
        description: 'La nutria pequeña llora tras golpearse la frente. La nutria docente le hace preguntas sencillas.',
        tip: 'Verifica que recuerde su nombre y dónde se encuentra.',
      },
      {
        title: 'Paso 2: Frío Local Indirecto',
        description: 'Aplica un paño limpio con hielo sobre el chichón durante 10 minutos sin presionar.',
        tip: 'Nunca apliques el hielo directo sobre la piel sin tela.',
      },
      {
        title: 'Paso 3: Vigilancia Activa',
        description: 'Mantén a la nutria pequeña en reposo sentado y vigila que no vomite ni se sienta somnolienta.',
        tip: 'Si vomita o se desorienta, activa la Línea 123.',
      },
    ],
    fractura: [
      {
        title: 'Paso 1: Calmar en la Misma Posición',
        description: 'La nutria pequeña se resbaló y le duele el brazo. La nutria adulta la acompaña sin mover el miembro.',
        tip: 'Nunca intentes halar o enderezar un hueso desviado.',
      },
      {
        title: 'Paso 2: Inmovilización con Férula Suave',
        description: 'Coloca un soporte rígido acolchado (cartón doblado con toalla) bajo el brazo lesionado.',
        tip: 'Sujeta suavemente con una venda sin cortar la circulación.',
      },
      {
        title: 'Paso 3: Reposo y Traslado Asistido',
        description: 'Aplica frío indirecto y coordina el traslado seguro al centro de ortopedia.',
        tip: 'Retira pulseras o anillos antes de que se inflame la mano.',
      },
    ],
  }

  const currentScenes = scenes[incidentType] || scenes.atragantamiento
  const activeScene = currentScenes[currentStep] || currentScenes[0]

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % currentScenes.length)
  }

  const handlePrev = () => {
    setCurrentStep((prev) => (prev === 0 ? currentScenes.length - 1 : prev - 1))
  }

  return (
    <Card className="nutria-guide-card" borderVariant="primary">
      <div className="nutria-guide-card__header">
        <div className="header-meta">
          <Badge variant="primary" icon={<Sparkles size={14} />}>
            Demostración Animada Guiada
          </Badge>
          <span className="mentor-label">Las Nutrias Guardianas de Primeros Auxilios</span>
        </div>
        <h3 className="scene-step-title">{activeScene.title}</h3>
      </div>

      {/* LIENZO DE ANIMACIÓN SVG VECTORIAL INTERACTIVA */}
      <div className={`animation-canvas animation-canvas--${incidentType} ${isPlaying ? 'is-animating' : ''}`}>
        <svg
          viewBox="0 0 500 280"
          className="nutria-svg-stage"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Animación ilustrativa de primeros auxilios con las nutrias"
        >
          {/* Fondo del Aula / Patio */}
          <rect x="0" y="0" width="500" height="280" fill="#f0f9ff" rx="12" />
          <path d="M 0 220 Q 250 215 500 220 L 500 280 L 0 280 Z" fill="#e0f2fe" />

          {/* ELEMENTOS SEGÚN EL CASO */}
          {incidentType === 'atragantamiento' && (
            <g className="scene-ovace">
              {/* Nutria Pequeña (Estudiante en Comedor) */}
              <g className="nutria-student" transform={`translate(${currentStep === 2 ? 220 : 200}, 90)`}>
                {/* Cuerpo */}
                <ellipse cx="60" cy="85" rx="32" ry="42" fill="#a16207" />
                <ellipse cx="60" cy="85" rx="24" ry="32" fill="#fef08a" />
                {/* Cabeza */}
                <circle cx="60" cy="40" r="28" fill="#a16207" />
                <circle cx="48" cy="20" r="8" fill="#78350f" />
                <circle cx="72" cy="20" r="8" fill="#78350f" />
                <ellipse cx="60" cy="45" rx="14" ry="10" fill="#fef08a" />
                <circle cx="60" cy="40" r="4" fill="#000" />
                {/* Ojos expresivos */}
                <circle cx="50" cy="34" r="3.5" fill="#000" />
                <circle cx="70" cy="34" r="3.5" fill="#000" />
                {/* Patitas al cuello o tos */}
                {currentStep === 0 ? (
                  <path d="M 42 75 Q 35 60 48 52" stroke="#78350f" strokeWidth="8" strokeLinecap="round" fill="none" />
                ) : (
                  <g className="student-hands-neck">
                    <path d="M 38 75 Q 45 48 56 46" stroke="#78350f" strokeWidth="7" strokeLinecap="round" fill="none" />
                    <path d="M 82 75 Q 75 48 64 46" stroke="#78350f" strokeWidth="7" strokeLinecap="round" fill="none" />
                  </g>
                )}
              </g>

              {/* Nutria Adulta (Docente Guía) */}
              <g className="nutria-mentor" transform={`translate(${currentStep === 0 ? 110 : 180}, 50)`}>
                {/* Cuerpo Grande */}
                <ellipse cx="60" cy="115" rx="42" ry="60" fill="#854d0e" />
                <ellipse cx="60" cy="115" rx="30" ry="45" fill="#fef9c3" />
                {/* Cabeza */}
                <circle cx="60" cy="48" r="34" fill="#854d0e" />
                <circle cx="44" cy="24" r="10" fill="#713f12" />
                <circle cx="76" cy="24" r="10" fill="#713f12" />
                <ellipse cx="60" cy="54" rx="16" ry="12" fill="#fef9c3" />
                <circle cx="60" cy="48" r="5" fill="#000" />
                <circle cx="50" cy="42" r="4" fill="#000" />
                <circle cx="70" cy="42" r="4" fill="#000" />
                {/* Brazos realizando Heimlich */}
                {currentStep === 2 && (
                  <g className="mentor-arms-heimlich">
                    <path d="M 20 100 Q 60 130 95 125" stroke="#713f12" strokeWidth="12" strokeLinecap="round" fill="none" />
                    <circle cx="95" cy="125" r="10" fill="#ca8a04" />
                    {/* Flecha ascendente de empuje en J */}
                    <path d="M 125 150 Q 125 110 115 95" stroke="#ef4444" strokeWidth="4" strokeDasharray="4 2" fill="none" />
                    <polygon points="110,95 120,85 125,98" fill="#ef4444" />
                  </g>
                )}
              </g>
            </g>
          )}

          {incidentType === 'diente' && (
            <g className="scene-dente">
              {/* Nutria Docente con vaso de leche */}
              <g transform="translate(140, 70)">
                <ellipse cx="60" cy="110" rx="40" ry="55" fill="#854d0e" />
                <circle cx="60" cy="48" r="32" fill="#854d0e" />
                <ellipse cx="60" cy="54" rx="16" ry="12" fill="#fef9c3" />
                <circle cx="60" cy="48" r="5" fill="#000" />
                <circle cx="50" cy="42" r="4" fill="#000" />
                <circle cx="70" cy="42" r="4" fill="#000" />
                {/* Vaso de leche en mano */}
                <rect x="95" y="90" width="34" height="48" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                <rect x="98" y="100" width="28" height="34" fill="#e0f2fe" />
                {/* Diente protegido dentro o tomado por corona */}
                <path d="M 112 85 C 108 78 116 78 112 85 Z" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
              </g>

              {/* Nutria Pequeña con gasa en la boca */}
              <g transform="translate(290, 110)">
                <ellipse cx="50" cy="80" rx="30" ry="38" fill="#a16207" />
                <circle cx="50" cy="40" r="26" fill="#a16207" />
                <rect x="42" y="44" width="16" height="10" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                <circle cx="42" cy="34" r="3" fill="#000" />
                <circle cx="58" cy="34" r="3" fill="#000" />
              </g>
            </g>
          )}

          {incidentType === 'rcp' && (
            <g className="scene-rcp">
              {/* Nutria en el suelo */}
              <g transform="translate(200, 175) rotate(-90)">
                <ellipse cx="40" cy="60" rx="25" ry="45" fill="#a16207" />
                <circle cx="40" cy="15" r="20" fill="#a16207" />
              </g>

              {/* Nutria Docente arrodillada con brazos rectos */}
              <g transform="translate(180, 50)">
                <ellipse cx="60" cy="80" rx="38" ry="42" fill="#854d0e" />
                <circle cx="60" cy="35" r="26" fill="#854d0e" />
                {/* Brazos firmes hacia abajo */}
                <line x1="60" y1="80" x2="60" y2="155" stroke="#713f12" strokeWidth="14" strokeLinecap="round" />
                <circle cx="60" cy="155" r="10" fill="#ca8a04" />
                {/* DEA al costado */}
                <rect x="140" y="110" width="46" height="38" rx="6" fill="#dc2626" />
                <circle cx="163" cy="125" r="9" fill="#fef08a" />
                <text x="163" y="129" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#000">⚡</text>
              </g>
            </g>
          )}

          {(incidentType === 'chichon' || incidentType === 'fractura') && (
            <g className="scene-care">
              {/* Nutria Docente aplicando compresa o férula */}
              <g transform="translate(150, 70)">
                <ellipse cx="60" cy="100" rx="38" ry="50" fill="#854d0e" />
                <circle cx="60" cy="40" r="28" fill="#854d0e" />
                <circle cx="60" cy="40" r="4" fill="#000" />
                <path d="M 85 90 Q 120 90 145 95" stroke="#713f12" strokeWidth="10" strokeLinecap="round" fill="none" />
                {incidentType === 'chichon' ? (
                  <rect x="140" y="80" width="28" height="22" rx="4" fill="#67e8f9" stroke="#0284c7" strokeWidth="2" />
                ) : (
                  <rect x="135" y="85" width="45" height="14" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                )}
              </g>

              {/* Nutria Pequeña en reposo */}
              <g transform="translate(280, 95)">
                <ellipse cx="50" cy="80" rx="30" ry="38" fill="#a16207" />
                <circle cx="50" cy="40" r="25" fill="#a16207" />
                <circle cx="43" cy="35" r="3" fill="#000" />
                <circle cx="57" cy="35" r="3" fill="#000" />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* DESCRIPCIÓN DEL PASO Y CONSEJO PEDAGÓGICO */}
      <div className="nutria-step-content">
        <p className="scene-instruction">{activeScene.description}</p>
        <div className="nutria-tip-pill">
          <CheckCircle2 size={16} className="tip-icon" />
          <span><strong>Consejo de la Nutria Mentora:</strong> {activeScene.tip}</span>
        </div>
      </div>

      {/* CONTROLES INTERACTIVOS */}
      <div className="nutria-controls-bar">
        <div className="step-dots">
          {currentScenes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`dot-btn ${currentStep === idx ? 'dot-btn--active' : ''}`}
              onClick={() => setCurrentStep(idx)}
              aria-label={`Ver paso ${idx + 1}`}
            />
          ))}
        </div>

        <div className="nav-actions">
          <Button variant="outline" size="sm" onClick={handlePrev}>
            Anterior
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            iconLeft={isPlaying ? <Pause size={14} /> : <Play size={14} />}
          >
            {isPlaying ? 'Pausar' : 'Animar'}
          </Button>
          <Button variant="primary" size="sm" onClick={handleNext}>
            Siguiente Paso
          </Button>
        </div>
      </div>
    </Card>
  )
}

NutriaGuideAnimation.propTypes = {
  incidentType: PropTypes.oneOf(['atragantamiento', 'diente', 'rcp', 'chichon', 'fractura']),
}
