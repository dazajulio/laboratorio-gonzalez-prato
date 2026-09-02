import { KnowledgeDocument } from '../types/lab';

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'kb-preanalitica-general',
    title: 'Guía Oficial Preanalítica: Hematología, Coagulación, Química Sanguínea y Endocrinología',
    category: 'PREANALITICA',
    fileName: 'Condiciones_Hematologia_Quimica_Hormonas.pdf',
    fileSize: '2.8 MB',
    uploadedAt: '02/09/2026',
    contentSnippet: 'HEMATOLOGÍA: Ayuno ideal (emergencias en cualquier momento), sin ejercicio intenso ni alcohol/tabaco 24h previas. Notificar tratamientos (anticoagulantes, AINEs, antibióticos, hierro), transfusiones en 3 meses. VSG: Informar procesos febriles, infecciones o embarazo. FROTIS: Sin condiciones. COAGULACIÓN (PT/TP, TPT/PTT, Fibrinógeno): Ayuno 3-4h, notificar anticoagulantes (Warfarina, Acenocumarol, Rivaroxabán, Apixabán, Heparina, Aspirina) y hepatopatías. GRUPO Y RH: Ayuno ligero 4-6h, notificar transfusiones/inmunoglobulinas en 3 meses o RhoGAM en embarazadas. PLAQUETAS: Notificar antiagregantes (Aspirina, Clopidogrel) o AINEs. QUÍMICA: Glicemia basal 8-12h exactas (prohibido chicle/café). Postprandial: 2h exactas post-desayuno en reposo (llegar 20 min antes). Post-carga: solución glucosada 2h reposo. Perfil lipídico: 10-12h estrictas, cenar antes 8pm sin grasas, posponer 2-3 semanas tras cirugías/infecciones. Ácido úrico: 8h+, sin alcohol/cerveza/mariscos 48h. Urea/Creatinina: 8-12h (sin exceso de proteínas ni carne roja/ejercicio 24h). Transaminasas/GGT: 8-12h, sin ejercicio ni alcohol 48h. Bilirrubinas/LDH/Proteínas/Calcio/Fósforo/Magnesio/Electrolitos: 8h+. HORMONAS: Tiroideas (TSH, T4L, T3L): 8h+, toma 7-9 AM, antes de dosis de Levotiroxina, suspender Biotina (Vit B7/B8) 48-72h antes. Anti-TPO/Anti-TG: suspender biotina 48-72h. LH/FSH: 8h+, fase folicular temprana días 2-5, indicar FUM. Prolactina: 8h+, antes de 9 AM, abstinencia sexual y estimulación mamaria 24-48h, sin ejercicio ni estrés agudo, notificar psicofármacos/metoclopramida/anticonceptivos. Progesterona: día 21 del ciclo (fase lútea). Estradiol E2: días 2-4 (fertilidad) o 12-14 (ovulación), notificar FUM/anticonceptivos. DHEA-SO4: 8h+. Cortisol AM: toma 8:00 AM exacta (reposo 20-30 min antes). Cortisol PM: toma 4:00 PM (reposo 20-30 min antes, sin estrés). Insulina Basal: 8-12h estrictas, sin ejercicio el día anterior. Testosterona Total/Libre: 8h+, días 2-5 en mujeres, sin procesos infecciosos agudos.',
    keyTopics: [
      'Hematología y ayuno',
      'Tiempos de Coagulación PT TPT Fibrinógeno',
      'Grupo Sanguíneo y RhoGAM',
      'Glicemia basal y postprandial',
      'Perfil Lipídico 10-12h',
      'Ácido Úrico y alcohol cerveza mariscos',
      'Urea Creatinina carne roja',
      'Transaminasas GOT GPT GGT hepatotóxicos',
      'Tiroides TSH T4L y Levotiroxina',
      'Suspensión de Biotina 48-72h',
      'Prolactina antes de 9am y abstinencia',
      'Cortisol AM 8am y PM 4pm reposo',
      'LH FSH Estradiol días de ciclo',
      'Insulina basal y postcarga',
      'Testosterona Total y Libre'
    ],
    active: true
  },
  {
    id: 'kb-microbiologia',
    title: 'Instructivo Oficial de Recolección de Muestras para Estudios Microbiológicos',
    category: 'MICROBIOLOGIA',
    fileName: 'Condiciones_Estudios_Microbiologicos.pdf',
    fileSize: '2.2 MB',
    uploadedAt: '02/09/2026',
    contentSnippet: 'REGLA GENERAL: Obtener muestra antes de iniciar antibióticos/antifúngicos o 48 a 72 horas luego de finalizado el tratamiento (indicar antibiótico si el médico ordena no suspender). UROCULTIVO: Chorro medio con primera orina matutina o 3-4h de retención. Aseo genital con agua y jabón neutro (NO usar antisépticos ni desinfectantes), secar con toalla limpia, descartar primer chorro y recolectar chorro medio en frasco estéril de farmacia (no vidrio). Mantener refrigerado y transportar con hielo al laboratorio. Bolsa pediátrica: Aseo neutro, cambiar bolsa cada 30 min si no orina hasta obtener muestra. Sonda vesical: Toma por recambio de sonda por personal de salud. COPROCULTIVO: Sin antidiarreicos, bismuto, antiácidos ni aceites minerales. Recipiente limpio no absorbente sin contaminar con orina o agua. Porción tamaño nuez o 5-10 mL con moco/sangre. En lactantes: sin ungüentos/talcos/cremas antipañalitis, colocar pañal al revés (plástico adentro), recoger con espátula inmediatamente, transportar a temp. ambiente. SECRECIONES DE HERIDAS/ÚLCERAS: Sin cremas tópicas ni desinfectantes 24h antes, lavado con agua estéril por personal entrenado. EXUDADO FARÍNGEO: En ayunas, sin cepillarse los dientes, sin enjuagues ni antisépticos bucales. ESPUTO: Enjuague bucal solo con agua (sin dentífrico), primera hora de la mañana con tos profunda del árbol bronquial en frasco estéril (no saliva). SECRECIONES: Nasales (sin gotas ni corticoides 12-24h), Óticas (sin gotas 48h), Oculares (sin colirios 12-24h, retirar lentes de contacto 12h antes, sin maquillaje). ABSCESOS: Aspirado con jeringa. LÍQUIDOS BIOLÓGICOS (LCR, pleural, ascítico, etc.): Toma médica especializada, NUNCA REFRIGERAR, traslado inmediato a temp. ambiente. HEMOCULTIVO: Sin ayuno, antes de antibióticos (o antes de la siguiente dosis), al inicio de fiebre/escalofríos, venopunción periférica, frascos comerciales a temp. ambiente. LAVADO BRONCOALVEOLAR / SECRECIÓN BRONQUIAL: Personal médico, trampa de Lukens sellada, enviar en < 2 horas.',
    keyTopics: [
      'Antibióticos suspender 48-72h',
      'Urocultivo chorro medio y frasco estéril',
      'Aseo genital sin antisépticos',
      'Urocultivo pediátrico bolsa 30 min',
      'Coprocultivo y pañal al revés en lactantes',
      'Exudado faríngeo sin cepillarse los dientes',
      'Esputo expectoración profunda no saliva',
      'Secreciones nasales óticas y oculares',
      'Líquidos biológicos NUNCA refrigerar',
      'Hemocultivo al inicio de fiebre'
    ],
    active: true
  },
  {
    id: 'kb-micologia',
    title: 'Protocolo Clínico de Recolección de Muestras para Estudios Micológicos (Cultivo de Hongos)',
    category: 'MICOLOGIA',
    fileName: 'Condiciones_Estudios_Micologicos_Hongos.pdf',
    fileSize: '1.9 MB',
    uploadedAt: '02/09/2026',
    contentSnippet: 'REGLA GENERAL MICOLOGÍA: NO usar tratamiento antimicótico tópico (cremas, laca de uñas, lociones) ni oral durante un mínimo de 7 a 15 días antes de la toma. 3 días previos no aplicar cosméticos, cremas hidratantes, polvos de talco, perfumes, esmaltes ni antisépticos (yodo, clorhexidina, alcohol) en la zona. A. CULTIVO MICOLÓGICO DE UÑAS (ONICOMICOSIS): No cortarse ni limpiarse las uñas la semana previa. Limpiar uñas con agua y jabón neutro con cepillo suave durante 3 días previos. El día del examen acudir con calzado cerrado y medias limpias (sin talco ni restos sintéticos). Acudir sin esmalte ni endurecedor de uñas por lo menos 3 a 7 días antes. B. CULTIVO MICOLÓGICO DE CABELLO Y CUERO CABELLUDO (Tinea capitis / tiña de cabeza, dermatitis seborreica): No lavar el cabello 24 horas antes de la toma. No aplicar fijadores, lacas, gomina, tintes, aceites capilares ni acondicionadores el día previo ni el día de la toma. Evitar peinado agresivo o cepillado previo que desprenda mecánicamente los pelos afectados. C. CULTIVO MICOLÓGICO DE ESCAMAS DE PIEL (Pitiriasis versicolor, Tiña de cuerpo, ingle, cara, pies o mano / Tinea corporis, cruris, faciei, pedis, manuum): Realizar baño general con agua y jabón neutro 24 horas antes. Evitar la ducha justo antes de la toma para no retirar mecánicamente las escamas córneas superficiales ni deshidratar la zona. Zona afectada completamente limpia y seca, libre de maquillaje, desodorantes (si es axila), talcos o cremas corporales durante al menos 3 días.',
    keyTopics: [
      'Antimicóticos suspender 7-15 días',
      'Micológico de uñas onicomicosis',
      'Uñas sin cortar 1 semana y sin esmalte',
      'Micológico de cuero cabelludo tinea capitis',
      'Cabello sin lavar 24h y sin gel',
      'Micológico de piel pitiriasis y tiñas',
      'Piel sin ducha justo antes y sin cremas',
      'Sin talco perfumes ni antisépticos 3 días'
    ],
    active: true
  },
  {
    id: 'kb-domicilios',
    title: 'Protocolo de Servicio de Toma de Muestras a Domicilio',
    category: 'DOMICILIOS',
    fileName: 'Protocolo_Toma_Muestras_Domicilio_2026.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '12/08/2026',
    contentSnippet: 'El servicio de toma a domicilio está disponible de Lunes a Sábado a partir de las 6:30 AM. Requiere coordinación previa de al menos 24 horas con secretaría para pacientes encamados, tercera edad o postoperados. Recargo de traslado varía según la zona geográfica (Zona Metropolitana $5-$10 USD).',
    keyTopics: ['Pacientes encamados', 'Coordinación 24h', 'Toma matutina 6:30 AM', 'Zonas de cobertura'],
    active: true
  },
  {
    id: 'kb-seguros',
    title: 'Convenios, Seguros Médicos y Formas de Pago Aceptadas',
    category: 'SEGUROS',
    fileName: 'Convenios_Seguros_y_Metodos_Pago_2026.pdf',
    fileSize: '1.2 MB',
    uploadedAt: '05/08/2026',
    contentSnippet: 'Aceptamos pagos en Bolívares (Pago Móvil, Transferencia bancaria a tasa oficial BCV), Divisas en efectivo (USD / Euros), Zelle, Binance Pay y tarjetas internacionales. Aceptamos cartas de garantía de aseguradoras nacionales con clave de validación previa.',
    keyTopics: ['Pago Móvil', 'Tasa oficial BCV', 'Zelle', 'Cartas de garantía', 'Efectivo USD'],
    active: true
  }
];

