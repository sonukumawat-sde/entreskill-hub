import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tailoringImage from '../assets/images/tailoring.png';
import cookingImage from '../assets/images/cooking.png';
import artImage from '../assets/images/art.png';
import mobileImage from '../assets/images/mobile.png';
import { 
  FiMenu, FiX, FiArrowRight, FiCheckCircle, FiPlayCircle, 
  FiScissors, FiCoffee, FiTool, FiMonitor, FiHeart, FiAward,
  FiTrendingUp, FiMap, FiBookOpen, FiUsers, FiTarget, 
  FiCheck, FiXCircle, FiChevronDown, FiStar, FiMessageSquare,
  FiActivity, FiShield, FiBriefcase,
  FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiLinkedin, 
  FiYoutube, FiFacebook
} from 'react-icons/fi';

function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [questionText, setQuestionText] = useState("");

  const faqs = [
    { q: "Is this completely free for beginners?", a: "Yes! You can take the skill assessment, explore profitable business ideas, and view the foundation of your roadmaps absolutely free. We only charge for premium mentor video calls." },
    { q: "I have never done business before. Will this help?", a: "That's exactly who EnterSkill is built for. We assume you only know your skill (like cooking or sewing). We teach you how to set prices, talk to customers, and market on WhatsApp from absolute zero." },
    { q: "How does the AI recommend business ideas?", a: "Our algorithm takes your specific skill, your available daily time, and your budget (even if it's ₹0), and matches it with highly demanded local businesses in India." },
    { q: "What kind of local skills are supported?", a: "We support over 50+ practical skills including Boutique/Tailoring, Home Tiffin Services, Mobile/Electronics Repair, Handicrafts, Beauty Parlours, and Freelance Digital Work." },
    { q: "How do I talk to the expert mentors?", a: "Once inside your dashboard, you can browse verified business owners, see their experience, and instantly book a live 1-on-1 video call to get personalized advice." }
  ];

  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  return (
    <div className="min-h-screen bg-surface font-sans text-body overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* 1. NAVBAR (Premium Glowing Logo, No Subtext) */}
      <nav className="sticky top-0 z-50 bg-card/85 backdrop-blur-2xl border-b border-line shadow-[0_4px_30px_rgba(37,99,235,0.05)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[84px] flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative">
              {/* Glowing Orb behind logo */}
              <div className="absolute inset-0 bg-primary/40 rounded-full blur-[10px] group-hover:bg-primary/60 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-tr from-primary to-blue-500 p-2.5 rounded-[12px] text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform duration-300">
                <FiBriefcase size={24} strokeWidth={2.5} />
              </div>
            </div>
            <span className="text-[26px] font-black leading-none tracking-tight text-heading">EnterSkill</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 text-[15px] font-bold">
            <a href="#how-it-works" className="text-body hover:text-primary hover:shadow-[0_4px_10px_rgba(37,99,235,0.2)] px-3 py-2 rounded-lg transition-all">How It Works</a>
            <a href="#business-ideas" className="text-body hover:text-primary hover:shadow-[0_4px_10px_rgba(37,99,235,0.2)] px-3 py-2 rounded-lg transition-all">Business Ideas</a>
            <a href="#dashboard-preview" className="text-body hover:text-primary hover:shadow-[0_4px_10px_rgba(37,99,235,0.2)] px-3 py-2 rounded-lg transition-all">The Platform</a>
            <a href="#faq" className="text-body hover:text-primary hover:shadow-[0_4px_10px_rgba(37,99,235,0.2)] px-3 py-2 rounded-lg transition-all">FAQ</a>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <Link to="/login" className="text-[16px] font-bold text-heading hover:text-primary transition-colors">Login</Link>
            <Link to="/register" className="relative group bg-primary hover:bg-blue-700 text-white text-[16px] font-bold px-8 py-3.5 rounded-[14px] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">Get Started Free</span>
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-heading p-2 focus:outline-none">
            {mobileMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-line px-6 py-8 space-y-5 absolute w-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-fade-in">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-[18px] font-bold text-heading">How It Works</a>
            <a href="#business-ideas" onClick={() => setMobileMenuOpen(false)} className="block text-[18px] font-bold text-heading">Business Ideas</a>
            <a href="#dashboard-preview" onClick={() => setMobileMenuOpen(false)} className="block text-[18px] font-bold text-heading">The Platform</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-[18px] font-bold text-heading">FAQ</a>
            <div className="h-px bg-line my-4 w-full"></div>
            <Link to="/login" className="block text-center font-bold py-4 text-[18px] text-heading border-2 border-line rounded-[16px]">Login</Link>
            <Link to="/register" className="block text-center font-bold py-4 text-[18px] bg-primary shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white rounded-[16px]">Get Started Free</Link>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION (Dense, Indian Context, Highly Visible Floating Cards) */}
      <section className="bg-surface py-16 lg:py-28 relative overflow-hidden">
        {/* Dense Glowing Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.15)] text-primary font-black px-5 py-2.5 rounded-full text-[13px] tracking-widest uppercase mb-8">
              <span className="relative flex h-3 w-3 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Empowering India's Local Talent
            </div>
            
            <h1 className="text-[46px] sm:text-[60px] font-black text-heading leading-[1.08] mb-6 tracking-tight">
              Turn Your Practical Skills Into A <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">Successful Business.</span>
            </h1>
            
            <p className="text-[19px] sm:text-[21px] font-medium text-body mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Stop guessing. Discover profitable local business ideas, follow clear step-by-step roadmaps, and get 1-on-1 mentorship to launch safely.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start mb-12">
              <Link to="/register" className="w-full sm:w-auto bg-primary text-white font-black text-[18px] px-10 py-5 rounded-[16px] flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_50px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all duration-300 active:scale-95 group">
                Start Free Assessment <FiArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto bg-card border-2 border-line hover:border-primary/40 text-heading font-black text-[18px] px-10 py-5 rounded-[16px] flex items-center justify-center hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] active:scale-95">
                See How It Works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[15px] font-black text-heading justify-center lg:justify-start bg-card/50 p-4 rounded-[16px] border border-line w-fit mx-auto lg:mx-0">
              <span className="flex items-center gap-2.5"><FiShield className="text-primary" size={22} /> Zero Experience Needed</span>
              <span className="flex items-center gap-2.5"><FiTarget className="text-secondary" size={22} /> Beginner Friendly</span>
            </div>
          </div>

          {/* Right Visual: Contextual Indian Image + Highly Visible Glowing Cards */}
          <div className="relative mx-auto w-full max-w-[540px] mt-16 lg:mt-0">
            {/* Main Image (Context: Indian Tailor / Small Business) */}
            <div className="relative rounded-[36px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] ring-[10px] ring-card z-0">
              <img src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1000&q=80" alt="Indian small business owner" className="w-full h-[560px] object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-heading/80 via-transparent to-transparent"></div>
            </div>

            {/* Floating Card 1: High Visibility Colors */}
            <div className="absolute -left-4 sm:-left-12 top-24 bg-card p-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-2 border-primary/20 flex items-center gap-4 animate-fade-in-up z-20 hover:-translate-y-2 transition-transform cursor-default">
              <div className="w-14 h-14 bg-primary text-white rounded-[16px] shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center shrink-0">
                <FiScissors size={28} />
              </div>
              <div className="pr-3">
                <p className="text-[13px] text-body font-black uppercase tracking-widest mb-1">AI Match Found</p>
                <p className="text-[19px] font-black text-heading leading-none">Boutique Owner</p>
              </div>
            </div>

            {/* Floating Card 2: Roadmap Success Glow */}
            <div className="absolute -right-4 sm:-right-10 bottom-24 bg-card p-6 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-2 border-secondary/20 animate-fade-in-up z-20 hover:-translate-y-2 transition-transform cursor-default" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary text-white shadow-[0_0_20px_rgba(22,163,74,0.4)] rounded-[16px] flex items-center justify-center shrink-0"><FiCheckCircle size={26} /></div>
                <div>
                  <p className="text-[18px] font-black text-heading leading-none">Roadmap</p>
                  <p className="text-[14px] font-black text-secondary mt-1">75% Launch Ready</p>
                </div>
              </div>
              <div className="w-full bg-surface rounded-full h-3 shadow-inner border border-line">
                <div className="bg-gradient-to-r from-secondary to-green-400 h-full rounded-full relative" style={{ width: '75%' }}>
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/40 rounded-full blur-[2px]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TRUST BAR (Glowing Box Containers for Categories) */}
      <section className="bg-surface py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide py-4">
          <div className="flex items-center justify-start md:justify-center gap-6 min-w-max">
            
            <div className="bg-card border border-line shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_25px_rgba(37,99,235,0.2)] hover:border-primary/50 transition-all px-6 py-4 rounded-[20px] flex items-center gap-3 cursor-default group">
              <div className="bg-blue-50 p-2.5 rounded-[12px] group-hover:bg-primary transition-colors"><FiScissors size={24} className="text-primary group-hover:text-white"/></div>
              <span className="font-extrabold text-heading text-[17px]">Tailoring</span>
            </div>
            
            <div className="bg-card border border-line shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:border-accent/50 transition-all px-6 py-4 rounded-[20px] flex items-center gap-3 cursor-default group">
              <div className="bg-orange-50 p-2.5 rounded-[12px] group-hover:bg-accent transition-colors"><FiCoffee size={24} className="text-accent group-hover:text-white"/></div>
              <span className="font-extrabold text-heading text-[17px]">Cooking</span>
            </div>

            <div className="bg-card border border-line shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_25px_rgba(22,163,74,0.2)] hover:border-secondary/50 transition-all px-6 py-4 rounded-[20px] flex items-center gap-3 cursor-default group">
              <div className="bg-green-50 p-2.5 rounded-[12px] group-hover:bg-secondary transition-colors"><FiTool size={24} className="text-secondary group-hover:text-white"/></div>
              <span className="font-extrabold text-heading text-[17px]">Repair</span>
            </div>

            <div className="bg-card border border-line shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)] hover:border-red-500/50 transition-all px-6 py-4 rounded-[20px] flex items-center gap-3 cursor-default group">
              <div className="bg-red-50 p-2.5 rounded-[12px] group-hover:bg-red-500 transition-colors"><FiHeart size={24} className="text-red-500 group-hover:text-white"/></div>
              <span className="font-extrabold text-heading text-[17px]">Handicrafts</span>
            </div>

            <div className="bg-card border border-line shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] hover:border-purple-500/50 transition-all px-6 py-4 rounded-[20px] flex items-center gap-3 cursor-default group">
              <div className="bg-purple-50 p-2.5 rounded-[12px] group-hover:bg-purple-500 transition-colors"><FiMonitor size={24} className="text-purple-500 group-hover:text-white"/></div>
              <span className="font-extrabold text-heading text-[17px]">Digital Skills</span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROBLEM SECTION (Emotional Hook with Deep Visuals) */}
      <section className="py-28 bg-card border-y border-line relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 font-black px-4 py-2 rounded-full text-[13px] tracking-widest uppercase mb-6 border border-red-100">
            <FiShield size={16} /> Identify The Barrier
          </div>
          <h2 className="text-[38px] sm:text-[48px] font-black text-heading mb-6 tracking-tight">Starting a Business Feels Risky & Confusing?</h2>
          <p className="text-[20px] text-body font-medium mb-16 max-w-3xl mx-auto leading-relaxed">You already have the talent in your hands — but turning it into a steady monthly income feels like a mountain. We understand the fear.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-16">
            
            <div className="bg-surface p-8 rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-line hover:border-red-200 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-card rounded-[18px] flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(239,68,68,0.15)] group-hover:scale-110 transition-transform">
                <FiMap className="text-red-500" size={30} />
              </div>
              <h4 className="font-black text-[20px] text-heading mb-3">Idea Confusion</h4>
              <p className="font-medium text-[16px] text-body leading-relaxed">Have great skills but completely blank on what exact service or product people will pay for locally?</p>
            </div>
            
            <div className="bg-surface p-8 rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-line hover:border-red-200 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-card rounded-[18px] flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(239,68,68,0.15)] group-hover:scale-110 transition-transform">
                <FiTrendingUp className="text-red-500" size={30} />
              </div>
              <h4 className="font-black text-[20px] text-heading mb-3">Investment Fear</h4>
              <p className="font-medium text-[16px] text-body leading-relaxed">Terrified of taking loans? Confused about the hidden costs, raw materials, or legal setup needed?</p>
            </div>
            
            <div className="bg-surface p-8 rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-line hover:border-red-200 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-card rounded-[18px] flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(239,68,68,0.15)] group-hover:scale-110 transition-transform">
                <FiUsers className="text-red-500" size={30} />
              </div>
              <h4 className="font-black text-[20px] text-heading mb-3">No Mentorship</h4>
              <p className="font-medium text-[16px] text-body leading-relaxed">Tired of random YouTube advice? Have no real, experienced person to call when you get stuck?</p>
            </div>

          </div>

          <div className="inline-flex items-center gap-4 bg-primary text-white font-black px-10 py-5 rounded-[20px] text-[20px] shadow-[0_15px_40px_rgba(37,99,235,0.3)]">
            <div className="bg-white/20 rounded-full p-2"><FiCheckCircle size={28} className="text-white"/></div> 
            EnterSkill is the ultimate solution to all these fears.
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (High Detail Flow with Strong CTA) */}
      <section id="how-it-works" className="py-28 bg-surface relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[38px] sm:text-[48px] font-black text-heading mb-6 tracking-tight">Your Success Journey in 4 Simple Steps</h2>
            <p className="text-[20px] text-body font-medium max-w-2xl mx-auto">We hold your hand from the moment you sign up till you get your very first paying customer.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Glowing Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-2 bg-line rounded-full z-0 overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-40"></div>
            </div>

            {/* Step 1 */}
            <div className="relative z-10 text-center group">
              <div className="w-28 h-28 bg-card border-[8px] border-surface shadow-[0_15px_40px_rgba(37,99,235,0.2)] text-primary rounded-full flex items-center justify-center text-[36px] font-black mx-auto mb-8 group-hover:-translate-y-3 transition-transform duration-300">1</div>
              <h3 className="text-[24px] font-black text-heading mb-4">Tell Us Your Skills</h3>
              <p className="text-body font-medium leading-relaxed text-[16px] px-2">Take a fast 2-minute assessment. Tell us what you enjoy doing, your available time, and your budget.</p>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10 text-center group">
              <div className="w-28 h-28 bg-card border-[8px] border-surface shadow-[0_15px_40px_rgba(245,158,11,0.2)] text-accent rounded-full flex items-center justify-center text-[36px] font-black mx-auto mb-8 group-hover:-translate-y-3 transition-transform duration-300">2</div>
              <h3 className="text-[24px] font-black text-heading mb-4">Get AI Business Ideas</h3>
              <p className="text-body font-medium leading-relaxed text-[16px] px-2">Our engine analyzes your data to give you the most safe, profitable, and local business model options.</p>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10 text-center group">
              <div className="w-28 h-28 bg-card border-[8px] border-surface shadow-[0_15px_40px_rgba(37,99,235,0.2)] text-primary rounded-full flex items-center justify-center text-[36px] font-black mx-auto mb-8 group-hover:-translate-y-3 transition-transform duration-300">3</div>
              <h3 className="text-[24px] font-black text-heading mb-4">Follow Daily Tasks</h3>
              <p className="text-body font-medium leading-relaxed text-[16px] px-2">We create a personalized step-by-step roadmap. Just tick off small tasks daily (like buying tools or setting prices).</p>
            </div>
            
            {/* Step 4 */}
            <div className="relative z-10 text-center group">
              <div className="w-28 h-28 bg-card border-[8px] border-surface shadow-[0_15px_40px_rgba(22,163,74,0.2)] text-secondary rounded-full flex items-center justify-center text-[36px] font-black mx-auto mb-8 group-hover:-translate-y-3 transition-transform duration-300">4</div>
              <h3 className="text-[24px] font-black text-heading mb-4">Launch & Grow</h3>
              <p className="text-body font-medium leading-relaxed text-[16px] px-2">Watch learning videos, book 1-on-1 mentor calls when stuck, and officially get your first customer.</p>
            </div>
          </div>

          <div className="text-center mt-24">
            <Link to="/register" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white font-black text-[20px] px-14 py-6 rounded-[20px] transition-all shadow-[0_15px_40px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.5)] hover:-translate-y-1 active:scale-95 group">
              Start Free Assessment & Build Profile <FiArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHAT YOU WILL GET (Deep Detailing & Trust Building) */}
      <section className="py-28 bg-card border-y border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-secondary font-black px-5 py-2.5 rounded-full text-[13px] tracking-widest uppercase mb-6">
              <FiAward size={18} /> The Ultimate Business Arsenal
            </div>
            <h2 className="text-[38px] sm:text-[48px] font-black text-heading tracking-tight mb-6">Everything You Need To Build A Real Business</h2>
            <p className="text-[20px] text-body font-medium max-w-3xl mx-auto leading-relaxed">We don't just give advice. We give you a complete software ecosystem designed specifically to ensure your business does not fail.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Highly Detailed Bento Cards */}
            <div className="md:col-span-2 bg-surface p-12 rounded-[36px] border border-line shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-700"></div>
              <div className="w-20 h-20 bg-card rounded-[20px] flex items-center justify-center mb-8 border border-line shadow-[0_10px_20px_rgba(37,99,235,0.1)] group-hover:scale-110 transition-transform">
                <FiTarget className="text-primary" size={36} />
              </div>
              <h3 className="text-[28px] font-black text-heading mb-4">Laser-Targeted Business Ideas</h3>
              <p className="text-body font-medium text-[17px] max-w-xl leading-relaxed mb-6">No generic Google searches. Based on your skill assessment, we calculate the exact startup cost, required tools, local demand, and difficulty level. We tell you exactly what services will sell in your specific city.</p>
              <ul className="space-y-3 font-bold text-heading text-[15px]">
                <li className="flex items-center gap-3"><FiCheckCircle className="text-secondary" size={20}/> Zero-Investment options included</li>
                <li className="flex items-center gap-3"><FiCheckCircle className="text-secondary" size={20}/> Competition analysis breakdown</li>
              </ul>
            </div>
            
            <div className="bg-surface p-12 rounded-[36px] border border-line shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 group">
              <div className="w-20 h-20 bg-card rounded-[20px] flex items-center justify-center mb-8 border border-line shadow-[0_10px_20px_rgba(22,163,74,0.1)] group-hover:scale-110 transition-transform">
                <FiMap className="text-secondary" size={36} />
              </div>
              <h3 className="text-[24px] font-black text-heading mb-4">Step-by-Step Roadmaps</h3>
              <p className="text-body font-medium text-[16px] leading-relaxed">A Notion-style checklist that tracks your daily progress. From 'Idea Validation' to 'Getting the first customer', never feel lost.</p>
            </div>
            
            <div className="bg-surface p-12 rounded-[36px] border border-line shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 group">
              <div className="w-20 h-20 bg-card rounded-[20px] flex items-center justify-center mb-8 border border-line shadow-[0_10px_20px_rgba(245,158,11,0.1)] group-hover:scale-110 transition-transform">
                <FiBookOpen className="text-accent" size={36} />
              </div>
              <h3 className="text-[24px] font-black text-heading mb-4">Distraction-Free Learning</h3>
              <p className="text-body font-medium text-[16px] leading-relaxed">No confusing jargon. Simple videos and templates on how to set pricing, talk to customers, and use WhatsApp Business.</p>
            </div>
            
            <div className="md:col-span-2 bg-surface p-12 rounded-[36px] border border-line shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors duration-700"></div>
              <div className="w-20 h-20 bg-card rounded-[20px] flex items-center justify-center mb-8 border border-line shadow-[0_10px_20px_rgba(147,51,234,0.1)] group-hover:scale-110 transition-transform">
                <FiUsers className="text-purple-600" size={36} />
              </div>
              <h3 className="text-[28px] font-black text-heading mb-4">1-on-1 Verified Mentor Guidance</h3>
              <p className="text-body font-medium text-[17px] max-w-xl leading-relaxed mb-6">Stuck somewhere? Don't worry. Browse our directory of verified, successful business owners from your industry. Book a live video call inside the platform and get direct answers to your unique problems.</p>
              <ul className="space-y-3 font-bold text-heading text-[15px]">
                <li className="flex items-center gap-3"><FiCheckCircle className="text-primary" size={20}/> Integrated Video Calls</li>
                <li className="flex items-center gap-3"><FiCheckCircle className="text-primary" size={20}/> Verified Industry Experts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    {/* 7. BUSINESS IDEAS PREVIEW (High Detail, Glowing Cards & Brand Colors) */}
      <section id="business-ideas" className="py-28 bg-surface relative overflow-hidden">
        
        {/* Soft Background Glows matching Brand Colors */}
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-card border border-line shadow-sm text-primary font-black px-5 py-2.5 rounded-full text-[13px] tracking-widest uppercase mb-6">
              <FiTarget size={18} /> Validated Business Models
            </div>
            <h2 className="text-[38px] sm:text-[48px] font-black text-heading mb-6 tracking-tight">Sneak Peek: What You Can Build</h2>
            <p className="text-[20px] text-body font-medium max-w-2xl mx-auto leading-relaxed">These are real, profitable business models our users are running right now. High demand, low risk, and perfectly structured.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            
            {/* Idea 1: Tailoring (Primary Blue Glow) */}
            <div className="bg-card rounded-[32px] overflow-hidden border border-line shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)] hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                <div className="absolute inset-0 bg-gradient-to-t from-heading/90 via-heading/20 to-transparent z-10"></div>
                <img src={tailoringImage} alt="Tailoring" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-primary font-black px-4 py-1.5 rounded-[12px] text-[12px] uppercase tracking-wider z-20 shadow-sm border border-blue-100">Tailoring Skill</div>
                <h3 className="absolute bottom-5 left-5 right-5 text-white font-black text-[22px] leading-tight z-20 drop-shadow-md group-hover:text-blue-300 transition-colors">Premium Alteration & Boutique</h3>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Est. Cost:</span> 
                    <span className="font-black text-heading bg-surface border border-line px-3 py-1 rounded-[8px]">₹5k - ₹15k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Local Demand:</span> 
                    <span className="font-black text-secondary">Very High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body font-bold text-[14px]">Time to Launch:</span> 
                    <span className="font-black text-primary">14 Days</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Idea 2: Cooking (Accent Orange Glow) */}
            <div className="bg-card rounded-[32px] overflow-hidden border border-line shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                <div className="absolute inset-0 bg-gradient-to-t from-heading/90 via-heading/20 to-transparent z-10"></div>
                <img src={cookingImage} alt="Cooking" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-accent font-black px-4 py-1.5 rounded-[12px] text-[12px] uppercase tracking-wider z-20 shadow-sm border border-orange-100">Cooking Skill</div>
                <h3 className="absolute bottom-5 left-5 right-5 text-white font-black text-[22px] leading-tight z-20 drop-shadow-md group-hover:text-orange-300 transition-colors">Corporate Office Tiffin Service</h3>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Est. Cost:</span> 
                    <span className="font-black text-heading bg-surface border border-line px-3 py-1 rounded-[8px]">₹2k - ₹5k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Local Demand:</span> 
                    <span className="font-black text-secondary">Extremely High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body font-bold text-[14px]">Time to Launch:</span> 
                    <span className="font-black text-accent">7 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Idea 3: Crafts (Red/Pink Glow) */}
            <div className="bg-card rounded-[32px] overflow-hidden border border-line shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(239,68,68,0.2)] hover:border-red-400/40 transition-all duration-500 hover:-translate-y-2 group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                <div className="absolute inset-0 bg-gradient-to-t from-heading/90 via-heading/20 to-transparent z-10"></div>
                <img src={artImage} alt="Crafts" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-red-500 font-black px-4 py-1.5 rounded-[12px] text-[12px] uppercase tracking-wider z-20 shadow-sm border border-red-100">Art & Crafts</div>
                <h3 className="absolute bottom-5 left-5 right-5 text-white font-black text-[22px] leading-tight z-20 drop-shadow-md group-hover:text-red-300 transition-colors">Custom Festival Gifting Brand</h3>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Est. Cost:</span> 
                    <span className="font-black text-heading bg-surface border border-line px-3 py-1 rounded-[8px]">₹1k - ₹4k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Online Demand:</span> 
                    <span className="font-black text-secondary">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body font-bold text-[14px]">Time to Launch:</span> 
                    <span className="font-black text-red-500">10 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Idea 4: Repair (Secondary Green Glow) */}
            <div className="bg-card rounded-[32px] overflow-hidden border border-line shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(22,163,74,0.2)] hover:border-secondary/40 transition-all duration-500 hover:-translate-y-2 group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                <div className="absolute inset-0 bg-gradient-to-t from-heading/90 via-heading/20 to-transparent z-10"></div>
                <img src={mobileImage} alt="Repair" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-secondary font-black px-4 py-1.5 rounded-[12px] text-[12px] uppercase tracking-wider z-20 shadow-sm border border-green-100">Technical Repair</div>
                <h3 className="absolute bottom-5 left-5 right-5 text-white font-black text-[22px] leading-tight z-20 drop-shadow-md group-hover:text-green-300 transition-colors">Doorstep Mobile/PC Repair</h3>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Est. Cost:</span> 
                    <span className="font-black text-heading bg-surface border border-line px-3 py-1 rounded-[8px]">₹0 - ₹2k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3.5 border-b border-line border-dashed">
                    <span className="text-body font-bold text-[14px]">Local Demand:</span> 
                    <span className="font-black text-secondary">Growing Fast</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-body font-bold text-[14px]">Time to Launch:</span> 
                    <span className="font-black text-secondary">5 Days</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div className="text-center">
            <Link to="/register" className="inline-flex items-center gap-3 bg-card border-2 border-line hover:border-primary text-heading font-black text-[20px] px-14 py-5 rounded-[20px] transition-all shadow-sm hover:shadow-[0_15px_40px_rgba(37,99,235,0.1)] hover:-translate-y-1 active:scale-95 group">
              See All 100+ Business Models <FiArrowRight size={24} className="text-primary group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    
      {/* 9. DASHBOARD PREVIEW (Image + Detailed Features to Build Trust) */}
      <section className="py-28 bg-card relative overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[38px] sm:text-[48px] font-black text-heading mb-6 tracking-tight">Your Complete Business Command Center</h2>
            <p className="text-[20px] text-body font-medium max-w-3xl mx-auto leading-relaxed">A premium, distraction-free environment. We track your progress, secure your data, and provide everything you need on one screen.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Dashboard Image */}
            <div className="lg:col-span-2 rounded-[40px] p-3 bg-surface border border-line shadow-[0_30px_80px_rgba(0,0,0,0.08)] transform hover:-translate-y-2 transition-transform duration-700">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="EnterSkill Dashboard Preview" className="rounded-[32px] border border-line object-cover h-[400px] sm:h-[550px] w-full" />
            </div>

            {/* Dashboard Features (Trust Building) */}
            <div className="space-y-8">
              <div className="bg-surface p-6 rounded-[24px] border border-line flex gap-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-[14px] flex items-center justify-center shrink-0 border border-blue-100">
                  <FiActivity size={26} className="text-primary"/>
                </div>
                <div>
                  <h4 className="text-[19px] font-black text-heading mb-1.5">Live Readiness Score</h4>
                  <p className="text-[15px] font-medium text-body leading-relaxed">Our system calculates exactly when your business is mathematically ready to launch safely.</p>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-[24px] border border-line flex gap-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-50 rounded-[14px] flex items-center justify-center shrink-0 border border-green-100">
                  <FiBookOpen size={26} className="text-secondary"/>
                </div>
                <div>
                  <h4 className="text-[19px] font-black text-heading mb-1.5">Focus Learning Mode</h4>
                  <p className="text-[15px] font-medium text-body leading-relaxed">Watch micro-lessons without YouTube distractions. Quizzes verify your understanding.</p>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-[24px] border border-line flex gap-5 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-50 rounded-[14px] flex items-center justify-center shrink-0 border border-purple-100">
                  <FiUsers size={26} className="text-purple-600"/>
                </div>
                <div>
                  <h4 className="text-[19px] font-black text-heading mb-1.5">Instant Mentor Booking</h4>
                  <p className="text-[15px] font-medium text-body leading-relaxed">A dedicated portal to manage your video sessions with experts. Secure and encrypted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SUCCESS STORIES (Detailed Indian Context with Premium Glow) */}
      <section className="py-28 bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[38px] sm:text-[48px] font-black text-heading mb-6 tracking-tight">Real Indians. Real Income.</h2>
            <p className="text-[20px] text-body font-medium max-w-2xl mx-auto">Join the 5,000+ local heroes who turned their everyday skills into respected, revenue-generating businesses.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Story 1 */}
            <div className="bg-card p-10 rounded-[32px] border border-line shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] hover:-translate-y-2 transition-all duration-300 relative group">
              <div className="absolute top-8 right-8 text-line group-hover:text-primary/10 transition-colors"><FiTrendingUp size={80} /></div>
              <div className="flex gap-1.5 text-accent mb-8 drop-shadow-sm"><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/></div>
              <p className="text-heading font-bold text-[18px] leading-relaxed mb-12 relative z-10">"I knew sewing, but business logic was zero. EnterSkill gave me a pricing template and a marketing roadmap. Today, my home boutique earns me ₹25,000/month consistently."</p>
              <div className="flex items-center gap-5 relative z-10 border-t border-line pt-8">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Priya" className="w-16 h-16 rounded-full object-cover border-4 border-surface shadow-md" />
                <div>
                  <h4 className="font-black text-[18px] text-heading">Priya Sharma</h4>
                  <p className="text-[13px] text-primary font-black uppercase tracking-wider mt-1">Tailoring → Boutique</p>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-card p-10 rounded-[32px] border border-line shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(22,163,74,0.08)] hover:-translate-y-2 transition-all duration-300 relative group">
              <div className="absolute top-8 right-8 text-line group-hover:text-secondary/10 transition-colors"><FiTool size={80} /></div>
              <div className="flex gap-1.5 text-accent mb-8 drop-shadow-sm"><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/></div>
              <p className="text-heading font-bold text-[18px] leading-relaxed mb-12 relative z-10">"The mentor video call saved me. I was going to buy expensive tools, but my mentor told me the exact basic kit I needed. I started my repair shop with zero loans!"</p>
              <div className="flex items-center gap-5 relative z-10 border-t border-line pt-8">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" alt="Rajesh" className="w-16 h-16 rounded-full object-cover border-4 border-surface shadow-md" />
                <div>
                  <h4 className="font-black text-[18px] text-heading">Rajesh Kumar</h4>
                  <p className="text-[13px] text-secondary font-black uppercase tracking-wider mt-1">Repair → Local Shop</p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-card p-10 rounded-[32px] border border-line shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)] hover:-translate-y-2 transition-all duration-300 relative group">
              <div className="absolute top-8 right-8 text-line group-hover:text-accent/10 transition-colors"><FiCoffee size={80} /></div>
              <div className="flex gap-1.5 text-accent mb-8 drop-shadow-sm"><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/><FiStar className="fill-current" size={20}/></div>
              <p className="text-heading font-bold text-[18px] leading-relaxed mb-12 relative z-10">"I had no budget, just my kitchen. EnterSkill's roadmap showed me how to use WhatsApp status to get orders. Within a week, I had 12 daily office customers."</p>
              <div className="flex items-center gap-5 relative z-10 border-t border-line pt-8">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80" alt="Ayesha" className="w-16 h-16 rounded-full object-cover border-4 border-surface shadow-md" />
                <div>
                  <h4 className="font-black text-[18px] text-heading">Ayesha Ali</h4>
                  <p className="text-[13px] text-accent font-black uppercase tracking-wider mt-1">Cooking → Tiffin Biz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ & Ask Question (Glowing & Interactive) */}
      <section id="faq" className="py-28 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[38px] sm:text-[48px] font-black text-heading mb-6 tracking-tight">Got Questions? We Have Answers.</h2>
            <p className="text-[20px] text-body font-medium">Everything is transparent. No hidden conditions.</p>
          </div>
          
          <div className="space-y-5 mb-20">
            {faqs.map((faq, index) => (
              <div key={index} className={`bg-surface border ${activeFaq === index ? 'border-primary shadow-[0_10px_30px_rgba(37,99,235,0.1)]' : 'border-line'} rounded-[24px] overflow-hidden transition-all duration-300`}>
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full p-7 text-left flex items-center justify-between font-black text-[18px] sm:text-[20px] text-heading outline-none group"
                >
                  <span className={`${activeFaq === index ? 'text-primary' : 'group-hover:text-primary'} transition-colors`}>{faq.q}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${activeFaq === index ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-card border border-line text-body group-hover:bg-blue-50 group-hover:text-primary group-hover:border-blue-200'}`}>
                    <FiChevronDown size={24} className={`transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {activeFaq === index && (
                  <div className="px-7 pb-8 text-[17px] text-body font-medium border-t border-line/50 pt-6 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ask Any Question Component */}
          <div className="bg-gradient-to-br from-blue-50 to-surface border border-blue-100 p-10 rounded-[32px] shadow-[0_20px_50px_rgba(37,99,235,0.05)] text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
              <FiMessageSquare size={30} />
            </div>
            <h3 className="text-[26px] font-black text-heading mb-4">Still have a doubt?</h3>
            <p className="text-[17px] text-body font-medium mb-8">Ask any specific question about your skill, and our team will get back to you.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will contact you soon."); setQuestionText(""); }} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="text" 
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="E.g. I make candles, is there a business for this?"
                required
                className="w-full bg-card border-2 border-line focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-[16px] px-6 py-4 outline-none text-heading font-medium text-[16px] transition-all shadow-inner"
              />
              <button type="submit" className="bg-heading hover:bg-black text-white font-black px-8 py-4 rounded-[16px] shrink-0 shadow-lg transition-all hover:-translate-y-1 active:scale-95">
                Ask Now
              </button>
            </form>
          </div>
        </div>
      </section>

     {/* 12. FINAL CTA (Brand Blue & Highly Detailed) */}
      <section className="relative py-32 text-center px-6 overflow-hidden bg-primary">
        
        {/* 1. Deep Rich Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-primary to-blue-800 opacity-95"></div>
        
        {/* 2. Abstract Glowing Shapes for Depth */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* 3. Subtle Texture Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.06]"></div>

        {/* 4. Small Decorative Elements */}
        <div className="absolute top-24 left-[15%] w-4 h-4 bg-white/40 rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute bottom-24 right-[20%] w-6 h-6 bg-white/30 rounded-full blur-[3px] animate-pulse delay-300"></div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Detailed Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-black px-6 py-2.5 rounded-full text-[13px] tracking-widest uppercase mb-10 shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            Your Future Awaits
          </div>
          
          {/* Headline - Using White and Soft Gold/Yellow to Pop on Blue */}
          <h2 className="text-[48px] sm:text-[70px] font-black text-white mb-8 leading-[1.05] tracking-tight drop-shadow-lg">
            Ready To Turn Your Skills <br className="hidden sm:block" /> Into <span className="text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.5)]">Income?</span>
          </h2>
          
          <p className="text-[22px] font-medium text-blue-50 mb-16 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Stop waiting for the perfect time. Join thousands of fellow Indian entrepreneurs who used EnterSkill to build a steady, secure monthly income from their local skills.
          </p>
          
          {/* Super Premium Button */}
          <Link to="/register" className="inline-flex items-center gap-3.5 bg-white text-primary font-black px-14 py-6 rounded-[22px] text-[22px] transition-all shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:scale-105 active:scale-95 group">
            Start Free Assessment <FiArrowRight size={28} className="group-hover:translate-x-2.5 transition-transform" />
          </Link>

          {/* Quick Trust Points underneath the button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-4 mt-16 text-[16px] font-bold text-blue-100">
             <span className="flex items-center gap-2.5"><FiCheckCircle className="text-yellow-300" size={20}/> 100% Free Foundation</span>
             <span className="flex items-center gap-2.5"><FiCheckCircle className="text-yellow-300" size={20}/> No Experience Needed</span>
             <span className="flex items-center gap-2.5"><FiCheckCircle className="text-yellow-300" size={20}/> Made For India</span>
          </div>
        </div>
      </section>
     {/* 13. PROFESSIONAL FOOTER */}
      <footer className="bg-[#0B1120] pt-12 pb-6 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Section: Tighter Grid & Less Padding */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-10 mb-8 border-b border-slate-800/60 pb-8 relative z-10">

          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 pr-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-[10px] text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <FiBriefcase size={22} strokeWidth={2.5} />
              </div>
              <span className="text-white font-black text-[22px] tracking-tight">EnterSkill</span>
            </div>
            <p className="text-[14px] text-slate-400 font-medium leading-relaxed mb-6">
              Simplifying the journey from practical skills to successful small businesses. Empowering local Indian entrepreneurs to start and grow safely.
            </p>
            {/* Sleek inline contact info to save space */}
            <div className="space-y-3">
              <a href="mailto:support@enterskill.in" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors group w-fit">
                <FiMail size={16} />
                <span className="text-[14px] font-medium tracking-wide">support@enterskill.in</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-slate-400 hover:text-secondary transition-colors group w-fit">
                <FiPhone size={16} />
                <span className="text-[14px] font-medium tracking-wide">+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400 cursor-default w-fit">
                <FiMapPin size={16} className="text-accent" />
                <span className="text-[14px] font-medium tracking-wide">Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="font-bold text-white text-[14px] mb-4 tracking-widest uppercase">Platform</h4>
            <ul className="space-y-3 text-[14px] font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#business-ideas" className="hover:text-white transition-colors">Business Models</a></li>
              <li><a href="#mentors" className="hover:text-white transition-colors">Find a Mentor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h4 className="font-bold text-white text-[14px] mb-4 tracking-widest uppercase">Resources</h4>
            <ul className="space-y-3 text-[14px] font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Learning Hub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Guides</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white text-[14px] mb-4 tracking-widest uppercase">Stay Updated</h4>
            <p className="text-[14px] text-slate-400 font-medium mb-4 leading-relaxed">
              Get the latest business ideas and platform updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-[10px] px-4 py-2.5 outline-none text-white font-medium text-[14px] transition-all shadow-inner"
                required
              />
              <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-bold px-5 py-2.5 rounded-[10px] shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all active:scale-95 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal & Socials (Fully Organized) */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          
          {/* Copyright */}
          <p className="text-[13px] font-bold text-slate-500 tracking-wide text-center md:text-left">
            © 2026 EnterSkill. All rights reserved.
          </p>

          {/* Legal Links Moved Here for better structure */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-[13px] font-medium text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>

          {/* Slightly smaller social icons for tight spacing */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-orange-500 hover:to-pink-500 hover:text-white transition-all hover:-translate-y-0.5">
              <FiInstagram size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-all hover:-translate-y-0.5">
              <FiTwitter size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-all hover:-translate-y-0.5">
              <FiLinkedin size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#FF0000] hover:text-white transition-all hover:-translate-y-0.5">
              <FiYoutube size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-0.5">
              <FiFacebook size={14} />
            </a>
          </div>
        </div>
      </footer>
     </div>
  );
}

export default Landing;