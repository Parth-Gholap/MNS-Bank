'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';
import { Location, MarkerInstance, MapViewport, DirectionsResponse } from '@/lib/location/types';
import { mapManager, createBranchMarker, calculateMapBounds, defaultMapStyles, MapInstance } from '@/lib/maps';

interface MapMarkersProps {
  locale: 'en' | 'hi';
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (location: Location, marker: MarkerInstance) => void;
  onViewportChange?: (viewport: MapViewport) => void;
  onMapClick?: (position: { lat: number; lng: number }) => void;
  className?: string;
  height?: string;
  showDirections?: boolean;
  selectedLocation?: Location;
  userLocation?: { lat: number; lng: number };
  directions?: DirectionsResponse;
}

const MapMarkers: React.FC<MapMarkersProps> = ({
  locale,
  locations,
  center,
  zoom = 12,
  onMarkerClick,
  onViewportChange,
  onMapClick,
  className = '',
  height = '400px',
  showDirections = false,
  selectedLocation,
  userLocation,
  directions
}) => {
  const { t } = useTranslation(locale);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapInstance | null>(null);
  const markersRef = useRef<Map<string, MarkerInstance>>(new Map());
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string>('');
  const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    initializeMap();
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [locations]);

  useEffect(() => {
    if (mapInstanceRef.current && selectedLocation) {
      // Pan to selected location
      mapInstanceRef.current.panTo({
        lat: selectedLocation.address.latitude,
        lng: selectedLocation.address.longitude
      });
      
      // Show info window for selected location
      showLocationInfo(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      // Add user location marker
      addUserLocationMarker();
    }
  }, [userLocation]);

  useEffect(() => {
    if (mapInstanceRef.current && directions) {
      // Draw directions on map
      drawDirections(directions);
    }
  }, [directions]);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    try {
      // Calculate center if not provided
      let mapCenter = center;
      if (!mapCenter) {
        const bounds = calculateMapBounds(locations);
        mapCenter = {
          lat: (bounds.north + bounds.south) / 2,
          lng: (bounds.east + bounds.west) / 2
        };
      }

      const map = await mapManager.createMap(mapRef.current, {
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom,
        styles: defaultMapStyles,
        controls: {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          scaleControl: true,
          rotateControl: false
        },
        markers: locations.map(location => createBranchMarker(location)),
        onMarkerClick: (marker, event) => {
          const location = locations.find(loc => loc.id === marker.id);
          if (onMarkerClick && location) {
            onMarkerClick(location, marker);
          }
          if (location) {
            showLocationInfo(location);
          }
        },
        onMapClick: onMapClick ? (event) => onMapClick(event.position) : undefined,
        onViewportChange: onViewportChange
      });

      mapInstanceRef.current = map;
      setIsMapLoaded(true);

      // Fit bounds to show all markers
      if (locations.length > 1 && !center) {
        const bounds = calculateMapBounds(locations);
        map.fitBounds(bounds);
      }

      // Store marker references
      locations.forEach(location => {
        const marker = createBranchMarker(location);
        const markerInstance = map.addMarker(marker);
        markersRef.current.set(location.id, markerInstance);
      });

    } catch (error) {
      console.error('Failed to initialize map:', error);
      setMapError(locale === 'hi' ? 'मानच लोड करने में विफल' : 'Failed to load map');
    }
  };

  const showLocationInfo = (location: Location) => {
    if (!mapInstanceRef.current) return;

    const infoContent = createInfoWindowContent(location);
    mapInstanceRef.current.showInfoWindow(location.id, infoContent);
    setActiveInfoWindow(location.id);
  };

  const createInfoWindowContent = (location: Location): string => {
    const isBranch = location.type === 'branch';
    const statusColor = location.status === 'active' ? '#28a745' : '#dc3545';
    const statusText = location.status === 'active' 
      ? (locale === 'hi' ? 'सक्रिय' : 'Active')
      : (locale === 'hi' ? 'निष्क्रिय' : 'Inactive');

    return `
      <div class="info-window" style="max-width: 300px; font-family: Arial, sans-serif;">
        <div class="info-header" style="margin-bottom: 12px;">
          <h3 style="margin: 0; color: #333; font-size: 16px;">
            ${locale === 'hi' ? location.nameHi : location.name}
          </h3>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
            <span style="
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: ${statusColor};
            "></span>
            <span style="font-size: 12px; color: #666;">${statusText}</span>
            ${location.distance ? `<span style="font-size: 12px; color: #007bff; margin-left: 8px;">${location.distance.toFixed(1)} km</span>` : ''}
          </div>
        </div>
        
        <div class="info-address" style="margin-bottom: 12px;">
          <div style="font-size: 14px; color: #666; line-height: 1.4;">
            ${locale === 'hi' ? location.address.line1Hi : location.address.line1}<br>
            ${location.address.line2 ? (locale === 'hi' ? location.address.line2Hi : location.address.line2) + '<br>' : ''}
            ${locale === 'hi' ? location.address.cityHi : location.address.city}, ${locale === 'hi' ? location.address.stateHi : location.address.state} ${location.address.pincode}
          </div>
        </div>

        <div class="info-contact" style="margin-bottom: 12px;">
          ${location.contact.phone ? `
            <div style="font-size: 14px; color: #666;">
              <strong>${locale === 'hi' ? 'फोन:' : 'Phone:'}</strong> ${location.contact.phone}
            </div>
          ` : ''}
          ${location.contact.email ? `
            <div style="font-size: 14px; color: #666;">
              <strong>${locale === 'hi' ? 'ईमेल:' : 'Email:'}</strong> ${location.contact.email}
            </div>
          ` : ''}
        </div>

        <div class="info-hours" style="margin-bottom: 12px;">
          <div style="font-size: 14px; color: #666;">
            <strong>${locale === 'hi' ? 'समय:' : 'Hours:'}</strong> 
            ${locale === 'hi' ? location.hours.mondayHi : location.hours.monday}
          </div>
        </div>

        ${location.services.length > 0 ? `
          <div class="info-services" style="margin-bottom: 12px;">
            <div style="font-size: 14px; color: #666; margin-bottom: 4px;">
              <strong>${locale === 'hi' ? 'सेवाएं:' : 'Services:'}</strong>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${location.services.slice(0, 3).map(service => 
                `<span style="
                  background: #f8f9fa;
                  border: 1px solid #dee2e6;
                  border-radius: 12px;
                  padding: 2px 8px;
                  font-size: 11px;
                  color: #495057;
                ">${locale === 'hi' ? location.servicesHi.find(s => s === service) || service : service}</span>`
              ).join('')}
              ${location.services.length > 3 ? `<span style="font-size: 11px; color: #6c757d;">+${location.services.length - 3} more</span>` : ''}
            </div>
          </div>
        ` : ''}

        ${location.features.length > 0 ? `
          <div class="info-features" style="margin-bottom: 12px;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${location.features.filter(f => f.available).slice(0, 3).map(feature => `
                <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #666;">
                  <span>${feature.icon}</span>
                  <span>${locale === 'hi' ? feature.nameHi : feature.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="info-actions" style="display: flex; gap: 8px; margin-top: 16px;">
          <button onclick="window.getDirections('${location.id}')" style="
            background: #007bff;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
          ">
            ${locale === 'hi' ? 'दिशाएं' : 'Directions'}
          </button>
          <button onclick="window.callLocation('${location.contact.phone}')" style="
            background: #28a745;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
          ">
            ${locale === 'hi' ? 'कॉल करें' : 'Call'}
          </button>
          <button onclick="window.viewDetails('${location.id}')" style="
            background: #6c757d;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
          ">
            ${locale === 'hi' ? 'विवरण' : 'Details'}
          </button>
        </div>
      </div>
    `;
  };

  const addUserLocationMarker = () => {
    if (!mapInstanceRef.current || !userLocation) return;

    const userMarker = {
      id: 'user-location',
      position: { lat: userLocation.lat, lng: userLocation.lng },
      title: locale === 'hi' ? 'आपका स्थान' : 'Your Location',
      icon: {
        url: '/images/markers/user-location.png',
        size: { width: 24, height: 24 },
        anchor: { x: 12, y: 12 }
      },
      zIndex: 1000
    };

    const marker = mapInstanceRef.current.addMarker(userMarker);
    markersRef.current.set('user-location', marker);
  };

  const drawDirections = (directionsResponse: DirectionsResponse) => {
    if (!mapInstanceRef.current) return;

    // This would integrate with the map provider to draw the route
    // For now, we'll just update the viewport to show the route
    if (directionsResponse.overviewPath.length > 0) {
      const bounds = calculateMapBounds(directionsResponse.overviewPath.map(point => ({
        id: 'route-point',
        type: 'atm' as const,
        name: 'Route Point',
        nameHi: 'मार्ग बिंदु',
        address: {
          line1: '',
          line1Hi: '',
          city: '',
          cityHi: '',
          state: '',
          stateHi: '',
          pincode: '',
          country: '',
          countryHi: '',
          latitude: point.latitude || 0,
          longitude: point.longitude || 0
        },
        contact: { phone: '' },
        hours: {
          monday: '',
          mondayHi: '',
          tuesday: '',
          tuesdayHi: '',
          wednesday: '',
          wednesdayHi: '',
          thursday: '',
          thursdayHi: '',
          friday: '',
          fridayHi: '',
          saturday: '',
          saturdayHi: '',
          sunday: '',
          sundayHi: ''
        },
        services: [],
        servicesHi: [],
        features: [],
        status: 'active',
        images: [],
        lastUpdated: ''
      })));

      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  // Make functions available globally for info window buttons
  useEffect(() => {
    (window as any).getDirections = (locationId: string) => {
      const location = locations.find(loc => loc.id === locationId);
      if (location && userLocation) {
        // Trigger directions request
        mapManager.getDirections(userLocation, {
          lat: location.address.latitude,
          lng: location.address.longitude
        }).then(directions => {
          // This would update the parent component with directions
          console.log('Directions:', directions);
        });
      }
    };

    (window as any).callLocation = (phone: string) => {
      window.location.href = `tel:${phone}`;
    };

    (window as any).viewDetails = (locationId: string) => {
      // Navigate to location details page
      window.location.href = `/${locale}/locate-us/details/${locationId}`;
    };

    return () => {
      delete (window as any).getDirections;
      delete (window as any).callLocation;
      delete (window as any).viewDetails;
    };
  }, [locations, userLocation, locale]);

  if (mapError) {
    return (
      <div className={`map-error ${className}`} data-testid="map-error">
        <div className="error-content">
          <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="error-text">
            <h3>{locale === 'hi' ? 'मानच लोड करने में विफल' : 'Failed to Load Map'}</h3>
            <p>{mapError}</p>
          </div>
        </div>
        
        <style jsx>{`
          .map-error {
            width: 100%;
            height: ${height};
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .error-content {
            text-align: center;
            max-width: 300px;
          }

          .error-icon {
            width: 48px;
            height: 48px;
            color: #dc3545;
            margin-bottom: 16px;
          }

          .error-text h3 {
            margin: 0 0 8px 0;
            color: #333;
            font-size: 18px;
          }

          .error-text p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`map-markers ${className}`} data-testid="map-markers">
      <div 
        ref={mapRef} 
        className="map-container" 
        style={{ height }}
        data-testid="map-container"
      />
      
      {!isMapLoaded && (
        <div className="map-loading" data-testid="map-loading">
          <div className="loading-spinner" />
          <div className="loading-text">
            {locale === 'hi' ? 'मानच लोड हो रहा है...' : 'Loading map...'}
          </div>
        </div>
      )}

      <style jsx>{`
        .map-markers {
          width: 100%;
          position: relative;
        }

        .map-container {
          width: 100%;
          background: #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .map-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          color: #666;
          font-size: 14px;
        }

        /* Info window styles */
        :global(.info-window) {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        :global(.info-window button:hover) {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default MapMarkers;
