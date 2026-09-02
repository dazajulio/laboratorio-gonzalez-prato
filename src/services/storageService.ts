import { LabExam, PatientLead, SystemConfig } from '../types/lab';
import { INITIAL_EXAMS } from '../data/initialExams';
import { INITIAL_LEADS } from '../data/mockLeads';

const EXAMS_KEY = 'gp_lab_exams_v2';
const LEADS_KEY = 'gp_lab_leads_v1';
const CONFIG_KEY = 'gp_lab_config_v1';

export const DEFAULT_CONFIG: SystemConfig = {
  exchangeRateBsPerUsd: 61.20,
  bcvRateInfo: {
    rate: 61.20,
    lastUpdated: 'Tasa BCV Oficial',
    source: 'BCV Oficial (DolarApi)',
    isAutoSynced: true
  },
  soundAlarmEnabled: true,
  laboratoryName: 'GONZALEZ-PRATO Laboratorio',
  directorName: 'Luisa Carolina González Ramírez',
  receptionPhone: '+58 412 1234567',
  workingHours: 'Lunes a Viernes: 7:00 AM - 4:00 PM | Sábados: 7:00 AM - 12:00 PM',
  address: 'Av. Principal de Salud, Centro Médico Clínico, Nivel 1',
  scheduleConfig: {
    weekdaysOpen: '07:00',
    weekdaysClose: '16:00',
    saturdayEnabled: true,
    saturdayOpen: '07:00',
    saturdayClose: '12:00',
    sundayEnabled: false,
    sundayOpen: '08:00',
    sundayClose: '12:00',
    silenceAlarmsOutOfHours: true,
    outOfHoursCustomMessage: 'Estimado paciente, nuestra sede física se encuentra en receso fuera de horario laboral. He registrado su solicitud con prioridad alta para que nuestra secretaría le atienda a primera hora del siguiente día hábil.'
  }
};

export const storageService = {
  getExams(): LabExam[] {
    const saved = localStorage.getItem(EXAMS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem(EXAMS_KEY, JSON.stringify(INITIAL_EXAMS));
    return INITIAL_EXAMS;
  },
  saveExams(exams: LabExam[]) {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
  },
  getLeads(): PatientLead[] {
    const saved = localStorage.getItem(LEADS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  },
  saveLeads(leads: PatientLead[]) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  },
  getConfig(): SystemConfig {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      try { return { ...DEFAULT_CONFIG, ...JSON.parse(saved) }; } catch (e) {}
    }
    return DEFAULT_CONFIG;
  },
  saveConfig(cfg: SystemConfig) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  },
  resetDefaults() {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(INITIAL_EXAMS));
    localStorage.setItem(LEADS_KEY, JSON.stringify(INITIAL_LEADS));
    localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
  }
};