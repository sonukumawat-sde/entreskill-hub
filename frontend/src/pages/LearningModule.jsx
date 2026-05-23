import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiCheckCircle, FiFileText, FiDownload, 
  FiClock, FiStar, FiMessageSquare, FiEdit3, FiSave,
  FiChevronLeft, FiChevronRight, FiPlayCircle, FiBookOpen
} from 'react-icons/fi';

function LearningModule() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Dynamic data handling from Roadmap (Fallback to dummy if accessed directly)
  const taskData = location.state?.task || {
    title: "Understanding Market Validation",
    taskType: "video",
    duration: "15 mins",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ", // Generic placeholder video
    description: "In this lesson, you will learn the exact formula to validate your market so you can build profitably. We will cover target audience, pain points, and MVP basics.",
  };

  const ideaId = location.state?.ideaId || 'demo-idea';
  const stageIdx = location.state?.stageIdx || 0;
  const taskIdx = location.state?.taskIdx || 0;

  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Personal Notes State & Auto-save Logic
  const notesKey = `notes_${ideaId}_${stageIdx}_${taskIdx}`;
  const [notes, setNotes] = useState(() => localStorage.getItem(notesKey) || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem(notesKey, notes);
      setIsSaving(false);
    }, 1000); // Auto-save 1 second after user stops typing
    
    return () => clearTimeout(saveTimeout);
  }, [notes, notesKey]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    setIsSaving(true);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      navigate(-1); // Takes user back to the roadmap
    }, 1500);
  };

  // Dummy resources
  const resources = [
    { id: 1, name: "Lesson_Action_Plan.pdf", size: "2.4 MB" },
    { id: 2, name: "Checklist_Template.xlsx", size: "1.1 MB" }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      
      {/* ==========================================
          1. TOP NAVIGATION BAR
          ========================================== */}
      <header className="bg-[#0F172A] border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Back to Roadmap"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="hidden md:block h-6 w-px bg-slate-700"></div>
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-0.5 capitalize">{taskData.taskType} Lesson</p>
            <h1 className="text-sm font-semibold text-white truncate max-w-md">{taskData.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800">
            <FiMessageSquare /> Ask Expert
          </button>
        </div>
      </header>

      {/* ==========================================
          2. MAIN CONTENT AREA
          ========================================== */}
      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
        
        {/* LEFT COLUMN: Media Player & Tabs */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-slate-800 bg-[#0B1120]">
          
          {/* Dynamic Media Section */}
          <div className="w-full aspect-video bg-black relative flex items-center justify-center border-b border-slate-800 shadow-2xl">
            {taskData.taskType === 'video' ? (
              <iframe 
                className="w-full h-full"
                src={taskData.videoUrl || "https://www.youtube.com/embed/LXb3EKWsInQ"} 
                title="Lesson Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <FiBookOpen size={64} className="mb-4 opacity-50" />
                <h2 className="text-xl font-bold text-white mb-2">Reading Assignment</h2>
                <p className="text-sm">Read the material below to complete this task.</p>
              </div>
            )}
          </div>

          {/* Content Tabs */}
          <div className="flex-1 bg-white rounded-tl-[32px] rounded-tr-[32px] lg:rounded-tr-none lg:rounded-tl-[40px] mt-8 lg:mt-0 overflow-hidden flex flex-col">
            <div className="px-8 pt-8 border-b border-slate-200">
              <h2 className="text-[28px] font-extrabold text-[#0F172A] mb-6 leading-tight">
                {taskData.title}
              </h2>
              
              <div className="flex gap-8 border-b border-transparent">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === 'overview' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Overview
                  {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className={`pb-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === 'resources' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Resources <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">{resources.length}</span>
                  {activeTab === 'resources' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('notes')}
                  className={`pb-4 text-sm font-bold transition-colors relative flex items-center gap-2 ${activeTab === 'notes' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  <FiEdit3 /> My Notes
                  {activeTab === 'notes' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="p-8 flex-1 overflow-y-auto">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">About this task</h3>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    {taskData.description}
                  </p>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center gap-5">
                    <img src="https://ui-avatars.com/api/?name=Aarti+Sharma&background=DBEAFE&color=2563EB&bold=true" alt="Instructor" className="w-16 h-16 rounded-full shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Prepared by</p>
                      <h4 className="text-lg font-bold text-slate-900 flex items-center gap-1">
                        Aarti Sharma <FiStar className="fill-amber-400 text-amber-400 ml-1" size={16}/>
                      </h4>
                      <p className="text-sm font-medium text-slate-600">Industry Expert</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === 'resources' && (
                <div className="animate-fade-in space-y-4">
                  {resources.map((res) => (
                    <div key={res.id} className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <FiFileText size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-0.5">{res.name}</h4>
                          <p className="text-xs font-medium text-slate-500">{res.size} • PDF Document</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-blue-600 transition-colors p-2">
                        <FiDownload size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* My Notes Tab */}
              {activeTab === 'notes' && (
                <div className="animate-fade-in h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-500 font-medium">Capture your key takeaways here. They are saved automatically.</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                      {isSaving ? <span className="text-amber-500 animate-pulse">Saving...</span> : <><FiSave className="text-green-500" /> Saved</>}
                    </div>
                  </div>
                  <textarea 
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Type your notes here..."
                    className="flex-1 w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 leading-relaxed"
                  ></textarea>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="w-full lg:w-[400px] bg-white lg:bg-[#F8FAFC] border-l border-slate-200 flex flex-col justify-between">
          
          <div className="p-8 flex-1">
            <div className="bg-white lg:bg-transparent rounded-2xl lg:rounded-none p-6 lg:p-0 shadow-sm lg:shadow-none border border-slate-200 lg:border-none mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Task Details</h3>
              
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FiClock size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Duration</p>
                    <p className="font-bold text-slate-900">{taskData.duration}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FiCheckCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                    <p className="font-bold text-slate-900">{isCompleted ? 'Completed' : 'Pending'}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Area & Navigation */}
          <div className="bg-white border-t border-slate-200 p-8">
            
            {/* Complete Button */}
            <div className="mb-6">
              {isCompleted ? (
                <div className="bg-green-50 border border-green-200 rounded-[16px] p-4 text-center animate-fade-in flex items-center justify-center gap-3">
                  <FiCheckCircle size={24} className="text-green-600" />
                  <div className="text-left">
                    <h3 className="font-bold text-green-800 text-[15px]">Awesome Job!</h3>
                    <p className="text-xs text-green-600 font-medium">Task completed successfully.</p>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleComplete}
                  className="w-full bg-[#0F172A] hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-[16px] transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-3 text-[16px]"
                >
                  <FiCheckCircle size={20} /> Mark as Complete
                </button>
              )}
            </div>

            {/* Previous / Next Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <FiChevronLeft size={18} /> Prev
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                Next Task <FiChevronRight size={18} />
              </button>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default LearningModule;