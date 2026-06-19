import React from 'react';
import './App.css';
import BrandingSection from './components/BrandingSection';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-slate-950">
      {/* Left Column: Branding (hidden on mobile/tablet, flex on laptop/desktop) */}
      <BrandingSection />
      
      {/* Right Column: Interactive Login Form (takes full viewport on mobile) */}
      <LoginForm />
    </div>
  );
}

export default App;
