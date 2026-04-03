'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation, type Locale } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

interface SlideData {
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  description: string;
  descriptionHi: string;
  accent: string;
  imageUrl: string;
  link: string;
  linkText: string;
  linkTextHi: string;
}

const bankingSlides: SlideData[] = [
  {
    title: 'Digital Banking Revolution',
    titleHi: 'डिजिटल बैंकिंग क्रांति',
    subtitle: 'Bank Anytime, Anywhere',
    subtitleHi: 'कभी भी, कहीं भी बैंकिंग',
    description: 'Experience the future of banking with our cutting-edge digital platform. Secure, fast, and convenient banking at your fingertips.',
    descriptionHi: 'हमारे अत्याधुरिक डिजिटल प्लेटफॉर्म के साथ बैंकिंग का भविष्य अनुभव करें। सुरक्षित, तेज़ और सुविधाजनक बैंकिंग आपकी उंगलियों पर।',
    accent: '#1e40af',
    imageUrl: '/images/carousel/digital-banking.svg',
    link: '/digital-banking',
    linkText: 'Start Banking',
    linkTextHi: 'बैंकिंग शुरू करें'
  },
  {
    title: 'Home Loans at 6.5%',
    titleHi: '6.5% पर होम लोन',
    subtitle: 'Your Dream Home Awaits',
    subtitleHi: 'आपका सपना घर इंतजार कर रहा है',
    description: 'Get your dream home with our lowest interest rates and flexible repayment options. Quick approval and minimal documentation.',
    descriptionHi: 'हमारी सबसे कम ब्याज दरों और लचीली भुगतान विकल्पों के साथ अपना सपना घर पाएं। त्वरित स्वीकृति और न्यूनतम दस्तावेजीकरण।',
    accent: '#16a34a',
    imageUrl: '/images/carousel/home-loan.svg',
    link: '/personal/loans',
    linkText: 'Apply Now',
    linkTextHi: 'अभी आवेदन करें'
  },
  {
    title: 'Zero Balance Account',
    titleHi: 'जीरो शेष खाता',
    subtitle: 'Banking Without Boundaries',
    subtitleHi: 'बिना सीमाओं के बैंकिंग',
    description: 'Open a savings account with zero minimum balance requirement. Enjoy all banking benefits without financial pressure.',
    descriptionHi: 'बिना न्यूनतम शेष आवश्यकता के बचत खाता खोलें। बिना वित्तीय दबाव के सभी बैंकिंग लाभों का आनंद लें।',
    accent: '#dc2626',
    imageUrl: '/images/carousel/savings-account.svg',
    link: '/apply/account',
    linkText: 'Open Account',
    linkTextHi: 'खाता खोलें'
  },
  {
    title: 'Business Banking Solutions',
    titleHi: 'व्यवसाय बैंकिंग समाधान',
    subtitle: 'Power Your Business Growth',
    subtitleHi: 'अपने व्यवसाय के विकास को शक्ति दें',
    description: 'Comprehensive banking solutions tailored for your business. From working capital to term loans, we support your growth.',
    descriptionHi: 'आपके व्यवसाय के लिए तैयार व्यापक बैंकिंग समाधान। कार्यशील पूंजी से लेकर अवधि ऋण तक, हम आपके विकास का समर्थन करते हैं।',
    accent: '#ea580c',
    imageUrl: '/images/carousel/business-banking.svg',
    link: '/business/accounts',
    linkText: 'Explore Solutions',
    linkTextHi: 'समाधान अन्वेषण करें'
  }
];

interface ElegantCarouselProps {
  locale?: Locale;
  className?: string;
}

export default function ElegantCarouselFixed({ locale: propLocale, className = '' }: ElegantCarouselProps) {
  const { locale: hookLocale } = useTranslation();
  const locale = propLocale || hookLocale;
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % bankingSlides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + bankingSlides.length) % bankingSlides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide]);

  const handleSlideClick = useCallback((slide: SlideData) => {
    trackPageView('Carousel Click', locale === 'hi' ? slide.titleHi : slide.title);
    console.log('Navigating to:', `/${locale}${slide.link}`);
    router.push(`/${locale}${slide.link}`);
  }, [locale, router]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = bankingSlides[currentIndex];

  return (
    <div
      className={`relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-2xl ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="relative w-full h-full flex items-center">
        {/* Left: Text Content */}
        <div className="flex-1 p-16 max-w-2xl">
          <div className="relative">
            {/* Collection number */}
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-800 ${
                isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="w-8 h-0.5 bg-current"></div>
              <span className="text-sm font-medium text-gray-500 tracking-wider">
                {String(currentIndex + 1).padStart(2, '0')} / {String(bankingSlides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`text-5xl font-bold text-gray-900 mb-4 leading-tight transition-all duration-800 ${
                isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {locale === 'hi' ? currentSlide.titleHi : currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`text-xl font-semibold mb-6 transition-all duration-800 ${
                isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
              style={{ 
                color: currentSlide.accent,
                transitionDelay: '200ms'
              }}
            >
              {locale === 'hi' ? currentSlide.subtitleHi : currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`text-lg text-gray-600 mb-8 leading-relaxed transition-all duration-800 ${
                isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {locale === 'hi' ? currentSlide.descriptionHi : currentSlide.description}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => handleSlideClick(currentSlide)}
              className={`px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mb-8 ${
                isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
              style={{ 
                backgroundColor: currentSlide.accent,
                transitionDelay: '400ms'
              }}
            >
              {locale === 'hi' ? currentSlide.linkTextHi : currentSlide.linkText}
            </button>

            {/* Navigation Arrows */}
            <div
              className={`flex gap-4 transition-all duration-800 ${
                isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                aria-label={locale === 'hi' ? 'पिछला स्लाइड' : 'Previous slide'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                aria-label={locale === 'hi' ? 'अगला स्लाइड' : 'Next slide'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 h-full flex items-center justify-center p-8">
          <div
            className={`relative w-full h-[80%] rounded-xl overflow-hidden transition-all duration-800 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <img
              src={currentSlide.imageUrl}
              alt={locale === 'hi' ? currentSlide.titleHi : currentSlide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background = `linear-gradient(135deg, ${currentSlide.accent}22 0%, ${currentSlide.accent}44 100%)`;
                }
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Decorative frame corner */}
          <div 
            className="absolute top-0 left-0 w-8 h-8 border-b-2 border-l-2"
            style={{ borderColor: currentSlide.accent }}
          />
          <div 
            className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-r-2 rotate-180"
            style={{ borderColor: currentSlide.accent }}
          />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-16 right-16 flex gap-4 z-10">
        {bankingSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-1 flex flex-col items-start gap-2 cursor-pointer bg-transparent border-none p-0 text-left ${
              index === currentIndex ? 'active' : ''
            }`}
            aria-label={locale === 'hi' ? `स्लाइड ${index + 1} पर जाएं` : `Go to slide ${index + 1}`}
          >
            <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-100"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                }}
              />
            </div>
            <span className={`text-xs font-medium ${
              index === currentIndex ? 'text-gray-900 font-semibold' : 'text-gray-500'
            }`}>
              {locale === 'hi' ? slide.titleHi : slide.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
