'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { BankIcon } from '@/components/icons';

interface CarouselItem {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  image: string;
  link: string;
  linkText: string;
  linkTextHi: string;
}

interface CarouselProps {
  locale: 'en' | 'hi';
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ locale, className = '' }) => {
  const { t } = useTranslation(locale);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (imageSrc: string) => {
    setImageErrors(prev => new Set(prev).add(imageSrc));
  };

  useEffect(() => {
    setMounted(true);
    trackPageView('Hero Carousel', locale === 'hi' ? 'हीरो कैरोसेल' : 'Hero Carousel');
    fetchCarouselItems();
  }, [locale]);

  const fetchCarouselItems = async () => {
    try {
      const response = await fetch(`/api/bank-data?type=carousel&locale=${locale}`);
      const result = await response.json();
      
      // Debug: Log the actual response
      console.log('Carousel API Response:', result);
      
      if (result.success && result.data && Array.isArray(result.data.carouselItems)) {
        setCarouselItems(result.data.carouselItems);
      } else {
        console.log('Using fallback carousel items');
        setCarouselItems(getStaticCarouselItems());
      }
    } catch (error) {
      console.error('Error fetching carousel items:', error);
      setCarouselItems(getStaticCarouselItems());
    }
  };

  const getStaticCarouselItems = (): CarouselItem[] => {
    return [
      {
        id: '1',
        title: 'Digital Banking Revolution',
        titleHi: 'डिजिटल बैंकिंग क्रांति',
        description: 'Experience the future of banking with our cutting-edge digital platform',
        descriptionHi: 'हमारे अत्याधुरिक डिजिटल प्लेटफॉर्म के साथ बैंकिंग का भविष्य अनुभव करें',
        image: '/images/carousel/digital-banking.jpg',
        link: '/digital-banking',
        linkText: 'Learn More',
        linkTextHi: 'और जानें'
      },
      {
        id: '2',
        title: 'Home Loan at 6.5%',
        titleHi: '6.5% पर होम लोन',
        description: 'Get your dream home with our lowest interest rates',
        descriptionHi: 'हमारी सबसे कम ब्याज दरों पर अपना सपना घर लें',
        image: '/images/carousel/home-loan.jpg',
        link: '/personal/loans/home-loan',
        linkText: 'Apply Now',
        linkTextHi: 'अभी आवेदन करें'
      },
      {
        id: '3',
        title: 'Zero Balance Savings Account',
        titleHi: 'जीरो शेष बचत खाता',
        description: 'Banking without minimum balance requirements',
        descriptionHi: 'न्यूनतम शेष आवश्यकता के बिना बैंकिंग',
        image: '/images/carousel/savings-account.jpg',
        link: '/personal/savings-account',
        linkText: 'Open Account',
        linkTextHi: 'खाता खोलें'
      },
      {
        id: '4',
        title: 'Business Banking Solutions',
        titleHi: 'व्यवसाय बैंकिंग समाधान',
        description: 'Comprehensive banking solutions for your business',
        descriptionHi: 'आपके व्यवसाय के लिए व्यापक बैंकिंग समाधान',
        image: '/images/carousel/business-banking.jpg',
        link: '/business/current-account',
        linkText: 'Explore',
        linkTextHi: 'अन्वेषण करें'
      }
    ];
  };

  const nextSlide = () => {
    if (!carouselItems || carouselItems.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    if (!carouselItems || carouselItems.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index: number) => {
    if (!carouselItems || carouselItems.length === 0) return;
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselItems?.length || 0]);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className={`relative overflow-hidden rounded-lg shadow-lg ${className || ''}`}>
        <div className="relative h-96 md:h-[500px] bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  const currentItem = carouselItems && carouselItems.length > 0 ? carouselItems[currentIndex] : null;

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg ${className || ''}`}>
      {/* Main Carousel */}
      <div className="relative h-96 md:h-[500px]">
        {currentItem && (
          <div className="relative w-full h-full">
            {/* Background Image */}
            {imageErrors.has(currentItem.image) ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <BankIcon className="text-white mb-4 mx-auto" size={64} />
                  <h4 className="text-2xl font-bold">
                    {locale === 'hi' ? currentItem.titleHi : currentItem.title}
                  </h4>
                </div>
              </div>
            ) : (
              <img
                src={currentItem.image}
                alt={locale === 'hi' ? currentItem.titleHi : currentItem.title}
                className="w-full h-full object-cover"
                onError={() => handleImageError(currentItem.image)}
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
              <div className="flex flex-col justify-end h-full p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {locale === 'hi' ? currentItem.titleHi : currentItem.title}
                </h3>
                <p className="text-lg md:text-xl mb-6 max-w-2xl">
                  {locale === 'hi' ? currentItem.descriptionHi : currentItem.description}
                </p>
                <a
                  href={currentItem.link}
                  className="btn-primary inline-block"
                >
                  {locale === 'hi' ? currentItem.linkTextHi : currentItem.linkText}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200"
        aria-label={locale === 'hi' ? 'पिछला स्लाइड' : 'Previous slide'}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200"
        aria-label={locale === 'hi' ? 'अगला स्लाइड' : 'Next slide'}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Auto-play/Pause Control */}
      <button
        onClick={toggleAutoPlay}
        className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200"
        aria-label={isAutoPlaying ? (locale === 'hi' ? 'रोकें' : 'Pause') : (locale === 'hi' ? 'चलाएं' : 'Play')}
      >
        {isAutoPlaying ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 00-.366.364L4.22 18.084a1 1 0 00.364-.364l6.818-11.32A1 1 0 00.364-.364L14.752 11.168z" />
          </svg>
        )}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems && carouselItems.length > 0 && carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={locale === 'hi' ? `स्लाइड ${index + 1}` : `Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
          >
          </button>
        ))}
      </div>

      {/* Mobile Touch Indicators */}
      <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-between px-4">
        <button
          onClick={prevSlide}
          className="text-white/80 hover:text-white p-2"
          aria-label={locale === 'hi' ? 'पिछला' : 'Previous'}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="text-white/80 hover:text-white p-2"
          aria-label={locale === 'hi' ? 'अगला' : 'Next'}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {carouselItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => goToSlide(index)}
            className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              index === currentIndex
                ? 'border-bank-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            aria-label={locale === 'hi' ? item.titleHi : item.title}
            aria-current={index === currentIndex}
          >
            {imageErrors.has(item.image) ? (
              <div className="w-full h-20 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <BankIcon className="text-white" size={24} />
              </div>
            ) : (
              <img
                src={item.image}
                alt={locale === 'hi' ? item.titleHi : item.title}
                className="w-full h-20 object-cover"
                onError={() => handleImageError(item.image)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
              <span className="text-white text-xs font-medium truncate">
                {locale === 'hi' ? item.titleHi : item.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
