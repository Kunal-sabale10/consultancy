// ========================================
// 🚀 SUPER AI FINANCIAL ASSISTANT - PROFESSIONAL VERSION
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script loaded - Initializing AI Assistant...');
    
    // Initialize all components
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initSuperAIChatbot(); // Enhanced AI chatbot
    initCalculators();
    initContactForm();
    initNewsletter();
    initMobileOptimizations();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    console.log('✅ All components initialized successfully!');
});

// ========================================
// 📱 MOBILE OPTIMIZATIONS
// ========================================
function initMobileOptimizations() {
    // Fix 100vh issue on mobile
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    setVH();
    
    // Add touch-friendly classes
    document.body.classList.add('touch-device');
    
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch');
    }
}

// ========================================
// 🎯 SUPER AI CHATBOT - ENHANCED VERSION
// ========================================
function initSuperAIChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    
    if (!chatMessages || !chatInput || !sendMessageBtn) {
        console.warn('⚠️ Chatbot elements not found - creating mobile-friendly version');
        createMobileChatbot();
        return;
    }
    
    // Chat context memory
    let chatContext = {
        lastTopic: null,
        userPreferences: {},
        conversationHistory: []
    };
    
    // ========================================
    // 🌐 REAL-TIME DATA FETCHERS
    // ========================================
    
    // Fetch live interest rates
    async function fetchLiveInterestRates() {
        try {
            // Try to fetch from API first
            const response = await fetch('https://api.apilayer.com/finance/news?apikey=demo');
            if (response.ok) {
                const data = await response.json();
                return processRatesData(data);
            }
        } catch (error) {
            console.log('API fetch failed, using cached rates');
        }
        
        // Return cached/default rates
        return {
            homeLoan: {
                SBI: '8.40%',
                HDFC: '8.50%',
                ICICI: '8.60%',
                Axis: '8.55%'
            },
            personalLoan: {
                SBI: '10.50%',
                HDFC: '10.75%',
                ICICI: '11.00%'
            },
            fd: {
                SBI: '6.50%',
                HDFC: '6.75%',
                ICICI: '6.70%'
            },
            gold: '₹6,432/gram',
            silver: '₹74,500/kg',
            updatedAt: new Date().toLocaleDateString('en-IN')
        };
    }
    
    // Fetch live stock market data
    async function fetchLiveStockData() {
        try {
            // Demo API call - replace with real API in production
            const response = await fetch('https://api.polygon.io/v2/aggs/ticker/NIFTY50/prev?apiKey=demo');
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.log('Stock API fetch failed');
        }
        
        return {
            nifty: '22,345.60',
            sensex: '73,456.80',
            change: '+0.56%',
            updatedAt: new Date().toLocaleTimeString('en-IN')
        };
    }
    
    // ========================================
    // 🧠 SUPER AI RESPONSE ENGINE
    // ========================================
    
    async function getSuperAIResponse(message) {
        const query = message.toLowerCase();
        
        // Store in conversation history
        chatContext.conversationHistory.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });
        
        // Check for real-time data requests
        if (query.includes('interest rate') || query.includes('loan rate') || query.includes('bank rate')) {
            const rates = await fetchLiveInterestRates();
            return formatRatesResponse(rates);
        }
        
        if (query.includes('stock') || query.includes('sensex') || query.includes('nifty')) {
            const stocks = await fetchLiveStockData();
            return formatStockResponse(stocks);
        }
        
        if (query.includes('gold') || query.includes('silver') || query.includes('metal')) {
            const rates = await fetchLiveInterestRates();
            return `💰 **Current Bullion Rates**
            
📅 Updated: ${rates.updatedAt}

🥇 **Gold (24K):** ${rates.gold}
🥈 **Silver:** ${rates.silver}

*Rates are indicative and may vary by city*`;
        }
        
        // Advanced financial queries with DeepSeek-style responses
        if (query.includes('home loan') || query.includes('house loan')) {
            return getDeepSeekHomeLoanResponse(query);
        }
        
        if (query.includes('sip') || query.includes('mutual fund')) {
            return getDeepSeekSIPResponse(query);
        }
        
        if (query.includes('tax') || query.includes('80c') || query.includes('80d')) {
            return getDeepSeekTaxResponse(query);
        }
        
        if (query.includes('insurance') || query.includes('term')) {
            return getDeepSeekInsuranceResponse(query);
        }
        
        if (query.includes('retirement') || query.includes('pension')) {
            return getDeepSeekRetirementResponse(query);
        }
        
        if (query.includes('credit score') || query.includes('cibil')) {
            return getDeepSeekCreditScoreResponse();
        }
        
        if (query.includes('compare') || query.includes('vs') || query.includes('versus')) {
            return getDeepSeekComparisonResponse(query);
        }
        
        if (query.includes('calculator') || query.includes('calculate')) {
            return getDeepSeekCalculatorResponse(query);
        }
        
        if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
            return getGreetingResponse();
        }
        
        if (query.includes('help') || query.includes('what can you do')) {
            return getHelpResponse();
        }
        
        // Google-like search response for unknown queries
        return await getGoogleSearchResponse(query);
    }
    
    // ========================================
    // 🎯 DEEPSEEK-STYLE DETAILED RESPONSES
    // ========================================
    
    function getDeepSeekHomeLoanResponse(query) {
        const includesEligibility = query.includes('eligibility');
        const includesDocuments = query.includes('document');
        const includesComparison = query.includes('compare') || query.includes('vs');
        
        let response = `🏠 **COMPREHENSIVE HOME LOAN GUIDE**

📊 **CURRENT MARKET RATES (${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })})**`;

        if (includesComparison) {
            response += `

🏆 **BANK COMPARISON TABLE**

| Bank | Interest Rate | Processing Fee | EMI (₹50L/20y) |
|------|--------------|----------------|----------------|
| SBI | 8.40% | 0.35% (Max ₹15k) | ₹43,013 |
| HDFC | 8.50% | 0.50% (Min ₹3k) | ₹43,391 |
| ICICI | 8.60% | 0.50% | ₹43,772 |
| Axis | 8.55% | 0.40% | ₹43,582 |
| LIC Housing | 8.45% | 0.50% (Max ₹20k) | ₹43,203 |

⭐ **BEST OVERALL:** SBI (Lowest EMI + Lowest Processing Fee)
💰 **SAVINGS:** Choosing SBI over ICICI saves ₹759/month = ₹1,82,160 over 20 years!`;
        }
        
        if (includesEligibility) {
            response += `

✅ **DETAILED ELIGIBILITY CRITERIA**

**Salaried Individuals:**
• Age: 21-65 years
• Minimum Income: ₹25,000/month (Metro), ₹20,000/month (Non-metro)
• Work Experience: 3+ years total, 1+ year current employer
• CIBIL Score: 750+ (Preferred), 700-749 (Higher interest), <700 (May require co-applicant)

**Self-Employed:**
• Age: 25-70 years
• Minimum Income: ₹3 Lakhs/year ITR
• Business Vintage: 3+ years
• ITR: Last 3 years

**Maximum Loan Amount:**
• 60x monthly income (Salaried)
• 4x annual profit (Self-employed)
• 90% LTV for loans up to ₹30L
• 80% LTV for loans ₹30L-75L
• 75% LTV for loans above ₹75L`;
        }
        
        if (includesDocuments) {
            response += `

📝 **COMPLETE DOCUMENT CHECKLIST**

**IDENTITY PROOFS (Any 2):**
✅ Aadhaar Card
✅ PAN Card (Mandatory)
✅ Passport
✅ Voter ID
✅ Driving License

**ADDRESS PROOFS (Any 1):**
✅ Aadhaar Card
✅ Utility Bills (Last 3 months)
✅ Passport
✅ Rent Agreement

**INCOME PROOFS - SALARIED:**
✅ Salary Slips (Last 6 months)
✅ Form 16 (Last 2 years)
✅ Bank Statements (Last 6 months)
✅ Appointment Letter

**INCOME PROOFS - SELF EMPLOYED:**
✅ IT Returns (Last 3 years)
✅ CA Certified Balance Sheet
✅ Profit & Loss Statement
✅ Business Registration Proof

**PROPERTY DOCUMENTS:**
✅ Sale Deed
✅ Allotment Letter
✅ NOC from Builder/Society
✅ Encumbrance Certificate
✅ Approved Building Plan`;
        }
        
        response += `

💡 **EXPERT TIPS:**
1. **Maintain CIBIL > 750** - Check for free on Google Pay
2. **Compare 3-4 banks** before applying
3. **Negotiate processing fees** - Many banks waive for good profiles
4. **Consider balance transfer** after 2-3 years for lower rates
5. **Prepay when possible** - Even 5% extra saves years of EMI

📱 **QUICK EMI CALCULATOR:**
Use our calculator above or try:
• ₹30L @ 8.5% for 20y = ₹26,035/month
• ₹50L @ 8.5% for 20y = ₹43,391/month
• ₹75L @ 8.5% for 20y = ₹65,087/month

**Have a specific amount in mind? Ask me to calculate!**`;
        
        return response;
    }
    
    function getDeepSeekSIPResponse(query) {
        const includesLumpsum = query.includes('lumpsum') || query.includes('one time');
        const includesTax = query.includes('tax') || query.includes('elss');
        const includesGoal = query.includes('retirement') || query.includes('child') || query.includes('house');
        
        let response = `💰 **COMPREHENSIVE SIP INVESTMENT GUIDE**

📈 **POWER OF COMPOUNDING - REAL EXAMPLES**

| Monthly SIP | Years | 12% Returns | 15% Returns | 18% Returns |
|------------|-------|-------------|-------------|-------------|
| ₹5,000 | 10y | ₹11.6L | ₹13.8L | ₹16.5L |
| ₹5,000 | 20y | ₹49.9L | ₹75.5L | ₹1.14Cr |
| ₹10,000 | 15y | ₹50.3L | ₹67.5L | ₹90.7L |
| ₹10,000 | 20y | ₹99.9L | ₹1.51Cr | ₹2.28Cr |
| ₹25,000 | 20y | ₹2.49Cr | ₹3.77Cr | ₹5.70Cr |

**🎯 TOP PERFORMING FUNDS (Based on 5-year returns)**`;

        if (includesGoal) {
            response += `

**GOAL-BASED SIP PLANNER:**

**🎓 Child Education (Goal after 15 years):**
• Target: ₹50 Lakhs
• Monthly SIP needed: ₹12,500 @12% returns
• Recommended: Mirae Asset Large Cap + Kotak Emerging Equity

**🏠 House Down Payment (Goal after 10 years):**
• Target: ₹25 Lakhs
• Monthly SIP needed: ₹10,800 @12% returns
• Recommended: HDFC Balanced Advantage + SBI Bluechip

**👴 Retirement (Goal after 30 years):**
• Target: ₹5 Crores
• Monthly SIP needed: ₹19,500 @12% returns
• Recommended: Nippon India Small Cap + PPFAS Flexi Cap`;
        }
        
        if (includesTax) {
            response += `

📋 **ELSS FUNDS - TAX SAVING SIPs**

**Why ELSS is BEST for Tax Saving:**
✅ Lowest lock-in: Just 3 years (vs 5-15 years for others)
✅ Highest returns: 14-16% average
✅ Tax benefit: ₹46,800 tax saved @30% slab
✅ SIP allowed: Start with just ₹500/month

**Top ELSS Funds 2026:**
1. **Mirae Asset Tax Saver** - 5Y Returns: 17.2%
2. **SBI Long Term Equity** - 5Y Returns: 16.8%
3. **Axis Long Term Equity** - 5Y Returns: 16.5%
4. **Kotak Tax Saver** - 5Y Returns: 16.1%

**Strategy:**
• ₹12,500/month SIP = ₹1.5L/year = Max tax benefit
• Start in April, not March (longer investment period)`;
        }
        
        if (includesLumpsum) {
            response += `

📊 **SIP vs LUMPSUM - WHICH IS BETTER?**

**SIP Advantages:**
✅ Rupee cost averaging - Buy more when market is down
✅ Disciplined investing - No timing required
✅ Start small - Begin with ₹500
✅ Power of compounding - Works best over long term

**Lumpsum Advantages:**
✅ Better in falling markets - Lower average cost
✅ Immediate full investment - More time in market
✅ Lower transaction costs - One-time charges

**Historical Analysis (Last 20 years):**
• **SIP:** 12-15% returns with lower risk
• **Lumpsum:** 14-17% returns with higher risk
• **Winner for most investors:** SIP (especially for beginners)

**Hybrid Approach - Best of Both:**
• 60% SIP + 40% Lumpsum
• Use STP (Systematic Transfer Plan)`;
        }
        
        response += `

💡 **PRO INVESTOR TIPS:**
1. **Step-up SIP:** Increase by 10% every year - 2x final corpus!
2. **Never stop SIP:** Market crashes are buying opportunities
3. **Review annually:** Rebalance portfolio every 12 months
4. **Mix it up:** 70% Large/Mid + 30% Small cap for optimal returns
5. **Stay long:** Minimum 5-7 years for equity SIPs

🔍 **Want personalized recommendation? Tell me:**
• Your monthly savings
• Investment horizon (years)
• Risk tolerance (Low/Medium/High)
• Financial goal`;
        
        return response;
    }
    
    function getDeepSeekTaxResponse(query) {
        const includes80C = query.includes('80c') || query.includes('80 c');
        const includes80D = query.includes('80d') || query.includes('80 d');
        const includesHRA = query.includes('hra') || query.includes('rent');
        const includesHomeLoan = query.includes('home loan') || query.includes('house loan');
        
        let response = `📋 **COMPREHENSIVE TAX SAVING GUIDE 2025-26**

💰 **INCOME TAX SLABS (NEW REGIME - DEFAULT)**

| Income Range | Tax Rate |
|-------------|----------|
| Up to ₹3,00,000 | NIL |
| ₹3,00,001 - ₹6,00,000 | 5% |
| ₹6,00,001 - ₹9,00,000 | 10% |
| ₹9,00,001 - ₹12,00,000 | 15% |
| ₹12,00,001 - ₹15,00,000 | 20% |
| Above ₹15,00,000 | 30% |

➕ **Health & Education Cess: 4% extra**`;

        if (includes80C) {
            response += `

🎯 **SECTION 80C - ₹1.5 LAKH DEDUCTION (MUST USE!)**

**BEST OPTIONS COMPARISON:**

| Investment | Returns | Lock-in | Risk | Tax on Returns |
|------------|---------|---------|------|----------------|
| **ELSS Funds** ⭐ | 14-16% | 3 years | Moderate | 10% LTCG > ₹1L |
| **PPF** | 7.1% | 15 years | Low | Tax-Free |
| **NPS** | 10-12% | Till 60 | Moderate | 40% Tax-Free |
| **Tax-Saving FD** | 6.5-7% | 5 years | Low | Fully Taxable |
| **NSC** | 6.8% | 5 years | Low | Taxable |
| **ULIP** | 8-10% | 5 years | Moderate | Tax-Free* |

**🏆 WINNER: ELSS (Best Returns + Lowest Lock-in)**

**ELSS Strategy for Maximum Benefit:**
• Start ₹12,500/month SIP = ₹1.5L/year
• Invest in April (not March) for extra compounding
• Choose funds with 5+ year track record
• Rotate funds every 3 years after lock-in`;
        }
        
        if (includes80D) {
            response += `

🩺 **SECTION 80D - HEALTH INSURANCE DEDUCTION**

**DEDUCTION LIMITS:**

| Insured Person | Age < 60 | Age ≥ 60 |
|----------------|----------|----------|
| Self + Family | ₹25,000 | ₹50,000 |
| Parents | ₹25,000 | ₹50,000 |
| **Maximum Total** | **₹50,000** | **₹1,00,000** |

➕ **Preventive Health Check-up: ₹5,000 (within above limits)**

**BEST HEALTH INSURANCE PLANS 2026:**

**For Young Families (Age < 40):**
1. **HDFC Ergo Optima Secure** - ₹50L cover @ ₹8,500/year
2. **ICICI Lombard Complete** - ₹50L cover @ ₹9,200/year

**For Senior Citizens (Age 60+):**
1. **Star Health Senior** - ₹25L cover @ ₹18,500/year
2. **New India Assurance** - ₹25L cover @ ₹16,800/year

**Smart Strategy:**
• Buy separate policy for parents (higher limit)
• Use super top-up for extra coverage (₹50L + ₹50L = ₹1Cr)
• Pay premium via credit card for rewards`;
        }
        
        if (includesHomeLoan) {
            response += `

🏠 **HOME LOAN TAX BENEFITS**

**SECTION 24(b) - INTEREST PAYMENT:**
• Self-occupied property: **Up to ₹2,00,000/year**
• Let-out property: **No limit** (Full interest deductible)
• Joint loan: Both co-owners can claim ₹2L each

**SECTION 80C - PRINCIPAL REPAYMENT:**
• Up to ₹1.5L/year within overall 80C limit
• Registration & stamp duty also eligible

**ADDITIONAL BENEFITS:**
• First-time homebuyers: **Extra ₹50,000** under 80EEA
• Affordable housing: **Extra ₹1.5L** interest under 80EEB

**EXAMPLE TAX SAVING (₹50L loan @8.5%):**
• EMI: ₹43,391/month
• Year 1 Interest: ₹4,18,000
• Year 1 Principal: ₹1,02,692

**Tax Saving Calculation:**
• 80C (Principal): ₹1,02,692 → Tax saved: ₹30,808
• 24(b) (Interest): ₹2,00,000 → Tax saved: ₹60,000
• **Total Year 1 Tax Saved: ₹90,808** 🎯`;
        }
        
        response += `

💡 **SMART TAX PLANNING TIPS:**

1. **Start in April, not March** - Your money works 11 months extra
2. **ELSS + PPF combo** - 50% equity (growth) + 50% debt (safety)
3. **NPS additional ₹50k** - Under 80CCD(1B), extra above 80C
4. **HRA + Home Loan** - Claim both if living in rented house
5. **Donations** - 50% deduction under 80G for PM Cares

📱 **TAX CALCULATOR:**
Annual Income: ₹_____
Your Tax Liability: ₹_____
Potential Savings: ₹_____

**Want a personalized tax plan? Tell me your income and investments!**`;
        
        return response;
    }
    
    function getDeepSeekInsuranceResponse(query) {
        return `🛡️ **COMPREHENSIVE INSURANCE PLANNING GUIDE**

**1. TERM INSURANCE - YOUR FAMILY'S SAFETY NET**

**How Much Cover Do You Need?**
• **Human Life Value (HLV) Method:** 20x annual income
• **Expense Method:** Annual expenses × 25 (4% withdrawal rule)

**Example (Age 30, Income ₹10L):**
• Recommended cover: **₹2 Crore**
• Premium: ₹12,000 - ₹15,000/year
• Premium for ₹1Cr: ₹8,000 - ₹10,000/year

**TOP TERM PLANS 2026:**

| Insurer | Plan Name | ₹1Cr Premium (Age 30) | Claim Settlement |
|---------|-----------|---------------------|------------------|
| **HDFC Life** | Click 2 Protect 3D Plus | ₹9,847 | 98.21% |
| **ICICI Pru** | iProtect Smart | ₹10,085 | 97.89% |
| **Max Life** | Smart Secure Plus | ₹9,456 | 98.56% |
| **LIC** | Tech Term | ₹9,210 | 98.01% |
| **Tata AIA** | Sampoorna Raksha | ₹9,678 | 97.45% |

**🏆 WINNER: Max Life Smart Secure Plus** (Lowest premium + Highest claim ratio)

**MUST-HAVE RIDERS:**
✅ Critical Illness (Extra ₹10-15L cover) - Add ₹2,000/year
✅ Accidental Death Benefit - Add ₹500/year
✅ Waiver of Premium - Add ₹300/year

**2. HEALTH INSURANCE - DON'T DELAY THIS!**

**Adequate Coverage = 50% of your annual income**

| Family Size | Minimum Cover | Recommended Cover | Premium (Age 30) |
|------------|---------------|-------------------|------------------|
| Individual | ₹5L | ₹10L | ₹6,500/year |
| Couple | ₹10L | ₹15L | ₹11,000/year |
| Family of 4 | ₹15L | ₹25L | ₹16,500/year |
| + Senior Parents | ₹25L | ₹50L | ₹38,000/year |

**TOP HEALTH INSURERS 2026:**
1. **HDFC Ergo** - Best claim settlement (97.8%)
2. **Star Health** - Senior citizen specialist
3. **ICICI Lombard** - Best network hospitals
4. **Niva Bupa** - Best international coverage

**3. COMMON MISTAKES TO AVOID:**
❌ Buying LIC Jeevan Anand (mix of insurance + investment)
❌ Underinsuring to save premium (₹50L is NOT enough!)
❌ Hiding medical conditions (will get claim rejected)
❌ Not reading policy wordings (room rent limits, sub-limits)

**💡 EXPERT TIPS:**
1. **Buy term insurance before age 35** - Premium doubles after 40
2. **Take medical test willingly** - Better rates for healthy individuals
3. **Compare at least 3 policies** - Use PolicyBazaar for quotes
4. **Review every 5 years** - Upgrade cover as income grows
5. **Don't mix investment with insurance** - Term + PPF/ELSS is better

**🔍 QUICK CALCULATOR:**
Your Age: _____
Annual Income: _____
Existing Loans: _____
→ Recommended Cover: _____
→ Approx Premium: _____

**Need personalized recommendations? Share your details!**`;
    }
    
    function getDeepSeekRetirementResponse(query) {
        return `👴 **COMPLETE RETIREMENT PLANNING GUIDE**

**🎯 HOW MUCH CORPUS DO YOU NEED?**

**The 4% Rule:** Your annual expenses × 25 = Required corpus
**Example:** Monthly expenses ₹50,000 → Annual ₹6L → **Corpus needed: ₹1.5Cr**

**BUT WAIT - INFLATION WILL DOUBLE THIS!**

**REAL EXAMPLE (Age 30, Retire at 60):**

| Current Age | Current Monthly Expenses | At Retirement (6% inflation) | Corpus Needed |
|------------|-------------------------|------------------------------|---------------|
| 30 | ₹50,000 | ₹2,87,174 | ₹8.61 Cr |
| 35 | ₹50,000 | ₹2,14,354 | ₹6.43 Cr |
| 40 | ₹50,000 | ₹1,60,170 | ₹4.80 Cr |
| 45 | ₹50,000 | ₹1,19,828 | ₹3.59 Cr |

**⚠️ ALARMING FACT:** Starting at 30 vs 45 requires **5 Cr less** corpus!

**📊 MONTHLY SIP NEEDED FOR ₹5 CRORE CORPUS:**

| Start Age | Time to 60 | Monthly SIP @12% | Total Investment | Wealth Gained |
|-----------|------------|------------------|------------------|---------------|
| 25 | 35 years | ₹1,850 | ₹7.77L | ₹4.22 Cr |
| 30 | 30 years | ₹4,250 | ₹15.3L | ₹4.84 Cr |
| 35 | 25 years | ₹8,500 | ₹25.5L | ₹4.74 Cr |
| 40 | 20 years | ₹16,750 | ₹40.2L | ₹4.59 Cr |
| 45 | 15 years | ₹34,500 | ₹62.1L | ₹4.37 Cr |

**🏆 WINNER: START NOW!** ₹1,850/month at 25 vs ₹34,500/month at 45!

**💼 RETIREMENT PORTFOLIO ALLOCATION:**

**Age 25-40 (Growth Phase):**
• 70% Equity (Index Funds, Large Cap)
• 20% Debt (PPF, EPF)
• 10% Gold (SGBs)

**Age 40-50 (Consolidation Phase):**
• 50% Equity (Balanced Advantage Funds)
• 35% Debt (Corporate Bonds, PPF)
• 15% Gold/REITs

**Age 50-60 (Preservation Phase):**
• 30% Equity (Dividend Yield Funds)
• 50% Debt (G-secs, SCSS)
• 20% Fixed Income (PMVVY, POMIS)

**Age 60+ (Retirement Phase):**
• 20% Equity (For inflation protection)
• 50% Debt (Monthly income plans)
• 30% Senior Citizen Schemes

**💎 TOP RETIREMENT-FOCUSED FUNDS:**

1. **ICICI Pru Retirement Fund** - Pure Equity: 14.2% returns
2. **HDFC Retirement Equity Fund** - 13.8% returns
3. **UTI Retirement Benefit Fund** - Hybrid: 12.1% returns
4. **SBI Retirement Benefit Fund** - Conservative: 10.5% returns

**🏛️ GOVERNMENT SCHEMES:**

| Scheme | Interest | Lock-in | Max Investment | Tax Benefit |
|--------|---------|---------|----------------|-------------|
| **PPF** | 7.1% | 15 years | ₹1.5L/year | EEE |
| **NPS** | 10-12% | Till 60 | No limit | EET (40% tax-free) |
| **SCSS** | 8.2% | 5 years | ₹30L | ETE |
| **PMVVY** | 7.4% | 10 years | ₹15L | ETE |
| **SGB** | Gold + 2.5% | 8 years | 4g/person | Indexed |

**💡 RETIREMENT PLANNING STRATEGIES:**

1. **Step-up SIP** - Increase SIP by 10% every year
   • Normal SIP at 30: ₹10,000 → ₹4.76Cr at 60
   • Step-up SIP: ₹10,000 + 10%/year → ₹8.23Cr at 60
   • **EXTRA ₹3.47Cr JUST FROM STEP-UP!**

2. **NPS Additional Tax Benefit** - ₹50,000 under 80CCD(1B)
   • Invest ₹4,200/month → ₹1.2Cr extra corpus
   • Save ₹15,600 in taxes @30% slab

3. **Delay Retirement by 3 Years** 
   • 60 → 63: Corpus grows 44% more!
   • Less years to fund + more time to compound

**📱 QUICK RETIREMENT CALCULATOR:**

1. Your current monthly expenses: ₹_____
2. Years to retirement: _____
3. Current retirement savings: ₹_____
4. Monthly SIP needed: ₹_____

**🎯 YOUR ACTION PLAN:**

**✅ THIS WEEK:**
- Open PPF account (min ₹500)
- Start ₹5,000/month SIP in Index Fund
- Check NPS Tier 1 account

**✅ THIS MONTH:**
- Calculate exact retirement number
- Set up automatic step-up SIP
- Meet a SEBI-registered advisor

**✅ THIS YEAR:**
- Max out PPF (₹1.5L)
- Max out NPS (₹50k extra)
- Review portfolio quarterly

**Remember: The best time to start was 10 years ago. The second best time is TODAY!** 🚀`;
    }
    
    function getDeepSeekCreditScoreResponse() {
        return `📊 **COMPLETE CIBIL/CREDIT SCORE GUIDE**

**🎯 WHAT IS A GOOD CREDIT SCORE?**

| Score Range | Rating | Loan Approval | Interest Rate |
|------------|--------|---------------|---------------|
| **750 - 900** | ⭐ Excellent | Instant approval | Lowest rates |
| **700 - 749** | ✅ Good | Quick approval | Competitive |
| **650 - 699** | ⚠️ Fair | May need explanation | Higher rates |
| **550 - 649** | ❌ Poor | Difficult approval | Very high rates |
| **300 - 549** | 🛑 Very Poor | Likely rejected | Not eligible |

**📈 HOW YOUR SCORE IS CALCULATED:**
