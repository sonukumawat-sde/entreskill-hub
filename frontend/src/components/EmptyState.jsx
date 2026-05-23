import React from 'react';
import { FiInbox, FiPlus } from 'react-icons/fi';

function EmptyState({ title, description, actionText, icon }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate-300 rounded-3xl w-full">
      <div className="bg-slate-50 p-6 rounded-full mb-5 text-slate-400 border border-slate-100 shadow-inner">
        {icon || <FiInbox size={32} />}
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 font-medium max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && (
        <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2 group">
          <FiPlus className="group-hover:rotate-90 transition-transform" /> {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;