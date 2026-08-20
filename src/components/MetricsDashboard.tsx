import React from 'react';
import { MessageSquare, CheckCircle2, TrendingUp, Clock, Award } from 'lucide-react';
import { PatientLead, LabExam } from '../types/lab';

interface MetricsDashboardProps {
  leads: PatientLead[];
  exams: LabExam[];
  exchangeRate: number;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ leads, exams, exchangeRate }) => {
  const totalLeads = leads.length;
  const botHandled = leads.filter(l => l.status === 'BOT_ACTIVO').length;
  const resolutionRate = totalLeads > 0 ? ((botHandled / totalLeads) * 100).toFixed(1) : '100.0';
  const totalQuotedUsd = leads.reduce((acc, l) => acc + l.totalQuotedUsd, 0);

  const kpis = [
    { title: 'Consultas Recibidas', value: '428', subtitle: '+18% vs semana previa', icon: MessageSquare, color: 'text-[#00A8B5]', bg: 'bg-teal-50' },
    { title: 'Tasa de Resolución IA', value: resolutionRate + '%', subtitle: 'Sin requerir intervención humana', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Volumen Cotizado (Semana)', value: '$' + totalQuotedUsd.toFixed(0) + ' USD', subtitle: 'Bs. ' + (totalQuotedUsd * exchangeRate).toLocaleString('es-VE'), icon: TrendingUp, color: 'text-[#0E4D58]', bg: 'bg-sky-50' },
    { title: 'Tiempo Promedio de Respuesta', value: '< 1.8 seg', subtitle: 'Vía Meta WhatsApp Cloud API', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const topDemandedExams = [
    { name: 'Hematología Completa', percent: 34, count: 145 },
    { name: 'Glicemia en ayunas / Perfil Lipídico', percent: 28, count: 120 },
    { name: 'TSH Ultrasensible & T4 Libre', percent: 21, count: 90 },
    { name: 'Urocultivo Automatizado', percent: 14, count: 60 },
    { name: 'PSA Total / Antígeno Prostático', percent: 11, count: 47 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold text-slate-500">{kpi.title}</span><div className={"p-2 rounded-xl " + kpi.bg}><Icon className={"w-4 h-4 " + kpi.color} /></div></div>
              <div className="text-2xl font-black text-slate-900">{kpi.value}</div>
              <div className="text-[11px] text-emerald-600 font-medium">{kpi.subtitle}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3"><h3 className="font-bold text-sm text-slate-900 flex items-center gap-2"><Award className="w-4 h-4 text-[#00A8B5]" />Ranking de Exámenes Más Cotizados</h3><span className="text-xs text-slate-400 font-medium">Últimos 30 días</span></div>
          <div className="space-y-3.5">
            {topDemandedExams.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs"><span className="font-bold text-slate-800">{item.name}</span><span className="text-slate-500 font-mono">{item.count} consultas ({item.percent}%)</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-[#00A8B5] to-[#0E4D58] h-full rounded-full" style={{ width: item.percent + '%' }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3"><h3 className="font-bold text-sm text-slate-900">Eficiencia Operativa</h3><p className="text-xs text-slate-500">Distribución de carga de trabajo</p></div>
          <div className="p-4 bg-teal-50/70 border border-teal-100 rounded-xl space-y-2"><div className="flex justify-between items-center text-xs font-bold text-[#0E4D58]"><span>Atención Automatizada (IA):</span><span>86.4%</span></div><p className="text-[11px] text-teal-800">El asistente virtual resuelve autónomamente dudas de precios y ayuno sin recargar a la secretaria.</p></div>
          <div className="p-4 bg-rose-50/70 border border-rose-100 rounded-xl space-y-2"><div className="flex justify-between items-center text-xs font-bold text-rose-800"><span>Escalado a Recepción Humana:</span><span>13.6%</span></div><p className="text-[11px] text-rose-700">Casos de tomas a domicilio o urgencias transferidos en tiempo real.</p></div>
        </div>
      </div>
    </div>
  );
};