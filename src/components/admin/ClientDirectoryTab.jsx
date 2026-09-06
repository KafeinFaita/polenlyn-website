import React from 'react';

export default function ClientDirectoryTab({ clients }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Client ID</th>
              <th className="px-6 py-3.5">Business Name</th>
              <th className="px-6 py-3.5">Contact Email</th>
              <th className="px-6 py-3.5">Industry</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {clients.map((cli) => (
              <tr key={cli.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-blue-400 font-semibold">
                  {cli.id}
                </td>
                <td className="px-6 py-4 font-bold text-white">
                  {cli.name}
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs font-mono">
                  {cli.contact}
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs">
                  {cli.industry}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-full border ${
                    cli.status === 'Active' 
                      ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400' 
                      : cli.status === 'Onboarding' 
                      ? 'bg-blue-950/60 border-blue-800/60 text-blue-400' 
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    {cli.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded transition-colors">
                    Edit Profile
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