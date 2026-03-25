export interface Location {
  id: string;
  type: 'branch' | 'atm';
  name: string;
  nameHi: string;
  address: {
    line1: string;
    line1Hi: string;
    line2?: string;
    line2Hi?: string;
    city: string;
    cityHi: string;
    state: string;
    stateHi: string;
    pincode: string;
    country: string;
    countryHi: string;
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email?: string;
    fax?: string;
  };
  hours: {
    monday: string;
    mondayHi: string;
    tuesday: string;
    tuesdayHi: string;
    wednesday: string;
    wednesdayHi: string;
    thursday: string;
    thursdayHi: string;
    friday: string;
    fridayHi: string;
    saturday: string;
    saturdayHi: string;
    sunday: string;
    sundayHi: string;
  };
  services: string[];
  servicesHi: string[];
  features: LocationFeature[];
  status: 'active' | 'inactive' | 'maintenance';
  distance?: number; // Distance from user location
  rating?: number;
  reviewCount?: number;
  images: string[];
  directions?: {
    walking: string;
    driving: string;
    publicTransport: string;
  };
  lastUpdated: string;
}

export interface LocationFeature {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  available: boolean;
  description?: string;
  descriptionHi?: string;
}

export interface Branch extends Location {
  type: 'branch';
  branchCode: string;
  branchType: 'corporate' | 'retail' | 'specialized';
  manager: string;
  managerHi: string;
  branchServices: BranchService[];
  facilities: BranchFacility[];
  parking: ParkingInfo;
}

export interface ATM extends Location {
  type: 'atm';
  atmId: string;
  bankName: string;
  bankNameHi: string;
  network: 'own' | 'shared';
  cashWithdrawal: boolean;
  cashDeposit: boolean;
  balanceInquiry: boolean;
  miniStatement: boolean;
  pinChange: boolean;
  cardToCardTransfer: boolean;
  billPayment: boolean;
  mobileRecharge: boolean;
  fastCash: boolean;
  wheelchairAccessible: boolean;
  surchargeFree: boolean;
  securityGuard: boolean;
  cctv: boolean;
  nightService: boolean;
}

export interface BranchService {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  available: boolean;
  appointmentRequired: boolean;
}

export interface BranchFacility {
  id: string;
  name: string;
  nameHi: string;
  available: boolean;
  description?: string;
  descriptionHi?: string;
}

export interface ParkingInfo {
  available: boolean;
  type: 'street' | 'lot' | 'garage';
  capacity: number;
  free: boolean;
  wheelchairAccessible: boolean;
  description?: string;
  descriptionHi?: string;
}

export interface LocationSearchResult {
  locations: Location[];
  totalCount: number;
  searchRadius: number;
  searchCenter: {
    latitude: number;
    longitude: number;
  };
  filters: LocationFilters;
}

export interface AddressComponent {
  long_name?: string;
  short_name?: string;
  types?: string[];
}

export interface LocationFilters {
  type?: 'branch' | 'atm' | 'all';
  services?: string[];
  features?: string[];
  status?: 'active' | 'all';
  city?: string;
  state?: string;
  radius?: number;
  openNow?: boolean;
  wheelchairAccessible?: boolean;
}

export interface LocationSuggestion {
  id: string;
  text: string;
  textHi: string;
  type: 'address' | 'establishment' | 'city' | 'state' | 'pincode';
  location?: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  descriptionHi?: string;
}

