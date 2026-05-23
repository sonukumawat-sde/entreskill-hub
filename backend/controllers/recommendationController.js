const Skill = require('../models/Skill');
const BusinessIdea = require('../models/BusinessIdea');

// 1. Naya Skill add karne ka logic
const addSkill = async (req, res) => {
    try {
        const { name, category } = req.body;
        const skill = await Skill.create({ name, category });
        res.status(201).json({ message: 'Skill successfully add ho gayi!', skill });
    } catch (error) {
        res.status(500).json({ message: 'Skill add karne mein error aayi', error: error.message });
    }
};

// 2. Naya Business Idea add karne ka logic
const addBusinessIdea = async (req, res) => {
    try {
        const { title, description, requiredSkills, investmentLevel, estimatedCost, category, demand } = req.body;
        const idea = await BusinessIdea.create({
            title, description, requiredSkills, investmentLevel, estimatedCost, category, demand
        });
        res.status(201).json({ message: 'Business Idea successfully add ho gaya!', idea });
    } catch (error) {
        res.status(500).json({ message: 'Idea add karne mein error aayi', error: error.message });
    }
};

// 3. MAIN RECOMMENDATION LOGIC: User ki skills ke basis par ideas dhundna
const getRecommendations = async (req, res) => {
    try {
        const { userSkills } = req.body; 

        if (!userSkills || userSkills.length === 0) {
            return res.status(400).json({ message: 'Kripya kam se kam ek skill select karein' });
        }

        const recommendedIdeas = await BusinessIdea.find({
            requiredSkills: { $in: userSkills }
        }); 

        res.status(200).json({
            count: recommendedIdeas.length,
            message: 'Aapki skills ke hisaab se recommendations mil gayi hain!',
            recommendations: recommendedIdeas
        });

    } catch (error) {
        res.status(500).json({ message: 'Recommendation fetch karne mein error aayi', error: error.message });
    }
};

// 4. Database se saari skills laane ka logic
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find({});
        res.status(200).json({
            count: skills.length,
            message: 'Saari skills successfully mil gayi',
            skills: skills
        });
    } catch (error) {
        res.status(500).json({ message: 'Skills laane mein error aayi', error: error.message });
    }
};

// 5. Database se saare business ideas laane ka logic
const getAllBusinessIdeas = async (req, res) => {
    try {
        const ideas = await BusinessIdea.find({});
        res.status(200).json({
            count: ideas.length,
            message: 'Saare business ideas successfully mil gaye',
            ideas: ideas
        });
    } catch (error) {
        res.status(500).json({ message: 'Ideas laane mein error aayi', error: error.message });
    }
};

// 6. Ek specific Business Idea aur uska roadmap laane ke liye 
const getIdeaById = async (req, res) => {
    try {
        const idea = await BusinessIdea.findById(req.params.id);
        if (!idea) {
            return res.status(404).json({ message: 'Business Idea nahi mila' });
        }
        res.status(200).json(idea);
    } catch (error) {
        res.status(500).json({ message: 'Idea laane mein error aayi', error: error.message });
    }
};

