import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCode, FiPenTool, FiVideo, FiTrendingUp, FiBriefcase,
  FiDollarSign, FiClock, FiArrowRight, FiArrowLeft, FiCheckCircle
} from 'react-icons/fi';
import axios from 'axios';

function Onboarding() {
  const navigate = useNavigate();
  
  // Multi-step form ke liye state
  const [step, setStep] = useState(1);
  
  // User ka data jo hum backend bhejenge
  const [assessment, setAssessment] = useState({
    skills: [],
    budget: '',
    timeCommitment: ''
  });

  // Skills ke options
  const skillOptions = [
    { id: 'coding', label: 'Programming & Tech', icon: <FiCode size={24} /> },
    { id: 'design', label: 'UI/UX & Design', icon: <FiPenTool size={24} /> },
    { id: 'marketing', label: 'Digital Marketing', icon: <FiTrendingUp size={24} /> },
    { id: 'video', label: 'Video Editing', icon: <FiVideo size={24} /> },
    { id: 'business', label: 'Business Strategy', icon: <FiBriefcase size={24} /> },
  ];

  // Multiple skills select/deselect karne ka logic
  const toggleSkill = (skillId) => {
    if (assessment.skills.includes(skillId)) {
      setAssessment({ ...assessment, skills: assessment.skills.filter(id => id !== skillId) });
    } else {
      setAssessment({ ...assessment, skills: [...assessment.skills, skillId] });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. LocalStorage se apna VIP Pass (Token) nikaalo
      const token = localStorage.getItem('token');

      // 2. API ko batane ke liye ki hum logged-in hain, token ko header mein daalo
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      // 3. Backend par data bhejo!
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/onboarding', 
        assessment, // Yeh humari skills, budget aur time ki state hai
        config
      );

      console.log("Success! Backend se response aya:", data);

      // 4. Data save hone ke baad user ko Dashboard par bhej do
      navigate('/dashboard');

    } catch (error) {
      console.error("Onboarding save nahi ho payi:", error);
      alert("Kuch gadbad hui data save karne mein!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-violet-200 selection:text-violet-900">
      
      {/* Top Navbar for Onboarding */}
      <nav className="bg-white px-8 py-5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-violet-600 p-2 rounded-xl text-white">
            <FiBriefcase size={20} strokeWidth={2.5} />
          </div>
          <span className="text-slate-900 font-black text-xl tracking-tight">EnterSkill</span>
        </div>
        <div className="text-sm font-bold text-slate-500">
          Step {step} of 3
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1.5">
        <div 
          className="bg-violet-600 h-1.5 transition-all duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-2xl rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 animate-fade-in-up">
          
          {/* STEP 1: SKILLS */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">What are your super skills? 🦸‍♂️</h2>
              <p className="text-slate-500 font-medium mb-8">Select all the skills you have or want to learn. We'll use this to find your perfect business match.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillOptions.map((skill) => (
                  <div 
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 group active:scale-95 ${
                      assessment.skills.includes(skill.id) 
                      ? 'border-violet-600 bg-violet-50' 
                      : 'border-slate-200 hover:border-violet-300'
                    }`}
                  >
                    <div className={`p-3 rounded-xl transition-colors ${
                      assessment.skills.includes(skill.id) ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600'
                    }`}>
                      {skill.icon}
                    </div>
                    <span className={`font-bold ${assessment.skills.includes(skill.id) ? 'text-violet-900' : 'text-slate-700'}`}>
                      {skill.label}
                    </span>
                    {assessment.skills.includes(skill.id) && <FiCheckCircle className="ml-auto text-violet-600" size={20} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: BUDGET */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">What's your initial budget? 💰</h2>
              <p className="text-slate-500 font-medium mb-8">Don't worry, many successful businesses start with zero investment.</p>
              
              <div className="space-y-4">
                {['Zero (₹0)', 'Bootstrap (Under ₹5,000)', 'Small Investment (₹5,000 - ₹20,000)', 'Funded (₹20,000+)'].map((budgetOption) => (
                  <div 
                    key={budgetOption}
                    onClick={() => setAssessment({ ...assessment, budget: budgetOption })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 active:scale-95 ${
                      assessment.budget === budgetOption 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-slate-200 hover:border-green-200'
                    }`}
                  >
                    <div className={`p-3 rounded-full transition-colors ${
                      assessment.budget === budgetOption ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <FiDollarSign size={20} />
                    </div>
                    <span className={`font-bold text-lg ${assessment.budget === budgetOption ? 'text-green-900' : 'text-slate-700'}`}>
                      {budgetOption}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: TIME COMMITMENT */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">How much time can you give? ⏳</h2>
              <p className="text-slate-500 font-medium mb-8">Consistency matters more than hours. Pick a realistic schedule.</p>
              
              <div className="space-y-4">
                {['1-2 Hours Daily', 'Weekends Only', 'Half-Day (4-5 Hours)', 'Full Time (8+ Hours)'].map((timeOption) => (
                  <div 
                    key={timeOption}
                    onClick={() => setAssessment({ ...assessment, timeCommitment: timeOption })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 active:scale-95 ${
                      assessment.timeCommitment === timeOption 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-blue-200'
                    }`}
                  >
                    <div className={`p-3 rounded-full transition-colors ${
                      assessment.timeCommitment === timeOption ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <FiClock size={20} />
                    </div>
                    <span className={`font-bold text-lg ${assessment.timeCommitment === timeOption ? 'text-blue-900' : 'text-slate-700'}`}>
                      {timeOption}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons (Bottom) */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2 px-4 py-2 transition-colors"
              >
                <FiArrowLeft /> Back
              </button>
            ) : (
              <div></div> // Empty div to keep 'Next' button on the right
            )}

            {step < 3 ? (
              <button 
                onClick={nextStep}
                disabled={step === 1 ? assessment.skills.length === 0 : !assessment.budget}
                className="bg-slate-900 text-white hover:bg-violet-600 disabled:bg-slate-300 disabled:cursor-not-allowed px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                Next Step <FiArrowRight />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={!assessment.timeCommitment}
                className="bg-violet-600 text-white hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed px-8 py-3.5 rounded-xl font-black flex items-center gap-2 transition-all shadow-lg shadow-violet-200 active:scale-95"
              >
                Finish & Build Dashboard <FiCheckCircle />
              </button>
            )}
          </div>

        </div>
      </main>

    </div>
  );
}

export default Onboarding;