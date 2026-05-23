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
import LearningModule from './pages/LearningModule'; // Naya Learning Module import kiya
import NotFound from './pages/NotFound';

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
        
        {/* Naya Learning route yahan add kiya hai taaki distraction-free rahe */}
        <Route path="/learning" element={<LearningModule />} />
        
        {/* ==========================================
            APP PAGES (Layout/Sidebar ke andar khulenge)
            ========================================== */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 👇 NAYA: Roadmap ko ab ID chahiye taaki wo specific idea dikha sake 👇 */}
          <Route path="/roadmap/:id" element={<Roadmap />} />
          {/* Purana wala route bhi rakha hai taaki Sidebar ka link directly crash na ho */}
          <Route path="/roadmap" element={<Roadmap />} />
          
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Catch-all route for 404 Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;