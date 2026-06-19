import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';

export default function CourseModal({ isOpen, onClose, onSave, course, darkMode }) {
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState('/assets/java.png');
  const [modules, setModules] = useState('');
  const [hours, setHours] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setBanner(course.banner || '/assets/java.png');
      setModules(course.modules);
      setHours(course.hours);
    } else {
      setTitle('');
      setBanner('/assets/java.png');
      setModules('');
      setHours('');
    }
    setError('');
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !modules || !hours) {
      setError('Please fill in all fields.');
      return;
    }

    onSave({
      id: course ? course.id : null,
      title,
      banner,
      modules: parseInt(modules, 10),
      hours: parseInt(hours, 10),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden transform scale-100 transition-all duration-300 z-10 text-left ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'
        }`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {course ? 'Edit Course Details' : 'Create New Course'}
          </h3>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              darkMode ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-350' : 'hover:bg-slate-200 text-slate-400 hover:text-slate-650'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className={`p-3 border text-xs font-semibold rounded-lg ${
              darkMode ? 'bg-rose-950/20 border-rose-900/50 text-rose-450' : 'bg-rose-50 border-rose-100 text-rose-600'
            }`}>
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="course-title" className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Course Title
            </label>
            <input
              type="text"
              id="course-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master React & Tailwind CSS"
              className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 text-sm transition-colors ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:ring-indigo-500/30 focus:border-indigo-500' 
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
              required
            />
          </div>

          {/* Banner Image path */}
          <div>
            <label htmlFor="course-banner" className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Banner Path / Image URL
            </label>
            <input
              type="text"
              id="course-banner"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              placeholder="e.g. /assets/java.png"
              className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 text-sm transition-colors ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:ring-indigo-500/30 focus:border-indigo-500' 
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            <p className="text-[10px] text-slate-400 mt-1">Default is `/assets/java.png` if not specified.</p>
          </div>

          {/* Grid for Modules and Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="course-modules" className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Total Modules
              </label>
              <input
                type="number"
                id="course-modules"
                min="1"
                value={modules}
                onChange={(e) => setModules(e.target.value)}
                placeholder="e.g. 12"
                className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 text-sm transition-colors ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:ring-indigo-500/30 focus:border-indigo-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
                required
              />
            </div>
            <div>
              <label htmlFor="course-hours" className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Duration (Hours)
              </label>
              <input
                type="number"
                id="course-hours"
                min="1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. 40"
                className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 text-sm transition-colors ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:ring-indigo-500/30 focus:border-indigo-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
                required
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className={`flex gap-3 mt-8 pt-4 border-t ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2.5 text-xs font-bold rounded-xl border transition-colors cursor-pointer text-center ${
                darkMode 
                  ? 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200' 
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md cursor-pointer text-center"
            >
              {course ? (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
