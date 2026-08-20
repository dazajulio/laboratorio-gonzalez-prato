import { LabExam, KnowledgeDocument, WorkingScheduleConfig } from '../types/lab';
import { knowledgeService } from './knowledgeService';

export interface AgentAnalysisResult {
  replyText: string;
  matchedExams: LabExam[];
  matchedKnowledgeDocs: KnowledgeDocument[];
  totalUsd: number;
  totalBs: number;
  shouldEscalate: boolean;
  isOutOfHours: boolean;
  escalationStatus: 'BOT_ACTIVO' | 'ESCALADO_HUMANO' | 'ESCALADO_FUERA_HORARIO';
  escalationReason?: string;
}

const ESCALATION_TRIGGERS = [
  'secretaria', 'secretario', 'persona', 'humano', 'operador', 'asesor',
  'hablar con alguien', 'hablar con una persona', 'recepcion', 'gerente',
  'reclamo', 'emergencia', 'urgente', 'urgencia', 'domicilio', 'toma a domicilio',
  'transferir', 'doctora', 'luisa', 'gonzalez'
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function isCurrentlyInWorkingHours(schedule?: WorkingScheduleConfig): { isOpen: boolean; nextOpening: string } {
  if (!schedule) return { isOpen: true, nextOpening: 'Horario Regular' };

  const now = new Date();
  const day = now.getDay(); // 0: Dom, 1-5: Lun-Vie, 6: Sab
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hour * 60 + minutes;

  // Domingo
  if (day === 0) {
    if (!schedule.sundayEnabled) {
      return { isOpen: false, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
    }
    const [sOpenH, sOpenM] = (schedule.sundayOpen || '08:00').split(':').map(Number);
    const [sCloseH, sCloseM] = (schedule.sundayClose || '12:00').split(':').map(Number);
    const isOpen = currentMinutes >= (sOpenH * 60 + sOpenM) && currentMinutes < (sCloseH * 60 + sCloseM);
    return { isOpen, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
  }

  // Sábado
  if (day === 6) {
    if (!schedule.saturdayEnabled) {
      return { isOpen: false, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
    }
    const [satOpenH, satOpenM] = (schedule.saturdayOpen || '07:00').split(':').map(Number);
    const [satCloseH, satCloseM] = (schedule.saturdayClose || '12:00').split(':').map(Number);
    const isOpen = currentMinutes >= (satOpenH * 60 + satOpenM) && currentMinutes < (satCloseH * 60 + satCloseM);
    return { isOpen, nextOpening: 'Lunes a las ' + schedule.weekdaysOpen + ' AM' };
  }

  // Lunes a Viernes
  const [wOpenH, wOpenM] = (schedule.weekdaysOpen || '07:00').split(':').map(Number);
  const [wCloseH, wCloseM] = (schedule.weekdaysClose || '16:00').split(':').map(Number);
  const openMins = wOpenH * 60 + wOpenM;
  const closeMins = wCloseH * 60 + wCloseM;
  const isOpen = currentMinutes >= openMins && currentMinutes < closeMins;
  const nextOpening = day === 5 && currentMinutes >= closeMins
    ? (schedule.saturdayEnabled ? 'Sábado a las ' + schedule.saturdayOpen + ' AM' : 'Lunes a las ' + schedule.weekdaysOpen + ' AM')
    : 'Mañana a las ' + schedule.weekdaysOpen + ' AM';

  return { isOpen, nextOpening };
}

export function processPatientMessage(
  userText: string,
  catalog: LabExam[],
  exchangeRate: number,
  scheduleConfig?: WorkingScheduleConfig,
  forceWeekendMode?: boolean
): AgentAnalysisResult {
  const normUser = normalizeText(userText);
  const knowledgeDocs = knowledgeService.getDocs().filter(d => d.active);

  const scheduleStatus = forceWeekendMode ? { isOpen: false, nextOpening: 'Lunes a las 7:00 AM' } : isCurrentlyInWorkingHours(scheduleConfig);
  const isOutOfHours = !scheduleStatus.isOpen;

  // 1. Detección de Handover Humano
  const needsHuman = ESCALATION_TRIGGERS.some(trigger => normUser.includes(trigger));

  if (needsHuman) {
    if (isOutOfHours) {
      const customMsg = scheduleConfig?.outOfHoursCustomMessage || 'Estimado paciente, nuestra sede física se encuentra en receso fuera de horario laboral. He registrado su solicitud con prioridad alta.';
      return {
        replyText: '📌 *ATENCIÓN DE RECEPCIÓN FUERA DE HORARIO*\n\n' + customMsg + '\n\n⏰ *Próxima apertura para atención humana:* ' + scheduleStatus.nextOpening + '.\n\n*(El Asistente Virtual sigue 100% disponible en este chat para cotizar exámenes y consultar ayunos).*',
        matchedExams: [],
        matchedKnowledgeDocs: [],
        totalUsd: 0,
        totalBs: 0,
        shouldEscalate: true,
        isOutOfHours: true,
        escalationStatus: 'ESCALADO_FUERA_HORARIO',
        escalationReason: 'Solicitud humana registrada fuera de horario (Pendiente de guardia)'
      };
    } else {
      return {
        replyText: 'Comprendo perfectamente su solicitud. He notificado de inmediato al personal de recepción y secretaría de *GONZALEZ-PRATO Laboratorio* 🔔.\n\nUn operador humano se encuentra revisando este chat y le responderá directamente en breves momentos. Por favor permanezca en línea.',
        matchedExams: [],
        matchedKnowledgeDocs: [],
        totalUsd: 0,
        totalBs: 0,
        shouldEscalate: true,
        isOutOfHours: false,
        escalationStatus: 'ESCALADO_HUMANO',
        escalationReason: 'Solicitud explícita de atención humana en horario laboral'
      };
    }
  }

  // 2. Búsqueda en Catálogo de Exámenes
  const matchedExams: LabExam[] = [];
  for (const exam of catalog) {
    if (!exam.active) continue;
    const normName = normalizeText(exam.name);
    if (normUser.includes(normName)) {
      matchedExams.push(exam);
      continue;
    }
    for (const syn of exam.synonyms) {
      const normSyn = normalizeText(syn);
      if (normUser.includes(normSyn) && normSyn.length >= 3) {
        matchedExams.push(exam);
        break;
      }
    }
  }

  // 3. Triangulación con Base de Conocimiento (PDFs / RAG)
  const matchedKnowledge: KnowledgeDocument[] = [];
  for (const doc of knowledgeDocs) {
    const hasTopicMatch = doc.keyTopics.some(topic => normUser.includes(normalizeText(topic)));
    const hasSnippetMatch = normalizeText(doc.contentSnippet).includes(normUser) || (normUser.length > 5 && normalizeText(doc.title).includes(normUser));
    if ((normUser.includes('pago') || normUser.includes('seguro') || normUser.includes('zelle') || normUser.includes('pago movil')) && doc.category === 'SEGUROS') {
      matchedKnowledge.push(doc);
    } else if ((normUser.includes('domicilio') || normUser.includes('casa') || normUser.includes('encamado')) && doc.category === 'DOMICILIOS') {
      matchedKnowledge.push(doc);
    } else if ((normUser.includes('antibiotico') || normUser.includes('antibiograma') || normUser.includes('cultivo')) && doc.category === 'PROTOCOLOS') {
      matchedKnowledge.push(doc);
    } else if (hasTopicMatch || hasSnippetMatch) {
      matchedKnowledge.push(doc);
    }
  }

  // 4. Saludos
  const isGreeting = ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal'].some(g => normUser.includes(g));
  if (matchedExams.length === 0 && matchedKnowledge.length === 0 && isGreeting) {
    let greetingReply = '¡Hola! Bienvenido a *GONZALEZ-PRATO Laboratorio* 🧪 (Dirección Técnica: Luisa Carolina González Ramírez).\n\nSoy su Asistente Clínico Virtual disponible 24/7 para brindarle:\n• 💰 Cotizaciones instantáneas de exámenes.\n• ⏱️ Requisitos de ayuno y preparación de muestras.\n• 📋 Formas de pago (Tasa BCV oficial, Pago Móvil, Zelle).\n\n';
    if (isOutOfHours) {
      greetingReply += '*(Nota: Nuestra sede física se encuentra en receso fuera de horario, pero puedo cotizarle y orientarle de inmediato).*\n\n¿Qué prueba médica desea consultar hoy?';
    } else {
      greetingReply += '¿Qué prueba médica o perfil desea consultar hoy?\n*(En cualquier momento puede escribir "secretaria" para hablar con nuestro equipo).*';
    }
    return {
      replyText: greetingReply,
      matchedExams: [],
      matchedKnowledgeDocs: [],
      totalUsd: 0,
      totalBs: 0,
      shouldEscalate: false,
      isOutOfHours,
      escalationStatus: 'BOT_ACTIVO'
    };
  }

  // Sin coincidencia
  if (matchedExams.length === 0 && matchedKnowledge.length === 0) {
    return {
      replyText: 'Disculpe, no logré identificar con exactitud el examen o procedimiento en su mensaje.\n\nEn *GONZALEZ-PRATO Laboratorio* disponemos de áreas de Hematología, Química Sanguínea, Hormonas, Microbiología Automatizada y Marcadores Tumorales.\n\nPor favor indíqueme el nombre exacto de la prueba médica o envíenos los datos de su orden.\n' + (isOutOfHours ? '*(Nuestra sede abrirá el ' + scheduleStatus.nextOpening + ' para atención humana y toma de muestras).*' : '*(O si lo prefiere, escriba "secretaria" para hablar con un asesor).*'),
      matchedExams: [],
      matchedKnowledgeDocs: [],
      totalUsd: 0,
      totalBs: 0,
      shouldEscalate: false,
      isOutOfHours,
      escalationStatus: 'BOT_ACTIVO'
    };
  }

  // Calcular totales
  const totalUsd = matchedExams.reduce((acc, curr) => acc + curr.priceUsd, 0);
  const totalBs = totalUsd * exchangeRate;

  let reply = 'Con gusto le presento la información oficial de *GONZALEZ-PRATO Laboratorio* 🧪:\n\n';
  if (matchedExams.length > 0) {
    reply += '📋 *COTIZACIÓN OFICIAL Y PREPARACIÓN:*\n';
    matchedExams.forEach((exam, idx) => {
      const examBs = (exam.priceUsd * exchangeRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      reply += '*' + (idx + 1) + '. ' + exam.name + '*\n';
      reply += '   💵 *Precio:* $' + exam.priceUsd.toFixed(2) + ' USD (Bs. ' + examBs + ')\n';
      reply += '   🩸 *Tipo de muestra:* ' + exam.sampleType + '\n';
      reply += '   ⌛ *Preparación / Ayuno:* ' + exam.fastingHours + '\n';
      reply += '   ⏱️ *Tiempo de entrega:* ' + exam.turnaround + '\n\n';
    });
    reply += '──────────────────────────\n';
    reply += '💰 *TOTAL A CANCELAR:* **$' + totalUsd.toFixed(2) + ' USD** / **Bs. ' + totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '**\n';
    reply += '*(Calculado a Tasa Oficial BCV: Bs. ' + exchangeRate.toFixed(2) + ' / USD)*\n\n';
  }

  if (matchedKnowledge.length > 0) {
    reply += 'ℹ️ *INFORMACIÓN CLÍNICA ADICIONAL (Base de Conocimiento):*\n';
    matchedKnowledge.slice(0, 2).forEach(doc => {
      reply += '• *' + doc.title + ':* ' + doc.contentSnippet + '\n\n';
    });
  }

  if (isOutOfHours) {
    reply += '📍 *Próxima Apertura de Sede:* ' + scheduleStatus.nextOpening + ' (Toma de muestras matutina).\n';
    reply += 'Le esperamos en nuestra sede. Si desea dejar una orden agendada, puede indicarlo por aquí.';
  } else {
    reply += '📍 *Horario de Toma de Muestras:* Lunes a Viernes de 7:00 AM a 11:30 AM.\n';
    reply += '¿Desea agendar su turno o requiere alguna orientación adicional?';
  }

  return {
    replyText: reply,
    matchedExams,
    matchedKnowledgeDocs: matchedKnowledge,
    totalUsd,
    totalBs,
    shouldEscalate: false,
    isOutOfHours,
    escalationStatus: 'BOT_ACTIVO'
  };
}