import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Menu, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('proposals');

  // Sample data for Proposals / Projects
  const proposals = [
    { id: 'PR-2026-001', client: 'Acme Enterprise', type: 'Web Application', status: 'Completed', amount: '₱120,000', date: 'Sep 02, 2026' },
    { id: 'PR-2026-002', client: 'Nexus Digital', type: 'Marketing Platform', status: 'In Progress', amount: '₱85,000', date: 'Sep 04, 2026' },
    { id: 'PR-2026-003', client: 'Vanguard Partners', type: 'Internal Portal', status: 'Pending Review', amount: '₱150,000', date: 'Sep 05, 2026' },
    { id: 'PR-2026-004', client: 'Apex Technologies', type: 'Database Migration', status: 'Completed', amount: '₱65,000', date: 'Aug 28, 2026' },
  ];

  const handleLogout = () => {
    // Perform any logout logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. SIDEBAR */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between fixed inset-y-0 left-0 z-30 md:static`}
      >
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-5">
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <span className="w-3 h-3 bg-blue-500 rounded-sm shrink-0" />
              {sidebarOpen && (
                <span className="font-heading font-bold text-sm tracking-tight text-white whitespace-nowrap">
                  POLENLYN
                </span>
              )}
            </Link>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {[
              { id: 'proposals', label: 'Proposals & Scope', icon: FileText },
              { id: 'invoices', label: 'Invoices & Billing', icon: Receipt },
              { id: 'clients', label: 'Client Directory', icon: Users },
              { id: 'settings', label: 'System Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {sidebarOpen && <span className="whitespace-nowrap">{tab.label}</span>}
                </button>
              );
            })}
          </nav>

        </div>

        {/* User Info & Logout */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono uppercase text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top App Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="font-heading text-lg font-bold text-white capitalize">
              {activeTab} Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded transition-all"
            >
              <span>View Live Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all">
              <Plus className="w-4 h-4" />
              <span>New Entry</span>
            </button>
          </div>
        </header>

        {/* Main Dashboard Body */}
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Quick Metrics Bar */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Active Proposals</span>
              <div className="flex justify-between items-end">
                <span className="font-heading font-bold text-2xl text-white">4</span>
                <span className="text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-800/50 px-2 py-0.5 rounded">
                  2 Pending
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Total Revenue</span>
              <div className="flex justify-between items-end">
                <span className="font-heading font-bold text-2xl text-white">₱420,000</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  +18% MoM
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Verified Clients</span>
              <div className="flex justify-between items-end">
                <span className="font-heading font-bold text-2xl text-white">5</span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Direct
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">System Status</span>
              <div className="flex justify-between items-end">
                <span className="font-heading font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Operational
                </span>
                <span className="text-xs font-mono text-slate-500">v1.0.0</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search by client or proposal ID..." 
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 w-full sm:w-auto justify-end">
              <span>Filter:</span>
              <button className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded text-white hover:border-slate-700">
                All Statuses
              </button>
            </div>
          </div>

          {/* Proposals & Invoices Data Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950 text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">ID / Document</th>
                    <th className="px-6 py-3.5">Client</th>
                    <th className="px-6 py-3.5">Service Scope</th>
                    <th className="px-6 py-3.5">Amount</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {proposals.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-blue-400 font-semibold">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {item.client}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold text-white">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${
                          item.status === 'Completed' 
                            ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400' 
                            : item.status === 'In Progress' 
                            ? 'bg-blue-950/60 border-blue-800/60 text-blue-400' 
                            : 'bg-amber-950/60 border-amber-800/60 text-amber-400'
                        }`}>
                          {item.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                          {item.status === 'In Progress' && <Clock className="w-3 h-3" />}
                          {item.status === 'Pending Review' && <AlertCircle className="w-3 h-3" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-mono text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded transition-colors">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}