import React, { useState } from 'react';
import { SystemConfig, WorkingScheduleConfig } from '../types/lab';
import { 
  Settings, 
  Clock, 
  Save, 
  Check, 
  Building2, 
  Sun, 
  Moon
} from 'lucide-react';

interface SettingsViewProps {
  config: SystemConfig;
  onSaveConfig: (newConfig: SystemConfig) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ config, onSaveConfig }) => {
  const [form, setForm] = useState<SystemConfig>(config);
  const [savedFlash, setSavedFlash] = useState(false);

  const handleScheduleChange = (key: keyof WorkingScheduleConfig, value: any) => {
    setForm(prev => ({
      ...prev,
      scheduleConfig: {
        ...prev.scheduleConfig,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(form);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-50 text-[#00A8B5] rounded-2xl border border-teal-100">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Configuración del Centro de Control & Horarios</h2>
            <p className="text-xs text-slate-500">Personaliza horarios de atención, reglas de guardia de fines de semana y datos institucionales.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {savedFlash && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 animate-pulse">
              <Check className="w-4 h-4 text-emerald-600" /> Cambios Guardados
            </span>
          )}
          <button 
            type="submit" 
            className="bg-[#00A8B5] hover:bg-[#0E4D58] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Ajustes</span>
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: HORARIOS DE ATENCIÓN */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#00A8B5]" />
          <h3 className="text-sm font-bold text-slate-900">Horarios de Recepción & Atención Humana</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          {/* Lunes a Viernes */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" /> Lunes a Viernes
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Apertura:</label>
                <input 
                  type="time" 
                  value={form.scheduleConfig.weekdaysOpen} 
                  onChange={(e) => handleScheduleChange("weekdaysOpen", e.target.value)} 
                  className="w-full border border-slate-200 rounded-lg p-1.5 text-xs bg-white font-bold text-[#0E4D58]" 
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Cierre:</label>
                <input 
                  type="time" 
                  value={form.scheduleConfig.weekdaysClose} 
                  onChange={(e) => handleScheduleChange("weekdaysClose", e.target.value)} 
                  className="w-full border border-slate-200 rounded-lg p-1.5 text-xs bg-white font-bold text-[#0E4D58]" 
                />
              </div>
            </div>
          </div>

          {/* Sábados */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Sábados</span>
              <label className="flex items-center gap-1 text-[11px] cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={form.scheduleConfig.saturdayEnabled} 
                  onChange={(e) => handleScheduleChange("saturdayEnabled", e.target.checked)} 
                  className="rounded text-[#00A8B5]" 
                />
                <span>{form.scheduleConfig.saturdayEnabled ? "Abierto" : "Cerrado"}</span>
              </label>
            </div>
            {form.scheduleConfig.saturdayEnabled ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Apertura:</label>
                  <input 
                    type="time" 
                    value={form.scheduleConfig.saturdayOpen} 
                    onChange={(e) => handleScheduleChange("saturdayOpen", e.target.value)} 
                    className="w-full border border-slate-200 rounded-lg p-1.5 text-xs bg-white font-bold text-[#0E4D58]" 
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Cierre:</label>
                  <input 
                    type="time" 
                    value={form.scheduleConfig.saturdayClose} 
                    onChange={(e) => handleScheduleChange("saturdayClose", e.target.value)} 
                    className="w-full border border-slate-200 rounded-lg p-1.5 text-xs bg-white font-bold text-[#0E4D58]" 
                  />
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Sede física cerrada los sábados.</p>
            )}
          </div>

          {/* Domingos */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Domingos</span>
              <label className="flex items-center gap-1 text-[11px] cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={form.scheduleConfig.sundayEnabled} 
                  onChange={(e) => handleScheduleChange("sundayEnabled", e.target.checked)} 
                  className="rounded text-[#00A8B5]" 
                />
                <span>{form.scheduleConfig.sundayEnabled ? "Abierto" : "Cerrado"}</span>
              </label>
            </div>
            {form.scheduleConfig.sundayEnabled ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Apertura:</label>
                  <input 
                    type="time" 
                    value={form.scheduleConfig.sundayOpen} 
                    onChange={(e) => handleScheduleChange("sundayOpen", e.target.value)} 
                    className="w-full border border-slate-200 rounded-lg p-1.5 text-xs bg-white font-bold text-[#0E4D58]" 
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Cierre:</label>
                  <input 
                    type="time" 
                    value={form.scheduleConfig.sundayClose} 
                    onChange={(e) => handleScheduleChange("sundayClose", e.target.value)} 
                    className="w-full border border-slate-200 rounded-lg p-1.5 text-xs bg-white font-bold text-[#0E4D58]" 
                  />
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Sede física cerrada los domingos.</p>
            )}
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: REGLAS PARA FINES DE SEMANA Y NOCHES */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">Comportamiento Fuera de Horario & Fines de Semana</h3>
        </div>
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
            <div>
              <span className="font-bold text-indigo-950 block">Silenciar Alarmas Sonoras en Fines de Semana / Noches</span>
              <p className="text-[11px] text-indigo-800/80">Evita timbres molestos cuando el paciente solicita asesor fuera de horario. La solicitud se registra silenciosamente en la lista de pendientes.</p>
            </div>
            <input 
              type="checkbox" 
              checked={form.scheduleConfig.silenceAlarmsOutOfHours} 
              onChange={(e) => handleScheduleChange("silenceAlarmsOutOfHours", e.target.checked)} 
              className="w-5 h-5 text-[#00A8B5] rounded" 
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Mensaje que dará el Agente cuando pidan asesor en fin de semana / noche:</label>
            <textarea 
              rows={3} 
              value={form.scheduleConfig.outOfHoursCustomMessage} 
              onChange={(e) => handleScheduleChange("outOfHoursCustomMessage", e.target.value)} 
              className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#00A8B5] text-slate-700" 
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: DATOS INSTITUCIONALES */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#00A8B5]" />
          <h3 className="text-sm font-bold text-slate-900">Identidad del Laboratorio</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nombre Comercial:</label>
            <input 
              type="text" 
              value={form.laboratoryName} 
              onChange={(e) => setForm({ ...form, laboratoryName: e.target.value })} 
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs" 
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Directora Técnica / Bioanalista:</label>
            <input 
              type="text" 
              value={form.directorName} 
              onChange={(e) => setForm({ ...form, directorName: e.target.value })} 
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs" 
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Teléfono de Recepción:</label>
            <input 
              type="text" 
              value={form.receptionPhone} 
              onChange={(e) => setForm({ ...form, receptionPhone: e.target.value })} 
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs" 
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Dirección de Sede:</label>
            <input 
              type="text" 
              value={form.address} 
              onChange={(e) => setForm({ ...form, address: e.target.value })} 
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs" 
            />
          </div>
        </div>
      </div>
    </form>
  );
};