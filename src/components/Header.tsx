import React from 'react';
import { 
  FlaskConical, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Users, 
  DollarSign, 
  Activity, 
  Smartphone, 
  Database, 
  RefreshCw, 
  Settings,
  Lock,
  Unlock,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { BcvRateInfo } from '../types/lab';

interface HeaderProps {
  activeTab: 'inbox' | 'pricing' | 'knowledge' | 'patients' | 'metrics' | 'settings' | 'simulator';
  onSelectTab: (tab: 'inbox' | 'pricing' | 'knowledge' | 'patients' | 'metrics' | 'settings' | 'simulator') => void;
  hasEscalated: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
  bcvRateInfo: BcvRateInfo;
  onRefreshBcv: () => void;
  isRefreshingBcv: boolean;
  isAdminAuthenticated: boolean;
  onLockAdmin: () => void;
  onOpenAdminAuth: (targetTab?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  hasEscalated,
  soundEnabled,
  toggleSound,
  bcvRateInfo,
  onRefreshBcv,
  isRefreshingBcv,
  isAdminAuthenticated,
  onLockAdmin,
  onOpenAdminAuth
}) => {
  const tabs = [
    { id: "inbox", label: "Bandeja en Vivo", icon: MessageSquare, isAdminOnly: false },
    { id: "pricing", label: "Tarifario & Ayunos", icon: DollarSign, isAdminOnly: true },
    { id: "knowledge", label: "Base de Datos", icon: Database, isAdminOnly: true },
    { id: "patients", label: "Pacientes & CRM", icon: Users, isAdminOnly: true },
    { id: "metrics", label: "Analítica", icon: Activity, isAdminOnly: true },
    { id: "settings", label: "Configuración", icon: Settings, isAdminOnly: true },
    { id: "simulator", label: "Simulador WhatsApp", icon: Smartphone, isAdminOnly: true },
  ];

  return (
    <header className="bg-[#0E4D58] text-white px-4 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between shadow-lg border-b-2 border-[#00A8B5] gap-4 sticky top-0 z-50">
      <div className="flex items-center gap-3.5">
        <div className="bg-gradient-to-br from-[#00A8B5] to-[#0E4D58] p-2.5 rounded-xl border border-teal-300/30 shadow-inner flex items-center justify-center">
          <FlaskConical className="w-6 h-6 text-cyan-200" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-base sm:text-lg tracking-wider uppercase text-white drop-shadow-sm">
              GONZALEZ - PRATO
            </h1>
            <span className="bg-[#00A8B5] text-[10px] font-black px-2 py-0.5 rounded tracking-widest text-white shadow-sm">
              LABORATORIO
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-teal-100/90 font-medium">
            <span>Centro de Mando Clínico</span>
            <span className="text-teal-400">•</span>
            <div className="flex items-center gap-1.5 bg-emerald-950/70 text-emerald-300 px-2 py-0.5 rounded-lg border border-emerald-500/40 shadow-inner font-mono text-[10px]">
              <span className="font-bold">BCV Oficial: Bs. {bcvRateInfo.rate.toFixed(2)}</span>
              <button onClick={onRefreshBcv} title="Actualizar tasa oficial BCV en vivo" disabled={isRefreshingBcv} className="hover:text-white transition-all ml-1">
                <RefreshCw className={"w-3 h-3 " + (isRefreshingBcv ? "animate-spin text-cyan-300" : "")} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {hasEscalated && (
          <div className="flex items-center gap-2 bg-rose-600/95 border border-rose-400/50 text-white text-xs font-black px-3.5 py-1.5 rounded-full animate-bounce shadow-xl">
            <AlertTriangle className="w-4 h-4 text-amber-200 animate-pulse" />
            <span className="tracking-wide">¡SECRETARÍA REQUERIDA!</span>
          </div>
        )}

        <button onClick={toggleSound} title={soundEnabled ? "Silenciar alarma" : "Activar sonido de alarma"} className={"flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all " + (soundEnabled ? "bg-[#165A65] border-teal-300/30 text-teal-100 hover:bg-[#1D6B77]" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700")}>
          {soundEnabled ? (<><Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /><span className="hidden sm:inline font-medium">Alarma Activa</span></>) : (<><VolumeX className="w-4 h-4 text-rose-400" /><span className="hidden sm:inline font-medium">Silenciado</span></>)}
        </button>

        {/* ADMIN MODE TOGGLE BUTTON */}
        {isAdminAuthenticated ? (
          <button
            onClick={onLockAdmin}
            title="Bloquear sesión de Administrador y volver a modo Secretaria"
            className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <Unlock className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Modo Admin</span>
            <span className="bg-amber-400/20 text-[9px] px-1.5 py-0.5 rounded font-mono">Bloquear 🔒</span>
          </button>
        ) : (
          <button
            onClick={() => onOpenAdminAuth('pricing')}
            title="Desbloquear funciones de Administrador"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-teal-100 border border-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-teal-300" />
            <span className="hidden sm:inline">Acceso Admin</span>
          </button>
        )}

        <nav className="flex items-center gap-1 bg-[#09353D] p-1 rounded-xl border border-teal-800/40 shadow-inner">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isLocked = tab.isAdminOnly && !isAdminAuthenticated;

            return (
              <button 
                key={tab.id} 
                onClick={() => onSelectTab(tab.id as any)} 
                className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative " + (
                  isActive 
                    ? "bg-[#00A8B5] text-white shadow-md font-bold" 
                    : isLocked
                      ? "text-teal-200/60 hover:text-white hover:bg-white/5"
                      : "text-teal-100/90 hover:text-white hover:bg-white/5"
                )}
                title={isLocked ? `${tab.label} (Requiere PIN de Admin)` : tab.label}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{tab.label}</span>
                {isLocked && (
                  <Lock className="w-2.5 h-2.5 text-amber-300/80 -ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};