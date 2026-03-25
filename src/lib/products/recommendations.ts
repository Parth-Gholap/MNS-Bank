interface Product {
  id: string;
  name: string;
  nameHi: string;
  category: string;
  categoryHi: string;
  subcategory: string;
  subcategoryHi: string;
  features: string[];
  featuresHi: string[];
  interestRate?: string;
  interestRateHi?: string;
  processingFee?: string;
  processingFeeHi?: string;
  maxLoanAmount?: string;
  maxLoanAmountHi?: string;
  minBalance?: string;
  minBalanceHi?: string;
  tags: string[];
  popularity: number;
  rating: number;
  link: string;
  image: string;
}

interface UserProfile {
  age?: number;
  income?: string;
  occupation?: string;
  accountType?: string;
  loanHistory?: string;
  creditScore?: number;
  preferences?: {
    riskTolerance: 'low' | 'medium' | 'high';
    digitalBanking: boolean;
    investmentGoals: string[];
    monthlyTransactions: number;
  };
}

interface RecommendationScore {
  productId: string;
  score: number;
  reasons: string[];
  reasonsHi: string[];
}

export interface RecommendationResult {
  products: Product[];
  scores: RecommendationScore[];
  algorithm: string;
  confidence: number;
}

class ProductRecommendationEngine {
  private products: Product[] = [];
  private userProfiles: Map<string, UserProfile> = new Map();

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    // Mock products data - in real implementation, this would come from database
    this.products = [
      {
        id: '1',
        name: 'Savings Account',
        nameHi: 'बचत खाता',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        subcategory: 'Deposits',
        subcategoryHi: 'जमा',
        features: ['Zero Balance', 'Mobile Banking', 'Free ATM', 'Online Banking'],
        featuresHi: ['जीरो शेष', 'मोबाइल बैंकिंग', 'मुफ्त एटीएम', 'ऑनलाइन बैंकिंग'],
        interestRate: '3.25%',
        interestRateHi: '3.25%',
        processingFee: '0%',
        processingFeeHi: '0%',
        minBalance: '0',
        minBalanceHi: '0',
        tags: ['savings', 'digital', 'no-minimum', 'mobile-banking'],
        popularity: 85,
        rating: 4.2,
        link: '/personal/savings-account',
        image: '/images/products/savings-account.jpg'
      },
      {
        id: '2',
        name: 'Personal Loan',
        nameHi: 'व्यक्तिग ऋण',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        subcategory: 'Loans',
        subcategoryHi: 'ऋण',
        features: ['Quick Approval', 'Flexible Tenure', 'No Collateral', 'Online Application'],
        featuresHi: ['त्वरित स्वीकृति', 'लचीली अवधि', 'कोई बंधक', 'ऑनलाइन आवेदन'],
        interestRate: '12.5%',
        interestRateHi: '12.5%',
        processingFee: '2%',
        processingFeeHi: '2%',
        maxLoanAmount: '₹10,00,000',
        maxLoanAmountHi: '₹10,00,000',
        tags: ['loan', 'personal', 'quick-approval', 'no-collateral'],
        popularity: 78,
        rating: 4.1,
        link: '/personal/loans/personal-loan',
        image: '/images/products/personal-loan.jpg'
      },
      {
        id: '3',
        name: 'Home Loan',
        nameHi: 'होम लोन',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        subcategory: 'Loans',
        subcategoryHi: 'ऋण',
        features: ['Low Interest Rates', 'Long Tenure', 'Tax Benefits', 'Property Insurance'],
        featuresHi: ['कम ब्याज दरें', 'लंबी अवधि', 'कर लाभ', 'संपत्ति बीमा'],
        interestRate: '8.5%',
        interestRateHi: '8.5%',
        processingFee: '1%',
        processingFeeHi: '1%',
        maxLoanAmount: '₹1,00,00,000',
        maxLoanAmountHi: '₹1,00,00,000',
        tags: ['loan', 'home', 'tax-benefits', 'long-tenure'],
        popularity: 82,
        rating: 4.3,
        link: '/personal/loans/home-loan',
        image: '/images/products/home-loan.jpg'
      },
      {
        id: '4',
        name: 'Current Account',
        nameHi: 'चालू खाता',
        category: 'Business Banking',
        categoryHi: 'व्यवसाय बैंकिंग',
        subcategory: 'Accounts',
        subcategoryHi: 'खाते',
        features: ['Unlimited Transactions', 'Overdraft Facility', 'Business Tools', 'Dedicated Manager'],
        featuresHi: ['असीमित लेनदेन', 'ओवरड्राफ्ट सुविधा', 'व्यवसाय उपकरण', 'समर्पित प्रबंधक'],
        processingFee: '0.5%',
        processingFeeHi: '0.5%',
        tags: ['business', 'current-account', 'unlimited-transactions'],
        popularity: 65,
        rating: 3.9,
        link: '/business/current-account',
        image: '/images/products/current-account.jpg'
      },
      {
        id: '5',
        name: 'Fixed Deposit',
        nameHi: 'सावध जमा',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        subcategory: 'Deposits',
        subcategoryHi: 'जमा',
        features: ['Guaranteed Returns', 'Flexible Tenure', 'Loan Against FD', 'Auto Renewal'],
        featuresHi: ['गारंटीड रिटर्न', 'लचीली अवधि', 'एफडी के खिलाफ लोन', 'ऑटो नवीकरण'],
        interestRate: '6.5%',
        interestRateHi: '6.5%',
        processingFee: '0%',
        processingFeeHi: '0%',
        tags: ['investment', 'fixed-deposit', 'guaranteed-returns', 'safe'],
        popularity: 71,
        rating: 4.0,
        link: '/personal/deposits/fixed-deposit',
        image: '/images/products/fixed-deposit.jpg'
      },
      {
        id: '6',
        name: 'Credit Card',
        nameHi: 'क्रेडिट कार्ड',
        category: 'Cards',
        categoryHi: 'कार्ड',
        subcategory: 'Credit Cards',
        subcategoryHi: 'क्रेडिट कार्ड',
        features: ['Cashback Offers', 'Reward Points', 'EMI Options', 'Global Acceptance'],
        featuresHi: ['कैशबैक ऑफर', 'रिवार्ड पॉइंट्स', 'ईएमआई विकल्प', 'वैश्विक स्वीकृति'],
        processingFee: '0%',
        processingFeeHi: '0%',
        tags: ['credit-card', 'rewards', 'cashback', 'emi'],
        popularity: 88,
        rating: 4.4,
        link: '/personal/cards/credit-card',
        image: '/images/products/credit-card.jpg'
      }
    ];
  }

  public setUserProfile(userId: string, profile: UserProfile): void {
    this.userProfiles.set(userId, profile);
  }

  public getUserProfile(userId: string): UserProfile | undefined {
    return this.userProfiles.get(userId);
  }

  public getRecommendations(
    productId: string, 
    userId?: string, 
    limit: number = 4
  ): RecommendationResult {
    const currentProduct = this.products.find(p => p.id === productId);
    if (!currentProduct) {
      return {
        products: [],
        scores: [],
        algorithm: 'content-based',
        confidence: 0
      };
    }

    const userProfile = userId ? this.getUserProfile(userId) : undefined;
    const candidates = this.products.filter(p => p.id !== productId);

    // Calculate recommendation scores
    const scores = candidates.map(product => ({
      productId: product.id,
      score: this.calculateRecommendationScore(currentProduct, product, userProfile),
      reasons: this.getRecommendationReasons(currentProduct, product, userProfile, 'en'),
      reasonsHi: this.getRecommendationReasons(currentProduct, product, userProfile, 'hi')
    }));

    // Sort by score and get top recommendations
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, limit);
    const recommendedProducts = candidates.filter(p => 
      topScores.some(score => score.productId === p.id)
    );

    return {
      products: recommendedProducts,
      scores: topScores,
      algorithm: userProfile ? 'hybrid' : 'content-based',
      confidence: this.calculateConfidence(topScores)
    };
  }

  public getPersonalizedRecommendations(
    userId: string, 
    limit: number = 4
  ): RecommendationResult {
    const userProfile = this.getUserProfile(userId);
    if (!userProfile) {
      return this.getPopularProducts(limit);
    }

    // Calculate scores for all products
    const scores = this.products.map(product => ({
      productId: product.id,
      score: this.calculatePersonalizedScore(product, userProfile),
      reasons: this.getPersonalizedReasons(product, userProfile, 'en'),
      reasonsHi: this.getPersonalizedReasons(product, userProfile, 'hi')
    }));

    // Sort by score and get top recommendations
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, limit);
    const recommendedProducts = this.products.filter(p => 
      topScores.some(score => score.productId === p.id)
    );

    return {
      products: recommendedProducts,
      scores: topScores,
      algorithm: 'personalized',
      confidence: this.calculateConfidence(topScores)
    };
  }

  public getPopularProducts(limit: number = 4): RecommendationResult {
    const popularProducts = [...this.products]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);

    const scores = popularProducts.map(product => ({
      productId: product.id,
      score: product.popularity,
      reasons: ['Popular choice among customers', 'High customer satisfaction'],
      reasonsHi: ['ग्राहकों के बीच लोकप्रिय विकल्प', 'उच्च ग्राहक संतुष्टि']
    }));

    return {
      products: popularProducts,
      scores,
      algorithm: 'popularity-based',
      confidence: 0.85
    };
  }

  private calculateRecommendationScore(
    currentProduct: Product, 
    candidateProduct: Product, 
    userProfile?: UserProfile
  ): number {
    let score = 0;

    // Content-based similarity (40% weight)
    score += this.calculateContentSimilarity(currentProduct, candidateProduct) * 0.4;

    // Category preference (25% weight)
    score += this.calculateCategoryScore(currentProduct, candidateProduct) * 0.25;

    // Feature overlap (20% weight)
    score += this.calculateFeatureOverlap(currentProduct, candidateProduct) * 0.2;

    // Popularity (15% weight)
    score += (candidateProduct.popularity / 100) * 0.15;

    return Math.min(score, 1);
  }

  private calculatePersonalizedScore(product: Product, userProfile: UserProfile): number {
    let score = 0;

    // Age-based scoring
    if (userProfile.age) {
      if (userProfile.age < 30 && product.tags.includes('digital')) {
        score += 0.2;
      }
      if (userProfile.age >= 30 && product.tags.includes('investment')) {
        score += 0.2;
      }
    }

    // Income-based scoring
    if (userProfile.income) {
      if (userProfile.income === 'high' && product.tags.includes('investment')) {
        score += 0.15;
      }
      if (userProfile.income === 'medium' && product.tags.includes('savings')) {
        score += 0.15;
      }
    }

    // Occupation-based scoring
    if (userProfile.occupation) {
      if (userProfile.occupation === 'business' && product.category === 'Business Banking') {
        score += 0.25;
      }
      if (userProfile.occupation === 'salaried' && product.tags.includes('loan')) {
        score += 0.2;
      }
    }

    // Risk tolerance
    if (userProfile.preferences?.riskTolerance) {
      if (userProfile.preferences.riskTolerance === 'low' && product.tags.includes('safe')) {
        score += 0.2;
      }
      if (userProfile.preferences.riskTolerance === 'high' && product.tags.includes('investment')) {
        score += 0.15;
      }
    }

    // Digital banking preference
    if (userProfile.preferences?.digitalBanking && product.tags.includes('digital')) {
      score += 0.15;
    }

    // Credit score consideration
    if (userProfile.creditScore && product.tags.includes('loan')) {
      if (userProfile.creditScore >= 750) {
        score += 0.1;
      } else if (userProfile.creditScore < 650) {
        score -= 0.1;
      }
    }

    return Math.max(0, Math.min(score, 1));
  }

  private calculateContentSimilarity(product1: Product, product2: Product): number {
    const tags1 = new Set(product1.tags);
    const tags2 = new Set(product2.tags);
    
    const intersection = new Set(Array.from(tags1).filter(tag => tags2.has(tag)));
    const union = new Set([...Array.from(tags1), ...Array.from(tags2)]);
    
    return intersection.size / union.size;
  }

  private calculateCategoryScore(currentProduct: Product, candidateProduct: Product): number {
    if (currentProduct.category === candidateProduct.category) {
      return 0.8;
    }
    if (currentProduct.subcategory === candidateProduct.subcategory) {
      return 0.6;
    }
    return 0.2;
  }

  private calculateFeatureOverlap(product1: Product, product2: Product): number {
    const features1 = new Set(product1.features);
    const features2 = new Set(product2.features);
    
    const intersection = new Set(Array.from(features1).filter((feature: string) => features2.has(feature)));
    const union = new Set([...Array.from(features1), ...Array.from(features2)]);
    
    return intersection.size / union.size;
  }

  private getRecommendationReasons(
    currentProduct: Product, 
    candidateProduct: Product, 
    userProfile: UserProfile | undefined,
    locale: 'en' | 'hi'
  ): string[] {
    const reasons: string[] = [];

    if (currentProduct.category === candidateProduct.category) {
      reasons.push(locale === 'hi' ? 'समान श्रेणी' : 'Same category');
    }

    if (candidateProduct.rating >= 4.0) {
      reasons.push(locale === 'hi' ? 'उच्च रेटिंग' : 'High rating');
    }

    if (candidateProduct.popularity >= 80) {
      reasons.push(locale === 'hi' ? 'लोकप्रिय विकल्प' : 'Popular choice');
    }

    if (candidateProduct.interestRate && currentProduct.interestRate) {
      const candidateRate = parseFloat(candidateProduct.interestRate);
      const currentRate = parseFloat(currentProduct.interestRate);
      
      if (candidateRate < currentRate) {
        reasons.push(locale === 'hi' ? 'बेहतर ब्याज दर' : 'Better interest rate');
      }
    }

    return reasons;
  }

  private getPersonalizedReasons(
    product: Product, 
    userProfile: UserProfile, 
    locale: 'en' | 'hi'
  ): string[] {
    const reasons: string[] = [];

    if (userProfile.age) {
      if (userProfile.age < 30 && product.tags.includes('digital')) {
        reasons.push(locale === 'hi' ? 'युवा उपयोगकर्ताओं के लिए उपयुक्त' : 'Suitable for young users');
      }
      if (userProfile.age >= 30 && product.tags.includes('investment')) {
        reasons.push(locale === 'hi' ? 'निवेश के लिए अनुकूल' : 'Ideal for investment');
      }
    }

    if (userProfile.occupation) {
      if (userProfile.occupation === 'business' && product.category === 'Business Banking') {
        reasons.push(locale === 'hi' ? 'व्यवसाय के लिए बनाया गया' : 'Built for business');
      }
    }

    if (userProfile.preferences?.digitalBanking && product.tags.includes('digital')) {
      reasons.push(locale === 'hi' ? 'डिजिटल बैंकिंग के लिए' : 'For digital banking');
    }

    return reasons;
  }

  private calculateConfidence(scores: RecommendationScore[]): number {
    if (scores.length === 0) return 0;
    
    const avgScore = scores.reduce((sum, score) => sum + score.score, 0) / scores.length;
    const maxScore = Math.max(...scores.map(s => s.score));
    
    // Confidence based on score distribution and average
    return (avgScore + maxScore) / 2;
  }
}

// Export singleton instance
export const recommendationEngine = new ProductRecommendationEngine();

// Helper functions for API integration
export const getProductRecommendations = async (
  productId: string, 
  userId?: string, 
  limit: number = 4
): Promise<RecommendationResult> => {
  try {
    const response = await fetch(`/api/recommendations?productId=${productId}&userId=${userId}&limit=${limit}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
  
  // Fallback to client-side recommendations
  return recommendationEngine.getRecommendations(productId, userId, limit);
};

export const getPersonalizedRecommendations = async (
  userId: string, 
  limit: number = 4
): Promise<RecommendationResult> => {
  try {
    const response = await fetch(`/api/recommendations/personalized?userId=${userId}&limit=${limit}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching personalized recommendations:', error);
  }
  
  // Fallback to client-side recommendations
  return recommendationEngine.getPersonalizedRecommendations(userId, limit);
};

export const getPopularProducts = async (limit: number = 4): Promise<RecommendationResult> => {
  try {
    const response = await fetch(`/api/recommendations/popular?limit=${limit}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching popular products:', error);
  }
  
  // Fallback to client-side recommendations
  return recommendationEngine.getPopularProducts(limit);
};
