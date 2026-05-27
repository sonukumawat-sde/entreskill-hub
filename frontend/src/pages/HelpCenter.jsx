import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  FiSearch, FiMessageCircle, FiMail, FiBookOpen, 
  FiChevronDown, FiAlertCircle, FiShield, FiZap, 
  FiPlay, FiX, FiCheckCircle, FiSend, FiMinimize2
} from 'react-icons/fi';

function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Email Form States
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // AI Chatbot States
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! I am the EntreSkill AI Assistant. Ask me any coding doubt or platform question!' }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isBotTyping]);

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const user = JSON.parse(userInfoString);
      setFormData({ name: user.name || '', email: user.email || '', message: '' });
    }
  }, []); 

  const allFaqs = [
    { q: "How does the Smart AI Matching work?", a: "Our algorithm analyzes your skills against our database to find relevant business roadmaps instantly." },
    { q: "How do I book a Mentor session?", a: "Navigate to the Mentors tab on the sidebar. You can browse expert profiles and schedule a call directly." },
    { q: "I forgot my password, what do I do?", a: "You can click on 'Forgot Password' on the login screen, or update it directly from the Account Settings page." }
  ];

  const filteredFaqs = allFaqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔥 100% REAL BACKEND CONNECTION (Fixed Route: /api/support/contact) 🔥
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Hitting the real, working backend endpoint exactly as defined in your routes
      await axios.post('https://entreskill-hub-9r2j.onrender.com/api/support/contact', formData);
      
      setSubmitStatus('success');
      setFormData({ ...formData, message: '' });
      setTimeout(() => setShowContactModal(false), 3000);
    } catch (error) {
      console.error("Support API Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsBotTyping(true);

    try {
      const response = await axios.post('https://entreskill-hub-9r2j.onrender.com/api/chatbot/ask', {
        message: userText,
        history: chatMessages 
      });
      
      setChatMessages(prev => [...prev, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setChatMessages(prev => [...prev, { sender: 'bot', text: 'Error: API connection failed. Please check Render Logs or GEMINI_API_KEY.' }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in pb-20 relative">
      
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
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <FiAlertCircle className="text-red-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-red-800 font-bold">Submission Failed</h4>
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
                <button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-violet-200 active:scale-95">
                  {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showChatWindow && (
        <div className="fixed bottom-6 right-6 w-[360px] bg-white rounded-[32px] shadow-2xl border border-slate-200 z-[90] overflow-hidden flex flex-col h-[520px] animate-fade-in">
          <div className="bg-slate-900 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center">
                <FiZap className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">EntreSkill AI</h4>
                <p className="text-emerald-400 text-xs font-bold flex items-center gap-1"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Online</p>
              </div>
            </div>
            <button onClick={() => setShowChatWindow(false)} className="text-slate-400 hover:text-white transition-colors">
              <FiMinimize2 size={20} />
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto bg-slate-50 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-violet-600 text-white rounded-br-sm' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask any doubt here..." 
                className="flex-1 bg-slate-100 rounded-xl px-4 py-3 outline-none text-sm font-semibold focus:ring-2 focus:ring-violet-500/20 pr-12"
              />
              <button type="submit" disabled={!chatInput.trim() || isBotTyping} className="absolute right-2 p-2 bg-violet-600 text-white rounded-lg disabled:bg-slate-300 hover:bg-violet-700 transition-colors">
                <FiSend size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {!showChatWindow && (
        <button 
          onClick={() => setShowChatWindow(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[80]"
        >
          <FiMessageCircle size={28} />
        </button>
      )}

      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[32px] p-10 md:p-16 text-center shadow-lg shadow-violet-200 mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Hi, how can we help?</h1>
        <p className="text-violet-200 font-semibold mb-8 text-lg">Search our knowledge base or ask the AI.</p>
        
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
            <FiSearch size={24} />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for answers..." 
            className="w-full pl-16 pr-6 py-5 bg-white rounded-2xl shadow-xl outline-none text-lg font-bold text-slate-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="border-t border-slate-200 pt-8">
            <div onClick={() => setShowChatWindow(true)} className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-violet-300 transition-colors cursor-pointer group shadow-sm mb-6">
              <div className="w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6">
                <FiMessageCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Live Chat</h3>
              <p className="text-slate-500 font-medium mb-6">Clear your doubts instantly with our smart AI assistant.</p>
              <button className="text-violet-600 font-extrabold flex items-center gap-2">Ask Doubt &rarr;</button>
            </div>

            <div onClick={() => setShowContactModal(true)} className="bg-white border border-slate-200 p-8 rounded-[24px] hover:border-blue-300 transition-colors cursor-pointer group shadow-sm">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FiMail size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-500 font-medium mb-6">Submit a formal request directly to our team.</p>
              <button className="text-blue-600 font-extrabold flex items-center gap-2">Submit Ticket &rarr;</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[24px] p-6 md:p-8 shadow-sm h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
              <FiZap size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100"
                >
                  <span className="font-bold text-slate-800 text-[15px]">{faq.q}</span>
                  <FiChevronDown className={`text-slate-400 ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;