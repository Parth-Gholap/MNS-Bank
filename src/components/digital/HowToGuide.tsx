'use client';

import React, { useState } from 'react';

interface GuideStep {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon?: string;
  image?: string;
}

interface HowToGuideProps {
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  steps: GuideStep[];
  locale: 'en' | 'hi';
  className?: string;
}

const HowToGuide: React.FC<HowToGuideProps> = ({ 
  title, 
  titleHi, 
  description, 
  descriptionHi, 
  steps, 
  locale, 
  className = '' 
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-card border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {locale === 'hi' ? titleHi : title}
          </h2>
          <p className="text-gray-600">
            {locale === 'hi' ? descriptionHi : description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {locale === 'hi' ? 'प्रगति' : 'Progress'}
            </span>
            <span className="text-sm text-gray-600">
              {activeStep + 1} / {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-bank-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-bank-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-bank-blue-600 font-bold text-lg">
                {activeStep + 1}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {locale === 'hi' ? steps[activeStep].titleHi : steps[activeStep].title}
              </h3>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700">
              {locale === 'hi' ? steps[activeStep].descriptionHi : steps[activeStep].description}
            </p>
          </div>

          {steps[activeStep].image && (
            <div className="mb-4">
              <img
                src={steps[activeStep].image}
                alt={locale === 'hi' ? steps[activeStep].titleHi : steps[activeStep].title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={activeStep === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {locale === 'hi' ? 'पिछला' : 'Previous'}
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === activeStep
                    ? 'bg-bank-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={activeStep === steps.length - 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeStep === steps.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-bank-blue-600 text-white hover:bg-bank-blue-700'
            }`}
          >
            {locale === 'hi' ? 'अगला' : 'Next'}
          </button>
        </div>

        {/* Complete Message */}
        {activeStep === steps.length - 1 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-800 font-medium">
                {locale === 'hi' ? 'गाइड पूर्ण!' : 'Guide Complete!'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HowToGuide;
