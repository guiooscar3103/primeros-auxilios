import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MissionMap from './pages/MissionMap'
import Quiz from './components/Quiz'
import MiniGameClassifier from './pages/MiniGameClassifier'
import Achievements from './pages/Achievements'
import QuickReferenceView from './pages/QuickReferenceView'
import CaseDetailView from './pages/CaseDetailView'
import CaseSimulationView from './pages/CaseSimulationView'
import SourcesView from './pages/SourcesView'
import quizzesData from './data/quizzes.json'
import { SCHOOL_CASES } from './data/schoolCases'
import { useProgress } from './hooks/useProgress'
import { SCREENS, EMERGENCY_NUMBER } from './utils/constants'
import './App.css'

function App() {
  // Estado principal de navegación por pantalla
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME)

  // Caso clínico escolar activo seleccionado
  const [selectedSchoolCase, setSelectedSchoolCase] = useState(SCHOOL_CASES[0])

  // Hook central de progreso persistido en LocalStorage
  const {
    stars,
    completedMissions,
    unlockedBadges,
    completeMission,
    completeActivity,
    resetAllProgress,
  } = useProgress()

  // Función de navegación con scroll automático al inicio
  const handleNavigate = (screen) => {
    setCurrentScreen(screen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Manejador al hacer clic en "Estudiar Módulo" desde el mapa de formación
  const handleSelectMission = (mission) => {
    const matchedCase = SCHOOL_CASES.find((c) => c.id === mission.id) || SCHOOL_CASES[0]
    setSelectedSchoolCase(matchedCase)
    handleNavigate(SCREENS.CASE_DETAIL)
  }

  // Manejador para seleccionar un Caso Clínico Escolar desde la portada o consulta rápida
  const handleSelectSchoolCase = (schoolCase) => {
    setSelectedSchoolCase(schoolCase)
    handleNavigate(SCREENS.CASE_DETAIL)
  }

  // Al iniciar la simulación del caso escolar
  const handleStartCaseSimulation = () => {
    handleNavigate(SCREENS.SIMULATION)
  }

  // Al completar la simulación de decisiones del caso escolar
  const handleFinishCaseSimulation = (caseId) => {
    completeMission(
      selectedSchoolCase?.id || caseId,
      50,
      `Héroe de ${selectedSchoolCase?.title || 'Caso Escolar'}`
    )
    completeActivity(`sim_${caseId}`, 30, `Competencia: Manejo de ${selectedSchoolCase?.title || 'Caso Escolar'}`)
    handleNavigate(SCREENS.CASE_DETAIL)
  }

  // Al finalizar una evaluación corta (Quiz)
  const handleFinishQuiz = (starsEarned) => {
    if (selectedSchoolCase) {
      completeMission(
        selectedSchoolCase.id,
        starsEarned,
        `Héroe de ${selectedSchoolCase.title}`
      )
    }
    handleNavigate(SCREENS.CASE_DETAIL)
  }

  // Al finalizar el ejercicio práctico de Triage Escolar
  const handleFinishMinigame = (pointsEarned) => {
    completeActivity('triage', pointsEarned, 'Criterio y Triage Escolar')
    handleNavigate(SCREENS.MAP)
  }

  return (
    <div className="hero-app">
      {/* Barra superior común a toda la experiencia */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        starsCount={stars}
      />

      <main className="hero-main-content">
        {/* PANTALLA 1: PORTADA DOCENTE */}
        {currentScreen === SCREENS.HOME && (
          <Home
            onOpenQuickReference={() => handleNavigate(SCREENS.QUICK_REFERENCE)}
            onSelectCase={handleSelectSchoolCase}
            onExploreModules={() => handleNavigate(SCREENS.MAP)}
            onOpenSources={() => handleNavigate(SCREENS.SOURCES)}
          />
        )}

        {/* PANTALLA 1.1: CONSULTA RÁPIDA DE EMERGENCIAS ESCOLARES */}
        {currentScreen === SCREENS.QUICK_REFERENCE && (
          <QuickReferenceView
            onBackToHome={() => handleNavigate(SCREENS.HOME)}
            onOpenCaseDetail={handleSelectSchoolCase}
          />
        )}

        {/* PANTALLA 1.2: DETALLE DEL CASO CLÍNICO ESCOLAR */}
        {currentScreen === SCREENS.CASE_DETAIL && selectedSchoolCase && (
          <CaseDetailView
            caseData={selectedSchoolCase}
            onStartSimulation={handleStartCaseSimulation}
            onBack={() => handleNavigate(SCREENS.MAP)}
            onNavigateToSources={() => handleNavigate(SCREENS.SOURCES)}
          />
        )}

        {/* PANTALLA 1.3: SIMULACIÓN DE 5 DILEMAS DE DECISIÓN CLÍNICA */}
        {currentScreen === SCREENS.SIMULATION && selectedSchoolCase?.simulacion && (
          <CaseSimulationView
            caseData={selectedSchoolCase}
            onCompleteSimulation={handleFinishCaseSimulation}
            onBackToCase={() => handleNavigate(SCREENS.CASE_DETAIL)}
          />
        )}

        {/* PANTALLA 1.4: TRANSPARENCIA Y FUENTES SANITARIAS */}
        {currentScreen === SCREENS.SOURCES && (
          <SourcesView onBack={() => handleNavigate(SCREENS.HOME)} />
        )}

        {/* PANTALLA 2: MAPA DE MÓDULOS DE FORMACIÓN DOCENTE */}
        {currentScreen === SCREENS.MAP && (
          <MissionMap
            completedMissionIds={completedMissions}
            onSelectMission={handleSelectMission}
            onOpenMinigame={() => handleNavigate(SCREENS.MINIGAME)}
            onOpenSimulation={() => handleNavigate(SCREENS.SIMULATION)}
            onBackToHome={() => handleNavigate(SCREENS.HOME)}
          />
        )}

        {/* PANTALLA 4: EVALUACIÓN DE PROTOCOLO INTERACTIVA */}
        {currentScreen === SCREENS.QUIZ && (
          <Quiz
            questions={quizzesData[selectedSchoolCase?.id] || quizzesData['atragantamiento-ovace']}
            missionTitle={selectedSchoolCase?.title || 'Evaluación de Protocolo'}
            starsPerQuestion={10}
            onFinishQuiz={handleFinishQuiz}
            onExitQuiz={() => handleNavigate(SCREENS.CASE_DETAIL)}
          />
        )}

        {/* PANTALLA 5: EJERCICIO PRÁCTICO DE TRIAGE ESCOLAR */}
        {currentScreen === SCREENS.MINIGAME && (
          <MiniGameClassifier
            onFinishGame={handleFinishMinigame}
            onBack={() => handleNavigate(SCREENS.MAP)}
          />
        )}

        {/* PANTALLA 7: PANEL DE COMPETENCIAS DOCENTES Y CERTIFICACIÓN */}
        {currentScreen === SCREENS.ACHIEVEMENTS && (
          <Achievements
            stars={stars}
            completedMissions={completedMissions}
            unlockedBadges={unlockedBadges}
            onResetProgress={resetAllProgress}
            onNavigateToMap={() => handleNavigate(SCREENS.MAP)}
          />
        )}
      </main>

      {/* Pie de página accesible */}
      <footer className="hero-footer">
        <p>
          Pequeños Héroes • Primeros Auxilios para Docentes de Primaria • En caso de riesgo vital llame inmediatamente al{' '}
          <strong>{EMERGENCY_NUMBER}</strong> • Material educativo sujeto a validación profesional
        </p>
      </footer>
    </div>
  )
}

export default App
