import { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Clock, 
  BookOpen, 
  X,
  FileText,
  Video,
  Award
} from 'lucide-react';

const generateDefaultCurriculum = (courseTitle) => {
  const titleLower = courseTitle ? courseTitle.toLowerCase() : "";
  
  // Custom curriculum for Java
  if (titleLower.includes("java") && !titleLower.includes("script")) {
    return [
      {
        id: 'java-mod-1',
        title: 'Module 1: Basics of Java',
        lessons: [
          { id: 'java-les-1-1', title: '01. Java Introduction & JVM Architecture', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '15:20' },
          { id: 'java-les-1-2', title: '02. Data Types, Variables & Operators', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '18:45' },
          { id: 'java-les-1-3', title: '03. Conditional Statements & Control Flow', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '20:10' }
        ]
      },
      {
        id: 'java-mod-2',
        title: 'Module 2: Java Essentials',
        lessons: [
          { id: 'java-les-2-1', title: '04. Working with Arrays & Loops', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '22:15' },
          { id: 'java-les-2-2', title: '05. Creating & Calling Java Methods', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '14:30' },
          { id: 'java-les-2-3', title: '06. String Manipulation & String Pool', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '25:05' }
        ]
      },
      {
        id: 'java-mod-3',
        title: 'Module 3: Object-Oriented Programming (OOPs)',
        lessons: [
          { id: 'java-les-3-1', title: '07. OOPs Core Concepts: Classes & Objects', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '19:50' },
          { id: 'java-les-3-2', title: '08. The 4 Pillars: Encapsulation (Access Modifiers)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '16:15' },
          { id: 'java-les-3-3', title: '09. The 4 Pillars: Inheritance (extends keyword)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '18:40' },
          { id: 'java-les-3-4', title: '10. The 4 Pillars: Polymorphism (Overloading & Overriding)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '21:30' },
          { id: 'java-les-3-5', title: '11. The 4 Pillars: Abstraction (Abstract Classes & Interfaces)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '24:10' }
        ]
      },
      {
        id: 'java-mod-4',
        title: 'Module 4: Exception Handling',
        lessons: [
          { id: 'java-les-4-1', title: '12. Intro to Exceptions (Try-Catch blocks)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '15:45' },
          { id: 'java-les-4-2', title: '13. Throw, Throws & Custom Exceptions', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '17:20' }
        ]
      },
      {
        id: 'java-mod-5',
        title: 'Module 5: Multithreading',
        lessons: [
          { id: 'java-les-5-1', title: '14. Creating Threads (Thread class & Runnable)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '22:30' },
          { id: 'java-les-5-2', title: '15. Thread Synchronization & Inter-thread Communication', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '28:15' }
        ]
      },
      {
        id: 'java-mod-6',
        title: 'Module 6: Java Collections Framework',
        lessons: [
          { id: 'java-les-6-1', title: '16. List Interface (ArrayList vs LinkedList)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '24:50' },
          { id: 'java-les-6-2', title: '17. Set Interface (HashSet vs TreeSet)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '19:15' },
          { id: 'java-les-6-3', title: '18. Map Interface (HashMap vs TreeMap)', videoUrl: 'https://youtu.be/hEcjq9LVXL0', duration: '26:40' }
        ]
      }
    ];
  }

  // Fallback for other courses
  let topic = "Topic Mastery";
  if (titleLower.includes("react")) {
    topic = "React";
  } else if (titleLower.includes("dsa") || titleLower.includes("structures")) {
    topic = "DSA";
  } else if (titleLower.includes("html") || titleLower.includes("css")) {
    topic = "HTML & CSS";
  } else if (titleLower.includes("javascript") || titleLower.includes("js")) {
    topic = "JavaScript";
  } else if (titleLower.includes("mern") || titleLower.includes("node")) {
    topic = "MERN Stack";
  } else if (titleLower.includes("sql") || titleLower.includes("database")) {
    topic = "SQL & DB";
  }
  
  return [
    {
      id: 'mod-1',
      title: `Module 1: Core Fundamentals of ${topic}`,
      lessons: [
        {
          id: 'les-1-1',
          title: `01. Introduction to ${topic} & Setup`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '12:45'
        },
        {
          id: 'les-1-2',
          title: `02. Setting up Environment & Workspace`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '18:20'
        },
        {
          id: 'les-1-3',
          title: `03. Understanding Basic Anatomy & Hello World`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '22:15'
        }
      ]
    },
    {
      id: 'mod-2',
      title: `Module 2: Intermediate Concepts & Patterns`,
      lessons: [
        {
          id: 'les-2-1',
          title: `04. Deep Dive into Variables, Types & State`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '25:40'
        },
        {
          id: 'les-2-2',
          title: `05. Control Flows, Loops & Operations`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '30:10'
        },
        {
          id: 'les-2-3',
          title: `06. Building Scalable Architecture for ${topic}`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '19:55'
        }
      ]
    },
    {
      id: 'mod-3',
      title: `Module 3: Advanced Optimization & Operations`,
      lessons: [
        {
          id: 'les-3-1',
          title: `07. Error Handling & Debugging Techniques`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '14:30'
        },
        {
          id: 'les-3-2',
          title: `08. Performance Benchmarking & Optimization`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '28:15'
        },
        {
          id: 'les-3-3',
          title: `09. Best Practices, Security & Cloud Deployment`,
          videoUrl: 'https://youtu.be/hEcjq9LVXL0',
          duration: '21:05'
        }
      ]
    }
  ];
};


const getEmbedUrl = (url) => {
  if (!url) return 'https://www.youtube.com/embed/hEcjq9LVXL0';
  
  let videoId;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    } else {
      if (url.trim().length === 11) {
        videoId = url.trim();
      } else {
        videoId = 'hEcjq9LVXL0';
      }
    }
  } catch {
    videoId = 'hEcjq9LVXL0';
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
};

export default function CourseWorkspace({ course, user, onSaveCourse, onBack, darkMode }) {
  const isAdmin = user.role === 'admin';

  // Initialize curriculum
  const [curriculum, setCurriculum] = useState(() => {
    if (course.curriculum && course.curriculum.length > 0) {
      return course.curriculum;
    }
    return generateDefaultCurriculum(course.title);
  });

  // Track active lesson
  const [activeLesson, setActiveLesson] = useState(() => {
    const initialCurr = course.curriculum && course.curriculum.length > 0
      ? course.curriculum
      : generateDefaultCurriculum(course.title);
    for (const mod of initialCurr) {
      if (mod.lessons && mod.lessons.length > 0) {
        return mod.lessons[0];
      }
    }
    return null;
  });

  // Track expanded modules in accordion
  const [expandedModules, setExpandedModules] = useState(() => {
    const defaultExp = {};
    if (curriculum.length > 0) {
      defaultExp[curriculum[0].id] = true;
    }
    return defaultExp;
  });

  // Track completed lessons from localStorage
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(`offerunlocked_completed_lessons_${user.email}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Tab state for the details panel under the video
  const [activeTab, setActiveTab] = useState('notes');

  // Notebook content state
  const [notesText, setNotesText] = useState(() => {
    try {
      const saved = localStorage.getItem(`offerunlocked_notes_${user.email}_${course.id}`);
      return saved || '';
    } catch {
      return '';
    }
  });

  // Form states for adding lessons
  const [addingLessonToModuleId, setAddingLessonToModuleId] = useState(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonUrl, setNewLessonUrl] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('');

  // Form states for adding modules
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  // Auto-save notebook text
  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotesText(val);
    try {
      localStorage.setItem(`offerunlocked_notes_${user.email}_${course.id}`, val);
    } catch (err) {
      console.error(err);
    }
  };

  // Sync curriculum changes back to the parent state
  const saveCurriculum = (newCurriculum) => {
    setCurriculum(newCurriculum);
    const totalMins = newCurriculum.reduce((sum, mod) => {
      return sum + mod.lessons.reduce((lSum, l) => {
        const parts = (l.duration || '15').split(':');
        const mins = parts.length === 2 ? parseInt(parts[0], 10) : parseInt(l.duration, 10);
        return lSum + (isNaN(mins) ? 15 : mins);
      }, 0);
    }, 0);

    const updatedCourse = {
      ...course,
      curriculum: newCurriculum,
      modules: newCurriculum.length,
      hours: Math.max(1, Math.round(totalMins / 60))
    };
    onSaveCourse(updatedCourse);
  };

  const handleToggleCompletion = (lessonId) => {
    const updated = {
      ...completedLessons,
      [lessonId]: !completedLessons[lessonId]
    };
    setCompletedLessons(updated);
    try {
      localStorage.setItem(`offerunlocked_completed_lessons_${user.email}`, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleAddLessonSubmit = (e, moduleId) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const url = newLessonUrl.trim() || 'https://youtu.be/hEcjq9LVXL0';
    const duration = newLessonDuration.trim() || '15:00';

    const newLesson = {
      id: `les-${Date.now()}`,
      title: newLessonTitle.trim(),
      videoUrl: url,
      duration: duration
    };

    const updatedCurriculum = curriculum.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          lessons: [...mod.lessons, newLesson]
        };
      }
      return mod;
    });

    saveCurriculum(updatedCurriculum);
    
    // Reset form states
    setAddingLessonToModuleId(null);
    setNewLessonTitle('');
    setNewLessonUrl('');
    setNewLessonDuration('');

    // Automatically select this new lesson as active to view it
    setActiveLesson(newLesson);
  };

  const handleAddModuleSubmit = (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    const newModule = {
      id: `mod-${Date.now()}`,
      title: `Module ${curriculum.length + 1}: ${newModuleTitle.trim()}`,
      lessons: []
    };

    const updatedCurriculum = [...curriculum, newModule];
    saveCurriculum(updatedCurriculum);

    // Reset and open new module
    setNewModuleTitle('');
    setIsAddingModule(false);
    setExpandedModules(prev => ({
      ...prev,
      [newModule.id]: true
    }));
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;

    const updatedCurriculum = curriculum.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          lessons: mod.lessons.filter(les => les.id !== lessonId)
        };
      }
      return mod;
    });

    saveCurriculum(updatedCurriculum);

    if (activeLesson && activeLesson.id === lessonId) {
      const flatLessons = updatedCurriculum.reduce((list, mod) => [...list, ...mod.lessons], []);
      if (flatLessons.length > 0) {
        setActiveLesson(flatLessons[0]);
      } else {
        setActiveLesson(null);
      }
    }
  };

  const handleDeleteModule = (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this entire module and all its lessons?')) return;

    const updatedCurriculum = curriculum.filter(mod => mod.id !== moduleId);
    const cleanedCurriculum = updatedCurriculum.map((mod, index) => {
      const titleParts = mod.title.split(':');
      let titleContent = mod.title;
      if (titleParts.length > 1 && titleParts[0].startsWith('Module')) {
        titleContent = titleParts.slice(1).join(':').trim();
      }
      return {
        ...mod,
        title: `Module ${index + 1}: ${titleContent}`
      };
    });

    saveCurriculum(cleanedCurriculum);

    const flatLessons = cleanedCurriculum.reduce((list, mod) => [...list, ...mod.lessons], []);
    if (activeLesson && !flatLessons.find(les => les.id === activeLesson.id)) {
      if (flatLessons.length > 0) {
        setActiveLesson(flatLessons[0]);
      } else {
        setActiveLesson(null);
      }
    }
  };

  // Metrics
  const allLessons = curriculum.reduce((list, mod) => [...list, ...mod.lessons], []);
  const completedCount = allLessons.filter(les => completedLessons[les.id]).length;
  const totalCount = allLessons.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-6 text-left animate-fade-in">
      
      {/* Workspace Header Top Navigation bar */}
      <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-900/40 border-slate-800/80 shadow-md shadow-indigo-950/5' 
          : 'bg-white border-slate-100 shadow-xs'
      }`}>
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                : 'bg-white border-slate-200 text-slate-650 hover:text-indigo-650 hover:bg-slate-50'
            }`}
            title="Return to Catalog"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
              }`}>
                <BookOpen className="w-3 h-3" /> Learning Console
              </span>
              <span className="text-[10px] text-slate-500 font-bold">•</span>
              <span className={`text-[10px] font-black uppercase tracking-wider ${
                darkMode ? 'text-indigo-400/90' : 'text-indigo-600/90'
              }`}>
                {course.title}
              </span>
            </div>
            <h2 className={`text-base sm:text-lg font-black tracking-tight leading-tight mt-1 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {activeLesson ? activeLesson.title : 'Ready to start learning'}
            </h2>
          </div>
        </div>

        {/* Progress Tracker Widget */}
        <div className="flex items-center gap-4 shrink-0 sm:w-72">
          <div className="flex-1">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider mb-1.5 text-slate-400">
              <span>Syllabus Completed</span>
              <span className={progressPercent === 100 ? 'text-emerald-500' : 'text-indigo-400'}>
                {completedCount}/{totalCount} ({progressPercent}%)
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  progressPercent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {progressPercent === 100 && (
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 animate-bounce">
              <Award className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Video Player, Notes, Perks (Sticky and Fixed on Desktop) */}
        <div className="lg:col-span-2 lg:sticky lg:top-[92px] space-y-5">
          
          {/* Iframe Video Embed */}
          <div className={`relative aspect-video w-full rounded-2xl overflow-hidden border bg-slate-950 shadow-2xl transition-all duration-300 ${
            darkMode ? 'border-slate-800/80 shadow-indigo-950/10' : 'border-slate-200 shadow-slate-200/50'
          }`}>
            {activeLesson ? (
              <iframe
                src={getEmbedUrl(activeLesson.videoUrl)}
                title={activeLesson.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/60">
                <Video className="w-12 h-12 text-slate-500 mb-3 animate-pulse" />
                <h3 className="text-sm font-bold">No lesson selected</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Select a lesson from the syllabus outline on the right to start watching.
                </p>
              </div>
            )}
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="w-full">
            <div className="flex border-b border-slate-200 dark:border-slate-800/80 mb-5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-450 hover:text-slate-200'
                }`}
              >
                Key Takeaways
              </button>
              <button
                onClick={() => setActiveTab('workspace_notes')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'workspace_notes'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-450 hover:text-slate-200'
                }`}
              >
                My Study Notes
              </button>
              <button
                onClick={() => setActiveTab('perks')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'perks'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-450 hover:text-slate-200'
                }`}
              >
                SaaS Perks
              </button>
            </div>

            {/* Tab Panels */}
            {activeTab === 'notes' && (
              <div className={`p-5 rounded-2xl border text-left transition-all ${
                darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-100'
              }`}>
                <h4 className="text-sm font-bold flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-indigo-405" /> Key Study Concepts
                </h4>
                <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  In this lesson, we break down core aspects of {course.title}. Follow along with the instructor, reproduce the code syntax on your workspace, and write notes to build concrete practical experiences.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span className={darkMode ? 'text-slate-300' : 'text-slate-650'}>
                      Configure development workspace and check output log statements.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span className={darkMode ? 'text-slate-300' : 'text-slate-650'}>
                      Analyze computational structures and state definitions for production optimization.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span className={darkMode ? 'text-slate-300' : 'text-slate-650'}>
                      Deploy changes locally and review integration hooks/modules.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workspace_notes' && (
              <div className={`p-5 rounded-2xl border text-left transition-all ${
                darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-100'
              }`}>
                <h4 className="text-sm font-bold flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-indigo-405" /> Personal Scratchpad
                </h4>
                <p className={`text-[10px] uppercase font-bold tracking-wider mb-3.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Write notes or paste code snippets here. Auto-saves as you type.
                </p>
                <textarea
                  value={notesText}
                  onChange={handleNotesChange}
                  rows={6}
                  placeholder="Paste syntax or write quick takeaways here..."
                  className={`w-full p-4 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 transition-all ${
                    darkMode
                      ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600 focus:ring-indigo-500/30'
                      : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-indigo-500/20'
                  }`}
                />
              </div>
            )}

            {activeTab === 'perks' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Lifetime Access", desc: "Enjoy perpetual access to this track and updates." },
                  { title: "Unlimited syllabus unlocks", desc: "Gain access to all modules without barriers." },
                  { title: "Priority resume reviews", desc: "Get direct resume reviews from industry alumni." },
                  { title: "1-on-1 Alumni mock prep", desc: "Access live mock practice panels in your dashboard." }
                ].map((perk, index) => (
                  <div key={index} className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                    darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-100'
                  }`}>
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-405 shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold">{perk.title}</h5>
                      <p className={`text-[10px] mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Scrollable Accordion Module Outline */}
        <div className="lg:col-span-1 h-full lg:max-h-[calc(100vh-135px)] lg:overflow-y-auto pr-1">
          <div className="flex items-center justify-between mb-4.5">
            <h3 className={`text-xs font-black uppercase tracking-wider ${
              darkMode ? 'text-slate-400' : 'text-slate-550'
            }`}>
              Course Curriculum
            </h3>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {curriculum.length} Modules
            </span>
          </div>

          <div className="space-y-4">
            {curriculum.map((mod, modIdx) => {
              const isExpanded = !!expandedModules[mod.id];
              return (
                <div 
                  key={mod.id} 
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700/80' 
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {/* Accordion Header */}
                  <div 
                    onClick={() => toggleModule(mod.id)}
                    className={`p-4 flex items-center justify-between gap-3 cursor-pointer select-none ${
                      darkMode ? 'hover:bg-slate-900/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex-1 text-left">
                      <h3 className="text-[9px] font-black uppercase tracking-wider text-indigo-400 mb-0.5">
                        Module {modIdx + 1}
                      </h3>
                      <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {mod.title.replace(/^Module \d+:\s*/, '')}
                      </h4>
                      <span className={`text-[10px] font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {mod.lessons.length} Lessons • {mod.lessons.reduce((sum, l) => {
                          const parts = l.duration.split(':');
                          const min = parts.length === 2 ? parseInt(parts[0], 10) : parseInt(l.duration, 10);
                          return sum + (isNaN(min) ? 15 : min);
                        }, 0)} mins
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteModule(mod.id);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete Module"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className={`p-1 rounded-lg ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className={`border-t p-3 space-y-2 ${
                      darkMode ? 'border-slate-800/60 bg-slate-950/20' : 'border-slate-100 bg-slate-50/20'
                    }`}>
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLesson && activeLesson.id === lesson.id;
                        const isCompleted = !!completedLessons[lesson.id];
                        return (
                          <div 
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`group/item flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                              isActive 
                                ? darkMode 
                                  ? 'bg-indigo-600/10 border-indigo-500/60 text-white shadow-xs'
                                  : 'bg-indigo-50 border-indigo-200 text-indigo-905'
                                : darkMode
                                  ? 'bg-slate-900/40 border-slate-850 text-slate-300 hover:border-slate-700/60'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                              {/* Completion Checkbox */}
                              <div 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleCompletion(lesson.id);
                                }}
                                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                                  isCompleted
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : darkMode 
                                      ? 'border-slate-700 bg-slate-900 hover:border-slate-500'
                                      : 'border-slate-300 bg-white hover:border-slate-450'
                                }`}
                              >
                                {isCompleted && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className={`text-xs font-bold leading-normal truncate ${
                                  isActive 
                                    ? 'text-indigo-400' 
                                    : darkMode ? 'text-slate-200' : 'text-slate-850'
                                }`}>
                                  {lesson.title}
                                </p>
                                <span className={`text-[10px] font-semibold flex items-center gap-1.5 mt-0.5 ${
                                  darkMode ? 'text-slate-500' : 'text-slate-450'
                                }`}>
                                  <Clock className="w-3 h-3 text-slate-450" />
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isActive && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-indigo-455 bg-indigo-500/10 px-2 py-0.5 rounded-full shrink-0">
                                  <Play className="w-2.5 h-2.5 fill-indigo-500 text-indigo-500" />
                                  Playing
                                </span>
                              )}

                              {isAdmin && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteLesson(mod.id, lesson.id);
                                  }}
                                  className="p-1 rounded-md text-slate-555 hover:text-rose-500 hover:bg-rose-500/10 transition-colors opacity-0 group-hover/item:opacity-100 cursor-pointer animate-fade-in"
                                  title="Delete Lesson"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Inline Add Lesson Trigger & Form */}
                      {isAdmin && (
                        <div className="mt-3">
                          {addingLessonToModuleId === mod.id ? (
                            <form 
                              onSubmit={(e) => handleAddLessonSubmit(e, mod.id)}
                              className={`p-3 rounded-xl border text-left space-y-3 ${
                                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between border-b pb-1.5 mb-1.5 border-slate-800/40">
                                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Add New Lesson</span>
                                <button 
                                  type="button" 
                                  onClick={() => setAddingLessonToModuleId(null)}
                                  className="p-0.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Lesson Title</label>
                                  <input 
                                    type="text"
                                    required
                                    value={newLessonTitle}
                                    onChange={(e) => setNewLessonTitle(e.target.value)}
                                    placeholder="e.g. 04. State Initialization"
                                    className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                      darkMode 
                                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' 
                                        : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                                    }`}
                                  />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="col-span-2">
                                    <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">YouTube URL</label>
                                    <input 
                                      type="text"
                                      value={newLessonUrl}
                                      onChange={(e) => setNewLessonUrl(e.target.value)}
                                      placeholder="https://youtu.be/hEcjq9LVXL0"
                                      className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                        darkMode 
                                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' 
                                          : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                                      }`}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Duration</label>
                                    <input 
                                      type="text"
                                      value={newLessonDuration}
                                      onChange={(e) => setNewLessonDuration(e.target.value)}
                                      placeholder="15:00"
                                      className={`w-full px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                        darkMode 
                                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' 
                                          : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                                      }`}
                                    />
                                  </div>
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold active:scale-[0.99] transition-all cursor-pointer"
                              >
                                Save Lesson
                              </button>
                            </form>
                          ) : (
                            <button
                              onClick={() => {
                                setAddingLessonToModuleId(mod.id);
                                setNewLessonTitle('');
                                setNewLessonUrl('');
                                setNewLessonDuration('');
                              }}
                              className={`w-full py-2 flex items-center justify-center gap-1.5 rounded-xl border border-dashed text-xs font-bold transition-all cursor-pointer ${
                                darkMode 
                                  ? 'border-slate-800 text-slate-400 hover:text-indigo-405 hover:border-indigo-500/40 bg-slate-900/10' 
                                  : 'border-slate-200 text-slate-600 hover:text-indigo-650 hover:border-indigo-400 bg-slate-50/50'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Lesson
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Admin Add Module Form */}
            {isAdmin && (
              <div className="mt-6 border-t border-slate-850 pt-4">
                {isAddingModule ? (
                  <form 
                    onSubmit={handleAddModuleSubmit}
                    className={`p-4 rounded-2xl border text-left space-y-3 ${
                      darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b pb-2 mb-2 border-slate-800/45">
                      <span className="text-xs font-black uppercase tracking-wider text-indigo-405">Create New Module</span>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingModule(false)}
                        className="p-0.5 rounded-md hover:bg-slate-800 text-slate-450 hover:text-slate-200 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-455 mb-1 animate-pulse">Module Title</label>
                      <input 
                        type="text"
                        required
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        placeholder="e.g. Advanced Routing & Layouts"
                        className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          darkMode 
                            ? 'bg-slate-955 border-slate-800 text-white placeholder-slate-700' 
                            : 'bg-white border-slate-200 text-slate-800 placeholder-slate-450'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold active:scale-[0.99] transition-all cursor-pointer"
                    >
                      Create Module
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingModule(true)}
                    className={`w-full py-3 flex items-center justify-center gap-1.5 rounded-2xl border border-dashed text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      darkMode 
                        ? 'border-slate-800 text-slate-405 hover:text-indigo-400 hover:border-indigo-500/45 bg-slate-900/20' 
                        : 'border-slate-200 text-slate-600 hover:text-indigo-650 hover:border-indigo-400 bg-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" /> Create New Module
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