export interface LocationSearchParams {
  query?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  filters?: LocationFilters;
  limit?: number;
  offset?: number;
  sortBy?: 'distance' | 'name' | 'rating' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface MapBounds {
  northeast: {
    latitude: number;
    longitude: number;
  };
  southwest: {
    latitude: number;
    longitude: number;
  };
}

export interface MapViewport {
  center: {
    latitude: number;
    longitude: number;
  };
  zoom: number;
  bounds?: MapBounds;
}

export interface DirectionsResponse {
  distance: {
    text: string;
    value: number; // meters
  };
  duration: {
    text: string;
    value: number; // seconds
  };
  steps: DirectionStep[];
  polyline: string;
  overviewPath: {
    latitude: number;
    longitude: number;
  }[];
}

export interface DirectionStep {
  instruction: string;
  instructionHi: string;
  distance: string;
  duration: string;
  maneuver: string;
  startLocation: {
    latitude: number;
    longitude: number;
  };
  endLocation: {
    latitude: number;
    longitude: number;
  };
}

export interface LocationReview {
  id: string;
  locationId: string;
  rating: number;
  comment: string;
  commentHi: string;
  reviewerName: string;
  reviewerNameHi: string;
  date: string;
  helpful: number;
  verified: boolean;
  response?: {
    text: string;
    textHi: string;
    date: string;
    responder: string;
  };
}

export interface LocationAnalytics {
  locationId: string;
  views: number;
  directions: number;
  calls: number;
  clicks: number;
  searches: number;
  date: string;
}

export interface LocationAlert {
  id: string;
  locationId: string;
  type: 'closure' | 'maintenance' | 'holiday' | 'event' | 'service_change';
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  startDate: string;
  endDate?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedServices: string[];
  alternativeLocations?: string[];
  contactInfo?: {
    phone: string;
    email: string;
  };
}

export interface GeocodeResult {
  address: string;
  addressHi?: string;
  position: { lat: number; lng: number };
  components: AddressComponent[];
  formattedAddress: string;
  formattedAddressHi?: string;
  types: string[];
}

export interface LocationEvent {
  id: string;
  locationId: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'workshop' | 'seminar' | 'community' | 'promotion' | 'other';
  registrationRequired: boolean;
  maxAttendees?: number;
  currentAttendees?: number;
  contactInfo?: {
    phone: string;
    email: string;
  };
  images: string[];
}

export interface NearbyPlace {
  id: string;
  name: string;
  nameHi: string;
  category: string;
  categoryHi: string;
  address: string;
  addressHi: string;
  distance: number;
  distanceText: string;
  rating?: number;
  types: string[];
  vicinity: string;
  vicinityHi: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface RouteInfo {
  origin: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  destination: Location;
  mode: 'driving' | 'walking' | 'transit' | 'bicycling';
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  steps: DirectionStep[];
  polyline: string;
  overviewPath: {
    latitude: number;
    longitude: number;
  }[];
  trafficInfo?: {
    condition: 'good' | 'moderate' | 'heavy';
    delay?: number;
  };
  fare?: {
    text: string;
    value: number;
    currency: string;
  };
}

export interface GeolocationInfo {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface LocationStats {
  totalLocations: number;
  totalBranches: number;
  totalATMs: number;
  locationsByState: Record<string, number>;
  locationsByCity: Record<string, number>;
  averageRating: number;
  totalReviews: number;
  activeLocations: number;
  locationsWithWheelchairAccess: number;
  locationsWith24HourService: number;
}

export interface LocationSuggestion {
  id: string;
  text: string;
  textHi: string;
  type: 'address' | 'establishment' | 'city' | 'state' | 'pincode';
  location?: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  descriptionHi?: string;
}

export interface LocationShareInfo {
  locationId: string;
  shareUrl: string;
  embedCode: string;
  qrCode: string;
  shortUrl: string;
  expiresAt?: string;
}

export interface LocationNotification {
  id: string;
  userId: string;
  locationId: string;
  type: 'directions' | 'hours_change' | 'new_service' | 'promotion' | 'alert';
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  sentAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface MarkerInstance {
  id: string;
  position: { lat: number; lng: number };
  setTitle: (title: string) => void;
  getMap: () => any;
}

export interface MapInstance {
  id: string;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  fitBounds: (bounds: MapBounds) => void;
  addMarker: (marker: MarkerOptions) => MarkerInstance;
  removeMarker: (markerId: string) => void;
  updateMarker: (markerId: string, options: Partial<MarkerOptions>) => void;
  clearMarkers: () => void;
  destroy: () => void;
}

export interface MarkerOptions {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  titleHi?: string;
  icon?: string;
  animation?: 'DROP' | 'BOUNCE';
  onClick?: (marker: MarkerInstance, event: MapClickEvent) => void;
}

export interface MapClickEvent {
  latLng: { lat: number; lng: number };
  pixel: { x: number; y: number };
}
