
// Enhanced AI Financial Assistant with Detailed Information
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                const navLinks = document.getElementById('navLinks');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('#mobileMenuBtn i').classList.remove('fa-times');
                    document.querySelector('#mobileMenuBtn i').classList.add('fa-bars');
                }
            }
        }
    });
});

// Scroll reveal animation
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

// ========================================
// AI FINANCIAL ASSISTANT - CHATBOT
// ========================================

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessage');

// Enhanced AI Responses with Detailed Information
const aiResponses = {
    'house loan': `🏠 **COMPREHENSIVE HOUSE LOAN GUIDE**

**📊 Current Market Rates (2026):**
• SBI: 8.40% - 8.90% p.a.
• HDFC: 8.50% - 9.00% p.a.
• ICICI: 8.60% - 9.10% p.a.
• Axis: 8.55% - 9.05% p.a.
• LIC Housing: 8.45% - 8.95% p.a.

**💰 EMI Formula:**
EMI = [P × R × (1+R)^N] / [(1+R)^N-1]

Would you like me to calculate your specific EMI?`,

    'sip calculator': `💰 **SIP MASTER GUIDE**

**📈 SIP Returns Formula:**
FV = P × [ (1 + i)^n - 1 ] / i

**🔥 Top SIP Categories:**
1. Large Cap Funds (12-15% returns)
2. Mid Cap Funds (15-18% returns)
3. Small Cap Funds (18-22% returns)

Would you like me to calculate your SIP returns?`,

    'best bank offers': `🏆 **BEST BANK OFFERS 2026**

**🏠 HOME LOAN:**
• SBI: 8.40% (Women: 8.35%)
• HDFC: 8.45% for first 3 years

**💰 PERSONAL LOAN:**
• SBI Xpress Credit: 10.50% onwards
• HDFC Pre-approved: 10.75% onwards`,

    'hello': `Hello! I'm your AI Financial Assistant. I can help you with:

🏠 House Loans - Rates, eligibility, EMI
💰 SIP Calculations - Returns, best funds
🏦 Bank Offers - Latest promotions
📊 Credit Score - Check for free
🏢 Partners - Insurance companies

What would you like to know?`,

    'hi': `Hi! Ask me about:
• House loan EMI
• SIP returns
• Bank comparisons
• Credit score
• Insurance partners`,

    'help': `I can help you with:
🔍 House Loans - Rates, EMI, eligibility
📈 SIP Investments - Calculator, funds
🏦 Banking Products - Loans, offers
📊 Credit Score - Check for free
🏢 Insurance Partners - LIC, HDFC, Star Health`,

    'partners': `🏢 **OUR INSURANCE PARTNERS**

**Life Insurance:**
• LIC of India - Top Partner
• HDFC Life - Term & ULIP Plans
• ICICI Prudential - Life & Savings
• Max Life - Retirement Solutions
• SBI Life - Smart Elite Plans

**Health Insurance:**
• Star Health - India's #1 Health Insurer
• Apollo Munich - Comprehensive Health
• Care Health - Critical Illness
• Niva Bupa - International Coverage

**General Insurance:**
• New India Assurance - Motor & Property
• ICICI Lombard - Home & Travel
• Digit Insurance - Cyber & Gadget`,

    'credit score': `📊 **FREE CREDIT SCORE CHECKER**

Check your estimated CIBIL score instantly!

**Score Ranges:**
• 750-900: Excellent - Best rates
• 700-749: Good - Easy approval
• 650-699: Fair - Moderate rates
• 550-649: Poor - Need improvement
• Below 550: Very Poor - Action required

**Try our Credit Score Checker below!** 👇`,

    'cibil': `📊 **CIBIL SCORE CHECKER**

Check your free CIBIL score now!
Scroll down to the "Credit Score Checker" section. 👇`
};

aiResponses['home loan'] = aiResponses['house loan'];
aiResponses['sip'] = aiResponses['sip calculator'];
aiResponses['our partners'] = aiResponses['partners'];
aiResponses['insurance partners'] = aiResponses['partners'];
aiResponses['check credit'] = aiResponses['credit score'];

