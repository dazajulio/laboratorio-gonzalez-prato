import { PatientLead } from '../types/lab';

export const INITIAL_LEADS: PatientLead[] = [
  {
    id: 'lead-1',
    whatsapp: '+58 412 1234567',
    name: 'Dr. Marcos Valero (Paciente)',
    documentId: 'V-14.890.321',
    lastMessage: 'Por favor requiero hablar con la secretaria para coordinar toma de muestra a domicilio para una persona mayor.',
    status: 'ESCALADO_HUMANO',
    timestamp: '10:14 AM',
    examsRequested: ['Hematología Completa', 'Urocultivo Automatizado con Antibiograma', 'Glicemia en ayunas'],
    totalQuotedUsd: 47.0,
    createdAt: '2026-08-19 10:05:00',
    messages: [
      {
        id: 'm-1',
        sender: 'PACIENTE',
        text: 'Buenos días, necesito saber el costo de hematología, urocultivo y glicemia',
        timestamp: '10:05 AM'
      },
      {
        id: 'm-2',
        sender: 'BOT',
        text: '¡Buenos días! Es un placer atenderle en *GONZALEZ-PRATO Laboratorio* 🧪.\n\nHe preparado su cotización:\n\n• *Hematología Completa*: $7.50 (Ayuno: 4 a 8 horas)\n• *Glicemia en ayunas*: $4.50 (Ayuno: 8 a 12 horas estrictas)\n• *Urocultivo Automatizado con Antibiograma*: $35.00 (Primera orina, retención 4h)\n\n💰 *Total Presupuesto:* $47.00 USD (Aprox. Bs 2,820.00)\n\n¿Desea conocer los requisitos exactos de toma de muestra o requiere coordinar una cita?',
        timestamp: '10:06 AM',
        quotedExams: ['Hematología Completa', 'Glicemia en ayunas', 'Urocultivo Automatizado con Antibiograma'],
        totalUsd: 47.0
      },
      {
        id: 'm-3',
        sender: 'PACIENTE',
        text: 'Por favor requiero hablar con la secretaria para coordinar toma de muestra a domicilio para una persona mayor.',
        timestamp: '10:14 AM'
      },
      {
        id: 'm-4',
        sender: 'BOT',
        text: 'Con mucho gusto. Estoy transfiriendo su solicitud de inmediato a nuestra secretaria de recepción para coordinar el servicio a domicilio. Nuestro equipo le atenderá por este mismo canal en breves minutos.',
        timestamp: '10:14 AM'
      }
    ]
  },
  {
    id: 'lead-2',
    whatsapp: '+58 414 9876543',
    name: 'Elena Rondón',
    documentId: 'V-20.456.789',
    lastMessage: 'Excelente, muchas gracias por la información del ayuno de TSH.',
    status: 'BOT_ACTIVO',
    timestamp: '10:02 AM',
    examsRequested: ['TSH Ultrasensible', 'T4 Libre'],
    totalQuotedUsd: 26.0,
    createdAt: '2026-08-19 09:50:00',
    messages: [
      {
        id: 'm-21',
        sender: 'PACIENTE',
        text: 'Hola, cuánto cuesta el perfil de tiroides TSH y T4 libre?',
        timestamp: '09:50 AM'
      },
      {
        id: 'm-22',
        sender: 'BOT',
        text: '¡Hola Elena! Con gusto le detallo los costos en *GONZALEZ-PRATO Laboratorio*:\n\n• *TSH Ultrasensible*: $13.00 (Ayuno 8h, acudir antes de 10:00 AM)\n• *T4 Libre*: $13.00 (Ayuno 8h, acudir antes de 10:00 AM)\n\n💰 *Total:* $26.00 USD\n\n*Indicaciones:* Si toma Levotiroxina (Euthyrox), acuda en ayunas a sacarse la muestra antes de ingerir la pastilla matutina.',
        timestamp: '09:51 AM',
        quotedExams: ['TSH Ultrasensible', 'T4 Libre'],
        totalUsd: 26.0
      },
      {
        id: 'm-23',
        sender: 'PACIENTE',
        text: 'Excelente, muchas gracias por la información del ayuno de TSH.',
        timestamp: '10:02 AM'
      }
    ]
  },
  {
    id: 'lead-3',
    whatsapp: '+58 424 5551234',
    name: 'Ing. Carlos Mendoza',
    documentId: 'V-12.334.901',
    lastMessage: '¿Cuál es el precio del antígeno prostático PSA total?',
    status: 'BOT_ACTIVO',
    timestamp: '08:45 AM',
    examsRequested: ['PSA Total'],
    totalQuotedUsd: 14.0,
    createdAt: '2026-08-19 08:45:00',
    messages: [
      {
        id: 'm-31',
        sender: 'PACIENTE',
        text: '¿Cuál es el precio del antígeno prostático PSA total?',
        timestamp: '08:45 AM'
      },
      {
        id: 'm-32',
        sender: 'BOT',
        text: '¡Buen día Ing. Mendoza! El examen *PSA Total (Antígeno Prostático Específico)* tiene un costo de *$14.00 USD*.\n\n📋 *Requisitos preanalíticos:*\n- Ayuno de 4 a 8 horas.\n- Guardar abstinencia sexual de 48 a 72 horas previas.\n- No haber realizado paseos en bicicleta, caballo o moto 48h antes.\n- Entrega de resultados: 24 horas.',
        timestamp: '08:46 AM',
        quotedExams: ['PSA Total'],
        totalUsd: 14.0
      }
    ]
  }
];