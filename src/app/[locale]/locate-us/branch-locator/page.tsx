'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { Location, LocationSearchParams, LocationSearchResult, GeolocationInfo } from '@/lib/location/types';
import LocationSearch from '@/components/location/LocationSearch';
import MapMarkers from '@/components/location/MapMarkers';

interface BranchLocatorProps {
  locale: 'en' | 'hi';
}

const BranchLocator: React.FC<BranchLocatorProps> = ({ locale }) => {
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
    trackPageView('Branch Locator', locale === 'hi' ? 'शाखा लोकेटर' : 'Branch Locator');
    fetchBranches();
  }, [locale]);

  const fetchBranches = async () => {
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
        // For now, we'll use mock data since the API doesn't return branches directly
        const mockBranches: Location[] = [
          {
            id: 'branch-001',
            type: 'branch',
            name: 'Main Branch - Connaught Place',
            nameHi: 'मुख्य शाखा - कनॉट प्लेस',
            address: {
              line1: 'A-Block, Connaught Place',
              line1Hi: 'ए-ब्लॉक, कनॉट प्लेस',
              line2: 'New Delhi - 110001',
              line2Hi: 'नई दिल्ली - 110001',
              city: 'New Delhi',
              cityHi: 'नई दिल्ली',
              state: 'Delhi',
              stateHi: 'दिल्ली',
              pincode: '110001',
              country: 'India',
              countryHi: 'भारत',
              latitude: 28.6304,
              longitude: 77.2180
            },
            contact: {
              phone: '+91-11-23456789',
              email: 'connaughtplace@mnsbank.com',
              fax: '+91-11-23456790'
            },
            hours: {
              monday: '9:00 AM - 6:00 PM',
              mondayHi: 'सुबह 9:00 पूर्वाह्न - 6:00 शाम',
              tuesday: '9:00 AM - 6:00 PM',
              tuesdayHi: 'मंगलवार 9:00 पूर्वाह्न - 6:00 शाम',
              wednesday: '9:00 AM - 6:00 PM',
              wednesdayHi: 'बुधवार 9:00 पूर्वाह्न - 6:00 शाम',
              thursday: '9:00 AM - 6:00 PM',
              thursdayHi: 'गुरुवार 9:00 पूर्वाह्न - 6:00 शाम',
              friday: '9:00 AM - 6:00 PM',
              fridayHi: 'शुक्रवार 9:00 पूर्वाह्न - 6:00 शाम',
              saturday: '9:00 AM - 2:00 PM',
              saturdayHi: 'शनिवार 9:00 पूर्वाह्न - 2:00 शाम',
              sunday: 'Closed',
              sundayHi: 'बंद'
            },
            services: ['Savings Account', 'Current Account', 'Personal Loan', 'Home Loan'],
            servicesHi: ['बचत खाता', 'चालू खाता', 'व्यक्तिग ऋण', 'होम लोन'],
            features: [
              { id: 'wifi', name: 'Free WiFi', nameHi: 'मुफ्त वाईफाई', icon: '📶', available: true },
              { id: 'parking', name: 'Parking Available', nameHi: 'पार्किंग उपलब्ध', icon: '🚗', available: true },
              { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: '♿', available: true }
            ],
            status: 'active',
            rating: 4.5,
            reviewCount: 156,
            images: ['/images/branches/connaught-place-1.jpg'],
            lastUpdated: '2024-01-15T10:30:00Z'
          },
          {
            id: 'branch-002',
            type: 'branch',
            name: 'Karol Bagh Branch',
            nameHi: 'करोल बाग शाखा',
            address: {
              line1: '15, Ajmal Khan Road',
              line1Hi: '15, अजमल खान रोड',
              line2: 'Karol Bagh - 110005',
              line2Hi: 'करोल बाग - 110005',
              city: 'New Delhi',
              cityHi: 'नई दिल्ली',
              state: 'Delhi',
              stateHi: 'दिल्ली',
              pincode: '110005',
              country: 'India',
              countryHi: 'भारत',
              latitude: 28.6470,
              longitude: 77.1930
            },
            contact: {
              phone: '+91-11-45678901',
              email: 'karolbagh@mnsbank.com'
            },
            hours: {
              monday: '9:00 AM - 7:00 PM',
              mondayHi: 'सुबह 9:00 पूर्वाह्न - 7:00 शाम',
              tuesday: '9:00 AM - 7:00 PM',
              tuesdayHi: 'मंगलवार 9:00 पूर्वाह्न - 7:00 शाम',
              wednesday: '9:00 AM - 7:00 PM',
              wednesdayHi: 'बुधवार 9:00 पूर्वाह्न - 7:00 शाम',
              thursday: '9:00 AM - 7:00 PM',
              thursdayHi: 'गुरुवार 9:00 पूर्वाह्न - 7:00 शाम',
              friday: '9:00 AM - 7:00 PM',
              fridayHi: 'शुक्रवार 9:00 पूर्वाह्न - 7:00 शाम',
              saturday: '9:00 AM - 5:00 PM',
              saturdayHi: 'शनिवार 9:00 पूर्वाह्न - 5:00 शाम',
              sunday: 'Closed',
              sundayHi: 'बंद'
            },
            services: ['Savings Account', 'Current Account', 'Fixed Deposit'],
            servicesHi: ['बचत खाता', 'चालू खाता', 'सावध जमा'],
            features: [
              { id: 'wifi', name: 'Free WiFi', nameHi: 'मुफ्त वाईफाई', icon: '📶', available: true },
              { id: 'parking', name: 'Parking Available', nameHi: 'पार्किंग उपलब्ध', icon: '🚗', available: false },
              { id: 'wheelchair', name: 'Wheelchair Accessible', nameHi: 'व्हीलचेयर पहुंच', icon: '♿', available: true }
            ],
            status: 'active',
            rating: 4.2,
            reviewCount: 89,
            images: ['/images/branches/karol-bagh-1.jpg'],
            lastUpdated: '2024-01-14T14:20:00Z'
          }
        ];
        
        setLocations(mockBranches);
        setFilteredLocations(mockBranches);
      } else {
        throw new Error(result.message || 'Failed to fetch branches');
      }
    } catch (err) {
      console.error('Error fetching branches:', err);
      setError(locale === 'hi' ? 'शाखाओं को लाने में त्रुटि' : 'Error fetching branches');
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
        const branchesOnly = searchResult.locations.filter(loc => loc.type === 'branch');
        setFilteredLocations(branchesOnly);
      } else {
        throw new Error(result.message || 'Search failed');
      }
    } catch (err) {
      console.error('Error searching branches:', err);
      setError(locale === 'hi' ? 'शाखाओं की खोज में त्रुटि' : 'Error searching branches');
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

  const callBranch = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="branch-locator">
      {/* Header */}
      <div className="locator-header">
        <div className="header-content">
          <h1 className="page-title">
            {locale === 'hi' ? 'शाखा लोकेटर' : 'Branch Locator'}
          </h1>
          <p className="page-subtitle">
            {locale === 'hi' 
              ? 'अपने निकटतम बैंक शाखाएं खोजें'
              : 'Find your nearest bank branches'
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
          placeholder={locale === 'hi' ? 'शाखाएं खोजें...' : 'Search branches...'}
          initialFilters={{
            type: 'branch',
            radius: 10,
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
              // Handle map click
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
              {locale === 'hi' ? 'शाखाएं' : 'Branches'} ({filteredLocations.length})
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
              <p>{locale === 'hi' ? 'शाखाएं लोड हो रही हैं...' : 'Loading branches...'}</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏦</div>
              <h3>{locale === 'hi' ? 'कोई शाखा नहीं मिली' : 'No branches found'}</h3>
              <p>{locale === 'hi' 
                ? 'कृपया अपनी खोज मानदंडों को समायोजित करें'
                : 'Please adjust your search criteria'
              }</p>
            </div>
          ) : (
            <div className="branches-list">
              {filteredLocations.map((branch) => (
                <div 
                  key={branch.id} 
                  className={`branch-card ${selectedLocation?.id === branch.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLocation(branch)}
                  data-testid={`branch-${branch.id}`}
                >
                  <div className="branch-header">
                    <div className="branch-info">
                      <h3 className="branch-name">
                        {locale === 'hi' ? branch.nameHi : branch.name}
                      </h3>
                      <div className="branch-status">
                        <span className={`status-badge ${branch.status}`}>
                          {branch.status === 'active' 
                            ? (locale === 'hi' ? 'सक्रिय' : 'Active')
                            : (locale === 'hi' ? 'निष्क्रिय' : 'Inactive')
                          }
                        </span>
                        {branch.distance && (
                          <span className="distance-badge">
                            {branch.distance.toFixed(1)} km
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="branch-rating">
                      <div className="rating-stars">
                        {'★'.repeat(Math.floor(branch.rating || 0))}
                        {'☆'.repeat(5 - Math.floor(branch.rating || 0))}
                      </div>
                      <span className="rating-count">({branch.reviewCount})</span>
                    </div>
                  </div>

                  <div className="branch-address">
                    <p>
                      {locale === 'hi' ? branch.address.line1Hi : branch.address.line1}
                      {branch.address.line2 && <><br />{locale === 'hi' ? branch.address.line2Hi : branch.address.line2}</>}
                      <br />
                      {locale === 'hi' ? branch.address.cityHi : branch.address.city}, {locale === 'hi' ? branch.address.stateHi : branch.address.state} {branch.address.pincode}
                    </p>
                  </div>

                  <div className="branch-contact">
                    <div className="contact-item">
                      <span className="contact-label">{locale === 'hi' ? 'फोन:' : 'Phone:'}</span>
                      <a href={`tel:${branch.contact.phone}`} className="contact-value">
                        {branch.contact.phone}
                      </a>
                    </div>
                    {branch.contact.email && (
                      <div className="contact-item">
                        <span className="contact-label">{locale === 'hi' ? 'ईमेल:' : 'Email:'}</span>
                        <a href={`mailto:${branch.contact.email}`} className="contact-value">
                          {branch.contact.email}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="branch-hours">
                    <span className="hours-label">{locale === 'hi' ? 'समय:' : 'Hours:'}</span>
                    <span className="hours-value">
                      {locale === 'hi' ? branch.hours.mondayHi : branch.hours.monday}
                    </span>
                  </div>

                  <div className="branch-services">
                    <div className="services-label">{locale === 'hi' ? 'सेवाएं:' : 'Services:'}</div>
                    <div className="services-list">
                      {branch.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="service-tag">
                          {locale === 'hi' ? branch.servicesHi.find(s => s === service) || service : service}
                        </span>
                      ))}
                      {branch.services.length > 3 && (
                        <span className="service-more">
                          +{branch.services.length - 3} {locale === 'hi' ? 'और' : 'more'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="branch-features">
                    {branch.features.filter(f => f.available).slice(0, 4).map((feature) => (
                      <span key={feature.id} className="feature-badge" title={locale === 'hi' ? feature.nameHi : feature.name}>
                        {feature.icon}
                      </span>
                    ))}
                  </div>

                  <div className="branch-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (userLocation) {
                          handleDirections(userLocation, branch);
                        }
                      }}
                      disabled={!userLocation}
                      className="action-button primary"
                      data-testid={`directions-${branch.id}`}
                    >
                      {locale === 'hi' ? 'दिशाएं' : 'Directions'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        callBranch(branch.contact.phone);
                      }}
                      className="action-button secondary"
                      data-testid={`call-${branch.id}`}
                    >
                      {locale === 'hi' ? 'कॉल करें' : 'Call'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/${locale}/locate-us/branch-details/${branch.id}`;
                      }}
                      className="action-button tertiary"
                      data-testid={`details-${branch.id}`}
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
            <h3>{locale === 'hi' ? 'चयनित शाखा' : 'Selected Branch'}</h3>
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
        .branch-locator {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .locator-header {
          background: linear-gradient(135deg, #007bff, #0056b3);
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
          border-top: 3px solid #007bff;
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

        .branches-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .branch-card {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .branch-card:hover {
          border-color: #007bff;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
        }

        .branch-card.selected {
          border-color: #007bff;
          background: #f8f9ff;
        }

        .branch-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .branch-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .branch-status {
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

        .branch-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .rating-stars {
          color: #ffc107;
          font-size: 0.875rem;
        }

        .rating-count {
          font-size: 0.75rem;
          color: #666;
        }

        .branch-address,
        .branch-contact,
        .branch-hours {
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
          color: #666;
        }

        .contact-label,
        .hours-label {
          font-weight: 500;
          color: #333;
        }

        .contact-value {
          color: #007bff;
          text-decoration: none;
        }

        .contact-value:hover {
          text-decoration: underline;
        }

        .branch-services {
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

        .service-more {
          font-size: 0.75rem;
          color: #6c757d;
        }

        .branch-features {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .feature-badge {
          font-size: 1.2rem;
          opacity: 0.7;
        }

        .branch-actions {
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
          background: #007bff;
          color: white;
        }

        .action-button.secondary {
          background: #28a745;
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

        .directions-actions {
          display: flex;
          gap: 0.5rem;
        }

        .directions-button {
          padding: 0.75rem 1.5rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .directions-button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default BranchLocator;
