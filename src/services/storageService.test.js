// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import {
  getStoredProgress,
  saveStoredProgress,
  resetStoredProgress,
  STORAGE_KEY,
  CURRENT_SCHEMA_VERSION,
  INITIAL_PROGRESS,
} from './storageService'

describe('storageService - Persistencia Local Resiliente', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('debe devolver el estado inicial limpio cuando localStorage está vacío', () => {
    const progress = getStoredProgress()
    expect(progress).toBeDefined()
    expect(progress.version).toBe(CURRENT_SCHEMA_VERSION)
    expect(progress.stars).toBe(0)
    expect(progress.completedMissions).toEqual([])
    expect(progress.unlockedBadges).toContain('Docente en Capacitación')
  })

  it('debe guardar y recuperar el progreso correctamente', () => {
    const testData = {
      stars: 45,
      completedMissions: ['atragantamiento-ovace'],
      unlockedBadges: ['Docente en Capacitación', 'Gestión de Asfixia y OVACE'],
      completedActivities: { minigame: true, simulation: false },
    }

    const saved = saveStoredProgress(testData)
    expect(saved).toBe(true)

    const retrieved = getStoredProgress()
    expect(retrieved.stars).toBe(45)
    expect(retrieved.completedMissions).toContain('atragantamiento-ovace')
    expect(retrieved.unlockedBadges).toHaveLength(2)
    expect(retrieved.completedActivities.minigame).toBe(true)
  })

  it('debe recuperarse de forma segura si los datos en localStorage están corruptos', () => {
    window.localStorage.setItem(STORAGE_KEY, '{ json_invalido_corrupto')
    const progress = getStoredProgress()
    expect(progress).toEqual(INITIAL_PROGRESS)
  })

  it('debe rechazar versiones de esquema obsoletas y restaurar estado seguro', () => {
    const outdatedData = {
      version: 999, // Versión no compatible
      stars: 1000,
      completedMissions: ['invalida'],
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(outdatedData))

    const progress = getStoredProgress()
    expect(progress.version).toBe(CURRENT_SCHEMA_VERSION)
    expect(progress.stars).toBe(0)
  })

  it('debe reiniciar el progreso a los valores de fábrica al invocar resetStoredProgress', () => {
    saveStoredProgress({ stars: 100, completedMissions: ['mision-1-emergencias', 'mision-2-raspaduras'] })
    const resetResult = resetStoredProgress()
    expect(resetResult.stars).toBe(0)
    expect(resetResult.completedMissions).toEqual([])

    const storedNow = getStoredProgress()
    expect(storedNow.stars).toBe(0)
  })
})
