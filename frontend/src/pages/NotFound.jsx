import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex items-center justify-center p-6 relative overflow-hidden selection:bg-blue-100">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10B981] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg text-center animate-fade-in-up">
        
        {/* Floating 404 Icon Area */}
        <div className="relative inline-flex justify-center items-center mb-8">
          <div className="absolute inset-0 bg-[#EFF6FF] rounded-full blur-xl animate-pulse"></div>
          <div className="bg-white border-2 border-[#E2E8F0] w-32 h-32 rounded-full flex items-center justify-center relative z-10 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <h1 className="text-[56px] font-black text-[#2563EB] tracking-tighter">404</h1>
          </div>
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-md z-20">
             <FiAlertCircle size={28} className="text-[#EF4444]" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[36px] font-extrabold text-[#0F172A] mb-4 tracking-tight leading-tight">
          Oops! You seem to be lost.
        </h2>
        <p className="text-[18px] text-[#475569] font-medium mb-10 leading-relaxed px-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#0F172A] px-8 py-4 rounded-[16px] text-[16px] font-bold transition-all active:scale-95 shadow-sm"
          >
            <FiArrowLeft size={20} /> Go Back
          </button>
          
          <Link 
            to="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#3B82F6] text-white px-8 py-4 rounded-[16px] text-[16px] font-bold transition-all active:scale-95 shadow-[0_4px_20px_rgba(37,99,235,0.25)]"
          >
            <FiHome size={20} /> Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}

export default NotFound;