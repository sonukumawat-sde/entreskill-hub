import React, { useState } from 'react';
import { FiSearch, FiMessageCircle, FiMail, FiBookOpen, FiChevronDown, FiAlertCircle } from 'react-icons/fi';

function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How does the Smart AI Matching work?", a: "Our proprietary algorithm analyzes your skills against our database to find the most relevant business roadmaps instantly, without relying on third-party APIs." },
    { q: "How do I book a Mentor session?", a: "Navigate to the Mentors tab on the sidebar. You can browse expert profiles and schedule a 1-on-1 video call directly through our integrated calendar." },
    { q: "I forgot my password, what do I do?", a: "You can click on 'Forgot Password' on the login screen, or update it directly from the Account Settings page if you are already logged in." },
    { q: "How are my skills stored?", a: "Your skills are securely stored in your personal profile. Our platform strictly adheres to data privacy standards and only uses this data for roadmap matching." }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in pb-20">
      
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
            placeholder="Search for articles, tutorials, or guides..." 
            className="w-full pl-16 pr-6 py-5 bg-white rounded-2xl shadow-xl outline-none text-lg font-bold text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Blocks */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-violet-300 transition-colors cursor-pointer group shadow-sm">
            <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FiMessageCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Live Chat</h3>
            <p className="text-slate-500 font-medium mb-6">Talk to our support team right now. We usually reply within 5 minutes.</p>
            <button className="text-violet-600 font-extrabold flex items-center gap-2 group-hover:text-violet-800">Start Chat &rarr;</button>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-blue-300 transition-colors cursor-pointer group shadow-sm">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FiMail size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
            <p className="text-slate-500 font-medium mb-6">Send us a detailed email. We'll get back to you within 24 hours.</p>
            <button className="text-blue-600 font-extrabold flex items-center gap-2 group-hover:text-blue-800">support@entreskill.com &rarr;</button>
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
              <FiBookOpen size={24} />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-[15px]">{faq.q}</span>
                  <FiChevronDown className={`text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-slate-100 rounded-2xl flex items-start gap-4">
            <FiAlertCircle className="text-slate-500 mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-slate-900">Didn't find what you're looking for?</h4>
              <p className="text-slate-600 text-sm mt-1">Check out our community forums or documentation for more advanced troubleshooting.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HelpCenter;