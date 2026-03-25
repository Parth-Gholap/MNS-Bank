export interface EMICalculationInput {
  principal: number;
  rate: number;
  tenure: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
}

export interface EMICalculationResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  effectiveRate: number;
  monthlyBreakdown?: MonthlyBreakdown[];
}

export interface MonthlyBreakdown {
  month: number;
  openingBalance: number;
  emi: number;
  interestComponent: number;
  principalComponent: number;
  closingBalance: number;
}

export interface LoanPreset {
  name: string;
  nameHi: string;
  principal: number;
  rate: number;
  tenure: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
}

export const calculateEMI = (input: EMICalculationInput): EMICalculationResult => {
  const { principal, rate, tenure, frequency } = input;
  
  // Convert to monthly rate for calculation
  const monthlyRate = rate / 12 / 100;
  
  // Calculate EMI using the standard formula
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
  
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - principal;
  const effectiveRate = (totalInterest / principal) * 100;
  
  return {
    emi: Math.round(emi * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100
  };
};

export const calculateAmortizationSchedule = (
  input: EMICalculationInput
): MonthlyBreakdown[] => {
  const { principal, rate, tenure } = input;
  const monthlyRate = rate / 12 / 100;
  const emi = calculateEMI(input).emi;
  
  const schedule: MonthlyBreakdown[] = [];
  let openingBalance = principal;
  
  for (let month = 1; month <= tenure; month++) {
    const interestComponent = openingBalance * monthlyRate;
    const principalComponent = emi - interestComponent;
    const closingBalance = openingBalance - principalComponent;
    
    schedule.push({
      month,
      openingBalance: Math.round(openingBalance * 100) / 100,
      emi: Math.round(emi * 100) / 100,
      interestComponent: Math.round(interestComponent * 100) / 100,
      principalComponent: Math.round(principalComponent * 100) / 100,
      closingBalance: Math.max(0, Math.round(closingBalance * 100) / 100)
    });
    
    openingBalance = closingBalance;
  }
  
  return schedule;
};

export const calculateEMIWithSchedule = (
  input: EMICalculationInput
): EMICalculationResult & { monthlyBreakdown: MonthlyBreakdown[] } => {
  const emiResult = calculateEMI(input);
  const monthlyBreakdown = calculateAmortizationSchedule(input);
  
  return {
    ...emiResult,
    monthlyBreakdown
  };
};

export const validateEMIInput = (input: EMICalculationInput): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (input.principal < 10000) {
    errors.principal = 'Minimum loan amount is ₹10,000';
  }
  if (input.principal > 100000000) {
    errors.principal = 'Maximum loan amount is ₹1,00,00,000';
  }
  if (input.rate < 5) {
    errors.rate = 'Minimum interest rate is 5%';
  }
  if (input.rate > 20) {
    errors.rate = 'Maximum interest rate is 20%';
  }
  if (input.tenure < 6) {
    errors.tenure = 'Minimum tenure is 6 months';
  }
  if (input.tenure > 360) {
    errors.tenure = 'Maximum tenure is 360 months';
  }
  
  return errors;
};

export const getLoanPresets = (): LoanPreset[] => {
  return [
    {
      name: 'Home Loan - Standard',
      nameHi: 'होम लोन - मानक',
      principal: 500000,
      rate: 8.5,
      tenure: 60,
      frequency: 'monthly'
    },
    {
      name: 'Home Loan - Premium',
      nameHi: 'होम लोन - प्रीमियम',
      principal: 1000000,
      rate: 8.25,
      tenure: 120,
      frequency: 'monthly'
    },
    {
      name: 'Car Loan - New',
      nameHi: 'कार लोन - नया',
      principal: 800000,
      rate: 9.5,
      tenure: 60,
      frequency: 'monthly'
    },
    {
      name: 'Car Loan - Used',
      nameHi: 'कार लोन - पुराना',
      principal: 400000,
      rate: 11.5,
      tenure: 48,
      frequency: 'monthly'
    },
    {
      name: 'Personal Loan - Standard',
      nameHi: 'व्यक्ति लोन - मानक',
      principal: 200000,
      rate: 12.5,
      tenure: 36,
      frequency: 'monthly'
    },
    {
      name: 'Personal Loan - Premium',
      nameHi: 'व्यक्ति लोन - प्रीमियम',
      principal: 500000,
      rate: 11.5,
      tenure: 60,
      frequency: 'monthly'
    },
    {
      name: 'Business Loan - Term',
      nameHi: 'व्यवसाय लोन - अवधि',
      principal: 2000000,
      rate: 11.5,
      tenure: 120,
      frequency: 'monthly'
    },
    {
      name: 'Education Loan',
      nameHi: 'शिक्षा लोन',
      principal: 1000000,
      rate: 9.0,
      tenure: 84,
      frequency: 'monthly'
    },
    {
      name: 'Loan Against Property',
      nameHi: 'प्रॉपर्टी के खिलाफ लोन',
      principal: 3000000,
      rate: 10.5,
      tenure: 180,
      frequency: 'monthly'
    }
  ];
};

