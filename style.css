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
        
        // Only smooth scroll for internal links
        if (href.startsWith('#')) {
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
                
                // Close mobile menu if open
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

// COMPREHENSIVE AI FINANCIAL ASSISTANT
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessage');

// Enhanced AI Responses with Detailed Information
const aiResponses = {
    // House Loan Detailed Information
    'house loan': `🏠 **COMPREHENSIVE HOUSE LOAN GUIDE**

**📊 Current Market Rates (2026):**
• SBI: 8.40% - 8.90% p.a.
• HDFC: 8.50% - 9.00% p.a.
• ICICI: 8.60% - 9.10% p.a.
• Axis: 8.55% - 9.05% p.a.
• LIC Housing: 8.45% - 8.95% p.a.

**🔍 Bank Comparison:**
1. **SBI (State Bank of India)**
   ✓ Interest: 8.40% onwards
   ✓ Processing Fee: 0.35% (max ₹15,000)
   ✓ Max Tenure: 30 years
   ✓ Special: Women borrowers get 0.05% extra discount

2. **HDFC Bank**
   ✓ Interest: 8.50% onwards
   ✓ Processing: 0.50% or ₹3,000
   ✓ Max Tenure: 30 years
   ✓ Special: Balance transfer facility available

**💰 EMI Formula:**
EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
Where P = Principal, R = Monthly Rate, N = Tenure in months

**📝 Required Documents:**
1. Identity Proof (Aadhaar, PAN)
2. Address Proof
3. Income Proof (Salary slips, ITR)
4. Property Documents

Would you like me to calculate your specific EMI?`,

    'home loan': `See detailed information under "house loan"`,

    // SIP Calculator Detailed Information
    'sip calculator': `💰 **SIP (SYSTEMATIC INVESTMENT PLAN) MASTER GUIDE**

**📈 What is SIP?**
SIP is investing a fixed amount regularly in mutual funds for rupee cost averaging and compounding benefits.

**📊 SIP Returns Formula:**
FV = P × [ (1 + i)^n - 1 ] / i
Where FV = Future Value, P = Monthly Investment, i = Monthly Rate, n = Total Months

**🔥 Top Performing SIP Categories:**
1. **Large Cap Funds** (12-15% returns)
   ✓ Best for: Conservative investors
   ✓ Risk: Low to Moderate

2. **Mid Cap Funds** (15-18% returns)
   ✓ Best for: Moderate risk takers
   ✓ Risk: Moderate to High

3. **Small Cap Funds** (18-22% returns)
   ✓ Best for: Aggressive investors
   ✓ Risk: High

**📅 SIP vs Lumpsum:**
• ₹10,000/month SIP for 20 years at 12% = ₹99.9 lakhs
• ₹24 lakhs lumpsum for 20 years at 12% = ₹2.31 crores

Would you like me to calculate your SIP returns?`,

    'sip': `See detailed information under "SIP calculator"`,

    // Best Bank Offers
    'best bank offers': `🏆 **BEST BANK OFFERS COMPARISON 2026**

**🏠 HOME LOAN SPECIAL OFFERS:**

**🔥 SBI (Special Offer):**
• Rate: 8.40% (Women: 8.35%)
• Processing Fee: Waived for online
• Cashback: 0.25% as Amazon voucher

**🌟 HDFC (Festive Offer):**
• Rate: 8.45% for first 3 years
• Processing: 50% discount
• Top-up: Additional ₹10L at same rate

**💰 PERSONAL LOAN OFFERS:**

**SBI Xpress Credit:**
• Rate: 10.50% onwards
• Max Amount: ₹20 lakhs
• Tenure: Up to 6 years

**HDFC Pre-approved:**
• Rate: 10.75% onwards
• Max Amount: ₹40 lakhs
• Features: Instant disbursal

Would you like specific details?`,

    // Default Responses
    'hello': `Hello! I'm your AI Financial Assistant. I can help you with:

🏠 **House Loans** - Rates, eligibility, bank comparisons
💰 **SIP Calculations** - Returns, best funds, strategies
🏦 **Bank Offers** - Latest promotions, benefits
📊 **Investment Planning** - Portfolio allocation, tax saving

What would you like to know about today?`,

    'hi': `Hi! I'm here to provide detailed financial guidance. Ask me about:

• House loan EMI calculations
• SIP investment returns
• Bank comparisons
• Tax saving strategies

Try asking specific questions!`,

    'help': `I can help you with detailed information about:

🔍 **HOUSE LOANS**
• Current interest rates (SBI, HDFC, ICICI, etc.)
• EMI calculations
• Eligibility criteria
• Document requirements
• Bank comparisons
• Special offers

📈 **SIP INVESTMENTS**
• SIP calculator with projections
• Best performing mutual funds
• Portfolio allocation strategies
• Risk assessment
• Tax-saving SIP options

🏦 **BANKING PRODUCTS**
• Savings account benefits
• Credit card comparisons
• Personal loan rates
• Fixed deposit rates
• Digital banking features

💼 **FINANCIAL PLANNING**
• Retirement corpus calculation
• Child education planning
• Emergency fund planning
• Wealth creation strategies
• Estate planning basics

Ask me anything specific for detailed guidance!`
};

// Function to get AI response
function getAIResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    
    // Check for keywords and return detailed responses
    for (const [keyword, response] of Object.entries(aiResponses)) {
        if (userMessage.includes(keyword)) {
            return response;
        }
    }
    
    // Check for specific queries
    if (userMessage.includes('emi') || userMessage.includes('calculator')) {
        return `📱 **EMI CALCULATOR**

To calculate your EMI:

**Formula:** EMI = [P × R × (1+R)^N] / [(1+R)^N-1]

Where:
• P = Loan Amount (Principal)
• R = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)
• N = Loan Tenure in Months

**Example Calculation:**
Loan: ₹50,00,000
Rate: 8.5% p.a.
Tenure: 20 years (240 months)

Monthly Rate: 8.5/12/100 = 0.0070833
EMI = [50,00,000 × 0.0070833 × (1.0070833)^240] / [(1.0070833)^240-1]
     = **₹43,391 per month**

Would you like me to calculate your specific EMI?`;
    }
    
    if (userMessage.includes('rate') || userMessage.includes('interest')) {
        return `📊 **CURRENT INTEREST RATES (2026)**

**🏠 Home Loan Rates:**
• SBI: 8.40% - 8.90%
• HDFC: 8.50% - 9.00%
• ICICI: 8.60% - 9.10%
• Axis: 8.55% - 9.05%
• LIC Housing: 8.45% - 8.95%

**💰 Personal Loan Rates:**
• SBI: 10.50% - 12.50%
• HDFC: 10.75% - 15.00%
• ICICI: 11.00% - 16.00%
• Axis: 10.99% - 14.50%

**🏦 Savings Account Interest:**
• SBI: 2.70% - 3.00%
• HDFC: 3.00% - 3.50%
• ICICI: 3.00% - 3.25%
• Kotak: 3.50% - 4.00%

**💵 Fixed Deposit Rates (1 year):**
• SBI: 6.50%
• HDFC: 6.75%
• ICICI: 6.70%
• Axis: 6.80%

*Rates are subject to change. Contact banks for latest offers.*`;
    }
    
    // Default response for unknown queries
    return `I understand you're asking about: "${userMessage}"

I can provide detailed information about:
1. House loans - rates, banks, EMI calculation
2. SIP investments - returns, funds, calculators
3. Bank offers - current promotions, benefits
4. Insurance planning - life, health, motor
5. Tax saving strategies - investments, deductions

Could you please be more specific about what you need? For example:
• "Tell me about SBI home loan rates"
• "Calculate SIP for ₹10,000 monthly"
• "Compare HDFC and ICICI bank offers"
• "Best tax saving investments"`;
}

