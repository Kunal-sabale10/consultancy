// ========================================
// ENHANCED AI FINANCIAL ASSISTANT
// ========================================

// Wait for DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script loaded - Initializing...');
    
    // Initialize all components
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initChatbot();
    initCalculators();
    initContactForm();
    initNewsletter();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    console.log('✅ All components initialized successfully!');
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
function initHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileBtn || !navLinks) return;
    
    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !mobileBtn.contains(event.target)) {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('nav a, .smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Close mobile menu
                    const navLinks = document.getElementById('navLinks');
                    const mobileBtn = document.getElementById('mobileMenuBtn');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const icon = mobileBtn?.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
function initScrollReveal() {
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    setTimeout(revealOnScroll, 100);
}

// ========================================
// AI CHATBOT
// ========================================
function initChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    
    if (!chatMessages || !chatInput || !sendMessageBtn) {
        console.warn('⚠️ Chatbot elements not found');
        return;
    }
    
    // AI Response Database
    const aiResponses = {
        'house loan': getHomeLoanResponse(),
        'home loan': getHomeLoanResponse(),
        'sip': getSIPResponse(),
        'sip calculator': getSIPResponse(),
        'mutual fund': getMutualFundResponse(),
        'insurance': getInsuranceResponse(),
        'tax': getTaxResponse(),
        'hello': getGreetingResponse(),
        'hi': getGreetingResponse(),
        'help': getHelpResponse(),
        'emi': getEMIResponse(),
        'rate': getRateResponse(),
        'interest': getRateResponse()
    };
    
    function getHomeLoanResponse() {
        return `🏠 **HOME LOAN GUIDE**

**📊 Current Best Rates:**
• SBI: 8.40% (Women: 8.35%)
• HDFC: 8.50% 
• ICICI: 8.60%
• Axis: 8.55%

**💰 EMI Example:**
₹50L for 20 years at 8.5% = ₹43,391/month

**✅ Eligibility:**
• Age: 21-65 years
• Income: ₹25,000+ monthly
• CIBIL Score: 750+

**📝 Documents:**
• Aadhaar, PAN Card
• Salary slips (6 months)
• Bank statements (6 months)
• Property papers

Use our calculator above for exact figures!`;
    }
    
    function getSIPResponse() {
        return `💰 **SIP INVESTMENT GUIDE**

**📈 Power of Compounding:**
• ₹10,000/month for 20 years at 12% = ₹99.9 Lakhs
• ₹10,000/month for 30 years at 12% = ₹3.52 Crores

**🎯 Top Funds 2026:**
• Large Cap: Mirae Asset Large Cap (14% returns)
• Mid Cap: Kotak Emerging Equity (17% returns)
• Small Cap: Nippon India Small Cap (20% returns)
• Flexi Cap: Parag Parikh Flexi Cap (16% returns)

**💡 Pro Tips:**
✓ Start early, stay invested
✓ Increase SIP by 10% yearly
✓ Don't stop during market dips
✓ Review portfolio every 6 months

Try our SIP calculator above!`;
    }
    
    function getMutualFundResponse() {
        return `📊 **MUTUAL FUNDS GUIDE**

**🔍 Types of Mutual Funds:**

1. **Equity Funds** (High Risk, High Return)
   • Large Cap: 12-15% returns
   • Mid Cap: 15-18% returns
   • Small Cap: 18-22% returns

2. **Debt Funds** (Low Risk, Stable)
   • Liquid Funds: 6-7% returns
   • Gilt Funds: 7-8% returns
   • Corporate Bonds: 8-9% returns

3. **Hybrid Funds** (Moderate Risk)
   • Balanced Advantage: 10-12% returns
   • Aggressive Hybrid: 11-14% returns

**💰 Tax on Mutual Funds:**
• Equity: 10% LTCG > ₹1L
• Debt: As per income slab

Want specific fund recommendations?`;
    }
    
    function getInsuranceResponse() {
        return `🛡️ **INSURANCE GUIDE**

**1. TERM INSURANCE**
• Coverage: 15-20x annual income
• Premium: ₹10-15k/year for ₹1Cr (age 30)
• Top: LIC Tech Term, HDFC Click2Protect

**2. HEALTH INSURANCE**
• Individual: ₹10-15L coverage
• Family: ₹20-25L for family of 4
• Top: Star Health, HDFC Ergo

**3. Tax Benefits:**
• 80C: Life insurance premiums
• 80D: Health insurance (₹25k self, ₹50k parents)

Need a personalized quote? Contact us!`;
    }
    
    function getTaxResponse() {
        return `📋 **TAX SAVING GUIDE 2025-26**

**💰 Section 80C (₹1.5L):**
• ELSS: 3 years lock-in, 12-15% returns ⭐ BEST
• PPF: 15 years, 7.1% tax-free
• NPS: Additional ₹50k under 80CCD(1B)
• Tax-saving FD: 5 years lock-in

**🩺 Section 80D (Health Insurance):**
• Self + Family: Up to ₹25,000
• Parents (Senior): Up to ₹50,000
• Preventive Check-up: ₹5,000

**🏠 Section 24(b):**
• Home Loan Interest: Up to ₹2,00,000

**💡 Smart Strategy:**
Start tax planning in April, not March!`;
    }
    
    function getGreetingResponse() {
        return `Hello! 👋 I'm your AI Financial Assistant. I can help you with:

🏠 **Home Loans** - Rates, EMI, eligibility
💰 **SIP Investments** - Returns, top funds
📊 **Mutual Funds** - Types, returns, taxation
🛡️ **Insurance** - Term, health, tax benefits
📋 **Tax Planning** - 80C, 80D strategies

What would you like to know about?`;
    }
    
    function getHelpResponse() {
        return `🔍 **I CAN HELP WITH:**

🏠 **HOME LOANS**
• Current interest rates (SBI: 8.40%, HDFC: 8.50%)
• EMI calculation for any amount
• Eligibility criteria & documents
• Bank comparisons

💰 **SIP INVESTMENTS**
• Calculate returns for any amount/tenure
• Best performing mutual funds
• Portfolio allocation strategies
• Tax-saving ELSS funds

🛡️ **INSURANCE**
• Term insurance coverage calculator
• Health insurance plans comparison
• Tax benefits under 80C & 80D

📋 **TAX SAVING**
• Section 80C investment options
• ELSS vs PPF vs NPS comparison
• Home loan tax benefits

**Ask me anything specific!**`;
    }
    
    function getEMIResponse() {
        return `📱 **EMI CALCULATOR**

**Formula:** EMI = P × R × (1+R)^N / [(1+R)^N - 1]

**Example:**
Loan: ₹50,00,000
Rate: 8.5% 
Tenure: 20 years
👉 EMI = ₹43,391/month

**Quick Approximations:**
• ₹10L @ 8.5% for 20y = ₹8,678/month
• ₹30L @ 8.5% for 20y = ₹26,035/month
• ₹50L @ 8.5% for 20y = ₹43,391/month
• ₹75L @ 8.5% for 20y = ₹65,087/month

Use our EMI calculator above for exact figures!`;
    }
    
    function getRateResponse() {
        return `📊 **CURRENT INTEREST RATES (Feb 2026)**

**🏠 HOME LOANS:**
• SBI: 8.40% - 8.90%
• HDFC: 8.50% - 9.00%  
• ICICI: 8.60% - 9.10%
• Axis: 8.55% - 9.05%

**💰 PERSONAL LOANS:**
• SBI: 10.50% - 12.50%
• HDFC: 10.75% - 15.00%
• ICICI: 11.00% - 16.00%

**🚗 CAR LOANS:**
• SBI: 8.50% - 9.50%
• HDFC: 8.75% - 9.75%

**💵 FIXED DEPOSITS (1 year):**
• SBI: 6.50%
• HDFC: 6.75%
• ICICI: 6.70%

*Rates subject to change. Contact bank for exact offers.*`;
    }
    
    function getAIResponse(message) {
        message = message.toLowerCase();
        
        // Check for keywords
        for (const [keyword, response] of Object.entries(aiResponses)) {
            if (message.includes(keyword)) {
                return response;
            }
        }
        
        // Check for calculation requests
        if (message.includes('calculate') || message.includes('emi for')) {
            return getEMIResponse();
        }
        
        // Default response
        return `I understand you're asking about "${message.substring(0, 50)}..."

I can help you with:
• Home loan EMI & interest rates
• SIP investment returns
• Mutual fund recommendations
• Insurance planning
• Tax saving strategies

Please ask a specific question! 🤝`;
    }
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // Format the message
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\n/g, '<br>');
        text = text.replace(/•/g, '•');
        text = text.replace(/✓/g, '✓');
        
        messageDiv.innerHTML = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message');
        typingIndicator.innerHTML = '<i class="fas fa-ellipsis-h"></i> Analyzing...';
        typingIndicator.id = 'typingIndicator';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI thinking
        setTimeout(() => {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.remove();
            
            const response = getAIResponse(message);
            addMessage(response);
            
            // Optional: Send to backend API
            sendToAIAPI(message, response);
        }, 800);
    }
    
    // Optional: Send to backend
    function sendToAIAPI(query, response) {
        fetch('/api/ai/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, response })
        }).catch(err => console.log('AI API log failed:', err));
    }
    
    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Welcome message
    setTimeout(() => {
        addMessage("👋 Hello! I'm your AI Financial Assistant. Ask me about home loans, SIP investments, mutual funds, or tax saving!");
    }, 500);
}

