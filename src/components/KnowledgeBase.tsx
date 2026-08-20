import React, { useState } from 'react';
import { KnowledgeDocument } from '../types/lab';
import { 
  Database, 
  FileText, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Search,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { knowledgeService } from '../services/knowledgeService';

export const KnowledgeBase: React.FC = () => {
  const [docs, setDocs] = useState<KnowledgeDocument[]>(knowledgeService.getDocs());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Doc Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<KnowledgeDocument['category']>('PROTOCOLOS');
  const [newFileName, setNewFileName] = useState('');
  const [newSnippet, setNewSnippet] = useState('');
  const [newTopics, setNewTopics] = useState('');

  const handleToggle = (id: string) => {
    const updated = knowledgeService.toggleDoc(id);
    setDocs(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Desea eliminar este documento de la base de conocimiento?')) {
      const updated = knowledgeService.deleteDoc(id);
      setDocs(updated);
    }
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSnippet.trim()) return;

    const created = knowledgeService.addDocument({
      title: newTitle.trim(),
      category: newCategory,
      fileName: newFileName.trim() || (newTitle.replace(/\s+/g, '_') + '.pdf'),
      fileSize: (Math.random() * 2 + 1).toFixed(1) + ' MB',
      contentSnippet: newSnippet.trim(),
      keyTopics: newTopics.split(',').map(t => t.trim()).filter(Boolean),
      active: true
    });

    setDocs(knowledgeService.getDocs());
    setShowUploadModal(false);
    setNewTitle('');
    setNewSnippet('');
    setNewTopics('');
    setNewFileName('');
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.contentSnippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.keyTopics.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedCategory === 'ALL') return matchesSearch;
    return matchesSearch && doc.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* EXPLICACIÓN DE TRIANGULACIÓN CLÍNICA */}
      <div className="bg-gradient-to-r from-[#0E4D58] to-[#165A65] text-white p-6 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-2xl border border-white/20">
            <Database className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Base de Datos de Conocimiento & Triangulación del Agente IA</h2>
            <p className="text-xs text-teal-100/90">
              El agente clínico combina 3 fuentes en tiempo real para dar respuestas exactas sin alucinaciones:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-xs space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              1. Tarifario Dinámico
            </span>
            <p className="text-teal-100/80 text-[11px]">
              Precios oficiales en USD y cálculo en Bs según la tasa del BCV en vivo.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-xs space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              2. Base de Datos PDF (RAG)
            </span>
            <p className="text-teal-100/80 text-[11px]">
              Protocolos de ayuno, recolección de muestras, tomas a domicilio y convenios de seguros.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-xs space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              3. Human Handover
            </span>
            <p className="text-teal-100/80 text-[11px]">
              Alarma sonora continua en recepción si el paciente requiere secretaría o caso especial.
            </p>
          </div>
        </div>
      </div>

      {/* GESTIÓN DE DOCUMENTOS PDF */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#00A8B5]" />
              Archivos PDF y Fuentes de Conocimiento Activas
            </h3>
            <p className="text-xs text-slate-500">
              Los archivos listados a continuación son leídos por el Agente para complementar sus respuestas al paciente.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#00A8B5] hover:bg-[#0E4D58] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Documento / PDF</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'PREANALITICA', 'PROTOCOLOS', 'DOMICILIOS', 'SEGUROS'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={"px-3 py-1 rounded-xl text-xs font-semibold transition-all " + (
                  selectedCategory === cat
                    ? "bg-[#0E4D58] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat === 'ALL' ? 'Todos los Documentos' : cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar en el contenido o temas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00A8B5] w-full sm:w-64"
            />
          </div>
        </div>

        {/* Document Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map(doc => (
            <div 
              key={doc.id}
              className={"p-5 rounded-2xl border transition-all space-y-3 " + (
                doc.active ? "bg-slate-50/70 border-slate-200 hover:border-teal-300" : "bg-slate-100/50 border-slate-200 opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">{doc.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>📄 {doc.fileName}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span>Subido: {doc.uploadedAt}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggle(doc.id)}
                    className={"px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all " + (
                      doc.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {doc.active ? 'ACTIVO' : 'PAUSADO'}
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  Extracto de Conocimiento Indexado:
                </span>
                {doc.contentSnippet}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400">Temas clave:</span>
                {doc.keyTopics.map((topic, i) => (
                  <span key={i} className="bg-teal-50 text-[#0E4D58] border border-teal-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL PARA AGREGAR NUEVO DOCUMENTO PDF / PROTOCOLO */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#00A8B5]" />
                Incorporar Fuente de Conocimiento al Agente
              </h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDoc} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Título del Documento / Guía:</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Instructivo de Toma de Muestras Pediátricas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A8B5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Categoría:</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A8B5]"
                  >
                    <option value="PREANALITICA">Preanalítica / Ayunos</option>
                    <option value="PROTOCOLOS">Protocolos Clínicos</option>
                    <option value="DOMICILIOS">Toma a Domicilio</option>
                    <option value="SEGUROS">Seguros & Pagos</option>
                    <option value="FAQ_MEDICAS">Preguntas Médicas</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre de Archivo PDF:</label>
                  <input 
                    type="text" 
                    placeholder="ej: Guia_Toma_Muestras.pdf"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A8B5]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Contenido / Instrucciones Médicas que el Agente debe saber:
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Escriba o pegue el texto normativo del protocolo que el bot usará para responder a los pacientes..."
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#00A8B5]"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Palabras y Temas Clave (separados por coma):
                </label>
                <input 
                  type="text" 
                  placeholder="niños, capilar, consentimiento, tiempo ayuno"
                  value={newTopics}
                  onChange={(e) => setNewTopics(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A8B5]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#00A8B5] hover:bg-[#0E4D58] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow"
                >
                  Indexar Documento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};