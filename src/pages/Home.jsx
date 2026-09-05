import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { 
  ArrowRight, 
  CheckCircle, 
  Mail, 
  MapPin, 
  Code2, 
  Layout, 
  Server, 
  Smartphone, 
  Database, 
  Zap, 
  Building2, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';

// Phrases to rotate through in the headline
const ROTATING_WORDS = [
  "Growing Businesses",
  "Scaling Startups",
  "Modern Enterprises",
  "Ambitious Brands",
  "Digital Operations"
];

// Active / Past Featured Clients
const CLIENT_LIST = [
  { name: "Acme Enterprise", industry: "Logistics", project: "Custom Admin Engine" },
  { name: "Nexus Digital", industry: "SaaS", project: "Marketing Platform & Web App" },
  { name: "Vanguard Partners", industry: "Finance", project: "Internal Portal & Reporting" },
  { name: "Aventus Health", industry: "Healthcare Network", project: "Client Portal Integration" },
  { name: "Apex Technologies", industry: "E-Commerce", project: "Custom Database Setup" },
];

export default function Home() {

  // Typing Effect State
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = ROTATING_WORDS[wordIndex];
    
    // Typing & Deleting Speed Logic
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseDuration = 2000; // Pause when word is fully typed

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(targetWord.substring(0, currentText.length + 1));
        
        // When word finishes typing, pause then start deleting
        if (currentText === targetWord) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Backspacing
        setCurrentText(targetWord.substring(0, currentText.length - 1));
        
        // When word is completely erased, switch to next word
        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <div className="min-h-screen font-sans antialiased bg-slate-50 text-slate-800">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-20 md:pt-28 pb-12 md:pb-20 px-6 border-b border-slate-800">
        
        {/* Dark Tech Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none mix-blend-luminosity overflow-hidden"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop')` 
          }}
        />

        {/* Radial Blue Accent Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950/80 to-slate-950 pointer-events-none" />

        {/* Main Centered Container */}
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-20 md:-mb-36">
          
          {/* Top Announcement Tag */}
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/60 px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Web Development & Software Engineering</span>
          </div>

          {/* Headline with Typewriter Effect */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] min-h-[120px] sm:min-h-[140px] flex items-center justify-center flex-wrap gap-x-3">
              <span>Custom Web Apps & Software Solutions for</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200 border-r-2 border-blue-400 pr-1 animate-pulse inline-block">
                {currentText || '\u00A0'}
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We build high-performance web applications, modern business platforms, and internal digital tools tailored to target your exact operational needs.
            </p>

            {/* Centered Action Buttons */}
            <div className="pt-2 flex flex-wrap justify-center items-center gap-4 text-xs font-mono uppercase tracking-wider">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-lg font-sans font-semibold text-sm transition-all shadow-lg shadow-blue-600/25"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a 
                href="#services" 
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 px-7 py-3.5 rounded-lg font-sans text-sm transition-all"
              >
                <span>Explore Services</span>
              </a>
            </div>
          </div>

          {/* Floating Feature Cards Grid */}
          <div className="pt-10 grid md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-white text-slate-900 p-6 rounded-xl border border-slate-200/80 shadow-2xl space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Custom Web Applications</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Bespoke single-page apps, admin engines, and scalable digital tools built around your business workflow.
              </p>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-xl border border-slate-200/80 shadow-2xl space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">High-Converting Websites</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Fast, responsive marketing websites engineered to establish brand credibility and capture client inquiries.
              </p>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-xl border border-slate-200/80 shadow-2xl space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Transparent Documentation</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Clear project proposals, milestone accomplishment reports, and formal invoice tracking built in.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SERVICES SECTION (Centered 3x2 Grid Layout) */}
      <section id="services" className="bg-white pt-20 md:pt-48 pb-20 px-6 border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          
          {/* Centered Header */}
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-semibold">Capabilities</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Our Services</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We provide end-to-end web engineering, custom software development, and technical solutions to help your business scale.
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid md:grid-cols-3 gap-y-12 gap-x-8 pt-4">
            {[
              {
                title: "Web App Development",
                desc: "Interactive, data-driven web applications with user authentication, custom dashboards, and real-time state management.",
                icon: Code2
              },
              {
                title: "Business Websites",
                desc: "High-converting, responsive marketing websites designed to communicate your brand clearly and capture leads.",
                icon: Layout
              },
              {
                title: "Backend & API Architecture",
                desc: "Scalable backend logic, RESTful/GraphQL API development, and secure cloud database integrations.",
                icon: Server
              },
              {
                title: "Mobile-Responsive UI/UX",
                desc: "Tailored frontend interfaces optimized for seamless interaction across desktop, tablet, and mobile browsers.",
                icon: Smartphone
              },
              {
                title: "Database Engineering",
                desc: "Structured PostgreSQL database schema design, data migration, security policies, and performance tuning.",
                icon: Database
              },
              {
                title: "Performance Optimization",
                desc: "Speed up existing websites and applications through code splitting, caching strategies, and asset optimization.",
                icon: Zap
              }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3 group">
                {/* Centered Circle Icon Badge */}
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
                  <s.icon className="w-10 h-10" />
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 pt-1">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CLIENTS & ABOUT SECTION (Deep Navy Accent Section) */}
      <section id="about" className="bg-slate-900 text-white py-20 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">
                Proven Track Record
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                Trusted by Growing Teams
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              We work closely with businesses to deliver production-ready software, custom web systems, and clear project documentation.
            </p>
          </div>

          {/* 5-Client Brand Badge Strip */}
          <div>
            <span className="block text-xs font-mono uppercase text-slate-500 mb-4 tracking-wider">
              Featured Engagements & Partners
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {CLIENT_LIST.map((client, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex flex-col justify-between transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400 group-hover:text-blue-400 transition-colors mb-3">
                    <Building2 className="w-5 h-5" />
                    <span className="font-mono text-[10px] text-slate-500">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-200 group-hover:text-white">
                      {client.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">{client.industry}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Case Highlights Split */}
          <div className="grid md:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Column 1: Operating Standards */}
            <div className="md:col-span-5 bg-slate-950/90 border border-slate-800 p-8 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> Direct Accountability
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Quality over quantity, every single build.
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Rather than juggling dozens of low-touch builds, we focus on dedicated engineering cycles—ensuring every project is backed by clean code and formal documentation.
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-6 space-y-3 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Production-ready web apps & admin systems</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Transparent milestone accomplishment reporting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Direct client communication line</span>
                </div>
              </div>
            </div>

            {/* Column 2: Spotlight Client Deliverable */}
            <div className="md:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase text-blue-400 font-bold tracking-wider">
                    Spotlight Case Study
                  </span>
                  <span className="text-xs font-mono text-slate-500">Delivered 2026</span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white">
                  Custom Web Platform & Admin Management Engine
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  Engineered a unified digital web solution complete with real-time record management, PDF proposal and invoice generation, and secure administrative controls.
                </p>
              </div>

              {/* Impact Metric Tags */}
              <div className="grid sm:grid-cols-3 gap-4 border-t border-b border-slate-800 py-4 my-2">
                <div>
                  <span className="block font-heading font-bold text-lg text-white">100%</span>
                  <span className="text-slate-500 text-xs font-mono">Custom Architecture</span>
                </div>
                <div>
                  <span className="block font-heading font-bold text-lg text-white">Fast</span>
                  <span className="text-slate-500 text-xs font-mono">Vite + React Core</span>
                </div>
                <div>
                  <span className="block font-heading font-bold text-lg text-white">Verified</span>
                  <span className="text-slate-500 text-xs font-mono">Automated Invoicing</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-mono text-slate-400">
                  Client: <strong className="text-slate-200">Confidential / Enterprise Partner</strong>
                </span>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold"
                >
                  <span>Request Similar Build</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INQUIRY / CONTACT SECTION (Light Slate Background) */}
      <section id="contact" className="bg-slate-100 py-20 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
          
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-semibold">Get In Touch</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Have a project or question in mind?</h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Whether you need a project proposal, custom software, a new website, or simply want to ask a question—we're here to help. Send us a message and we'll get back to you promptly.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-600 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded border border-slate-200 text-blue-600">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs">contact@polenlyn.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded border border-slate-200 text-blue-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Cavite, Philippines</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-sm">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Juan Dela Cruz" 
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">Inquiry Type</label>
                <select className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors">
                  <option value="general">General Inquiry / Question</option>
                  <option value="proposal">Request a Project Proposal</option>
                  <option value="estimate">Cost & Timeline Estimate</option>
                  <option value="consultation">Technical Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1.5">Message / Details</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you? Feel free to share any details or questions..." 
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 5. FOOTER (Dark Navy) */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-6 text-xs text-center font-mono border-t border-slate-800">
        <p>© {new Date().getFullYear()} POLENLYN SOLUTION. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}