const KB_STORAGE_KEY = 'gp_lab_knowledge_base_v2';

export const knowledgeService = {
  getDocs(): KnowledgeDocument[] {
    const saved = localStorage.getItem(KB_STORAGE_KEY);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    localStorage.setItem(KB_STORAGE_KEY, JSON.stringify(INITIAL_KNOWLEDGE_DOCS));
    return INITIAL_KNOWLEDGE_DOCS;
  },

  saveDocs(docs: KnowledgeDocument[]) {
    localStorage.setItem(KB_STORAGE_KEY, JSON.stringify(docs));
  },

  addDocument(doc: Omit<KnowledgeDocument, 'id' | 'uploadedAt'>): KnowledgeDocument {
    const docs = this.getDocs();
    const newDoc: KnowledgeDocument = {
      ...doc,
      id: 'kb-' + Date.now(),
      uploadedAt: new Date().toLocaleDateString('es-VE')
    };
    const updated = [newDoc, ...docs];
    this.saveDocs(updated);
    return newDoc;
  },

  toggleDoc(id: string): KnowledgeDocument[] {
    const docs = this.getDocs().map(d => d.id === id ? { ...d, active: !d.active } : d);
    this.saveDocs(docs);
    return docs;
  },

  deleteDoc(id: string): KnowledgeDocument[] {
    const docs = this.getDocs().filter(d => d.id !== id);
    this.saveDocs(docs);
    return docs;
  }
};