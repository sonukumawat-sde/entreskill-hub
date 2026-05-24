import React, { useState, useEffect } from 'react';
import { 
  FiBriefcase, FiZap, FiStar, FiShare2, FiBookmark, 
  FiTrendingUp, FiTarget, FiClock, FiCheckCircle,
  FiSearch, FiFilter, FiX
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Dashboard() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [activeTab, setActiveTab] = useState('recommended');
  const [isLoading, setIsLoading] = useState(true);
  const [ideas, setIdeas] = useState([]);

  // REAL DATABASE STATE FOR BOOKMARKS
  const [bookmarkedIdeas, setBookmarkedIdeas] = useState([]);

  // 👇 TOP LEVEL FEATURES STATE: Search, Filter, & Toast Notification
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        let currentSkills = user?.skills || [];

        // 1. Silent Profile Update 
        try {
          const { data: profileData } = await axios.get('https://entreskill-hub-9r2j.onrender.com/api/auth/profile', config);
          setUser(profileData);
          localStorage.setItem('userInfo', JSON.stringify(profileData));
          currentSkills = profileData.skills || [];
        } catch (profileError) {
          console.log("Silent profile fetch issue, using local data", profileError);
        }

        // 2. Fetch AI Recommendations (UPDATED TO NEW AI ROUTE)
        let fetchedIdeas = [];
        if (currentSkills && currentSkills.length > 0) {
          const { data } = await axios.post(
            'https://entreskill-hub-9r2j.onrender.com/api/ai/match', // 🔥 AI ROUTE
            { 
              skills: currentSkills, 
              investmentLevel: user?.investmentLevel || 'Any' // Passing data to Gemini
            }, 
            config
          );
          fetchedIdeas = data.recommendations;
        } else {
          const { data } = await axios.get('https://entreskill-hub-9r2j.onrender.com/api/recommendations/all', config);
          fetchedIdeas = data.ideas;
        }

        setIdeas(fetchedIdeas);

        // 3. Fetch Real Bookmarks from Database
        try {
          const { data: bookmarkData } = await axios.get('https://entreskill-hub-9r2j.onrender.com/api/bookmarks', config);
          if (bookmarkData.success) {
            setBookmarkedIdeas(bookmarkData.bookmarkedIdeas);
          }
        } catch (bookmarkError) {
          console.error("Failed to fetch bookmarks", bookmarkError);
        }

      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Show Toast Function
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000); 
  };

  // REAL API BOOKMARK TOGGLE LOGIC
  const toggleBookmark = async (idea) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const isAlreadySaved = bookmarkedIdeas.some((item) => String(item._id) === String(idea._id));

      // Optimistic UI Update & Toast Trigger
      if (isAlreadySaved) {
        setBookmarkedIdeas((prev) => prev.filter((item) => String(item._id) !== String(idea._id)));
        showToast('Idea removed from your bookmarks.', 'remove');
      } else {
        setBookmarkedIdeas((prev) => [...prev, idea]);
        showToast('Awesome! Idea saved to your profile 🚀', 'success');
      }

      // Background API Call
      await axios.post('https://entreskill-hub-9r2j.onrender.com/api/bookmarks/toggle', { idea }, config);
      
    } catch (error) {
      console.error("Error toggling bookmark API:", error);
      showToast('Something went wrong. Try again.', 'error');
    }
  };

  // 👇 TOP LEVEL LOGIC: Filter Ideas based on Search and Category
  const uniqueCategories = ["All", ...new Set(ideas.map(idea => idea.category))];
  
  const displayedIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || idea.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user) return <div className="p-8 text-center font-bold text-slate-500">Loading your profile...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full font-sans selection:bg-violet-200 selection:text-violet-900 relative">
      
      {/* 👇 TOP LEVEL FEATURE: Floating Animated Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-10 right-10 z-50 animate-fade-in-up">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 backdrop-blur-md border ${
            toast.type === 'success' ? 'bg-green-500/90 text-white border-green-400' : 
            toast.type === 'remove' ? 'bg-slate-800/90 text-white border-slate-700' : 
            'bg-red-500/90 text-white border-red-400'
          }`}>
            {toast.type === 'success' ? <FiCheckCircle size={20}/> : <FiBookmark size={20}/>}
            {toast.message}
          </div>
        </div>
      )}

      {/* WELCOME SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 animate-fade-in-up">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, {user.name ? user.name.split(' ')[0] : 'Champ'}! 
            <span className="inline-flex items-center justify-center bg-orange-100 text-orange-600 px-2 py-0.5 rounded-lg text-sm font-bold border border-orange-200">
              🔥 3 Day Streak
            </span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-lg">Your next big business is waiting. Let's build it.</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 w-full md:w-auto hover:border-violet-300 transition-colors cursor-pointer group active:scale-95">
          <div className="bg-violet-100 p-3 rounded-full text-violet-600 group-hover:scale-110 transition-transform">
            <FiTarget size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Daily Goal</p>
            <p className="text-sm font-bold text-slate-900">Complete Roadmap Stage 2</p>
          </div>
          <FiCheckCircle className="text-slate-300 ml-4 group-hover:text-green-500 transition-colors" size={24} />
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:-translate-y-1 hover:shadow-lg hover:border-violet-200 transition-all cursor-pointer">
          <div>
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Curated Matches</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-extrabold text-slate-900">{isLoading ? '-' : ideas.length}</h3>
              <span className="text-sm font-bold text-green-500 flex items-center"><FiTrendingUp /> +{ideas.length} Today</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-2xl text-green-600 border border-green-100">
            <FiStar size={26} className="fill-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:-translate-y-1 hover:shadow-lg hover:border-violet-200 transition-all cursor-pointer">
          <div>
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Mentor Credits</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-extrabold text-slate-900">02</h3>
              <span className="text-sm font-bold text-slate-500">Sessions Left</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-violet-100 to-violet-50 p-4 rounded-2xl text-violet-600 border border-violet-100">
            <FiZap size={26} className="fill-violet-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl group-hover:bg-violet-500/40 transition-all duration-500"></div>
          <div className="relative z-10 flex justify-between items-start">
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Your Skill Profile</p>
            <div className="bg-white/10 p-2 rounded-xl text-white backdrop-blur-sm border border-white/10">
              <FiBriefcase size={20} />
            </div>
          </div>
          <div className="relative z-10 mt-4">
            <h3 className="text-2xl font-extrabold text-white">
              {user.skills && user.skills.length > 0 ? user.skills[0].toUpperCase() + " Pro" : "Beginner"}
            </h3>
            <Link to="/profile" className="text-sm font-semibold text-violet-300 hover:text-violet-200 mt-1 inline-block transition-colors">
              View Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h3 className="text-2xl font-extrabold text-slate-900">AI Business Recommendations</h3>
        
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('recommended')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${activeTab === 'recommended' ? 'bg-white text-violet-700 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Highest Match
          </button>
          <button 
            onClick={() => setActiveTab('trending')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${activeTab === 'trending' ? 'bg-white text-violet-700 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Trending Near You
          </button>
        </div>
      </div>

      {/* 👇 TOP LEVEL FEATURE: Smart Search & Categories Filter */}
      {!isLoading && ideas.length > 0 && (
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between animate-fade-in-up" style={{ animationDelay: '250ms' }}>
          
          <div className="relative w-full lg:w-1/3">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search ideas..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
            <FiFilter className="text-slate-400 mr-2 hidden lg:block" size={18} />
            {uniqueCategories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-violet-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      )}

      {/* BUSINESS IDEAS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // SKELETON LOADING
          [1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col h-full relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="h-6 w-24 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="h-6 w-28 bg-slate-100 rounded-full animate-pulse border border-slate-200"></div>
              </div>
              <div className="h-8 w-3/4 bg-slate-200 rounded-xl mb-4 animate-pulse"></div>
              <div className="space-y-3 mb-8">
                <div className="h-3 w-full bg-slate-100 rounded-md animate-pulse"></div>
                <div className="h-3 w-5/6 bg-slate-100 rounded-md animate-pulse"></div>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-50 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                   <div className="h-8 w-24 bg-slate-100 rounded-lg animate-pulse"></div>
                   <div className="h-8 w-24 bg-slate-100 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex gap-3">
                  <div className="h-12 w-12 bg-slate-200 rounded-xl animate-pulse shrink-0"></div>
                  <div className="h-12 flex-1 bg-slate-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          ))
        ) : displayedIdeas.length === 0 ? (
          // NO IDEAS FOUND (Enhanced Empty State)
           <div className="col-span-3 text-center py-16 bg-white rounded-[2rem] border border-dashed border-slate-300">
             <div className="bg-slate-50 text-slate-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
               <FiSearch size={32} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">No matches found</h3>
             <p className="text-slate-500 font-medium">Try searching with a different keyword or clear your filters.</p>
             <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-6 px-6 py-3 bg-violet-100 text-violet-700 font-bold rounded-xl hover:bg-violet-200 transition-colors"
              >
                Clear Filters
             </button>
           </div>
        ) : (
          // REAL DATA RENDER 🚀
          displayedIdeas.map((idea) => {
            
            // Check if this specific idea is bookmarked
            const isSaved = bookmarkedIdeas.some((item) => String(item._id) === String(idea._id));

            return (
              <div key={idea._id} className="bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full relative overflow-hidden animate-fade-in-up">
                
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex justify-between items-start mb-6">
                  <span className="bg-slate-50 text-slate-700 text-xs font-extrabold px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-wider group-hover:bg-violet-50 group-hover:text-violet-700 transition-colors">
                    {idea.category}
                  </span>
                  
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     <span className="text-xs font-bold text-green-700">95% Match</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-violet-700 transition-colors leading-tight">
                  {idea.title}
                </h3>
                <p className="text-slate-500 mb-5 flex-grow leading-relaxed text-[15px] font-medium">
                  {idea.description}
                </p>
                
                {/* 🔥 NEW FEATURE: AI Reasoning Box */}
                {idea.aiReasoning && (
                  <div className="bg-violet-50/50 border border-violet-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <div className="bg-violet-200 text-violet-700 p-2 rounded-lg shrink-0 mt-0.5">
                      <FiZap size={16} className="fill-violet-700" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-violet-800 uppercase tracking-wider mb-1">AI Match Reason</p>
                      <p className="text-sm font-medium text-violet-900 leading-snug">{idea.aiReasoning}</p>
                    </div>
                  </div>
                )}
                {/* --------------------------------- */}

                <div className="mt-auto">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {idea.requiredSkills.map((skill, index) => (
                        <span key={index} className="bg-slate-50 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-200 capitalize">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm">
                       <div className="flex flex-col">
                          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Initial Investment</span>
                          <span className="font-extrabold text-slate-900">{idea.estimatedCost}</span>
                       </div>
                       <div className="flex flex-col text-right">
                          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Market Demand</span>
                          <span className="font-extrabold text-blue-600 flex items-center justify-end gap-1"><FiTrendingUp size={14}/> {idea.demand}</span>
                       </div>
                    </div>

                    <div className="flex gap-3 relative z-10">
                      {/* Dynamic Bookmark Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault(); // Prevents accidental link clicks if nested
                          toggleBookmark(idea);
                        }}
                        className={`p-3 rounded-xl border transition-all active:scale-95 ${
                          isSaved 
                            ? 'bg-violet-50 border-violet-300 text-violet-600 shadow-inner' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200 hover:border-violet-300'
                        }`}
                      >
                        <FiBookmark size={20} className={isSaved ? "fill-violet-600" : ""} />
                      </button>
                      
                      <Link 
                        to={`/roadmap/${idea._id}`} 
                        className="flex-1 bg-slate-900 text-white hover:bg-violet-600 px-4 py-3 rounded-xl text-sm font-bold transition-colors shadow-md flex items-center justify-center gap-2 active:scale-95"
                      >
                        Build Roadmap →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

export default Dashboard;