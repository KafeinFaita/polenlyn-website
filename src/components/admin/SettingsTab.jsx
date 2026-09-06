import React from 'react';

export default function SettingsTab() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl space-y-4 max-w-xl">
      <h2 className="font-heading font-bold text-white text-base">Administrative Configuration</h2>
      <p className="text-slate-400 text-xs">
        Manage default document templates, notification preferences, and portal access credentials.
      </p>
      <div className="border-t border-slate-800 pt-4 space-y-3 text-xs text-slate-300">
        <div className="flex justify-between items-center py-2">
          <span>Document Auto-Numbering</span>
          <span className="font-mono text-blue-400 bg-blue-950 px-2 py-1 rounded">DOC-2026-XXX</span>
        </div>
        <div className="flex justify-between items-center py-2 border-t border-slate-800/60">
          <span>Default Proposal Terms</span>
          <span className="text-slate-400">30 Days Validity</span>
        </div>
      </div>
    </div>
  );
}