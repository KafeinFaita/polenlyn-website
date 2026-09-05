import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Business Name */}
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold tracking-tight text-lg text-slate-100">
            <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
            <span>POLENLYN SOLUTIONS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-slate-400">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Inquiries</a>
        </nav>

        {/* Admin Portal Button */}
        <div className="hidden md:flex items-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 px-3.5 py-1.5 rounded text-xs font-medium transition-all"
          >
            <span>Admin Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-400 hover:text-white p-1"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3 text-sm font-medium text-slate-300">
          <a href="#services" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-white">Services</a>
          <a href="#about" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-white">About</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-white">Inquiries</a>
          <Link 
            to="/login" 
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between pt-2 border-t border-slate-800 text-blue-400 font-semibold"
          >
            <span>Admin Portal</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}