import React from 'react';
import { X, Printer, Calendar, Building2, CheckCircle2, FileText, Layers } from 'lucide-react';

export default function ViewDocumentModal({ isOpen, onClose, document }) {
  if (!isOpen || !document) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:bg-white print:text-slate-900">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-950 border border-blue-800/60 text-blue-400 rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-white text-base">Document Preview</h2>
              <p className="text-slate-400 text-xs">{document.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono uppercase text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0">
          
          {/* Document Header Metadata */}
          <div className="flex justify-between items-start border-b border-slate-800/80 pb-5 print:border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
                Polenlyn Solution
              </span>
              <h1 className="font-heading font-bold text-xl text-white print:text-slate-900">
                {document.docType}
              </h1>
              <span className="font-mono text-xs text-slate-400 print:text-slate-600 block mt-1">
                Ref ID: {document.id}
              </span>
            </div>

            <div className="text-right space-y-1">
              <span className="text-xs font-mono text-slate-400 block">Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full border bg-emerald-950/60 border-emerald-800/60 text-emerald-400 print:border-slate-300 print:text-slate-800">
                <CheckCircle2 className="w-3 h-3" />
                {document.status}
              </span>
            </div>
          </div>

          {/* Client & Date Details */}
          <div className="grid sm:grid-cols-2 gap-4 bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl print:bg-slate-50 print:border-slate-200">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Client Entity</span>
              <div className="flex items-center gap-2 font-bold text-sm text-slate-200 print:text-slate-900">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{document.client}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Date Issued</span>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300 print:text-slate-800">
                <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{document.date}</span>
              </div>
            </div>
          </div>

          {/* Scope Overview Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase font-semibold text-slate-300 print:text-slate-800">
              Executive Summary & Scope Overview
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 border border-slate-800/60 p-4 rounded-xl print:bg-transparent print:border-slate-200 print:text-slate-700">
              {document.scopeOverview || 'This technical document defines the scope of work, technical architecture, and milestone deliverables agreed upon for this engagement.'}
            </p>
          </div>

          {/* Itemized Deliverables */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase font-semibold text-slate-300 print:text-slate-800">
              Scope Deliverables
            </h3>

            <div className="space-y-2">
              {document.deliverables && document.deliverables.length > 0 ? (
                document.deliverables.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1 print:border-slate-200 print:bg-slate-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-100 print:text-slate-900">
                        0{idx + 1}. {item.deliverable || 'Scope Deliverable'}
                      </span>
                    </div>
                    {item.detail && (
                      <p className="text-xs text-slate-400 print:text-slate-600 pl-4 border-l-2 border-blue-500/50">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-xs font-mono text-slate-500 bg-slate-950 p-4 rounded-xl text-center border border-slate-800">
                  Standard technical milestone deliverables apply.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 flex justify-end bg-slate-950/50 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono uppercase text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}