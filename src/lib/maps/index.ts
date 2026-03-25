import { Location, MapViewport, DirectionsResponse, NearbyPlace } from '@/lib/location/types';

export interface MapProvider {
  name: string;
  apiKey: string;
  loadMap: (element: HTMLElement, options: MapOptions) => Promise<MapInstance>;
  geocode: (address: string) => Promise<GeocodeResult>;
  reverseGeocode: (lat: number, lng: number) => Promise<GeocodeResult>;
  getDirections: (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => Promise<DirectionsResponse>;
  getNearbyPlaces: (location: { lat: number; lng: number }, type: string, radius: number) => Promise<NearbyPlace[]>;
}

export interface MapOptions {
  center: { lat: number; lng: number };
  zoom: number;
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  styles?: MapStyle[];
  controls?: MapControls;
  markers?: MarkerOptions[];
  onMapClick?: (event: MapClickEvent) => void;
  onMarkerClick?: (marker: MarkerInstance, event: MapClickEvent) => void;
  onViewportChange?: (viewport: MapViewport) => void;
}

export interface MapStyle {
  featureType?: string;
  elementType?: string;
  stylers: Array<{
    visibility?: string;
    color?: string;
    weight?: number;
    saturation?: number;
    lightness?: number;
    gamma?: number;
  }>;
}

export interface MapControls {
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  streetViewControl?: boolean;
  fullscreenControl?: boolean;
  scaleControl?: boolean;
  rotateControl?: boolean;
}

export interface MarkerOptions {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  titleHi?: string;
  icon?: string | MarkerIcon;
  animation?: 'DROP' | 'BOUNCE';
  zIndex?: number;
  opacity?: number;
  infoWindow?: InfoWindowOptions;
  customData?: any;
}

export interface MarkerIcon {
  url: string;
  size: { width: number; height: number };
  origin?: { x: number; y: number };
  anchor?: { x: number; y: number };
  scaledSize?: { width: number; height: number };
}

export interface InfoWindowOptions {
  content: string;
  maxWidth?: number;
  zIndex?: number;
  disableAutoPan?: boolean;
}

export interface MapInstance {
  id: string;
  element: HTMLElement;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  fitBounds: (bounds: MapBounds) => void;
  addMarker: (marker: MarkerOptions) => MarkerInstance;
  removeMarker: (markerId: string) => void;
  updateMarker: (markerId: string, options: Partial<MarkerOptions>) => void;
  clearMarkers: () => void;
  showInfoWindow: (markerId: string, content: string) => void;
  hideInfoWindow: () => void;
  setViewport: (viewport: MapViewport) => void;
  getViewport: () => MapViewport;
  getBounds: () => MapBounds;
  panTo: (position: { lat: number; lng: number }) => void;
  panBy: (x: number, y: number) => void;
  destroy: () => void;
}

export interface MarkerInstance {
  id: string;
  position: { lat: number; lng: number };
  setTitle: (title: string) => void;
  setIcon: (icon: string | MarkerIcon) => void;
  setAnimation: (animation?: 'DROP' | 'BOUNCE') => void;
  setOpacity: (opacity: number) => void;
  setZIndex: (zIndex: number) => void;
  show: () => void;
  hide: () => void;
  getPosition: () => { lat: number; lng: number };
  getMap: () => MapInstance | null;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapClickEvent {
  position: { lat: number; lng: number };
  pixel: { x: number; y: number };
  placeId?: string;
}

export interface GeocodeResult {
  address: string;
  addressHi?: string;
  position: { lat: number; lng: number };
  components: AddressComponent[];
  formattedAddress: string;
  formattedAddressHi?: string;
  types: string[];
  accuracy: 'ROOFTOP' | 'RANGE_INTERPOLATED' | 'GEOMETRIC_CENTER' | 'APPROXIMATE';
}

export interface AddressComponent {
  longName: string;
  longNameHi?: string;
  shortName: string;
  shortNameHi?: string;
  types: string[];
}

// Google Maps Provider Implementation
class GoogleMapsProvider implements MapProvider {
  name = 'google';
  apiKey: string;
  private loaded = false;
  private maps: any = null;
  private geocoder: any = null;
  private directionsService: any = null;
  private placesService: any = null;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async loadScript(): Promise<void> {
    if (this.loaded) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places,geometry&callback=initMaps`;
      script.async = true;
      script.defer = true;

      (window as any).initMaps = () => {
        this.maps = (window as any).google.maps;
        this.geocoder = new this.maps.Geocoder();
        this.directionsService = new this.maps.DirectionsService();
        this.loaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };

      document.head.appendChild(script);
    });
  }

  async loadMap(element: HTMLElement, options: MapOptions): Promise<MapInstance> {
    await this.loadScript();

    return new Promise((resolve) => {
      const mapOptions: any = {
        center: new this.maps.LatLng(options.center.lat, options.center.lng),
        zoom: options.zoom,
        mapTypeId: options.mapType || this.maps.MapTypeId.ROADMAP,
        styles: options.styles,
        zoomControl: options.controls?.zoomControl !== false,
        mapTypeControl: options.controls?.mapTypeControl !== false,
        streetViewControl: options.controls?.streetViewControl !== false,
        fullscreenControl: options.controls?.fullscreenControl !== false,
        scaleControl: options.controls?.scaleControl !== false,
        rotateControl: options.controls?.rotateControl !== false,
        gestureHandling: 'cooperative',
        clickableIcons: false
      };

      const map = new this.maps.Map(element, mapOptions);
      const markers = new Map<string, any>();
      let activeInfoWindow: any = null;

      // Add markers
      if (options.markers) {
        options.markers.forEach(markerOptions => {
          this.addMarkerToMap(map, markers, markerOptions, options.onMarkerClick);
        });
      }

      // Map click handler
      if (options.onMapClick) {
        map.addListener('click', (event: any) => {
          if (event && event.latLng && options.onMapClick) {
            options.onMapClick({
              position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
              pixel: { x: 0, y: 0 }, // Would need to calculate from DOM
              placeId: event.placeId
            });
          }
        });
      }

      // Viewport change handler
      if (options.onViewportChange) {
        map.addListener('bounds_changed', () => {
          const bounds = map.getBounds();
          if (bounds && options.onViewportChange) {
            options.onViewportChange({
              center: { latitude: map.getCenter().lat(), longitude: map.getCenter().lng() },
              zoom: map.getZoom(),
              bounds: {
                northeast: { latitude: bounds.getNorthEast().lat(), longitude: bounds.getNorthEast().lng() },
                southwest: { latitude: bounds.getSouthWest().lat(), longitude: bounds.getSouthWest().lng() }
              }
            });
          }
        });
      }

      const mapInstance: MapInstance = {
        id: `map-${Date.now()}`,
        element,
        setCenter: (center) => {
          map.setCenter(new this.maps.LatLng(center.lat, center.lng));
        },
        setZoom: (zoom) => {
          map.setZoom(zoom);
        },
        fitBounds: (bounds) => {
          const sw = new this.maps.LatLng(bounds.south, bounds.west);
          const ne = new this.maps.LatLng(bounds.north, bounds.east);
          map.fitBounds(new this.maps.LatLngBounds(sw, ne));
        },
        addMarker: (markerOptions) => {
          return this.addMarkerToMap(map, markers, markerOptions, options.onMarkerClick);
        },
        removeMarker: (markerId) => {
          const marker = markers.get(markerId);
          if (marker) {
            marker.setMap(null);
            markers.delete(markerId);
          }
        },
        updateMarker: (markerId, updatedOptions) => {
          const marker = markers.get(markerId);
          if (marker) {
            if (updatedOptions.position) {
              marker.setPosition(new this.maps.LatLng(updatedOptions.position.lat, updatedOptions.position.lng));
            }
            if (updatedOptions.title) {
              marker.setTitle(updatedOptions.title);
            }
            if (updatedOptions.icon) {
              marker.setIcon(updatedOptions.icon);
            }
            if (updatedOptions.animation) {
              marker.setAnimation(updatedOptions.animation === 'BOUNCE' ? this.maps.Animation.BOUNCE : this.maps.Animation.DROP);
            }
            if (updatedOptions.opacity !== undefined) {
              marker.setOpacity(updatedOptions.opacity);
            }
            if (updatedOptions.zIndex !== undefined) {
              marker.setZIndex(updatedOptions.zIndex);
            }
          }
        },
        clearMarkers: () => {
          markers.forEach(marker => marker.setMap(null));
          markers.clear();
        },
        showInfoWindow: (markerId, content) => {
          const marker = markers.get(markerId);
          if (marker) {
            if (activeInfoWindow) {
              activeInfoWindow.close();
            }
            const infoWindow = new this.maps.InfoWindow({
              content,
              maxWidth: 300
            });
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
          }
        },
        hideInfoWindow: () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
            activeInfoWindow = null;
          }
        },
        setViewport: (viewport) => {
          if (viewport.center) {
            map.setCenter(new this.maps.LatLng(viewport.center.latitude, viewport.center.longitude));
          }
          if (viewport.zoom) {
            map.setZoom(viewport.zoom);
          }
        },
        getViewport: () => {
          const bounds = map.getBounds();
          return {
            center: { latitude: map.getCenter().lat(), longitude: map.getCenter().lng() },
            zoom: map.getZoom(),
            bounds: bounds ? {
              northeast: { latitude: bounds.getNorthEast().lat(), longitude: bounds.getNorthEast().lng() },
              southwest: { latitude: bounds.getSouthWest().lat(), longitude: bounds.getSouthWest().lng() }
            } : undefined
          };
        },
        getBounds: () => {
          const bounds = map.getBounds();
          if (!bounds) return { north: 0, south: 0, east: 0, west: 0 };
          
          return {
            north: bounds.getNorthEast().lat(),
            south: bounds.getSouthWest().lat(),
            east: bounds.getNorthEast().lng(),
            west: bounds.getSouthWest().lng()
          };
        },
        panTo: (position) => {
          map.panTo(new this.maps.LatLng(position.lat, position.lng));
        },
        panBy: (x, y) => {
          map.panBy(x, y);
        },
        destroy: () => {
          markers.forEach(marker => marker.setMap(null));
          // Google Maps doesn't have a destroy method for the map itself
        }
      };

      resolve(mapInstance);
    });
  }

  private addMarkerToMap(map: any, markers: Map<string, any>, options: MarkerOptions, onClick?: (marker: MarkerInstance, event: MapClickEvent) => void): MarkerInstance {
    const markerOptions: any = {
      position: new this.maps.LatLng(options.position.lat, options.position.lng),
      title: options.title,
      map: map,
      zIndex: options.zIndex || 1,
      opacity: options.opacity || 1
    };

    if (options.icon) {
      markerOptions.icon = options.icon;
    }

    if (options.animation) {
      markerOptions.animation = options.animation === 'BOUNCE' ? this.maps.Animation.BOUNCE : this.maps.Animation.DROP;
    }

    const marker = new this.maps.Marker(markerOptions);
    markers.set(options.id, marker);

    if (onClick) {
      marker.addListener('click', (event: any) => {
        const markerInstance: MarkerInstance = {
          id: options.id,
          position: { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() },
          setTitle: (title) => marker.setTitle(title),
          setIcon: (icon) => marker.setIcon(icon),
          setAnimation: (animation) => marker.setAnimation(animation ? (animation === 'BOUNCE' ? this.maps.Animation.BOUNCE : this.maps.Animation.DROP) : null),
          setOpacity: (opacity) => marker.setOpacity(opacity),
          setZIndex: (zIndex) => marker.setZIndex(zIndex),
          show: () => marker.setVisible(true),
          hide: () => marker.setVisible(false),
          getPosition: () => ({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() }),
          getMap: () => map
        };

        onClick(markerInstance, {
          position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
          pixel: { x: 0, y: 0 }
        });
      });
    }

    const markerInstance: MarkerInstance = {
      id: options.id,
      position: { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() },
      setTitle: (title) => marker.setTitle(title),
      setIcon: (icon) => marker.setIcon(icon),
      setAnimation: (animation) => marker.setAnimation(animation ? (animation === 'BOUNCE' ? this.maps.Animation.BOUNCE : this.maps.Animation.DROP) : null),
      setOpacity: (opacity) => marker.setOpacity(opacity),
      setZIndex: (zIndex) => marker.setZIndex(zIndex),
      show: () => marker.setVisible(true),
      hide: () => marker.setVisible(false),
      getPosition: () => ({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() }),
      getMap: () => map
    };

    return markerInstance;
  }

  async geocode(address: string): Promise<GeocodeResult> {
    await this.loadScript();

    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address }, (results: any[], status: string) => {
        if (status === 'OK' && results[0]) {
          const result = results[0];
          resolve({
            address: result.formatted_address,
            position: { lat: result.geometry.location.lat(), lng: result.geometry.location.lng() },
            components: result.address_components.map((comp: any) => ({
              longName: comp.long_name,
              shortName: comp.short_name,
              types: comp.types
            })),
            formattedAddress: result.formatted_address,
            types: result.types,
            accuracy: result.geometry.location_type
          });
        } else {
          reject(new Error('Geocoding failed'));
        }
      });
    });
  }

  async reverseGeocode(lat: number, lng: number): Promise<GeocodeResult> {
    await this.loadScript();

    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ location: { lat, lng } }, (results: any[], status: string) => {
        if (status === 'OK' && results[0]) {
          const result = results[0];
          resolve({
            address: result.formatted_address,
            position: { lat, lng },
            components: result.address_components.map((comp: any) => ({
              longName: comp.long_name,
              shortName: comp.short_name,
              types: comp.types
            })),
            formattedAddress: result.formatted_address,
            types: result.types,
            accuracy: result.geometry.location_type
          });
        } else {
          reject(new Error('Reverse geocoding failed'));
        }
      });
    });
  }

  async getDirections(origin: { lat: number; lng: number }, destination: { lat: number; lng: number }): Promise<DirectionsResponse> {
    await this.loadScript();

    return new Promise((resolve, reject) => {
      const request = {
        origin: new this.maps.LatLng(origin.lat, origin.lng),
        destination: new this.maps.LatLng(destination.lat, destination.lng),
        travelMode: this.maps.TravelMode.DRIVING
      };

      this.directionsService.route(request, (result: any, status: string) => {
        if (status === 'OK') {
          const route = result.routes[0];
          const leg = route.legs[0];
          
          resolve({
            distance: {
              text: leg.distance.text,
              value: leg.distance.value
            },
            duration: {
              text: leg.duration.text,
              value: leg.duration.value
            },
            steps: leg.steps.map((step: any) => ({
              instruction: step.instructions,
              instructionHi: step.instructions, // Would need translation
              distance: step.distance.text,
              duration: step.duration.text,
              maneuver: step.maneuver || 'straight',
              startLocation: { lat: step.start_location.lat(), lng: step.start_location.lng() },
              endLocation: { lat: step.end_location.lat(), lng: step.end_location.lng() }
            })),
            polyline: route.overview_polyline,
            overviewPath: route.overview_path.map((point: any) => ({
              latitude: point.lat(),
              longitude: point.lng()
            }))
          });
        } else {
          reject(new Error('Directions request failed'));
        }
      });
    });
  }

  async getNearbyPlaces(location: { lat: number; lng: number }, type: string, radius: number): Promise<NearbyPlace[]> {
    await this.loadScript();

    if (!this.placesService) {
      // This would need to be initialized with a map instance
      // For now, return empty array
      return [];
    }

    return new Promise((resolve, reject) => {
      const request = {
        location: new this.maps.LatLng(location.lat, location.lng),
        radius,
        type
      };

      this.placesService.nearbySearch(request, (results: any[], status: string) => {
        if (status === 'OK') {
          const places = results.map(place => ({
            id: place.place_id,
            name: place.name,
            nameHi: place.name || '',
            category: type,
            categoryHi: type || '',
            address: place.vicinity || '',
            addressHi: place.vicinity || '',
            distance: 0, // Would need to calculate
            distanceText: '',
            rating: place.rating,
            types: place.types,
            vicinity: place.vicinity || '',
            vicinityHi: place.vicinity || '',
            location: { latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng() }
          }));
          resolve(places);
        } else {
          reject(new Error('Nearby places search failed'));
        }
      });
    });
  }
}

// Map Manager
class MapManager {
  private provider: MapProvider;
  private activeMaps: Map<string, MapInstance> = new Map();

  constructor(provider: MapProvider) {
    this.provider = provider;
  }

  async createMap(element: HTMLElement, options: MapOptions): Promise<MapInstance> {
    const map = await this.provider.loadMap(element, options);
    this.activeMaps.set(map.id, map);
    return map;
  }

  getMap(id: string): MapInstance | null {
    return this.activeMaps.get(id) || null;
  }

  destroyMap(id: string): void {
    const map = this.activeMaps.get(id);
    if (map) {
      map.destroy();
      this.activeMaps.delete(id);
    }
  }

  async geocode(address: string): Promise<GeocodeResult> {
    return this.provider.geocode(address);
  }

  async reverseGeocode(lat: number, lng: number): Promise<GeocodeResult> {
    return this.provider.reverseGeocode(lat, lng);
  }

  async getDirections(origin: { lat: number; lng: number }, destination: { lat: number; lng: number }): Promise<DirectionsResponse> {
    return this.provider.getDirections(origin, destination);
  }

  async getNearbyPlaces(location: { lat: number; lng: number }, type: string, radius: number): Promise<NearbyPlace[]> {
    return this.provider.getNearbyPlaces(location, type, radius);
  }
}

// Default map styles
export const defaultMapStyles: MapStyle[] = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }, { lightness: 17 }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ffffff' }, { lightness: 17 }, { weight: 0.2 }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }, { lightness: 18 }]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }, { lightness: 16 }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 21 }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }]
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  }
];

// Initialize with Google Maps provider
const googleMapsProvider = new GoogleMapsProvider(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');
export const mapManager = new MapManager(googleMapsProvider);

// Export utilities
export function createBranchMarker(location: Location): MarkerOptions {
  const isBranch = location.type === 'branch';
  return {
    id: location.id,
    position: { lat: location.address.latitude, lng: location.address.longitude },
    title: location.name,
    titleHi: location.nameHi,
    icon: {
      url: isBranch ? '/images/markers/branch.png' : '/images/markers/atm.png',
      size: { width: 32, height: 32 },
      anchor: { x: 16, y: 32 }
    },
    zIndex: isBranch ? 2 : 1,
    customData: location
  };
}

export function calculateMapBounds(locations: Location[]): MapBounds {
  if (locations.length === 0) {
    return { north: 0, south: 0, east: 0, west: 0 };
  }

  let minLat = locations[0].address.latitude;
  let maxLat = locations[0].address.latitude;
  let minLng = locations[0].address.longitude;
  let maxLng = locations[0].address.longitude;

  locations.forEach(location => {
    minLat = Math.min(minLat, location.address.latitude);
    maxLat = Math.max(maxLat, location.address.latitude);
    minLng = Math.min(minLng, location.address.longitude);
    maxLng = Math.max(maxLng, location.address.longitude);
  });

  // Add padding
  const latPadding = (maxLat - minLat) * 0.1;
  const lngPadding = (maxLng - minLng) * 0.1;

  return {
    north: maxLat + latPadding,
    south: minLat - latPadding,
    east: maxLng + lngPadding,
    west: minLng - lngPadding
  };
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  } else {
    return `${(meters / 1000).toFixed(1)} km`;
  }
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)} secs`;
  } else if (seconds < 3600) {
    return `${Math.round(seconds / 60)} mins`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.round((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  }
}
