import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Menu, 
  X, 
  ArrowUpRight,
  FolderOpen
} from 'lucide-react';

import CreateDocumentModal from '../components/CreateDocumentModal';
import ViewDocumentModal from '../components/ViewDocumentModal';
import DocumentTrackerTab from '../components/admin/DocumentTrackerTab';
import ClientDirectoryTab from '../components/admin/ClientDirectoryTab';
import SettingsTab from '../components/admin/SettingsTab';

export default function Admin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('documents');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // STEP 3: State for selected document preview
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Document & Scope Proposal Records State
  const [documents, setDocuments] = useState([
    { 
      id: 'DOC-2026-001', 
      client: 'Acme Enterprise', 
      docType: 'Project Proposal', 
      status: 'Approved', 
      date: 'Sep 02, 2026',
      scopeOverview: 'Custom web application platform with tailored administrative tools and secure dashboard functionality.',
      deliverables: [
        { id: 1, deliverable: 'Frontend Single-Page React App', detail: 'Tailwind CSS UI styling, Vite build configuration, responsive design.' },
        { id: 2, deliverable: 'Admin Record Engine', detail: 'Tabbed navigation, document creation modals, and client directory table.' }
      ]
    },
    { 
      id: 'DOC-2026-002', 
      client: 'Nexus Digital', 
      docType: 'Scope of Work (SOW)', 
      status: 'In Review', 
      date: 'Sep 04, 2026',
      scopeOverview: 'High-performance digital marketing website redesign and performance optimization.',
      deliverables: [
        { id: 1, deliverable: 'Landing Page Redesign', detail: 'Typewriter dynamic hero header, services grid layout, custom section themes.' }
      ]
    },
    { id: 'DOC-2026-003', client: 'Vanguard Partners', docType: 'Accomplishment Report', status: 'Pending Approval', date: 'Sep 05, 2026' },
    { id: 'DOC-2026-004', client: 'Apex Technologies', docType: 'Technical Scope', status: 'Approved', date: 'Aug 28, 2026' },
  ]);

  // Client Directory Records State
  const [clients] = useState([
    { id: 'CLI-001', name: 'Acme Enterprise', contact: 'contact@acme.com', industry: 'Logistics', status: 'Active' },
    { id: 'CLI-002', name: 'Nexus Digital', contact: 'tech@nexus.io', industry: 'SaaS', status: 'Active' },
    { id: 'CLI-003', name: 'Vanguard Partners', contact: 'info@vanguard.com', industry: 'Finance', status: 'Onboarding' },
    { id: 'CLI-004', name: 'Aventus Health', contact: 'admin@aventus.ph', industry: 'Healthcare Network', status: 'Active' },
    { id: 'CLI-005', name: 'Apex Technologies', contact: 'dev@apex.com', industry: 'E-Commerce', status: 'Inactive' },
  ]);

  const handleSaveDocument = (newDoc) => {
    setDocuments([newDoc, ...documents]);
  };

  const handleLogout = () => {
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
              { id: 'documents', label: 'Document Tracking', icon: FileText },
              { id: 'clients', label: 'Client Directory', icon: Users },
              { id: 'settings', label: 'Portal Settings', icon: Settings },
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

        {/* Logout Button */}
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
          <h1 className="font-heading text-lg font-bold text-white capitalize">
            {activeTab === 'documents' && 'Document & Proposal Tracking'}
            {activeTab === 'clients' && 'Client Directory'}
            {activeTab === 'settings' && 'Portal Settings'}
          </h1>

          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded transition-all"
            >
              <span>View Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Document</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Quick Overview Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">Active Documents</span>
              <div className="flex justify-between items-end pt-1">
                <span className="font-heading font-bold text-2xl text-white">{documents.length}</span>
                <span className="text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-800/50 px-2 py-0.5 rounded flex items-center gap-1">
                  <FolderOpen className="w-3 h-3" /> Proposals & SOWs
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">Registered Clients</span>
              <div className="flex justify-between items-end pt-1">
                <span className="font-heading font-bold text-2xl text-white">{clients.length}</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  4 Active
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">Pending Approvals</span>
              <div className="flex justify-between items-end pt-1">
                <span className="font-heading font-bold text-2xl text-white">
                  {documents.filter(d => d.status !== 'Approved').length}
                </span>
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
                  Needs Action
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder={activeTab === 'clients' ? "Search client directory..." : "Search document ID or client..."} 
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* TAB CONTENT (STEP 3: Passing onSelectDocument) */}
          {activeTab === 'documents' && (
            <DocumentTrackerTab 
              documents={documents} 
              onSelectDocument={(doc) => setSelectedDocument(doc)} 
            />
          )}
          {activeTab === 'clients' && <ClientDirectoryTab clients={clients} />}
          {activeTab === 'settings' && <SettingsTab />}

        </main>
      </div>

      {/* Create Document Modal Component */}
      <CreateDocumentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDocument}
        clients={clients}
      />

      {/* STEP 4: View Document Preview Modal */}
      <ViewDocumentModal 
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        document={selectedDocument}
      />

    </div>
  );
}