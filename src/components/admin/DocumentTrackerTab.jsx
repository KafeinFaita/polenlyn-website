import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function DocumentTrackerTab({ documents, onSelectDocument }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Document ID</th>
              <th className="px-6 py-3.5">Client</th>
              <th className="px-6 py-3.5">Document Type</th>
              <th className="px-6 py-3.5">Date Created</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-blue-400 font-semibold">
                  {doc.id}
                </td>
                <td className="px-6 py-4 font-bold text-white">
                  {doc.client}
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs">
                  {doc.docType}
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">
                  {doc.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${
                    doc.status === 'Approved' 
                      ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400' 
                      : doc.status === 'In Review' 
                      ? 'bg-blue-950/60 border-blue-800/60 text-blue-400' 
                      : 'bg-amber-950/60 border-amber-800/60 text-amber-400'
                  }`}>
                    {doc.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                    {doc.status === 'In Review' && <Clock className="w-3 h-3" />}
                    {doc.status === 'Pending Approval' && <AlertCircle className="w-3 h-3" />}
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onSelectDocument(doc)}
                    className="text-xs font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded transition-colors"
                  >
                    View Doc
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}