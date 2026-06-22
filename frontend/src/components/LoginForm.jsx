import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles, User, CheckCircle2 } from 'lucide-react';

const DEFAULT_USERS = [
  { name: 'Admin User', email: 'admin@offerunlocked.com', password: 'admin123', role: 'admin' },
  { name: 'Regular Student', email: 'user@offerunlocked.com', password: 'user123', role: 'student' }
];

export default function LoginForm({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showDevPopup, setShowDevPopup] = useState(true); // Automatically show on initial render

  // Sign up states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [isRegSuccess, setIsRegSuccess] = useState(false);

  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem('offerunlocked_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        const allUsers = [...DEFAULT_USERS];
        parsed.forEach(u => {
          if (!allUsers.some(existing => existing.email.toLowerCase() === u.email.toLowerCase())) {
            allUsers.push(u);
          }
        });
        return allUsers;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USERS;
  };

  const saveRegisteredUser = (newUser) => {
    try {
      const saved = localStorage.getItem('offerunlocked_users');
      let parsed = [];
      if (saved) {
        parsed = JSON.parse(saved);
      }
      const allUsers = [...DEFAULT_USERS, ...parsed];
      if (allUsers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
        return false;
      }
      parsed.push(newUser);
      localStorage.setItem('offerunlocked_users', JSON.stringify(parsed));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const handleDisabledAction = (e) => {
    if (e) e.preventDefault();
    setError('This option is disabled during beta testing. Please log in using standard credentials or register a new account.');
  };

  const handleForgotPassword = (e) => {
    if (e) e.preventDefault();
    setError('Password recovery is unavailable during beta. If you forgot your password, please register a new student account.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const users = getRegisteredUsers();
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matchedUser) {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          onLogin(matchedUser);
        }, 800);
      } else {
        setIsLoading(false);
        setError('Access denied. Valid test account not found. Please register an account first.');
      }
    }, 1000);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const newUser = {
        name: regName,
        email: regEmail,
        password: regPassword,
        role: 'student'
      };

      const success = saveRegisteredUser(newUser);

      if (success) {
        setIsLoading(false);
        setIsRegSuccess(true);
        setTimeout(() => {
          onLogin(newUser);
        }, 1500);
      } else {
        setIsLoading(false);
        setError('This email is already registered. Please try logging in.');
      }
    }, 1000);
  };

  return (
    <div className="relative w-full lg:w-1/2 min-h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-slate-950 text-slate-100 lg:bg-white lg:text-slate-900 transition-colors duration-300">
      
      {/* Mobile Glowing Background Orbs (hidden on desktop) */}
      <div className="absolute top-[-10%] left-[-10%] w-[250px] h-[250px] rounded-full bg-indigo-500/10 blur-[80px] animate-pulse-glow lg:hidden pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[200px] h-[200px] rounded-full bg-violet-500/10 blur-[70px] animate-pulse-glow lg:hidden pointer-events-none" style={{ animationDelay: '2s' }} />

      {isRegSuccess ? (
        <div className="mx-auto w-full max-w-md text-center py-8 animate-scale-up relative z-10">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-xs mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white lg:text-slate-950 mb-3">
            Registration Successful!
          </h3>
          <p className="text-sm text-slate-400 lg:text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
            Welcome to the platform, <span className="font-bold text-white lg:text-slate-900">{regName}</span>! We are setting up your student profile and launching your dashboard...
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-400">
            <Loader2 className="w-4.5 h-4.5 animate-spin" />
            Initializing your workspace...
          </div>
        </div>
      ) : isSignUp ? (
        <div className="mx-auto w-full max-w-md relative z-10">
          {/* Mobile Header (Only visible on mobile/tablet) */}
          <div className="flex lg:hidden items-center mb-8">
            <img src="/logo.png" alt="Offer Unlocked Logo" className="h-8 w-auto object-contain" />
          </div>

          {/* Title / Subtitle */}
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3.5 relative">
              <Sparkles className="w-3 h-3 text-indigo-400 fill-indigo-400/20" />
              Join LMS Today
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white lg:text-slate-950 leading-tight">
              Create your account
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-400 lg:text-slate-500">
              Set up your profile to start learning high-demand engineering skills.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUpSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/20 lg:bg-rose-50 border border-rose-900/30 lg:border-rose-100 text-xs font-semibold text-rose-400 lg:text-rose-600 leading-normal">
                {error}
              </div>
            )}

            {/* Name input */}
            <div>
              <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 lg:text-slate-500 mb-2">
                Full Name
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 lg:text-slate-400">
                  <User className="h-4.5 w-4.5" />
                </div>
                <input
                  type="text"
                  name="reg-name"
                  id="reg-name"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full pl-10.5 pr-4 py-3 border border-slate-800 lg:border-slate-200 rounded-xl bg-slate-900/40 lg:bg-slate-50/50 placeholder-slate-500 lg:placeholder-slate-400 text-white lg:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-slate-900 lg:focus:bg-white transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Email input */}
            <div>
              <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 lg:text-slate-500 mb-2">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 lg:text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <input
                  type="email"
                  name="reg-email"
                  id="reg-email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="block w-full pl-10.5 pr-4 py-3 border border-slate-800 lg:border-slate-200 rounded-xl bg-slate-900/40 lg:bg-slate-50/50 placeholder-slate-500 lg:placeholder-slate-400 text-white lg:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-slate-900 lg:focus:bg-white transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="reg-password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 lg:text-slate-500 mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 lg:text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="reg-password"
                  id="reg-password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10.5 pr-10 py-3 border border-slate-800 lg:border-slate-200 rounded-xl bg-slate-900/40 lg:bg-slate-50/50 placeholder-slate-500 lg:placeholder-slate-400 text-white lg:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-slate-900 lg:focus:bg-white transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-350 lg:text-slate-400 lg:hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] hover:shadow-indigo-600/25 shadow-md shadow-indigo-600/10 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Creating Profile...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Start Learning Now
                  <ArrowRight className="w-4.5 h-4.5" />
                </span>
              )}
            </button>
          </form>

          {/* Back to Login link */}
          <p className="mt-8 text-center text-xs text-slate-500 lg:text-slate-400">
            Already have a test account?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(false);
                setError('');
              }}
              className="font-bold text-indigo-400 hover:text-indigo-300 lg:text-indigo-600 lg:hover:text-indigo-700 transition-colors"
            >
              Sign In instead
            </a>
          </p>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md relative z-10">
          {/* Mobile Header (Only visible on mobile/tablet) */}
          <div className="flex lg:hidden items-center mb-8">
            <img src="/logo.png" alt="Offer Unlocked Logo" className="h-8 w-auto object-contain" />
          </div>

          {/* Title / Subtitle */}
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3.5 relative">
              <Sparkles className="w-3 h-3 text-indigo-400 fill-indigo-400/20" />
              Offer Unlocked LMS Portal
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white lg:text-slate-950 leading-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-400 lg:text-slate-500">
              Sign in to continue your learning journey and access your tracks.
            </p>
          </div>

          {/* Social Authentication Options */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDisabledAction}
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-800 lg:border-slate-200 text-sm font-semibold text-slate-300 lg:text-slate-700 bg-slate-900/40 lg:bg-white hover:bg-slate-800 lg:hover:bg-slate-50 active:bg-slate-900 lg:active:bg-slate-100 transition-all duration-200 cursor-pointer shadow-xs"
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
              onClick={handleDisabledAction}
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-800 lg:border-slate-200 text-sm font-semibold text-slate-300 lg:text-slate-700 bg-slate-900/40 lg:bg-white hover:bg-slate-800 lg:hover:bg-slate-50 active:bg-slate-900 lg:active:bg-slate-100 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4 fill-slate-300 lg:fill-slate-900" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-800 lg:border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950 lg:bg-white px-3 text-slate-500 lg:text-slate-400 font-semibold">Or continue with</span>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/20 lg:bg-rose-50 border border-rose-900/30 lg:border-rose-100 text-xs font-semibold text-rose-400 lg:text-rose-600 leading-normal">
                {error}
              </div>
            )}
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 lg:text-slate-500 mb-2">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 lg:text-slate-400">
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
                  className="block w-full pl-10.5 pr-4 py-3 border border-slate-800 lg:border-slate-200 rounded-xl bg-slate-900/40 lg:bg-slate-50/50 placeholder-slate-500 lg:placeholder-slate-400 text-white lg:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-slate-900 lg:focus:bg-white transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 lg:text-slate-500">
                  Password
                </label>
                <a 
                  href="#" 
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 lg:text-indigo-600 lg:hover:text-indigo-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 lg:text-slate-400">
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
                  className="block w-full pl-10.5 pr-10 py-3 border border-slate-800 lg:border-slate-200 rounded-xl bg-slate-900/40 lg:bg-slate-50/50 placeholder-slate-500 lg:placeholder-slate-400 text-white lg:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-slate-900 lg:focus:bg-white transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-350 lg:text-slate-400 lg:hover:text-slate-600 transition-colors cursor-pointer"
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
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500/30 border-slate-700 lg:border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-400 lg:text-slate-500 select-none cursor-pointer">
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
          <p className="mt-8 text-center text-xs text-slate-500 lg:text-slate-400">
            Not enrolled yet?{' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(true);
                setError('');
              }}
              className="font-bold text-indigo-400 hover:text-indigo-300 lg:text-indigo-600 lg:hover:text-indigo-700 transition-colors"
            >
              Request portal access
            </a>
          </p>
        </div>
      )}

      {/* Under Development Modal */}
      {showDevPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 text-center shadow-2xl animate-scale-up">
            {/* Favicon Logo Header */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs mb-6">
              <img src="/favicon.png" alt="Offer Unlocked Icon" className="h-10 w-10 object-contain rounded-lg" />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white mb-3">
              Under Development
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Thank you so much for your interest and choosing to leverage our platform! We are currently putting the final touches on our engineering and design learning ecosystem. 
              We are under active development right now, and very soon you will be able to experience the platform in its full capability. We truly appreciate your support!
            </p>

            <button
              type="button"
              onClick={() => setShowDevPopup(false)}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] transition-all duration-200 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 cursor-pointer"
            >
              Got it, thank you!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
