const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// DATABASE CONNECTION (MongoDB)
// ========================================
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/insuranceDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        // Continue without MongoDB - use file storage as fallback
        console.log('⚠️ Using file-based storage as fallback');
    }
};

connectDB();

// ========================================
// FILE STORAGE SETUP (Backup)
// ========================================
const LEADS_FILE = path.join(__dirname, "leads.json");
const NEWSLETTER_FILE = path.join(__dirname, "newsletter.json");

// Create files if missing
if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, "[]");
}
if (!fs.existsSync(NEWSLETTER_FILE)) {
    fs.writeFileSync(NEWSLETTER_FILE, "[]");
}

// ========================================
// MONGODB SCHEMAS (Optional - if MongoDB is available)
// ========================================
let Contact, Newsletter;

try {
    // Define schemas only if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
        const contactSchema = new mongoose.Schema({
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },
            service: { type: String, required: true },
            message: { type: String, required: true },
            status: { type: String, default: 'pending' },
            createdAt: { type: Date, default: Date.now }
        });

        const newsletterSchema = new mongoose.Schema({
            email: { type: String, required: true, unique: true },
            subscribedAt: { type: Date, default: Date.now },
            status: { type: String, default: 'active' }
        });

        Contact = mongoose.model('Contact', contactSchema);
        Newsletter = mongoose.model('Newsletter', newsletterSchema);
        console.log('✅ MongoDB Models Initialized');
    }
} catch (error) {
    console.log('⚠️ MongoDB Models not initialized:', error.message);
}

// ========================================
// HELPER FUNCTIONS
// ========================================

// Validate Indian phone number
const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// Validate email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Save to file storage (backup)
const saveToFile = (filename, data) => {
    try {
        let existingData = [];
        if (fs.existsSync(filename)) {
            existingData = JSON.parse(fs.readFileSync(filename, 'utf8'));
        }
        existingData.push(data);
        fs.writeFileSync(filename, JSON.stringify(existingData, null, 2));
        return true;
    } catch (error) {
        console.error(`Error saving to ${filename}:`, error);
        return false;
    }
};

// ========================================
// API HEALTH CHECK
// ========================================
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running",
        timestamp: new Date(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        endpoints: [
            '/api/contact/submit',
            '/api/contact/all',
            '/api/contact/:id/status',
            '/api/newsletter/subscribe',
            '/api/calculate/home-loan',
            '/api/calculate/sip',
            '/api/calculate/emi',
            '/api/ai/ask',
            '/api/admin/stats'
        ]
    });
});

// ========================================
// CONTACT FORM API
// ========================================

// Submit contact form
app.post("/api/contact/submit", async (req, res) => {
    try {
        const { name, phone, email, service, message } = req.body;

        // Validation
        if (!name || !phone || !email || !service || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!validatePhone(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit Indian mobile number"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        const leadData = {
            name,
            phone,
            email,
            service,
            message,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Try MongoDB first
        if (Contact) {
            try {
                const contact = new Contact(leadData);
                await contact.save();
                console.log('✅ Lead saved to MongoDB');
            } catch (mongoError) {
                console.error('❌ MongoDB save failed:', mongoError.message);
                // Fallback to file storage
                saveToFile(LEADS_FILE, leadData);
            }
        } else {
            // Fallback to file storage
            saveToFile(LEADS_FILE, leadData);
        }

        // Generate WhatsApp link
        const whatsappLink = `https://api.whatsapp.com/send?phone=919137426363&text=*New Lead Received!*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service:* ${service}%0A*Message:* ${message}%0A%0A_Please contact immediately._`;

        res.status(201).json({
            success: true,
            message: "Thank you! Our team will contact you within 24 hours.",
            whatsapp: whatsappLink,
            data: leadData
        });

    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
});

// Get all leads
app.get("/api/contact/all", async (req, res) => {
    try {
        let leads = [];

        // Try MongoDB first
        if (Contact) {
            try {
                leads = await Contact.find().sort({ createdAt: -1 });
                console.log(`✅ Retrieved ${leads.length} leads from MongoDB`);
            } catch (mongoError) {
                console.error('❌ MongoDB fetch failed:', mongoError.message);
            }
        }

        // If no MongoDB results, try file storage
        if (leads.length === 0) {
            try {
                if (fs.existsSync(LEADS_FILE)) {
                    leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
                    // Sort by date descending
                    leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    console.log(`✅ Retrieved ${leads.length} leads from file storage`);
                }
            } catch (fileError) {
                console.error('❌ File read failed:', fileError.message);
            }
        }

        res.json({
            success: true,
            count: leads.length,
            data: leads
        });

    } catch (error) {
        console.error("Get leads error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch leads"
        });
    }
});

// Update lead status
app.patch("/api/contact/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'contacted', 'resolved'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        // Try MongoDB first
        if (Contact) {
            try {
                const contact = await Contact.findByIdAndUpdate(
                    id,
                    { status, updatedAt: new Date() },
                    { new: true }
                );
                
                if (contact) {
                    return res.json({
                        success: true,
                        message: "Status updated successfully",
                        data: contact
                    });
                }
            } catch (mongoError) {
                console.error('❌ MongoDB update failed:', mongoError.message);
            }
        }

        // If MongoDB fails, try file storage
        if (fs.existsSync(LEADS_FILE)) {
            const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
            const leadIndex = leads.findIndex(l => l._id === id || l.id === id);
            
            if (leadIndex !== -1) {
                leads[leadIndex].status = status;
                leads[leadIndex].updatedAt = new Date().toISOString();
                fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
                
                return res.json({
                    success: true,
                    message: "Status updated successfully",
                    data: leads[leadIndex]
                });
            }
        }

        res.status(404).json({
            success: false,
            message: "Lead not found"
        });

    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update status"
        });
    }
});

