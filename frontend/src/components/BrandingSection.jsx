import { BookOpen, Trophy, Compass, Star } from 'lucide-react';

export default function BrandingSection() {
  return (
    <div className="relative hidden lg:flex flex-col p-16 w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden border-r border-slate-800/50">
      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Header / Logo */}
      <div className="relative z-10 flex items-center gap-3.5">
        <img src="/logo.png" alt="Offer Unlocked Logo" className="w-10 h-10 object-contain rounded-xl shadow-lg shadow-indigo-500/5" />
        <div className="flex flex-col justify-center">
          <span className="text-xl font-bold tracking-tight text-white font-sans leading-none">
            Offer<span className="text-indigo-400">Unlocked</span>
          </span>
          <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase mt-1">
            Learning Management System
          </span>
        </div>
      </div>

      {/* Main Copy (Centered vertically between header and footer) */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 border border-slate-800 text-indigo-300 mb-6 backdrop-blur-md self-start">
          <Star className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
          <span>Premium Learning Environment</span>
        </div>
        
        <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
          Build proof of work.<br />
          Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-amber-300">unlocked</span>.
        </h1>
        
        <p className="mt-5 text-slate-400 text-sm leading-relaxed max-w-md">
          Master high-demand engineering and design skills inside a focused ecosystem built for execution.
        </p>

        {/* Minimalist Key Badges (Low-profile, extremely premium) */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/50 border border-slate-800 text-slate-300 backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Curated Tracks
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/50 border border-slate-800 text-slate-300 backdrop-blur-xs">
            <Trophy className="w-3.5 h-3.5 text-violet-400" /> Real Projects
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/50 border border-slate-800 text-slate-300 backdrop-blur-xs">
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Mentorship
          </span>
        </div>
      </div>

      {/* Footer copyright (pushed to the bottom cleanly) */}
      <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-800/40 pt-8">
        <span>© 2026 Offer Unlocked Inc.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
