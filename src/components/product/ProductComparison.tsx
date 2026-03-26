'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface Product {
  id: string;
  name: string;
  nameHi: string;
  category: string;
  categoryHi: string;
  features: string[];
  featuresHi: string[];
  pros: string[];
  prosHi: string[];
  cons: string[];
  consHi: string[];
  interestRate?: string;
  interestRateHi?: string;
  processingFee?: string;
  processingFeeHi?: string;
  maxLoanAmount?: string;
  maxLoanAmountHi?: string;
  link: string;
  image: string;
}

interface ProductComparisonProps {
  locale: 'en' | 'hi';
  className?: string;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [comparisonCriteria, setComparisonCriteria] = useState<string[]>(['features', 'interest', 'fees']);

  useEffect(() => {
    trackPageView('Product Comparison', locale === 'hi' ? 'उत्पाद तुलना' : 'Product Comparison');
    fetchProducts();
  }, [locale]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bank-data?type=products&locale=${locale}&category=all`);
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data.products.slice(0, 6)); // Limit to 6 products for comparison
      }
    } catch (error) {
      console.error('Error fetching products for comparison:', error);
      // Fallback to static products
      setProducts(getStaticProducts());
    } finally {
      setLoading(false);
    }
  };

  const getStaticProducts = (): Product[] => {
    return [
      {
        id: '1',
        name: 'Savings Account',
        nameHi: 'बचत खाता',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        features: ['Zero Balance', 'Mobile Banking', 'Free ATM', 'Online Banking'],
        featuresHi: ['जीरो शेष', 'मोबाइल बैंकिंग', 'मुफ्त एटीएम', 'ऑनलाइन बैंकिंग'],
        pros: ['No minimum balance', 'Digital banking included', 'Wide ATM network'],
        prosHi: ['कोई न्यूनतम शेष', 'डिजिटल बैंकिंग शामिल', 'व्यापक एटीएम नेटवर्क'],
        cons: ['Limited interest rate', 'Monthly balance requirements for some features'],
        consHi: ['सीमित ब्याज दर', 'कुछ सुविधाओं के लिए मासिक शेष आवश्यकता'],
        interestRate: '3.25%',
        interestRateHi: '3.25%',
        processingFee: '0%',
        processingFeeHi: '0%',
        link: '/personal/savings-account',
        image: '/images/products/savings-account.jpg'
      },
      {
        id: '2',
        name: 'Personal Loan',
        nameHi: 'व्यक्तिग ऋण',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        features: ['Quick Approval', 'Flexible Tenure', 'No Collateral', 'Online Application'],
        featuresHi: ['त्वरित स्वीकृति', 'लचीली अवधि', 'कोई बंधक', 'ऑनलाइन आवेदन'],
        pros: ['Fast processing', 'Competitive rates', 'Flexible repayment options'],
        prosHi: ['तेज प्रसंस्करण', 'प्रतिस्पर्धी दरें', 'लचीली चुकौती विकल्प'],
        cons: ['Credit score required', 'Documentation needed', 'Processing time'],
        consHi: ['क्रेडिट स्कोर आवश्यक', 'दस्तावेज़ आवश्यक', 'प्रसंस्करण समय'],
        interestRate: '12.5%',
        interestRateHi: '12.5%',
        processingFee: '2%',
        processingFeeHi: '2%',
        maxLoanAmount: '₹10,00,000',
        maxLoanAmountHi: '₹10,00,000',
        link: '/personal/loans/personal-loan',
        image: '/images/products/personal-loan.jpg'
      },
      {
        id: '3',
        name: 'Home Loan',
        nameHi: 'होम लोन',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        features: ['Low Interest Rates', 'Long Tenure', 'Tax Benefits', 'Property Insurance'],
        featuresHi: ['कम ब्याज दरें', 'लंबी अवधि', 'कर लाभ', 'संपत्ति बीमा'],
        pros: ['Tax deduction benefits', 'Fixed interest rates', 'Long repayment period'],
        prosHi: ['कर कटूट लाभ', 'निश्चित ब्याज दरें', 'लंबी चुकौती अवधि'],
        cons: ['Property required', 'Long approval process', 'High documentation'],
        consHi: ['संपत्ति आवश्यक', 'लंबा स्वीकृति प्रक्रिया', 'उच्च दस्तावेज़'],
        interestRate: '8.5%',
        interestRateHi: '8.5%',
        processingFee: '1%',
        processingFeeHi: '1%',
        maxLoanAmount: '₹1,00,00,000',
        maxLoanAmountHi: '₹1,00,00,000',
        link: '/personal/loans/home-loan',
        image: '/images/products/home-loan.jpg'
      },
      {
        id: '4',
        name: 'Current Account',
        nameHi: 'चालू खाता',
        category: 'Business Banking',
        categoryHi: 'व्यवसाय बैंकिंग',
        features: ['Unlimited Transactions', 'Overdraft Facility', 'Business Tools', 'Dedicated Manager'],
        featuresHi: ['असीमित लेनदेन', 'ओवरड्राफ्ट सुविधा', 'व्यवसाय उपकरण', 'समर्पित प्रबंधक'],
        pros: ['No transaction limits', 'Business banking features', 'Relationship manager'],
        prosHi: ['कोई लेनदेन सीमा', 'व्यवसाय बैंकिंग सुविधाएं', 'रिश्ता प्रबंधक'],
        cons: ['Higher fees', 'Minimum balance requirement', 'Complex documentation'],
        consHi: ['उच्च शुल्क', 'न्यूनतम शेष आवश्यकता', 'जटिल दस्तावेज़'],
        processingFee: '0.5%',
        processingFeeHi: '0.5%',
        link: '/business/current-account',
        image: '/images/products/current-account.jpg'
      },
      {
        id: '5',
        name: 'Business Loan',
        nameHi: 'व्यवसाय ऋण',
        category: 'Business Banking',
        categoryHi: 'व्यवसाय बैंकिंग',
        features: ['Working Capital', 'Term Loan', 'Equipment Finance', 'Collateral Options'],
        featuresHi: ['कार्यशील पूंजी', 'अवधि ऋण', 'उपकरण वित्त', 'बंधक विकल्प'],
        pros: ['Flexible loan amounts', 'Business-specific terms', 'Tax benefits'],
        prosHi: ['लचीली ऋण राशि', 'व्यवसाय-विशिष्ट नियम', 'कर लाभ'],
        cons: ['Business registration required', 'Financial statements needed', 'Longer processing'],
        consHi: ['व्यवसाय पंजीकरण आवश्यक', 'वित्तीय विवरण आवश्यक', 'लंबा प्रसंस्करण'],
        interestRate: '11.5%',
        interestRateHi: '11.5%',
        processingFee: '1.5%',
        processingFeeHi: '1.5%',
        maxLoanAmount: '₹50,00,000',
        maxLoanAmountHi: '₹50,00,000',
        link: '/business/loans/business-loan',
        image: '/images/products/business-loan.jpg'
      },
      {
        id: '6',
        name: 'Fixed Deposit',
        nameHi: 'सावध जमा',
        category: 'Personal Banking',
        categoryHi: 'व्यक्तिग बैंकिंग',
        features: ['Guaranteed Returns', 'Flexible Tenure', 'Loan Against FD', 'Auto Renewal'],
        featuresHi: ['गारंटीड रिटर्न', 'लचीली अवधि', 'एफडी के खिलाफ लोन', 'ऑटो नवीकरण'],
        pros: ['Safe investment', 'Higher interest than savings', 'Loan facility available'],
        prosHi: ['सुरक्षित निवेश', 'बचत से अधिक ब्याज', 'ऋण सुविधा उपलब्ध'],
        cons: ['Low liquidity', 'Interest taxable', 'Fixed tenure'],
        consHi: ['कम तरलता', 'ब्याज पर कर लगानय', 'निश्चित अवधि'],
        interestRate: '6.5%',
        interestRateHi: '6.5%',
        processingFee: '0%',
        processingFeeHi: '0%',
        link: '/personal/deposits/fixed-deposit',
        image: '/images/products/fixed-deposit.jpg'
      }
    ];
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else if (prev.length < 4) {
        return [...prev, productId];
      } else {
        return prev; // Maximum 4 products can be compared
      }
    });
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  const selectedProductsData = products.filter(product => selectedProducts.includes(product.id));

  const getComparisonValue = (product: Product, criterion: string) => {
    switch (criterion) {
      case 'interest':
        return product.interestRate || 'N/A';
      case 'fees':
        return product.processingFee || 'N/A';
      case 'features':
        return product.features.length;
      default:
        return 'N/A';
    }
  };

  const getWinner = (criterion: string) => {
    if (selectedProductsData.length === 0) return null;
    
    let winner = selectedProductsData[0];
    
    if (criterion === 'interest') {
      winner = selectedProductsData.reduce((best, current) => {
        const bestRate = parseFloat(best.interestRate || '0');
        const currentRate = parseFloat(current.interestRate || '0');
        return currentRate < bestRate ? current : best;
      });
    } else if (criterion === 'fees') {
      winner = selectedProductsData.reduce((best, current) => {
        const bestFee = parseFloat(best.processingFee || '0');
        const currentFee = parseFloat(current.processingFee || '0');
        return currentFee < bestFee ? current : best;
      });
    } else if (criterion === 'features') {
      winner = selectedProductsData.reduce((best, current) => 
        current.features.length > best.features.length ? current : best
      );
    }
    
    return winner;
  };

  // Loading state
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-card border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {locale === 'hi' ? 'उत्पाद तुलना' : 'Product Comparison'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {locale === 'hi' 
            ? 'अपनी आवश्यकताओं के अनुसार उत्पादों की तुलना करें'
            : 'Compare our banking products side-by-side to make informed decisions'
          }
        </p>
      </div>

      {/* Product Selection */}
      <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === 'hi' ? 'उत्पाद के लिए उत्पाद चुनें' : 'Select Products to Compare'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {locale === 'hi' 
            ? 'अधिकतम 4 उत्पादों का चयन करें (अभी {4 - selectedProducts.length} उपलब्ध)'
            : `Select up to 4 products to compare (${4 - selectedProducts.length} remaining)`
          }
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedProducts.includes(product.id)
                  ? 'border-bank-blue-500 bg-bank-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleProductSelection(product.id)}
            >
              <div className="flex items-center mb-2">
                <img
                  src={product.image}
                  alt={locale === 'hi' ? product.nameHi : product.name}
                  className="w-12 h-12 object-cover rounded mr-3"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {locale === 'hi' ? product.nameHi : product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === 'hi' ? product.categoryHi : product.category}
                  </p>
                </div>
                {selectedProducts.includes(product.id) && (
                  <div className="w-6 h-6 bg-bank-blue-600 text-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-600">
                {product.interestRate && (
                  <div>
                    <span className="font-medium">{locale === 'hi' ? 'ब्याज दर:' : 'Interest Rate:'}</span> {product.interestRate}
                  </div>
                )}
                {product.processingFee && (
                  <div>
                    <span className="font-medium">{locale === 'hi' ? 'प्रसंस्करण शुल्क:' : 'Processing Fee:'}</span> {product.processingFee}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {selectedProducts.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={clearComparison}
              className="btn-outline border-red-600 text-red-600 hover:bg-red-50"
            >
              {locale === 'hi' ? 'साफ करें' : 'Clear Comparison'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selectedProductsData.length > 0 && (
        <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === 'hi' ? 'उत्पाद तालिका' : 'Comparison Table'}
            </h3>
            
            {/* Criteria Selection */}
            <div className="flex space-x-2">
              {['features', 'interest', 'fees'].map((criterion) => (
                <button
                  key={criterion}
                  onClick={() => setComparisonCriteria(prev => 
                    prev.includes(criterion) 
                      ? prev.filter(c => c !== criterion)
                      : [...prev, criterion]
                  )}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    comparisonCriteria.includes(criterion)
                      ? 'bg-bank-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {locale === 'hi' 
                    ? (criterion === 'features' ? 'विशेष' : criterion === 'interest' ? 'ब्याज' : 'शुल्क')
                    : (criterion === 'features' ? 'Features' : criterion === 'interest' ? 'Interest' : 'Fees')
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    {locale === 'hi' ? 'विशेष' : 'Feature'}
                  </th>
                  {selectedProductsData.map((product) => (
                    <th key={product.id} className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-900">
                      {locale === 'hi' ? product.nameHi : product.name}
                    </th>
                  ))}
                  <th className="border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-900">
                    {locale === 'hi' ? 'विजेता' : 'Winner'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Features Row */}
                {comparisonCriteria.includes('features') && (
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                      {locale === 'hi' ? 'मुख्य विशेष' : 'Key Features'}
                    </td>
                    {selectedProductsData.map((product) => (
                      <td key={product.id} className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                        <ul className="space-y-1">
                          {(locale === 'hi' ? product.featuresHi : product.features).slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-3 h-3 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    <td className="border border-gray-200 px-4 py-3 text-center text-sm">
                      {getWinner('features') && (
                        <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {locale === 'hi' ? 'विजेता' : 'Winner'}
                        </div>
                      )}
                    </td>
                  </tr>
                )}

                {/* Interest Rate Row */}
                {comparisonCriteria.includes('interest') && (
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                      {locale === 'hi' ? 'ब्याज दर' : 'Interest Rate'}
                    </td>
                    {selectedProductsData.map((product) => (
                      <td key={product.id} className="border border-gray-200 px-4 py-3 text-center text-sm">
                        {product.interestRate && (
                          <span className={`font-bold ${
                            getWinner('interest')?.id === product.id ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {product.interestRate}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="border border-gray-200 px-4 py-3 text-center text-sm">
                      {getWinner('interest') && (
                        <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {locale === 'hi' ? 'विजेता' : 'Winner'}
                        </div>
                      )}
                    </td>
                  </tr>
                )}

