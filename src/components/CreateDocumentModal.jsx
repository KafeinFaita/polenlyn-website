import React, { useState } from 'react';
import { X, Plus, Trash2, FileText, DollarSign } from 'lucide-react';

export default function CreateDocumentModal({ isOpen, onClose, onSave, clients = [] }) {
  if (!isOpen) return null;

  const [docType, setDocType] = useState('Invoice');
  const [docId, setDocId] = useState(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [client, setClient] = useState(clients[0]?.name || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [scopeOverview, setScopeOverview] = useState('');

  // Dynamic Line Items for Invoice
  const [items, setItems] = useState([
    { description: 'Domain Registration Renewal', amount: 'PHP 4,500' },
    { description: 'Service and Maintenance Fee', amount: 'PHP 3,500' }
  ]);

  // Payment Accounts
  const [paymentDetails, setPaymentDetails] = useState([
    'Bank Account #1: BDO 1234-5678-90',
    'Bank Account #2: GCash 0917-000-0000'
  ]);

  const [totalAmount, setTotalAmount] = useState('PHP 8,000 (Eight Thousand Pesos)');

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: 'PHP 0' }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDocument = {
      id: docId,
      client: client || 'Unassigned Client',
      doc_type: docType, // Matches doc_type column
      status: 'In Review',
      date: date,
      scope_overview: scopeOverview || 'Invoice generated for services.', // Matches scope_overview column
      deliverables: items.map(i => ({ 
        deliverable: i.description, 
        amount: i.amount 
      })),
      total_amount: totalAmount,
      payment_details: paymentDetails
    };

    onSave(newDocument);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-500" />
            <h2 className="font-heading font-bold text-white text-base">Create New {docType}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Document Type</label>
              <select 
                value={docType} 
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
              >
                <option value="Invoice">Invoice</option>
                <option value="Project Proposal">Project Proposal</option>
                <option value="Scope of Work (SOW)">Scope of Work (SOW)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Document Ref ID</label>
              <input 
                type="text" 
                value={docId} 
                onChange={(e) => setDocId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Client Name</label>
              <select 
                value={client} 
                onChange={(e) => setClient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
              >
                {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Issue Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          {/* Dynamic Line Items Table */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-slate-400">Invoice Items / Scope Deliverables</label>
              <button 
                type="button" 
                onClick={handleAddItem}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
                <input 
                  type="text" 
                  placeholder="PHP 0,000"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                  className="w-32 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono"
                />
                {items.length > 1 && (
                  <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-400 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Total Amount String</label>
            <input 
              type="text" 
              value={totalAmount} 
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="PHP 13,000 (Thirteen Thousand Pesos)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs text-white font-bold rounded-lg">Save & Generate PDF</button>
          </div>

        </form>
      </div>
    </div>
  );
}