// ========================================
// CALCULATORS - FIXED WITH CORRECT IDS
// ========================================
function initCalculators() {
    // Check which calculator structure exists
    if (document.getElementById('loanAmount')) {
        initHomeLoanCalculator();
    } else if (document.getElementById('homeAmount')) {
        initHomeLoanCalculatorAlt();
    }
    
    if (document.getElementById('sipAmount')) {
        initSIPCalculator();
    } else if (document.getElementById('sipAmount')) {
        initSIPCalculatorAlt();
    }
    
    if (document.getElementById('emiLoanAmount')) {
        initEMICalculator();
    } else if (document.getElementById('emiAmount')) {
        initEMICalculatorAlt();
    }
}

// ========================================
// HOME LOAN CALCULATOR - ORIGINAL IDS
// ========================================
function initHomeLoanCalculator() {
    console.log('🏠 Initializing Home Loan Calculator (Original)');
    
    const loanAmount = document.getElementById('loanAmount');
    const loanAmountRange = document.getElementById('loanAmountRange');
    const loanTenure = document.getElementById('loanTenure');
    const loanTenureRange = document.getElementById('loanTenureRange');
    const interestRate = document.getElementById('interestRate');
    
    if (loanAmountRange) {
        loanAmountRange.addEventListener('input', function() {
            if (loanAmount) loanAmount.value = this.value;
            calculateHomeLoan();
        });
    }
    
    if (loanAmount) {
        loanAmount.addEventListener('input', function() {
            if (loanAmountRange) loanAmountRange.value = this.value;
            calculateHomeLoan();
        });
    }
    
    if (loanTenureRange) {
        loanTenureRange.addEventListener('input', function() {
            if (loanTenure) loanTenure.value = this.value;
            calculateHomeLoan();
        });
    }
    
    if (loanTenure) {
        loanTenure.addEventListener('input', function() {
            if (loanTenureRange) loanTenureRange.value = this.value;
            calculateHomeLoan();
        });
    }
    
    if (interestRate) {
        interestRate.addEventListener('input', calculateHomeLoan);
    }
    
    // Calculate on load
    setTimeout(calculateHomeLoan, 100);
}

function calculateHomeLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount')?.value) || 5000000;
    const tenure = parseFloat(document.getElementById('loanTenure')?.value) || 20;
    const rate = parseFloat(document.getElementById('interestRate')?.value) || 8.5;
    
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    
    // EMI Formula
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    // Update results
    const emiElement = document.getElementById('emiAmount');
    const interestElement = document.getElementById('totalInterest');
    const paymentElement = document.getElementById('totalPayment');
    
    if (emiElement) emiElement.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    if (interestElement) interestElement.textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    if (paymentElement) paymentElement.textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
    
    // Update bank comparison
    updateBankComparison(loanAmount, tenure);
}

// ========================================
// HOME LOAN CALCULATOR - ALTERNATE IDS (FROM INDEX.HTML)
// ========================================
function initHomeLoanCalculatorAlt() {
    console.log('🏠 Initializing Home Loan Calculator (Alternate)');
    
    const homeAmount = document.getElementById('homeAmount');
    const homeAmountRange = document.getElementById('homeAmountRange');
    const homeYears = document.getElementById('homeYears');
    const homeYearsRange = document.getElementById('homeYearsRange');
    const homeRate = document.getElementById('homeRate');
    
    if (homeAmountRange) {
        homeAmountRange.addEventListener('input', function() {
            if (homeAmount) homeAmount.value = this.value;
            calculateHomeLoanAlt();
        });
    }
    
    if (homeAmount) {
        homeAmount.addEventListener('input', function() {
            if (homeAmountRange) homeAmountRange.value = this.value;
            calculateHomeLoanAlt();
        });
    }
    
    if (homeYearsRange) {
        homeYearsRange.addEventListener('input', function() {
            if (homeYears) homeYears.value = this.value;
            calculateHomeLoanAlt();
        });
    }
    
    if (homeYears) {
        homeYears.addEventListener('input', function() {
            if (homeYearsRange) homeYearsRange.value = this.value;
            calculateHomeLoanAlt();
        });
    }
    
    if (homeRate) {
        homeRate.addEventListener('input', calculateHomeLoanAlt);
    }
    
    setTimeout(calculateHomeLoanAlt, 100);
}