                {/* Processing Fee Row */}
                {comparisonCriteria.includes('fees') && (
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                      {locale === 'hi' ? 'प्रसंस्करण शुल्क' : 'Processing Fee'}
                    </td>
                    {selectedProductsData.map((product) => (
                      <td key={product.id} className="border border-gray-200 px-4 py-3 text-center text-sm">
                        {product.processingFee && (
                          <span className={`font-bold ${
                            getWinner('fees')?.id === product.id ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {product.processingFee}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="border border-gray-200 px-4 py-3 text-center text-sm">
                      {getWinner('fees') && (
                        <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {locale === 'hi' ? 'विजेता' : 'Winner'}
                        </div>
                      )}
                    </td>
                  </tr>
                )}

                {/* Pros Row */}
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                    {locale === 'hi' ? 'लाभ' : 'Pros'}
                  </td>
                  {selectedProductsData.map((product) => (
                    <td key={product.id} className="border border-gray-200 px-4 py-3 text-sm">
                      <ul className="space-y-1">
                        {(locale === 'hi' ? product.prosHi : product.pros).slice(0, 2).map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-3 h-3 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  <td className="border border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
                    {locale === 'hi' ? 'लागू करें' : 'Compare'}
                  </td>
                </tr>

                {/* Cons Row */}
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                    {locale === 'hi' ? 'दोष' : 'Cons'}
                  </td>
                  {selectedProductsData.map((product) => (
                    <td key={product.id} className="border border-gray-200 px-4 py-3 text-sm">
                      <ul className="space-y-1">
                        {(locale === 'hi' ? product.consHi : product.cons).slice(0, 2).map((con, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-3 h-3 text-red-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  <td className="border border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
                    {locale === 'hi' ? 'लागू करें' : 'Compare'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            {selectedProductsData.map((product) => (
              <a
                key={product.id}
                href={product.link}
                className="btn-primary"
              >
                {locale === 'hi' ? 'आवेदन करें' : 'Apply Now'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedProducts.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002 2V9a2 2 0 002 2h-8a2 2 0 00-2-2v-6a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {locale === 'hi' ? 'उत्पाद के लिए उत्पाद चुनें' : 'Select Products to Compare'}
          </h3>
          <p className="text-gray-600">
            {locale === 'hi' 
              ? 'ऊपर दिए गए उत्पादों में से किसी भी 4 को चुनकर तुलना शुरू करें'
              : 'Choose up to 4 products from the selection above to start comparing'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductComparison;
