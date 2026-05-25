import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Landing from './pages/Landing'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard'; 
import Onboarding from './pages/Onboarding'; 
import Roadmap from './pages/Roadmap'; 
import Mentors from './pages/Mentors';
import Profile from './pages/Profile'; 
import LearningModule from './pages/LearningModule'; 
import NotFound from './pages/NotFound';

// 🔥 NAYA: Naye premium pages ko import kiya hai
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';

// Components
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================================
            STANDALONE PAGES (Bina Sidebar ke - Focus Mode) 
            ========================================== */}
        <Route path="/" element={<Landing />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Learning route yahan add kiya hai taaki distraction-free rahe */}
        <Route path="/learning" element={<LearningModule />} />
        
        {/* ==========================================
            APP PAGES (Layout/Sidebar ke andar khulenge)
            ========================================== */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/roadmap/:id" element={<Roadmap />} />
          <Route path="/roadmap" element={<Roadmap />} />
          
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/profile" element={<Profile />} />

          {/* 👇 NAYA: Settings aur Help Center ke routes add kiye hain 👇 */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpCenter />} />
        </Route>
        
        {/* Catch-all route for 404 Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;