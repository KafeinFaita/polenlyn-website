import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required administrative credentials.');
      return;
    }

    setLoading(true);

    // Live Supabase Authentication
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else if (data.session) {
      setLoading(false);
      // Redirect to the admin dashboard on success
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Background Accent Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none mix-blend-luminosity"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop')` 
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950/90 to-slate-950 pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-800/80">
        <Link to="/" className="flex items-center gap-2.5 font-heading font-bold tracking-tight text-lg text-slate-100">
          <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
          <span>POLENLYN SOLUTION</span>
        </Link>

        <Link 
          to="/" 
          className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          ← Return to Site
        </Link>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 max-w-md w-full mx-auto px-6 py-12">
        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          
          {/* Header Title */}
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-950/80 border border-blue-800/60 rounded-xl text-blue-400 mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Admin Portal Login
            </h1>
            <p className="text-slate-400 text-xs">
              Authorized access point for proposal management and client records.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-950/60 border border-red-800/80 text-red-300 px-4 py-3 rounded-lg text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@polenlyn.com" 
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-mono uppercase font-semibold text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-300 absolute right-3.5 top-3"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white font-semibold py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Access</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 text-xs text-slate-500 text-center font-mono border-t border-slate-900">
        <p>© {new Date().getFullYear()} POLENLYN SOLUTION. RESTRICTED ACCESS SYSTEM.</p>
      </footer>

    </div>
  );
}