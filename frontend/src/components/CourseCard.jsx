import { useState } from 'react';
import { Clock, BookOpen, Edit2, Trash2, ArrowUpRight } from 'lucide-react';

export default function CourseCard({ course, isAdmin, onEdit, onDelete, onStart, darkMode }) {
  const [imageError, setImageError] = useState(false);

  // Colors for gradients used in fallbacks if the image doesn't exist
  const fallbacks = [
    'from-indigo-600 to-violet-700',
    'from-cyan-500 to-blue-600',
    'from-violet-600 to-fuchsia-700',
    'from-amber-500 to-orange-600',
  ];
  const fallbackGradient = fallbacks[course.id % fallbacks.length] || fallbacks[0];

  return (
    <div className={`group relative flex flex-col h-full rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${
      darkMode 
        ? 'bg-slate-900 border-slate-800/80 hover:border-slate-700/80 text-white' 
        : 'bg-white border-slate-100 hover:border-slate-200 text-slate-800'
    }`}>
      
      {/* Banner / Image container - Shows full image uncropped */}
      <div className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {imageError ? (
          <div className={`aspect-[16/9] w-full bg-gradient-to-tr ${fallbackGradient} flex flex-col justify-center p-6 text-left`}>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-white/70">Course Banner</span>
            <span className="text-xl font-black text-white mt-1 leading-tight">{course.title}</span>
          </div>
        ) : (
          <img
            src={course.banner || '/assets/java.png'}
            alt={course.title}
            onError={() => setImageError(true)}
            className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
          />
        )}

        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Admin controls: Edit and Delete buttons (floating in top right overlay) */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
            <button
              onClick={() => onEdit(course)}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 shadow-sm backdrop-blur-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              title="Edit Course"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(course.id)}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-700 hover:text-rose-600 shadow-sm backdrop-blur-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              title="Delete Course"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="flex flex-col flex-1 p-5 text-left">
        <h3 className={`text-lg font-bold tracking-tight leading-snug transition-colors duration-200 ${
          darkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
        }`}>
          {course.title}
        </h3>

        {/* Metrics/Stats */}
        <div className={`flex items-center gap-4 mt-4 text-xs font-semibold ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-slate-400" />
            {course.modules} Modules
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            {course.hours} Hours
          </span>
        </div>

        {/* Action Button at the bottom */}
        <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
          darkMode ? 'border-slate-800/60' : 'border-slate-100'
        }`}>
          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
            darkMode ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Status: Enrolled
          </span>
          <button 
            onClick={() => onStart && onStart(course)}
            className={`inline-flex items-center gap-1 text-xs font-bold transition-all cursor-pointer group/btn ${
              darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
