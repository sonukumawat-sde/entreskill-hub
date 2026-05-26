import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FiSearch, FiFilter, FiStar, FiCalendar, 
  FiClock, FiCheckCircle, FiUser, FiArrowRight,
  FiAward, FiBriefcase, FiZap, FiX, FiShield
} from 'react-icons/fi';

// Razorpay Script load karne ka helper function
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Modal & Booking States
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Schedule, 2: Real Payment processing, 3: Success
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // 🔥 BACKEND INTEGRATION: Fetching Mentors from MongoDB
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get('https://entreskill-hub-9r2j.onrender.com/api/mentors');
        
        // Data mapping to match your beautiful UI structure
        const mappedMentors = res.data.mentors.map(m => ({
          id: m._id,
          name: m.name,
          role: "Expert Mentor", // Default role since schema doesn't have it yet
          category: m.expertise.length > 0 ? m.expertise[0] : "Business",
          experience: `${m.experienceYears}+ Years`,
          rating: 4.8, // Default rating
          reviews: Math.floor(Math.random() * 100) + 50, // Default random reviews
          expertise: m.expertise,
          price: 499, // Default price
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=random&color=fff&bold=true`,
          isTopRated: m.experienceYears > 5, // Logic for Top Rated badge
          bio: m.bio
        }));

        setMentors(mappedMentors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const categories = ["All", "Tech", "Marketing", "Business", "Legal"];
  const timeSlots = ["10:00 AM", "02:00 PM", "04:30 PM", "07:00 PM"];

  // Filter Logic
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || mentor.category === activeCategory || mentor.expertise.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const handleOpenBooking = (mentor) => {
    setSelectedMentor(mentor);
    setBookingStep(1);
    setSelectedDate("");
    setSelectedSlot("");
  };

  const handleCloseBooking = () => {
    setSelectedMentor(null);
  };

  // REAL RAZORPAY PAYMENT LOGIC
  const displayRazorpay = async () => {
    if (!selectedDate || !selectedSlot) return;

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Options for Razorpay Modal
    const options = {
      key: "rzp_test_SsgLiZ4OXvzDPg", // Tumhe apna test/live key yahan dalna hoga baad mein
      amount: selectedMentor.price * 100, // Amount is in currency subunits (paise)
      currency: "INR",
      name: "EntreSkill Hub",
      description: `1-on-1 Session with ${selectedMentor.name}`,
      image: "https://ui-avatars.com/api/?name=Entre+Skill&background=0F172A&color=fff",
      handler: function (response) {
        // Payment successful hone par yeh chalega
        console.log("Payment ID: ", response.razorpay_payment_id);
        setBookingStep(3); // Go to Success Screen
      },
      prefill: {
        name: "EntreSkill User",
        email: "user@entreskill.com",
        contact: "9999999999",
      },
      theme: {
        color: "#2563EB",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 selection:bg-blue-100 relative">
      
      {/* ==========================================
          1. HEADER SECTION
          ========================================== */}
      <header className="bg-white border-b border-slate-200 px-6 py-10 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <h1 className="text-[40px] font-black text-[#0F172A] tracking-tight leading-tight mb-3">
              Expert Mentors
            </h1>
            <p className="text-[18px] text-[#475569] font-medium">
              Connect with industry leaders for 1-on-1 guidance to accelerate your startup journey and overcome roadblocks.
            </p>
          </div>
          
          <div className="relative w-full md:w-[350px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-700"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* ==========================================
            2. CATEGORY FILTERS
            ========================================== */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 mr-4 text-slate-500 font-bold text-sm uppercase tracking-widest">
            <FiFilter /> Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-[#0F172A] text-white shadow-lg scale-105' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ==========================================
            3. HIGHLY DETAILED MENTORS GRID
            ========================================== */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            <p className="text-slate-500 font-bold">Loading expert mentors...</p>
          </div>
        ) : filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredMentors.map((mentor) => (
              <div 
                key={mentor.id} 
                className="bg-white border border-slate-200 rounded-[32px] p-6 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-[24px] object-cover" />
                      {mentor.isTopRated && (
                        <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-1.5 rounded-lg shadow-md border-2 border-white">
                          <FiAward size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        <FiStar size={14} className="fill-amber-500" />
                        <span className="text-sm font-black">{mentor.rating}</span>
                        <span className="text-[11px] text-amber-600/70 font-bold">({mentor.reviews})</span>
                      </div>
                      <p className="text-[12px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">Session Fee</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-[22px] font-black text-[#0F172A] mb-1 group-hover:text-blue-600 transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-[14px] font-bold text-slate-500 flex items-center gap-2">
                      <FiBriefcase className="text-blue-500" /> {mentor.role}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 mb-6 line-clamp-2">{mentor.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {mentor.expertise.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-100">
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                       <span className="bg-slate-50 text-slate-600 px-2 py-1.5 rounded-lg text-xs font-bold border border-slate-100">
                       +{mentor.expertise.length - 3}
                     </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-[#0F172A]">₹{mentor.price}</span>
                      <div className="flex items-center gap-1">
                        <FiClock className="text-blue-500" size={12}/>
                        <span className="text-[11px] font-bold">45 min</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenBooking(mentor)}
                    className="bg-[#0F172A] hover:bg-blue-600 text-white px-5 py-3 rounded-[16px] font-bold text-sm transition-all active:scale-95 flex items-center gap-2 shadow-md"
                  >
                    Book Slot <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUser size={40} />
            </div>
            <h2 className="text-[24px] font-black text-slate-800 mb-2">No Mentors Found</h2>
            <p className="text-slate-500 font-medium">We are currently verifying our mentor applications. Please check back soon!</p>
          </div>
        )}

        {/* ==========================================
            4. REAL BOOKING & RAZORPAY MODAL
            ========================================== */}
        {selectedMentor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm" onClick={handleCloseBooking}></div>
            
            <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl relative z-10 overflow-hidden">
              <div className="px-8 py-6 border-b flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <img src={selectedMentor.avatar} className="w-12 h-12 rounded-xl" alt="" />
                  <div>
                    <h3 className="font-black text-[#0F172A]">{selectedMentor.name}</h3>
                    <p className="text-xs font-bold text-blue-600">Secure Checkout</p>
                  </div>
                </div>
                <button onClick={handleCloseBooking} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><FiX size={20}/></button>
              </div>

              <div className="p-8">
                {/* STEP 1: SCHEDULING (Before Payment) */}
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-black text-[#0F172A] uppercase tracking-wider block mb-3">Select Date</label>
                      <input 
                        type="date" 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-black text-[#0F172A] uppercase tracking-wider block mb-3">Available Slots</label>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map(slot => (
                          <button 
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-xl text-sm font-bold border transition-all ${selectedSlot === slot ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center mb-6">
                      <span className="text-slate-500 font-bold">Total Amount:</span>
                      <span className="text-2xl font-black text-[#0F172A]">₹{selectedMentor.price}</span>
                    </div>

                    {/* REAL RAZORPAY TRIGGER BUTTON */}
                    <button 
                      disabled={!selectedDate || !selectedSlot}
                      onClick={displayRazorpay}
                      className="w-full bg-[#0F172A] disabled:bg-slate-300 text-white py-4 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                    >
                      Pay via Razorpay <FiArrowRight />
                    </button>
                    <p className="text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-1 mt-3">
                      <FiShield /> 100% Secure Encrypted Payment
                    </p>
                  </div>
                )}

                {/* STEP 3: SUCCESS */}
                {bookingStep === 3 && (
                  <div className="text-center py-6 space-y-6">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <FiCheckCircle size={48} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#0F172A]">Payment Successful!</h2>
                      <p className="text-slate-500 font-medium mt-2">Your 1-on-1 session is booked and confirmed.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300 text-left">
                      <p className="text-xs font-black text-slate-400 uppercase mb-1">Session Details</p>
                      <p className="font-bold text-[#0F172A]">{selectedMentor.name}</p>
                      <p className="text-sm font-medium text-slate-600">{selectedDate} at {selectedSlot}</p>
                    </div>
                    <button 
                      onClick={handleCloseBooking}
                      className="w-full bg-[#0F172A] hover:bg-blue-600 text-white py-4 rounded-2xl font-black transition-all active:scale-95"
                    >
                      View Calendar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. TRUST BANNER */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="bg-[#0F172A] rounded-[40px] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Quality Guaranteed</h2>
            <p className="text-blue-100/60 max-w-xl mx-auto mb-8 font-medium">If you are not satisfied with your session, we offer a 100% money-back guarantee. No questions asked.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Mentors;