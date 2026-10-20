import fs from 'fs'
import path from 'path'
import { describe, it, expect } from 'vitest'
import { SCHOOL_CASES, FOUNDATIONS_INFO } from './schoolCases'

describe('Validación de Casos Escolares y Fundamentos Docentes', () => {
  it('debe contener los fundamentos docentes completos', () => {
    expect(FOUNDATIONS_INFO).toBeDefined()
    expect(FOUNDATIONS_INFO.definition).toBeTruthy()
    expect(FOUNDATIONS_INFO.whyAdultsMustKnow.length).toBe(4)
  })

  it('debe contener los 5 incidentes escolares requeridos', () => {
    expect(SCHOOL_CASES).toBeInstanceOf(Array)
    expect(SCHOOL_CASES.length).toBe(5)

    const ids = SCHOOL_CASES.map((c) => c.id)
    expect(ids).toContain('atragantamiento-ovace')
    expect(ids).toContain('perdida-dientes-avulsion')
    expect(ids).toContain('paro-cardiaco-infarto')
    expect(ids).toContain('chichones-golpes-cabeza')
    expect(ids).toContain('caidas-fracturas-torceduras')
  })

  it('cada caso escolar debe contar con las 8 secciones pedagógicas requeridas y tipo de animación de nutria', () => {
    SCHOOL_CASES.forEach((sc) => {
      expect(sc.id).toBeTruthy()
      expect(sc.title).toBeTruthy()
      expect(sc.contextoEscolar.scenario).toBeTruthy()
      expect(sc.reconocimiento.mild).toBeDefined()
      expect(sc.reconocimiento.severe).toBeDefined()
      expect(sc.actuacion.length).toBeGreaterThanOrEqual(4)
      expect(sc.senalesAlarma.length).toBeGreaterThanOrEqual(3)
      expect(sc.queNoHacer.length).toBeGreaterThanOrEqual(3)
      expect(sc.simulacion.steps.length).toBe(5)
      expect(sc.consultaRapida.preguntaDiagnostica).toBeTruthy()
      expect(sc.sources.length).toBeGreaterThanOrEqual(1)
      expect(['atragantamiento', 'diente', 'rcp', 'chichon', 'fractura']).toContain(sc.animationType)
    })
  })

  it('debe respetar las normas de seguridad clínica en todos los incidentes', () => {
    const allText = JSON.stringify(SCHOOL_CASES).toLowerCase()

    // Atragantamiento: prohibir barrido a ciegas y alentar tos
    expect(allText).toContain('ciegas')
    expect(allText).toContain('heimlich')

    // Dientes: no tocar raíz y transportar en leche
    expect(allText).toContain('corona')
    expect(allText).toContain('leche')

    // Paro cardíaco: compresiones 100-120 y DEA
    expect(allText).toContain('dea')
    expect(allText).toContain('compresiones')

    // Cabeza: no presionar chichón, hielo indirecto y banderas rojas
    expect(allText).toContain('chichón')
    expect(allText).toContain('vómito')

    // Fracturas: no intentar enderezar o halar
    expect(allText).toContain('enderezar')
    expect(allText).toContain('inmovilizar')
  })

  it('cada caso escolar debe tener imágenes existentes en disco con textos alternativos descriptivos', () => {
    SCHOOL_CASES.forEach((sc) => {
      expect(sc.images).toBeDefined()
      expect(sc.images.scene).toBeTruthy()
      expect(sc.images.action).toBeTruthy()
      expect(sc.images.sceneAlt).toBeTruthy()
      expect(sc.images.actionAlt).toBeTruthy()

      // Verificar que los archivos existen en disco (relativos a public/)
      const sceneRelative = sc.images.scene.replace(/^\//, '')
      const actionRelative = sc.images.action.replace(/^\//, '')

      const sceneDiskPath = path.join(process.cwd(), 'public', sceneRelative)
      const actionDiskPath = path.join(process.cwd(), 'public', actionRelative)

      expect(fs.existsSync(sceneDiskPath)).toBe(true)
      expect(fs.existsSync(actionDiskPath)).toBe(true)
    })
  })
})

