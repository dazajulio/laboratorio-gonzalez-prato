import React, { useState, useEffect, useRef } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, Eye, EyeOff, X } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  expectedPin?: string;
  targetTabName?: string;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  expectedPin = '1000',
  targetTabName = 'esta sección'
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === expectedPin.trim()) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPin('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 relative">
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-gradient-to-br from-[#00A8B5] to-[#0E4D58] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-900/20">
            <Lock className="w-7 h-7 text-cyan-200" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
            Acceso Administrativo Requerido
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            El acceso a <span className="font-bold text-[#0E4D58]">{targetTabName}</span> está restringido para la Dirección y Administración del laboratorio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
              <span>Contraseña de Administrador (PIN):</span>
              <span className="text-[10px] text-teal-600 font-mono">Por defecto: 1000</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                placeholder="Ingrese contraseña / PIN..."
                className={"w-full pl-10 pr-10 py-3 text-sm rounded-2xl border transition-all font-mono tracking-widest text-center " + (
                  error 
                    ? "border-rose-400 bg-rose-50/50 text-rose-900 focus:ring-2 focus:ring-rose-400/30" 
                    : "border-slate-200 focus:border-[#00A8B5] focus:ring-2 focus:ring-teal-500/20 bg-slate-50 focus:bg-white"
                )}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-2 rounded-xl flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Contraseña incorrecta. Verifique el PIN de acceso.</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all text-center"
            >
              Volver a Bandeja
            </button>
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#00A8B5] to-[#0E4D58] hover:opacity-95 shadow-md shadow-teal-900/10 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Desbloquear</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
