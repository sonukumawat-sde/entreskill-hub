import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiSearch, FiMessageCircle, FiMail, FiBookOpen, 
  FiChevronDown, FiAlertCircle, FiShield, FiZap, 
  FiPlay, FiX, FiCheckCircle
} from 'react-icons/fi';

function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real Backend Form States
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const userInfoString = localStorage.getItem('userInfo');
  const user = userInfoString ? JSON.parse(userInfoString) : null;

  // 🔥 THE REAL STARTUP WAY: Tawk.to Live Chat Integration 🔥
  // Yeh script automatically page load par real chat widget inject karegi
  useEffect(() => {
    const tawkScript = document.createElement("script");
    tawkScript.async = true;
    // NOTE: Yeh ek demo property ID hai. Tumhe tawk.to par account bana kar apni ID dalni hogi baad mein.
    tawkScript.src = 'https://embed.tawk.to/65d8a9b28d261e1b5f644a83/1hnal23ab'; 
    tawkScript.charset = 'UTF-8';
    tawkScript.setAttribute('crossorigin', '*');
    
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(tawkScript, firstScript);

    // Cleanup: Jab user is page se jayega toh chat hide ho jayegi
    return () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || '', email: user.email || '', message: '' });
    }
  }, []);

  const allFaqs = [
    { q: "How does the Smart AI Matching work?", a: "Our proprietary algorithm analyzes your skills against our database to find the most relevant business roadmaps instantly." },
    { q: "How do I book a Mentor session?", a: "Navigate to the Mentors tab on the sidebar. You can browse expert profiles and schedule a 1-on-1 video call directly." },
    { q: "I forgot my password, what do I do?", a: "You can click on 'Forgot Password' on the login screen, or update it directly from the Account Settings page." },
    { q: "How are my skills stored?", a: "Your skills are securely stored in your personal profile adhering to strict data privacy standards." }
  ];

  const filteredFaqs = allFaqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔥 THE REAL STARTUP WAY: Own Backend API Call 🔥
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Yeh request seedha tumhare Node.js backend par jayegi (Jo hum next banayenge)
      const config = { headers: { 'Content-Type': 'application/json' } };
      
      // Render/Localhost backend URL
      await axios.post('https://entreskill-hub-9r2j.onrender.com/api/support/contact', formData, config);
      
      setSubmitStatus('success');
      setFormData({ ...formData, message: '' }); // Clear message
      setTimeout(() => setShowContactModal(false), 3000); // Close modal after 3 sec
      
    } catch (error) {
      console.error("Support API Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in pb-20 relative">
      
      {/* ==========================================================
          🔥 REAL NODE.JS EMAIL CONTACT MODAL 🔥
          ========================================================== */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden relative">
            <button onClick={() => setShowContactModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full transition-colors">
              <FiX size={20} />
            </button>
            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Create a Ticket</h2>
              <p className="text-slate-500 font-medium mb-8">Send us your query and our team will investigate it.</p>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                  <FiCheckCircle className="text-emerald-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-emerald-800 font-bold">Ticket Submitted!</h4>
                    <p className="text-emerald-600 text-sm mt-1">We've received your message and will email you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <FiAlertCircle className="text-red-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-red-800 font-bold">Submission Failed</h4>
                    <p className="text-red-600 text-sm mt-1">Our servers are busy. Please try again later.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-semibold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-semibold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">How can we help?</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required placeholder="Describe your issue..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-semibold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-violet-200 active:scale-95 flex justify-center items-center gap-2">
                  {isSubmitting ? 'Submitting Ticket...' : 'Submit Ticket'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          HELP CENTER UI
          ========================================================== */}
      
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
        
        {/* LEFT COLUMN: CONTACT ACTIONS */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 px-2">Quick Guides</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: FiBookOpen, title: "Getting Started", color: "text-blue-600 bg-blue-100" },
                { icon: FiPlay, title: "Video Tutorials", color: "text-emerald-600 bg-emerald-100" },
                { icon: FiShield, title: "Account & Safety", color: "text-amber-600 bg-amber-100" }
              ].map((cat, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                    <cat.icon size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900">{cat.title}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8">
            {/* Open Native Live Chat */}
            <div 
              onClick={() => {
                if (window.Tawk_API) window.Tawk_API.toggle();
              }}
              className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-violet-300 transition-colors cursor-pointer group shadow-sm mb-6 relative overflow-hidden"
            >
              <div className="absolute right-[-20px] top-[-20px] opacity-5"><FiMessageCircle size={120}/></div>
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                <FiMessageCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Live Chat</h3>
              <p className="text-slate-500 font-medium mb-6 relative z-10">Talk to our real support agents right now. Fast responses.</p>
              <button className="text-violet-600 font-extrabold flex items-center gap-2 group-hover:text-violet-800 transition-colors relative z-10">Open Chat &rarr;</button>
            </div>

            {/* Open Real Backend Form */}
            <div 
              onClick={() => setShowContactModal(true)}
              className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-blue-300 transition-colors cursor-pointer group shadow-sm relative overflow-hidden"
            >
               <div className="absolute right-[-20px] top-[-20px] opacity-5"><FiMail size={120}/></div>
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                <FiMail size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Create Ticket</h3>
              <p className="text-slate-500 font-medium mb-6 relative z-10">Submit a formal request directly to our backend engineering team.</p>
              <button className="text-blue-600 font-extrabold flex items-center gap-2 group-hover:text-blue-800 transition-colors relative z-10">Submit Ticket &rarr;</button>
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
                <button onClick={() => setSearchQuery('')} className="text-violet-600 font-bold mt-2 hover:underline">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HelpCenter;