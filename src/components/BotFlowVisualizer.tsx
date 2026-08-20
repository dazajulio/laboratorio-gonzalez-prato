import React from 'react';
import { Workflow, Bot } from 'lucide-react';

export const BotFlowVisualizer: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4"><h2 className="text-base font-bold text-slate-900 flex items-center gap-2"><Workflow className="w-5 h-5 text-[#00A8B5]" />Arquitectura del Flujo de Conversación & Human Handover (Estilo Chatfuel Avanzado)</h2><p className="text-xs text-slate-500 mt-1">Visualización esquemática del orquestador omnicanal con toma de control humano y consulta de base de datos en tiempo real.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-4 space-y-2 shadow-sm"><div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs">1</div><h4 className="font-bold text-xs text-slate-900">Entrada WhatsApp</h4><p className="text-[11px] text-slate-600">Mensaje entrante del paciente vía Meta Cloud API o Webhook n8n.</p></div>
        <div className="bg-teal-50 border-2 border-[#00A8B5] rounded-2xl p-4 space-y-2 shadow-sm"><div className="w-8 h-8 rounded-lg bg-[#00A8B5] text-white flex items-center justify-center font-bold text-xs">2</div><h4 className="font-bold text-xs text-[#0E4D58]">Motor Clínico NLP</h4><p className="text-[11px] text-teal-900">Normalización de sinónimos clínicos y detección de intención.</p></div>
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 space-y-2 shadow-sm"><div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">3A</div><h4 className="font-bold text-xs text-emerald-900">Cotizador Dinámico</h4><p className="text-[11px] text-emerald-800">Consulta tarifario en USD/Bs y genera presupuesto estructurado.</p></div>
        <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-4 space-y-2 shadow-sm"><div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs">3B</div><h4 className="font-bold text-xs text-rose-900">Alarma Human Handover</h4><p className="text-[11px] text-rose-800">Disparo de Web Audio API y alerta en vivo a la recepcionista.</p></div>
      </div>
    </div>
  );
};