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
  Video,
  Award,
  ChevronsLeft,
  ChevronsRight
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
          { id: 'java-les-1-1', title: '01. Java Introduction & JVM Architecture', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '15:20' },
          { id: 'java-les-1-2', title: '02. Data Types, Variables & Operators', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '18:45' },
          { id: 'java-les-1-3', title: '03. Conditional Statements & Control Flow', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '20:10' }
        ]
      },
      {
        id: 'java-mod-2',
        title: 'Module 2: Java Essentials',
        lessons: [
          { id: 'java-les-2-1', title: '04. Working with Arrays & Loops', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '22:15' },
          { id: 'java-les-2-2', title: '05. Creating & Calling Java Methods', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '14:30' },
          { id: 'java-les-2-3', title: '06. String Manipulation & String Pool', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '25:05' }
        ]
      },
      {
        id: 'java-mod-3',
        title: 'Module 3: Object-Oriented Programming (OOPs)',
        lessons: [
          { id: 'java-les-3-1', title: '07. OOPs Core Concepts: Classes & Objects', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '19:50' },
          { id: 'java-les-3-2', title: '08. The 4 Pillars: Encapsulation (Access Modifiers)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '16:15' },
          { id: 'java-les-3-3', title: '09. The 4 Pillars: Inheritance (extends keyword)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '18:40' },
          { id: 'java-les-3-4', title: '10. The 4 Pillars: Polymorphism (Overloading & Overriding)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '21:30' },
          { id: 'java-les-3-5', title: '11. The 4 Pillars: Abstraction (Abstract Classes & Interfaces)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '24:10' }
        ]
      },
      {
        id: 'java-mod-4',
        title: 'Module 4: Exception Handling',
        lessons: [
          { id: 'java-les-4-1', title: '12. Intro to Exceptions (Try-Catch blocks)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '15:45' },
          { id: 'java-les-4-2', title: '13. Throw, Throws & Custom Exceptions', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '17:20' }
        ]
      },
      {
        id: 'java-mod-5',
        title: 'Module 5: Multithreading',
        lessons: [
          { id: 'java-les-5-1', title: '14. Creating Threads (Thread class & Runnable)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '22:30' },
          { id: 'java-les-5-2', title: '15. Thread Synchronization & Inter-thread Communication', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '28:15' }
        ]
      },
      {
        id: 'java-mod-6',
        title: 'Module 6: Java Collections Framework',
        lessons: [
          { id: 'java-les-6-1', title: '16. List Interface (ArrayList vs LinkedList)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '24:50' },
          { id: 'java-les-6-2', title: '17. Set Interface (HashSet vs TreeSet)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '19:15' },
          { id: 'java-les-6-3', title: '18. Map Interface (HashMap vs TreeMap)', videoUrl: 'https://youtu.be/rpM98NCecJQ', duration: '26:40' }
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
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
          duration: '12:45'
        },
        {
          id: 'les-1-2',
          title: `02. Setting up Environment & Workspace`,
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
          duration: '18:20'
        },
        {
          id: 'les-1-3',
          title: `03. Understanding Basic Anatomy & Hello World`,
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
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
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
          duration: '25:40'
        },
        {
          id: 'les-2-2',
          title: `05. Control Flows, Loops & Operations`,
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
          duration: '30:10'
        },
        {
          id: 'les-2-3',
          title: `06. Building Scalable Architecture for ${topic}`,
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
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
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
          duration: '14:30'
        },
        {
          id: 'les-3-2',
          title: `08. Performance Benchmarking & Optimization`,
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
          duration: '28:15'
        },
        {
          id: 'les-3-3',
          title: `09. Best Practices, Security & Cloud Deployment`,
          videoUrl: 'https://youtu.be/rpM98NCecJQ',
          duration: '21:05'
        }
      ]
    }
  ];
};

const getEmbedUrl = (url) => {
  if (!url) return 'https://www.youtube.com/embed/rpM98NCecJQ';
  
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
        videoId = 'rpM98NCecJQ';
      }
    }
  } catch {
    videoId = 'rpM98NCecJQ';
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
};

export default function CourseWorkspace({ course, user, onSaveCourse, onBack, darkMode }) {
  const isAdmin = user.role === 'admin';

  // Sidebar collapsible state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  // Form states for adding lessons
  const [addingLessonToModuleId, setAddingLessonToModuleId] = useState(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonUrl, setNewLessonUrl] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('');

  // Form states for adding modules
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

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

    const url = newLessonUrl.trim() || 'https://youtu.be/rpM98NCecJQ';
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

  // Previous & Next navigation controls
  const activeIdx = allLessons.findIndex(l => l.id === activeLesson?.id);
  const prevLesson = activeIdx > 0 ? allLessons[activeIdx - 1] : null;
  const nextLesson = activeIdx >= 0 && activeIdx < allLessons.length - 1 ? allLessons[activeIdx + 1] : null;

  const handlePrevLesson = () => {
    if (prevLesson) {
      setActiveLesson(prevLesson);
      const parentMod = curriculum.find(mod => mod.lessons.some(l => l.id === prevLesson.id));
      if (parentMod) {
        setExpandedModules(prev => ({ ...prev, [parentMod.id]: true }));
      }
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      setActiveLesson(nextLesson);
      const parentMod = curriculum.find(mod => mod.lessons.some(l => l.id === nextLesson.id));
      if (parentMod) {
        setExpandedModules(prev => ({ ...prev, [parentMod.id]: true }));
      }
    }
  };

  return (
    <div className={`h-screen w-screen flex overflow-hidden select-none transition-colors duration-305 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Collapsible Left Sidebar */}
      <div className={`h-full flex flex-col border-r transition-all duration-300 shrink-0 ${
        isSidebarCollapsed ? 'w-0 border-r-0' : 'w-80 md:w-[320px]'
      } ${
        darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
      } overflow-hidden`}>
        
        {/* Sidebar Header */}
        <div className="p-4 bg-slate-900 text-white shrink-0">
          <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to course page
            </button>
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Collapse Sidebar"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-lg font-black tracking-tight text-white mt-4 text-left leading-snug">
            {course.title}
          </h2>

          {/* Progress Section */}
          <div className="flex items-center gap-3 mt-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            <div className="flex-1 bg-slate-800 rounded-full h-1 overflow-hidden">
              <div 
                className="h-1 bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="shrink-0">{progressPercent}%</span>
          </div>
        </div>

        {/* Sidebar Body - Accordion Modules list */}
        <div className={`flex-1 overflow-y-auto ${
          darkMode ? 'bg-slate-955 text-slate-200' : 'bg-white text-slate-800'
        }`}>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {curriculum.map((mod, modIdx) => {
              const isExpanded = !!expandedModules[mod.id];
              return (
                <div key={mod.id} className="transition-all duration-200">
                  {/* Accordion Header */}
                  <div 
                    onClick={() => toggleModule(mod.id)}
                    className={`py-3 px-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors duration-150 ${
                      isExpanded 
                        ? darkMode ? 'bg-slate-900/60' : 'bg-slate-50' 
                        : darkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex-1 text-left min-w-0">
                      <h4 className={`text-xs font-bold tracking-tight leading-snug truncate ${
                        darkMode ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        {modIdx + 1}. {mod.title.replace(/^Module \d+:\s*/, '')}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteModule(mod.id);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete Module"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      <div className={darkMode ? 'text-slate-500' : 'text-slate-400'}>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className={`p-2 space-y-1 ${
                      darkMode ? 'bg-slate-955' : 'bg-slate-50/30'
                    }`}>
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLesson && activeLesson.id === lesson.id;
                        const isCompleted = !!completedLessons[lesson.id];
                        return (
                          <div 
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`group/item flex items-center justify-between gap-2.5 py-1.5 px-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                              isActive 
                                ? darkMode 
                                  ? 'bg-indigo-600/10 border-indigo-500/50 text-white shadow-xs'
                                  : 'bg-indigo-50/80 border-indigo-200 text-indigo-900 font-bold'
                                : darkMode
                                  ? 'bg-transparent border-transparent text-slate-400 hover:border-slate-800'
                                  : 'bg-transparent border-transparent text-slate-600 hover:border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 text-left flex-1 min-w-0">
                              {/* Completion Checkbox */}
                              <div 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleCompletion(lesson.id);
                                }}
                                className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border transition-all ${
                                  isCompleted
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : darkMode 
                                      ? 'border-slate-800 bg-slate-900 hover:border-slate-655'
                                      : 'border-slate-300 bg-white hover:border-slate-400'
                                }`}
                              >
                                {isCompleted && <CheckCircle className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className={`text-[11px] leading-normal truncate ${
                                  isActive 
                                    ? 'text-indigo-400 font-bold' 
                                    : darkMode ? 'text-slate-305' : 'text-slate-700'
                                }`}>
                                  {lesson.title}
                                </p>
                                <span className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isActive && (
                                <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded shrink-0">
                                  <Play className="w-2 h-2 fill-indigo-500 text-indigo-500" />
                                  Playing
                                </span>
                              )}

                              {isAdmin && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteLesson(mod.id, lesson.id);
                                  }}
                                  className="p-1 rounded text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors opacity-0 group-hover/item:opacity-100 cursor-pointer animate-fade-in"
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
                        <div className="mt-2 px-2.5">
                          {addingLessonToModuleId === mod.id ? (
                            <form 
                              onSubmit={(e) => handleAddLessonSubmit(e, mod.id)}
                              className={`p-2.5 rounded-lg border text-left space-y-2.5 ${
                                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between border-b pb-1 border-slate-800/40">
                                <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400">Add Lesson</span>
                                <button 
                                  type="button" 
                                  onClick={() => setAddingLessonToModuleId(null)}
                                  className="p-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="space-y-1.5">
                                <input 
                                  type="text"
                                  required
                                  value={newLessonTitle}
                                  onChange={(e) => setNewLessonTitle(e.target.value)}
                                  placeholder="Lesson Title"
                                  className={`w-full px-2 py-1 text-[10px] rounded border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                    darkMode 
                                      ? 'bg-slate-955 border-slate-800 text-white placeholder-slate-700' 
                                      : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                                  }`}
                                />
                                <div className="grid grid-cols-3 gap-1.5">
                                  <input 
                                    type="text"
                                    value={newLessonUrl}
                                    onChange={(e) => setNewLessonUrl(e.target.value)}
                                    placeholder="YouTube URL"
                                    className={`col-span-2 w-full px-2 py-1 text-[10px] rounded border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                      darkMode 
                                        ? 'bg-slate-955 border-slate-800 text-white placeholder-slate-700' 
                                        : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                                    }`}
                                  />
                                  <input 
                                    type="text"
                                    value={newLessonDuration}
                                    onChange={(e) => setNewLessonDuration(e.target.value)}
                                    placeholder="15:00"
                                    className={`w-full px-2 py-1 text-[10px] rounded border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                      darkMode 
                                        ? 'bg-slate-955 border-slate-800 text-white placeholder-slate-700' 
                                        : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                                    }`}
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="w-full py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold active:scale-[0.99] transition-all cursor-pointer"
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
                              className={`w-full py-1.5 flex items-center justify-center gap-1 rounded border border-dashed text-[10px] font-bold transition-all cursor-pointer ${
                                darkMode 
                                  ? 'border-slate-800 text-slate-450 hover:text-indigo-400 hover:border-indigo-500/40 bg-slate-900/10' 
                                  : 'border-slate-200 text-slate-500 hover:text-indigo-650 hover:border-indigo-400 bg-slate-50/50'
                              }`}
                            >
                              <Plus className="w-3 h-3" /> Add Lesson
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
              <div className="p-4">
                {isAddingModule ? (
                  <form 
                    onSubmit={handleAddModuleSubmit}
                    className={`p-3 rounded border text-left space-y-2 ${
                      darkMode ? 'bg-slate-900/40 border-slate-805' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b pb-1.5 border-slate-800/40">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-405">Create Module</span>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingModule(false)}
                        className="p-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input 
                      type="text"
                      required
                      value={newModuleTitle}
                      onChange={(e) => setNewModuleTitle(e.target.value)}
                      placeholder="Module Title"
                      className={`w-full px-2 py-1.5 text-xs rounded border focus:outline-none focus:ring-1 focus:ring-indigo-550 ${
                        darkMode 
                          ? 'bg-slate-955 border-slate-800 text-white placeholder-slate-700' 
                          : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />

                    <button
                      type="submit"
                      className="w-full py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold active:scale-[0.99] transition-all cursor-pointer"
                    >
                      Create Module
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingModule(true)}
                    className={`w-full py-2 flex items-center justify-center gap-1 rounded border border-dashed text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      darkMode 
                        ? 'border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 bg-slate-900/20' 
                        : 'border-slate-200 text-slate-655 hover:text-indigo-650 hover:border-indigo-400 bg-white'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" /> Create Module
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Video Player Workspace Area */}
      <div className="flex-1 h-full flex flex-col overflow-hidden bg-slate-950">
        
        {/* Top Bar Navigation */}
        <div className="h-12 px-6 flex items-center justify-between border-b border-slate-900 bg-slate-950 text-slate-200 shrink-0 select-none">
          <div className="flex items-center gap-3">
            {isSidebarCollapsed ? (
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Expand Sidebar"
              >
                <ChevronsRight className="w-4 h-4 text-indigo-400" /> Back to list
              </button>
            ) : (
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hidden sm:inline">Active Video Session</span>
            )}
          </div>

          {/* Centered Previous/Next navigation controls */}
          <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
            <button
              onClick={handlePrevLesson}
              disabled={!prevLesson}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              &lt; previous
            </button>
            <span className="text-slate-800 font-normal">|</span>
            <button
              onClick={handleNextLesson}
              disabled={!nextLesson}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              next &gt;
            </button>
          </div>

          {/* User Email display on the right */}
          <div className="text-[11px] font-semibold text-slate-500 select-none font-mono">
            {user.email}
          </div>
        </div>

        {/* Video Frame - occupying 100% remaining width and height */}
        <div className="flex-1 w-full h-full bg-black relative">
          {activeLesson ? (
            <iframe
              src={getEmbedUrl(activeLesson.videoUrl)}
              title={activeLesson.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/60 text-white">
              <Video className="w-12 h-12 text-slate-500 mb-3 animate-pulse" />
              <h3 className="text-sm font-bold">No lesson selected</h3>
              <p className="text-xs text-slate-550 mt-1 max-w-xs">
                Select a lesson from the outline on the left to start learning.
              </p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