function calculateHomeLoanAlt() {
    const loanAmount = parseFloat(document.getElementById('homeAmount')?.value) || 5000000;
    const tenure = parseFloat(document.getElementById('homeYears')?.value) || 20;
    const rate = parseFloat(document.getElementById('homeRate')?.value) || 8.5;
    
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    document.getElementById('homeEMI').textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    document.getElementById('homeInterest').textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    document.getElementById('homeTotal').textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
}

// ========================================
// BANK COMPARISON
// ========================================
function updateBankComparison(loanAmount, tenure) {
    const banks = [
        { name: 'SBI', rate: 8.4, id: 'sbiEMI' },
        { name: 'HDFC', rate: 8.5, id: 'hdfcEMI' },
        { name: 'ICICI', rate: 8.6, id: 'iciciEMI' },
        { name: 'Axis', rate: 8.55, id: 'axisEMI' }
    ];
    
    banks.forEach(bank => {
        const element = document.getElementById(bank.id);
        if (element) {
            const monthlyRate = bank.rate / 12 / 100;
            const months = tenure * 12;
            const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                       (Math.pow(1 + monthlyRate, months) - 1);
            element.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
        }
    });
}

// ========================================
// SIP CALCULATOR - ORIGINAL IDS
// ========================================
function initSIPCalculator() {
    console.log('💰 Initializing SIP Calculator (Original)');
    
    const sipAmount = document.getElementById('sipAmount');
    const sipAmountRange = document.getElementById('sipAmountRange');
    const sipTenure = document.getElementById('sipTenure');
    const sipTenureRange = document.getElementById('sipTenureRange');
    const sipReturn = document.getElementById('sipReturn');
    
    if (sipAmountRange) {
        sipAmountRange.addEventListener('input', function() {
            if (sipAmount) sipAmount.value = this.value;
            calculateSIP();
        });
    }
    
    if (sipAmount) {
        sipAmount.addEventListener('input', function() {
            if (sipAmountRange) sipAmountRange.value = this.value;
            calculateSIP();
        });
    }
    
    if (sipTenureRange) {
        sipTenureRange.addEventListener('input', function() {
            if (sipTenure) sipTenure.value = this.value;
            calculateSIP();
        });
    }
    
    if (sipTenure) {
        sipTenure.addEventListener('input', function() {
            if (sipTenureRange) sipTenureRange.value = this.value;
            calculateSIP();
        });
    }
    
    if (sipReturn) {
        sipReturn.addEventListener('input', calculateSIP);
    }
    
    setTimeout(calculateSIP, 100);
}

