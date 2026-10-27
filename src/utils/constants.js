// Constantes globales de Pequeños Héroes

export const EMERGENCY_NUMBER = '123'
export const APP_NAME = 'Pequeños Héroes'

// Identificadores de pantallas para la máquina de estados de navegación
export const SCREENS = {
  HOME: 'home',
  MAP: 'map',
  LESSON: 'lesson',
  QUIZ: 'quiz',
  MINIGAME: 'minigame',
  SIMULATION: 'simulation',
  ACHIEVEMENTS: 'achievements',
  QUICK_REFERENCE: 'quick_reference',
  CASE_DETAIL: 'case_detail',
  SOURCES: 'sources',
}

export const getAssetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.replace(/^\//, '')
  return `${base}${cleanPath}`
}


