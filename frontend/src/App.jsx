import React, { useState } from 'react';
import './App.css';
import BrandingSection from './components/BrandingSection';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CourseModal from './components/CourseModal';

const INITIAL_COURSES = [
  {
    id: 1,
    title: 'Java Full Stack Masterclass',
    banner: '/assets/java.png',
    modules: 16,
    hours: 48,
  },
  {
    id: 2,
    title: 'React & Modern Frontend Engineering',
    banner: '/assets/react.png',
    modules: 12,
    hours: 32,
  },
  {
    id: 3,
    title: 'Data Structures & Algorithms (DSA)',
    banner: '/assets/dsa.png',
    modules: 18,
    hours: 50,
  },
  {
    id: 4,
    title: 'HTML & CSS Mastery',
    banner: '/assets/html&css.png',
    modules: 8,
    hours: 20,
  },
  {
    id: 5,
    title: 'JavaScript Essentials & Advanced',
    banner: '/assets/javascript.png',
    modules: 14,
    hours: 36,
  },
  {
    id: 6,
    title: 'MERN Stack Complete Bootcamp',
    banner: '/assets/mernstack.png',
    modules: 24,
    hours: 72,
  },
  {
    id: 7,
    title: 'React Router & Single Page Apps',
    banner: '/assets/reactrouter.png',
    modules: 6,
    hours: 15,
  },
  {
    id: 8,
    title: 'SQL & Database Architecture',
    banner: '/assets/sql.png',
    modules: 10,
    hours: 25,
  },
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [darkMode, setDarkMode] = useState(true);
  
  // Modal visibility states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCourseToEdit, setActiveCourseToEdit] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setDarkMode(true); // Reset to default dark mode on logout
  };

  // CRUD: Create and Update course handler
  const handleSaveCourse = (savedCourse) => {
    if (savedCourse.id) {
      // Update existing course
      setCourses(
        courses.map((course) => (course.id === savedCourse.id ? savedCourse : course))
      );
    } else {
      // Create new course
      const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
      setCourses([...courses, { ...savedCourse, id: newId }]);
    }
  };

  // CRUD: Delete course handler
  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this learning track?')) {
      setCourses(courses.filter((course) => course.id !== courseId));
    }
  };

  const handleOpenAddModal = () => {
    setActiveCourseToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setActiveCourseToEdit(course);
    setIsModalOpen(true);
  };

  return (
    <>
      {currentUser ? (
        // Authenticated View
        <Dashboard
          user={currentUser}
          courses={courses}
          onAddCourse={handleOpenAddModal}
          onEditCourse={handleOpenEditModal}
          onDeleteCourse={handleDeleteCourse}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
      ) : (
        // Unauthenticated Login / Landing View
        <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-950">
          <BrandingSection />
          <LoginForm onLogin={handleLogin} />
        </div>
      )}

      {/* Admin Course Scaffolding Form Modal */}
      {currentUser && (
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setActiveCourseToEdit(null);
          }}
          onSave={handleSaveCourse}
          course={activeCourseToEdit}
          darkMode={darkMode}
        />
      )}
    </>
  );
}

export default App;