// Delete lead
app.delete("/api/contact/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Try MongoDB first
        if (Contact) {
            try {
                const contact = await Contact.findByIdAndDelete(id);
                if (contact) {
                    return res.json({
                        success: true,
                        message: "Lead deleted successfully"
                    });
                }
            } catch (mongoError) {
                console.error('❌ MongoDB delete failed:', mongoError.message);
            }
        }

        // Try file storage
        if (fs.existsSync(LEADS_FILE)) {
            const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
            const filteredLeads = leads.filter(l => l._id !== id && l.id !== id);
            
            if (filteredLeads.length < leads.length) {
                fs.writeFileSync(LEADS_FILE, JSON.stringify(filteredLeads, null, 2));
                return res.json({
                    success: true,
                    message: "Lead deleted successfully"
                });
            }
        }

        res.status(404).json({
            success: false,
            message: "Lead not found"
        });

    } catch (error) {
        console.error("Delete lead error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete lead"
        });
    }
});

// ========================================
// NEWSLETTER API
// ========================================

app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        const subscriberData = {
            email,
            status: 'active',
            subscribedAt: new Date().toISOString()
        };

        // Try MongoDB first
        if (Newsletter) {
            try {
                // Check if already subscribed
                const existing = await Newsletter.findOne({ email });
                if (existing) {
                    if (existing.status === 'active') {
                        return res.status(400).json({
                            success: false,
                            message: "This email is already subscribed"
                        });
                    } else {
                        existing.status = 'active';
                        await existing.save();
                        return res.json({
                            success: true,
                            message: "Welcome back! Your subscription has been reactivated."
                        });
                    }
                }

                const subscriber = new Newsletter(subscriberData);
                await subscriber.save();
                console.log('✅ Newsletter subscriber saved to MongoDB');
                
                return res.status(201).json({
                    success: true,
                    message: "Successfully subscribed to newsletter!"
                });
            } catch (mongoError) {
                console.error('❌ MongoDB newsletter save failed:', mongoError.message);
            }
        }

        // Fallback to file storage
        saveToFile(NEWSLETTER_FILE, subscriberData);
        
        res.status(201).json({
            success: true,
            message: "Successfully subscribed to newsletter! (Demo mode)"
        });

    } catch (error) {
        console.error("Newsletter error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to subscribe. Please try again."
        });
    }
});

// Get all newsletter subscribers
app.get("/api/newsletter/all", async (req, res) => {
    try {
        let subscribers = [];

        if (Newsletter) {
            try {
                subscribers = await Newsletter.find({ status: 'active' }).sort({ subscribedAt: -1 });
            } catch (mongoError) {
                console.error('❌ MongoDB fetch failed:', mongoError.message);
            }
        }

        if (subscribers.length === 0 && fs.existsSync(NEWSLETTER_FILE)) {
            subscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf8'));
        }

        res.json({
            success: true,
            count: subscribers.length,
            data: subscribers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch subscribers"
        });
    }
});

// ========================================
// CALCULATOR APIS
// ========================================

