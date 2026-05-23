import React from 'react';
import { FiX } from 'react-icons/fi';

function Modal({ isOpen, onClose, title, children }) {
  // Agar modal open nahi hai, toh kuch bhi render mat karo
  if (!isOpen) return null;

  return (
    // Backdrop (Peeche ka blur aur dark effect)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/60 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Box */}
      <div className="bg-white rounded-[24px] w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-fade-in-up relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0] bg-white relative z-10">
          <h3 className="text-[20px] font-extrabold text-[#0F172A]">{title}</h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors border border-[#E2E8F0]"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 bg-white relative z-10 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;