export const calculateInterestSavings = (
  currentEMI: number,
  currentRate: number,
  newRate: number,
  remainingTenure: number
): number => {
  const monthlyCurrentRate = currentRate / 12 / 100;
  const monthlyNewRate = newRate / 12 / 100;
  
  // Calculate remaining principal from current EMI
  const remainingPrincipal = currentEMI * (1 - Math.pow(1 + monthlyCurrentRate, -remainingTenure)) / monthlyCurrentRate;
  
  // Calculate new EMI with reduced rate
  const newEMI = (remainingPrincipal * monthlyNewRate * Math.pow(1 + monthlyNewRate, remainingTenure)) / 
                 (Math.pow(1 + monthlyNewRate, remainingTenure) - 1);
  
  return currentEMI - newEMI;
};

export const calculateEligibility = (
  monthlyIncome: number,
  existingEMIs: number,
  loanAmount: number,
  rate: number,
  tenure: number
): { eligible: boolean; maxLoanAmount: number; reason?: string } => {
  // Standard eligibility criteria: EMI should not exceed 50% of monthly income
  const maxEMI = monthlyIncome * 0.5;
  const availableForEMI = maxEMI - existingEMIs;
  
  if (availableForEMI <= 0) {
    return {
      eligible: false,
      maxLoanAmount: 0,
      reason: 'Existing EMIs exceed 50% of monthly income'
    };
  }
  
  // Calculate maximum loan amount based on available EMI
  const monthlyRate = rate / 12 / 100;
  const maxLoanAmount = availableForEMI * (1 - Math.pow(1 + monthlyRate, -tenure)) / monthlyRate;
  
  const eligible = loanAmount <= maxLoanAmount;
  
  return {
    eligible,
    maxLoanAmount: Math.round(maxLoanAmount),
    reason: eligible ? undefined : 'Loan amount exceeds eligibility limit'
  };
};

export const formatCurrency = (amount: number, locale: 'en' | 'hi' = 'en'): string => {
  return new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (number: number, locale: 'en' | 'hi' = 'en'): string => {
  return new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-US').format(number);
};

export const getInterestRateRange = (loanType: string): { min: number; max: number; typical: number } => {
  const ranges: Record<string, { min: number; max: number; typical: number }> = {
    'home': { min: 7.5, max: 10.5, typical: 8.5 },
    'car': { min: 8.5, max: 13.5, typical: 9.5 },
    'personal': { min: 10.5, max: 18.5, typical: 12.5 },
    'business': { min: 9.5, max: 15.5, typical: 11.5 },
    'education': { min: 8.0, max: 12.5, typical: 9.0 },
    'property': { min: 9.0, max: 13.5, typical: 10.5 }
  };
  
  return ranges[loanType] || { min: 5.0, max: 20.0, typical: 8.5 };
};

export const calculatePrepaymentImpact = (
  input: EMICalculationInput,
  prepaymentAmount: number,
  prepaymentMonth: number
): { newEMI: number; interestSaved: number; tenureReduced: number } => {
  const originalEMI = calculateEMI(input);
  const schedule = calculateAmortizationSchedule(input);
  
  // Calculate remaining balance at prepayment month
  const prepaymentBalance = schedule[prepaymentMonth - 1]?.closingBalance || 0;
  const newPrincipal = prepaymentBalance - prepaymentAmount;
  
  if (newPrincipal <= 0) {
    return {
      newEMI: 0,
      interestSaved: originalEMI.totalInterest,
      tenureReduced: prepaymentMonth
    };
  }
  
  const remainingTenure = input.tenure - prepaymentMonth;
  const newInput = {
    ...input,
    principal: newPrincipal,
    tenure: remainingTenure
  };
  
  const newResult = calculateEMI(newInput);
  
  return {
    newEMI: newResult.emi,
    interestSaved: originalEMI.totalInterest - newResult.totalInterest,
    tenureReduced: remainingTenure
  };
};