function calculateSIP() {
    const sipAmount = parseFloat(document.getElementById('sipAmount')?.value) || 10000;
    const tenure = parseFloat(document.getElementById('sipTenure')?.value) || 15;
    const rate = parseFloat(document.getElementById('sipReturn')?.value) || 12;
    
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    
    // CORRECT SIP FORMULA
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = sipAmount * months;
    const estimatedReturns = futureValue - totalInvestment;
    
    document.getElementById('totalInvestment').textContent = '₹' + Math.round(totalInvestment).toLocaleString('en-IN');
    document.getElementById('estimatedReturns').textContent = '₹' + Math.round(estimatedReturns).toLocaleString('en-IN');
    document.getElementById('totalValue').textContent = '₹' + Math.round(futureValue).toLocaleString('en-IN');
}

// ========================================
// SIP CALCULATOR - ALTERNATE IDS
// ========================================
function initSIPCalculatorAlt() {
    console.log('💰 Initializing SIP Calculator (Alternate)');
    
    const sipAmount = document.getElementById('sipAmount');
    const sipAmountRange = document.getElementById('sipAmountRange');
    const sipYears = document.getElementById('sipYears');
    const sipYearsRange = document.getElementById('sipYearsRange');
    const sipRate = document.getElementById('sipRate');
    
    if (sipAmountRange) {
        sipAmountRange.addEventListener('input', function() {
            if (sipAmount) sipAmount.value = this.value;
            calculateSIPAlt();
        });
    }
    
    if (sipAmount) {
        sipAmount.addEventListener('input', function() {
            if (sipAmountRange) sipAmountRange.value = this.value;
            calculateSIPAlt();
        });
    }
    
    if (sipYearsRange) {
        sipYearsRange.addEventListener('input', function() {
            if (sipYears) sipYears.value = this.value;
            calculateSIPAlt();
        });
    }
    
    if (sipYears) {
        sipYears.addEventListener('input', function() {
            if (sipYearsRange) sipYearsRange.value = this.value;
            calculateSIPAlt();
        });
    }
    
    if (sipRate) {
        sipRate.addEventListener('input', calculateSIPAlt);
    }
    
    setTimeout(calculateSIPAlt, 100);
}

function calculateSIPAlt() {
    const sipAmount = parseFloat(document.getElementById('sipAmount')?.value) || 10000;
    const years = parseFloat(document.getElementById('sipYears')?.value) || 15;
    const rate = parseFloat(document.getElementById('sipRate')?.value) || 12;
    
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = sipAmount * months;
    const estimatedReturns = futureValue - totalInvestment;
    
    document.getElementById('sipTotalInvestment').textContent = '₹' + Math.round(totalInvestment).toLocaleString('en-IN');
    document.getElementById('sipReturns').textContent = '₹' + Math.round(estimatedReturns).toLocaleString('en-IN');
    document.getElementById('sipTotal').textContent = '₹' + Math.round(futureValue).toLocaleString('en-IN');
}

// ========================================
// EMI CALCULATOR - ORIGINAL
// ========================================
function initEMICalculator() {
    console.log('📱 Initializing EMI Calculator');
    
    const emiLoanAmount = document.getElementById('emiLoanAmount');
    const emiTenure = document.getElementById('emiTenure');
    const emiInterestRate = document.getElementById('emiInterestRate');
    
    if (emiLoanAmount) emiLoanAmount.addEventListener('input', calculateEMI);
    if (emiTenure) emiTenure.addEventListener('input', calculateEMI);
    if (emiInterestRate) emiInterestRate.addEventListener('input', calculateEMI);
    
    setTimeout(calculateEMI, 100);
}

function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('emiLoanAmount')?.value) || 500000;
    const months = parseFloat(document.getElementById('emiTenure')?.value) || 60;
    const rate = parseFloat(document.getElementById('emiInterestRate')?.value) || 10.5;
    
    const monthlyRate = rate / 12 / 100;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    document.getElementById('monthlyEMI').textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    document.getElementById('totalEMIInterest').textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    document.getElementById('totalEMIPayment').textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
}