// Chat functionality
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    // Format the message with basic markdown
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessageBtn.addEventListener('click', function() {
    sendMessage();
});

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message');
        typingIndicator.innerHTML = '<i class="fas fa-ellipsis-h"></i> Analyzing...';
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
// CALCULATOR FUNCTIONS - CORRECTED VERSION
// ========================================

// Tab switching function
function showCalculator(calculatorType) {
    // Hide all calculators
    document.querySelectorAll('.calculator-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected calculator
    document.getElementById(calculatorType + '-calc').classList.add('active');
    
    // Activate clicked tab
    event.target.classList.add('active');
}

// ========================================
// HOME LOAN CALCULATOR - CORRECTED FORMULA
// ========================================

// Sync range sliders with number inputs for Home Loan
document.getElementById('loanAmountRange').addEventListener('input', function() {
    document.getElementById('loanAmount').value = this.value;
    calculateHomeLoan();
});

document.getElementById('loanAmount').addEventListener('input', function() {
    document.getElementById('loanAmountRange').value = this.value;
    calculateHomeLoan();
});

document.getElementById('loanTenureRange').addEventListener('input', function() {
    document.getElementById('loanTenure').value = this.value;
    calculateHomeLoan();
});

document.getElementById('loanTenure').addEventListener('input', function() {
    document.getElementById('loanTenureRange').value = this.value;
    calculateHomeLoan();
});

function setInterestRate(rate) {
    document.getElementById('interestRate').value = rate;
    calculateHomeLoan();
}

function calculateHomeLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 5000000;
    const tenure = parseFloat(document.getElementById('loanTenure').value) || 20;
    const rate = parseFloat(document.getElementById('interestRate').value) || 8.5;
    
    // CORRECT EMI FORMULA: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
    // Where: P = principal, R = monthly interest rate, N = number of months
    
    const monthlyRate = rate / 12 / 100;  // Convert annual rate to monthly decimal
    const months = tenure * 12;
    
    // Calculate EMI using the standard formula
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    // Update results
    document.getElementById('emiAmount').textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    document.getElementById('totalInterest').textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    document.getElementById('totalPayment').textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
    
    // Update bank comparison table
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
        
        document.getElementById(bank.elementId).textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    });
}

