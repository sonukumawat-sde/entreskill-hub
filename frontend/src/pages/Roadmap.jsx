import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle, FiCircle, FiLock, FiPlayCircle, FiBookOpen, FiVideo, FiStar, FiCalendar, FiArrowRight, FiMap } from 'react-icons/fi';

function Roadmap() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // LocalStorage se progress uthao ya naya object banao
  const [completedTasks, setCompletedTasks] = useState(() => {
    if (!id) return {};
    const savedProgress = localStorage.getItem(`roadmapProgress_${id}`);
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  // Jab bhi completedTasks change ho, usko LocalStorage mein save kar do
  useEffect(() => {
    if (id) {
      localStorage.setItem(`roadmapProgress_${id}`, JSON.stringify(completedTasks));
    }
  }, [completedTasks, id]);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchIdeaDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const { data } = await axios.get(`http://localhost:5000/api/recommendations/${id}`, config);
        setIdea(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setIsLoading(false);
      }
    };
    fetchIdeaDetails();
  }, [id]);

  // Task ko toggle karne ka logic
  const toggleTask = (stageIdx, taskIdx) => {
    const taskKey = `${stageIdx}-${taskIdx}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-[18px] font-bold text-slate-500">Generating your custom AI Roadmap... 🚀</p>
      </div>
    );
  }

  // 2. Empty State
  if (!id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-6 pb-24">
        <div className="bg-white p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 text-center max-w-md w-full transition-all">
          <div className="w-20 h-20 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMap size={36} />
          </div>
          <h2 className="text-[24px] font-extrabold text-[#0F172A] mb-3">No Roadmap Selected</h2>
          <p className="text-[16px] text-[#475569] font-medium mb-8">
            You haven't selected a business idea yet. Please go to the Dashboard and choose an idea to build your custom roadmap.
          </p>
          <Link to="/dashboard" className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3.5 px-6 rounded-[16px] transition-colors active:scale-95 shadow-md">
            Go to Dashboard <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  // 3. Error State
  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <p className="p-20 text-center font-bold text-red-500 text-xl">Roadmap not found! 😢</p>
      </div>
    );
  }

  // ==========================================
  // PROGRESS CALCULATION LOGIC
  // ==========================================
  let totalTasks = 0;
  let completedCount = 0;

  idea.roadmap.forEach((stage, sIdx) => {
    totalTasks += stage.tasks.length;
    stage.tasks.forEach((task, tIdx) => {
      const key = `${sIdx}-${tIdx}`;
      if (completedTasks[key]) {
        completedCount++;
      }
    });
  });

  const isFullyCompleted = totalTasks > 0 && completedCount === totalTasks;
  const activeStage = idea.roadmap[activeStageIndex];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 selection:bg-blue-100">
      
      {/* ==========================================
          PAGE HEADER
          ========================================== */}
      <header className="bg-white border-b border-slate-200 px-6 py-8 md:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <p className="text-[14px] font-bold text-[#2563EB] uppercase tracking-widest mb-1">
                {idea.category} Business
              </p>
              <h1 className="text-[36px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
                {idea.title} Roadmap
              </h1>
            </div>
            <div className="bg-[#EFF6FF] px-5 py-3 rounded-[16px] flex items-center gap-3 border border-[#DBEAFE]">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#2563EB] text-[#2563EB] font-bold text-[16px]">
                 {activeStageIndex + 1}
               </div>
               <div>
                 <p className="text-[12px] font-bold text-[#475569] uppercase tracking-wider">Current Stage</p>
                 <p className="text-[16px] font-extrabold text-[#0F172A] truncate max-w-[160px]">
                   {activeStage?.stageName}
                 </p>
               </div>
            </div>
          </div>
          <p className="text-[18px] text-[#475569] font-medium max-w-2xl">
            {idea.description}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* ==========================================
            CELEBRATION BANNER (Shows only on 100% completion)
            ========================================== */}
        {isFullyCompleted && (
          <div className="mb-12 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-[24px] p-8 text-white shadow-[0_10px_40px_rgba(16,185,129,0.3)] flex flex-col md:flex-row items-center justify-between gap-6 transform transition-all hover:scale-[1.01]">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-extrabold tracking-wide mb-4 uppercase">
                <FiCheckCircle size={18} /> 100% Completed
              </div>
              <h2 className="text-[32px] font-black mb-2 leading-tight">Incredible Work! 🎉</h2>
              <p className="text-emerald-50 font-medium text-[16px] max-w-2xl">
                You have successfully completed all the steps for the <span className="font-bold text-white">{idea.title}</span> roadmap. You are now fully equipped to launch, grow, and scale your dream business.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
              <Link to="/dashboard" className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#059669] hover:bg-slate-50 font-extrabold py-4 px-8 rounded-[16px] transition-colors active:scale-95 shadow-lg text-[16px]">
                Explore New Ideas <FiArrowRight />
              </Link>
            </div>
          </div>
        )}
        
        {/* ==========================================
            TIMELINE NAVIGATION
            ========================================== */}
        <div className="mb-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1.5 bg-[#E2E8F0] -translate-y-1/2 rounded-full z-0"></div>
          <div 
            className="hidden md:block absolute top-1/2 left-0 h-1.5 bg-[#2563EB] -translate-y-1/2 rounded-full z-0 transition-all duration-700"
            style={{ width: `${(activeStageIndex / (idea.roadmap.length - 1)) * 100}%` }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-4 relative z-10">
            {idea.roadmap.map((stage, index) => {
              const isCompleted = index < activeStageIndex;
              const isActive = index === activeStageIndex;
              const isLocked = index > activeStageIndex;

              return (
                <div 
                  key={index}
                  onClick={() => setActiveStageIndex(index)}
                  className={`flex-1 cursor-pointer flex flex-row md:flex-col items-center gap-4 md:gap-3 p-4 md:p-0 rounded-[16px] md:bg-transparent transition-all ${
                    isActive ? 'bg-white shadow-sm md:shadow-none border border-[#E2E8F0] md:border-none transform scale-105 md:scale-100' : 'hover:bg-slate-50 md:hover:bg-transparent'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 bg-white shrink-0 transition-all duration-300 ${
                    isCompleted || isFullyCompleted ? 'border-[#10B981] text-[#10B981]' :
                    isActive ? 'border-[#2563EB] text-[#2563EB] shadow-[0_0_0_6px_rgba(37,99,235,0.1)]' :
                    'border-[#E2E8F0] text-[#94A3B8]'
                  }`}>
                    {(isCompleted || isFullyCompleted) && <FiCheckCircle size={24} className="fill-[#10B981] text-white" />}
                    {isActive && !isFullyCompleted && <span className="text-[18px] font-black">{index + 1}</span>}
                    {isLocked && !isFullyCompleted && <FiLock size={20} />}
                  </div>
                  
                  <div className="text-left md:text-center">
                    <h3 className={`text-[15px] font-bold ${isLocked && !isFullyCompleted ? 'text-[#94A3B8]' : 'text-[#0F172A]'}`}>
                      {stage.stageName}
                    </h3>
                    <p className={`text-[13px] font-medium ${
                      isCompleted || isFullyCompleted ? 'text-[#10B981]' :
                      isActive ? 'text-[#2563EB]' :
                      'text-[#94A3B8]'
                    }`}>
                      {isCompleted || isFullyCompleted ? 'Completed' : isActive ? 'In Progress' : 'Locked'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            MAIN CONTENT: TASKS & MENTOR
            ========================================== */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-[28px] font-extrabold text-[#0F172A] mb-2">Stage {activeStageIndex + 1}: {activeStage?.stageName}</h2>
              <p className="text-[16px] text-[#475569] font-medium">{activeStage?.description}</p>
            </div>

            <div className="space-y-4">
              {activeStage?.tasks.map((task, index) => {
                const taskKey = `${activeStageIndex}-${index}`;
                const isTaskCompleted = completedTasks[taskKey];

                return (
                  <div 
                    key={index} 
                    className={`bg-white border p-5 rounded-[24px] flex items-center gap-4 transition-all hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] ${
                      isTaskCompleted ? 'border-[#E2E8F0] bg-slate-50 opacity-80' : 'border-[#2563EB]'
                    }`}
                  >
                    <div 
                      className="shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                      onClick={() => toggleTask(activeStageIndex, index)}
                    >
                      {isTaskCompleted ? (
                        <FiCheckCircle size={28} className="text-[#10B981] fill-[#10B981]/10" />
                      ) : (
                        <FiCircle size={28} className="text-[#CBD5E1] hover:text-[#2563EB]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-[18px] font-bold mb-1 transition-colors ${
                        isTaskCompleted ? 'text-[#94A3B8] line-through' : 'text-[#0F172A]'
                      }`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[14px] font-medium text-[#64748B]">
                        <span className="flex items-center gap-1.5 bg-[#F1F5F9] px-2 py-0.5 rounded-[6px]">
                          {task.taskType === 'video' && <FiVideo className="text-[#2563EB]" />}
                          {task.taskType === 'reading' && <FiBookOpen className="text-[#2563EB]" />}
                          {task.taskType === 'interactive' && <FiPlayCircle className="text-[#2563EB]" />}
                          {task.taskType === 'action' && <FiCheckCircle className="text-[#2563EB]" />}
                          <span className="capitalize">{task.taskType}</span>
                        </span>
                        <span>•</span>
                        <span>{task.duration}</span>
                      </div>
                    </div>

                    {!isTaskCompleted && (
                     <Link 
  to="/learning" 
  state={{ task: task, ideaId: id, stageIdx: activeStageIndex, taskIdx: index }}
  className="hidden sm:flex items-center gap-2 bg-[#EFF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white px-5 py-2.5 rounded-[12px] font-bold transition-colors active:scale-95"
>
  Start <FiArrowRight />
</Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-[380px] space-y-6">
            
            <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-[#2563EB]"></div>
               
               <p className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider mb-4">Expert Help For This Stage</p>
               <h3 className="text-[20px] font-extrabold text-[#0F172A] mb-2 leading-snug">
                 Stuck on {activeStage?.stageName}?
               </h3>
               <p className="text-[14px] text-[#475569] font-medium mb-5 line-clamp-2">
                 Get a 1-on-1 session to clear your doubts and build a solid foundation for this step.
               </p>

               <div className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-[16px] mb-5 border border-[#E2E8F0]">
                  <img src="https://ui-avatars.com/api/?name=Aarti+Sharma&background=DBEAFE&color=2563EB&bold=true" alt="Mentor" className="w-14 h-14 rounded-[12px]" />
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0F172A] flex items-center gap-1">Aarti Sharma <FiStar className="fill-[#F59E0B] text-[#F59E0B]" size={14}/></h4>
                    <p className="text-[12px] font-bold text-[#64748B]">Industry Expert • 8 Yrs Exp</p>
                  </div>
               </div>

               <button className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3 rounded-[16px] flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md">
                 <FiCalendar size={18} /> Book Session (₹299)
               </button>
            </div>

            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-[24px] p-6">
              <h3 className="text-[18px] font-bold text-[#0F172A] mb-4">Stage Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/learning" className="flex items-center justify-between text-[#2563EB] font-medium hover:underline text-[14px]">
                    <span className="flex items-center gap-2"><FiBookOpen /> Action Plan Template</span>
                    <FiArrowRight />
                  </Link>
                </li>
                <li>
                  <Link to="/learning" className="flex items-center justify-between text-[#2563EB] font-medium hover:underline text-[14px]">
                    <span className="flex items-center gap-2"><FiBookOpen /> Essential Tools List</span>
                    <FiArrowRight />
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Roadmap;