// Base de Datos Integral de Primeros Auxilios para Docentes de Primaria
// Fuentes clínicas oficiales: AHA (2020-2024), Cruz Roja, CDC Heads Up, IADT (Trauma Dental), ERC.
// Estado técnico: Contenido pedagógico protocolario sujeto a validación por profesional sanitario colegiado.

export const FOUNDATIONS_INFO = {
  id: 'fundamentos-docentes',
  title: 'Fundamentos de Primeros Auxilios Escolares',
  subtitle: '¿Qué son y por qué todo docente debe dominarlos?',
  definition: 'Los primeros auxilios en la escuela son el conjunto de actuaciones iniciales y cuidados inmediatos que brinda el personal docente o administrativo a un estudiante víctima de un accidente o enfermedad repentina, antes de la llegada de asistencia médica especializada o el traslado a un centro asistencial.',
  whyAdultsMustKnow: [
    {
      title: 'Los primeros minutos son decisivos',
      description: 'En situaciones críticas como una asfixia (OVACE) o un paro cardíaco, el daño cerebral irreversible puede comenzar tras 4 a 6 minutos sin oxígeno. La ambulancia suele tardar más, por lo que la acción del docente presente salva la vida.',
    },
    {
      title: 'Prevención de secuelas y complicaciones',
      description: 'Un manejo adecuado de un diente caído (avulsión) en los primeros 30-60 minutos permite reimplantarlo con éxito. Inmovilizar correctamente una fractura o no masajear una torcedura previene lesiones vasculares y nerviosas.',
    },
    {
      title: 'Liderazgo y contención emocional en el aula',
      description: 'Cuando ocurre un accidente grave, los niños entran en pánico. Un docente capacitado transmite calma, organiza al grupo, evita que otros intervengan con remedios peligrosos y coordina la llamada al 123.',
    },
    {
      title: 'Obligación ética y deber de cuidado',
      description: 'Durante la jornada escolar, los estudiantes están bajo la custodia y tutela del colegio. Saber qué hacer y qué evitar es parte fundamental de la seguridad escolar.',
    },
  ],
}

