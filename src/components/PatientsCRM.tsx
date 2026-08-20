import React, { useState } from 'react';
import { PatientLead } from '../types/lab';
import { Search, Phone } from 'lucide-react';

interface PatientsCRMProps {
  leads: PatientLead[];
  onSelectLead: (id: string) => void;
  exchangeRate: number;
}

export const PatientsCRM: React.FC<PatientsCRMProps> = ({ leads, onSelectLead, exchangeRate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.whatsapp.includes(searchTerm) || (l.documentId && l.documentId.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div><h2 className="text-base font-bold text-slate-900">Directorio de Pacientes & Leads Clínicos</h2><p className="text-xs text-slate-500">Registro consolidado de consultas por WhatsApp, presupuestos emitidos e historial de atención.</p></div>
        <div className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" placeholder="Buscar por nombre, CI o teléfono..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A8B5] w-72" /></div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead><tr className="border-b border-slate-200 text-slate-500 bg-slate-50/70 font-bold"><th className="py-3 px-4">PACIENTE</th><th className="py-3 px-4">WHATSAPP / CONTACTO</th><th className="py-3 px-4">EXÁMENES COTIZADOS</th><th className="py-3 px-4">PRESUPUESTO ($ USD)</th><th className="py-3 px-4">ESTADO</th><th className="py-3 px-4 text-right">ACCIONES</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(lead => (
              <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4"><div className="font-bold text-slate-900">{lead.name}</div><div className="text-[10px] text-slate-400 font-mono">{lead.documentId || 'Sin documento registrado'}</div></td>
                <td className="py-3.5 px-4 font-mono text-slate-600"><div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-teal-600" /><span>{lead.whatsapp}</span></div></td>
                <td className="py-3.5 px-4 text-slate-600 max-w-sm">{lead.examsRequested.length > 0 ? (<div className="flex flex-wrap gap-1">{lead.examsRequested.map((e, idx) => (<span key={idx} className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium">{e}</span>))}</div>) : (<span className="text-slate-400 italic">Consulta general</span>)}</td>
                <td className="py-3.5 px-4 font-bold text-[#0E4D58] font-mono">${'' + lead.totalQuotedUsd.toFixed(2)}<span className="block text-[10px] text-slate-400 font-normal">Bs. {(lead.totalQuotedUsd * exchangeRate).toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></td>
                <td className="py-3.5 px-4"><span className={"px-2.5 py-1 rounded text-[10px] font-bold " + (lead.status === 'ESCALADO_HUMANO' ? 'bg-rose-100 text-rose-700 animate-pulse' : lead.status === 'BOT_ACTIVO' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600')}>{lead.status === 'ESCALADO_HUMANO' ? '🚨 ESCALADO SECRETARÍA' : lead.status}</span></td>
                <td className="py-3.5 px-4 text-right"><button onClick={() => onSelectLead(lead.id)} className="text-xs font-bold text-[#00A8B5] hover:text-[#0E4D58] hover:underline">Ver Conversación →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};