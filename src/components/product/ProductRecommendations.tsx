'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { 
  getProductRecommendations, 
  getPersonalizedRecommendations, 
  getPopularProducts,
  RecommendationResult 
} from '@/lib/products/recommendations';

interface ProductRecommendationsProps {
  locale: 'en' | 'hi';
  productId?: string;
  userId?: string;
  recommendationType?: 'related' | 'personalized' | 'popular';
  limit?: number;
  className?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  locale, 
  productId, 
  userId, 
  recommendationType = 'related', 
  limit = 4,
  className = '' 
}) => {
  const { t } = useTranslation(locale);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<'related' | 'personalized' | 'popular'>('related');

  useEffect(() => {
    trackPageView('Product Recommendations', locale === 'hi' ? 'उत्पाद सिफारिश' : 'Product Recommendations');
    fetchRecommendations();
  }, [productId, userId, recommendationType, locale]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      let result: RecommendationResult;

      switch (type) {
        case 'personalized':
          if (!userId) {
            result = await getPopularProducts(limit);
          } else {
            result = await getPersonalizedRecommendations(userId, limit);
          }
          break;
        case 'popular':
          result = await getPopularProducts(limit);
          break;
        case 'related':
        default:
          if (!productId) {
            result = await getPopularProducts(limit);
          } else {
            result = await getProductRecommendations(productId, userId, limit);
          }
          break;
      }

      setRecommendations(result);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(locale === 'hi' ? 'सिफारिश लोड करने में त्रुटि' : 'Error loading recommendations');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    if (score >= 0.4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    if (confidence >= 0.4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getAlgorithmLabel = (algorithm: string): string => {
    const labels: Record<string, { en: string; hi: string }> = {
      'content-based': { en: 'Based on Similar Products', hi: 'समान उत्पादों के आधार पर' },
      'personalized': { en: 'Personalized for You', hi: 'आपके लिए व्यक्तिगत' },
      'popularity-based': { en: 'Popular Products', hi: 'लोकप्रिय उत्पाद' },
      'hybrid': { en: 'Smart Recommendations', hi: 'स्मार्ट सिफारिश' }
    };
    
    const label = labels[algorithm] || labels['content-based'];
    return locale === 'hi' ? label.hi : label.en;
  };

  // Loading state
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            {locale === 'hi' ? 'त्रुटि हुई' : 'Error'}
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchRecommendations}
            className="btn-primary"
          >
            {locale === 'hi' ? 'पुन: प्रयास करें' : 'Try Again'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!recommendations || recommendations.products.length === 0) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {locale === 'hi' ? 'कोई सिफारिश नहीं' : 'No Recommendations Available'}
          </h3>
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'अभी इस समय कोई सिफारिश उपलब्ध नहीं हैं'
              : 'No recommendations are available at this time'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {recommendationType === 'personalized' 
              ? (locale === 'hi' ? 'आपके लिए सिफारिश' : 'Recommended for You')
              : (recommendationType === 'popular' 
                ? (locale === 'hi' ? 'लोकप्रिय उत्पाद' : 'Popular Products')
                : (locale === 'hi' ? 'संबंधित उत्पाद' : 'Related Products')
              )
            }
          </h3>
          
          {recommendations && (
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded-full ${getConfidenceColor(recommendations.confidence)}`}>
                {getAlgorithmLabel(recommendations.algorithm)}
              </span>
              <span className="text-gray-600">
                {locale === 'hi' 
                  ? `${Math.round(recommendations.confidence * 100)}% विश्वास`
                  : `${Math.round(recommendations.confidence * 100)}% confidence`
                }
              </span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              setType('related');
              fetchRecommendations();
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              type === 'related'
                ? 'bg-bank-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {locale === 'hi' ? 'संबंधित' : 'Related'}
          </button>
          <button
            onClick={() => {
              setType('personalized');
              fetchRecommendations();
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              type === 'personalized'
                ? 'bg-bank-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {locale === 'hi' ? 'व्यक्तिगत' : 'For You'}
          </button>
          <button
            onClick={() => {
              setType('popular');
              fetchRecommendations();
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              type === 'popular'
                ? 'bg-bank-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {locale === 'hi' ? 'लोकप्रिय' : 'Popular'}
          </button>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations?.products.map((product, index) => {
          const score = recommendations.scores.find(s => s.productId === product.id);
          
          return (
            <div
              key={product.id}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-bank-blue-300"
            >
              {/* Product Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={product.image}
                  alt={locale === 'hi' ? product.nameHi : product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Score Badge */}
                {score && (
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium">
                    <span className={getScoreColor(score.score)}>
                      {Math.round(score.score * 100)}%
                    </span>
                  </div>
                )}

                {/* Popular Badge */}
                {product.popularity >= 80 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-medium">
                    {locale === 'hi' ? 'लोकप्रिय' : 'Popular'}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {locale === 'hi' ? product.nameHi : product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === 'hi' ? product.categoryHi : product.category}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-3">
                  <ul className="space-y-1">
                    {(locale === 'hi' ? product.featuresHi : product.features).slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-600">
                        <svg className="w-3 h-3 text-green-600 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interest Rate */}
                {product.interestRate && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-bank-blue-600">
                      {product.interestRate}
                    </span>
                  </div>
                )}

                {/* Recommendation Reasons */}
                {score && score.reasons.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">
                      {locale === 'hi' ? 'विशेष:' : 'Why recommended:'}
                    </div>
                    <ul className="space-y-1">
                      {score.reasons.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-bank-blue-400 rounded-full mr-1 mt-1 flex-shrink-0"></span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={product.link}
                  className="btn-primary w-full text-center text-sm"
                >
                  {locale === 'hi' ? 'विवरण देखें' : 'View Details'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More */}
      <div className="text-center mt-6">
        <a
          href="/products"
          className="btn-outline border-bank-blue-600 text-bank-blue-600 hover:bg-bank-blue-50"
        >
          {locale === 'hi' ? 'सभी उत्पाद देखें' : 'View All Products'}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProductRecommendations;
