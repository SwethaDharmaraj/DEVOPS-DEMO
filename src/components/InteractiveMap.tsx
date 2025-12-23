import React, { useState } from 'react';
import { MapPin, Search, Navigation, Layers, Plus, Minus, Locate, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapLocation {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'attraction' | 'transport' | 'custom';
  coordinates: { lat: number; lng: number };
  address: string;
  rating?: number;
  description?: string;
  image?: string;
  visited?: boolean;
}

interface RoutePoint {
  location: MapLocation;
  order: number;
  estimatedTime?: string;
  distance?: string;
}

export const InteractiveMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [mapLayer, setMapLayer] = useState<'map' | 'satellite' | 'terrain'>('map');
  const [showRoute, setShowRoute] = useState(false);
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({ lat: 48.8566, lng: 2.3522 }); // Paris center

  // Mock locations for Paris
  const locations: MapLocation[] = [
    {
      id: '1',
      name: 'Eiffel Tower',
      type: 'attraction',
      coordinates: { lat: 48.8584, lng: 2.2945 },
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
      rating: 4.4,
      description: 'Iconic iron lattice tower and symbol of Paris',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Louvre Museum',
      type: 'attraction',
      coordinates: { lat: 48.8606, lng: 2.3376 },
      address: 'Rue de Rivoli, 75001 Paris',
      rating: 4.7,
      description: 'World\'s largest art museum',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Notre-Dame Cathedral',
      type: 'attraction',
      coordinates: { lat: 48.8530, lng: 2.3499 },
      address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
      rating: 4.6,
      description: 'Gothic cathedral masterpiece',
      image: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Grand Hotel Paris',
      type: 'hotel',
      coordinates: { lat: 48.8698, lng: 2.3314 },
      address: '2 Rue Scribe, 75009 Paris',
      rating: 4.8,
      description: 'Luxury hotel in the heart of Paris',
      image: '/placeholder.svg'
    },
    {
      id: '5',
      name: 'Le Petit Bistro',
      type: 'restaurant',
      coordinates: { lat: 48.8847, lng: 2.3395 },
      address: '15 Rue des Trois Frères, 75018 Paris',
      rating: 4.9,
      description: 'Authentic French bistro',
      image: '/placeholder.svg'
    },
    {
      id: '6',
      name: 'Arc de Triomphe',
      type: 'attraction',
      coordinates: { lat: 48.8738, lng: 2.2950 },
      address: 'Place Charles de Gaulle, 75008 Paris',
      rating: 4.5,
      description: 'Monumental arch on the Champs-Élysées',
      image: '/placeholder.svg'
    },
    {
      id: '7',
      name: 'Châtelet Metro Station',
      type: 'transport',
      coordinates: { lat: 48.8583, lng: 2.3472 },
      address: 'Place du Châtelet, 75001 Paris',
      description: 'Major metro hub with multiple line connections'
    }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLocationIcon = (type: MapLocation['type']) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'restaurant': return '🍽️';
      case 'attraction': return '🎭';
      case 'transport': return '🚇';
      default: return '📍';
    }
  };

  const getLocationColor = (type: MapLocation['type']) => {
    switch (type) {
      case 'hotel': return 'bg-purple-500';
      case 'restaurant': return 'bg-orange-500';
      case 'attraction': return 'bg-blue-500';
      case 'transport': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const addToRoute = (location: MapLocation) => {
    if (!routePoints.find(point => point.location.id === location.id)) {
      const newPoint: RoutePoint = {
        location,
        order: routePoints.length + 1,
        estimatedTime: `${Math.floor(Math.random() * 30) + 10} min`,
        distance: `${(Math.random() * 2 + 0.5).toFixed(1)} km`
      };
      setRoutePoints([...routePoints, newPoint]);
      setShowRoute(true);
    }
  };

  const removeFromRoute = (locationId: string) => {
    const updatedPoints = routePoints
      .filter(point => point.location.id !== locationId)
      .map((point, index) => ({ ...point, order: index + 1 }));
    setRoutePoints(updatedPoints);
  };

  const clearRoute = () => {
    setRoutePoints([]);
    setShowRoute(false);
  };

  const MapControls = () => (
    <div className="absolute top-4 right-4 z-10 space-y-2">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <button
          onClick={() => setZoom(Math.min(18, zoom + 1))}
          className="block w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(Math.max(1, zoom - 1))}
          className="block w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-2">
        <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
          <Locate className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-2">
        <select
          value={mapLayer}
          onChange={(e) => setMapLayer(e.target.value as any)}
          className="text-sm border-none outline-none bg-transparent"
        >
          <option value="map">Map</option>
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
        </select>
      </div>
    </div>
  );

  const LocationMarker: React.FC<{ location: MapLocation; onClick: () => void }> = ({ location, onClick }) => {
    const style = {
      position: 'absolute' as const,
      left: `${((location.coordinates.lng - center.lng) * 10000 + 500)}px`,
      top: `${((center.lat - location.coordinates.lat) * 10000 + 300)}px`,
      transform: 'translate(-50%, -100%)',
    };

    return (
      <div
        style={style}
        onClick={onClick}
        className="cursor-pointer z-20 hover:z-30 transition-all hover:scale-110"
      >
        <div className={`w-8 h-8 rounded-full ${getLocationColor(location.type)} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
          <span className="text-xs">{getLocationIcon(location.type)}</span>
        </div>
        <div className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${getLocationColor(location.type).replace('bg-', 'border-t-')} mx-auto`}></div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Interactive Map</h1>
        <p className="text-gray-600">
          Explore destinations, find nearby attractions, and plan your routes with our interactive map.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search and Locations Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search locations..."
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location);
                    setCenter(location.coordinates);
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className={`w-6 h-6 rounded-full ${getLocationColor(location.type)} flex items-center justify-center text-white text-xs`}>
                    {getLocationIcon(location.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{location.name}</div>
                    <div className="text-xs text-gray-600">{location.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Route Planning */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Route className="w-4 h-4" />
                My Route
              </h3>
              {routePoints.length > 0 && (
                <button
                  onClick={clearRoute}
                  className="text-red-600 text-sm hover:text-red-700"
                >
                  Clear
                </button>
              )}
            </div>

            {routePoints.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Click on locations to add them to your route
              </p>
            ) : (
              <div className="space-y-3">
                {routePoints.map((point, index) => (
                  <div key={point.location.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {point.order}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{point.location.name}</div>
                      {point.distance && point.estimatedTime && (
                        <div className="text-xs text-gray-600">
                          {point.distance} • {point.estimatedTime}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromRoute(point.location.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="text-sm font-medium text-gray-800">
                    Total: {routePoints.reduce((sum, point) => sum + parseFloat(point.distance || '0'), 0).toFixed(1)} km
                  </div>
                  <div className="text-xs text-gray-600">
                    Est. time: {Math.ceil(routePoints.reduce((sum, point) => sum + parseInt(point.estimatedTime || '0'), 0) / 60)} hours
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location Types Legend */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Legend</h3>
            <div className="space-y-2">
              {['hotel', 'restaurant', 'attraction', 'transport'].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getLocationColor(type as MapLocation['type'])}`}></div>
                  <span className="text-sm text-gray-700 capitalize">{type}s</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            <div 
              className="w-full h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 relative"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1), transparent 50%),
                                 radial-gradient(circle at 70% 70%, rgba(34, 197, 94, 0.1), transparent 50%)`,
              }}
            >
              {/* Mock map background with streets */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-px bg-gray-400 absolute top-1/4"></div>
                <div className="w-full h-px bg-gray-400 absolute top-1/2"></div>
                <div className="w-full h-px bg-gray-400 absolute top-3/4"></div>
                <div className="w-px h-full bg-gray-400 absolute left-1/4"></div>
                <div className="w-px h-full bg-gray-400 absolute left-1/2"></div>
                <div className="w-px h-full bg-gray-400 absolute left-3/4"></div>
              </div>

              {/* Location Markers */}
              {filteredLocations.map((location) => (
                <LocationMarker
                  key={location.id}
                  location={location}
                  onClick={() => setSelectedLocation(location)}
                />
              ))}

              {/* Route Lines */}
              {showRoute && routePoints.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {routePoints.slice(0, -1).map((point, index) => {
                    const nextPoint = routePoints[index + 1];
                    const startX = (point.location.coordinates.lng - center.lng) * 10000 + 500;
                    const startY = (center.lat - point.location.coordinates.lat) * 10000 + 300;
                    const endX = (nextPoint.location.coordinates.lng - center.lng) * 10000 + 500;
                    const endY = (center.lat - nextPoint.location.coordinates.lat) * 10000 + 300;
                    
                    return (
                      <line
                        key={index}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                      />
                    );
                  })}
                </svg>
              )}

              <MapControls />

              {/* Map Attribution */}
              <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs text-gray-600">
                © Interactive Travel Map
              </div>
            </div>

            {/* Location Details Panel */}
            {selectedLocation && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${getLocationColor(selectedLocation.type)} flex items-center justify-center text-white text-xs`}>
                      {getLocationIcon(selectedLocation.type)}
                    </div>
                    <h3 className="font-semibold text-gray-800">{selectedLocation.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                {selectedLocation.rating && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < selectedLocation.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{selectedLocation.rating}/5</span>
                  </div>
                )}

                <p className="text-sm text-gray-700 mb-3">{selectedLocation.description}</p>
                <p className="text-xs text-gray-600 mb-4">{selectedLocation.address}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => addToRoute(selectedLocation)}
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={routePoints.some(point => point.location.id === selectedLocation.id)}
                  >
                    {routePoints.some(point => point.location.id === selectedLocation.id) ? 'In Route' : 'Add to Route'}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Directions
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};