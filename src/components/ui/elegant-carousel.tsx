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
    link: '/personal/loans/home-loan',
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
    link: '/personal/savings-account',
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
    link: '/business/current-account',
    linkText: 'Explore Solutions',
    linkTextHi: 'समाधान अन्वेषण करें'
  }
];

interface ElegantCarouselProps {
  locale?: Locale;
  className?: string;
}

export default function ElegantCarousel({ locale: propLocale, className = '' }: ElegantCarouselProps) {
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
      className={`carousel-wrapper ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-inner">
        {/* Left: Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(bankingSlides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {locale === 'hi' ? currentSlide.titleHi : currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle ${isTransitioning ? 'transitioning' : 'visible'}`}
              style={{ color: currentSlide.accent }}
            >
              {locale === 'hi' ? currentSlide.subtitleHi : currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {locale === 'hi' ? currentSlide.descriptionHi : currentSlide.description}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => handleSlideClick(currentSlide)}
              className={`carousel-cta-btn ${isTransitioning ? 'transitioning' : 'visible'}`}
              style={{ backgroundColor: currentSlide.accent }}
            >
              {locale === 'hi' ? currentSlide.linkTextHi : currentSlide.linkText}
            </button>

            {/* Navigation Arrows */}
            <div className="carousel-nav-arrows">
              <button
                onClick={goPrev}
                className="carousel-arrow-btn"
                aria-label={locale === 'hi' ? 'पिछला स्लाइड' : 'Previous slide'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="carousel-arrow-btn"
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
        <div className="carousel-image-container">
          <div
            className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
          >
            <img
              src={currentSlide.imageUrl}
              alt={locale === 'hi' ? currentSlide.titleHi : currentSlide.title}
              className="carousel-image"
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
              className="carousel-image-overlay"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Decorative frame corner */}
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: currentSlide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: currentSlide.accent }} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="carousel-progress-bar">
        {bankingSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
            aria-label={locale === 'hi' ? `स्लाइड ${index + 1} पर जाएं` : `Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">
              {locale === 'hi' ? slide.titleHi : slide.title}
            </span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .carousel-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .carousel-bg-wash {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .carousel-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .carousel-content {
          flex: 1;
          padding: 4rem;
          max-width: 600px;
        }

        .carousel-content-inner {
          position: relative;
        }

        .carousel-collection-num {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .carousel-collection-num.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-collection-num.transitioning {
          opacity: 0;
          transform: translateY(-20px);
        }

        .carousel-num-line {
          width: 2rem;
          height: 1px;
          background: currentColor;
        }

        .carousel-num-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          letter-spacing: 0.05em;
        }

        .carousel-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
          color: #1e293b;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
        }

        .carousel-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-title.transitioning {
          opacity: 0;
          transform: translateY(-20px);
        }

        .carousel-subtitle {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .carousel-subtitle.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-subtitle.transitioning {
          opacity: 0;
          transform: translateY(-20px);
        }

        .carousel-description {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
        }

        .carousel-description.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-description.transitioning {
          opacity: 0;
          transform: translateY(-20px);
        }

        .carousel-cta-btn {
          padding: 0.875rem 2rem;
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
        }

        .carousel-cta-btn.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-cta-btn.transitioning {
          opacity: 0;
          transform: translateY(-20px);
        }

        .carousel-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .carousel-nav-arrows {
          display: flex;
          gap: 1rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
        }

        .carousel-nav-arrows.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-nav-arrows.transitioning {
          opacity: 0;
          transform: translateY(-20px);
        }

        .carousel-arrow-btn {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: white;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-arrow-btn:hover {
          background: #f8fafc;
          color: #1e293b;
          transform: scale(1.05);
        }

        .carousel-image-container {
          flex: 1;
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-image-frame {
          position: relative;
          width: 100%;
          height: 80%;
          border-radius: 1rem;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .carousel-image-frame.visible {
          opacity: 1;
          transform: scale(1);
        }

        .carousel-image-frame.transitioning {
          opacity: 0;
          transform: scale(1.05);
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .carousel-frame-corner {
          position: absolute;
          width: 2rem;
          height: 2rem;
          border-width: 0 0 3px 3px;
          border-style: solid;
          border-color: #1e40af;
        }

        .carousel-frame-corner--tl {
          top: -1px;
          left: -1px;
        }

        .carousel-frame-corner--br {
          bottom: -1px;
          right: -1px;
          transform: rotate(180deg);
        }

        .carousel-progress-bar {
          position: absolute;
          bottom: 2rem;
          left: 4rem;
          right: 4rem;
          display: flex;
          gap: 1rem;
          z-index: 10;
        }

        .carousel-progress-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
        }

        .carousel-progress-track {
          width: 100%;
          height: 2px;
          background: #e2e8f0;
          border-radius: 1px;
          overflow: hidden;
        }

        .carousel-progress-fill {
          height: 100%;
          background: #1e40af;
          transition: width 0.1s linear;
        }

        .carousel-progress-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .carousel-progress-item.active .carousel-progress-label {
          color: #1e293b;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .carousel-wrapper {
            height: 500px;
          }

          .carousel-content {
            padding: 2rem;
          }

          .carousel-title {
            font-size: 2.5rem;
          }

          .carousel-image-frame {
            height: 70%;
          }
        }

        @media (max-width: 768px) {
          .carousel-wrapper {
            height: auto;
            min-height: 600px;
          }

          .carousel-inner {
            flex-direction: column;
            padding: 2rem;
          }

          .carousel-content {
            padding: 0;
            max-width: 100%;
            margin-bottom: 2rem;
          }

          .carousel-title {
            font-size: 2rem;
          }

          .carousel-image-container {
            width: 100%;
            height: 300px;
          }

          .carousel-progress-bar {
            left: 2rem;
            right: 2rem;
            bottom: 1rem;
          }

          .carousel-progress-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
