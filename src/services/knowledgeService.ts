import { KnowledgeDocument } from '../types/lab';

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'kb-1',
    title: 'Manual de Procedimientos Preanalíticos y Preparación de Pacientes',
    category: 'PREANALITICA',
    fileName: 'Guia_Oficial_Preanalitica_Gonzalez_Prato.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '15/08/2026',
    contentSnippet: 'Directrices de ayuno de 8 a 12 horas para química sanguínea y perfil lipídico. No ingerir bebidas azucaradas ni café en ayunas, sólo agua pura. Para orinas de cultivo se exige aseo genital previo sin antisépticos y chorro medio de primera orina matutina con retención mínima de 4 horas.',
    keyTopics: ['Ayuno estricto', 'Recolección de orina', 'Toma de sangre en niños', 'Interferencia por medicamentos'],
    active: true
  },
  {
    id: 'kb-2',
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
    id: 'kb-3',
    title: 'Instructivo para Cultivos Microbiológicos y Antibiogramas MIC',
    category: 'PROTOCOLOS',
    fileName: 'Instructivo_Microbiologia_Cultivos_Automatizados.pdf',
    fileSize: '3.1 MB',
    uploadedAt: '10/08/2026',
    contentSnippet: 'No iniciar terapia antibiótica antes de la toma de muestras para cultivos. En caso de estar recibiendo antibióticos, suspender 48 a 72 horas previas bajo estricta autorización del médico tratante. Tiempos de reporte de antibiograma: 48 a 72 horas con Concentración Inhibitoria Mínima (MIC).',
    keyTopics: ['Suspensión de antibióticos 48-72h', 'Antibiograma MIC', 'Cultivos de heridas', 'Exudados'],
    active: true
  },
  {
    id: 'kb-4',
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

const KB_STORAGE_KEY = 'gp_lab_knowledge_base_v1';

export const knowledgeService = {
  getDocs(): KnowledgeDocument[] {
    const saved = localStorage.getItem(KB_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
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