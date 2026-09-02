import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveInbox } from './components/LiveInbox';
import { PricingManager } from './components/PricingManager';
import { KnowledgeBase } from './components/KnowledgeBase';
import { PatientsCRM } from './components/PatientsCRM';
import { MetricsDashboard } from './components/MetricsDashboard';
import { SettingsView } from './components/SettingsView';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { AdminAuthModal } from './components/AdminAuthModal';
import { storageService } from './services/storageService';
import { audioAlarm } from './services/audioAlarmService';
import { processPatientMessage } from './services/clinicalAiEngine';
import { fetchLiveBcvRate } from './services/bcvService';
import { LabExam, PatientLead, SystemConfig, BcvRateInfo } from './types/lab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'pricing' | 'knowledge' | 'patients' | 'metrics' | 'settings' | 'simulator'>('inbox');
  const [exams, setExams] = useState<LabExam[]>([]);
  const [leads, setLeads] = useState<PatientLead[]>([]);
  const [config, setConfig] = useState<SystemConfig>(storageService.getConfig());
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [isRefreshingBcv, setIsRefreshingBcv] = useState(false);

  // Admin Role Authentication State (Default: Secretary Mode / Inbox)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('gp_lab_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingTab, setPendingTab] = useState<'pricing' | 'knowledge' | 'patients' | 'metrics' | 'settings' | 'simulator' | null>(null);

  useEffect(() => {
    setExams(storageService.getExams());
    const initialLeads = storageService.getLeads();
    setLeads(initialLeads);
    if (initialLeads.length > 0) {
      setActiveLeadId(initialLeads[0].id);
    }
    handleSyncBcvRate();
  }, []);

  const handleSyncBcvRate = async () => {
    setIsRefreshingBcv(true);
    try {
      const bcvInfo = await fetchLiveBcvRate();
      const newCfg: SystemConfig = {
        ...config,
        exchangeRateBsPerUsd: bcvInfo.rate,
        bcvRateInfo: bcvInfo
      };
      setConfig(newCfg);
      storageService.saveConfig(newCfg);
    } catch (e) {
      console.error('Error sincronizando tasa BCV:', e);
    } finally {
      setIsRefreshingBcv(false);
    }
  };

  const hasUrgentEscalated = leads.some(l => l.status === 'ESCALADO_HUMANO');

  useEffect(() => {
    if (hasUrgentEscalated && config.soundAlarmEnabled) {
      audioAlarm.startContinuousAlarm(3500);
    } else {
      audioAlarm.stopAlarm();
    }
    return () => {
      audioAlarm.stopAlarm();
    };
  }, [hasUrgentEscalated, config.soundAlarmEnabled]);

  const handleToggleSound = () => {
    const updated = !config.soundAlarmEnabled;
    const newCfg = { ...config, soundAlarmEnabled: updated };
    setConfig(newCfg);
    storageService.saveConfig(newCfg);
    audioAlarm.setMuted(!updated);
  };

  const handleUpdateExams = (updated: LabExam[]) => {
    setExams(updated);
    storageService.saveExams(updated);
  };

  const handleSaveConfig = (newConfig: SystemConfig) => {
    setConfig(newConfig);
    storageService.saveConfig(newConfig);
  };

  const handleSelectTab = (tab: 'inbox' | 'pricing' | 'knowledge' | 'patients' | 'metrics' | 'settings' | 'simulator') => {
    if (tab === 'inbox') {
      setActiveTab('inbox');
      return;
    }
    if (isAdminAuthenticated) {
      setActiveTab(tab);
    } else {
      setPendingTab(tab);
      setShowAuthModal(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('gp_lab_admin_auth', 'true');
    } catch {}
    const target = pendingTab || 'pricing';
    setActiveTab(target);
    setShowAuthModal(false);
    setPendingTab(null);
  };

  const handleLockAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('gp_lab_admin_auth');
    } catch {}
    setActiveTab('inbox');
  };

  const handleOpenAdminAuth = (targetTab?: any) => {
    setPendingTab(targetTab || 'pricing');
    setShowAuthModal(true);
  };

  const handleSendMessage = (leadId: string, text: string, sender: 'SECRETARIA' | 'BOT') => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedLeads = leads.map(lead => {
      if (lead.id === leadId) {
        const newMsg = {
          id: 'msg-' + Date.now(),
          sender,
          text,
          timestamp: timeNow
        };
        return {
          ...lead,
          lastMessage: text,
          timestamp: timeNow,
          messages: [...lead.messages, newMsg]
        };
      }
      return lead;
    });
    setLeads(updatedLeads);
    storageService.saveLeads(updatedLeads);
  };

  const handleResolveHandover = (leadId: string) => {
    const updatedLeads = leads.map(l => l.id === leadId ? { ...l, status: 'BOT_ACTIVO' as const } : l);
    setLeads(updatedLeads);
    storageService.saveLeads(updatedLeads);
  };

  const handleNewPatientMessage = (messageText: string, isWeekendSimulated?: boolean) => {
    const analysis = processPatientMessage(messageText, exams, config.exchangeRateBsPerUsd, config.scheduleConfig, isWeekendSimulated);
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const targetLeadId = activeLeadId || 'lead-1';

    const updatedLeads = leads.map(lead => {
      if (lead.id === targetLeadId) {
        const userMsg = {
          id: 'msg-user-' + Date.now(),
          sender: 'PACIENTE' as const,
          text: messageText,
          timestamp: timeNow
        };
        const botMsg = {
          id: 'msg-bot-' + Date.now(),
          sender: 'BOT' as const,
          text: analysis.replyText,
          timestamp: timeNow,
          quotedExams: analysis.matchedExams.map(e => e.name),
          totalUsd: analysis.totalUsd,
          isOutOfHours: analysis.isOutOfHours
        };

        const newExams = Array.from(new Set([...lead.examsRequested, ...analysis.matchedExams.map(e => e.name)]));

        return {
          ...lead,
          lastMessage: messageText,
          status: analysis.shouldEscalate ? analysis.escalationStatus : lead.status,
          timestamp: timeNow,
          examsRequested: newExams,
          totalQuotedUsd: (lead.totalQuotedUsd || 0) + analysis.totalUsd,
          messages: [...lead.messages, userMsg, botMsg],
          isWeekendLead: isWeekendSimulated
        };
      }
      return lead;
    });

    setLeads(updatedLeads);
    storageService.saveLeads(updatedLeads);
  };

  const currentBcvInfo: BcvRateInfo = config.bcvRateInfo || {
    rate: config.exchangeRateBsPerUsd || 61.20,
    lastUpdated: 'Tasa BCV Oficial',
    source: 'BCV DolarApi Oficial',
    isAutoSynced: true
  };

  const tabNames: Record<string, string> = {
    pricing: 'el Tarifario & Ayunos',
    knowledge: 'la Base de Datos',
    patients: 'el CRM de Pacientes',
    metrics: 'la Analítica',
    settings: 'la Configuración',
    simulator: 'el Simulador WhatsApp'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Header 
        activeTab={activeTab} 
        onSelectTab={handleSelectTab} 
        hasEscalated={hasUrgentEscalated} 
        soundEnabled={config.soundAlarmEnabled} 
        toggleSound={handleToggleSound} 
        bcvRateInfo={currentBcvInfo} 
        onRefreshBcv={handleSyncBcvRate} 
        isRefreshingBcv={isRefreshingBcv}
        isAdminAuthenticated={isAdminAuthenticated}
        onLockAdmin={handleLockAdmin}
        onOpenAdminAuth={handleOpenAdminAuth}
      />
      <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
        {activeTab === "inbox" && (
          <LiveInbox 
            leads={leads} 
            activeLeadId={activeLeadId} 
            setActiveLeadId={setActiveLeadId} 
            onSendMessage={handleSendMessage} 
            onResolveHandover={handleResolveHandover} 
            exchangeRate={config.exchangeRateBsPerUsd} 
          />
        )}
        {activeTab === "pricing" && isAdminAuthenticated && (
          <PricingManager 
            exams={exams} 
            onUpdateExams={handleUpdateExams} 
            bcvRateInfo={currentBcvInfo} 
            onRefreshBcv={handleSyncBcvRate} 
            isRefreshingBcv={isRefreshingBcv} 
          />
        )}
        {activeTab === "knowledge" && isAdminAuthenticated && (
          <KnowledgeBase />
        )}
        {activeTab === "patients" && isAdminAuthenticated && (
          <PatientsCRM 
            leads={leads} 
            onSelectLead={(id) => { setActiveLeadId(id); setActiveTab("inbox"); }} 
            exchangeRate={config.exchangeRateBsPerUsd} 
          />
        )}
        {activeTab === "metrics" && isAdminAuthenticated && (
          <MetricsDashboard 
            leads={leads} 
            exams={exams} 
            exchangeRate={config.exchangeRateBsPerUsd} 
          />
        )}
        {activeTab === "settings" && isAdminAuthenticated && (
          <SettingsView 
            config={config} 
            onSaveConfig={handleSaveConfig} 
          />
        )}
        {activeTab === "simulator" && isAdminAuthenticated && (
          <WhatsAppSimulator 
            catalog={exams} 
            exchangeRate={config.exchangeRateBsPerUsd} 
            scheduleConfig={config.scheduleConfig} 
            onNewPatientMessage={handleNewPatientMessage} 
          />
        )}
      </main>

      <AdminAuthModal
        isOpen={showAuthModal}
        onClose={() => { setShowAuthModal(false); setPendingTab(null); }}
        onSuccess={handleAdminAuthSuccess}
        expectedPin={config.adminPin || '1000'}
        targetTabName={pendingTab ? tabNames[pendingTab] : 'esta sección'}
      />
    </div>
  );
}