import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    
    // Simulate API authorization call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="w-full lg:w-1/2 min-h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-white text-slate-900">
      <div className="mx-auto w-full max-w-md">
        
        {/* Mobile Header (Only visible on mobile/tablet) */}
        <div className="flex lg:hidden items-center gap-3.5 mb-8">
          <img src="/logo.png" alt="Offer Unlocked Logo" className="w-8 h-8 object-contain rounded-lg" />
          <div className="flex flex-col justify-center">
            <span className="text-base font-bold tracking-tight text-slate-950 font-sans leading-none">
              Offer<span className="text-indigo-600">Unlocked</span>
            </span>
            <span className="text-[8px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
              Learning Management System
            </span>
          </div>
        </div>

        {/* Title / Subtitle */}
        <div className="text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Welcome back
          </h2>
          <p className="mt-2.5 text-sm text-slate-500">
            Sign in to access your dashboard, courses, and tasks.
          </p>
        </div>

        {/* Social Authentication Options */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 transition-all duration-200 cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 transition-all duration-200 cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-semibold">Or continue with</span>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Email Address
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="block w-full pl-10.5 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative rounded-xl shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-4.5 w-4.5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10.5 pr-10 py-3 border border-slate-200 rounded-xl bg-slate-50/50 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500/30 border-slate-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-500 select-none cursor-pointer">
              Remember my session
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`relative flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-bold text-white shadow-md shadow-indigo-600/10 transition-all duration-300 cursor-pointer ${
              isSuccess 
                ? 'bg-emerald-600 shadow-emerald-600/20' 
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] hover:shadow-indigo-600/25'
            } disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                Authenticating...
              </span>
            ) : isSuccess ? (
              <span>Access Granted!</span>
            ) : (
              <span className="flex items-center gap-1.5">
                Sign In
                <ArrowRight className="w-4.5 h-4.5" />
              </span>
            )}
          </button>
        </form>

        {/* Footer info */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Not enrolled yet?{' '}
          <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Request portal access
          </a>
        </p>
      </div>
    </div>
  );
}
