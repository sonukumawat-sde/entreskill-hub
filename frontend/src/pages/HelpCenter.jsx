import React, { useState } from 'react';
import { 
  FiSearch, FiMessageCircle, FiMail, FiBookOpen, 
  FiChevronDown, FiAlertCircle, FiShield, FiZap, FiPlay, FiX
} from 'react-icons/fi';

function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null); // NAYA: Screen par notification dikhane ke liye

  // Notification dikhane ka function
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000); // 3 second baad apne aap gayab
  };

  const allFaqs = [
    { q: "How does the Smart AI Matching work?", a: "Our proprietary algorithm analyzes your skills against our database to find the most relevant business roadmaps instantly, without relying on third-party APIs." },
    { q: "How do I book a Mentor session?", a: "Navigate to the Mentors tab on the sidebar. You can browse expert profiles and schedule a 1-on-1 video call directly through our integrated calendar." },
    { q: "I forgot my password, what do I do?", a: "You can click on 'Forgot Password' on the login screen, or update it directly from the Account Settings page if you are already logged in." },
    { q: "How are my skills stored?", a: "Your skills are securely stored in your personal profile. Our platform strictly adheres to data privacy standards and only uses this data for roadmap matching." },
    { q: "Can I cancel my Pro Plan?", a: "Yes, you can cancel or downgrade your Pro Plan at any time from the 'Billing' section in your Account Settings. Your access will remain until the end of your billing cycle." }
  ];

  // NAYA: Search bar ki value ke hisaab se FAQs ko filter karna
  const filteredFaqs = allFaqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in pb-20 relative">
      
      {/* 🔥 TOAST NOTIFICATION (Pop-up message) 🔥 */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 animate-fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <FiX size={18} />
          </button>
        </div>
      )}

      {/* Hero Search */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[32px] p-10 md:p-16 text-center shadow-lg shadow-violet-200 mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Hi, how can we help?</h1>
        <p className="text-violet-200 font-semibold mb-8 text-lg">Search our knowledge base or get in touch.</p>
        
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-600 transition-colors">
            <FiSearch size={24} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for answers (e.g., 'password', 'mentor')..." 
            className="w-full pl-16 pr-6 py-5 bg-white rounded-2xl shadow-xl outline-none text-lg font-bold text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: GUIDES & CONTACT */}
        <div className="lg:col-span-1 space-y-8">
          
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 px-2">Quick Guides</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: FiBookOpen, title: "Getting Started", color: "text-blue-600 bg-blue-100" },
                { icon: FiPlay, title: "Video Tutorials", color: "text-emerald-600 bg-emerald-100" },
                { icon: FiShield, title: "Account & Safety", color: "text-amber-600 bg-amber-100" }
              ].map((cat, i) => (
                <div 
                  key={i} 
                  onClick={() => showToast(`Opening ${cat.title} articles...`)}
                  className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                    <cat.icon size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900">{cat.title}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <div 
              onClick={() => showToast("Live Chat agents are currently busy. Please email us.")}
              className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-violet-300 transition-colors cursor-pointer group shadow-sm mb-6"
            >
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiMessageCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Live Chat</h3>
              <p className="text-slate-500 font-medium mb-6">Talk to our support team right now. We usually reply within 5 minutes.</p>
              <button className="text-violet-600 font-extrabold flex items-center gap-2 group-hover:text-violet-800 transition-colors">Start Chat &rarr;</button>
            </div>

            <div 
              // 🔥 NAYA: Click karne par direct device ka email app khulega 🔥
              onClick={() => window.location.href = 'mailto:support@entreskill.com?subject=Need%20Help%20with%20EntreSkill'}
              className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-blue-300 transition-colors cursor-pointer group shadow-sm"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiMail size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-500 font-medium mb-6">Send us a detailed email. We'll get back to you within 24 hours.</p>
              <button className="text-blue-600 font-extrabold flex items-center gap-2 group-hover:text-blue-800 transition-colors">support@entreskill.com &rarr;</button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQs */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[24px] p-6 md:p-8 shadow-sm h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
              <FiZap size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              {searchQuery && <p className="text-violet-600 font-bold text-sm mt-1">Showing results for "{searchQuery}"</p>}
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50 hover:border-violet-200 transition-colors">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-bold text-slate-800 text-[15px]">{faq.q}</span>
                    <FiChevronDown className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
                  </button>
                  {openFaq === i && (
                    <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-slate-100 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-bold">No FAQs found for "{searchQuery}".</p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="text-violet-600 font-bold mt-2 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 p-6 bg-slate-100 rounded-2xl flex items-start gap-4 border border-slate-200">
            <FiAlertCircle className="text-slate-500 mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-slate-900">Didn't find what you're looking for?</h4>
              <p className="text-slate-600 text-sm mt-1">Check out our community forums or reach out to our support team directly using the contact options on the left.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HelpCenter;