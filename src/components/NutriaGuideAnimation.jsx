import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Play,
  Pause,
  Heart,
  Video,
  Image as ImageIcon,
  ShieldAlert,
  Clock,
  Activity,
  Check,
  X,
  Milk,
  Zap,
} from 'lucide-react'
import Button from './Button'
import Badge from './Badge'
import Card from './Card'
import { EMERGENCY_NUMBER, getAssetUrl } from '../utils/constants'
import './NutriaGuideAnimation.css'

export default function NutriaGuideAnimation({ incidentType = 'atragantamiento' }) {
  // Modalidades: 'secuencia' (demostración visual interactiva), 'infografia' (lámina oficial) o 'video' (video animado)
  const [viewMode, setViewMode] = useState('secuencia')
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // Estados interactivos específicos
  const [isJStrokeActive, setIsJStrokeActive] = useState(false)
  const [isMetronomeActive, setIsMetronomeActive] = useState(false)
  const [compressionCount, setCompressionCount] = useState(0)

  // Metrónomo visual para RCP a 110 cpm (~545ms por latido)
  useEffect(() => {
    let interval = null
    if (isMetronomeActive) {
      interval = setInterval(() => {
        setCompressionCount((prev) => (prev % 30) + 1)
      }, 545)
    } else {
      setCompressionCount(0)
    }
    return () => clearInterval(interval)
  }, [isMetronomeActive])

  // Resetear estados al cambiar de caso
  useEffect(() => {
    setCurrentStepIndex(0)
    setIsMetronomeActive(false)
    setIsJStrokeActive(false)
  }, [incidentType])

  // Láminas infográficas oficiales de alta resolución
  const incidentIllustrations = {
    atragantamiento: {
      src: '/images/situaciones/atragantamiento/comparativa-tos-vs-asfixia.png',
      alt: 'Nutria Doc demostrando la diferencia entre tos asistida y asfixia por atragantamiento',
      title: 'Infografía Médica: Tos Asistida vs. Maniobra de Heimlich',
      keyTakeaway:
        'Si el estudiante tose con fuerza y habla: ¡animar a toser! Si no puede respirar ni emitir sonido: compresiones abdominales en J hacia adentro y arriba.',
    },
    diente: {
      src: '/images/situaciones/traumatismo-dental/infografia-medios-transporte.png',
      alt: 'Nutria Doc demostrando los medios seguros de transporte dental: leche fría o solución salina',
      title: 'Infografía Médica: Conservación y Transporte del Diente Caído',
      keyTakeaway:
        'Tomar siempre de la corona, nunca de la raíz. Sumergir en leche entera fría o suero salino. Evitar saliva suelta en niños por riesgo de asfixia.',
    },
    rcp: {
      src: '/images/situaciones/sospecha-infarto/demostracion-rcp-dea.png',
      alt: 'Nutria Doc demostrando RCP de alta calidad con brazos a 90° y uso del DEA',
      title: 'Infografía Médica: RCP de Alta Calidad y Desfibrilación (DEA)',
      keyTakeaway:
        '100-120 compresiones por minuto a 5 cm de profundidad con codos bloqueados. Abrir el DEA y conectar parches de inmediato siguiendo los comandos de voz.',
    },
    chichon: {
      src: '/images/situaciones/golpes-cabeza/infografia-frio-indirecto-monedas.png',
      alt: 'Nutria Doc aplicando frío indirecto con paño limpio y prohibiendo monedas o fricción',
      title: 'Infografía Médica: Frío Indirecto Seguro vs. Prácticas Caseras Peligrosas',
      keyTakeaway:
        'Hielo siempre envuelto en tela limpia durante 15 minutos. Prohibido presionar con monedas, frotar o usar alcohol. Vigilar vómitos o somnolencia anormal.',
    },
    fractura: {
      src: '/images/situaciones/fractura-inmovilizacion/infografia-protocolo-rice.jpeg',
      alt: 'Nutria Doc ilustrando el protocolo R.I.C.E. y la inmovilización sin forzar el hueso',
      title: 'Infografía Médica: Protocolo R.I.C.E. e Inmovilización Segura',
      keyTakeaway:
        'Inmovilizar en la misma posición en que quedó con férula acolchada. No halar el miembro. Protocolo R.I.C.E. para torceduras; evitar sobijos.',
    },
  }

  // Guías y secuencias interactivas especializadas por caso
  const incidentGuides = {
    atragantamiento: {
      title: 'Maniobra de Desobstrucción de la Vía Aérea (OVACE)',
      subtitle: 'Reconocimiento de asfixia y técnica de empujes abdominales en J',
      steps: [
        {
          stepNumber: 1,
          title: 'Reconocer: ¿Tos Eficaz o Asfixia Total?',
          situation: 'El estudiante tose de repente en el comedor escolar o se lleva las manos al cuello tras ingerir un alimento.',
          action: 'Ponte a su altura de frente. Pregúntale con calma: "¿Te estás ahogando?". Observa si puede emitir sonidos, hablar o toser con fuerza.',
          caution: 'Si tose con energía y puede hablar: ¡ANÍMALO A TOSER! NUNCA golpees la espalda si tose fuerte, ya que el impacto puede enclavar el objeto más abajo.',
          ruleType: 'reconocimiento',
          visualType: 'tos-vs-asfixia',
          docTip: 'La tos vigorosa es el mecanismo fisiológico más potente para expulsar un cuerpo extraño.',
        },
        {
          stepNumber: 2,
          title: 'Posicionamiento y Base de Apoyo',
          situation: 'El niño no puede toser, no emite sonido, su piel empieza a palidecer y muestra angustia evidente (signo universal de asfixia).',
          action: 'Ponte de pie detrás de él. Pasa tus brazos por debajo de sus axilas y rodea su cintura. Coloca una de tus piernas entre las suyas para tener una base firme si pierde el equilibrio.',
          caution: 'Inclina ligeramente su torso hacia adelante para que el objeto expulsado caiga hacia afuera y no regrese a la tráquea.',
          ruleType: 'postura',
          visualType: 'postura-apoyo',
          docTip: 'Tu propia estabilidad es vital: si el niño pierde el conocimiento, tu pierna central soportará su peso de forma segura.',
        },
        {
          stepNumber: 3,
          title: 'Empujes Abdominales en "J" (Heimlich)',
          situation: 'Vía aérea completamente bloqueada. Se requiere generar presión intratorácica artificial.',
          action: 'Cierra una mano en puño con el pulgar hacia adentro, colócalo dos dedos por encima del ombligo (lejos de las costillas). Cubre el puño con la otra mano y presiona con fuerza hacia adentro y hacia arriba en un movimiento continuo en forma de "J".',
          caution: 'Repite empujes individuales y definidos hasta que el objeto salga o la persona pierda la conciencia. Si colapsa en el suelo, activa Línea 123 e inicia RCP inmediatamente.',
          ruleType: 'accion-clave',
          visualType: 'vector-heimlich',
          docTip: 'Cada empuje debe ser un intento independiente para desobstruir la vía aérea.',
        },
      ],
    },
    diente: {
      title: 'Manejo ante la Caída Completa de un Diente (Avulsión)',
      subtitle: 'Preservación de las células de la raíz y transporte seguro en leche o solución salina',
      steps: [
        {
          stepNumber: 1,
          title: 'Localizar y Tomar Solo por la Corona',
          situation: 'Tras un golpe en la cancha o recreo, un diente permanente sale completamente de la encía y cae al suelo.',
          action: 'Ubica de inmediato la pieza dental. Sujétala exclusivamente por la corona (la parte blanca y ancha que se usa para masticar). Deja la raíz intacta sin tocar.',
          caution: '¡NUNCA toques, raspes ni frotes la raíz con pañuelos, gasas o alcohol! Las células vivas del ligamento periodontal mueren por fricción impidiendo el reimplante.',
          ruleType: 'accion-clave',
          visualType: 'corona-vs-raiz',
          docTip: 'El éxito del reimplante depende de que las células microscópicas de la raíz permanezcan vivas y húmedas.',
        },
        {
          stepNumber: 2,
          title: 'Medio de Transporte: Leche Fría o Suero Salino',
          situation: 'El diente está fuera de la boca y se deshidrata rápidamente si queda expuesto al aire libre.',
          action: 'Sumerge el diente en un vaso con leche entera fresca fría o solución salina estéril. Si el diente tiene tierra visible, enjuágalo 5 segundos bajo un hilo suave de leche o suero antes de sumergirlo.',
          caution: '¡PELIGRO!: En niños de primaria NO dejes el diente suelto dentro de su boca o mejilla, porque el llanto y el shock causan riesgo de aspiración a los pulmones y asfixia. Tampoco lo sumerjas en agua del grifo.',
          ruleType: 'cuidado-seguro',
          visualType: 'leche-vs-saliva',
          docTip: 'La leche entera fría provee el pH y osmolaridad óptimos para mantener nutridas las células hasta llegar al odontólogo.',
        },
        {
          stepNumber: 3,
          title: 'Control de Hemorragia y Traslado Urgente (< 60 min)',
          situation: 'El hueco de la encía (alvéolo) sangra activamente tras la pérdida del diente.',
          action: 'Pide al estudiante que muerda suavemente una gasa limpia o paño estéril doblado sobre el alvéolo durante 15 minutos para cohibir el sangrado. Traslada al niño y el vaso con el diente de urgencia al odontólogo.',
          caution: 'La ventana de oro es de 30 a 60 minutos. Cada minuto que el diente pase seco o sin atención disminuye drásticamente las probabilidades de salvarlo.',
          ruleType: 'emergencia-critica',
          visualType: 'gasa-y-tiempo',
          docTip: 'Avísale al odontólogo antes de llegar para que tenga preparado el material de fijación y reimplante inmediato.',
        },
      ],
    },
    rcp: {
      title: 'Reanimación Cardiopulmonar (RCP) y Desfibrilador (DEA)',
      subtitle: 'Compresiones torácicas de alta calidad y desfibrilación precoz',
      steps: [
        {
          stepNumber: 1,
          title: 'Reconocer: Infarto Consciente vs. Paro Cardíaco',
          situation: 'Un adulto o estudiante se descompensa en el pasillo o patio escolar.',
          action: 'Distingue de inmediato: Si la persona está CONSCIENTE con dolor opresivo en el pecho, colócala en reposo semi-sentado y llama al 123. Si está INCONSCIENTE y NO respira normalmente (solo jadea o no se mueve), está en PARO CARDÍACO.',
          caution: 'Ante un paro: Señala a un adulto específico: "¡Tú, llama al 123 y trae el DEA del colegio ya!". No te apartes de la víctima.',
          ruleType: 'reconocimiento',
          visualType: 'infarto-vs-paro',
          docTip: 'El jadeo o respiración agónica ("gasping") NO es respiración normal; es un signo claro de paro cardíaco.',
        },
        {
          stepNumber: 2,
          title: 'Compresiones a 90° con Ritmo de 100-120 cpm',
          situation: 'La sangre no circula y el cerebro se queda sin oxígeno a partir de los 4 minutos.',
          action: 'Arrodíllate junto a la víctima. Coloca el talón de una mano en el centro del pecho (mitad inferior del esternón) y la otra mano entrelazada encima. Con los codos bloqueados a 90°, comprime fuerte (5 cm) y rápido permitiendo la descompresión completa.',
          caution: 'Mantén un ritmo constante de 100 a 120 compresiones por minuto (al ritmo de "Stayin\' Alive"). No dobles los brazos para no cansarte rápidamente.',
          ruleType: 'accion-clave',
          visualType: 'metronomo-rcp',
          docTip: 'Usa el peso de tu torso superior al bajar en vez de hacer fuerza con los brazos.',
        },
        {
          stepNumber: 3,
          title: 'Conexión y Seguridad del DEA',
          situation: 'Llega el Desfibrilador Externo Automático (DEA) al lugar del incidente.',
          action: 'Abre y enciende el DEA de inmediato. Pega los electrodos en el pecho seco y desnudo: uno debajo de la clavícula derecha y otro en el costado izquierdo bajo la axila. Sigue las instrucciones de voz del equipo.',
          caution: 'Cuando el DEA indique "Analizando el ritmo" o "Se aconseja descarga", grita fuerte con ambos brazos extendidos: "¡NADIE TOQUE AL PACIENTE, TODOS FUERA!". Pulsa el botón de descarga solo cuando nadie esté en contacto.',
          ruleType: 'emergencia-critica',
          visualType: 'parches-dea',
          docTip: 'El DEA es 100% seguro: nunca administrará una descarga a quien no la necesite.',
        },
      ],
    },
    chichon: {
      title: 'Valoración y Manejo de Golpes en la Cabeza',
      subtitle: 'Aplicación segura de frío indirecto y detección de señales de alarma neurológicas',
      steps: [
        {
          stepNumber: 1,
          title: 'Valorar Consciencia y Orientación',
          situation: 'Un escolar choca de cabeza contra otro compañero o contra el suelo durante el recreo.',
          action: 'Acércate con calma, pon tus ojos a su nivel. Pregúntale con voz tranquila: "¿Cómo te llamas?", "¿Dónde estamos?", "¿Qué estábamos haciendo?". Observa si llora de inmediato o si estuvo desconectado unos segundos.',
          caution: 'No permitas que se incorpore corriendo ni que continúe jugando de inmediato. Si perdió el conocimiento aunque sea por 5 segundos, avisa a coordinación y padres.',
          ruleType: 'reconocimiento',
          visualType: 'valoracion-conciencia',
          docTip: 'Un llanto vigoroso e inmediato suele ser buena señal; el silencio o mirada perdida exigen mayor alerta.',
        },
        {
          stepNumber: 2,
          title: 'Aplicación de Frío Indirecto Seguro',
          situation: 'Aparece un chichón (hematoma subgaleal) o inflamación en la frente tras el golpe.',
          action: 'Envuelve cubitos de hielo o una compresa fría en un paño limpio o toalla seca. Aplícalo suavemente sobre la zona inflamada durante 10 a 15 minutos con descansos de 5 minutos.',
          caution: '¡PROHIBIDO!: Nunca presiones con una moneda, cuchara o piedra para "bajar" el chichón; la presión rompe más capilares y genera hematomas profundos. Nunca pongas hielo directo sobre la piel sin tela ni apliques alcohol alcanforado.',
          ruleType: 'cuidado-seguro',
          visualType: 'frio-vs-monedas',
          docTip: 'El frío indirecto produce vasoconstricción local, aliviando el dolor y conteniendo el edema de forma segura.',
        },
        {
          stepNumber: 3,
          title: 'Vigilancia Activa de Señales de Alarma (Línea 123)',
          situation: 'El niño permanece en reposo en la enfermería o aula tras el impacto.',
          action: 'Vigila los síntomas durante las horas siguientes. Si presenta vómitos repetidos, somnolencia anormal (no se despierta con estímulos normales), dolor de cabeza progresivo o pupilas de diferente tamaño (anisocoria), activa de inmediato la Línea 123.',
          caution: '¡NO esperes 24 horas si aparecen señales de alarma! La observación en casa o colegio solo aplica si el estudiante está 100% lúcido, activo y sin ningún síntoma neurológico.',
          ruleType: 'emergencia-critica',
          visualType: 'banderas-rojas',
          docTip: 'Ante vómito en proyectil o somnolencia que empeora, el traslado en ambulancia es impostergable.',
        },
      ],
    },
    fractura: {
      title: 'Inmovilización de Fracturas y Protocolo R.I.C.E.',
      subtitle: 'Soporte anatómico sin tracción y manejo seguro de articulaciones torcidas',
      steps: [
        {
          stepNumber: 1,
          title: 'Examen Visual sin Mover la Extremidad',
          situation: 'Un alumno cae de las escaleras o resbala en educación física, presentando deformidad ósea en el antebrazo o dolor extremo en el tobillo.',
          action: 'Tranquiliza al estudiante en el lugar donde cayó. Examina la zona lesionada retirando visualmente la tela si es holgada, pero sin forzar ni tirar de prendas ajustadas.',
          caution: '¡REGLA DE ORO!: NUNCA intentes jalar, enderezar ni "acomodar" el hueso torcido. Mover extremos fracturados puede seccionar arterias o nervios causando daño irreversible.',
          ruleType: 'reconocimiento',
          visualType: 'no-traccionar',
          docTip: 'El dolor intenso y la deformidad "en tenedor" son signos de presunción de fractura que requieren radiografías.',
        },
        {
          stepNumber: 2,
          title: 'Inmovilizar con Soporte Rígido Acolchado',
          situation: 'Se debe estabilizar el miembro para evitar que se mueva durante la espera o traslado.',
          action: 'Usa un soporte rígido improvisado (cartón doblado, tablilla o revista gruesa) envuelto en una toalla o paño suave. Fíjalo con una venda elástica o cinta suave por arriba y por abajo de la articulación afectada, exactamente en la posición en que quedó.',
          caution: 'No aprietes excesivamente la venda. Revisa periódicamente los dedos: deben permanecer tibios, rosados y con sensibilidad.',
          ruleType: 'accion-clave',
          visualType: 'ferula-acolchada',
          docTip: 'Inmoviliza siempre la articulación superior y la inferior al foco de la fractura.',
        },
        {
          stepNumber: 3,
          title: 'Protocolo R.I.C.E. y Retiro Preventivo',
          situation: 'En torceduras sin deformidad ósea (esguinces) se produce inflamación progresiva (edema).',
          action: 'Aplica el protocolo R.I.C.E.: Reposo (Rest), Hielo cubierto con paño (Ice), Compresión elástica suave (Compression) y Elevación del miembro por encima del corazón (Elevation). Retira de inmediato anillos, pulseras y reloj antes de que la inflamación corte el flujo sanguíneo.',
          caution: '¡PROHIBIDO!: No permitas sobijos, masajes con pomadas calientes ni alcohol alcanforado. El masaje rompe más fibras ligamentosas y agrava el derrame interno.',
          ruleType: 'cuidado-seguro',
          visualType: 'protocolo-rice',
          docTip: 'Retirar los anillos en los primeros 10 minutos evita tener que cortarlos después con sierra en urgencias.',
        },
      ],
    },
  }

  const guideData = incidentGuides[incidentType] || incidentGuides.atragantamiento
  const steps = guideData.steps
  const currentStep = steps[currentStepIndex] || steps[0]
  const illustration = incidentIllustrations[incidentType] || incidentIllustrations.atragantamiento

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % steps.length)
  }

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
  }

  // RENDERIZADO DEL ESCENARIO VISUAL ESPECIALIZADO POR TIPO
  const renderVisualStage = (visualType) => {
    switch (visualType) {
      // 1. Atragantamiento: Tos vs Asfixia
      case 'tos-vs-asfixia':
        return (
          <div className="visual-stage-card stage-tos-vs-asfixia">
            <div className="compare-split-grid">
              <div className="compare-col compare-col--safe">
                <div className="compare-header">
                  <CheckCircle2 size={20} className="compare-icon compare-icon--safe" />
                  <span className="compare-badge compare-badge--safe">Tos Eficaz (Leve)</span>
                </div>
                <div className="compare-visual-box">
                  <div className="person-avatar-circle person-avatar-circle--safe">
                    <span>🗣️</span>
                  </div>
                  <ul className="compare-features-list">
                    <li>✓ Tose con fuerza y energía</li>
                    <li>✓ Puede emitir sonidos y hablar</li>
                    <li>✓ Color de piel normal o sonrojado</li>
                  </ul>
                </div>
                <div className="compare-action-pill compare-action-pill--safe">
                  <strong>Acción:</strong> ¡Animar a toser! No dar golpes.
                </div>
              </div>

              <div className="compare-col compare-col--danger">
                <div className="compare-header">
                  <AlertTriangle size={20} className="compare-icon compare-icon--danger" />
                  <span className="compare-badge compare-badge--danger">Asfixia Total (Grave)</span>
                </div>
                <div className="compare-visual-box">
                  <div className="person-avatar-circle person-avatar-circle--danger">
                    <span>🫁</span>
                  </div>
                  <ul className="compare-features-list">
                    <li>✗ No puede toser ni emitir sonido</li>
                    <li>✗ Se lleva ambas manos al cuello</li>
                    <li>✗ Labios y piel azulados (cianosis)</li>
                  </ul>
                </div>
                <div className="compare-action-pill compare-action-pill--danger">
                  <strong>Acción:</strong> Maniobra de Heimlich de inmediato.
                </div>
              </div>
            </div>
          </div>
        )

      // 2. Atragantamiento: Postura y base de apoyo
      case 'postura-apoyo':
        return (
          <div className="visual-stage-card stage-postura-apoyo">
            <div className="diagram-card-inner">
              <div className="biomechanic-box">
                <div className="posture-icon-badge">
                  <Activity size={24} />
                </div>
                <h4 className="biomechanic-title">Biomecánica de la Base de Soporte</h4>
                <div className="posture-steps-horizontal">
                  <div className="posture-step-item">
                    <span className="posture-num">1</span>
                    <strong>Ubicación posterior</strong>
                    <p>Sitúate justo detrás del niño, bajando tu centro de gravedad.</p>
                  </div>
                  <div className="posture-step-item">
                    <span className="posture-num">2</span>
                    <strong>Pierna de anclaje</strong>
                    <p>Coloca un pie entre las piernas del estudiante para sostenerlo si colapsa.</p>
                  </div>
                  <div className="posture-step-item">
                    <span className="posture-num">3</span>
                    <strong>Inclinación anterior</strong>
                    <p>Inclina su tronco hacia adelante para facilitar la salida del objeto.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      // 3. Atragantamiento: Vector Heimlich en "J"
      case 'vector-heimlich':
        return (
          <div className="visual-stage-card stage-vector-heimlich">
            <div className="heimlich-interactive-box">
              <div className="heimlich-vector-display">
                <div className={`vector-torso ${isJStrokeActive ? 'vector-torso--active' : ''}`}>
                  <div className="anatomical-ribs">Costillas</div>
                  <div className="anatomical-target">
                    <span className="target-pulse-circle" />
                    <span className="target-label">2 dedos sobre el ombligo</span>
                  </div>
                  <div className={`vector-arrow-j ${isJStrokeActive ? 'vector-arrow-j--push' : ''}`}>
                    <span className="arrow-text">Empuje en "J" (Adentro y Arriba)</span>
                    <span className="arrow-indicator">⤴</span>
                  </div>
                  <div className="anatomical-navel">Ombligo</div>
                </div>
              </div>
              <div className="heimlich-controls">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setIsJStrokeActive(true)
                    setTimeout(() => setIsJStrokeActive(false), 900)
                  }}
                  iconLeft={<Zap size={16} />}
                >
                  {isJStrokeActive ? '¡Comprimiendo hacia adentro y arriba!' : 'Simular Empuje en "J"'}
                </Button>
                <span className="vector-helper-text">
                  Presiona el botón para visualizar la dirección biomecánica del vector de desobstrucción.
                </span>
              </div>
            </div>
          </div>
        )

      // 4. Traumatismo Dental: Corona vs Raíz
      case 'corona-vs-raiz':
        return (
          <div className="visual-stage-card stage-corona-raiz">
            <div className="tooth-anatomy-grid">
              <div className="tooth-part-box tooth-part-box--safe">
                <div className="tooth-zone-tag tooth-zone-tag--safe">
                  <Check size={16} /> Zona Segura de Agarre
                </div>
                <div className="tooth-illustration-crown">
                  <span className="tooth-emoji">🦷</span>
                  <span className="tooth-name">Corona Clínica Blanca</span>
                </div>
                <p className="tooth-desc">
                  La parte visible y masticatoria del diente. Está protegida por esmalte inanimado y se puede manipular con seguridad.
                </p>
              </div>

              <div className="tooth-part-box tooth-part-box--danger">
                <div className="tooth-zone-tag tooth-zone-tag--danger">
                  <X size={16} /> Zona Prohibida (No Tocar)
                </div>
                <div className="tooth-illustration-root">
                  <span className="root-danger-zone">Ligamento Periodontal</span>
                  <span className="tooth-name">Raíz Amarillenta</span>
                </div>
                <p className="tooth-desc">
                  Recubierta por millones de células vivas microscópicas. Si se raspa o seca, el cuerpo rechazará el diente en el reimplante.
                </p>
              </div>
            </div>
          </div>
        )

      // 5. Traumatismo Dental: Leche vs Saliva
      case 'leche-vs-saliva':
        return (
          <div className="visual-stage-card stage-leche-saliva">
            <div className="transport-compare-grid">
              <div className="transport-item transport-item--ideal">
                <div className="transport-icon-wrap transport-icon-wrap--milk">
                  <Milk size={32} />
                </div>
                <h4 className="transport-title">Leche Entera Fría (Ideal)</h4>
                <p className="transport-lead">Estándar de Oro en Primeros Auxilios</p>
                <ul className="transport-bullets">
                  <li>✓ Nutre las células con proteínas y calcio</li>
                  <li>✓ Mantiene la osmolaridad óptima</li>
                  <li>✓ Alternativa: Solución salina estéril en enfermería</li>
                </ul>
              </div>

              <div className="transport-item transport-item--hazard">
                <div className="transport-icon-wrap transport-icon-wrap--hazard">
                  <ShieldAlert size={32} />
                </div>
                <h4 className="transport-title">Peligro Crítico con Saliva</h4>
                <p className="transport-lead">Riesgo de Broncoaspiración en Niños</p>
                <ul className="transport-bullets">
                  <li>⚠️ <strong>NUNCA</strong> dejar el diente suelto dentro de la boca de un niño</li>
                  <li>⚠️ El shock o llanto puede hacer que se lo trague a los pulmones causando asfixia</li>
                  <li>❌ Tampoco usar agua del grifo (hace estallar las células)</li>
                </ul>
              </div>
            </div>
          </div>
        )

      // 6. Traumatismo Dental: Gasa y tiempo
      case 'gasa-y-tiempo':
        return (
          <div className="visual-stage-card stage-gasa-tiempo">
            <div className="timer-priority-box">
              <div className="clock-highlight-circle">
                <Clock size={36} className="clock-pulse" />
                <span className="clock-metric">30 - 60 min</span>
              </div>
              <div className="timer-priority-content">
                <h4 className="timer-title">Ventana Terapéutica Máxima</h4>
                <p className="timer-text">
                  El reimplante exitoso requiere que el odontólogo fije el diente en su alvéolo antes de cumplirse 60 minutos de la caída.
                </p>
                <div className="timer-gasa-note">
                  <CheckCircle2 size={16} />
                  <span>Mordisco firme sobre gasa doblada para detener el sangrado en el colegio mientras se realiza el traslado.</span>
                </div>
              </div>
            </div>
          </div>
        )

      // 7. RCP: Infarto vs Paro
      case 'infarto-vs-paro':
        return (
          <div className="visual-stage-card stage-infarto-paro">
            <div className="triage-dilemma-grid">
              <div className="triage-box triage-box--infarto">
                <span className="triage-type-tag">Persona Consciente</span>
                <h4 className="triage-condition-title">Sospecha de Infarto</h4>
                <ul className="triage-signs-list">
                  <li>✓ Persona despierta, quejándose de dolor</li>
                  <li>✓ Opresión severa en el pecho que puede ir al brazo</li>
                  <li>✓ Sudoración fría y sensación de falta de aire</li>
                </ul>
                <div className="triage-conduct-pill triage-conduct-pill--infarto">
                  <strong>Conducta:</strong> Reposo semi-sentado + Llamar al 123. NO iniciar RCP.
                </div>
              </div>

              <div className="triage-box triage-box--paro">
                <span className="triage-type-tag triage-type-tag--paro">Persona Inconsciente</span>
                <h4 className="triage-condition-title">Paro Cardiorrespiratorio</h4>
                <ul className="triage-signs-list">
                  <li>🚨 No responde al sacudir hombros y llamar</li>
                  <li>🚨 NO respira o solo jadea agónicamente</li>
                  <li>🚨 No hay pulso visible en menos de 10 segundos</li>
                </ul>
                <div className="triage-conduct-pill triage-conduct-pill--paro">
                  <strong>Conducta:</strong> ¡INICIAR RCP INMEDIATA Y TRAER EL DEA!
                </div>
              </div>
            </div>
          </div>
        )

      // 8. RCP: Metrónomo interactivo 110 cpm
      case 'metronomo-rcp':
        return (
          <div className="visual-stage-card stage-metronomo">
            <div className="rcp-trainer-container">
              <div className="rcp-posture-guide">
                <span className="posture-pill">Postura Oficial AHA</span>
                <ul className="posture-checklist">
                  <li>✓ Brazos rectos perpendiculares a 90°</li>
                  <li>✓ Codos bloqueados sin flexionar</li>
                  <li>✓ Talón de la mano en el centro del esternón</li>
                  <li>✓ Profundidad constante de 5 cm</li>
                </ul>
              </div>

              {/* Metrónomo visual interactivo */}
              <div className="rcp-metronome-box">
                <div className={`metronome-pulse-ring ${isMetronomeActive ? 'metronome-pulse-ring--active' : ''}`}>
                  <Heart size={42} className={`rcp-heart-icon ${isMetronomeActive ? 'rcp-heart-icon--beating' : ''}`} />
                  <span className="metronome-tempo-label">110 CPM</span>
                  <span className="metronome-cycle-count">
                    {isMetronomeActive ? `Compresión ${compressionCount}/30` : 'En pausa'}
                  </span>
                </div>

                <div className="metronome-action-bar">
                  <Button
                    variant={isMetronomeActive ? 'outline' : 'primary'}
                    size="md"
                    onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                    iconLeft={isMetronomeActive ? <Pause size={18} /> : <Play size={18} />}
                  >
                    {isMetronomeActive ? 'Pausar Metrónomo' : 'Activar Ritmo de Compresión (110 cpm)'}
                  </Button>
                  <span className="metronome-song-tip">
                    🎵 Ritmo oficial recomendado: "Stayin' Alive" de los Bee Gees (104-110 latidos/minuto).
                  </span>
                </div>
              </div>
            </div>
          </div>
        )

      // 9. RCP: Parches del DEA
      case 'parches-dea':
        return (
          <div className="visual-stage-card stage-dea-pads">
            <div className="dea-placement-visual">
              <div className="dea-torso-map">
                <div className="pad-location pad-location--upper-right">
                  <span className="pad-badge">Parche 1</span>
                  <strong>Subclavicular Derecho</strong>
                  <span>Bajo la clavícula, lado derecho del esternón</span>
                </div>
                <div className="dea-center-heart">
                  <span>❤️</span>
                  <span className="shock-vector">Línea de vector de desfibrilación</span>
                </div>
                <div className="pad-location pad-location--lower-left">
                  <span className="pad-badge">Parche 2</span>
                  <strong>Lateral Izquierdo</strong>
                  <span>Costado izquierdo, bajo la axila</span>
                </div>
              </div>

              <div className="dea-safety-warning-strip">
                <AlertTriangle size={24} className="warning-strip-icon" />
                <div className="warning-strip-text">
                  <strong>Regla Crítica de Seguridad del DEA:</strong>
                  <p>
                    Cuando el equipo anuncie <em>"Analizando ritmo"</em> o <em>"Cargando..."</em>, extiende ambos brazos y grita con energía: <strong>"¡TODOS FUERA, NADIE TOQUE AL PACIENTE!"</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      // 10. Golpes Cabeza: Valoración de conciencia
      case 'valoracion-conciencia':
        return (
          <div className="visual-stage-card stage-conciencia">
            <div className="neuro-questions-box">
              <span className="neuro-tag">Prueba de Lucidez Inmediata en el Patio</span>
              <h4 className="neuro-title">Las 3 Preguntas de Evaluación Docente</h4>
              <div className="questions-interactive-grid">
                <div className="question-card">
                  <span className="q-badge">Pregunta 1</span>
                  <strong>"¿Cómo te llamas y en qué grado estás?"</strong>
                  <span className="q-target">Evalúa memoria retrógrada e identidad</span>
                </div>
                <div className="question-card">
                  <span className="q-badge">Pregunta 2</span>
                  <strong>"¿Dónde estamos y qué estabas haciendo?"</strong>
                  <span className="q-target">Evalúa orientación espacial y temporal</span>
                </div>
                <div className="question-card">
                  <span className="q-badge">Pregunta 3</span>
                  <strong>"¿Recuerdas cómo te golpeaste?"</strong>
                  <span className="q-target">Evalúa amnesia postraumática</span>
                </div>
              </div>
            </div>
          </div>
        )

      // 11. Golpes Cabeza: Frío seguro vs Monedas
      case 'frio-vs-monedas':
        return (
          <div className="visual-stage-card stage-frio-monedas">
            <div className="frio-remedy-split">
              <div className="remedy-box remedy-box--safe">
                <div className="remedy-badge remedy-badge--safe">
                  <Check size={16} /> Práctica Médica Correcta
                </div>
                <h4 className="remedy-title">Compresa de Frío Indirecto</h4>
                <ul className="remedy-list">
                  <li>✓ Cubitos de hielo envueltos en paño limpio o toalla</li>
                  <li>✓ Aplicación suave sin ejercer presión sobre el hueso</li>
                  <li>✓ Intervalos: 10 a 15 minutos de frío con 5 min de descanso</li>
                  <li>✓ Contiene la inflamación y adormece el dolor con seguridad</li>
                </ul>
              </div>

              <div className="remedy-box remedy-box--danger">
                <div className="remedy-badge remedy-badge--danger">
                  <X size={16} /> Mitos Peligrosos Prohibidos
                </div>
                <h4 className="remedy-title">Monedas, Cucharas y Presión Fuerte</h4>
                <ul className="remedy-list">
                  <li>❌ Presionar una moneda para "bajar" el chichón rompe más capilares y aumenta el hematoma</li>
                  <li>❌ Hielo directo sobre la piel sin tela quema los tejidos dérmicos</li>
                  <li>❌ El alcohol alcanforado se absorbe y es tóxico en niños pequeños</li>
                </ul>
              </div>
            </div>
          </div>
        )

      // 12. Golpes Cabeza: Banderas rojas neurológicas
      case 'banderas-rojas':
        return (
          <div className="visual-stage-card stage-banderas-rojas">
            <div className="red-flags-container">
              <div className="flags-header-alert">
                <ShieldAlert size={26} />
                <div>
                  <h4 className="flags-title">Señales de Alarma Neurológicas (Banderas Rojas)</h4>
                  <p className="flags-sub">Si aparece CUALQUIERA de estos signos, activa de inmediato la Línea 123:</p>
                </div>
              </div>

              <div className="flags-cards-grid">
                <div className="flag-card">
                  <span className="flag-icon">🤮</span>
                  <strong>Vómitos Repetidos</strong>
                  <p>Especialmente vómitos repentinos "en escopeta" o más de 2 episodios.</p>
                </div>
                <div className="flag-card">
                  <span className="flag-icon">😴</span>
                  <strong>Somnolencia Anormal</strong>
                  <p>El niño no despierta con estímulos normales o cuesta mucho mantenerlo alerta.</p>
                </div>
                <div className="flag-card">
                  <span className="flag-icon">👁️</span>
                  <strong>Pupilas Desiguales</strong>
                  <p>Una pupila más dilatada que la otra (anisocoria: signo de presión intracraneal).</p>
                </div>
                <div className="flag-card">
                  <span className="flag-icon">🩸</span>
                  <strong>Líquido por Oído/Nariz</strong>
                  <p>Salida de sangre o líquido transparente (posible fractura de base de cráneo).</p>
                </div>
              </div>
            </div>
          </div>
        )

      // 13. Fracturas: No traccionar
      case 'no-traccionar':
        return (
          <div className="visual-stage-card stage-no-traccionar">
            <div className="golden-rule-banner-box">
              <div className="golden-rule-icon">
                <AlertTriangle size={32} />
              </div>
              <div className="golden-rule-text">
                <span className="golden-rule-tag">Regla de Oro en Traumatología Escolar</span>
                <h4 className="golden-rule-title">NUNCA Intentes Acomodar ni Enderezar el Hueso</h4>
                <p>
                  Si la muñeca o antebrazo de un estudiante presenta una curvatura anormal ("deformidad en dorso de tenedor"),
                  inmovilízalo <strong>exactamente en la posición en que quedó</strong>. Traccionar o halar sin radiografías
                  puede seccionar la arteria radial o causar parálisis nerviosa irreversible.
                </p>
              </div>
            </div>
          </div>
        )

      // 14. Fracturas: Férula acolchada
      case 'ferula-acolchada':
        return (
          <div className="visual-stage-card stage-ferula">
            <div className="splint-guide-grid">
              <div className="splint-material-box">
                <span className="splint-tag">Materiales Improvisados en el Aula</span>
                <ul className="splint-list">
                  <li>📦 <strong>Soporte rígido:</strong> Cartón doblado, tablilla de madera o revista gruesa.</li>
                  <li>🧣 <strong>Acolchado:</strong> Toalla limpia, paño suave o bufanda.</li>
                  <li>🩹 <strong>Fijación:</strong> Venda elástica suave, cinta o pañuelo sin estrangular.</li>
                </ul>
              </div>
              <div className="splint-technique-box">
                <span className="splint-tag">Regla de las 2 Articulaciones</span>
                <p>
                  Para inmovilizar un hueso fracturado, la férula debe abarcar <strong>la articulación por encima y la articulación por debajo</strong> de la lesión (ej. para antebrazo: muñeca y codo).
                </p>
                <div className="splint-circulation-check">
                  <CheckCircle2 size={16} />
                  <span>Comprueba periódicamente que los dedos permanezcan tibios y con sensibilidad.</span>
                </div>
              </div>
            </div>
          </div>
        )

      // 15. Fracturas: Protocolo RICE
      case 'protocolo-rice':
      default:
        return (
          <div className="visual-stage-card stage-rice">
            <div className="rice-protocol-grid">
              <div className="rice-card rice-card--r">
                <span className="rice-letter">R</span>
                <strong>Reposo (Rest)</strong>
                <p>No apoyar el pie ni forzar la articulación torcida.</p>
              </div>
              <div className="rice-card rice-card--i">
                <span className="rice-letter">I</span>
                <strong>Hielo (Ice)</strong>
                <p>Frío cubierto con tela durante 15 min cada 2 horas.</p>
              </div>
              <div className="rice-card rice-card--c">
                <span className="rice-letter">C</span>
                <strong>Compresión (Compression)</strong>
                <p>Vendaje elástico suave para limitar el edema sin cortar el pulso.</p>
              </div>
              <div className="rice-card rice-card--e">
                <span className="rice-letter">E</span>
                <strong>Elevación (Elevation)</strong>
                <p>Elevar la extremidad por encima de la altura del corazón.</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="nutria-guide-card" borderVariant="primary">
      {/* ENCABEZADO Y SELECTOR DE VISTAS */}
      <div className="nutria-guide-card__header">
        <div className="header-meta">
          <Badge variant="primary" icon={<Sparkles size={14} />}>
            Demostración de la nutria médica Doc
          </Badge>
          <span className="mentor-label">Guía oficial de primeros auxilios escolares</span>
        </div>

        {/* Selector de Modos de Aprendizaje */}
        <div className="guide-view-tabs">
          <button
            type="button"
            className={`guide-tab-btn ${viewMode === 'secuencia' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setViewMode('secuencia')}
          >
            <Activity size={15} />
            <span>Secuencia demostrativa paso a paso</span>
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${viewMode === 'infografia' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setViewMode('infografia')}
          >
            <ImageIcon size={15} />
            <span>Lámina infográfica de Doc</span>
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${viewMode === 'video' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setViewMode('video')}
          >
            <Video size={15} />
            <span>Video tutorial animado P.A.S.</span>
          </button>
        </div>
      </div>

      {/* VISTA 1: SECUENCIA DEMOSTRATIVA PASO A PASO INTERACTIVA (EXPERIENCIA SUPERIOR) */}
      {viewMode === 'secuencia' && (
        <div className="demo-interactive-flow animate-fade-in">
          {/* Navegador de los 3 Pasos del Caso */}
          <div className="demo-step-chips-bar">
            {steps.map((st, idx) => (
              <button
                key={st.stepNumber}
                type="button"
                className={`demo-step-chip ${currentStepIndex === idx ? 'demo-step-chip--active' : ''}`}
                onClick={() => setCurrentStepIndex(idx)}
              >
                <span className="step-chip-index">{st.stepNumber}</span>
                <span className="step-chip-title">{st.title}</span>
              </button>
            ))}
          </div>

          {/* Tarjeta del Paso Activo */}
          <div className="demo-step-container">
            {/* Header del Paso */}
            <div className="demo-step-header">
              <span className="demo-step-badge">Paso {currentStep.stepNumber} de {steps.length}</span>
              <h3 className="demo-step-main-title">{currentStep.title}</h3>
            </div>

            {/* Escenario Visual Central de Alta Definición */}
            <div className="demo-visual-canvas">
              {renderVisualStage(currentStep.visualType)}
            </div>

            {/* Explicación Pedagógica Estructurada (3 Preguntas Clave) */}
            <div className="demo-pedagogy-grid">
              <div className="pedagogy-box pedagogy-box--situation">
                <span className="pedagogy-label">¿Qué está ocurriendo?</span>
                <p className="pedagogy-text">{currentStep.situation}</p>
              </div>

              <div className="pedagogy-box pedagogy-box--action">
                <span className="pedagogy-label pedagogy-label--action">¿Qué debe hacer el docente?</span>
                <p className="pedagogy-text">{currentStep.action}</p>
              </div>

              <div className="pedagogy-box pedagogy-box--caution">
                <span className="pedagogy-label pedagogy-label--caution">¿Qué debe observar o evitar?</span>
                <p className="pedagogy-text">{currentStep.caution}</p>
              </div>
            </div>

            {/* Consejo de la Nutria Doc */}
            <div className="doc-advice-pill">
              <CheckCircle2 size={18} className="advice-icon" />
              <span>
                <strong>Regla de la Nutria Doc:</strong> {currentStep.docTip}
              </span>
            </div>
          </div>

          {/* Barra de Controles de Avance */}
          <div className="demo-controls-bar">
            <Button
              variant="outline"
              size="sm"
              iconLeft={<ArrowLeft size={16} />}
              onClick={handlePrevStep}
            >
              Paso Anterior
            </Button>

            <div className="demo-step-dots">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`demo-dot ${currentStepIndex === idx ? 'demo-dot--active' : ''}`}
                  onClick={() => setCurrentStepIndex(idx)}
                  aria-label={`Ir al paso ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="primary"
              size="sm"
              iconRight={<ArrowRight size={16} />}
              onClick={handleNextStep}
            >
              {currentStepIndex === steps.length - 1 ? 'Repetir Secuencia' : 'Siguiente Paso'}
            </Button>
          </div>
        </div>
      )}

      {/* VISTA 2: LÁMINA INFOGRÁFICA OFICIAL EN ALTA DEFINICIÓN */}
      {viewMode === 'infografia' && illustration && (
        <div className="nutria-infographic-view animate-fade-in">
          <div className="nutria-infographic-img-wrap">
            <img
              src={getAssetUrl(illustration.src)}
              alt={illustration.alt}
              className="nutria-infographic-img"
              loading="eager"
            />
          </div>
          <div className="nutria-infographic-footer">
            <h4 className="infographic-footer-title">{illustration.title}</h4>
            <div className="doc-advice-pill">
              <CheckCircle2 size={18} className="advice-icon" />
              <span>
                <strong>Regla de Oro de la Nutria Doc:</strong> {illustration.keyTakeaway}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VISTA 3: VIDEO DEMOSTRATIVO ANIMADO DEL PROTOCOLO P.A.S. */}
      {viewMode === 'video' && (
        <div className="demo-video-view animate-fade-in">
          <div className="demo-video-header">
            <h4 className="demo-video-title">Video Animado: El Protocolo P.A.S. en la Escuela</h4>
            <p className="demo-video-desc">
              Observa a la Nutria Médica Doc aplicar los tres principios de supervivencia escolar: Proteger la escena, Avisar a la Línea {EMERGENCY_NUMBER} y Socorrer con serenidad.
            </p>
          </div>
          <div className="demo-video-wrapper">
            <video
              className="demo-video-player"
              controls
              playsInline
              preload="metadata"
              poster={getAssetUrl('/images/personaje/nutria-hero-bienvenida.jpg')}
              title="Demostración audiovisual del Protocolo P.A.S."
            >
              <source src={getAssetUrl('/videos/protocolo-pas-animado.mp4')} type="video/mp4" />
              <source src={getAssetUrl('/images/videos/protocolo-pas-animado.mp4')} type="video/mp4" />
              Tu navegador no soporta la reproducción de video HTML5.
            </video>
          </div>
        </div>
      )}
    </Card>
  )
}

NutriaGuideAnimation.propTypes = {
  incidentType: PropTypes.oneOf(['atragantamiento', 'diente', 'rcp', 'chichon', 'fractura']),
}
