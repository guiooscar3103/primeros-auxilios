import { describe, it, expect } from 'vitest'
import missions from './missions.json'
import minigames from './minigames.json'
import quizzes from './quizzes.json'

describe('Validación de Integridad y Contenido Educativo Docente', () => {
  it('todos los módulos formativos deben tener estructura clínica válida', () => {
    expect(missions).toHaveLength(5)

    missions.forEach((mission, index) => {
      expect(mission.id).toBeTruthy()
      expect(mission.number).toBe(index + 1)
      expect(mission.title).toBeTruthy()
      expect(mission.pointsReward).toBeGreaterThan(0)
      expect(mission.learningGoals).toBeInstanceOf(Array)
      expect(mission.learningGoals.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('el clasificador de triage escolar debe tener categorías y tarjetas con retroalimentación', () => {
    const triage = minigames.classifierGame
    expect(triage).toBeDefined()
    expect(triage.categories).toHaveLength(2)

    const catIds = triage.categories.map((c) => c.id)
    expect(catIds).toContain('school_care')
    expect(catIds).toContain('emergency_123')

    expect(triage.cards.length).toBeGreaterThanOrEqual(6)
    triage.cards.forEach((card) => {
      expect(card.id).toBeTruthy()
      expect(card.situation).toBeTruthy()
      expect(['school_care', 'emergency_123']).toContain(card.correctCategory)
      expect(card.feedback).toBeTruthy()
    })
  })

  it('los cuestionarios de protocolo deben tener opciones y exactamente 1 respuesta correcta por pregunta', () => {
    Object.keys(quizzes).forEach((caseId) => {
      const caseQuestions = quizzes[caseId]
      expect(caseQuestions).toBeInstanceOf(Array)
      expect(caseQuestions.length).toBeGreaterThanOrEqual(1)

      caseQuestions.forEach((q) => {
        expect(q.question).toBeTruthy()
        expect(q.options.length).toBeGreaterThanOrEqual(2)

        const correct = q.options.filter((opt) => opt.isCorrect === true)
        expect(correct).toHaveLength(1) // Solo una opción correcta

        q.options.forEach((opt) => {
          expect(opt.letter).toBeTruthy()
          expect(opt.text).toBeTruthy()
          expect(opt.feedback).toBeTruthy()
        })
      })
    })
  })

  it('Revisión de Seguridad Médica Escolar: respeta las normas sanitarias oficiales', () => {
    const allMissionsText = JSON.stringify(missions).toLowerCase()
    const allTriageText = JSON.stringify(minigames).toLowerCase()

    // 1. Debe referenciar la Línea 123 oficial de emergencias
    expect(allTriageText).toContain('123')

    // 2. Atragantamiento y asfixia
    expect(allMissionsText).toContain('heimlich')

    // 3. Trauma dental: corona y no transporte seco
    expect(allMissionsText).toContain('corona')

    // 4. Paro cardíaco: RCP y DEA
    expect(allMissionsText).toContain('dea')
    expect(allMissionsText).toContain('rcp')

    // 5. Trauma craneal: frío indirecto y banderas rojas
    expect(allMissionsText).toContain('vómito')
  })
})
