import { useState } from 'react';
import { LogOut, Plus, BookOpen, ShieldAlert, Sun, Moon, Search, Flame, Calendar } from 'lucide-react';
import CourseCard from './CourseCard';
import CourseWorkspace from './CourseWorkspace';

export default function Dashboard({ 
  user, 
  courses, 
  onAddCourse, 
  onEditCourse, 
  onDeleteCourse, 
  onSaveCourse,
  onLogout,
  darkMode,
  onToggleDarkMode
}) {
  
  const isAdmin = user.role === 'admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseWorkspace, setActiveCourseWorkspace] = useState(null);

  // Derived metrics from curriculum data
  const totalModules = courses.reduce((sum, c) => sum + (c.modules || 0), 0);
  const totalHours = courses.reduce((sum, c) => sum + (c.hours || 0), 0);

  // Date calculation helpers for the study planner
  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = monthNames[today.getMonth()];
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();
  const daysRemaining = daysInMonth - currentDay;

  // Hours per day required to complete one typical track this month, capped realistically at 6.0 hours max
  const targetCourseHours = courses[1]?.hours || 32;
  const hoursPerDayRequired = daysRemaining > 0 
    ? Math.min(6, Math.max(1.5, targetCourseHours / daysRemaining)).toFixed(1)
    : "2.0";

  // Weekly timeline helper (7 days centered around today)
  const getWeeklyTimeline = () => {
    const timeline = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      timeline.push({
        dayNum: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'narrow' }), // M, T, W...
        isToday: i === 0,
        isPast: i < 0,
        isFuture: i > 0
      });
    }
    return timeline;
  };
  const weeklyTimeline = getWeeklyTimeline();

  // Daily checklist habit state with localStorage persistence
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem(`offerunlocked_checklist_${user.name}`);
      return saved ? JSON.parse(saved) : [
        { id: 'video', label: 'Watch 1 Lesson Video', completed: false },
        { id: 'code', label: 'Write 30 mins of Code', completed: false },
        { id: 'quiz', label: 'Review Notes / Concept', completed: false }
      ];
    } catch {
      return [
        { id: 'video', label: 'Watch 1 Lesson Video', completed: false },
        { id: 'code', label: 'Write 30 mins of Code', completed: false },
        { id: 'quiz', label: 'Review Notes / Concept', completed: false }
      ];
    }
  });

  const handleToggleChecklist = (id) => {
    const updated = checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    try {
      localStorage.setItem(`offerunlocked_checklist_${user.name}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  // Time-based personalized greeting helper
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Filter courses based on query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen w-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Dashboard Top Header - Premium Glassmorphic Navigation Bar (Fixed top, not scrollable) */}
      {!activeCourseWorkspace && (
        <header className={`fixed top-0 left-0 right-0 z-30 border-b backdrop-blur-md transition-all duration-300 ${
          darkMode 
            ? 'bg-slate-950/80 border-slate-900/60 shadow-md shadow-slate-950/20' 
            : 'bg-white/80 border-slate-200/60 shadow-xs'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <img src="/logo.png" alt="Offer Unlocked Logo" className="w-9 h-9 object-contain rounded-xl" />
            <div className="flex flex-col text-left hidden sm:flex">
              <span className={`text-base font-bold tracking-tight leading-none ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Offer<span className="text-indigo-500">Unlocked</span>
              </span>
              <span className={`text-[8px] font-medium tracking-wider uppercase mt-0.5 ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Learning Management System
              </span>
            </div>
          </div>

          {/* Sticky Search Input Bar in Navigation */}
          <div className="relative flex-1 max-w-[150px] sm:max-w-xs md:max-w-md mx-1 sm:mx-3">
            <span className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active courses..."
              className={`w-full pl-9 pr-3 py-1.5 border rounded-xl focus:outline-none focus:ring-2 text-xs font-semibold transition-all duration-200 ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:ring-indigo-500/30 focus:border-indigo-500'
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                darkMode
                  ? 'bg-slate-900/60 border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-850'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Meta */}
            <div className="hidden md:flex flex-col text-right">
              <span className={`text-sm font-bold leading-tight ${
                darkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {user.name}
              </span>
              <span className="text-[10px] leading-none flex items-center justify-end gap-1 font-semibold mt-0.5">
                {isAdmin ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping inline-block" />
                    <span className="text-amber-500 uppercase tracking-widest text-[8px]">Admin Privilege</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-emerald-500 uppercase tracking-widest text-[8px]">Student Access</span>
                  </>
                )}
              </span>
            </div>

            {/* User Avatar Circle */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-xs transition-colors shrink-0 ${
              darkMode 
                ? 'bg-slate-900 border-2 border-slate-800 text-indigo-400' 
                : 'bg-indigo-50 border-2 border-indigo-200 text-indigo-600'
            }`}>
              {user.name.charAt(0)}
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                darkMode
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
              }`}
              title="Logout Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        </header>
      )}

      {/* Main Dashboard Space - Padded top to clear fixed header */}
      <main className={`flex-1 w-full max-w-7xl mx-auto px-6 pb-8 ${activeCourseWorkspace ? 'pt-8' : 'pt-[92px]'}`}>
        {activeCourseWorkspace ? (
          <CourseWorkspace
            course={activeCourseWorkspace}
            user={user}
            onSaveCourse={(updatedCourse) => {
              onSaveCourse(updatedCourse);
              setActiveCourseWorkspace(updatedCourse);
            }}
            onBack={() => setActiveCourseWorkspace(null)}
            darkMode={darkMode}
          />
        ) : (
          <>
            {/* Personalized Welcome Greeting Banner */}
            <div className={`p-6 sm:p-8 rounded-3xl border mb-8 relative overflow-hidden transition-all duration-300 text-left ${
              darkMode 
                ? 'bg-slate-900/40 border-slate-800/80 shadow-lg shadow-indigo-950/10' 
                : 'bg-white border-slate-100 shadow-sm'
            }`}>
              {/* Decorative Background Glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="max-w-3xl">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-3 ${
                    darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Active Learning Workspace
                  </span>
                  <h1 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 font-black">{user.name}</span>! 👋
                  </h1>
                  <p className={`text-xs sm:text-sm mt-2 font-medium leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Welcome back to your personalized learning workspace. You have access to <span className="font-bold text-indigo-400">{courses.length} active tracks</span>. Complete your goals today to unlock new milestones!
                  </p>
                </div>
              </div>
            </div>

            {/* Premium SaaS Product Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {isAdmin ? (
                // Admin SaaS Dashboard Widgets
                <>
                  {/* Course Catalog Widget */}
                  <div className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-colors duration-300 ${
                    darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-indigo-500" />
                          Course Catalog Status
                        </h3>
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">
                          Portfolio
                        </span>
                      </div>
                      <div className="mt-4">
                        <p className="text-3xl font-black tracking-tight">{courses.length}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                          darkMode ? 'text-slate-400' : 'text-slate-400'
                        }`}>
                          Active tracks published
                        </p>
                      </div>
                      <div className="mt-4 space-y-2 border-t border-slate-200 dark:border-slate-800/40 pt-3.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Total Modules</span>
                          <span className="font-bold">{courses.reduce((sum, c) => sum + (c.modules || 0), 0)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Estimated Time</span>
                          <span className="font-bold">{courses.reduce((sum, c) => sum + (c.hours || 0), 0)} Hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Administrative Privilege Info Widget */}
                  <div className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-colors duration-300 ${
                    darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-amber-500" />
                          Operations Hub
                        </h3>
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">
                          Admin Access
                        </span>
                      </div>
                      <div className="mt-4 text-xs leading-relaxed space-y-3">
                        <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                          You have full access to create, update, or remove learning tracks, modules, and track times.
                        </p>
                        <div className="pt-3 border-t border-slate-800/20 dark:border-slate-800/40">
                          <span className={`text-[10px] font-bold block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>AUTHORIZED SESSION</span>
                          <span className="text-[10px] font-mono tracking-tight text-indigo-400">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Workspace Timeline Card */}
                  <div className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-colors duration-300 ${
                    darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          Workspace Timeline
                        </h3>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
                          {currentMonthName} {currentYear}
                        </span>
                      </div>

                      <div className="mt-3.5 p-3 rounded-xl border flex items-center gap-3 bg-indigo-500/5 border-indigo-500/10">
                        <div className="flex-1">
                          <p className={`text-xs font-black ${darkMode ? 'text-slate-200' : 'text-slate-900'} leading-tight`}>
                            Billing Day <span className="text-indigo-400 text-sm font-black">{currentDay}</span> of {daysInMonth}
                          </p>
                          <p className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            Platform Billing Cycle
                          </p>
                        </div>
                        {/* Small circular completion status representation */}
                        <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="18" cy="18" r="14" fill="transparent" stroke={darkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="3" />
                            <circle cx="18" cy="18" r="14" fill="transparent" stroke="#6366f1" strokeWidth="3" 
                              strokeDasharray={88}
                              strokeDashoffset={88 - (88 * (currentDay / daysInMonth))}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-[8px] font-black">{Math.round((currentDay / daysInMonth) * 100)}%</span>
                        </div>
                      </div>

                      {/* Horizontal mini timeline of current week */}
                      <div className="mt-4 flex items-center justify-between gap-1">
                        {weeklyTimeline.map((item, idx) => (
                          <div 
                            key={idx} 
                            className={`flex flex-col items-center flex-1 py-1.5 rounded-lg border text-center transition-all ${
                              item.isToday
                                ? darkMode 
                                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                                  : 'bg-indigo-600 border-indigo-600 text-white'
                                : item.isPast
                                  ? darkMode
                                    ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                                    : 'bg-slate-50 border-slate-100 text-slate-500'
                                  : darkMode
                                    ? 'bg-slate-950/20 border-slate-800/40 text-slate-600'
                                    : 'bg-slate-50/50 border-slate-100 text-slate-400'
                            }`}
                          >
                            <span className="text-[8px] uppercase font-bold tracking-wider leading-none">{item.dayName}</span>
                            <span className="text-[11px] font-black mt-1 leading-none">{item.dayNum}</span>
                            {item.isToday && <span className="w-1 h-1 rounded-full bg-white mt-1 shrink-0 animate-ping" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/40 text-xs flex items-center justify-between gap-2">
                      <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Status:</span>
                      <span className="font-black text-indigo-400">
                        System Stable
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // Student SaaS Dashboard Widgets
                <>
                  {/* Daily Focus Habits Checklist */}
                  <div className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-colors duration-300 ${
                    darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-amber-500 fill-amber-500/10 animate-bounce" />
                          Daily Focus Habits
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          completionPercentage === 100 
                            ? 'bg-emerald-500/15 text-emerald-500' 
                            : 'bg-indigo-500/10 text-indigo-400'
                        }`}>
                          {completionPercentage}% Done
                        </span>
                      </div>

                      {/* Checklist Items */}
                      <div className="space-y-2 mt-3.5">
                        {checklist.map((item) => (
                          <label 
                            key={item.id}
                            className={`flex items-center gap-2.5 p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-150 ${
                              item.completed
                                ? darkMode 
                                  ? 'bg-indigo-950/20 border-indigo-900/60 text-slate-200' 
                                  : 'bg-indigo-50/40 border-indigo-100 text-indigo-900'
                                : darkMode
                                  ? 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                                  : 'bg-slate-50/40 border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => handleToggleChecklist(item.id)}
                              className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500/20 cursor-pointer"
                            />
                            <span className={item.completed ? 'line-through opacity-70' : ''}>
                              {item.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 pt-2">
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div 
                          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Syllabus Catalog Summary Card */}
                  <div className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-colors duration-300 ${
                    darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-indigo-500" />
                          Learning Path Stats
                        </h3>
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">
                          Syllabus Overview
                        </span>
                      </div>
                      <div className="mt-4">
                        <p className="text-3xl font-black tracking-tight">{courses.length}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                          darkMode ? 'text-slate-400' : 'text-slate-400'
                        }`}>
                          Available Course Tracks
                        </p>
                      </div>
                      <div className="mt-4 space-y-2 border-t border-slate-200 dark:border-slate-800/40 pt-3.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Total Curriculum Modules</span>
                          <span className="font-bold">{totalModules} Modules</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Total Estimated Learning</span>
                          <span className="font-bold">{totalHours} Hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smart Calendar & Study Planner Card */}
                  <div className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-colors duration-300 ${
                    darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          Study Calendar & Target
                        </h3>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-405">
                          {currentMonthName} Tracker
                        </span>
                      </div>

                      {/* Calendar/Month Days remaining highlight */}
                      <div className="mt-3.5 p-3 rounded-xl border flex items-center gap-3 bg-indigo-500/5 border-indigo-500/10">
                        <div className="flex-1">
                          <p className={`text-xs font-black ${darkMode ? 'text-slate-200' : 'text-slate-900'} leading-tight`}>
                            Only <span className="text-indigo-400 text-sm font-black">{daysRemaining} days</span> left this month
                          </p>
                          <p className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            Make every day count
                          </p>
                        </div>
                        {/* Small circular completion status representation */}
                        <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="18" cy="18" r="14" fill="transparent" stroke={darkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="3" />
                            <circle cx="18" cy="18" r="14" fill="transparent" stroke="#6366f1" strokeWidth="3" 
                              strokeDasharray={88}
                              strokeDashoffset={88 - (88 * (currentDay / daysInMonth))}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-[8px] font-black">{Math.round((currentDay / daysInMonth) * 100)}%</span>
                        </div>
                      </div>

                      {/* Horizontal mini timeline of current week */}
                      <div className="mt-4 flex items-center justify-between gap-1">
                        {weeklyTimeline.map((item, idx) => (
                          <div 
                            key={idx} 
                            className={`flex flex-col items-center flex-1 py-1.5 rounded-lg border text-center transition-all ${
                              item.isToday
                                ? darkMode 
                                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                                  : 'bg-indigo-600 border-indigo-600 text-white'
                                : item.isPast
                                  ? darkMode
                                    ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                                    : 'bg-slate-50 border-slate-100 text-slate-500'
                                  : darkMode
                                    ? 'bg-slate-950/20 border-slate-800/40 text-slate-650'
                                    : 'bg-slate-50/50 border-slate-100 text-slate-400'
                            }`}
                          >
                            <span className="text-[8px] uppercase font-bold tracking-wider leading-none">{item.dayName}</span>
                            <span className="text-[11px] font-black mt-1 leading-none">{item.dayNum}</span>
                            {item.isToday && <span className="w-1 h-1 rounded-full bg-white mt-1 shrink-0 animate-ping" />}
                            {item.isPast && <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1 shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target calculation detail */}
                    <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/40 text-xs flex items-center justify-between gap-2">
                      <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Target study rate:</span>
                      <span className="font-black text-indigo-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block animate-pulse" />
                        {hoursPerDayRequired} Hrs/day
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Section Title Grid and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-left">
                <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Active Learning Tracks</h2>
                <p className={`text-[10px] font-extrabold uppercase mt-0.5 tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Acquire core knowledge with hands-on syllabus
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Dynamic Results Counter */}
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Showing {filteredCourses.length} of {courses.length} Tracks
                </span>

                {/* Admin Course Scaffolder Action */}
                {isAdmin && (
                  <button
                    onClick={onAddCourse}
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/10 active:scale-[0.99] transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Course
                  </button>
                )}
              </div>
            </div>

            {/* Courses list */}
            {filteredCourses.length === 0 ? (
              <div className={`p-12 text-center rounded-2xl border max-w-lg mx-auto mt-12 flex flex-col items-center transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-805 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <ShieldAlert className="w-12 h-12 text-slate-400" />
                <h3 className="text-lg font-bold mt-4">No tracks found</h3>
                <p className="text-slate-400 text-xs mt-1 max-w-xs leading-normal">
                  No courses match your query. Clear the search field or seed a new track.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isAdmin={isAdmin}
                    onEdit={onEditCourse}
                    onDelete={onDeleteCourse}
                    onStart={setActiveCourseWorkspace}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
