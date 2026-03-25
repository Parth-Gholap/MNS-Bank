'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { Location, LocationStats } from '@/lib/location/types';
import Link from 'next/link';

interface LocationOverviewProps {
  locale: 'en' | 'hi';
}

const LocationOverview: React.FC<LocationOverviewProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [stats, setStats] = useState<LocationStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    trackPageView('Location Overview', locale === 'hi' ? 'स्थान अवलोकन' : 'Location Overview');
    fetchLocationStats();
    getUserLocation();
  }, [locale]);

  const fetchLocationStats = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getStats'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch location stats');
      }
    } catch (err) {
      console.error('Error fetching location stats:', err);
      setError(locale === 'hi' ? 'स्थान आँकड़े लाने में त्रुटि' : 'Error fetching location stats');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied or unavailable');
        }
      );
    }
  };

  const findNearestLocations = (type: 'branch' | 'atm') => {
    const baseUrl = `/${locale}/locate-us/${type}-locator`;
    if (userLocation) {
      return `${baseUrl}?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;
    }
    return baseUrl;
  };

  const popularLocations = [
    {
      id: 'cp',
      name: 'Connaught Place',
      nameHi: 'कनॉट प्लेस',
      description: 'Business and shopping district',
      descriptionHi: 'व्यावसायिक और खरीदारी जिला',
      branches: 2,
      atms: 3,
      image: '/images/locations/connaught-place.jpg'
    },
    {
      id: 'kb',
      name: 'Karol Bagh',
      nameHi: 'करोल बाग',
      description: 'Shopping market area',
      descriptionHi: 'खरीदारी बाजार क्षेत्र',
      branches: 1,
      atms: 2,
      image: '/images/locations/karol-bagh.jpg'
    },
    {
      id: 'jp',
      name: 'Janpath',
      nameHi: 'जनपथ',
      description: 'Tourist and shopping area',
      descriptionHi: 'पर्यटक और खरीदारी क्षेत्र',
      branches: 1,
      atms: 1,
      image: '/images/locations/janpath.jpg'
    }
  ];

  const services = [
    {
      icon: '🏦',
      title: locale === 'hi' ? 'शाखा लोकेटर' : 'Branch Locator',
      description: locale === 'hi' 
        ? 'अपने निकटतम बैंक शाखाएं खोजें'
        : 'Find your nearest bank branches',
      link: `/${locale}/locate-us/branch-locator`,
      color: '#007bff'
    },
    {
      icon: '🏧',
      title: locale === 'hi' ? 'एटीएम लोकेटर' : 'ATM Locator',
      description: locale === 'hi' 
        ? 'अपने निकटतम एटीएम खोजें'
        : 'Find your nearest ATMs',
      link: `/${locale}/locate-us/atm-locator`,
      color: '#28a745'
    },
    {
      icon: '📍',
      title: locale === 'hi' ? 'नक्शा दृश्य' : 'Map View',
      description: locale === 'hi' 
        ? 'सभी स्थानों को नक्शे पर देखें'
        : 'View all locations on map',
      link: `/${locale}/locate-us/map-view`,
      color: '#17a2b8'
    },
    {
      icon: '📞',
      title: locale === 'hi' ? 'संपर्क' : 'Contact Us',
      description: locale === 'hi' 
        ? 'ग्राहक सेवा से संपर्क करें'
        : 'Contact customer service',
      link: `/${locale}/contact`,
      color: '#ffc107'
    }
  ];

  const features = [
    {
      icon: '🕐',
      title: locale === 'hi' ? '24/7 एटीएम सेवा' : '24/7 ATM Service',
      description: locale === 'hi' 
        ? 'किसी भी समय नकद निकासी'
        : 'Cash withdrawal anytime'
    },
    {
      icon: '♿',
      title: locale === 'hi' ? 'व्हीलचेयर पहुंच' : 'Wheelchair Access',
      description: locale === 'hi' 
        ? 'सभी स्थान व्हीलचेयर पहुंच योग्य'
        : 'All locations wheelchair accessible'
    },
    {
      icon: '📱',
      title: locale === 'hi' ? 'मोबाइल बैंकिंग' : 'Mobile Banking',
      description: locale === 'hi' 
        ? 'बैंकिंग सेवाएं अपने फोन पर'
        : 'Banking services on your phone'
    },
    {
      icon: '🔒',
      title: locale === 'hi' ? 'सुरक्षित लेनदेन' : 'Secure Transactions',
      description: locale === 'hi' 
        ? 'सुरक्षित और सुरक्षित लेनदेन'
        : 'Safe and secure transactions'
    },
    {
      icon: '🎯',
      title: locale === 'hi' ? 'निकटतम स्थान' : 'Nearest Location',
      description: locale === 'hi' 
        ? 'अपने निकटतम शाखा/एटीएम खोजें'
        : 'Find nearest branch/ATM'
    },
    {
      icon: '💬',
      title: locale === 'hi' ? 'हिंदी समर्थन' : 'Hindi Support',
      description: locale === 'hi' 
        ? 'हिंदी में ग्राहक सेवा'
        : 'Customer service in Hindi'
    }
  ];

  if (error) {
    return (
      <div className="location-overview">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>{locale === 'hi' ? 'त्रुटि' : 'Error'}</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            {locale === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}
          </button>
        </div>
        
        <style jsx>{`
          .location-overview {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
          }
          
          .error-container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
          }
          
          .error-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          
          .error-container h2 {
            margin: 0 0 1rem 0;
            color: #333;
          }
          
          .error-container p {
            margin: 0 0 1.5rem 0;
            color: #666;
          }
          
          .error-container button {
            padding: 0.75rem 1.5rem;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          
          .error-container button:hover {
            background: #0056b3;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="location-overview">
      {/* Header */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {locale === 'hi' ? 'हमारे स्थान खोजें' : 'Find Our Locations'}
          </h1>
          <p className="hero-subtitle">
            {locale === 'hi' 
              ? 'अपने निकटतम बैंक शाखाएं और एटीएम खोजें'
              : 'Find your nearest bank branches and ATMs'
            }
          </p>
          
          <div className="hero-stats">
            {stats && (
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{stats.totalBranches}</div>
                  <div className="stat-label">
                    {locale === 'hi' ? 'शाखाएं' : 'Branches'}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.totalATMs}</div>
                  <div className="stat-label">
                    {locale === 'hi' ? 'एटीएम' : 'ATMs'}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.locationsByState['Delhi'] || 0}</div>
                  <div className="stat-label">
                    {locale === 'hi' ? 'दिल्ली में' : 'In Delhi'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="container">
          <h2 className="section-title">
            {locale === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
          </h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <Link key={index} href={service.link} className="service-card">
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Locations */}
      <div className="popular-locations">
        <div className="container">
          <h2 className="section-title">
            {locale === 'hi' ? 'लोकप्रिय स्थान' : 'Popular Locations'}
          </h2>
          <div className="locations-grid">
            {popularLocations.map((location) => (
              <div key={location.id} className="location-card">
                <div className="location-image">
                  <img src={location.image} alt={locale === 'hi' ? location.nameHi : location.name} />
                </div>
                <div className="location-content">
                  <h3 className="location-name">
                    {locale === 'hi' ? location.nameHi : location.name}
                  </h3>
                  <p className="location-description">
                    {locale === 'hi' ? location.descriptionHi : location.description}
                  </p>
                  <div className="location-stats">
                    <span className="location-stat">
                      {location.branches} {locale === 'hi' ? 'शाखाएं' : 'Branches'}
                    </span>
                    <span className="location-stat">
                      {location.atms} {locale === 'hi' ? 'एटीएम' : 'ATMs'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-section">
        <div className="container">
          <h2 className="section-title">
            {locale === 'hi' ? 'हमारी सुविधाएं' : 'Our Features'}
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Location CTA */}
      {userLocation && (
        <div className="user-location-cta">
          <div className="container">
            <div className="cta-content">
              <h3>
                {locale === 'hi' 
                  ? 'अपने निकटतम स्थान खोजें'
                  : 'Find Your Nearest Location'
                }
              </h3>
              <p>
                {locale === 'hi' 
                  ? 'आपके वर्तमान स्थान के आधार पर निकटतम शाखाएं और एटीएम खोजें'
                  : 'Find nearest branches and ATMs based on your current location'
                }
              </p>
              <div className="cta-buttons">
                <Link 
                  href={findNearestLocations('branch')} 
                  className="cta-button primary"
                >
                  {locale === 'hi' ? 'शाखाएं खोजें' : 'Find Branches'}
                </Link>
                <Link 
                  href={findNearestLocations('atm')} 
                  className="cta-button secondary"
                >
                  {locale === 'hi' ? 'एटीएम खोजें' : 'Find ATMs'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="help-section">
        <div className="container">
          <div className="help-content">
            <h2 className="help-title">
              {locale === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help?'}
            </h2>
            <p className="help-description">
              {locale === 'hi' 
                ? 'हमारी ग्राहक सेवा टीम आपकी सहायता के लिए यहां है'
                : 'Our customer service team is here to help you'
              }
            </p>
            <div className="help-actions">
              <Link href={`/${locale}/contact`} className="help-button primary">
                {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
              </Link>
              <Link href={`/${locale}/faq`} className="help-button secondary">
                {locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQ'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .location-overview {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .hero-section {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin: 0 0 2rem 0;
          opacity: 0.9;
        }

        .hero-stats {
          margin-top: 2rem;
        }

        .stats-grid {
          display: flex;
          justify-content: center;
          gap: 4rem;
        }

        @media (max-width: 768px) {
          .stats-grid {
            gap: 2rem;
          }
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.8;
        }

        .quick-actions {
          padding: 4rem 0;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 600;
          text-align: center;
          margin: 0 0 3rem 0;
          color: #333;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .service-card {
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #007bff;
        }

        .service-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .service-description {
          font-size: 1rem;
          color: #666;
          margin: 0 0 1rem 0;
        }

        .service-arrow {
          font-size: 1.5rem;
          color: #007bff;
        }

        .popular-locations {
          padding: 4rem 0;
          background: #f8f9fa;
        }

        .locations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .location-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .location-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .location-image {
          height: 200px;
          overflow: hidden;
        }

        .location-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .location-content {
          padding: 1.5rem;
        }

        .location-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .location-description {
          font-size: 1rem;
          color: #666;
          margin: 0 0 1rem 0;
        }

        .location-stats {
          display: flex;
          gap: 1rem;
        }

        .location-stat {
          font-size: 0.875rem;
          color: #007bff;
          font-weight: 500;
        }

        .features-section {
          padding: 4rem 0;
          background: white;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .feature-description {
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        .user-location-cta {
          padding: 4rem 0;
          background: linear-gradient(135deg, #28a745, #218838);
          color: white;
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h3 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .cta-content p {
          font-size: 1.1rem;
          margin: 0 0 2rem 0;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .cta-button {
          padding: 0.75rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .cta-button.primary {
          background: white;
          color: #28a745;
        }

        .cta-button.primary:hover {
          background: #f8f9fa;
        }

        .cta-button.secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .cta-button.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .help-section {
          padding: 4rem 0;
          background: #f8f9fa;
        }

        .help-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .help-title {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: #333;
        }

        .help-description {
          font-size: 1.1rem;
          color: #666;
          margin: 0 0 2rem 0;
        }

        .help-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .help-button {
          padding: 0.75rem 2rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .help-button.primary {
          background: #007bff;
          color: white;
        }

        .help-button.primary:hover {
          background: #0056b3;
        }

        .help-button.secondary {
          background: #6c757d;
          color: white;
        }

        .help-button.secondary:hover {
          background: #545b62;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .stats-grid {
            gap: 2rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 1.5rem;
          }
          
          .services-grid,
          .locations-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons,
          .help-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-button,
          .help-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default LocationOverview;