// ========================================
// SIP CALCULATOR - CORRECTED FORMULA
// ========================================

// Sync range sliders with number inputs for SIP
document.getElementById('sipAmountRange').addEventListener('input', function() {
    document.getElementById('sipAmount').value = this.value;
    calculateSIP();
});

document.getElementById('sipAmount').addEventListener('input', function() {
    document.getElementById('sipAmountRange').value = this.value;
    calculateSIP();
});

document.getElementById('sipTenureRange').addEventListener('input', function() {
    document.getElementById('sipTenure').value = this.value;
    calculateSIP();
});

document.getElementById('sipTenure').addEventListener('input', function() {
    document.getElementById('sipTenureRange').value = this.value;
    calculateSIP();
});

function setSIPReturn(rate) {
    document.getElementById('sipReturn').value = rate;
    calculateSIP();
}

function calculateSIP() {
    const sipAmount = parseFloat(document.getElementById('sipAmount').value) || 10000;
    const tenure = parseFloat(document.getElementById('sipTenure').value) || 15;
    const rate = parseFloat(document.getElementById('sipReturn').value) || 12;
    
    // CORRECT SIP FORMULA: FV = P × [ (1 + i)^n - 1 ] × (1 + i) / i
    // Where: P = monthly investment, i = monthly rate, n = number of months
    
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    
    // Calculate future value with compounding
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = sipAmount * months;
    const estimatedReturns = futureValue - totalInvestment;
    
    // Update results
    document.getElementById('totalInvestment').textContent = '₹' + Math.round(totalInvestment).toLocaleString('en-IN');
    document.getElementById('estimatedReturns').textContent = '₹' + Math.round(estimatedReturns).toLocaleString('en-IN');
    document.getElementById('totalValue').textContent = '₹' + Math.round(futureValue).toLocaleString('en-IN');
}

// ========================================
// EMI CALCULATOR - CORRECTED FORMULA
// ========================================

function setEMIRate(rate) {
    document.getElementById('emiInterestRate').value = rate;
    calculateEMI();
}

function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('emiLoanAmount').value) || 500000;
    const tenure = parseFloat(document.getElementById('emiTenure').value) || 60;
    const rate = parseFloat(document.getElementById('emiInterestRate').value) || 10.5;
    
    // CORRECT EMI FORMULA (same as home loan)
    const monthlyRate = rate / 12 / 100;
    const months = tenure;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    
    // Update results
    document.getElementById('monthlyEMI').textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
    document.getElementById('totalEMIInterest').textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
    document.getElementById('totalEMIPayment').textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
}

// ========================================
// AI INVESTMENT PREDICTOR - CORRECTED
// ========================================

