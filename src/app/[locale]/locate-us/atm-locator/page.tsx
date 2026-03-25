'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { Location, LocationSearchParams, LocationSearchResult, GeolocationInfo, ATM } from '@/lib/location/types';
import LocationSearch from '@/components/location/LocationSearch';
import MapMarkers from '@/components/location/MapMarkers';

interface ATMLocatorProps {
  locale: 'en' | 'hi';
}

const ATMLocator: React.FC<ATMLocatorProps> = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<GeolocationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchParams, setSearchParams] = useState<LocationSearchParams>({});
  const [showDirections, setShowDirections] = useState(false);
  const [directions, setDirections] = useState<any>(null);

  useEffect(() => {
    trackPageView('ATM Locator', locale === 'hi' ? 'एटीएम लोकेटर' : 'ATM Locator');
    fetchATMs();
  }, [locale]);

  const fetchATMs = async () => {
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
        // Mock ATM data
        const mockATMs: Location[] = [
          {
            id: 'atm-001',
            type: 'atm',
            name: 'Connaught Place ATM',
            nameHi: 'कनॉट प्लेस एटीएम',
            address: {
              line1: 'Outer Circle, Connaught Place',
              line1Hi: 'आउटर सर्कल, कनॉट प्लेस',
              line2: 'New Delhi - 110001',
              line2Hi: 'नई दिल्ली - 110001',
              city: 'New Delhi',
              cityHi: 'नई दिल्ली',
              state: 'Delhi',
              stateHi: 'दिल्ली',
              pincode: '110001',
              country: 'India',
              countryHi: 'भारत',
              latitude: 28.6310,
              longitude: 77.2190
            },
            contact: {
              phone: '+91-11-23456789'
            },
            hours: {
              monday: '24/7',
              mondayHi: '24/7',
              tuesday: '24/7',
              tuesdayHi: '24/7',
              wednesday: '24/7',
              wednesdayHi: '24/7',
              thursday: '24/7',
              thursdayHi: '24/7',
              friday: '24/7',
              fridayHi: '24/7',
              saturday: '24/7',
              saturdayHi: '24/7',
              sunday: '24/7',
              sundayHi: '24/7'
            },
            services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement'],
            servicesHi: ['नकद निकासी', 'शेष जांच', 'मिनी स्टेटमेंट'],
            features: [
              { id: '247', name: '24/7 Service', nameHi: '24/7 सेवा', icon: '🕐', available: true },
              { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: '♿', available: true },
              { id: 'cctv', name: 'CCTV Security', nameHi: 'सीसीटीवी सुरक्षा', icon: '📹', available: true }
            ],
            status: 'active',
            images: ['/images/atms/connaught-place-1.jpg'],
            lastUpdated: '2024-01-15T08:00:00Z'
          },
          {
            id: 'atm-002',
            type: 'atm',
            name: 'Karol Bagh Market ATM',
            nameHi: 'करोल बाग मार्केट एटीएम',
            address: {
              line1: 'Ajmal Khan Road, Near Karol Bagh Market',
              line1Hi: 'अजमल खान रोड, करोल बाग मार्केट के पास',
              line2: 'New Delhi - 110005',
              line2Hi: 'नई दिल्ली - 110005',
              city: 'New Delhi',
              cityHi: 'नई दिल्ली',
              state: 'Delhi',
              stateHi: 'दिल्ली',
              pincode: '110005',
              country: 'India',
              countryHi: 'भारत',
              latitude: 28.6475,
              longitude: 77.1935
            },
            contact: {
              phone: '+91-11-45678901'
            },
            hours: {
              monday: '24/7',
              mondayHi: '24/7',
              tuesday: '24/7',
              tuesdayHi: '24/7',
              wednesday: '24/7',
              wednesdayHi: '24/7',
              thursday: '24/7',
              thursdayHi: '24/7',
              friday: '24/7',
              fridayHi: '24/7',
              saturday: '24/7',
              saturdayHi: '24/7',
              sunday: '24/7',
              sundayHi: '24/7'
            },
            services: ['Cash Withdrawal', 'Balance Inquiry'],
            servicesHi: ['नकद निकासी', 'शेष जांच'],
            features: [
              { id: '247', name: '24/7 Service', nameHi: '24/7 सेवा', icon: '🕐', available: true },
              { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: '♿', available: false },
              { id: 'cctv', name: 'CCTV Security', nameHi: 'सीसीटीवी सुरक्षा', icon: '📹', available: true }
            ],
            status: 'active',
            images: ['/images/atms/karol-bagh-1.jpg'],
            lastUpdated: '2024-01-14T08:00:00Z'
          },
          {
            id: 'atm-003',
            type: 'atm',
            name: 'Janpath Market ATM',
            nameHi: 'जनपथ मार्केट एटीएम',
            address: {
              line1: 'Janpath Market, Near Palika Bazar',
              line1Hi: 'जनपथ मार्केट, पालिका बाजार के पास',
              line2: 'New Delhi - 110001',
              line2Hi: 'नई दिल्ली - 110001',
              city: 'New Delhi',
              cityHi: 'नई दिल्ली',
              state: 'Delhi',
              stateHi: 'दिल्ली',
              pincode: '110001',
              country: 'India',
              countryHi: 'भारत',
              latitude: 28.6260,
              longitude: 77.2140
            },
            contact: {
              phone: '+91-11-23456790'
            },
            hours: {
              monday: '24/7',
              mondayHi: '24/7',
              tuesday: '24/7',
              tuesdayHi: '24/7',
              wednesday: '24/7',
              wednesdayHi: '24/7',
              thursday: '24/7',
              thursdayHi: '24/7',
              friday: '24/7',
              fridayHi: '24/7',
              saturday: '24/7',
              saturdayHi: '24/7',
              sunday: '24/7',
              sundayHi: '24/7'
            },
            services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement', 'Mobile Recharge'],
            servicesHi: ['नकद निकासी', 'शेष जांच', 'मिनी स्टेटमेंट', 'मोबाइल रिचार्ज'],
            features: [
              { id: '247', name: '24/7 Service', nameHi: '24/7 सेवा', icon: '🕐', available: true },
              { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: '♿', available: true },
              { id: 'cctv', name: 'CCTV Security', nameHi: 'सीसीटीवी सुरक्षा', icon: '📹', available: true },
              { id: 'security', name: 'Security Guard', nameHi: 'सुरक्षा गार्ड', icon: '👮', available: true }
            ],
            status: 'active',
            images: ['/images/atms/janpath-1.jpg'],
            lastUpdated: '2024-01-15T09:00:00Z'
          }
        ];
        
        setLocations(mockATMs);
        setFilteredLocations(mockATMs);
      } else {
        throw new Error(result.message || 'Failed to fetch ATMs');
      }
    } catch (err) {
      console.error('Error fetching ATMs:', err);
      setError(locale === 'hi' ? 'एटीएम को लाने में त्रुटि' : 'Error fetching ATMs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (params: LocationSearchParams) => {
    try {
      setIsLoading(true);
      setSearchParams(params);
      setError('');
      
      const queryParams = new URLSearchParams();
      if (params.query) queryParams.append('query', params.query);
      if (params.latitude) queryParams.append('latitude', params.latitude.toString());
      if (params.longitude) queryParams.append('longitude', params.longitude.toString());
      if (params.filters?.radius) queryParams.append('radius', params.filters.radius.toString());
      if (params.filters?.type) queryParams.append('type', params.filters.type);
      if (params.filters?.city) queryParams.append('city', params.filters.city);
      if (params.filters?.state) queryParams.append('state', params.filters.state);
      if (params.filters?.wheelchairAccessible) queryParams.append('wheelchairAccessible', 'true');
      
      const response = await fetch(`/api/locations?${queryParams.toString()}`);
      const result = await response.json();
      
      if (result.success) {
        const searchResult: LocationSearchResult = result.data;
        const atmsOnly = searchResult.locations.filter(loc => loc.type === 'atm');
        setFilteredLocations(atmsOnly);
      } else {
        throw new Error(result.message || 'Search failed');
      }
    } catch (err) {
      console.error('Error searching ATMs:', err);
      setError(locale === 'hi' ? 'एटीएम की खोज में त्रुटि' : 'Error searching ATMs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: any) => {
    setUserLocation({
      latitude: location.position.latitude,
      longitude: location.position.longitude,
      accuracy: 100,
      timestamp: Date.now()
    });
  };

  const handleMarkerClick = (location: Location, marker: any) => {
    setSelectedLocation(location);
  };

  const handleDirections = async (origin: GeolocationInfo, destination: Location) => {
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getDirections',
          origin: { lat: origin.latitude, lng: origin.longitude },
          destination: { lat: destination.address.latitude, lng: destination.address.longitude }
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setDirections(result.data);
        setShowDirections(true);
      } else {
        throw new Error(result.message || 'Failed to get directions');
      }
    } catch (err) {
      console.error('Error getting directions:', err);
      setError(locale === 'hi' ? 'दिशाओं प्राप्त करने में त्रुटि' : 'Error getting directions');
    }
  };

  const getDirectionsFromCurrentLocation = () => {
    if (userLocation && selectedLocation) {
      handleDirections(userLocation, selectedLocation);
    }
  };

  const callATM = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getATMServices = (atm: Location): string[] => {
    // Extract ATM-specific services from the location
    const atmServices = [];
    
    if (atm.services.includes('Cash Withdrawal')) {
      atmServices.push(locale === 'hi' ? 'नकद निकासी' : 'Cash Withdrawal');
    }
    if (atm.services.includes('Balance Inquiry')) {
      atmServices.push(locale === 'hi' ? 'शेष जांच' : 'Balance Inquiry');
    }
    if (atm.services.includes('Mini Statement')) {
      atmServices.push(locale === 'hi' ? 'मिनी स्टेटमेंट' : 'Mini Statement');
    }
    if (atm.services.includes('Mobile Recharge')) {
      atmServices.push(locale === 'hi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge');
    }
    if (atm.services.includes('Bill Payment')) {
      atmServices.push(locale === 'hi' ? 'बिल भुगतान' : 'Bill Payment');
    }
    
    return atmServices;
  };

  return (
    <div className="atm-locator">
      {/* Header */}
      <div className="locator-header">
        <div className="header-content">
          <h1 className="page-title">
            {locale === 'hi' ? 'एटीएम लोकेटर' : 'ATM Locator'}
          </h1>
          <p className="page-subtitle">
            {locale === 'hi' 
              ? 'अपने निकटतम एटीएम खोजें'
              : 'Find your nearest ATMs'
            }
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <LocationSearch
          locale={locale}
          onSearch={handleSearch}
          onLocationSelect={handleLocationSelect}
          placeholder={locale === 'hi' ? 'एटीएम खोजें...' : 'Search ATMs...'}
          initialFilters={{
            type: 'atm',
            radius: 5,
            status: 'active'
          }}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="locator-content">
        {/* Map Section */}
        <div className="map-section">
          <MapMarkers
            locale={locale}
            locations={filteredLocations}
            center={userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : undefined}
            onMarkerClick={handleMarkerClick}
            onMapClick={(position) => {
              console.log('Map clicked:', position);
            }}
            userLocation={userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : undefined}
            selectedLocation={selectedLocation || undefined}
            directions={directions}
            height="500px"
          />
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              {locale === 'hi' ? 'एटीएम' : 'ATMs'} ({filteredLocations.length})
            </h2>
            {userLocation && (
              <div className="user-location-info">
                {locale === 'hi' ? 'आपका स्थान:' : 'Your location:'} {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>{locale === 'hi' ? 'एटीएम लोड हो रहे हैं...' : 'Loading ATMs...'}</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏧</div>
              <h3>{locale === 'hi' ? 'कोई एटीएम नहीं मिला' : 'No ATMs found'}</h3>
              <p>{locale === 'hi' 
                ? 'कृपया अपनी खोज मानदंडों को समायोजित करें'
                : 'Please adjust your search criteria'
              }</p>
            </div>
          ) : (
            <div className="atms-list">
              {filteredLocations.map((atm) => (
                <div 
                  key={atm.id} 
                  className={`atm-card ${selectedLocation?.id === atm.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLocation(atm)}
                  data-testid={`atm-${atm.id}`}
                >
                  <div className="atm-header">
                    <div className="atm-info">
                      <h3 className="atm-name">
                        {locale === 'hi' ? atm.nameHi : atm.name}
                      </h3>
                      <div className="atm-status">
                        <span className={`status-badge ${atm.status}`}>
                          {atm.status === 'active' 
                            ? (locale === 'hi' ? 'सक्रिय' : 'Active')
                            : (locale === 'hi' ? 'निष्क्रिय' : 'Inactive')
                          }
                        </span>
                        {atm.distance && (
                          <span className="distance-badge">
                            {atm.distance.toFixed(1)} km
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="atm-hours">
                      <span className="hours-icon">🕐</span>
                      <span className="hours-text">
                        {locale === 'hi' ? '24/7' : '24/7'}
                      </span>
                    </div>
                  </div>

                  <div className="atm-address">
                    <p>
                      {locale === 'hi' ? atm.address.line1Hi : atm.address.line1}
                      {atm.address.line2 && <><br />{locale === 'hi' ? atm.address.line2Hi : atm.address.line2}</>}
                      <br />
                      {locale === 'hi' ? atm.address.cityHi : atm.address.city}, {locale === 'hi' ? atm.address.stateHi : atm.address.state} {atm.address.pincode}
                    </p>
                  </div>

                  <div className="atm-contact">
                    <div className="contact-item">
                      <span className="contact-label">{locale === 'hi' ? 'फोन:' : 'Phone:'}</span>
                      <a href={`tel:${atm.contact.phone}`} className="contact-value">
                        {atm.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="atm-services">
                    <div className="services-label">{locale === 'hi' ? 'सेवाएं:' : 'Services:'}</div>
                    <div className="services-list">
                      {getATMServices(atm).map((service, index) => (
                        <span key={index} className="service-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="atm-features">
                    {atm.features.filter(f => f.available).map((feature) => (
                      <span key={feature.id} className="feature-badge" title={locale === 'hi' ? feature.nameHi : feature.name}>
                        {feature.icon}
                      </span>
                    ))}
                  </div>

                  <div className="atm-details">
                    <div className="detail-item">
                      <span className="detail-label">{locale === 'hi' ? 'प्रकार:' : 'Type:'}</span>
                      <span className="detail-value">
                        {locale === 'hi' ? 'एटीएम' : 'ATM'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">{locale === 'hi' ? 'स्थिति:' : 'Status:'}</span>
                      <span className={`detail-value ${atm.status}`}>
                        {atm.status === 'active' 
                          ? (locale === 'hi' ? 'सक्रिय' : 'Active')
                          : (locale === 'hi' ? 'निष्क्रिय' : 'Inactive')
                        }
                      </span>
                    </div>
                  </div>

                  <div className="atm-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (userLocation) {
                          handleDirections(userLocation, atm);
                        }
                      }}
                      disabled={!userLocation}
                      className="action-button primary"
                      data-testid={`directions-${atm.id}`}
                    >
                      {locale === 'hi' ? 'दिशाएं' : 'Directions'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        callATM(atm.contact.phone);
                      }}
                      className="action-button secondary"
                      data-testid={`call-${atm.id}`}
                    >
                      {locale === 'hi' ? 'कॉल करें' : 'Call'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/${locale}/locate-us/atm-details/${atm.id}`;
                      }}
                      className="action-button tertiary"
                      data-testid={`details-${atm.id}`}
                    >
                      {locale === 'hi' ? 'विवरण' : 'Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="selected-location-panel">
          <div className="panel-header">
            <h3>{locale === 'hi' ? 'चयनित एटीएम' : 'Selected ATM'}</h3>
            <button 
              onClick={() => setSelectedLocation(null)}
              className="close-button"
              data-testid="close-selected"
            >
              ×
            </button>
          </div>
          
          <div className="panel-content">
            <h4>{locale === 'hi' ? selectedLocation.nameHi : selectedLocation.name}</h4>
            <p>{locale === 'hi' ? selectedLocation.address.line1Hi : selectedLocation.address.line1}</p>
            
            <div className="atm-services-summary">
              <div className="services-label">{locale === 'hi' ? 'सेवाएं:' : 'Services:'}</div>
              <div className="services-list">
                {getATMServices(selectedLocation).map((service, index) => (
                  <span key={index} className="service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            {userLocation && (
              <div className="directions-actions">
                <button
                  onClick={() => handleDirections(userLocation, selectedLocation)}
                  className="directions-button"
                  data-testid="get-directions"
                >
                  {locale === 'hi' ? 'दिशाएं प्राप्त करें' : 'Get Directions'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .atm-locator {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .locator-header {
          background: linear-gradient(135deg, #28a745, #218838);
          color: white;
          padding: 2rem 0;
          text-align: center;
        }

        .header-content h1 {
          margin: 0 0 0.5rem 0;
          font-size: 2.5rem;
          font-weight: 600;
        }

        .header-content p {
          margin: 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .search-section {
          padding: 2rem 1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          margin: 1rem;
          border-radius: 4px;
          text-align: center;
        }

        .locator-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
          padding: 0 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .locator-content {
            grid-template-columns: 1fr;
          }
        }

        .map-section {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .results-section {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-height: 80vh;
          overflow-y: auto;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #dee2e6;
        }

        .results-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
        }

        .user-location-info {
          font-size: 0.875rem;
          color: #666;
        }

        .loading-state {
          text-align: center;
          padding: 2rem;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #28a745;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .empty-state p {
          margin: 0;
          color: #666;
        }

        .atms-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .atm-card {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .atm-card:hover {
          border-color: #28a745;
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
        }

        .atm-card.selected {
          border-color: #28a745;
          background: #f8fff8;
        }

        .atm-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .atm-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .atm-status {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge.active {
          background: #d4edda;
          color: #155724;
        }

        .distance-badge {
          background: #d1ecf1;
          color: #0c5460;
        }

        .atm-hours {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .hours-icon {
          font-size: 1.2rem;
        }

        .hours-text {
          font-size: 0.875rem;
          color: #28a745;
          font-weight: 500;
        }

        .atm-address,
        .atm-contact {
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
          color: #666;
        }

        .contact-label {
          font-weight: 500;
          color: #333;
        }

        .contact-value {
          color: #28a745;
          text-decoration: none;
        }

        .contact-value:hover {
          text-decoration: underline;
        }

        .atm-services {
          margin-bottom: 0.75rem;
        }

        .services-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 0.25rem;
        }

        .services-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .service-tag {
          background: #e9ecef;
          border: 1px solid #dee2e6;
          border-radius: 12px;
          padding: 0.125rem 0.5rem;
          font-size: 0.75rem;
          color: #495057;
        }

        .atm-features {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .feature-badge {
          font-size: 1.2rem;
          opacity: 0.7;
        }

        .atm-details {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .detail-label {
          font-weight: 500;
          color: #333;
        }

        .detail-value {
          color: #666;
        }

        .detail-value.active {
          color: #28a745;
          font-weight: 500;
        }

        .atm-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          opacity: 0.8;
        }

        .action-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-button.primary {
          background: #28a745;
          color: white;
        }

        .action-button.secondary {
          background: #007bff;
          color: white;
        }

        .action-button.tertiary {
          background: #6c757d;
          color: white;
        }

        .selected-location-panel {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #dee2e6;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #dee2e6;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .panel-content {
          padding: 1rem;
        }

        .panel-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .panel-content p {
          margin: 0 0 1rem 0;
          color: #666;
        }

        .atm-services-summary {
          margin-bottom: 1rem;
        }

        .directions-actions {
          display: flex;
          gap: 0.5rem;
        }

        .directions-button {
          padding: 0.75rem 1.5rem;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .directions-button:hover {
          background: #218838;
        }
      `}</style>
    </div>
  );
};

export default ATMLocator;
