import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiMail, FiLock, FiUser, FiArrowRight, 
  FiBriefcase, FiShield, FiCheckCircle, FiAlertCircle, FiLoader
} from 'react-icons/fi';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      
      // Backend ko request bhej rahe hain
      const { data } = await axios.post('https://entreskill-hub-9r2j.onrender.com/api/auth/register', formData, config);
      
      // NAYA CODE: Backend se aaya hua Token aur User info save kar lo
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      
      // NAYA CODE: Register hote hi seedha Dashboard par bhej do!
     navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-surface flex font-sans selection:bg-primary/20 selection:text-primary overflow-hidden">
      
      {/* LEFT PANEL - Brand Experience */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden flex-col justify-between p-12">
        {/* Massive Brand Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <Link to="/" className="relative z-10 flex items-center gap-3.5 w-fit">
          <div className="bg-white p-2.5 rounded-[12px] text-primary shadow-xl">
            <FiBriefcase size={26} strokeWidth={2.5} />
          </div>
          <span className="text-white font-black text-[28px] tracking-tight">EnterSkill</span>
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white font-black px-6 py-2.5 rounded-full text-[13px] tracking-widest uppercase mb-10 shadow-lg">
            <FiShield size={18} /> Empowering Future
          </div>
          <h1 className="text-[54px] font-black text-white leading-[1.05] mb-8 tracking-tight">
             Turn Your <span className="text-yellow-300">Skills</span> <br /> Into Income.
          </h1>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white font-bold text-[18px]">
              <FiCheckCircle className="text-yellow-300" size={24}/> AI-Matched Business Models
            </div>
            <div className="flex items-center gap-4 text-white font-bold text-[18px]">
              <FiCheckCircle className="text-yellow-300" size={24}/> Personalized Step-by-Step Roadmaps
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-100 font-bold tracking-wide">
          © 2026 EnterSkill Hub. Made for India.
        </div>
      </div>

      {/* RIGHT PANEL - Clean Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        {/* Subtle background glow for consistency */}
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-[440px] relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[36px] font-black text-heading mb-3 tracking-tight">Create Account</h2>
            <p className="text-[17px] text-body font-medium">Join the revolution of Indian Entrepreneurs.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-[16px] flex items-center gap-3 text-[14px] font-black shadow-sm animate-shake">
              <FiAlertCircle size={20} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[14px] font-black text-heading uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Sonu Kumawat" className="w-full bg-white border-2 border-line focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-[18px] pl-12 pr-4 py-4 outline-none text-heading font-bold transition-all shadow-sm" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-black text-heading uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full bg-white border-2 border-line focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-[18px] pl-12 pr-4 py-4 outline-none text-heading font-bold transition-all shadow-sm" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-black text-heading uppercase tracking-wider">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-white border-2 border-line focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-[18px] pl-12 pr-4 py-4 outline-none text-heading font-bold transition-all shadow-sm" required minLength="6" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[14px] font-black text-heading uppercase tracking-wider">I want to join as a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setFormData({...formData, role: 'user'})} className={`py-4 rounded-[16px] border-2 font-black transition-all ${formData.role === 'user' ? 'border-primary bg-primary/5 text-primary shadow-inner' : 'border-line text-body hover:border-primary/30'}`}>Entrepreneur</button>
                <button type="button" onClick={() => setFormData({...formData, role: 'mentor'})} className={`py-4 rounded-[16px] border-2 font-black transition-all ${formData.role === 'mentor' ? 'border-primary bg-primary/5 text-primary shadow-inner' : 'border-line text-body hover:border-primary/30'}`}>Expert Mentor</button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-blue-700 text-white font-black text-[18px] py-5 rounded-[20px] flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] active:scale-95 group">
              {loading ? <FiLoader className="animate-spin" size={24} /> : <>Create Free Account <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" size={24}/></>}
            </button>
          </form>

          <p className="mt-10 text-center font-bold text-body">Already a member? <Link to="/login" className="text-primary hover:underline">Log in here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;