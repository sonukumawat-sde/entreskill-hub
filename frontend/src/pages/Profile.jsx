import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // NAYA: API call ke liye axios add kiya
import { 
  FiUser, FiMail, FiBookmark, FiSettings, 
  FiLogOut, FiArrowRight, FiEdit2, FiShield,
  FiActivity, FiStar, FiTrendingUp, FiVideo, 
  FiCalendar, FiClock, FiAward, FiCheckCircle, FiBell, FiZap
} from 'react-icons/fi';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [savedIdeas, setSavedIdeas] = useState([]);

  useEffect(() => {
    // NAYA: Async function banaya taaki API call kar sakein
    const fetchProfileData = async () => {
      // 1. Fetch User Data
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      } else {
        // Premium Fallback Data (Using your real name for authentic feel)
        setUser({
          name: "Sonu Kumawat",
          email: "sonu@entreskill.com",
          skills: ["Coding", "System Design", "UI/UX"]
        });
      }

      // 2. Fetch Bookmarked Ideas from Backend (MongoDB)
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const { data } = await axios.get('http://localhost:5000/api/bookmarks', config);
          
          if (data.success) {
            setSavedIdeas(data.bookmarkedIdeas);
          }
        } catch (error) {
          console.error("Error fetching bookmarks from DB:", error);
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!user) return null;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0F172A&color=fff&bold=true&size=128`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 selection:bg-blue-100 font-sans">
      
      {/* ==========================================
          1. ENTERPRISE HEADER BANNER
          ========================================== */}
      <div className="h-[240px] w-full relative overflow-hidden bg-[#0F172A]">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-blue-500 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-100px] left-[20%] w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* ==========================================
            2. LEFT SIDEBAR (Identity & Navigation)
            ========================================== */}
        <div className="w-full lg:w-[340px] shrink-0 space-y-6">
          
          {/* Main User Card */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-xl text-center relative">
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
              <FiStar className="fill-white" size={10} /> PRO PLAN
            </div>

            <div className="relative inline-block mb-4 mt-2">
              <img src={avatarUrl} alt="User Avatar" className="w-28 h-28 rounded-[28px] border-4 border-white shadow-lg object-cover bg-white" />
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-[#0F172A] transition-all shadow-md border-2 border-white transform active:scale-95">
                <FiEdit2 size={16} />
              </button>
            </div>
            
            <h2 className="text-[24px] font-black text-[#0F172A] mb-1">{user.name}</h2>
            <p className="text-[14px] font-medium text-slate-500 flex items-center justify-center gap-1.5 mb-6">
              <FiMail /> {user.email}
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-6 border-t border-slate-100">
              {user.skills && user.skills.map((skill, index) => (
                <span key={index} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-lg p-3 space-y-1">
            {[
              { id: 'overview', icon: FiActivity, label: 'Dashboard Overview' },
              { id: 'saved', icon: FiBookmark, label: 'Saved Business Ideas', badge: savedIdeas.length },
              { id: 'sessions', icon: FiVideo, label: 'Mentor Sessions', badge: '1' },
              { id: 'settings', icon: FiSettings, label: 'Account Settings' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-[20px] text-[15px] font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#0F172A] text-white shadow-md transform scale-[1.02]' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-[#0F172A]'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'text-blue-400' : ''} /> 
                {item.label}
                {item.badge && (
                  <span className={`ml-auto px-2.5 py-1 rounded-full text-[11px] font-black ${
                    activeTab === item.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="my-2 border-t border-slate-100 mx-2"></div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-[20px] text-[15px] font-bold text-red-500 hover:bg-red-50 transition-all"
            >
              <FiLogOut size={20} /> Log Out securely
            </button>
          </div>

        </div>

        {/* ==========================================
            3. RIGHT CONTENT AREA (Dynamic Tabs)
            ========================================== */}
        <div className="flex-1 mt-6 lg:mt-0 pb-10">
          
          {/* TAB 1: OVERVIEW (ANALYTICS & GAMIFICATION) */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in space-y-8">
              
              {/* Analytics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                  <div className="absolute right-[-20px] top-[-20px] opacity-5 group-hover:opacity-10 transition-opacity"><FiTrendingUp size={120}/></div>
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    <FiCheckCircle size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Tasks Done</p>
                    <h3 className="text-3xl font-black text-[#0F172A]">24</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                  <div className="absolute right-[-20px] top-[-20px] opacity-5 group-hover:opacity-10 transition-opacity"><FiClock size={120}/></div>
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                    <FiClock size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Hours Learnt</p>
                    <h3 className="text-3xl font-black text-[#0F172A]">12<span className="text-xl text-slate-400">h</span></h3>
                  </div>
                </div>

                <div className="bg-[#0F172A] p-6 rounded-[32px] shadow-xl flex items-center gap-5 relative overflow-hidden group transform hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="absolute right-[-10px] bottom-[-20px] opacity-20"><FiZap size={100} className="text-amber-400"/></div>
                  <div className="w-14 h-14 bg-white/10 text-amber-400 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/20">
                    <FiZap size={28} className="fill-amber-400" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-1">Current Streak</p>
                    <h3 className="text-3xl font-black text-white">5 <span className="text-xl font-bold text-blue-200">Days</span></h3>
                  </div>
                </div>
              </div>

              {/* Achievements & Badges */}
              <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[22px] font-black text-[#0F172A]">Your Achievements</h3>
                  <Link to="/learning" className="text-sm font-bold text-blue-600 hover:text-blue-800">View All</Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "First Step", desc: "Started a roadmap", icon: FiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { title: "Fast Learner", desc: "5 tasks in a day", icon: FiZap, color: "text-amber-500", bg: "bg-amber-50" },
                    { title: "Networker", desc: "Booked a mentor", icon: FiUser, color: "text-blue-500", bg: "bg-blue-50" },
                    { title: "Top 10%", desc: "Platform ranking", icon: FiAward, color: "text-indigo-500", bg: "bg-indigo-50" },
                  ].map((badge, idx) => (
                    <div key={idx} className="text-center p-5 rounded-[24px] border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${badge.bg} ${badge.color} mb-4 shadow-sm`}>
                        <badge.icon size={28} />
                      </div>
                      <h4 className="font-black text-[#0F172A] text-[15px]">{badge.title}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1">{badge.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SAVED IDEAS (GRID) */}
          {activeTab === 'saved' && (
            <div className="animate-fade-in">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[28px] font-black text-[#0F172A]">Bookmarked Ideas</h3>
              </div>

              {savedIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedIdeas.map((idea) => (
                    <div key={idea._id} className="bg-white border border-slate-200 rounded-[32px] p-8 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all group relative flex flex-col justify-between">
                      <div>
                        <div className="absolute top-8 right-8 text-blue-600 bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
                          <FiBookmark size={18} className="fill-current" />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-6">
                          <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border border-slate-200">
                            {idea.category}
                          </span>
                        </div>

                        <h4 className="text-[22px] font-black text-[#0F172A] mb-3 leading-tight group-hover:text-blue-600 transition-colors pr-10">
                          {idea.title}
                        </h4>
                        <p className="text-[15px] text-slate-500 font-medium mb-8 line-clamp-2 leading-relaxed">
                          {idea.description}
                        </p>
                      </div>

                      <Link 
                        to={`/roadmap/${idea._id}`}
                        className="inline-flex w-full items-center justify-center gap-2 bg-[#0F172A] hover:bg-blue-600 text-white px-6 py-4 rounded-[20px] font-black text-[15px] transition-all active:scale-95 shadow-md"
                      >
                        Resume Roadmap <FiArrowRight />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[40px] p-16 text-center">
                  <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiBookmark size={40} />
                  </div>
                  <h4 className="text-[24px] font-black text-[#0F172A] mb-3">No saved ideas yet</h4>
                  <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto text-[16px]">
                    Explore the dashboard and bookmark business ideas that catch your eye. They will appear right here.
                  </p>
                  <Link to="/dashboard" className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black transition-transform active:scale-95 shadow-lg">
                    Explore Dashboard <FiArrowRight />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MENTOR SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="animate-fade-in space-y-6">
              <h3 className="text-[28px] font-black text-[#0F172A] mb-2">Upcoming Sessions</h3>
              
              {/* Premium Session Card */}
              <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img src="https://ui-avatars.com/api/?name=Aarti+Sharma&background=DBEAFE&color=2563EB&bold=true" alt="Mentor" className="w-20 h-20 rounded-[24px] shadow-sm"/>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <FiVideo size={10} className="text-white"/>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[20px] font-black text-[#0F172A]">Aarti Sharma</h4>
                    <p className="text-[14px] font-bold text-slate-500 mb-3">Retail Strategy & Pricing Expert</p>
                    <div className="flex items-center gap-4 text-sm font-bold text-[#0F172A]">
                      <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg"><FiCalendar className="text-blue-500"/> Tomorrow, 10:00 AM</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-3">
                  <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-[16px] font-black transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                    <FiVideo /> Join Video Call
                  </button>
                  <button className="w-full md:w-auto bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-8 py-3.5 rounded-[16px] font-black transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="animate-fade-in bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm">
              <h3 className="text-[28px] font-black text-[#0F172A] mb-8">Account Settings</h3>
              
              <div className="space-y-10">
                {/* Personal Info */}
                <div>
                  <h4 className="text-[14px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiUser/> Personal Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input type="text" defaultValue={user.name} className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-bold text-[#0F172A] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                      <input type="email" defaultValue={user.email} disabled className="w-full bg-slate-100 border border-slate-200 px-5 py-4 rounded-[16px] font-bold text-slate-400 cursor-not-allowed" />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="pt-8 border-t border-slate-100">
                  <h4 className="text-[14px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiBell/> Notifications</h4>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer p-4 border border-slate-100 rounded-[16px] hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-bold text-[#0F172A]">Email Reminders</p>
                        <p className="text-sm font-medium text-slate-500">Get notified about upcoming mentor sessions.</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Security */}
                <div className="pt-8 border-t border-slate-100">
                  <h4 className="text-[14px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><FiShield/> Security</h4>
                  <button className="flex items-center gap-2 text-[#0F172A] border border-slate-200 bg-white hover:bg-slate-50 font-black px-6 py-4 rounded-[16px] transition-colors">
                    Change Password
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                  <button className="px-6 py-4 rounded-[16px] font-black text-slate-500 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-[16px] font-black hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default Profile;