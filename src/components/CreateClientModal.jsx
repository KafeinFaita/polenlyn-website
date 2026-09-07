import React, { useState } from 'react';
import { X, Building2, Mail, Briefcase, UserCheck } from 'lucide-react';

export default function CreateClientModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [industry, setIndustry] = useState('');
  const [status, setStatus] = useState('Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClient = {
      id: `CLI-00${Math.floor(Math.random() * 90) + 10}`,
      name: name || 'Unnamed Business',
      contact: contact || 'N/A',
      industry: industry || 'General Services',
      status
    };

    onSave(newClient);
    onClose();

    // Reset form
    setName('');
    setContact('');
    setIndustry('');
    setStatus('Active');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-950 border border-blue-800/60 text-blue-400 rounded-lg">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-white text-base">Add New Client</h2>
              <p className="text-slate-400 text-xs">Register a new client entity in your directory.</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Business / Client Name
            </label>
            <div className="relative">
              <input 
                type="text"
                required
                placeholder="e.g. Acme Enterprise"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Contact Email
            </label>
            <div className="relative">
              <input 
                type="email"
                required
                placeholder="contact@acme.com"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
                Industry
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="e.g. Logistics"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                />
                <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
                Initial Status
              </label>
              <div className="relative">
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <UserCheck className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
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
              Save Client
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}