// Home Loan EMI Calculator
app.post("/api/calculate/home-loan", (req, res) => {
    try {
        const { amount, tenure, rate } = req.body;
        
        const loanAmount = parseFloat(amount) || 5000000;
        const years = parseFloat(tenure) || 20;
        const interestRate = parseFloat(rate) || 8.5;
        
        const monthlyRate = interestRate / 12 / 100;
        const months = years * 12;
        
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                    (Math.pow(1 + monthlyRate, months) - 1);
        
        const totalPayment = emi * months;
        const totalInterest = totalPayment - loanAmount;

        // Bank comparisons
        const banks = [
            { name: 'SBI', rate: 8.4, emi: calculateEMI(loanAmount, 8.4, years) },
            { name: 'HDFC', rate: 8.5, emi: calculateEMI(loanAmount, 8.5, years) },
            { name: 'ICICI', rate: 8.6, emi: calculateEMI(loanAmount, 8.6, years) },
            { name: 'Axis', rate: 8.55, emi: calculateEMI(loanAmount, 8.55, years) },
            { name: 'LIC Housing', rate: 8.45, emi: calculateEMI(loanAmount, 8.45, years) }
        ];

        res.json({
            success: true,
            data: {
                emi: Math.round(emi),
                totalInterest: Math.round(totalInterest),
                totalPayment: Math.round(totalPayment),
                monthlyRate: (monthlyRate * 100).toFixed(4) + '%',
                banks: banks.sort((a, b) => a.emi - b.emi)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "EMI calculation failed"
        });
    }
});

// SIP Calculator
app.post("/api/calculate/sip", (req, res) => {
    try {
        const { amount, years, rate } = req.body;
        
        const sipAmount = parseFloat(amount) || 10000;
        const investmentYears = parseFloat(years) || 15;
        const expectedRate = parseFloat(rate) || 12;
        
        const monthlyRate = expectedRate / 12 / 100;
        const months = investmentYears * 12;
        
        // CORRECT SIP FORMULA: FV = P × [ (1 + i)^n - 1 ] × (1 + i) / i
        const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const totalInvestment = sipAmount * months;
        const estimatedReturns = futureValue - totalInvestment;

        res.json({
            success: true,
            data: {
                futureValue: Math.round(futureValue),
                totalInvestment: Math.round(totalInvestment),
                estimatedReturns: Math.round(estimatedReturns),
                expectedReturn: expectedRate,
                months: months
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "SIP calculation failed"
        });
    }
});

// EMI Calculator (General)
app.post("/api/calculate/emi", (req, res) => {
    try {
        const { amount, months, rate } = req.body;
        
        const loanAmount = parseFloat(amount) || 500000;
        const tenureMonths = parseFloat(months) || 60;
        const interestRate = parseFloat(rate) || 10.5;
        
        const monthlyRate = interestRate / 12 / 100;
        
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        
        const totalPayment = emi * tenureMonths;
        const totalInterest = totalPayment - loanAmount;

        res.json({
            success: true,
            data: {
                emi: Math.round(emi),
                totalInterest: Math.round(totalInterest),
                totalPayment: Math.round(totalPayment),
                monthlyRate: (monthlyRate * 100).toFixed(4) + '%'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "EMI calculation failed"
        });
    }
});

// Helper function for EMI calculation
function calculateEMI(principal, rate, years) {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
}

// ========================================
// AI ASSISTANT API
// ========================================

app.post("/api/ai/ask", (req, res) => {
    try {
        const { query } = req.body;
        
        let response = '';
        const q = query.toLowerCase();

        if (q.includes('home loan') || q.includes('house loan')) {
            response = `🏠 **Home Loan Guide**
            
📊 **Current Best Rates:**
• SBI: 8.40% (Women: 8.35%)
• HDFC: 8.50%
• ICICI: 8.60%
• Axis: 8.55%

💰 **EMI Example:**
₹50L for 20 years at 8.5% = ₹43,391/month

✅ **Eligibility:**
• Age: 21-65 years
• Income: ₹25,000+ monthly
• CIBIL: 750+

📝 **Documents:**
• Aadhaar, PAN
• Salary slips (6 months)
• Bank statements (6 months)`;

        } else if (q.includes('sip')) {
            response = `💰 **SIP Investment Guide**

📈 **Power of Compounding:**
• ₹10,000/month for 20 years @12% = ₹99.9 Lakhs
• ₹10,000/month for 30 years @12% = ₹3.52 Crores

🎯 **Top Funds:**
• Large Cap: Mirae Asset Large Cap (14%)
• Mid Cap: Kotak Emerging Equity (17%)
• Small Cap: Nippon India Small Cap (20%)

💡 **Pro Tips:**
✓ Start early, stay invested
✓ Increase SIP by 10% yearly
✓ Don't stop during market dips`;

        } else if (q.includes('insurance')) {
            response = `🛡️ **Insurance Guide**

**Term Insurance:**
• Coverage: 15-20x annual income
• ₹1Cr cover @ age 30 = ₹10-15k/year

**Health Insurance:**
• Individual: ₹10-15L coverage
• Family: ₹20-25L for family of 4

**Tax Benefits:**
• 80C: Life insurance premiums
• 80D: Health insurance (₹25k/₹50k)`;

        } else if (q.includes('tax')) {
            response = `📋 **Tax Saving Guide 2025-26**

💰 **Section 80C (₹1.5L):**
• ELSS: 12-15% returns, 3y lock-in ⭐ BEST
• PPF: 7.1% tax-free, 15y
• NPS: Additional ₹50k under 80CCD(1B)

🩺 **Section 80D:**
• Self + Family: ₹25,000
• Parents (Senior): ₹50,000

🏠 **Section 24(b):**
• Home Loan Interest: ₹2,00,000`;

        } else {
            response = `👋 Hello! I'm your AI Financial Assistant.

I can help you with:
• 🏠 **Home Loans** - Rates, EMI, eligibility
• 💰 **SIP Investments** - Returns, top funds
• 🛡️ **Insurance** - Term, health, tax benefits
• 📋 **Tax Planning** - 80C, 80D strategies

What would you like to know about?`;
        }

        res.json({
            success: true,
            response,
            timestamp: new Date()
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "AI assistant error"
        });
    }
});

// ========================================
// ADMIN STATS API
// ========================================

app.get("/api/admin/stats", async (req, res) => {
    try {
        let totalLeads = 0;
        let pendingLeads = 0;
        let totalSubscribers = 0;

        // Get lead stats
        if (Contact) {
            try {
                totalLeads = await Contact.countDocuments();
                pendingLeads = await Contact.countDocuments({ status: 'pending' });
            } catch (mongoError) {
                console.error('❌ MongoDB stats error:', mongoError.message);
            }
        }

        // Get subscriber stats
        if (Newsletter) {
            try {
                totalSubscribers = await Newsletter.countDocuments({ status: 'active' });
            } catch (mongoError) {
                console.error('❌ MongoDB subscriber stats error:', mongoError.message);
            }
        }

        // Fallback to file stats
        if (totalLeads === 0 && fs.existsSync(LEADS_FILE)) {
            const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
            totalLeads = leads.length;
            pendingLeads = leads.filter(l => (l.status || 'pending') === 'pending').length;
        }

        if (totalSubscribers === 0 && fs.existsSync(NEWSLETTER_FILE)) {
            const subscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf8'));
            totalSubscribers = subscribers.length;
        }

        res.json({
            success: true,
            data: {
                totalLeads,
                pendingLeads,
                totalSubscribers,
                todayLeads: 0, // Would need date-based query
                recentLeads: [] // Would need to fetch recent leads
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch stats"
        });
    }
});

// ========================================
// SERVE STATIC FILES
// ========================================
app.use(express.static(path.join(__dirname)));

// ========================================
// ROOT ROUTE
// ========================================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ========================================
// 404 HANDLER
// ========================================
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        availableEndpoints: [
            "/api/health",
            "/api/contact/submit",
            "/api/contact/all",
            "/api/contact/:id/status",
            "/api/contact/:id",
            "/api/newsletter/subscribe",
            "/api/newsletter/all",
            "/api/calculate/home-loan",
            "/api/calculate/sip",
            "/api/calculate/emi",
            "/api/ai/ask",
            "/api/admin/stats"
        ]
    });
});

// ========================================
// ERROR HANDLING MIDDLEWARE
// ========================================
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
    console.log("\n" + "=".repeat(50));
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log("=".repeat(50));
    console.log(`📁 File storage: leads.json, newsletter.json`);
    console.log(`📊 MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log("=".repeat(50));
    console.log(`📝 API Endpoints:`);
    console.log(`   POST   /api/contact/submit`);
    console.log(`   GET    /api/contact/all`);
    console.log(`   PATCH  /api/contact/:id/status`);
    console.log(`   DELETE /api/contact/:id`);
    console.log(`   POST   /api/newsletter/subscribe`);
    console.log(`   GET    /api/newsletter/all`);
    console.log(`   POST   /api/calculate/home-loan`);
    console.log(`   POST   /api/calculate/sip`);
    console.log(`   POST   /api/calculate/emi`);
    console.log(`   POST   /api/ai/ask`);
    console.log(`   GET    /api/admin/stats`);
    console.log(`   GET    /api/health`);
    console.log("=".repeat(50) + "\n");
});

// ========================================
// GRACEFUL SHUTDOWN
// ========================================
process.on('SIGINT', async () => {
    console.log('\n👋 Shutting down server...');
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed');
    }
    process.exit(0);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
});