// Function to get AI response
function getAIResponse(userMessage) {
    userMessage = userMessage.toLowerCase().trim();
    
    for (const [keyword, response] of Object.entries(aiResponses)) {
        if (userMessage.includes(keyword)) {
            return response;
        }
    }
    
    if (userMessage.includes('emi') || userMessage.includes('calculate')) {
        return `📱 **EMI CALCULATOR**

EMI = [P × R × (1+R)^N] / [(1+R)^N-1]

Example: ₹50L loan, 8.5%, 20 years = ₹43,391/month

Use our EMI Calculator above!`;
    }
    
    if (userMessage.includes('rate') || userMessage.includes('interest')) {
        return `📊 **CURRENT RATES (2026)**

🏠 Home Loan: 8.40% - 9.10%
💰 Personal Loan: 10.50% - 16.00%
🚗 Car Loan: 8.50% - 10.50%`;
    }
    
    return `I can help you with:
1️⃣ House loans - Type "home loan"
2️⃣ SIP calculator - Type "sip"
3️⃣ Credit score - Type "credit score"
4️⃣ Bank offers - Type "bank offers"
5️⃣ Our partners - Type "partners"`;
}

// Chat functionality
function addMessage(text, isUser = false) {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message');
        typingIndicator.innerHTML = '<i class="fas fa-ellipsis-h"></i> Typing...';
        typingIndicator.id = 'typingIndicator';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            const response = getAIResponse(message);
            addMessage(response);
        }, 1000);
    }
}

// ========================================
// CALCULATOR FUNCTIONS
// ========================================

function showCalculator(calculatorType) {
    document.querySelectorAll('.calculator-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const calcElement = document.getElementById(calculatorType + '-calc');
    if (calcElement) {
        calcElement.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Home Loan Calculator
if (document.getElementById('loanAmountRange')) {
    document.getElementById('loanAmountRange').addEventListener('input', function() {
        document.getElementById('loanAmount').value = this.value;
        calculateHomeLoan();
    });
}

if (document.getElementById('loanAmount')) {
    document.getElementById('loanAmount').addEventListener('input', function() {
        document.getElementById('loanAmountRange').value = this.value;
        calculateHomeLoan();
    });
}

if (document.getElementById('loanTenureRange')) {
    document.getElementById('loanTenureRange').addEventListener('input', function() {
        document.getElementById('loanTenure').value = this.value;
        calculateHomeLoan();
    });
}

if (document.getElementById('loanTenure')) {
    document.getElementById('loanTenure').addEventListener('input', function() {
        document.getElementById('loanTenureRange').value = this.value;
        calculateHomeLoan();
    });
}

function setInterestRate(rate) {
    const rateInput = document.getElementById('interestRate');
    if (rateInput) {
        rateInput.value = rate;
        calculateHomeLoan();
    }
}

function calculateHomeLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount')?.value) || 5000000;
    const tenure = parseFloat(document.getElementById('loanTenure')?.value) || 20;
    const rate = parseFloat(document.getElementById('interestRate')?.value) || 8.5;
    
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    const emiElement = document.getElementById('emiAmount');
    const interestElement = document.getElementById('totalInterest');
    const paymentElement = document.getElementById('totalPayment');
    
    if (emiElement) emiElement.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    if (interestElement) interestElement.textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    if (paymentElement) paymentElement.textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
    
    updateBankComparison(loanAmount, tenure);
}

function updateBankComparison(loanAmount, tenure) {
    const banks = [
        { name: 'SBI', rate: 8.4, elementId: 'sbiEMI' },
        { name: 'HDFC', rate: 8.5, elementId: 'hdfcEMI' },
        { name: 'ICICI', rate: 8.6, elementId: 'iciciEMI' },
        { name: 'Axis', rate: 8.55, elementId: 'axisEMI' }
    ];
    
    banks.forEach(bank => {
        const monthlyRate = bank.rate / 12 / 100;
        const months = tenure * 12;
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
        
        const emiElement = document.getElementById(bank.elementId);
        if (emiElement) {
            emiElement.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
        }
    });
}

// SIP Calculator
if (document.getElementById('sipAmountRange')) {
    document.getElementById('sipAmountRange').addEventListener('input', function() {
        document.getElementById('sipAmount').value = this.value;
        calculateSIP();
    });
}

if (document.getElementById('sipAmount')) {
    document.getElementById('sipAmount').addEventListener('input', function() {
        document.getElementById('sipAmountRange').value = this.value;
        calculateSIP();
    });
}

if (document.getElementById('sipTenureRange')) {
    document.getElementById('sipTenureRange').addEventListener('input', function() {
        document.getElementById('sipTenure').value = this.value;
        calculateSIP();
    });
}

if (document.getElementById('sipTenure')) {
    document.getElementById('sipTenure').addEventListener('input', function() {
        document.getElementById('sipTenureRange').value = this.value;
        calculateSIP();
    });
}

function setSIPReturn(rate) {
    const returnInput = document.getElementById('sipReturn');
    if (returnInput) {
        returnInput.value = rate;
        calculateSIP();
    }
}

function calculateSIP() {
    const sipAmount = parseFloat(document.getElementById('sipAmount')?.value) || 10000;
    const tenure = parseFloat(document.getElementById('sipTenure')?.value) || 15;
    const rate = parseFloat(document.getElementById('sipReturn')?.value) || 12;
    
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = sipAmount * months;
    const estimatedReturns = futureValue - totalInvestment;
    
    const investmentElement = document.getElementById('totalInvestment');
    const returnsElement = document.getElementById('estimatedReturns');
    const valueElement = document.getElementById('totalValue');
    
    if (investmentElement) investmentElement.textContent = '₹' + Math.round(totalInvestment).toLocaleString('en-IN');
    if (returnsElement) returnsElement.textContent = '₹' + Math.round(estimatedReturns).toLocaleString('en-IN');
    if (valueElement) valueElement.textContent = '₹' + Math.round(futureValue).toLocaleString('en-IN');
}

// EMI Calculator
function setEMIRate(rate) {
    const rateInput = document.getElementById('emiInterestRate');
    if (rateInput) {
        rateInput.value = rate;
        calculateEMI();
    }
}

function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('emiLoanAmount')?.value) || 500000;
    const tenure = parseFloat(document.getElementById('emiTenure')?.value) || 60;
    const rate = parseFloat(document.getElementById('emiInterestRate')?.value) || 10.5;
    
    const monthlyRate = rate / 12 / 100;
    const months = tenure;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    const emiElement = document.getElementById('monthlyEMI');
    const interestElement = document.getElementById('totalEMIInterest');
    const paymentElement = document.getElementById('totalEMIPayment');
    
    if (emiElement) emiElement.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    if (interestElement) interestElement.textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    if (paymentElement) paymentElement.textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
}

