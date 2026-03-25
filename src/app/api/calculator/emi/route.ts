import { NextRequest, NextResponse } from 'next/server';
import { 
  calculateEMI, 
  calculateEMIWithSchedule, 
  validateEMIInput, 
  getLoanPresets,
  calculateEligibility,
  calculateInterestSavings,
  calculatePrepaymentImpact,
  EMICalculationInput 
} from '@/lib/calculator/emi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const action = searchParams.get('action') || 'calculate';

    switch (action) {
      case 'presets':
        return NextResponse.json({
          success: true,
          data: {
            presets: getLoanPresets().map(preset => ({
              ...preset,
              name: locale === 'hi' ? preset.nameHi : preset.name
            }))
          }
        });

      case 'validate':
        const principal = parseFloat(searchParams.get('principal') || '0');
        const rate = parseFloat(searchParams.get('rate') || '0');
        const tenure = parseInt(searchParams.get('tenure') || '0');
        const frequency = (searchParams.get('frequency') || 'monthly') as 'monthly' | 'quarterly' | 'yearly';

        const input: EMICalculationInput = {
          principal,
          rate,
          tenure,
          frequency
        };

        const errors = validateEMIInput(input);

        return NextResponse.json({
          success: Object.keys(errors).length === 0,
          data: {
            valid: Object.keys(errors).length === 0,
            errors: Object.keys(errors).length > 0 ? errors : undefined
          }
        });

      case 'eligibility':
        const monthlyIncome = parseFloat(searchParams.get('monthlyIncome') || '0');
        const existingEMIs = parseFloat(searchParams.get('existingEMIs') || '0');
        const loanAmount = parseFloat(searchParams.get('loanAmount') || '0');
        const eligibilityRate = parseFloat(searchParams.get('rate') || '0');
        const eligibilityTenure = parseInt(searchParams.get('tenure') || '0');

        const eligibilityResult = calculateEligibility(
          monthlyIncome,
          existingEMIs,
          loanAmount,
          eligibilityRate,
          eligibilityTenure
        );

        return NextResponse.json({
          success: true,
          data: eligibilityResult
        });

      case 'savings':
        const currentEMI = parseFloat(searchParams.get('currentEMI') || '0');
        const currentRate = parseFloat(searchParams.get('currentRate') || '0');
        const newRate = parseFloat(searchParams.get('newRate') || '0');
        const remainingTenure = parseInt(searchParams.get('remainingTenure') || '0');

        const savings = calculateInterestSavings(
          currentEMI,
          currentRate,
          newRate,
          remainingTenure
        );

        return NextResponse.json({
          success: true,
          data: {
            monthlySavings: savings,
            totalSavings: savings * remainingTenure
          }
        });

      case 'prepayment':
        const prepaymentPrincipal = parseFloat(searchParams.get('principal') || '0');
        const prepaymentRate = parseFloat(searchParams.get('rate') || '0');
        const prepaymentTenure = parseInt(searchParams.get('tenure') || '0');
        const prepaymentAmount = parseFloat(searchParams.get('prepaymentAmount') || '0');
        const prepaymentMonth = parseInt(searchParams.get('prepaymentMonth') || '0');

        const prepaymentInput: EMICalculationInput = {
          principal: prepaymentPrincipal,
          rate: prepaymentRate,
          tenure: prepaymentTenure,
          frequency: 'monthly'
        };

        const prepaymentResult = calculatePrepaymentImpact(
          prepaymentInput,
          prepaymentAmount,
          prepaymentMonth
        );

        return NextResponse.json({
          success: true,
          data: prepaymentResult
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action',
          message: locale === 'hi' ? 'अमान्य कार्रवाई' : 'Invalid action specified'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('EMI Calculator API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while processing your request'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const includeSchedule = body.includeSchedule || false;

    // Validate input
    const input: EMICalculationInput = {
      principal: parseFloat(body.principal) || 0,
      rate: parseFloat(body.rate) || 0,
      tenure: parseInt(body.tenure) || 0,
      frequency: body.frequency || 'monthly'
    };

    const errors = validateEMIInput(input);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: locale === 'hi' ? 'इनपुट सत्यापन में विफल' : 'Input validation failed',
          errors
        },
        { status: 400 }
      );
    }

    // Calculate EMI
    const result = includeSchedule 
      ? calculateEMIWithSchedule(input)
      : calculateEMI(input);

    // Log calculation for analytics
    console.log('EMI Calculation:', {
      input,
      result: {
        emi: result.emi,
        totalAmount: result.totalAmount,
        totalInterest: result.totalInterest,
        effectiveRate: result.effectiveRate
      },
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: {
        calculation: result,
        input: {
          principal: input.principal,
          rate: input.rate,
          tenure: input.tenure,
          frequency: input.frequency
        },
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('EMI Calculator POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while calculating EMI'
      },
      { status: 500 }
    );
  }
}
