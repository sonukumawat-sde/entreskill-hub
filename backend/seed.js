const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BusinessIdea = require('./models/BusinessIdea');

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔥 MongoDB Atlas Connected for Mega Seeding!");

        // Purana data clear karna
        await BusinessIdea.deleteMany();
        console.log("🧹 Purana data saaf kar diya...");

        const businessIdeas = [
            // 💻 TECH & CODING IDEAS
            {
                title: "AI Resume Analyzer SaaS",
                description: "Ek AI platform jo resumes ko ATS software ke hisaab se score karta hai aur improvements batata hai.",
                requiredSkills: ["coding", "programming", "python", "react", "ai/ml", "web development"],
                investmentLevel: "Bootstrap (Under ₹5,000)",
                estimatedCost: "₹2,000 (Domain + API Hosting)",
                category: "Tech SaaS",
                demand: "Very High",
                roadmap: [
                    {
                        stageName: "MVP Build",
                        description: "Basic OpenAI API integration aur file upload feature.",
                        tasks: [
                            { title: "React frontend with PDF upload", taskType: "action", duration: "1 Week" },
                            { title: "OpenAI prompt engineering", taskType: "interactive", duration: "3 Days" }
                        ]
                    },
                    {
                        stageName: "Launch",
                        description: "College groups mein beta testing.",
                        tasks: [
                            { title: "Distribute free link in 5 WhatsApp groups", taskType: "action", duration: "1 Day" }
                        ]
                    }
                ]
            },
            {
                title: "Custom Shopify Agency",
                description: "Local businesses ke liye premium e-commerce stores banana.",
                requiredSkills: ["coding", "web development", "design", "business"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "E-commerce",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Platform Mastery",
                        description: "Shopify ke tools aur themes seekhna.",
                        tasks: [
                            { title: "Shopify Developer crash course", taskType: "video", duration: "3 Hours" }
                        ]
                    },
                    {
                        stageName: "Client Outreach",
                        description: "Instagram par local clothing pages ko approach karna.",
                        tasks: [
                            { title: "Send 20 DMs to Instagram pages without websites", taskType: "action", duration: "2 Hours" }
                        ]
                    }
                ]
            },
            {
                title: "No-Code App Development",
                description: "Bubble ya FlutterFlow use karke startups ke liye fast apps banana.",
                requiredSkills: ["coding", "logic", "design", "tech"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Tech Agency",
                demand: "Medium",
                roadmap: [
                    {
                        stageName: "Tool Selection",
                        description: "Ek no-code tool mein master banna.",
                        tasks: [
                            { title: "Clone a basic app (like WhatsApp) on FlutterFlow", taskType: "interactive", duration: "1 Week" }
                        ]
                    }
                ]
            },
            {
                title: "Cybersecurity Audit Services",
                description: "Chhoti companies ki websites check karke vulnerabilities report karna.",
                requiredSkills: ["coding", "cybersecurity", "networking", "python"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "B2B Service",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Skill Validation",
                        description: "Basic ethical hacking certificates aur practice.",
                        tasks: [
                            { title: "Complete basic Bug Bounty tutorials", taskType: "video", duration: "1 Week" }
                        ]
                    }
                ]
            },

            // 🎨 DESIGN & CREATIVE IDEAS
            {
                title: "UI/UX Audit For Startups",
                description: "Apps ki design aur user experience review karke improvement report bechna.",
                requiredSkills: ["design", "ui/ux", "figma", "creative", "analysis"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Consulting",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Portfolio Audit",
                        description: "Free mein 3 famous apps ki weaknesses nikalna.",
                        tasks: [
                            { title: "Redesign IRCTC or similar app screen", taskType: "action", duration: "2 Days" },
                            { title: "Post case study on Behance/LinkedIn", taskType: "action", duration: "1 Day" }
                        ]
                    }
                ]
            },
            {
                title: "Social Media Canva Templates",
                description: "Creators aur brands ke liye ready-to-use template packs banana aur sell karna.",
                requiredSkills: ["design", "canva", "creative", "marketing"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Digital Products",
                demand: "Very High",
                roadmap: [
                    {
                        stageName: "Product Creation",
                        description: "100-post bundle design karna.",
                        tasks: [
                            { title: "Research trending IG aesthetics", taskType: "reading", duration: "2 Hours" },
                            { title: "Design the master templates", taskType: "action", duration: "1 Week" }
                        ]
                    }
                ]
            },
            {
                title: "Pitch Deck Presentation Design",
                description: "Founders ke liye funding uthane wali premium presentations design karna.",
                requiredSkills: ["design", "business", "powerpoint", "communication"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "B2B Service",
                demand: "Medium",
                roadmap: [
                    {
                        stageName: "Market Research",
                        description: "Samjho investors kya dekhte hain.",
                        tasks: [
                            { title: "Read top 10 startup pitch decks", taskType: "reading", duration: "3 Hours" }
                        ]
                    }
                ]
            },
            {
                title: "Brand Identity Design",
                description: "Naye startups ke liye logos, color palettes aur brand guidelines banana.",
                requiredSkills: ["design", "graphics", "illustrator", "creative"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Creative Agency",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Mock Projects",
                        description: "Fake companies ke liye brand kits banana.",
                        tasks: [
                            { title: "Generate 5 fake startup briefs using ChatGPT", taskType: "interactive", duration: "1 Hour" },
                            { title: "Design their full branding", taskType: "action", duration: "2 Weeks" }
                        ]
                    }
                ]
            },

            // 📈 MARKETING & SALES IDEAS
            {
                title: "Local SEO Mastery Agency",
                description: "Restaurants, dentists, aur local shops ko Google Maps par #1 rank karwana.",
                requiredSkills: ["marketing", "seo", "sales", "communication", "business"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Marketing",
                demand: "Very High",
                roadmap: [
                    {
                        stageName: "Learn The Algorithm",
                        description: "Google My Business ke ranking factors samajhna.",
                        tasks: [
                            { title: "Watch Local SEO Masterclass", taskType: "video", duration: "2 Hours" }
                        ]
                    },
                    {
                        stageName: "Cold Outreach",
                        description: "Local shops ko audit report bhejna.",
                        tasks: [
                            { title: "Call 10 local businesses with no website", taskType: "action", duration: "1 Day" }
                        ]
                    }
                ]
            },
            {
                title: "Meta Ads For Clinics",
                description: "High-paying doctors (dentists, dermatologists) ke liye lead generation ads chalana.",
                requiredSkills: ["marketing", "digital marketing", "sales", "analytics"],
                investmentLevel: "Bootstrap (Under ₹5,000)",
                estimatedCost: "₹2,000 (Ad testing)",
                category: "B2B Marketing",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Funnel Building",
                        description: "Ad se lekar appointment booking tak ka system setup karna.",
                        tasks: [
                            { title: "Create dummy Lead Form ad", taskType: "interactive", duration: "2 Hours" }
                        ]
                    }
                ]
            },
            {
                title: "Micro-Influencer Management",
                description: "10k-50k followers wale creators ko brand deals laakar dena aur commission lena.",
                requiredSkills: ["marketing", "sales", "communication", "networking", "management"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Media Management",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Roster Building",
                        description: "Ache creators ko onboard karna.",
                        tasks: [
                            { title: "DM 20 micro-influencers offering free management", taskType: "action", duration: "1 Day" }
                        ]
                    }
                ]
            },
            {
                title: "Email Marketing Agency",
                description: "E-commerce brands ke liye Klaviyo/Mailchimp ke through revenue badhana.",
                requiredSkills: ["marketing", "writing", "copywriting", "analytics"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Marketing",
                demand: "Medium",
                roadmap: [
                    {
                        stageName: "Copywriting Basics",
                        description: "Sales emails likhna seekhna.",
                        tasks: [
                            { title: "Study 50 successful promo emails", taskType: "reading", duration: "3 Hours" }
                        ]
                    }
                ]
            },

            // 🎬 VIDEO & MEDIA IDEAS
            {
                title: "Short-Form Content Agency",
                description: "Podcasts aur long videos ko edit karke viral Reels/Shorts banana.",
                requiredSkills: ["video", "editing", "creative", "social media", "premiere pro"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Media",
                demand: "Very High",
                roadmap: [
                    {
                        stageName: "Style Development",
                        description: "Retention-heavy editing seekhna.",
                        tasks: [
                            { title: "Edit 3 free samples in Alex Hormozi style", taskType: "action", duration: "3 Days" }
                        ]
                    },
                    {
                        stageName: "Client Pitching",
                        description: "YouTubers ko free samples bhejna.",
                        tasks: [
                            { title: "Email 10 creators your edited samples", taskType: "action", duration: "2 Hours" }
                        ]
                    }
                ]
            },
            {
                title: "Real Estate Drone Tours",
                description: "Cinematic drone shots for property listings.",
                requiredSkills: ["video", "photography", "editing", "business"],
                investmentLevel: "Small Investment (₹5,000 - ₹20,000)",
                estimatedCost: "₹15,000 (Drone Rental/Buy)",
                category: "Media Services",
                demand: "Medium",
                roadmap: [
                    {
                        stageName: "Showreel Creation",
                        description: "Shoot local landscapes or free properties.",
                        tasks: [
                            { title: "Shoot and edit a 1-minute cinematic reel", taskType: "action", duration: "3 Days" }
                        ]
                    }
                ]
            },
            {
                title: "YouTube Thumbnail Design",
                description: "Creators ke liye High-CTR (Click Through Rate) thumbnails banana.",
                requiredSkills: ["design", "photoshop", "creative", "video"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Design Service",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Study The Best",
                        description: "MrBeast aur top creators ke thumbnails analyze karna.",
                        tasks: [
                            { title: "Redesign 5 bad thumbnails of medium creators", taskType: "action", duration: "2 Days" }
                        ]
                    }
                ]
            },

            // ✍️ WRITING & CONTENT
            {
                title: "LinkedIn Ghostwriting",
                description: "Busy CEOs aur founders ke liye LinkedIn posts likhna.",
                requiredSkills: ["writing", "copywriting", "communication", "marketing"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Consulting",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Build Your Own Brand",
                        description: "Proof dikhane ke liye khud ki reach badhana.",
                        tasks: [
                            { title: "Post daily for 14 days on LinkedIn", taskType: "action", duration: "2 Weeks" }
                        ]
                    }
                ]
            },
            {
                title: "Technical Writing Service",
                description: "Software companies ke liye clear API docs, READMEs, aur tech blogs likhna.",
                requiredSkills: ["writing", "coding", "tech", "communication"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Freelance",
                demand: "Medium",
                roadmap: [
                    {
                        stageName: "Open Source Contributions",
                        description: "Experience lene ke liye open source docs improve karna.",
                        tasks: [
                            { title: "Contribute to 2 GitHub project documentations", taskType: "action", duration: "1 Week" }
                        ]
                    }
                ]
            },

            // 👔 BUSINESS, MANAGEMENT & OFFLINE
            {
                title: "High-Protein Cloud Kitchen",
                description: "Gym freaks ke liye healthy, macro-counted food delivery on Swiggy/Zomato.",
                requiredSkills: ["business", "management", "cooking", "operations"],
                investmentLevel: "Small Investment (₹5,000 - ₹20,000)",
                estimatedCost: "₹18,000",
                category: "Food & Bev",
                demand: "Very High",
                roadmap: [
                    {
                        stageName: "Menu & Licensing",
                        description: "Food cost aur legal setup.",
                        tasks: [
                            { title: "Apply for FSSAI Registration", taskType: "action", duration: "2 Hours" },
                            { title: "Finalize top 5 high-margin protein dishes", taskType: "interactive", duration: "2 Days" }
                        ]
                    }
                ]
            },
            {
                title: "Executive Virtual Assistant",
                description: "Busy founders ke emails, calendar, aur travels manage karna.",
                requiredSkills: ["management", "communication", "organization", "business"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "B2B Service",
                demand: "High",
                roadmap: [
                    {
                        stageName: "Tool Stack Mastery",
                        description: "Learn modern workspace tools.",
                        tasks: [
                            { title: "Master Notion & Google Workspace", taskType: "video", duration: "1 Day" }
                        ]
                    }
                ]
            },
            {
                title: "Airbnb Co-Hosting",
                description: "Property owners ke accounts aur guests manage karna aur profit share lena.",
                requiredSkills: ["business", "management", "communication", "sales"],
                investmentLevel: "Zero (₹0)",
                estimatedCost: "₹0",
                category: "Real Estate",
                demand: "Medium",
                roadmap: [
                    {
                        stageName: "Market Analysis",
                        description: "Identify high-traffic tourist/business areas.",
                        tasks: [
                            { title: "Research local Airbnb daily rates & occupancy", taskType: "reading", duration: "3 Hours" }
                        ]
                    }
                ]
            }
        ];

        await BusinessIdea.insertMany(businessIdeas);
        console.log(`✅ 100% Success! ${businessIdeas.length} Premium Business Ideas database mein save ho gaye!`);

        process.exit();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        process.exit(1);
    }
};

seedDatabase();