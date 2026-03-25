'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { Location, LocationSearchParams, LocationSearchResult, GeolocationInfo, GeocodeResult, LocationFilters, LocationSuggestion, ATM } from '@/lib/location/types';
import MapMarkers from '@/components/location/MapMarkers';
import { mapManager } from '@/lib/maps';

interface LocationSearchProps {
  locale: 'en' | 'hi';
  onSearch: (params: LocationSearchParams) => void;
  onLocationSelect?: (location: GeocodeResult) => void;
  onFiltersChange?: (filters: LocationFilters) => void;
  className?: string;
  initialFilters?: LocationFilters;
  placeholder?: string;
  showFilters?: boolean;
  showCurrentLocation?: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  locale,
  onSearch,
  onLocationSelect,
  onFiltersChange,
  className = '',
  initialFilters,
  placeholder,
  showFilters = true,
  showCurrentLocation = true
}) => {
  const { t } = useTranslation(locale);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationInfo | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [filters, setFilters] = useState<LocationFilters>(initialFilters || {});
  const [loading, setLoading] = useState(true);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    trackPageView('Location Search', locale === 'hi' ? 'स्थान खोज' : 'Location Search');
    setLoading(false);
  }, [locale]);

  const handleSearch = () => {
    if (!query.trim()) return;

    setIsSearching(true);
    onSearch({
      query: query.trim(),
      ...filters
    });
    fetchSuggestions(query.trim());
  };

  const fetchSuggestions = async (searchQuery: string) => {
    try {
      // Try to geocode the query
      const result = await mapManager.geocode(searchQuery);
      const suggestion: LocationSuggestion = {
        id: 'geocode-' + Date.now(),
        text: result.formattedAddress,
        textHi: result.formattedAddressHi || result.formattedAddress,
        type: 'address',
        location: {
          latitude: result.position.lat,
          longitude: result.position.lng
        },
        description: result.address,
        descriptionHi: result.addressHi || result.address
      };
      
      setSuggestions([suggestion]);
      setShowSuggestions(true);
    } catch (error) {
      // Fallback to mock suggestions
      const mockSuggestions: LocationSuggestion[] = [
        {
          id: 'mock-1',
          text: '123 Main Street, Delhi, India 110001',
          textHi: '123 मेन स्ट्रीट, देली, भारत 110001',
          type: 'address',
          location: {
            latitude: 28.6139,
            longitude: 77.2090
          },
          description: '123 Main Street, Delhi, India 110001',
          descriptionHi: '123 मेन स्ट्रीट, देली, भारत 110001'
        },
        {
          id: 'mock-2',
          text: '456 Park Avenue, Mumbai, India 400001',
          textHi: '456 पार्क एवेन्यू, मुंबई, भारत 400001',
          type: 'address',
          location: {
            latitude: 19.0760,
            longitude: 72.8777
          },
          description: '456 Park Avenue, Mumbai, India 400001',
          descriptionHi: '456 पार्क एवेन्यू, मुंबई, भारत 400001'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    
    if (onLocationSelect && suggestion.location) {
      // Convert to GeocodeResult format
      const geocodeResult: GeocodeResult = {
        address: suggestion.text,
        position: {
          lat: suggestion.location.latitude,
          lng: suggestion.location.longitude,
        },
        components: [],
        formattedAddress: suggestion.text,
        types: [suggestion.type]
      };
      onLocationSelect(geocodeResult);
    }
    
    // Trigger search with coordinates
    if (suggestion.location) {
      const searchParams: LocationSearchParams = {
        query: '',
        latitude: suggestion.location.latitude,
        longitude: suggestion.location.longitude,
        ...filters
      };
      onSearch(searchParams);
    }
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(locale === 'hi' ? 'आपके ब्राउजर में जियोलोकेशन समर्थित नहीं.' : 'Geolocation is not supported by your browser.');
      return;
    }

    setIsGettingLocation(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGettingLocation(false);
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude || undefined,
          altitudeAccuracy: position.coords.altitudeAccuracy || undefined,
          heading: position.coords.heading || undefined,
          speed: position.coords.speed || undefined,
          timestamp: Date.now()
        });
      },
      (error: GeolocationPositionError) => {
        setIsGettingLocation(false);
        setLocationError(locale === 'hi' ? 'स्थान प्राप्त करने में त्रुटि हुई.' : 'Unable to get your location. Please try again.');
      }
    );
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  };

  useEffect(() => {
    // Handle click outside to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`location-search ${className}`}>
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || (locale === 'hi' ? 'स्थान दर्ज करें...' : 'Search for a location...')}
            className="search-input"
            data-testid="location-search-input"
          />
          <button
            onClick={clearSearch}
            className="clear-button"
            data-testid="clear-search-button"
          >
            ×
          </button>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="search-button"
            data-testid="search-button"
          >
            {isSearching ? (
              <div className="spinner"></div>
            ) : (
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6h42" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown" data-testid="suggestions-dropdown">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="suggestion-item"
              onClick={() => handleSuggestionSelect(suggestion)}
              data-testid={`suggestion-${suggestion.id}`}
            >
              <div className="suggestion-text">
                <div className="suggestion-title">{suggestion.text}</div>
                <div className="suggestion-description">{suggestion.description}</div>
                <div className="suggestion-type">{suggestion.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="filters-section">
          <div className="filter-row">
            <div className="filter-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.openNow || false}
                  onChange={(e) => handleFilterChange('openNow', e.target.checked)}
                  className="filter-checkbox"
                  data-testid="open-now-filter"
                />
                {locale === 'hi' ? 'अभी खुल खोलें' : 'Open Now'}
              </label>
            </div>
            <div className="filter-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.wheelchairAccessible || false}
                  onChange={(e) => handleFilterChange('wheelchairAccessible', e.target.checked)}
                  className="filter-checkbox"
                  data-testid="wheelchair-filter"
                />
                {locale === 'hi' ? 'व्हीलचेयर प्रवेश' : 'Wheelchair Accessible'}
              </label>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">
                {locale === 'hi' ? 'स्थिति:' : 'State:'}
                <select
                  value={filters.state || ''}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="filter-input"
                  data-testid="state-filter"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* User Location Info */}
      {userLocation && (
        <div className="location-info" data-testid="location-info">
          <div className="location-text">
            {locale === 'hi' ? 'Your location:' : 'Your location:'}
          </div>
          <div className="coordinates">
            {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
          </div>
          <div className="accuracy">
            {locale === 'hi' ? 'Accuracy:' : 'Accuracy:'} ±{Math.round(userLocation.accuracy)}m
          </div>
        </div>
      )}

      {/* Current Location Button */}
      {showCurrentLocation && (
        <button
          onClick={handleCurrentLocation}
          disabled={isGettingLocation}
          className="current-location-button"
          data-testid="current-location-button"
        >
          {isGettingLocation ? (
            <>
              <div className="spinner"></div>
              {locale === 'hi' ? 'Getting location...' : 'Getting location...'}
            </>
          ) : (
            <>
              <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657l-7.798-7.798 2.828 2.828 6.977-6.977 6.977-2.829 1.414-1.414 9.657-9.657z" />
              </svg>
              {locale === 'hi' ? 'Use my current location' : 'Use my current location'}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default LocationSearch;
