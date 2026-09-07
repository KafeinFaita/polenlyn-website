import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Briefcase, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function SettingsTab({ userProfile, onProfileUpdate }) {
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Sync component state when userProfile is loaded from Admin.jsx
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.full_name || '');
      setPosition(userProfile.position || '');
      setContactNumber(userProfile.contact_number || '');
      setEmail(userProfile.email || '');
    }
  }, [userProfile]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage({ type: 'error', text: 'No active authentication session found.' });
      setSaving(false);
      return;
    }

    const updates = {
      id: user.id,
      full_name: fullName,
      position: position,
      contact_number: contactNumber,
      email: email,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(updates)
      .select()
      .single();

    setSaving(false);

    if (error) {
      setMessage({ type: 'error', text: `Failed to update profile: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: 'Issuer profile saved successfully!' });
      if (onProfileUpdate) onProfileUpdate(data);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      
      {/* Profile Header */}
      <div>
        <h2 className="text-xl font-heading font-bold text-white tracking-tight">
          Issuer Profile & Credentials
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal signatory identity used on generated invoices, quotes, and technical proposals.
        </p>
      </div>

      {/* Alert Banner */}
      {message.text && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 border ${
            message.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
              : 'bg-red-950/60 border-red-800/80 text-red-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 shadow-xl">
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Full Name / Signatory
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Lynyrd Andres"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                required
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Official Title / Position
            </label>
            <div className="relative">
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="IT Solutions Specialist"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
              <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Contact Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lynyrd@polenlyn.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
              Contact Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+63 900 000 0000"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white font-semibold px-5 py-2.5 rounded-lg text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* System Defaults Summary Card */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="font-heading font-bold text-white text-base">Administrative System Defaults</h2>
        <p className="text-slate-400 text-xs">
          Global company standards applied to Polenlyn Solutions outputs.
        </p>
        <div className="border-t border-slate-800 pt-4 space-y-3 text-xs text-slate-300">
          <div className="flex justify-between items-center py-2">
            <span>Document Auto-Numbering</span>
            <span className="font-mono text-blue-400 bg-blue-950 border border-blue-800/60 px-2.5 py-1 rounded-md">
              INV-2026-XXX
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-slate-800/60">
            <span>Default Payment Terms</span>
            <span className="text-slate-400 font-mono">BDO / GCash Account Defaults</span>
          </div>
        </div>
      </div>

    </div>
  );
}