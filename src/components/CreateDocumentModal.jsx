import React, { useState } from 'react';
import { X, Plus, Trash2, FileText, Calendar, Building2, Layers } from 'lucide-react';

export default function CreateDocumentModal({ isOpen, onClose, onSave, clients }) {
  if (!isOpen) return null;

  const [docType, setDocType] = useState('Project Proposal');
  const [clientName, setClientName] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [scopeOverview, setScopeOverview] = useState('');
  
  const [items, setItems] = useState([
    { id: 1, deliverable: 'Frontend React UI & Component Setup', detail: 'Tailwind CSS, Lucide icons, and responsive layouts.' }
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now(), deliverable: '', detail: '' }
    ]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `DOC-2026-00${Math.floor(Math.random() * 90) + 10}`,
      client: clientName || 'Unassigned Client',
      docType,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'In Review',
      scopeOverview,
      deliverables: items
    };

    onSave(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-950 border border-blue-800/60 text-blue-400 rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-white text-base">Generate New Document</h2>
              <p className="text-slate-400 text-xs">Draft a scope proposal, SOW, or report for a client.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Metadata Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
                Document Type
              </label>
              <div className="relative">
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="Project Proposal">Project Proposal</option>
                  <option value="Scope of Work (SOW)">Scope of Work (SOW)</option>
                  <option value="Accomplishment Report">Accomplishment Report</option>
                  <option value="Technical Specification">Technical Specification</option>
                </select>
                <Layers className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
                Client Name
              </label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  list="client-options"
                  placeholder="e.g. Acme Enterprise"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                />
                <datalist id="client-options">
                  {clients?.map((cli) => (
                    <option key={cli.id} value={cli.name} />
                  ))}
                </datalist>
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* Target Completion Date */}
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Target Completion / Delivery Date
            </label>
            <div className="relative">
              <input 
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none transition-colors"
              />
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Scope Overview Description */}
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Executive Summary / Scope Overview
            </label>
            <textarea 
              rows={3}
              placeholder="Outline the primary objectives and technical deliverables of this agreement..."
              value={scopeOverview}
              onChange={(e) => setScopeOverview(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Dynamic Deliverables List */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300">
                Key Scope Deliverables
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-2 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Deliverable 0{index + 1}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input 
                    type="text"
                    placeholder="Deliverable Title (e.g. Single-Page React Portal)"
                    value={item.deliverable}
                    onChange={(e) => handleItemChange(item.id, 'deliverable', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none"
                  />

                  <input 
                    type="text"
                    placeholder="Technical Details / Specifications"
                    value={item.detail}
                    onChange={(e) => handleItemChange(item.id, 'detail', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded px-3 py-1.5 text-xs text-slate-400 placeholder-slate-600 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-800 text-xs font-mono uppercase text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-all shadow-md shadow-blue-600/20"
            >
              Save Document
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}