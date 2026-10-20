import { useState, useEffect } from 'react'
import {
  getStoredProgress,
  saveStoredProgress,
  resetStoredProgress,
} from '../services/storageService'

/**
 * Hook personalizado para gestionar de forma reactiva y persistente el progreso del estudiante
 */
export function useProgress() {
  const [progress, setProgress] = useState(() => getStoredProgress())

  // Guardar en localStorage ante cualquier cambio de estado
  useEffect(() => {
    saveStoredProgress(progress)
  }, [progress])

  /**
   * Suma estrellas acumuladas
   */
  const addStars = (amount) => {
    setProgress((prev) => ({
      ...prev,
      stars: Math.max(0, prev.stars + amount),
    }))
  }

  /**
   * Marca una misión como superada y otorga estrellas e insignia
   */
  const completeMission = (missionId, starsReward = 50, badgeName = null) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedMissions.includes(missionId)
      const nextCompleted = alreadyCompleted
        ? prev.completedMissions
        : [...prev.completedMissions, missionId]

      const nextBadges = badgeName && !prev.unlockedBadges.includes(badgeName)
        ? [...prev.unlockedBadges, badgeName]
        : prev.unlockedBadges

      // Solo otorgar estrellas si no estaba completada previamente
      const nextStars = alreadyCompleted ? prev.stars : prev.stars + starsReward

      return {
        ...prev,
        stars: nextStars,
        completedMissions: nextCompleted,
        unlockedBadges: nextBadges,
      }
    })
  }

  /**
   * Registra una actividad completada (minijuego o simulación)
   */
  const completeActivity = (activityKey, starsReward = 0, badgeName = null) => {
    setProgress((prev) => {
      const nextBadges = badgeName && !prev.unlockedBadges.includes(badgeName)
        ? [...prev.unlockedBadges, badgeName]
        : prev.unlockedBadges

      return {
        ...prev,
        stars: prev.stars + starsReward,
        unlockedBadges: nextBadges,
        completedActivities: {
          ...prev.completedActivities,
          [activityKey]: true,
        },
      }
    })
  }

  /**
   * Restablece todo el progreso a los valores de fábrica
   */
  const resetAllProgress = () => {
    const clean = resetStoredProgress()
    setProgress(clean)
  }

  return {
    stars: progress.stars,
    completedMissions: progress.completedMissions,
    unlockedBadges: progress.unlockedBadges,
    completedActivities: progress.completedActivities,
    lastUpdated: progress.lastUpdated,
    addStars,
    completeMission,
    completeActivity,
    resetAllProgress,
  }
}
