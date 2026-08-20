import React, { useState } from 'react';
import { LabExam, WorkingScheduleConfig } from '../types/lab';
import { processPatientMessage } from '../services/clinicalAiEngine';
import { 
  Send, 
  FlaskConical, 
  Sparkles, 
  RefreshCw, 
  AlertCircle,
  Moon,
  Sun,
  Smartphone
} from 'lucide-react';

interface WhatsAppSimulatorProps {
  catalog: LabExam[];
  exchangeRate: number;
  scheduleConfig?: WorkingScheduleConfig;
  onNewPatientMessage: (messageText: string, isWeekendSimulated?: boolean) => void;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({ 
  catalog, 
  exchangeRate,
  scheduleConfig,
  onNewPatientMessage 
}) => {
  const [simulateWeekend, setSimulateWeekend] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { 
      sender: 'bot', 
      text: "¡Hola! Bienvenido a *GONZALEZ-PRATO Laboratorio* 🧪 (Dirección: Luisa Carolina González Ramírez).\n\nSoy su Asistente Clínico Virtual disponible 24/7. ¿Qué examen o perfil médico desea cotizar hoy?", 
      time: '12:00 PM' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Hola, qué precio tiene la hematología completa y la glicemia?',
    'Cuánto cuesta la prueba de embarazo en sangre (Beta HCG)?',
    'Precio de TSH, T4 libre y qué ayuno necesito',
    'Cultivo de orina con antibiograma y requisitos',
    'Quiero hablar con la secretaria para toma a domicilio urgente',
    'Aceptan pago móvil y tasa oficial BCV?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text, time: timeNow }]);
    setInputText('');
    setIsTyping(true);

    onNewPatientMessage(text, simulateWeekend);

    setTimeout(() => {
      const result = processPatientMessage(text, catalog, exchangeRate, scheduleConfig, simulateWeekend);
      setMessages(prev => [...prev, { sender: 'bot', text: result.replyText, time: timeNow }]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto py-2">
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={"p-2 rounded-xl " + (simulateWeekend ? "bg-indigo-100 text-indigo-700" : "bg-teal-50 text-[#00A8B5]")}>
            {simulateWeekend ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-900">
              Modo de Simulación: {simulateWeekend ? '🌙 Fin de Semana / Fuera de Horario' : '☀️ Horario Laboral Regular'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {simulateWeekend 
                ? 'El bot atiende autónomamente cotizaciones y avisa que secretaría responderá el siguiente día hábil.' 
                : 'Horario laboral activo: solicitudes de personas activan la alarma sonoro-visual en vivo.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSimulateWeekend(!simulateWeekend)}
          className={"px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 " + (
            simulateWeekend 
              ? "bg-indigo-600 text-white shadow" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          )}
        >
          {simulateWeekend ? 'Desactivar Modo Fin de Semana' : 'Simular Fin de Semana'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[430px] bg-slate-900 rounded-[40px] p-3.5 shadow-2xl border-4 border-slate-700 flex flex-col h-[700px]">
            <div className="bg-[#0E4D58] text-white rounded-t-[28px] px-4 py-3.5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00A8B5] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-wide">GONZALEZ-PRATO Lab</h4>
                  <p className="text-[10px] text-teal-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Cuenta Comercial Oficial
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setMessages([{ sender: 'bot', text: '¡Hola! Bienvenido a *GONZALEZ-PRATO Laboratorio* 🧪. ¿Qué examen o perfil médico desea consultar?', time: '12:00 PM' }])} 
                className="p-1.5 text-teal-200 hover:text-white rounded-lg hover:bg-white/10 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 bg-[#EFEAE2] p-3 overflow-y-auto space-y-2.5 text-xs">
              {messages.map((m, i) => (
                <div key={i} className={"flex " + (m.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={"max-w-[85%] p-2.5 rounded-xl shadow text-slate-800 " + (m.sender === 'user' ? 'bg-[#D9FDD3] rounded-tr-none' : 'bg-white rounded-tl-none border border-slate-100')}>
                    <div className="whitespace-pre-line text-xs leading-relaxed">{m.text}</div>
                    <span className="text-[9px] text-slate-400 float-right mt-1 ml-2 font-mono">{m.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="bg-white p-2.5 rounded-xl rounded-tl-none shadow text-[11px] text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00A8B5] rounded-full animate-ping"></span>Escribiendo cotización...
                </div>
              )}
            </div>

            <div className="bg-[#F0F2F5] p-2.5 rounded-b-[28px] flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Mensaje de WhatsApp..." 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                className="flex-1 bg-white text-xs px-3.5 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#00A8B5]" 
              />
              <button onClick={() => handleSend()} className="bg-[#00A8B5] hover:bg-[#0E4D58] text-white p-2.5 rounded-full transition-all shadow">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0E4D58] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00A8B5]" />Pruebas Rápidas del Agente Clínico
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Prueba cómo responde ante peticiones de secretaría en fin de semana vs consultas automáticas de precios:
            </p>
            <div className="space-y-2">
              {quickPrompts.map((prompt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSend(prompt)} 
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-xs text-slate-700 hover:text-[#0E4D58] transition-all font-medium flex items-center justify-between group"
                >
                  <span>"{prompt}"</span><Send className="w-3 h-3 text-slate-300 group-hover:text-[#00A8B5] shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50/80 border border-indigo-200 p-4 rounded-2xl space-y-2 text-xs text-indigo-950">
            <h4 className="font-bold flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-600" />
              Beneficio para la Dueña del Laboratorio
            </h4>
            <p className="leading-relaxed text-[11px]">
              La dueña puede descansar el fin de semana sin temor a perder pacientes: el bot cotiza al instante y deja anotados en una lista limpia a los pacientes que pidieron atención humana para el siguiente día hábil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};