// 7. UPDATED MEGA SEED FUNCTION (Roadmap details ke sath - BUG FIXED)
const seedBusinessIdeas = async (req, res) => {
    try {
        const count = await BusinessIdea.countDocuments();
        if (count > 0) {
            return res.status(400).json({ message: 'Bhai, Ideas pehle se database mein hain! Baar-baar add nahi kar sakte.' });
        }

        const ideas = [
            // Tech & Coding
            { 
                title: "AI Resume Analyzer", 
                description: "Use AI to score resumes and suggest improvements for job seekers.", 
                requiredSkills: ["coding"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0 - ₹2,000", 
                category: "Tech SaaS", 
                demand: "High",
                roadmap: [
                    {
                        stageName: 'Discover & Planning',
                        description: 'Understand ATS systems and what job seekers actually need.',
                        tasks: [
                            { title: 'Research how top ATS algorithms work', taskType: 'reading', duration: '30 mins' },
                            { title: 'Interview 5 college students about their resume struggles', taskType: 'action', duration: '2 hours' }
                        ]
                    },
                    {
                        stageName: 'Build Minimum Viable Product (MVP)',
                        description: 'Create the core logic using OpenAI and a simple UI.',
                        tasks: [
                            { title: 'Set up OpenAI API integration', taskType: 'video', duration: '45 mins' },
                            { title: 'Build a drag-and-drop React upload component', taskType: 'interactive', duration: '1 hour' },
                            { title: 'Write prompts for parsing PDF text', taskType: 'action', duration: '2 hours' }
                        ]
                    },
                    {
                        stageName: 'Launch & Marketing',
                        description: 'Get your first 100 beta users.',
                        tasks: [
                            { title: 'Post the tool on LinkedIn and student groups', taskType: 'action', duration: '30 mins' },
                            { title: 'Collect feedback and fix 3 major bugs', taskType: 'action', duration: '2 days' }
                        ]
                    }
                ]
            },
            { 
                title: "Custom Shopify Stores", 
                description: "Build and setup automated e-commerce stores for local businesses.", 
                requiredSkills: ["coding", "design"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0", 
                category: "E-commerce", 
                demand: "Very High",
                roadmap: [
                    {
                        stageName: 'Learn the Platform',
                        description: 'Master Shopify setup and basic theme customization.',
                        tasks: [
                            { title: 'Watch Shopify Store Setup Masterclass', taskType: 'video', duration: '1.5 hours' },
                            { title: 'Create a free partner account and build a dummy store', taskType: 'action', duration: '3 hours' }
                        ]
                    },
                    {
                        stageName: 'Acquire Clients',
                        description: 'Find local businesses that need an online presence.',
                        tasks: [
                            { title: 'List 20 local stores without a website', taskType: 'action', duration: '1 hour' },
                            { title: 'Cold email/DM template creation', taskType: 'reading', duration: '20 mins' },
                            { title: 'Reach out to the 20 businesses', taskType: 'action', duration: '2 hours' }
                        ]
                    }
                ]
            },
            { 
                title: "No-Code Agency", 
                description: "Build landing pages and apps fast using tools like Webflow and Bubble.", 
                requiredSkills: ["coding", "business"], 
                investmentLevel: "Bootstrap (Under ₹5,000)", 
                estimatedCost: "₹3,000", 
                category: "Tech Agency", 
                demand: "Medium",
                roadmap: [
                    {
                        stageName: 'Tool Mastery',
                        description: 'Learn the ins and outs of Webflow or Bubble.',
                        tasks: [
                            { title: 'Complete Webflow 101 Crash Course', taskType: 'video', duration: '2 hours' },
                            { title: 'Clone a popular website interface as practice', taskType: 'interactive', duration: '4 hours' }
                        ]
                    },
                    {
                        stageName: 'Portfolio Creation',
                        description: 'Showcase what you can build.',
                        tasks: [
                            { title: 'Build your agency landing page', taskType: 'action', duration: '1 day' },
                            { title: 'Set up pricing tiers and service packages', taskType: 'reading', duration: '30 mins' }
                        ]
                    }
                ]
            },
            
            // Design
            { 
                title: "Social Media Templates", 
                description: "Create and sell Canva/Figma templates for creators and brands.", 
                requiredSkills: ["design"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0", 
                category: "Digital Products", 
                demand: "High",
                roadmap: [
                    {
                        stageName: 'Niche Selection & Design',
                        description: 'Decide who you are making templates for (e.g., real estate, fitness).',
                        tasks: [
                            { title: 'Research trending aesthetics on Pinterest', taskType: 'reading', duration: '45 mins' },
                            { title: 'Design a 15-post template pack in Figma/Canva', taskType: 'action', duration: '3 hours' }
                        ]
                    },
                    {
                        stageName: 'Setup Store & Sell',
                        description: 'Launch your digital product store.',
                        tasks: [
                            { title: 'Set up a Gumroad or Etsy account', taskType: 'interactive', duration: '30 mins' },
                            // FIX: Yahan 'design' tha jo database ke rules ke khilaf tha, isko 'action' kar diya!
                            { title: 'Create promotional graphics for the templates', taskType: 'action', duration: '1 hour' }
                        ]
                    }
                ]
            },
            { 
                title: "Presentation Design Service", 
                description: "Design pitch decks for startups looking to raise funding.", 
                requiredSkills: ["design", "business"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0", 
                category: "B2B Service", 
                demand: "Medium",
                roadmap: [
                    {
                        stageName: 'Understand Pitch Decks',
                        description: 'Learn what investors look for in a presentation.',
                        tasks: [
                            { title: 'Analyze Uber and AirBnB early pitch decks', taskType: 'reading', duration: '1 hour' },
                            { title: 'Redesign a bad pitch deck for your portfolio', taskType: 'action', duration: '3 hours' }
                        ]
                    },
                    {
                        stageName: 'Client Outreach',
                        description: 'Find founders who are raising money.',
                        tasks: [
                            { title: 'Search LinkedIn for "Founder raising pre-seed"', taskType: 'action', duration: '1 hour' },
                            { title: 'Send 10 personalized pitch messages', taskType: 'action', duration: '1.5 hours' }
                        ]
                    }
                ]
            },
            
            // Video & Media
            { 
                title: "Short-Form Content Agency", 
                description: "Edit engaging Reels and Shorts for YouTubers and Podcasters.", 
                requiredSkills: ["video"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0", 
                category: "Media", 
                demand: "Very High",
                roadmap: [
                    {
                        stageName: 'Develop the Editing Style',
                        description: 'Master fast-paced editing, captions, and sound design.',
                        tasks: [
                            { title: 'Watch tutorial on dynamic Alex Hormozi style captions', taskType: 'video', duration: '45 mins' },
                            { title: 'Edit 3 sample shorts from existing podcasts', taskType: 'action', duration: '4 hours' }
                        ]
                    },
                    {
                        stageName: 'Pitching Creators',
                        description: 'Reach out to creators with free samples.',
                        tasks: [
                            { title: 'Identify 10 creators with bad shorts', taskType: 'action', duration: '1 hour' },
                            { title: 'Email them your edited samples for free', taskType: 'action', duration: '1 hour' }
                        ]
                    }
                ]
            },
            { 
                title: "Real Estate Drone Tours", 
                description: "Shoot and edit cinematic property tours for real estate brokers.", 
                requiredSkills: ["video", "business"], 
                investmentLevel: "Small Investment (₹5,000 - ₹20,000)", 
                estimatedCost: "₹15,000", 
                category: "Media Services", 
                demand: "High",
                roadmap: [
                    {
                        stageName: 'Equipment & Rules',
                        description: 'Get the right gear and know the laws.',
                        tasks: [
                            { title: 'Research beginner drone options (e.g., DJI Mini)', taskType: 'reading', duration: '1 hour' },
                            { title: 'Read local drone flying regulations', taskType: 'reading', duration: '30 mins' }
                        ]
                    },
                    {
                        stageName: 'Shooting & Editing',
                        description: 'Create your showreel.',
                        tasks: [
                            { title: 'Shoot 2 local properties for free', taskType: 'action', duration: '1 day' },
                            { title: 'Edit a cinematic 1-minute showreel', taskType: 'video', duration: '3 hours' }
                        ]
                    }
                ]
            },
            
            // Marketing
            { 
                title: "Local SEO Agency", 
                description: "Help local restaurants and clinics rank #1 on Google Maps.", 
                requiredSkills: ["marketing"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0 - ₹1,000", 
                category: "Marketing", 
                demand: "High",
                roadmap: [
                    {
                        stageName: 'Master Google My Business',
                        description: 'Learn the factors that rank a local business.',
                        tasks: [
                            { title: 'Complete Local SEO basics course', taskType: 'video', duration: '2 hours' },
                            { title: 'Learn how to generate and manage reviews', taskType: 'reading', duration: '45 mins' }
                        ]
                    },
                    {
                        stageName: 'Find Unoptimized Businesses',
                        description: 'Get your first client.',
                        tasks: [
                            { title: 'Search "plumbers near me" and find unverified profiles', taskType: 'action', duration: '1 hour' },
                            { title: 'Call 5 businesses to offer free profile audits', taskType: 'action', duration: '2 hours' }
                        ]
                    }
                ]
            },
            { 
                title: "Facebook Ads for Dentists", 
                description: "Run lead generation campaigns for high-paying medical clinics.", 
                requiredSkills: ["marketing", "business"], 
                investmentLevel: "Bootstrap (Under ₹5,000)", 
                estimatedCost: "₹2,500", 
                category: "B2B Service", 
                demand: "Very High",
                roadmap: [
                    {
                        stageName: 'Learn Lead Generation',
                        description: 'Understand the mechanics of Meta Ads for local businesses.',
                        tasks: [
                            { title: 'Watch tutorial on setting up Facebook Lead Forms', taskType: 'video', duration: '1 hour' },
                            { title: 'Create dummy ad copy and creatives for a dentist', taskType: 'interactive', duration: '2 hours' }
                        ]
                    },
                    {
                        stageName: 'Client Acquisition',
                        description: 'Sign your first clinic.',
                        tasks: [
                            { title: 'Build a one-page case study/proposal', taskType: 'reading', duration: '1.5 hours' },
                            { title: 'Visit 3 local clinics and pitch a trial run', taskType: 'action', duration: '1 day' }
                        ]
                    }
                ]
            },
            
            // General Business / Offline
            { 
                title: "High-Protein Cloud Kitchen", 
                description: "Home-based delivery kitchen focusing on gym diets and healthy meals.", 
                requiredSkills: ["business"], 
                investmentLevel: "Small Investment (₹5,000 - ₹20,000)", 
                estimatedCost: "₹18,000", 
                category: "Food & Bev", 
                demand: "Very High",
                roadmap: [
                    {
                        stageName: 'Menu & Costing',
                        description: 'Design a profitable and healthy menu.',
                        tasks: [
                            { title: 'Calculate protein macros for 5 dishes', taskType: 'reading', duration: '2 hours' },
                            { title: 'Create ingredient cost sheet (food cost < 30%)', taskType: 'interactive', duration: '1.5 hours' }
                        ]
                    },
                    {
                        stageName: 'Licensing & Platform Setup',
                        description: 'Get legal and get online.',
                        tasks: [
                            { title: 'Apply for basic FSSAI registration', taskType: 'action', duration: '2 days' },
                            { title: 'Register on Swiggy/Zomato partner apps', taskType: 'action', duration: '1 day' }
                        ]
                    }
                ]
            },
            { 
                title: "Virtual Assistant Firm", 
                description: "Provide administrative, email, and calendar management for busy CEOs.", 
                requiredSkills: ["business", "marketing"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0", 
                category: "B2B Service", 
                demand: "High",
                roadmap: [
                    {
                        stageName: 'Tool Stack Setup',
                        description: 'Learn the tools needed to manage a business remotely.',
                        tasks: [
                            { title: 'Master Google Workspace & Calendars', taskType: 'video', duration: '1 hour' },
                            { title: 'Learn basics of Notion for task tracking', taskType: 'reading', duration: '45 mins' }
                        ]
                    },
                    {
                        stageName: 'Finding Clients',
                        description: 'Market yourself to founders.',
                        tasks: [
                            { title: 'Optimize LinkedIn profile to "Executive VA"', taskType: 'action', duration: '1 hour' },
                            { title: 'Join 3 Facebook/Discord founder groups', taskType: 'action', duration: '30 mins' }
                        ]
                    }
                ]
            },
            { 
                title: "Personal Branding Consultant", 
                description: "Help executives write LinkedIn posts and build an audience online.", 
                requiredSkills: ["marketing", "design"], 
                investmentLevel: "Zero (₹0)", 
                estimatedCost: "₹0", 
                category: "Consulting", 
                demand: "Medium",
                roadmap: [
                    {
                        stageName: 'Build Your Own Brand First',
                        description: 'You cannot sell personal branding without having one.',
                        tasks: [
                            { title: 'Write and schedule 10 LinkedIn posts for yourself', taskType: 'action', duration: '3 hours' },
                            { title: 'Engage with 20 accounts daily for a week', taskType: 'action', duration: '1 week' }
                        ]
                    },
                    {
                        stageName: 'Productize The Service',
                        description: 'Create clear packages for clients.',
                        tasks: [
                            { title: 'Create a "Ghostwriting Package" PDF', taskType: 'reading', duration: '1 hour' },
                            { title: 'Offer 1 free month to a connection for a testimonial', taskType: 'action', duration: '1 hour' }
                        ]
                    }
                ]
            }
        ];

        await BusinessIdea.insertMany(ideas);
        res.status(201).json({ message: 'Success! 🔥 12 Premium Business Ideas (with Roadmaps) database mein save ho gaye.' });

    } catch (error) {
        console.error("Seeding Error:", error);
        res.status(500).json({ message: 'Ideas save karne mein problem aayi' });
    }
};

module.exports = { addSkill, addBusinessIdea, getRecommendations, getAllSkills, getAllBusinessIdeas, getIdeaById, seedBusinessIdeas };