// ========================================
// EMI CALCULATOR - ALTERNATE
// ========================================
function initEMICalculatorAlt() {
    console.log('📱 Initializing EMI Calculator (Alternate)');
    
    const emiAmount = document.getElementById('emiAmount');
    const emiMonths = document.getElementById('emiMonths');
    const emiRate = document.getElementById('emiRate');
    
    if (emiAmount) emiAmount.addEventListener('input', calculateEMIAlt);
    if (emiMonths) emiMonths.addEventListener('input', calculateEMIAlt);
    if (emiRate) emiRate.addEventListener('input', calculateEMIAlt);
    
    setTimeout(calculateEMIAlt, 100);
}

function calculateEMIAlt() {
    const loanAmount = parseFloat(document.getElementById('emiAmount')?.value) || 500000;
    const months = parseFloat(document.getElementById('emiMonths')?.value) || 60;
    const rate = parseFloat(document.getElementById('emiRate')?.value) || 10.5;
    
    const monthlyRate = rate / 12 / 100;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    document.getElementById('emiMonthly').textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    document.getElementById('emiInterest').textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    document.getElementById('emiTotal').textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
}

// ========================================
// TAB SWITCHING
// ========================================
function showCalculator(calculatorType) {
    // Hide all calculators
    document.querySelectorAll('.calculator-container, .calculator-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected calculator
    const calculator = document.getElementById(calculatorType + '-calc');
    if (calculator) calculator.classList.add('active');
    
    // Activate clicked tab
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || document.getElementById('cName')?.value;
        const phone = document.getElementById('phone')?.value || document.getElementById('cPhone')?.value;
        const email = document.getElementById('email')?.value || document.getElementById('cEmail')?.value;
        const service = document.getElementById('service')?.value || document.getElementById('cService')?.value;
        const message = document.getElementById('message')?.value || document.getElementById('cMessage')?.value;
        
        if (!name || !phone || !email || !service || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit Indian mobile number');
            return;
        }
        
        // Email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Submit to backend
        fetch('/api/contact/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email, service, message })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('✅ Thank you! Our team will contact you within 24 hours.');
                contactForm.reset();
            } else {
                alert('❌ ' + data.message);
            }
        })
        .catch(err => {
            console.error('Contact form error:', err);
            alert('✅ Thank you! (Demo mode) Our team will contact you soon.');
            contactForm.reset();
        });
    });
}

// ========================================
// NEWSLETTER
// ========================================
function initNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter button, #subscribeBtn');
    if (!newsletterBtn) return;
    
    newsletterBtn.addEventListener('click', function() {
        const emailInput = document.getElementById('newsletterEmail');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        const emailRegex = /^\S+@\S+\.\S+$/;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Submit to backend
        fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('✅ Thank you! You have subscribed to our newsletter.');
                emailInput.value = '';
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error('Newsletter error:', err);
            alert('✅ Thank you for subscribing! (Demo mode)');
            emailInput.value = '';
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatCurrency(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function getMonthlyRate(annualRate) {
    return annualRate / 12 / 100;
}

// Navigation functions
function goContact() {
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
}

function goToAI() {
    const ai = document.getElementById('ai-assistant');
    if (ai) ai.scrollIntoView({ behavior: 'smooth' });
}

// Legacy support
window.showCalculator = showCalculator;
window.calculateHomeLoan = calculateHomeLoan;
window.calculateSIP = calculateSIP;
window.calculateEMI = calculateEMI;
window.setInterestRate = function(rate) {
    const el = document.getElementById('interestRate') || document.getElementById('homeRate');
    if (el) {
        el.value = rate;
        calculateHomeLoan();
        calculateHomeLoanAlt();
    }
};
window.setSIPReturn = function(rate) {
    const el = document.getElementById('sipReturn') || document.getElementById('sipRate');
    if (el) {
        el.value = rate;
        calculateSIP();
        calculateSIPAlt();
    }
};
window.setEMIRate = function(rate) {
    const el = document.getElementById('emiInterestRate') || document.getElementById('emiRate');
    if (el) {
        el.value = rate;
        calculateEMI();
        calculateEMIAlt();
    }
};
window.sendAdvanced = function() {
    const form = document.getElementById('contactForm');
    if (form) form.dispatchEvent(new Event('submit'));
};
window.subscribeNewsletter = initNewsletter;
window.goContact = goContact;
window.goToAI = goToAI;
