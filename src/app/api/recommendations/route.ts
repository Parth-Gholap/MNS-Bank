import { NextRequest, NextResponse } from 'next/server';
import { recommendationEngine, RecommendationResult } from '@/lib/products/recommendations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'related';
    const limit = parseInt(searchParams.get('limit') || '4');

    let result: RecommendationResult;

    switch (type) {
      case 'personalized':
        if (!userId) {
          result = recommendationEngine.getPopularProducts(limit);
        } else {
          recommendationEngine.setUserProfile(userId, {
            age: 30,
            income: 'medium',
            occupation: 'salaried',
            preferences: {
              riskTolerance: 'medium',
              digitalBanking: true,
              investmentGoals: ['savings', 'retirement'],
              monthlyTransactions: 20
            }
          });
          result = recommendationEngine.getPersonalizedRecommendations(userId, limit);
        }
        break;

      case 'popular':
        result = recommendationEngine.getPopularProducts(limit);
        break;

      case 'related':
      default:
        if (!productId) {
          result = recommendationEngine.getPopularProducts(limit);
        } else {
          result = recommendationEngine.getRecommendations(productId, userId || undefined, limit);
        }
        break;
    }

    console.log('Recommendations API accessed:', {
      type,
      productId,
      userId,
      limit,
      algorithm: result.algorithm,
      confidence: result.confidence,
      productCount: result.products.length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while fetching recommendations'
      },
      { status: 500 }
    );
  }
}
