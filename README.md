# GONZALEZ-PRATO Laboratorio — Centro de Control Operativo & Agente Clínico WhatsApp

Plataforma integral omnicanal especializada para **GONZALEZ-PRATO Laboratorio** (Bajo la dirección técnica de Luisa Carolina González Ramírez), que combina:

1. **Centro de Mando Clínico (Frontend):**
   - **Bandeja de Entrada en Vivo (Live Inbox):** Monitorización de conversaciones WhatsApp con toma de control en vivo por la secretaria.
   - **Protocolo Human Handover & Alarma Sonora (Web Audio API):** Alerta sonora y visual continua en recepción cuando el paciente requiere asistencia personalizada o servicio a domicilio.
   - **Gestor de Catálogo & Tarifario en Tiempo Real:** Edición instantánea de precios en USD y Bolívares (Bs con tasa de cambio configurable), así como parámetros preanalíticos y horas de ayuno.
   - **Directorio de Pacientes (CRM):** Historial estructurado de leads, trazabilidad de exámenes cotizados y montos acumulados.
   - **Simulador Interactivo de WhatsApp:** Entorno de pruebas para evaluar respuestas clínicas del bot y disparadores de alarma.
   - **Telemetría y Analítica:** Indicadores de conversión, tasa de resolución automatizada y tiempos de respuesta.

2. **Estructura del Proyecto:**
```
Laboratorio-Gonzalez-Prato/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types/lab.ts
│   ├── data/initialExams.ts
│   ├── data/mockLeads.ts
│   ├── services/clinicalAiEngine.ts
│   ├── services/audioAlarmService.ts
│   ├── services/storageService.ts
│   └── components/
│       ├── Header.tsx
│       ├── LiveInbox.tsx
│       ├── WhatsAppSimulator.tsx
│       ├── PricingManager.tsx
│       ├── PatientsCRM.tsx
│       ├── MetricsDashboard.tsx
│       └── BotFlowVisualizer.tsx
├── database/
│   ├── schema.sql
│   └── seed.sql
└── agents/
    └── whatsapp_clinical_agent.md
```

## 🚀 Cómo Iniciar la Plataforma en Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Acceder en el navegador a: `http://localhost:3000` (o el puerto asignado por Vite).