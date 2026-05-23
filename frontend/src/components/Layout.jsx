import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
// NAYA: FiLogOut ko import kiya hai
import { FiHome, FiCompass, FiUsers, FiAward, FiSearch, FiBell, FiSettings, FiHelpCircle, FiChevronRight, FiZap, FiLogOut } from 'react-icons/fi';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate(); // NAYA: Redirect karne ke liye

  // NAYA: LocalStorage se logged-in user ka data nikaal rahe hain (Dynamic Profile ke liye)
  const userInfoString = localStorage.getItem('userInfo');
  const user = userInfoString ? JSON.parse(userInfoString) : { name: 'Sonu Kumawat' };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome size={22} /> },
    { path: '/roadmap', name: 'My Roadmap', icon: <FiCompass size={22} /> },
    { path: '/mentors', name: 'Mentors', icon: <FiUsers size={22} /> },
    { path: '/profile', name: 'Profile', icon: <FiAward size={22} /> },
  ];

  // NAYA: Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-violet-200 selection:text-violet-900">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="w-[260px] bg-white border-r border-slate-200 hidden md:flex flex-col h-full z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-2.5 rounded-xl text-white transform group-hover:scale-105 transition-all shadow-lg shadow-violet-200">
              <FiZap size={22} className="fill-white/20" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              EntreSkill<span className="text-violet-600">.</span>
            </h1>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group active:scale-95 ${
                  isActive 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-200/50' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-[15px]">{item.name}</span>
                </div>
                {isActive && <FiChevronRight size={18} className="opacity-80" />}
              </Link>
            );
          })}
          
          <div className="my-4 border-t border-slate-100 mx-2"></div>
          
          <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all">
            <FiSettings size={20} /> Settings
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all">
            <FiHelpCircle size={20} /> Help Center
          </Link>

          {/* 👇 NAYA: DESKTOP LOGOUT BUTTON 👇 */}
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 hover:text-red-700 transition-all active:scale-95"
          >
            <FiLogOut size={20} /> Logout
          </button>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 m-2 rounded-2xl mb-4 group cursor-pointer hover:border-violet-200 transition-colors">
          <Link to="/profile" className="flex items-center gap-3">
            {/* NAYA: Dynamic Avatar generation based on User Name */}
            <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=ede9fe&color=6d28d9&bold=true`} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            <div className="flex-1 min-w-0">
              {/* NAYA: Dynamic Name Injection */}
              <p className="text-sm font-extrabold text-slate-900 truncate group-hover:text-violet-700 transition-colors">{user.name}</p>
              <p className="text-xs font-bold text-violet-600 truncate">Top 1% Developer</p>
            </div>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-20 sticky top-0">
          <div className="md:hidden flex items-center gap-2">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white">
              <FiZap size={18} />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">EntreSkill</h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-600 transition-colors">
                <FiSearch size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search ideas, mentors, or skills..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border-transparent focus:bg-white rounded-2xl border-2 focus:border-violet-500 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] outline-none transition-all text-[15px] font-semibold text-slate-800 placeholder:text-slate-400"
              />
              <button className="absolute inset-y-0 right-1.5 my-1.5 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors shadow-sm active:scale-95">
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-600 rounded-full transition-colors active:scale-95">
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* NAYA: Mobile Profile & Logout Button Area */}
            <div className="md:hidden flex items-center gap-3">
                <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=ede9fe&color=6d28d9&bold=true`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-200" />
                <button onClick={handleLogout} className="p-2.5 bg-red-50 text-red-600 rounded-full active:scale-95">
                   <FiLogOut size={18} />
                </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 md:pb-0 scroll-smooth">
          <Outlet /> 
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around items-center px-2 py-2 z-50 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-[70px] h-14 rounded-xl transition-all relative ${
                isActive ? 'text-violet-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-violet-600 rounded-b-full -mt-2"></div>
              )}
              <div className={`flex items-center justify-center w-8 h-8 transition-all ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[11px] mt-0.5 ${isActive ? 'font-extrabold' : 'font-semibold'}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
    </div>
  );
}

export default Layout;