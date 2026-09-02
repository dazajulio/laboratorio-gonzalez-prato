export type AttentionStatus = 'BOT_ACTIVO' | 'ESCALADO_HUMANO' | 'ESCALADO_FUERA_HORARIO' | 'FINALIZADO';

export interface LabExam {
  id: string;
  category: string;
  name: string;
  synonyms: string[];
  priceUsd: number;
  priceBs?: number;
  fastingHours: string;
  sampleType: string;
  turnaround: string;
  active: boolean;
  notes?: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'PROTOCOLOS' | 'PREANALITICA' | 'MICROBIOLOGIA' | 'MICOLOGIA' | 'DOMICILIOS' | 'SEGUROS' | 'FAQ_MEDICAS';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  contentSnippet: string;
  keyTopics: string[];
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'PACIENTE' | 'BOT' | 'SECRETARIA';
  text: string;
  timestamp: string;
  quotedExams?: string[];
  totalUsd?: number;
  totalBs?: number;
  knowledgeReferences?: string[];
  isOutOfHours?: boolean;
}

export interface PatientLead {
  id: string;
  whatsapp: string;
  name: string;
  documentId?: string;
  lastMessage: string;
  status: AttentionStatus;
  timestamp: string;
  examsRequested: string[];
  totalQuotedUsd: number;
  messages: ChatMessage[];
  createdAt: string;
  isWeekendLead?: boolean;
}

export interface BcvRateInfo {
  rate: number;
  lastUpdated: string;
  source: string;
  isAutoSynced: boolean;
}

export interface WorkingScheduleConfig {
  weekdaysOpen: string;
  weekdaysClose: string;
  saturdayEnabled: boolean;
  saturdayOpen: string;
  saturdayClose: string;
  sundayEnabled: boolean;
  sundayOpen: string;
  sundayClose: string;
  silenceAlarmsOutOfHours: boolean;
  outOfHoursCustomMessage: string;
}

export interface SystemConfig {
  exchangeRateBsPerUsd: number;
  bcvRateInfo: BcvRateInfo;
  soundAlarmEnabled: boolean;
  laboratoryName: string;
  directorName: string;
  receptionPhone: string;
  workingHours: string;
  address: string;
  scheduleConfig: WorkingScheduleConfig;
  adminPin?: string;
}