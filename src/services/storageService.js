// Servicio de persistencia local resiliente con versionado de esquema

export const STORAGE_KEY = 'pequenos_heroes_progress_v1'
export const CURRENT_SCHEMA_VERSION = 1

// Estado inicial limpio por defecto
export const INITIAL_PROGRESS = {
  version: CURRENT_SCHEMA_VERSION,
  stars: 0,
  completedMissions: [],
  unlockedBadges: ['Docente en Capacitación'],
  completedActivities: {
    minigame: false,
    simulation: false,
  },
  lastUpdated: new Date().toISOString(),
}

/**
 * Obtiene el progreso almacenado en el navegador con manejo de excepciones y validación de esquema
 * @returns {object} Estado de progreso recuperado o inicial
 */
export function getStoredProgress() {
  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY)
    if (!rawData) {
      return { ...INITIAL_PROGRESS }
    }

    const parsed = JSON.parse(rawData)

    // Validación de esquema y compatibilidad hacia adelante
    if (!parsed || typeof parsed !== 'object' || parsed.version !== CURRENT_SCHEMA_VERSION) {
      console.warn('Versión de esquema desactualizada o corrupta. Restaurando estado seguro.')
      return { ...INITIAL_PROGRESS }
    }

    return {
      version: CURRENT_SCHEMA_VERSION,
      stars: typeof parsed.stars === 'number' ? parsed.stars : 0,
      completedMissions: Array.isArray(parsed.completedMissions) ? parsed.completedMissions : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : ['Docente en Capacitación'],
      completedActivities: parsed.completedActivities || { minigame: false, simulation: false },
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error al leer de localStorage:', error)
    return { ...INITIAL_PROGRESS }
  }
}

/**
 * Guarda el progreso actualizado en localStorage
 * @param {object} progress Objeto con los datos a persistir
 * @returns {boolean} true si se guardó con éxito, false en caso de error
 */
export function saveStoredProgress(progress) {
  try {
    const payload = {
      ...progress,
      version: CURRENT_SCHEMA_VERSION,
      lastUpdated: new Date().toISOString(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch (error) {
    console.error('Error al escribir en localStorage (posible navegación privada o cuota excedida):', error)
    return false
  }
}

/**
 * Reinicia completamente el progreso local en el navegador
 */
export function resetStoredProgress() {
  try {
    const cleanState = {
      ...INITIAL_PROGRESS,
      lastUpdated: new Date().toISOString(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState))
    return cleanState
  } catch (error) {
    console.error('Error al reiniciar localStorage:', error)
    return { ...INITIAL_PROGRESS }
  }
}