// ========================================
// AI INVESTMENT PREDICTOR
// ========================================

function analyzeInvestment() {
    const age = parseInt(document.getElementById('age')?.value) || 30;
    const income = parseInt(document.getElementById('income')?.value) || 1000000;
    const investment = parseInt(document.getElementById('investment')?.value) || 10000;
    const risk = document.getElementById('risk')?.value || 'medium';
    const horizon = parseInt(document.getElementById('horizon')?.value) || 10;
    
    if (age < 18 || age > 80) {
        alert('Please enter a valid age between 18 and 80.');
        return;
    }
    
    if (investment < 1000) {
        alert('Minimum monthly investment should be ₹1,000.');
        return;
    }
    
    let riskScore = 50;
    if (risk === 'low') riskScore = 30;
    else if (risk === 'medium') riskScore = 65;
    else if (risk === 'high') riskScore = 85;
    
    if (age < 30) riskScore += 10;
    else if (age > 50) riskScore -= 15;
    
    if (horizon > 15) riskScore += 10;
    else if (horizon < 5) riskScore -= 15;
    
    riskScore = Math.max(20, Math.min(95, riskScore));
    
    const expectedReturn = riskScore / 100 * 15 + 5;
    const monthlyRate = expectedReturn / 12 / 100;
    const months = horizon * 12;
    
    const futureValue = investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    let equityPercent, debtPercent, othersPercent;
    let strategy = "";
    
    if (riskScore < 40) {
        equityPercent = 30;
        debtPercent = 60;
        othersPercent = 10;
        strategy = "Conservative - Capital preservation";
    } else if (riskScore < 70) {
        equityPercent = 60;
        debtPercent = 35;
        othersPercent = 5;
        strategy = "Balanced - Growth with stability";
    } else {
        equityPercent = 80;
        debtPercent = 15;
        othersPercent = 5;
        strategy = "Aggressive - Maximum growth";
    }
    
    document.getElementById('riskScore').textContent = riskScore;
    
    const riskLevel = document.getElementById('riskLevel');
    if (riskLevel) riskLevel.style.width = riskScore + '%';
    
    const resultDiv = document.getElementById('recommendationDetails');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="margin-bottom: 25px;">
                <h4 style="color: #00c853;">📊 Investment Profile</h4>
                <p><strong>Strategy:</strong> ${strategy}</p>
            </div>
            
            <h4>🎯 Portfolio Allocation</h4>
            <div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
                <div style="background: #2962ff; color: white; padding: 20px; border-radius: 10px; flex: 1;">
                    <h5>Equity</h5>
                    <p style="font-size: 28px; font-weight: bold;">${equityPercent}%</p>
                </div>
                <div style="background: #00c853; color: white; padding: 20px; border-radius: 10px; flex: 1;">
                    <h5>Debt</h5>
                    <p style="font-size: 28px; font-weight: bold;">${debtPercent}%</p>
                </div>
                <div style="background: #ff6b6b; color: white; padding: 20px; border-radius: 10px; flex: 1;">
                    <h5>Others</h5>
                    <p style="font-size: 28px; font-weight: bold;">${othersPercent}%</p>
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px;">
                <h4>💰 Projected Value</h4>
                <div style="text-align: center;">
                    <div style="font-size: 36px; font-weight: bold; color: #00c853;">
                        ₹${Math.round(futureValue).toLocaleString('en-IN')}
                    </div>
                    <p>After ${horizon} years | Monthly: ₹${investment.toLocaleString('en-IN')}</p>
                    <p>Expected Return: ${expectedReturn.toFixed(1)}% p.a.</p>
                </div>
            </div>
        `;
    }
    
    const predictorResult = document.getElementById('predictorResult');
    if (predictorResult) predictorResult.style.display = 'block';
}

// ========================================
// CONTACT FORM FUNCTIONS
// ========================================

function sendAdvanced() {
    const name = document.getElementById('cName')?.value.trim();
    const phone = document.getElementById('cPhone')?.value.trim();
    const email = document.getElementById('cEmail')?.value.trim();
    const service = document.getElementById('cService')?.value;
    const message = document.getElementById('cMessage')?.value.trim();
    
    if (!name || !phone || !email || !service || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit Indian mobile number.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert(`✅ Thank you ${name}! Our expert will contact you at ${phone} within 30 minutes.`);
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.reset();
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail')?.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const emailInput = document.getElementById('newsletterEmail');
    if (emailInput) emailInput.value = '';
    alert(`Thank you! You've subscribed to our financial newsletter.`);
}

function goContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function goToAI() {
    const aiSection = document.getElementById('ai-assistant');
    if (aiSection) {
        aiSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// CREDIT SCORE CHECKER - SINGLE VERSION
// ========================================

function calculateAge(dob) {
    if (!dob) return 30;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function checkCreditScore() {
    const name = document.getElementById('csName')?.value.trim();
    const pan = document.getElementById('csPan')?.value.trim().toUpperCase();
    const dob = document.getElementById('csDob')?.value;
    const mobile = document.getElementById('csMobile')?.value.trim();
    const income = document.getElementById('csIncome')?.value;
    const loans = document.getElementById('csLoans')?.value;
    const cardUsage = document.getElementById('csCardUsage')?.value;
    const consent = document.getElementById('csConsent')?.checked;
    
    if (!name || !pan || !dob || !mobile || !income || !consent) {
        alert('Please fill all fields and agree to terms');
        return;
    }
    
    if (pan.length !== 10) {
        alert('Enter valid 10-digit PAN number');
        return;
    }
    
    if (mobile.length !== 10 || !/^[6-9]\d{9}$/.test(mobile)) {
        alert('Enter valid 10-digit Indian mobile number');
        return;
    }
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
    btn.disabled = true;
    
    setTimeout(() => {
        let score = 750;
        
        const incomeVal = parseInt(income);
        if (incomeVal >= 100000) score += 45;
        else if (incomeVal >= 75000) score += 30;
        else if (incomeVal >= 50000) score += 15;
        else if (incomeVal <= 25000) score -= 25;
        
        const usageVal = parseInt(cardUsage);
        if (usageVal === 20) score += 40;
        else if (usageVal === 50) score += 10;
        else if (usageVal === 70) score -= 30;
        else if (usageVal === 90) score -= 60;
        else if (usageVal === 0) score -= 15;
        
        const loanCount = parseInt(loans);
        if (loanCount === 0) score -= 10;
        else if (loanCount === 1) score += 25;
        else if (loanCount === 2) score += 10;
        else if (loanCount >= 3) score -= 35;
        
        const age = calculateAge(dob);
        if (age >= 30 && age <= 50) score += 20;
        else if (age < 25) score -= 15;
        
        score += Math.floor(Math.random() * 11) - 5;
        score = Math.min(900, Math.max(300, score));
        score = Math.round(score / 5) * 5;
        
        let rating, color;
        if (score >= 750) { rating = 'Excellent'; color = '#00c853'; }
        else if (score >= 700) { rating = 'Good'; color = '#2962ff'; }
        else if (score >= 650) { rating = 'Fair'; color = '#ff6b00'; }
        else if (score >= 550) { rating = 'Poor'; color = '#ff3d00'; }
        else { rating = 'Very Poor'; color = '#d32f2f'; }
        
        const scoreValue = document.getElementById('scoreValue');
        const scoreRating = document.getElementById('scoreRating');
        const scoreCircle = document.getElementById('scoreCircle');
        const scoreMeterFill = document.getElementById('scoreMeterFill');
        const scoreBreakdown = document.getElementById('scoreBreakdown');
        const scoreRecommendations = document.getElementById('scoreRecommendations');
        const creditScoreResult = document.getElementById('creditScoreResult');
        
        if (scoreValue) scoreValue.textContent = score;
        if (scoreRating) {
            scoreRating.textContent = rating;
            scoreRating.style.color = color;
        }
        if (scoreCircle) scoreCircle.style.borderColor = color;
        if (scoreMeterFill) {
            scoreMeterFill.style.width = ((score - 300) / 600 * 100) + '%';
            scoreMeterFill.style.background = color;
        }
        
        let breakdown = [];
        if (score >= 750) {
            breakdown = ['✓ Excellent credit - Top 25% of Indians', '✓ Instant loan approvals', '✓ Best interest rates'];
        } else if (score >= 700) {
            breakdown = ['✓ Good credit - Above average', '✓ Easy loan approvals', '✓ Competitive rates'];
        } else if (score >= 650) {
            breakdown = ['⚠ Fair credit - Needs work', '⚠ May need extra documents', '⚠ Moderate rates'];
        } else {
            breakdown = ['⚠ Poor credit - Action needed', '⚠ May need collateral', '⚠ Higher rates'];
        }
        
        if (scoreBreakdown) {
            scoreBreakdown.innerHTML = breakdown.map(item => {
                const icon = item.includes('✓') ? 'fa-check-circle' : 'fa-exclamation-circle';
                const iconColor = item.includes('✓') ? '#00c853' : '#ff6b00';
                return `<li><i class="fas ${icon}" style="color: ${iconColor}"></i> ${item.replace('✓ ', '').replace('⚠ ', '')}</li>`;
            }).join('');
        }
        
        let recommendations = [];
        if (score >= 700) {
            recommendations = ['Keep credit utilization below 30%', 'Pay bills on time', 'Avoid multiple applications'];
        } else if (score >= 650) {
            recommendations = ['Reduce credit card usage', 'Clear outstanding balances', 'Wait 3 months for new credit'];
        } else {
            recommendations = ['Pay all pending bills', 'Get a secured credit card', 'Consult our experts free'];
        }
        
        if (scoreRecommendations) {
            scoreRecommendations.innerHTML = recommendations.map(item => 
                `<li><i class="fas fa-arrow-up" style="color: ${color}"></i> ${item}</li>`
            ).join('');
        }
        
        if (creditScoreResult) creditScoreResult.style.display = 'block';
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        
    }, 1500);
}

function downloadCreditReport() {
    const name = document.getElementById('csName')?.value.trim() || 'Customer';
    const score = document.getElementById('scoreValue')?.textContent || '750';
    const rating = document.getElementById('scoreRating')?.textContent || 'Good';
    
    alert(`📄 Credit Report for ${name}\n\nCIBIL Score: ${score} (${rating})\n\nA detailed report will be sent to your email within 5 minutes.`);
}

// ========================================
// INITIALIZE EVERYTHING ON LOAD
// ========================================

window.addEventListener('load', function() {
    // Initialize calculators
    calculateHomeLoan();
    calculateSIP();
    calculateEMI();
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = currentYear;
    
    // Initialize chat with welcome message
    if (chatMessages && chatMessages.children.length === 0) {
        addMessage("Welcome to Anagh Financial AI Assistant! 🎯\n\nI can help you with:\n• House loan calculations\n• SIP investment planning\n• Bank offer comparisons\n• Credit score checking\n• Insurance partners\n\nTry asking me specific questions!");
    }
});

// Helper functions
function formatCurrency(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function getMonthlyRate(annualRate) {
    return annualRate / 12 / 100;
}

// PAN input auto-formatting
document.addEventListener('DOMContentLoaded', function() {
    const panInput = document.getElementById('csPan');
    if (panInput) {
        panInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }
    
    const mobileInput = document.getElementById('csMobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
});
function sendAdvanced() {

const name = document.getElementById("cName").value;
const phone = document.getElementById("cPhone").value;
const email = document.getElementById("cEmail").value;
const service = document.getElementById("cService").value;
const message = document.getElementById("cMessage").value;

fetch("http://localhost:5000/contact", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
name,
phone,
email,
service,
message
})
})
.then(r => r.json())
.then(data => {
alert("Lead Saved!");
window.open(data.whatsapp, "_blank");
});
}