export const SCHOOL_CASES = [
  // 1. ATRAGANTAMIENTO (OVACE)
  {
    id: 'atragantamiento-ovace',
    number: 1,
    title: 'Atragantamiento (OVACE)',
    shortDescription: 'Actuación inmediata ante asfixia u obstrucción de la vía aérea en el aula o comedor escolar.',
    category: 'Emergencia Respiratoria',
    targetAudience: 'Docentes y personal escolar',
    estimatedMinutes: 6,
    icon: 'AlertTriangle',
    color: 'danger',
    status: 'activo',
    animationType: 'atragantamiento',
    sources: [
      {
        institution: 'American Heart Association (AHA)',
        document: 'Guías de RCP y Atención Cardiovascular de Emergencia - Soporte Vital Pediátrico',
        year: '2020 / Actualización continua',
        url: 'https://cpr.heart.org',
        clinicalReviewNote: 'Revisión técnica pendiente de validación por instructor certificado.',
      },
      {
        institution: 'Cruz Roja Americana / Colombiana',
        document: 'Manual de Primeros Auxilios para Centros Educativos',
        year: '2021',
        url: 'https://www.cruzrojacolombiana.org',
        clinicalReviewNote: 'Adaptado al entorno de escuelas primarias y protocolos de Línea 123.',
      },
    ],
    lastReviewed: '2025-02-15',
    clinicalDisclaimer: 'Fines pedagógicos. No sustituye la capacitación práctica certificada ni la atención del 123.',
    images: {
      scene: '/images/casos/atragantamiento-escena.webp',
      action: '/images/casos/atragantamiento-pasos.webp',
      sceneAlt: 'Docente acudiendo de inmediato a auxiliar a un estudiante en el comedor escolar con signo universal de asfixia',
      actionAlt: 'Demostración médica de la maniobra de Heimlich en un niño escolar con puño sobre el ombligo y empuje en J',
    },
    contextoEscolar: {
      location: 'Comedor escolar durante el descanso del almuerzo',
      studentName: 'Camilo (8 años, grado 3°)',
      scenario: 'Durante el almuerzo en el comedor, varios niños se ríen mientras comen uvas y trozos de manzana. Camilo se pone de pie bruscamente, se lleva ambas manos al cuello con expresión de angustia, tiene los ojos muy abiertos y no emite ningún sonido.',
      initialObservation: 'Silencio repentino, incapacidad para responder al llamado del docente y angustia evidente.',
    },
    reconocimiento: {
      description: 'Diferenciar entre obstrucción leve (tos efectiva) y grave (asfixia total). Intervenir en una tos efectiva puede empeorar el cuadro.',
      mild: {
        title: 'Obstrucción Leve (Parcial)',
        signs: [
          'El niño tose con fuerza y de forma ruidosa.',
          'Puede hablar, llorar o quejarse con dificultad.',
          'Consigue inhalar pequeñas cantidades de aire entre toses.',
        ],
        actionSummary: 'NO dar golpes en la espalda ni compresiones. Estimular a que continúe tosiendo fuertemente.',
      },
      severe: {
        title: 'Obstrucción Grave (Total)',
        signs: [
          'Signo universal de asfixia: manos agarrándose el cuello con desesperación.',
          'Incapacidad total para hablar, emitir sonido o toser con fuerza.',
          'Sonido agudo o silbido débil al intentar aspirar aire (estridor).',
          'Coloración azulada en labios y uñas (cianosis temprana).',
          'Pérdida de conciencia en segundos por falta de oxígeno.',
        ],
        actionSummary: 'Compresiones abdominales (maniobra de Heimlich) inmediatas. Si se desmaya, pasar a RCP y 123.',
      },
    },
    actuacion: [
      {
        stepNumber: 1,
        title: 'Verificar y Preguntar Rápido',
        instruction: 'Agáchese a la altura del estudiante y pregunte enérgicamente: "¿Te estás ahogando? ¿Puedes hablar?". Observe si puede toser o hablar.',
        visualAid: 'Contacto visual directo y confirmación del signo universal de asfixia.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 2,
        title: 'Si la Obstrucción es Leve: Estimular la Tos',
        instruction: 'Quédese a su lado y ordénele con firmeza: "¡Tose fuerte, sigue tosiendo!". La tos es el mecanismo más eficaz para expulsar el cuerpo extraño.',
        visualAid: 'Acompañamiento sin golpear la espalda erguido ni dar líquidos.',
        ruleType: 'cuidado-seguro',
      },
      {
        stepNumber: 3,
        title: 'Si es Grave: Posición para Compresiones Abdominales',
        instruction: 'Póngase de pie tras el niño (arrodíllese si es bajo). Pase sus brazos por debajo de sus axilas abrazando su abdomen.',
        visualAid: 'Nutria adulta posicionada detrás de la nutria pequeña rodeando la cintura.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 4,
        title: 'Ubicación Exacta de las Manos',
        instruction: 'Haga un puño con una mano. Apoye el pulgar dos dedos por encima del ombligo, bien por debajo del esternón. Cubra su puño con la otra mano.',
        visualAid: 'Puño cerrado dos dedos sobre el ombligo, sin comprimir costillas.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 5,
        title: 'Empujes hacia Adentro y Arriba ("J")',
        instruction: 'Comprima con fuerza hacia adentro y hacia arriba en forma de "J" repetidamente hasta que el objeto salga o el niño pierda la conciencia.',
        visualAid: 'Presión ascendente diafragmática para aumentar la presión torácica.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 6,
        title: 'Si Pierde la Conciencia: Protocolo RCP + 123',
        instruction: 'Acuéstelo en el suelo plano, ordene llamar al 123 e inicie 30 compresiones torácicas. Mire la boca antes de ventilar: retire el objeto SOLO si está visible.',
        visualAid: 'Inicio de RCP básica en el suelo y llamada inmediata de emergencia.',
        ruleType: 'emergencia-critica',
      },
    ],
    senalesAlarma: [
      'Pérdida de la conciencia o desvanecimiento en el suelo.',
      'Cianosis (labios, lengua o uñas de color azul o gris).',
      'Incapacidad total de emitir sonido o respirar.',
      'Sospecha de aspiración de objetos tóxicos o pilas botón.',
    ],
    queNoHacer: [
      {
        action: 'NUNCA haga barrido a ciegas con el dedo dentro de la garganta.',
        consequence: 'Puede empujar el objeto más profundo y provocar un bloqueo traqueal total irreversible.',
      },
      {
        action: 'NO dé palmadas en la espalda si el niño está de pie tosiendo con fuerza.',
        consequence: 'El golpe en la espalda con el tronco erguido puede hacer caer el cuerpo extraño más abajo.',
      },
      {
        action: 'NO le dé agua, pan, leche ni aceite para "bajar" el alimento.',
        consequence: 'Puede causar broncoaspiración líquida a los pulmones y agravar la asfixia.',
      },
    ],
    simulacion: {
      title: 'Simulación: Atragantamiento en el Comedor Escolar',
      scenarioSummary: 'Camilo (8 años) se atraganta mientras come fruta durante el refrigerio escolar.',
      steps: [
        {
          id: 'sim_ovace_1',
          situation: 'Camilo tose con fuerza y ruido tras atorarse con un trozo de fruta. Los niños gritan pidiendo que le des agua o palmadas en la espalda.',
          question: '¿Cuál es la primera decisión docente ante una tos efectiva?',
          options: [
            {
              id: 'opt_o1_a',
              text: 'Darle palmadas en la espalda y ofrecerle un vaso de agua para que pase el alimento.',
              isCorrect: false,
              feedback: 'Incorrecto: Con tos efectiva no se debe golpear la espalda ni dar agua; puede desalojar el objeto y causar oclusión total o broncoaspiración.',
            },
            {
              id: 'opt_o1_b',
              text: 'Animarlo con voz firme y serena a seguir tosiendo con fuerza sin tocar su espalda ni darle líquidos.',
              isCorrect: true,
              feedback: '¡Correcto! La tos espontánea vigorosa es el mecanismo fisiológico más potente y seguro para expulsar cuerpos extraños.',
            },
          ],
        },
        {
          id: 'sim_ovace_2',
          situation: 'La tos se detiene bruscamente. Camilo se lleva ambas manos al cuello con expresión de terror, no emite sonido y sus labios se tornan azulados.',
          question: 'La obstrucción es completa. ¿Cómo procedes de inmediato?',
          options: [
            {
              id: 'opt_o2_a',
              text: 'Meter los dedos en su garganta a ciegas para palpar y extraer el trozo de fruta.',
              isCorrect: false,
              feedback: '¡Peligro! El barrido digital a ciegas puede empujar el objeto más profundo contra las cuerdas vocales provocando espasmo laríngeo.',
            },
            {
              id: 'opt_o2_b',
              text: 'Posicionarte detrás de él, colocar tu puño dos dedos arriba del ombligo y aplicar compresiones abdominales enérgicas hacia adentro y arriba.',
              isCorrect: true,
              feedback: '¡Impecable! La maniobra de Heimlich comprime el diafragma y genera una columna de aire que expulsa el cuerpo extraño.',
            },
          ],
        },
        {
          id: 'sim_ovace_3',
          situation: 'Eres mucho más alto que Camilo y al estar de pie te cuesta lograr el ángulo de compresión adecuado sin levantarlo del suelo.',
          question: '¿Cómo adaptas tu postura corporal a la estatura del escolar?',
          options: [
            {
              id: 'opt_o3_a',
              text: 'Arrodillarte o ponerte en cuclillas detrás de él para quedar exactamente a la altura de su tronco.',
              isCorrect: true,
              feedback: '¡Excelente ajuste! Ponerte a su nivel permite una palanca abdominal horizontal y ascendente óptima sin desestabilizar al niño.',
            },
            {
              id: 'opt_o3_b',
              text: 'Suspender al estudiante en el aire boca abajo sacudiéndolo mientras aprietas su pecho.',
              isCorrect: false,
              feedback: 'Peligroso e ineficaz: Sacudir a un niño en el aire puede causar traumatismo cervical y fracturas costales.',
            },
          ],
        },
        {
          id: 'sim_ovace_4',
          situation: 'Tras varias compresiones el objeto no sale. Camilo pierde la fuerza, los ojos se le cierran y colapsa desmayado en tus brazos.',
          question: 'El escolar pierde el conocimiento. ¿Cuál es la secuencia vital inmediata?',
          options: [
            {
              id: 'opt_o4_a',
              text: 'Tenderlo boca arriba en el piso firme, pedir en voz alta llamar al 123 y traer el DEA, e iniciar ciclos de 30 compresiones de RCP.',
              isCorrect: true,
              feedback: '¡Vital y correcto! Ante el colapso por asfixia se inicia soporte vital básico con compresiones torácicas inmediatas para perfundir el cerebro.',
            },
            {
              id: 'opt_o4_b',
              text: 'Continuar realizando compresiones abdominales de pie sujetándolo con una sola mano.',
              isCorrect: false,
              feedback: 'Incorrecto: Una víctima inconsciente no sostiene su peso. Mantenerlo de pie retrasa la RCP y no genera presión intratorácica suficiente.',
            },
          ],
        },
        {
          id: 'sim_ovace_5',
          situation: 'Tras 30 compresiones torácicas abres la vía aérea de Camilo (mentón-frente) para ventilar y observas dentro de su cavidad bucal.',
          question: '¿Qué norma sanitaria rige la inspección bucal durante la RCP por asfixia?',
          options: [
            {
              id: 'opt_o5_a',
              text: 'Solo si el objeto es claramente visible y suelto, extraerlo con el dedo en forma de gancho; si no se ve, dar 2 ventilaciones y continuar RCP.',
              isCorrect: true,
              feedback: '¡Regla de oro de la AHA! Jamás hacer barrido si no se ve el objeto. Si está visible, se retira con suavidad y se reanuda la reanimación.',
            },
            {
              id: 'opt_o5_b',
              text: 'Introducir una cuchara u horquilla de cabello para rastrear el fondo de la faringe aunque no se distinga nada.',
              isCorrect: false,
              feedback: 'Extremadamente peligroso: Introducir cubiertos o pinzas puede desgarrar la mucosa, romper la faringe o encajar más el objeto.',
            },
          ],
        },
      ],
    },
    consultaRapida: {
      tituloEmergencia: 'Atragantamiento (OVACE)',
      preguntaDiagnostica: '¿Puede hablar, llorar o toser con fuerza?',
      caminoLeve: {
        condicion: 'SÍ tose con fuerza',
        accion: 'ANIMAR A TOSER. No tocar espalda. No dar agua ni alimentos.',
      },
      caminoGrave: {
        condicion: 'NO puede toser ni hablar (manos al cuello)',
        accion: 'HEIMLICH: Puño 2 dedos sobre ombligo, presionar hacia adentro y arriba con energía.',
      },
      paroOInconsciencia: {
        condicion: 'Si cae inconsciente',
        accion: 'Al suelo + LLAMAR 123 + RCP (30 compresiones torácicas). Mirar boca solo si el objeto es visible.',
      },
      prohibiciones: [
        'No barridos a ciegas con el dedo.',
        'No dar agua ni alimentos.',
        'No golpear espalda con el niño erguido tosiendo.',
      ],
    },
  },

  // 2. PÉRDIDA DE DIENTES POR GOLPE (AVULSIÓN DENTAL PERMANENTE)
  {
    id: 'perdida-dientes-avulsion',
    number: 2,
    title: 'Pérdida de Dientes por Golpe',
    shortDescription: 'Manejo de la avulsión de dientes definitivos en educación física o el recreo escolar.',
    category: 'Traumatismo Odontológico',
    targetAudience: 'Docentes y personal escolar',
    estimatedMinutes: 5,
    icon: 'Smile',
    color: 'warning',
    status: 'activo',
    animationType: 'diente',
    sources: [
      {
        institution: 'International Association of Dental Traumatology (IADT)',
        document: 'Guidelines for the Management of Traumatized Teeth: Avulsion of Permanent Teeth',
        year: '2020',
        url: 'https://www.iadt-dentaltrauma.org',
        clinicalReviewNote: 'Estándar de oro mundial en conservación del ligamento periodontal.',
      },
      {
        institution: 'American Academy of Pediatric Dentistry (AAPD)',
        document: 'Guideline on Management of Acute Dental Trauma',
        year: '2022',
        url: 'https://www.aapd.org',
        clinicalReviewNote: 'Protocolo de reimplantación y medios biológicos de transporte.',
      },
    ],
    lastReviewed: '2025-02-15',
    clinicalDisclaimer: 'Aplicable exclusivamente a DIENTES PERMANENTES. Los dientes de leche nunca deben ser reimplantados.',
    images: {
      scene: '/images/casos/trauma-dental-escena.webp',
      action: '/images/casos/trauma-dental-conservacion.webp',
      sceneAlt: 'Docente de educación física asistiendo con calma a una estudiante tras una caída en la cancha escolar',
      actionAlt: 'Sujeción correcta del diente definitivo exclusivamente por la corona y preservación en un vaso con leche fresca',
    },
    contextoEscolar: {
      location: 'Cancha deportiva durante la clase de educación física',
      studentName: 'Sofía (9 años, grado 4°)',
      scenario: 'Durante un partido de baloncesto, Sofía choca contra otra compañera y cae de frente contra el piso de cemento. Se levanta llorando con la boca ensangrentada. Le falta un incisivo central superior (diente definitivo de pala) y la pieza dental está en el suelo de la cancha.',
      initialObservation: 'Sangrado en la encía, alveolo dental vacío y diente visible sobre el suelo.',
    },
    reconocimiento: {
      description: 'Verificar si el diente es permanente (definitivo, a partir de los 6 años) o temporal (de leche). Los dientes de leche NO se reimplantan.',
      mild: {
        title: 'Diente de Leche (Temporal, < 6 años)',
        signs: [
          'Estudiante en preescolar o transición.',
          'Diente pequeño con raíz corta.',
        ],
        actionSummary: 'NO intentar reimplantar (dañaría el germen definitivo). Detener sangrado con gasa limpia y remitir a odontopediatría.',
      },
      severe: {
        title: 'Diente Permanente (Definitivo, 6 a 12+ años)',
        signs: [
          'Incisivo central, lateral o canino definitivo.',
          'El diente salió completo con su raíz intacta.',
          'Ventana de oro: los primeros 30 a 60 minutos determinan si el diente sobrevive.',
        ],
        actionSummary: 'Tomar SOLO por la corona, no tocar la raíz. Guardar en leche fría o solución salina y traslado odontológico urgente.',
      },
    },
    actuacion: [
      {
        stepNumber: 1,
        title: 'Buscar el Diente de Inmediato',
        instruction: 'Localice la pieza dental caída rápidamente en la cancha o patio escolar.',
        visualAid: 'Búsqueda rápida en el área del impacto.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 2,
        title: 'Sujetar ÚNICAMENTE por la Corona',
        instruction: 'Tome el diente por la parte blanca y ancha que muerde (la corona). NUNCA toque la raíz amarilla ni la frote.',
        visualAid: 'Dedos sujetando la corona sin tocar la raíz para proteger las células del ligamento periodontal.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 3,
        title: 'Enjuague Breve si está Sucio',
        instruction: 'Si el diente tiene tierra, enjuáguelo brevemente (máximo 5-10 segundos) bajo un chorro suave de leche fría o suero salino. NUNCA use jabón, alcohol ni cepillos.',
        visualAid: 'Enjuague suave sin frotar con ninguna toalla o papel.',
        ruleType: 'cuidado-seguro',
      },
      {
        stepNumber: 4,
        title: 'Medio de Transporte Biológico Adecuado',
        instruction: 'Sumerja el diente en un vaso con LECHE FRESCA FRÍA. Si no hay leche, use suero fisiológico o que el niño escupa saliva en un vaso limpio. NUNCA transportarlo en seco ni en agua del grifo.',
        visualAid: 'Vaso con leche o solución salina sellada.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 5,
        title: 'Controlar el Sangrado en la Boca',
        instruction: 'Pida a la niña que muerda suavemente una gasa limpia o pañuelo de tela doblado sobre el hueco vacío para cohibir el sangrado.',
        visualAid: 'Compresión suave con gasa limpia en el alveolo dental.',
        ruleType: 'cuidado-seguro',
      },
      {
        stepNumber: 6,
        title: 'Traslado Odontológico de Emergencia (< 60 min)',
        instruction: 'Comuníquese con los padres y traslade a la estudiante a un odontólogo de inmediato. Cada minuto en seco reduce la probabilidad de salvar el diente.',
        visualAid: 'Traslado prioritario con el diente en leche en menos de 1 hora.',
        ruleType: 'emergencia-critica',
      },
    ],
    senalesAlarma: [
      'Pérdida de conciencia o vómito tras el golpe facial (indica traumatismo craneal prioritario).',
      'Sangrado incontrolable en el lecho dental que no cede tras 15 minutos de compresión.',
      'Sospecha de fractura del hueso maxilar o mandíbula (dificultad para cerrar la boca).',
      'El diente no aparece y el estudiante tose o tiene dificultad para respirar (riesgo de aspiración bronquial).',
    ],
    queNoHacer: [
      {
        action: 'NUNCA frote, cepille ni desinfecte la raíz del diente con gasa o alcohol.',
        consequence: 'Mata las células vivas del ligamento periodontal que permiten que el diente vuelva a soldarse al hueso.',
      },
      {
        action: 'NO guarde el diente seco en servilletas, papel higiénico ni bolsillos.',
        consequence: 'El ligamento periodontal se deshidrata en menos de 15 minutos y el diente se perderá irremediablemente.',
      },
      {
        action: 'NO transporte el diente sumergido en agua de grifo.',
        consequence: 'El agua común es hipotónica y destruye por lisis osmótica las células de la raíz.',
      },
      {
        action: 'NUNCA intente reimplantar un diente temporal o de leche.',
        consequence: 'Puede infectar o malformar la raíz del diente definitivo que está creciendo debajo.',
      },
    ],
    simulacion: {
      title: 'Simulación: Caída y Diente Volado en Educación Física',
      scenarioSummary: 'Sofía (9 años) sufre avulsión de su diente incisivo central definitivo tras chocar en la cancha.',
      steps: [
        {
          id: 'sim_dent_1',
          situation: 'Encuentras el diente en el suelo con algo de polvo de la cancha. Sofía llora con sangre en los labios.',
          question: '¿Por dónde y cómo debes levantar el diente del suelo?',
          options: [
            {
              id: 'opt_d1_a',
              text: 'Tomarlo exclusivamente por la corona blanca masticatoria, sin tocar nunca la raíz.',
              isCorrect: true,
              feedback: '¡Exacto! Tomar el diente por la corona preserva intactas las delicadas células del ligamento periodontal en la raíz.',
            },
            {
              id: 'opt_d1_b',
              text: 'Tomarlo con los dedos por la raíz y frotarlo con la manga de la chaqueta para quitarle el polvo.',
              isCorrect: false,
              feedback: 'Grave error: Frotar o manipular la raíz destruye irreversiblemente las fibras biológicas que permiten la reinserción ósea.',
            },
          ],
        },
        {
          id: 'sim_dent_2',
          situation: 'El diente tiene restos visibles de tierra superficial. Necesitas limpiarlo antes de transportarlo.',
          question: '¿Qué método de asepsia y enjuague es el avalado por las guías odontológicas de la IADT?',
          options: [
            {
              id: 'opt_d2_a',
              text: 'Frotarlo con agua de grifo y jabón antibacterial en el lavamanos para desinfectarlo completamente.',
              isCorrect: false,
              feedback: 'Peligro: El agua común y los detergentes provocan lisis osmótica y matan las células de la raíz en menos de 10 minutos.',
            },
            {
              id: 'opt_d2_b',
              text: 'Enjuagarlo muy suavemente durante máximo 5 a 10 segundos con leche fría o solución salina, sin frotar.',
              isCorrect: true,
              feedback: '¡Excelente decisión! La leche o solución fisiológica retira impurezas superficiales manteniendo vivo el tejido celular.',
            },
          ],
        },
        {
          id: 'sim_dent_3',
          situation: 'No es viable reimplantarlo en la cancha y debes enviar el diente con la niña al servicio odontológico de urgencias.',
          question: '¿Cuál es el medio idóneo de transporte y conservación para que el diente siga vivo?',
          options: [
            {
              id: 'opt_d3_a',
              text: 'Sumergirlo en un frasco limpio con leche entera fría (o saliva de la estudiante si no hay leche).',
              isCorrect: true,
              feedback: '¡Regla clínica de oro! La leche fría tiene el pH y osmolaridad óptimos para mantener viable el ligamento periodontal durante el traslado.',
            },
            {
              id: 'opt_d3_b',
              text: 'Envolverlo en papel toalla o servilleta seca y guardarlo en el bolsillo del uniforme.',
              isCorrect: false,
              feedback: 'Incompatible con la vida dental: En un medio seco el ligamento periodontal se necrosa en menos de 15 a 20 minutos.',
            },
          ],
        },
        {
          id: 'sim_dent_4',
          situation: 'El alveolo (hueco en la encía de Sofía) sigue sangrando activamente y la niña tiene la boca llena de sangre.',
          question: '¿Cómo controlas la hemorragia bucal en la enfermería escolar?',
          options: [
            {
              id: 'opt_d4_a',
              text: 'Colocar una gasa limpia doblada sobre la zona y pedirle que muerda con suavidad durante 15-20 minutos sentada con la cabeza hacia adelante.',
              isCorrect: true,
              feedback: '¡Impecable! La hemostasia por compresión suave detiene el sangrado. Inclinar la cabeza hacia adelante evita la ingesta de sangre y náuseas.',
            },
            {
              id: 'opt_d4_b',
              text: 'Acostarla boca arriba con la cabeza inclinada hacia atrás y echarle abundante agua oxigenada en la herida.',
              isCorrect: false,
              feedback: 'Peligroso: La cabeza hacia atrás hace tragar sangre provocando vómitos intensos, y el agua oxigenada lesiona el alveolo en cicatrización.',
            },
          ],
        },
        {
          id: 'sim_dent_5',
          situation: 'El coordinador sugiere esperar a la salida de clase a las 3:00 p.m. para que los padres la lleven con calma a su EPS.',
          question: '¿Cuál es la ventana de tiempo biológica crítica para salvar un diente permanente avulsionado?',
          options: [
            {
              id: 'opt_d5_a',
              text: 'La atención odontológica debe ocurrir preferentemente en los primeros 30 a 60 minutos; cada hora de demora reduce drásticamente el éxito.',
              isCorrect: true,
              feedback: '¡Exacto! El tiempo extraoral seco o prolongado es el factor pronóstico número 1. La urgencia odontológica debe ser inmediata.',
            },
            {
              id: 'opt_d5_b',
              text: 'No hay ninguna urgencia horaria; si está conservado puede ser reimplantado sin problemas hasta 3 días después.',
              isCorrect: false,
              feedback: 'Falso: Tras pocas horas, las células periodontales mueren y se producirá anquilosis o reabsorción radicular severa con pérdida del diente.',
            },
          ],
        },
      ],
    },
    consultaRapida: {
      tituloEmergencia: 'Avulsión Dental Permanente',
      preguntaDiagnostica: '¿Es un diente definitivo y cayó al suelo?',
      caminoLeve: {
        condicion: 'Diente de leche (< 6 años)',
        accion: 'NO reimplantar. Compresión suave con gasa y control con odontopediatra.',
      },
      caminoGrave: {
        condicion: 'Diente definitivo (Escolar 6+ años)',
        accion: 'TOMAR SOLO POR LA CORONA. Enjuague rápido con leche. SUMERGIR EN LECHE FRÍA. Dentista en < 60 min.',
      },
      paroOInconsciencia: {
        condicion: 'Si además no responde o vomitó',
        accion: 'Priorizar TEC (cabeza): LLAMAR AL 123 + Posición lateral si respira. El diente queda en segundo plano.',
      },
      prohibiciones: [
        'No tocar ni frotar la raíz.',
        'No envolver en papel seco.',
        'No sumergir en agua de grifo ni alcohol.',
      ],
    },
  },

  // 3. PARO CARDÍACO Y SOSPECHA DE INFARTO
  {
    id: 'paro-cardiaco-infarto',
    number: 3,
    title: 'Paro Cardíaco y Sospecha de Infarto',
    shortDescription: 'Reconocimiento de emergencia cardiovascular, dolor torácico, RCP básica de alta calidad y uso del DEA.',
    category: 'Emergencia Cardiovascular',
    targetAudience: 'Docentes y personal escolar',
    estimatedMinutes: 6,
    icon: 'Activity',
    color: 'danger',
    status: 'activo',
    animationType: 'rcp',
    sources: [
      {
        institution: 'American Heart Association (AHA)',
        document: 'Aspectos destacados de las Guías de RCP y ACE de la AHA',
        year: '2020 / 2023',
        url: 'https://cpr.heart.org',
        clinicalReviewNote: 'Cadena de supervivencia, compresiones torácicas 100-120 cpm y desfibrilación temprana.',
      },
      {
        institution: 'European Resuscitation Council (ERC)',
        document: 'European Resuscitation Council Guidelines: Basic Life Support',
        year: '2021',
        url: 'https://www.cercp.org',
        clinicalReviewNote: 'Protocolo de respuesta ante dolor torácico y colapso súbito.',
      },
    ],
    lastReviewed: '2025-02-15',
    clinicalDisclaimer: 'Fines educativos. El paro cardíaco requiere llamada inmediata al 123 e inicio precoz de RCP sin demora.',
    images: {
      scene: '/images/casos/sospecha-infarto-escena.webp',
      action: '/images/casos/sospecha-infarto-ayuda.webp',
      sceneAlt: 'Docente adulto en pasillo escolar en posición semisentada con apoyo de una colega ante dolor en el pecho',
      actionAlt: 'Docente realizando llamada de emergencia al 123 junto al desfibrilador externo automático (DEA) escolar',
    },
    contextoEscolar: {
      location: 'Pasillo de aulas o sala de profesores',
      studentName: 'Profesor Carlos (52 años) / Estudiante con cardiopatía congénita',
      scenario: 'Durante el cambio de clase, el docente Carlos se detiene, se lleva la mano al pecho con dolor opresivo, refiere sudoración fría y dificultad para respirar. Segundos después se desvanece pesadamente en el pasillo, queda inmóvil en el suelo y no responde.',
      initialObservation: 'Colapso súbito en el suelo, ausencia de respuesta y respiración anormal o ausente (boqueo/gasping).',
    },
    reconocimiento: {
      description: 'Diferenciar entre persona consciente con dolor torácico (sospecha de infarto) y persona inconsciente que no respira (paro cardíaco confirmado).',
      mild: {
        title: 'Sospecha de Infarto (Persona Consciente)',
        signs: [
          'Dolor opresivo o pesadez en el centro del pecho que puede irradiar al brazo izquierdo o cuello.',
          'Sudor frío, palidez y sensación de falta de aire.',
          'La persona está despierta y puede hablar.',
        ],
        actionSummary: 'Sentar en posición semisentada, aflojar ropa, calmar, llamar urgente al 123 y pedir que traigan el DEA por si colapsa.',
      },
      severe: {
        title: 'Paro Cardiorrespiratorio (Inconsciente)',
        signs: [
          'No responde al llamarlo ni al tocar con firmeza sus hombros.',
          'No respira normalmente (o solo da jadeos agónicos/boqueos inefectivos "gasping").',
          'Color azulado o céreo.',
        ],
        actionSummary: '¡EMERGENCIA MÁXIMA! Ordenar llamar al 123, traer el DEA e iniciar de inmediato compresiones en el centro del pecho.',
      },
    },
    actuacion: [
      {
        stepNumber: 1,
        title: 'Evaluar Respuesta y Seguridad',
        instruction: 'Asegure el pasillo o salón. Arrodíllese junto a la víctima, sacuda suavemente sus hombros y pregunte en voz alta: "¿Me escucha? ¿Se encuentra bien?".',
        visualAid: 'Estímulo verbal y táctil en los hombros.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 2,
        title: 'Verificar Respiración (Máximo 10 Segundos)',
        instruction: 'Mire el pecho durante no más de 10 segundos. Si no se mueve o solo hace boqueos agónicos, asuma que está en Paro Cardíaco.',
        visualAid: 'Observación rápida de la elevación del pecho.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 3,
        title: 'Activar Alarma: Ordenar Llamar al 123 y Pedir DEA',
        instruction: 'Señale a una persona específica con el dedo y ordene: "¡Usted, llame ahora mismo al 123, diga que tenemos una persona en paro y traiga el desfibrilador (DEA) del colegio!".',
        visualAid: 'Asignación directa de la llamada al 123 y búsqueda del DEA escolar.',
        ruleType: 'emergencia-critica',
      },
      {
        stepNumber: 4,
        title: 'Iniciar Compresiones Torácicas de Calidad',
        instruction: 'Coloque el talón de una mano en el centro del pecho (mitad inferior del esternón) y la otra mano entrelazada encima. Con los codos rectos, comprima fuerte y rápido (100 a 120 compresiones por minuto, 5 cm de profundidad). Permita que el pecho regrese por completo.',
        visualAid: 'Brazos perpendiculares a 90 grados, ritmo constante y compresión enérgica.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 5,
        title: 'Encender y Usar el DEA Apenas Llegue',
        instruction: 'Abra el DEA, enciéndalo y siga sus instrucciones de voz. Coloque los parches autoadhesivos en el pecho desnudo (uno bajo la clavícula derecha, otro en el costado izquierdo). Nadie debe tocar a la víctima durante el análisis ni la descarga.',
        visualAid: 'Colocación de parches del DEA según los diagramas visuales del equipo.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 6,
        title: 'Continuar hasta que Llegue la Ambulancia',
        instruction: 'No interrumpa las compresiones excepto cuando el DEA lo indique para analizar o descargar, o hasta que el personal médico del 123 tome el relevo.',
        visualAid: 'Relevo entre docentes cada 2 minutos para evitar agotamiento físico.',
        ruleType: 'cuidado-seguro',
      },
    ],
    senalesAlarma: [
      'Inconsciencia total sin respuesta a estímulos.',
      'Boqueo o ausencia de movimientos respiratorios torácicos.',
      'Colapso súbito en clase de educación física o recreo.',
    ],
    queNoHacer: [
      {
        action: 'NO pierda tiempo buscando el pulso si no es profesional de la salud.',
        consequence: 'Comprobar el pulso demora el inicio de la RCP vital; la falta de respuesta y no respirar es suficiente.',
      },
      {
        action: 'NO le dé agua, alcohol para oler ni pastillas para tragar a una persona desvanecida.',
        consequence: 'Provoca asfixia por broncoaspiración e intoxicación.',
      },
      {
        action: 'NO tema usar el DEA: el equipo es completamente automático y seguro.',
        consequence: 'El DEA analiza el ritmo cardíaco y NUNCA emitirá una descarga si la víctima no la necesita.',
      },
    ],
    simulacion: {
      title: 'Simulación: Colapso Súbito en el Pasillo Escolar',
      scenarioSummary: 'El profesor Pedro (54 años) sufre dolor en el pecho y luego colapsa súbitamente frente a los salones.',
      steps: [
        {
          id: 'sim_rcp_1',
          situation: 'Pedro se sienta en una banca quejándose de opresión intensa en el centro del pecho que se irradia al brazo izquierdo, sudor frío y mareo.',
          question: 'Ante la sospecha de síndrome coronario agudo en un adulto consciente, ¿cuál es tu primera medida?',
          options: [
            {
              id: 'opt_r1_a',
              text: 'Sentarlo en posición semisentada cómoda (45°), aflojarle cuello y corbata, mantenerlo en calma y activar la Línea 123 de inmediato.',
              isCorrect: true,
              feedback: '¡Conducta excelente! La postura semisentada reduce el retorno venoso y la carga de trabajo cardíaco; la activación temprana del 123 es vital.',
            },
            {
              id: 'opt_r1_b',
              text: 'Hacerlo trotar suave por el pasillo para que aumente su circulación y darle un café caliente bien cargado.',
              isCorrect: false,
              feedback: 'Peligrosísimo: El esfuerzo físico y la cafeína aumentan el consumo de oxígeno del miocardio y pueden desencadenar fibrilación ventricular.',
            },
          ],
        },
        {
          id: 'sim_rcp_2',
          situation: 'Pedro pierde bruscamente el conocimiento y resbala al suelo. Varios docentes se aglomeran a su alrededor.',
          question: '¿Cómo evalúas rápidamente su estado vital según el protocolo de la AHA?',
          options: [
            {
              id: 'opt_r2_a',
              text: 'Palmear firmemente sus hombros preguntando "¿Está bien?", y mirar su pecho durante 5 a 10 segundos buscando respiración normal.',
              isCorrect: true,
              feedback: '¡Estándar clínico exacto! Si la víctima no responde y no respira (o solo jadea/boquea de forma anormal), se encuentra en paro cardíaco.',
            },
            {
              id: 'opt_r2_b',
              text: 'Buscar pulso en la muñeca durante un minuto completo y colocarle perfume o alcohol debajo de la nariz.',
              isCorrect: false,
              feedback: 'Peligro de demora: El personal no sanitario no debe retrasar la reanimación buscando pulso ni usar olores irritantes.',
            },
          ],
        },
        {
          id: 'sim_rcp_3',
          situation: 'Pedro no responde ni respira. Hay una docente y el vigilante cerca. Necesitas actuar de inmediato.',
          question: '¿Cómo organizas los roles del equipo escolar?',
          options: [
            {
              id: 'opt_r3_a',
              text: 'Señalar con el dedo al vigilante: "¡Usted llame al 123!", a la docente: "¡Traiga el DEA de la rectoría!", e iniciar compresiones de inmediato.',
              isCorrect: true,
              feedback: '¡Liderazgo eficaz! Asignar órdenes directas y con nombre propio evita el efecto espectador y moviliza los recursos vitales.',
            },
            {
              id: 'opt_r3_b',
              text: 'Irte tú mismo a la portería a buscar las llaves de un automóvil para subirlo y llevarlo al hospital.',
              isCorrect: false,
              feedback: 'Mortal: Trasladar a una persona en paro en un carro particular sin compresiones provoca hipoxia cerebral y muerte antes de llegar.',
            },
          ],
        },
        {
          id: 'sim_rcp_4',
          situation: 'Inicias las compresiones en el centro del tórax sobre el esternón. Otro profesor pregunta por el ritmo y la fuerza.',
          question: '¿Cuáles son los parámetros técnicos indispensables de una RCP de alta calidad?',
          options: [
            {
              id: 'opt_r4_a',
              text: 'Frecuencia de 100 a 120 compresiones por minuto, profundidad de al menos 5 cm y permitir la reexpansión torácica completa tras cada empuje.',
              isCorrect: true,
              feedback: '¡Parámetros oficiales AHA/ERC! Este ritmo (Stayin\' Alive) y profundidad generan la presión de perfusión coronaria y cerebral adecuada.',
            },
            {
              id: 'opt_r4_b',
              text: 'Compresiones lentas de 40 por minuto y superficiales (2 cm) para evitar quebrar las costillas.',
              isCorrect: false,
              feedback: 'Ineficaz: Las compresiones lentas o superficiales no generan gasto cardíaco suficiente para mantener oxigenado el cerebro.',
            },
          ],
        },
        {
          id: 'sim_rcp_5',
          situation: 'Llega el DEA escolar. Lo colocan junto a ti mientras realizas el ciclo de compresiones.',
          question: '¿Cuál es la secuencia correcta y segura de operación del DEA?',
          options: [
            {
              id: 'opt_r5_a',
              text: 'Encender el DEA de inmediato, colocar los parches en el pecho seco según las ilustraciones y suspender el contacto físico cuando diga "analizando" o "descarga".',
              isCorrect: true,
              feedback: '¡Perfecto! El DEA da instrucciones de voz guiadas y es 100% seguro: solo emitirá descarga si hay un ritmo desfibrilable.',
            },
            {
              id: 'opt_r5_b',
              text: 'Dejar el DEA en su caja cerrada hasta que llegue la ambulancia con los paramédicos por miedo a sufrir una descarga eléctrica.',
              isCorrect: false,
              feedback: 'Grave error: Cada minuto de retraso en la desfibrilación reduce las posibilidades de supervivencia en un 10%. El DEA está diseñado para uso de legos.',
            },
          ],
        },
      ],
    },
    consultaRapida: {
      tituloEmergencia: 'Paro Cardiorrespiratorio Escolar',
      preguntaDiagnostica: '¿Responde a estímulos? ¿Respira con normalidad?',
      caminoLeve: {
        condicion: 'Consciente con dolor torácico',
        accion: 'Posición semisentada. Aflojar ropa. Calmar. LLAMAR 123. Tener DEA a mano.',
      },
      caminoGrave: {
        condicion: 'NO responde y NO respira',
        accion: 'LLAMAR AL 123 + TRAER DEA + COMPRESIONES en centro del pecho (100-120 por minuto sin parar).',
      },
      paroOInconsciencia: {
        condicion: 'Al llegar el DEA',
        accion: 'Encenderlo de inmediato, pegar parches en pecho seco y seguir las órdenes de voz del equipo.',
      },
      prohibiciones: [
        'No tardar buscando pulso.',
        'No dar líquidos ni comida.',
        'No interrumpir compresiones innecesariamente.',
      ],
    },
  },

  // 4. GOLPES EN LA CABEZA Y CHICHÓN (TRAUMATISMO CRANEAL / HEMATOMA)
  {
    id: 'chichones-golpes-cabeza',
    number: 4,
    title: 'Golpes en la Cabeza y Chichón',
    shortDescription: 'Evaluación de hematomas epicraneales leves frente a banderas rojas de traumatismo encéfalo-craneano (TEC) y conmoción.',
    category: 'Traumatismo Craneal',
    targetAudience: 'Docentes y personal escolar',
    estimatedMinutes: 5,
    icon: 'Brain',
    color: 'primary',
    status: 'activo',
    animationType: 'chichon',
    sources: [
      {
        institution: 'CDC (Centros para el Control y la Prevención de Enfermedades)',
        document: 'HEADS UP to Schools: Concussion Signs and Symptoms in Primary Education',
        year: '2021',
        url: 'https://www.cdc.gov/headsup',
        clinicalReviewNote: 'Banderas rojas de daño cerebral traumático y protocolo de observación escolar.',
      },
      {
        institution: 'Academia Americana de Pediatría (AAP)',
        document: 'Evaluation and Management of Childhood Head Injuries in School',
        year: '2020',
        url: 'https://www.aap.org',
        clinicalReviewNote: 'Diferenciación de hematoma epicraneal benigno (chichón) vs lesión intracraneal.',
      },
    ],
    lastReviewed: '2025-02-15',
    clinicalDisclaimer: 'Todo golpe craneal con alteración de la memoria o vómitos requiere valoración médica urgente.',
    images: {
      scene: '/images/casos/golpe-cabeza-escena.webp',
      action: '/images/casos/golpe-cabeza-senales.webp',
      sceneAlt: 'Docente evaluando nivel de orientación y respuesta de un estudiante sentado en el patio tras un tropiezo',
      actionAlt: 'Aplicación cuidadosa de compresa fría envuelta en paño limpio sobre la frente sin hielo directo',
    },
    contextoEscolar: {
      location: 'Patio de recreo junto al área de juegos infantiles',
      studentName: 'Lucas (7 años, grado 2°)',
      scenario: 'Durante el recreo, Lucas resbala en las escaleras del tobogán y se golpea fuertemente la frente contra el borde metálico. Llora de inmediato con fuerza. A los dos minutos se le forma un hematoma redondeado e hinchado en la frente ("chichón") con enrojecimiento.',
      initialObservation: 'Llanto inmediato (buen pronóstico), inflamación localizada en frente sin deformidad ósea.',
    },
    reconocimiento: {
      description: 'Diferenciar entre un chichón benigno superficial (hacia afuera) y un traumatismo craneal con banderas rojas neurológicas.',
      mild: {
        title: 'Chichón Leve Benigno (Hematoma Epicraneal)',
        signs: [
          'El niño lloró de inmediato tras el impacto.',
          'Hinchazón localizada visible hacia afuera.',
          'Reconoce al docente, responde a preguntas y no tiene náuseas ni mareo.',
        ],
        actionSummary: 'Aplicar frío local indirecto (hielo envuelto en paño), reposo vigilado y notificación a los padres.',
      },
      severe: {
        title: 'Banderas Rojas de Alarma (Alerta Médica 123)',
        signs: [
          'Pérdida de conciencia (aunque haya sido por pocos segundos).',
          'Vómitos repetidos (más de 1 episodio).',
          'Somnolencia excesiva o dificultad para despertarse.',
          'Pupilas de tamaño desigual (anisocoria).',
          'Salida de líquido claro o sangre por nariz u oídos.',
          'Amnesia: no recuerda qué pasó ni el día de la semana.',
        ],
        actionSummary: 'Inmovilizar el cuello, activar Línea 123 y mantener al estudiante bajo observación médica prioritaria.',
      },
    },
    actuacion: [
      {
        stepNumber: 1,
        title: 'Calmar y Evaluar Nivel de Conciencia',
        instruction: 'Agáchese, dele tranquilidad y hágale 3 preguntas claras: "¿Cómo te llamas? ¿Sabes dónde estamos? ¿Qué estábamos jugando?". Observe si responde con coherencia.',
        visualAid: 'Evaluación rápida de orientación y habla del niño.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 2,
        title: 'Aplicar Frío Local Indirecto',
        instruction: 'Coloque compresas frías o hielo envuelto en un paño limpio durante 10 a 15 minutos sobre el chichón. NUNCA aplique el hielo directamente sobre la piel desnuda.',
        visualAid: 'Hielo cubierto con toalla limpia aplicado suavemente sobre el hematoma.',
        ruleType: 'cuidado-seguro',
      },
      {
        stepNumber: 3,
        title: 'Observación Activa en Enfermería o Aula',
        instruction: 'Mantenga al estudiante sentado o semisentado en reposo. Observe su comportamiento durante 30 a 60 minutos en la escuela.',
        visualAid: 'Vigilancia de signos de alerta y estado de alerta.',
        ruleType: 'cuidado-seguro',
      },
      {
        stepNumber: 4,
        title: 'Si Aparecen Banderas Rojas: Línea 123',
        instruction: 'Si el niño vomita, se muestra confuso, camina torpemente o se duerme sin responder con facilidad, active inmediatamente el traslado urgente al centro de salud.',
        visualAid: 'Activación del 123 ante signos de conmoción o hematoma intracraneal.',
        ruleType: 'emergencia-critica',
      },
    ],
    senalesAlarma: [
      'Pérdida de conciencia, aunque haya durado 2 segundos.',
      'Vómitos en proyectil o repetitivos.',
      'Convulsiones o movimientos espasmódicos.',
      'Asimetría pupilar (un ojo con pupila grande y el otro pequeña).',
      'Líquido claro o sangre saliendo por el oído o la nariz.',
    ],
    queNoHacer: [
      {
        action: 'NUNCA aplique hielo directo sobre la piel sin paño.',
        consequence: 'El frío extremo directo causa quemadura tisular criogénica en la piel sensible del niño.',
      },
      {
        action: 'NO presione con fuerza sobre el chichón ni intente "hundirlo" o sobajearlo.',
        consequence: 'Si existe una microfractura craneal, presionar con fuerza puede hundir fragmentos óseos en la duramadre.',
      },
      {
        action: 'NO administre medicamentos para el dolor (como ibuprofeno o aspirina) sin orden médica.',
        consequence: 'Pueden enmascarar síntomas neurológicos tempranos o aumentar el sangrado interno si hay anticoagulación.',
      },
    ],
    simulacion: {
      title: 'Simulación: Golpe en la Cabeza durante el Recreo',
      scenarioSummary: 'Lucas (7 años) choca de cabeza jugando en el patio y desarrolla un hematoma (chichón) en la frente.',
      steps: [
        {
          id: 'sim_tec_1',
          situation: 'Lucas tropieza y golpea su frente contra un muro de ladrillo. Llora de dolor y en pocos minutos aparece un hematoma ("chichón") redondeado y visible.',
          question: '¿Cuál es la primera intervención terapéutica segura que debes realizar sobre la frente?',
          options: [
            {
              id: 'opt_t1_a',
              text: 'Aplicar hielo envuelto en un paño limpio o compresa fría durante 10 a 15 minutos sin presionar con violencia.',
              isCorrect: true,
              feedback: '¡Correcto! La vasoconstricción producida por el frío disminuye la inflamación y el dolor de forma totalmente segura.',
            },
            {
              id: 'opt_t1_b',
              text: 'Frotar fuertemente el hematoma con una moneda o cuchara metálica haciendo presión para "deshacer la bola de sangre".',
              isCorrect: false,
              feedback: 'Mito muy dañino: Sobar o aplastar el hematoma lesiona los capilares, amplía la hemorragia y puede hundir fragmentos si hay fisura ósea.',
            },
          ],
        },
        {
          id: 'sim_tec_2',
          situation: 'Lucas dice que le palpita la cabeza. En el botiquín del aula hay ibuprofeno y ácido acetilsalicílico (aspirina) de otros docentes.',
          question: '¿Qué conducta farmacológica es obligatoria en el ámbito escolar ante traumatismo craneal?',
          options: [
            {
              id: 'opt_t2_a',
              text: 'NO administrar ningún medicamento analgésico ni sedante en el colegio sin prescripción médica ni consentimiento expreso.',
              isCorrect: true,
              feedback: '¡Estricta prudencia médica! Los analgésicos pueden ocultar el deterioro del nivel de conciencia y la aspirina/ibuprofeno agravan hemorragias internas.',
            },
            {
              id: 'opt_t2_b',
              text: 'Darle una pastilla de aspirina para que se le calme el dolor rápido y pueda continuar sus clases sin llorar.',
              isCorrect: false,
              feedback: 'Prohibición absoluta: La aspirina es antiagregante plaquetario y puede convertir un sangrado cerebral leve en una hemorragia fatal.',
            },
          ],
        },
        {
          id: 'sim_tec_3',
          situation: 'Pasada una hora, Lucas presenta palidez, vomita en dos oportunidades su refrigerio y muestra una somnolencia difícil de revertir.',
          question: '¿Qué indican estos síntomas y qué protocolo debes activar de inmediato?',
          options: [
            {
              id: 'opt_t3_a',
              text: 'Son banderas rojas de hipertensión intracraneal o conmoción cerebral severa: llamar al 123 y remitir a urgencias hospitalarias de inmediato.',
              isCorrect: true,
              feedback: '¡Actuación salvavidas! Vómitos recurrentes y alteración del nivel de conciencia exigen tomografía y valoración neuroquirúrgica inmediata.',
            },
            {
              id: 'opt_t3_b',
              text: 'Acostarlo en una colchoneta oscura a dormir para que repose el estómago del mareo.',
              isCorrect: false,
              feedback: 'Peligro crítico: Confundir una hemorragia intracraneal con cansancio y dejar dormir al niño sin evaluación médica puede ser mortal.',
            },
          ],
        },
        {
          id: 'sim_tec_4',
          situation: 'El golpe de Lucas ocurrió tras caer de espaldas desde un pasamanos de 1.80 metros de altura en el patio.',
          question: 'Ante una caída de altura con golpe craneal, ¿cómo debe protegerse la columna cervical?',
          options: [
            {
              id: 'opt_t4_a',
              text: 'Mantener al escolar acostado, pedirle que no gire la cabeza y sostener manualmente su cabeza alineada con el tronco sin traccionar ni doblar el cuello.',
              isCorrect: true,
              feedback: '¡Inmovilización cervical correcta! Siempre que haya traumatismo craneal por caída de altura se sospecha lesión de columna hasta prueba en contrario.',
            },
            {
              id: 'opt_t4_b',
              text: 'Hacer que se levante y gire vigorosamente la cabeza hacia ambos lados para verificar que no quedó con tortícolis.',
              isCorrect: false,
              feedback: 'Catastrófico: Movilizar forzadamente el cuello con una fractura vertebral inestable puede causar sección medular y parálisis permanente.',
            },
          ],
        },
        {
          id: 'sim_tec_5',
          situation: 'Lucas se encuentra bien, lúcido y sin banderas rojas inmediatas. Su madre llega al colegio a retirarlo.',
          question: '¿Qué información preventiva esencial debe suministrar el colegio a los acudientes para las siguientes 24 a 48 horas?',
          options: [
            {
              id: 'opt_t5_a',
              text: 'Entregar la lista de signos de alarma por escrito (vómitos, confusión, marcha torpe, pupilas desiguales, sueño excesivo) para acudir a urgencias si aparecen.',
              isCorrect: true,
              feedback: '¡Excelente prevención! Los hematomas subdurales o epidurales pueden evolucionar de forma lenta durante las primeras 24-48 horas tras el golpe.',
            },
            {
              id: 'opt_t5_b',
              text: 'Asegurarles que al tener chichón hacia afuera el golpe ya pasó y que no requiere ninguna observación en casa.',
              isCorrect: false,
              feedback: 'Irresponsable: Que el hematoma sea externo no descarta una conmoción o hemorragia interna en fase de desarrollo.',
            },
          ],
        },
      ],
    },
    consultaRapida: {
      tituloEmergencia: 'Golpe en la Cabeza y Chichón',
      preguntaDiagnostica: '¿Lloró de inmediato o perdió el conocimiento / vomitó?',
      caminoLeve: {
        condicion: 'Despierto, orientado, chichón hacia afuera',
        accion: 'HIELO CUBIERTO EN PAÑO por 10-15 min. Reposo. Notificar acudiente para vigilancia en casa.',
      },
      caminoGrave: {
        condicion: 'Vómitos, amnesia, somnolencia, desmayo',
        accion: 'ACTIVAR LÍNEA 123 INMEDIATAMENTE. No mover el cuello. Mantener vías respiratorias libres.',
      },
      prohibiciones: [
        'No frotar ni presionar el chichón con monedas.',
        'No poner hielo directo en la piel.',
        'No dar medicamentos que enmascaren el dolor.',
      ],
    },
  },

  // 5. CAÍDAS, FRACTURAS Y TORCEDURAS (ESGUINCES)
  {
    id: 'caidas-fracturas-torceduras',
    number: 5,
    title: 'Caídas, Fracturas y Torceduras',
    shortDescription: 'Inmovilización inicial de extremidades, manejo de esguinces en educación física y prevención de lesiones nerviosas.',
    category: 'Traumatismo Osteomuscular',
    targetAudience: 'Docentes y personal escolar',
    estimatedMinutes: 6,
    icon: 'ShieldAlert',
    color: 'warning',
    status: 'activo',
    animationType: 'fractura',
    sources: [
      {
        institution: 'American Red Cross',
        document: 'First Aid for Muscle, Bone, and Joint Injuries in Schools',
        year: '2021',
        url: 'https://www.redcross.org',
        clinicalReviewNote: 'Principio RICE y directrices de inmovilización en la posición encontrada.',
      },
      {
        institution: 'Sociedad Colombiana de Cirugía Ortopédica y Traumatología (SCCOT)',
        document: 'Primeros Cuidados en Fracturas Pediátricas Escolares',
        year: '2022',
        url: 'https://www.sccot.org.co',
        clinicalReviewNote: 'Regla de oro: No intentar acomodar el hueso fracturado.',
      },
    ],
    lastReviewed: '2025-02-15',
    clinicalDisclaimer: 'Ante duda diagnóstica entre fractura y esguince, trate siempre como si fuera una fractura hasta tener rayos X.',
    images: {
      scene: '/images/casos/golpe-cabeza-escena.webp',
      action: '/images/casos/golpe-cabeza-senales.webp',
      sceneAlt: 'Docente atendiendo a un estudiante tras una caída en la escalera escolar',
      actionAlt: 'Inmovilización inicial y aplicación de compresa fría indirecta',
    },
    contextoEscolar: {
      location: 'Patios escolares o escalera del pabellón de primaria',
      studentName: 'Mateo (10 años, grado 5°)',
      scenario: 'Al bajar corriendo las escaleras, Mateo dobla su tobillo bruscamente y cae rodando los últimos 3 escalones. Permanece en el suelo quejándose intensamente del tobillo y la muñeca derecha. No puede apoyar el pie y la muñeca presenta una deformidad evidente.',
      initialObservation: 'Incapacidad de mover la extremidad, dolor intenso e inflamación rápida.',
    },
    reconocimiento: {
      description: 'Diferenciar entre torcedura/esguince (dolor articular moderado sin deformidad) y fractura (deformidad ósea, dolor insoportable, crepitación).',
      mild: {
        title: 'Torcedura / Esguince Leve a Moderado',
        signs: [
          'Articulación hinchada sin desviación anormal del eje del hueso.',
          'Puede mover los dedos pero duele al apoyar peso.',
          'Aparición paulatina de moretón local.',
        ],
        actionSummary: 'Protocolo R.I.C.E. (Reposo, Hielo indirecto, Compresión suave con vendaje, Elevación).',
      },
      severe: {
        title: 'Fractura Sospechada o Abierta',
        signs: [
          'Deformidad evidente en la muñeca, brazo o pierna ("en tenedor").',
          'Incapacidad total de mover el miembro.',
          'Sonido de chasquido ("crack") en el momento del accidente.',
          'Fractura abierta: herida donde asoma el hueso o sangrado profuso.',
        ],
        actionSummary: 'Inmovilizar EN LA MISMA POSICIÓN en que quedó. No mover. Cubrir con gasa estéril si hay herida y llamar al 123.',
      },
    },
    actuacion: [
      {
        stepNumber: 1,
        title: 'No Mover a la Víctima Innecesariamente',
        instruction: 'Calme a Mateo en el suelo. Examine la extremidad afectada sin retirar violentamente zapatos o prendas ajustadas que causen dolor.',
        visualAid: 'Examen visual sin forzar el movimiento del miembro lesionado.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 2,
        title: 'Inmovilizar en la Posición Encontrada',
        instruction: 'Si sospecha fractura de muñeca o brazo, fije la articulación con una tablilla, cartón rígido o revistero doblado envuelto en una toalla, sujetándolo con venda elástica suave sin apretar excesivamente.',
        visualAid: 'Férula improvisada con cartón o toalla sujetando la articulación por arriba y por abajo.',
        ruleType: 'accion-clave',
      },
      {
        stepNumber: 3,
        title: 'Retirar Objetos que Puedan Comprimir',
        instruction: 'Si la lesión es en mano o muñeca, retire anillos, relojes o pulseras de inmediato antes de que la inflamación corte la circulación.',
        visualAid: 'Retiro preventivo de accesorios antes del edema.',
        ruleType: 'cuidado-seguro',
      },
      {
        stepNumber: 4,
        title: 'Aplicar Frío Local sin Presionar',
        instruction: 'Coloque hielo envuelto en paño sobre la zona dolorosa para atenuar la inflamación y el dolor.',
        visualAid: 'Compresa fría sobre la zona hinchada.',
        ruleType: 'cuidado-seguro',
      },
      {
        stepNumber: 5,
        title: 'Si la Fractura es Abierta (Hueso Visible)',
        instruction: 'Cubra la herida con apósitos o gasas limpias sin empujar el hueso hacia adentro. Llame urgentemente a la Línea 123.',
        visualAid: 'Cobertura estéril sin manipular el fragmento óseo.',
        ruleType: 'emergencia-critica',
      },
    ],
    senalesAlarma: [
      'Extremidad fría, pálida o morada con pérdida de pulso o sensibilidad (compromiso vascular).',
      'Hueso expuesto a través de la piel (fractura abierta con riesgo de osteomielitis).',
      'Sospecha de lesión asociada en columna cervical o espalda por caída de altura.',
    ],
    queNoHacer: [
      {
        action: 'NUNCA intente "acomodar", enderezar o halar el hueso desviado.',
        consequence: 'Puede desgarrar arterias principales, tendones o nervios adyacentes provocando parálisis permanente.',
      },
      {
        action: 'NO sobe, masajee ni frote fuertemente una articulación recién torcida.',
        consequence: 'El masaje rompe más fibras ligamentosas y amplifica el sangrado interno.',
      },
      {
        action: 'NO permita que el estudiante camine o apoye el pie fracturado para "probar si aguanta".',
        consequence: 'Puede desplazar una fractura no desplazada convirtiéndola en quirúrgica.',
      },
    ],
    simulacion: {
      title: 'Simulación: Caída en las Escaleras del Colegio',
      scenarioSummary: 'Mateo (10 años) cae en las escaleras con deformidad visible en el antebrazo y dolor extremo.',
      steps: [
        {
          id: 'sim_fx_1',
          situation: 'Mateo grita de dolor tras caer en los escalones. Su muñeca y antebrazo presentan una curvatura ósea anormal ("en dorso de tenedor").',
          question: '¿Qué conducta docente respecto al miembro lesionado es la correcta?',
          options: [
            {
              id: 'opt_f1_a',
              text: 'Inmovilizar el antebrazo con un soporte rígido acolchado (cartón, tablilla o férula) exactamente en la posición en que quedó, sin intentar enderezarlo.',
              isCorrect: true,
              feedback: '¡Excelente decisión! Inmovilizar en la posición encontrada previene que los extremos óseos rotos desgarren vasos y nervios circundantes.',
            },
            {
              id: 'opt_f1_b',
              text: 'Traccionar y halar con fuerza la mano hacia adelante para regresar el hueso roto a su sitio antes de que se enfríe.',
              isCorrect: false,
              feedback: 'Peligrosísimo: Traccionar un hueso roto sin anestesia ni radiografías puede seccionar la arteria radial o causar lesión nerviosa irreversible.',
            },
          ],
        },
        {
          id: 'sim_fx_2',
          situation: 'En la misma caída, otro alumno, Daniel, se dobla el tobillo pero no hay deformidad ósea; solo hinchazón y dolor al apoyar (posible esguince).',
          question: '¿Cuál es el protocolo de primeros auxilios estándar (RICE) para este tipo de torcedura articular aguda?',
          options: [
            {
              id: 'opt_f2_a',
              text: 'Reposo, Hielo cubierto con tela durante 15 minutos, Vendaje compresivo elástico suave sin estrangular y Elevar el tobillo por encima del corazón.',
              isCorrect: true,
              feedback: '¡Protocolo RICE perfecto! Reduce el edema, limita la hemorragia intersticial y mitiga el dolor articular de manera segura.',
            },
            {
              id: 'opt_f2_b',
              text: 'Aplicar alcohol alcanforado y sobar la articulación con fuerza con los pulgares para acomodar los tendones.',
              isCorrect: false,
              feedback: 'Mito perjudicial: El masaje en caliente sobre un ligamento recién distendido rompe más microfibras y aumenta el sangrado interno.',
            },
          ],
        },
        {
          id: 'sim_fx_3',
          situation: 'Si en lugar de una fractura cerrada, un extremo de hueso perfora la piel y queda expuesto al aire libre sangrando (fractura abierta).',
          question: '¿Cómo debe manejarse la herida y el hueso expuesto en el colegio?',
          options: [
            {
              id: 'opt_f3_a',
              text: 'Cubrir la zona con apósito o gasa estéril humedecida sin presionar el hueso, no reintroducirlo, y llamar de urgencia a la Línea 123.',
              isCorrect: true,
              feedback: '¡Protocolo estéril y seguro! Proteger la herida sin empujar el hueso evita introducir tierra o bacterias al canal medular previniendo osteomielitis.',
            },
            {
              id: 'opt_f3_b',
              text: 'Empujar con los dedos el hueso hacia el interior de la extremidad para que no se seque y cubrirlo con cinta aislante.',
              isCorrect: false,
              feedback: 'Grave error: Reintroducir un hueso contaminado infecta el periostio y puede acarrear amputación o septicemia.',
            },
          ],
        },
        {
          id: 'sim_fx_4',
          situation: 'La mano de Mateo que sufrió la fractura comienza a hincharse rápidamente. El niño lleva puesto un anillo de plata en uno de sus dedos.',
          question: '¿Qué medida preventiva de urgencia circulatoria debes tomar antes de colocar la férula?',
          options: [
            {
              id: 'opt_f4_a',
              text: 'Retirar inmediatamente anillos, pulseras y reloj del miembro afectado antes de que el edema progrese y corte la irrigación sanguínea (isquemia digital).',
              isCorrect: true,
              feedback: '¡Excelente previsión clínica! El edema progresivo convierte los anillos en torniquetes rígidos que pueden causar gangrena en los dedos.',
            },
            {
              id: 'opt_f4_b',
              text: 'Dejar el anillo colocado para no causarle más molestias al niño mientras llora.',
              isCorrect: false,
              feedback: 'Riesgo de isquemia: En menos de 30 minutos el dedo se hincha y el anillo estrangula el flujo venoso y arterial requiriendo corte con sierra.',
            },
          ],
        },
        {
          id: 'sim_fx_5',
          situation: 'Mientras esperan la ambulancia del 123, Mateo tiene sed, está angustiado y pide que le compren una gaseosa y una galleta.',
          question: '¿Por qué está estrictamente prohibido darle comida o bebidas a un escolar con sospecha de fractura antes de llegar al hospital?',
          options: [
            {
              id: 'opt_f5_a',
              text: 'Porque si requiere sedación profunda o cirugía ortopédica inmediata para reducir la fractura, debe tener el estómago vacío para evitar broncoaspiración mortal de vómito bajo anestesia.',
              isCorrect: true,
              feedback: '¡Norma anestésica crítica! Mantener el ayuno estricto permite que los cirujanos y anestesiólogos intervengan sin retrasos ni peligro vital.',
            },
            {
              id: 'opt_f5_b',
              text: 'Porque las bebidas con azúcar impiden que el hueso cicatrice en las primeras semanas de yeso.',
              isCorrect: false,
              feedback: 'Incorrecto: La razón médica estricta es la prevención de broncoaspiración pulmonar durante la inducción anestésica en quirófano.',
            },
          ],
        },
      ],
    },
    consultaRapida: {
      tituloEmergencia: 'Caídas, Fracturas y Torceduras',
      preguntaDiagnostica: '¿Hay deformidad evidente o incapacidad de mover el miembro?',
      caminoLeve: {
        condicion: 'Torcedura sin deformidad (Esguince)',
        accion: 'REPOSO + HIELO CUBIERTO + VENDAJE SUAVE + ELEVAR miembro. No masajear.',
      },
      caminoGrave: {
        condicion: 'Deformidad ósea o dolor extremo (Fractura)',
        accion: 'INMOVILIZAR EN LA POSICIÓN ENCONTRADA con cartón o tablilla. NO intentar enderezar. Avisar a padres y 123.',
      },
      paroOInconsciencia: {
        condicion: 'Fractura abierta (hueso asomado)',
        accion: 'Cubrir con gasa limpia sin presionar. LLAMAR AL 123 URGENTE.',
      },
      prohibiciones: [
        'No enderezar huesos desalineados.',
        'No sobar ni masajear torceduras.',
        'No apoyar la pierna o brazo afectado.',
      ],
    },
  },
]