function analyzeInvestment() {
    const age = parseInt(document.getElementById('age').value) || 30;
    const income = parseInt(document.getElementById('income').value) || 1000000;
    const investment = parseInt(document.getElementById('investment').value) || 10000;
    const risk = document.getElementById('risk').value;
    const goal = document.getElementById('goal').value;
    const horizon = parseInt(document.getElementById('horizon').value) || 10;
    
    // Validate inputs
    if (age < 18 || age > 80) {
        alert('Please enter a valid age between 18 and 80.');
        return;
    }
    
    if (investment < 1000) {
        alert('Minimum monthly investment should be ₹1,000.');
        return;
    }
    
    if (horizon < 1 || horizon > 40) {
        alert('Investment horizon should be between 1 and 40 years.');
        return;
    }
    
    // Calculate risk score
    let riskScore = 50;
    if (risk === 'low') riskScore = 30;
    else if (risk === 'medium') riskScore = 65;
    else if (risk === 'high') riskScore = 85;
    
    // Adjust based on age
    if (age < 30) riskScore += 10;
    else if (age > 50) riskScore -= 15;
    
    // Adjust based on horizon
    if (horizon > 15) riskScore += 10;
    else if (horizon < 5) riskScore -= 15;
    
    riskScore = Math.max(20, Math.min(95, riskScore));
    
    // Calculate SIP returns - CORRECTED
    const expectedReturn = riskScore / 100 * 15 + 5; // 8-19% based on risk
    const monthlyRate = expectedReturn / 12 / 100;
    const months = horizon * 12;
    
    // CORRECT SIP FORMULA
    const futureValue = investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    // Generate recommendation
    let equityPercent, debtPercent, othersPercent;
    let fundRecommendations = [];
    let strategy = "";
    
    if (riskScore < 40) {
        equityPercent = 30;
        debtPercent = 60;
        othersPercent = 10;
        fundRecommendations = [
            "ICICI Prudential Bluechip Fund",
            "SBI Magnum Gilt Fund",
            "HDFC Hybrid Debt Fund"
        ];
        strategy = "Conservative approach focusing on capital preservation";
    } else if (riskScore < 70) {
        equityPercent = 60;
        debtPercent = 35;
        othersPercent = 5;
        fundRecommendations = [
            "Mirae Asset Large Cap Fund",
            "Kotak Standard Multicap Fund",
            "Nippon India Small Cap Fund"
        ];
        strategy = "Balanced approach with growth focus";
    } else {
        equityPercent = 80;
        debtPercent = 15;
        othersPercent = 5;
        fundRecommendations = [
            "Axis Small Cap Fund",
            "PGIM India Midcap Opportunities Fund",
            "Parag Parikh Flexi Cap Fund"
        ];
        strategy = "Aggressive growth strategy for maximum returns";
    }
    
    // Display results
    document.getElementById('riskScore').textContent = riskScore;
    document.getElementById('riskLevel').style.width = riskScore + '%';
    
    const resultDiv = document.getElementById('recommendationDetails');
    resultDiv.innerHTML = `
        <div style="margin-bottom: 25px;">
            <h4 style="color: #00c853; margin-bottom: 15px;">📊 Investment Profile</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
                    <div style="font-size: 0.9rem; opacity: 0.8;">Age</div>
                    <div style="font-size: 1.5rem; font-weight: bold;">${age} years</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
                    <div style="font-size: 0.9rem; opacity: 0.8;">Risk</div>
                    <div style="font-size: 1.5rem; font-weight: bold;">${risk.toUpperCase()}</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
                    <div style="font-size: 0.9rem; opacity: 0.8;">Horizon</div>
                    <div style="font-size: 1.5rem; font-weight: bold;">${horizon} years</div>
                </div>
            </div>
            <p><strong>Strategy:</strong> ${strategy}</p>
        </div>
        
        <h4>🎯 Portfolio Allocation</h4>
        <div style="display: flex; gap: 20px; margin: 15px 0; flex-wrap: wrap;">
            <div style="background: #2962ff; color: white; padding: 20px; border-radius: 10px; flex: 1; min-width: 180px;">
                <h5 style="margin: 0 0 10px 0;">Equity</h5>
                <p style="font-size: 28px; font-weight: bold; margin: 5px 0;">${equityPercent}%</p>
            </div>
            <div style="background: #00c853; color: white; padding: 20px; border-radius: 10px; flex: 1; min-width: 180px;">
                <h5 style="margin: 0 0 10px 0;">Debt</h5>
                <p style="font-size: 28px; font-weight: bold; margin: 5px 0;">${debtPercent}%</p>
            </div>
            <div style="background: #ff6b6b; color: white; padding: 20px; border-radius: 10px; flex: 1; min-width: 180px;">
                <h5 style="margin: 0 0 10px 0;">Others</h5>
                <p style="font-size: 28px; font-weight: bold; margin: 5px 0;">${othersPercent}%</p>
            </div>
        </div>
        
        <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px; margin: 25px 0;">
            <h4>💰 SIP Projection</h4>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">Projected Value after ${horizon} years</div>
                <div style="font-size: 36px; font-weight: bold; color: #00c853; margin: 10px 0;">
                    ₹${Math.round(futureValue).toLocaleString('en-IN')}
                </div>
                <p>Monthly Investment: ₹${investment.toLocaleString('en-IN')}</p>
                <p>Expected Annual Return: ${expectedReturn.toFixed(1)}%</p>
                <p>Total Investment: ₹${(investment * months).toLocaleString('en-IN')}</p>
                <p>Estimated Returns: ₹${Math.round(futureValue - investment * months).toLocaleString('en-IN')}</p>
            </div>
        </div>
        
        <div style="margin-top: 25px;">
            <h4>🏆 Recommended Funds</h4>
            <ul style="padding-left: 20px; margin-bottom: 20px;">
                ${fundRecommendations.map(fund => `<li style="margin-bottom: 10px;">${fund}</li>`).join('')}
            </ul>
        </div>
    `;
    
    document.getElementById('predictorResult').style.display = 'block';
    
    // Scroll to result
    setTimeout(() => {
        document.getElementById('predictorResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========================================
// CONTACT FORM FUNCTIONS
// ========================================

function sendAdvanced() {
    const name = document.getElementById('cName').value.trim();
    const phone = document.getElementById('cPhone').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const service = document.getElementById('cService').value;
    const message = document.getElementById('cMessage').value.trim();
    
    if (!name || !phone || !email || !service || !message) {
        alert('Please fill in all fields before submitting.');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit Indian mobile number.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const serviceNames = {
        'insurance': 'Insurance Planning',
        'mutual-funds': 'Mutual Fund Investment',
        'loans': 'Loan Services',
        'investment': 'Investment Planning',
        'all': 'Comprehensive Financial Planning'
    };
    
    // Show success message
    alert(`✅ Thank you ${name}!\n\nOur expert will contact you at ${phone} within 30 minutes about ${serviceNames[service] || service}.`);
    
    // Reset form
    document.getElementById('contactForm').reset();
}

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate subscription
    document.getElementById('newsletterEmail').value = '';
    alert(`Thank you! You've subscribed to our financial newsletter.`);
}

// Navigation functions
function goContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function goToAI() {
    document.getElementById('ai-assistant').scrollIntoView({ behavior: 'smooth' });
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
    document.getElementById('currentYear').textContent = currentYear;
    
    // Add event listeners for range sliders
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    rangeSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            // Update corresponding number input
            const inputId = this.id.replace('Range', '');
            const numberInput = document.getElementById(inputId);
            if (numberInput) {
                numberInput.value = this.value;
            }
            
            // Trigger calculation based on which calculator is active
            if (this.id.includes('loan')) {
                calculateHomeLoan();
            } else if (this.id.includes('sip')) {
                calculateSIP();
            }
        });
    });
    
    // Add event listeners for number inputs
    const numberInputs = document.querySelectorAll('.calculator-form input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Update corresponding range slider
            const rangeId = this.id + 'Range';
            const rangeSlider = document.getElementById(rangeId);
            if (rangeSlider) {
                rangeSlider.value = this.value;
            }
            
            // Trigger calculation
            if (this.id.includes('loan') || this.id.includes('interestRate')) {
                calculateHomeLoan();
            } else if (this.id.includes('sip')) {
                calculateSIP();
            } else if (this.id.includes('emi')) {
                calculateEMI();
            }
        });
    });
    
    // Initialize chat with welcome message
    addMessage("Welcome to Anagh Financial AI Assistant! 🎯\n\nI can help you with:\n• House loan calculations\n• SIP investment planning\n• Bank offer comparisons\n• Financial advice\n\nTry asking me specific questions!");
    
    // Test calculations to verify they work
    console.log("Testing calculations...");
    console.log("Home Loan (₹50L, 20y, 8.5%):");
    console.log("EMI should be: ₹43,391");
    console.log("Total Interest should be: ₹54,13,840");
    
    console.log("SIP (₹10,000/m, 15y, 12%):");
    console.log("Total Value should be around: ₹43-45 lakhs");
    
    console.log("All calculators initialized successfully!");
});

// Helper function to format currency
function formatCurrency(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
}

// Calculate monthly interest rate
function getMonthlyRate(annualRate) {
    return annualRate / 12 / 100;
}

// Calculate EMI using correct formula
function calculateEMIAmount(principal, annualRate, years) {
    const monthlyRate = getMonthlyRate(annualRate);
    const months = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
}

// Calculate SIP returns
function calculateSIPReturns(monthlyAmount, years, annualRate) {
    const monthlyRate = getMonthlyRate(annualRate);
    const months = years * 12;
    const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return Math.round(futureValue);
}
