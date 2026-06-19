import React, { useState } from 'react';
import { LogOut, Plus, BookOpen, GraduationCap, Users, Activity, BarChart2, ShieldAlert, Sun, Moon, Search } from 'lucide-react';
import CourseCard from './CourseCard';

export default function Dashboard({ 
  user, 
  courses, 
  onAddCourse, 
  onEditCourse, 
  onDeleteCourse, 
  onLogout,
  darkMode,
  onToggleDarkMode
}) {
  const isAdmin = user.role === 'admin';
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen w-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Dashboard Top Header - Premium Glassmorphic Navigation Bar */}
      <header className={`sticky top-0 w-full z-30 border-b backdrop-blur-md transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-950/80 border-slate-900/60 shadow-md shadow-slate-950/20' 
          : 'bg-white/80 border-slate-200/60 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Offer Unlocked Logo" className="w-9 h-9 object-contain rounded-xl" />
            <div className="flex flex-col text-left">
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

          {/* User Info & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
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
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* User Meta */}
            <div className="hidden sm:flex flex-col text-right">
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
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-xs transition-colors ${
              darkMode 
                ? 'bg-slate-900 border-2 border-slate-850 text-indigo-400' 
                : 'bg-indigo-50 border-2 border-indigo-200 text-indigo-600'
            }`}>
              {user.name.charAt(0)}
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                darkMode
                  ? 'bg-slate-900/60 border-slate-850 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
              }`}
              title="Logout Portal"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Space */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        
        {/* User Specific Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {isAdmin ? (
            // Admin SaaS Statistics
            <>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl"><BookOpen className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Courses</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">{courses.length}</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><Users className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Students</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">1,248</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><Activity className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Portal Completion</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">84.2%</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl"><BarChart2 className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>SaaS Health</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">99.98%</p>
                </div>
              </div>
            </>
          ) : (
            // Student SaaS Statistics
            <>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl"><BookOpen className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Enrolled Modules</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">{courses.length}</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><GraduationCap className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Modules Completed</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">4 Tracks</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl"><Activity className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Study Time</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">28.4 Hrs</p>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 text-left transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80 text-white' : 'bg-white border-slate-100 text-slate-800'
              }`}>
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl"><BarChart2 className="w-6 h-6" /></div>
                <div>
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Portal Ranking</h4>
                  <p className="text-2xl font-black mt-1 leading-tight">Top 5%</p>
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
              Acquire core knowledge with hand-on syllabus
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative">
              <span className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className={`w-full sm:w-60 pl-9.5 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 text-xs font-semibold transition-all duration-200 ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:ring-indigo-500/30 focus:border-indigo-500'
                    : 'bg-white border-slate-200 text-slate-800 placeholder-slate-450 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
            </div>

            {/* Admin Course Scaffolder Action */}
            {isAdmin && (
              <button
                onClick={onAddCourse}
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/10 active:scale-[0.99] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Course
              </button>
            )}
          </div>
        </div>

        {/* Courses list */}
        {filteredCourses.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border max-w-lg mx-auto mt-12 flex flex-col items-center transition-colors duration-300 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
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
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
