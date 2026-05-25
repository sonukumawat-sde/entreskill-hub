import React from 'react';
import { FiUser, FiBell, FiShield, FiLock } from 'react-icons/fi';

function Settings() {
  const userInfoString = localStorage.getItem('userInfo');
  const user = userInfoString ? JSON.parse(userInfoString) : { name: 'Sonu Kumawat', email: 'sonu@entreskill.com' };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-20">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-semibold mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="space-y-10">
        
        {/* Profile Card */}
        <section className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&size=128&background=ede9fe&color=6d28d9&bold=true`} className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm" alt="Avatar"/>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Avatar</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">This is your avatar. Click on the button to upload a custom one.</p>
              </div>
            </div>
            <button className="hidden md:block px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Upload</button>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                <input type="text" defaultValue={user.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input type="email" defaultValue={user.email} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-400 cursor-not-allowed" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95">Save Profile</button>
          </div>
        </section>

        {/* Security & Password */}
        <section className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><FiShield className="text-violet-600"/> Security</h3>
            <p className="text-sm text-slate-500 font-medium mt-1 mb-6">Ensure your account is using a long, random password to stay secure.</p>
            
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none" />
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md">Update Password</button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Settings;