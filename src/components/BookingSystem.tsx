import React, { useState } from 'react';
import { Search, Plane, Hotel, Car, MapPin, Calendar, Users, Star, Filter, SortAsc, Ship, FileDown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BookingType = 'flights' | 'hotels' | 'cars' | 'activities' | 'ships';

interface SearchFilters {
  type: BookingType;
  origin: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  rating: number;
}

interface BookingResult {
  id: string;
  type: BookingType;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  features: string[];
  provider: string;
  cancellation: string;
  duration?: string;
}

export const BookingSystem: React.FC<{ initialType?: BookingType }> = ({ initialType = 'flights' }) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    type: initialType,
    origin: '',
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: 0,
    maxPrice: 5000,
    rating: 0
  });

  const [searchResults, setSearchResults] = useState<BookingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popular'>('price');

  // Mock data for different booking types
  const mockResults: Record<BookingType, BookingResult[]> = {
    flights: [
      {
        id: '1',
        type: 'flights',
        title: 'New York to Paris',
        subtitle: 'Air France • Non-stop',
        image: '/placeholder.svg',
        price: 850,
        originalPrice: 950,
        rating: 4.5,
        reviews: 1200,
        features: ['Free WiFi', 'In-flight meals', 'Extra legroom'],
        provider: 'Air France',
        cancellation: 'Free cancellation within 24 hours',
        duration: '7h 45m'
      },
      {
        id: '2',
        type: 'flights',
        title: 'New York to Paris',
        subtitle: 'Delta • 1 stop',
        image: '/placeholder.svg',
        price: 720,
        rating: 4.3,
        reviews: 890,
        features: ['Free WiFi', 'Entertainment system'],
        provider: 'Delta Airlines',
        cancellation: 'Flexible booking',
        duration: '10h 20m'
      },
      {
        id: '3',
        type: 'flights',
        title: 'New York to Paris',
        subtitle: 'Lufthansa • 1 stop',
        image: '/placeholder.svg',
        price: 680,
        rating: 4.6,
        reviews: 2100,
        features: ['Premium economy available', 'Lounge access'],
        provider: 'Lufthansa',
        cancellation: '48-hour free cancellation',
        duration: '11h 15m'
      }
    ],
    hotels: [
      {
        id: '1',
        type: 'hotels',
        title: 'Grand Hotel Paris',
        subtitle: '5-star luxury in city center',
        image: '/placeholder.svg',
        price: 320,
        rating: 4.8,
        reviews: 3200,
        features: ['Free WiFi', 'Spa & Wellness', 'Room service', 'Concierge'],
        provider: 'Booking.com',
        cancellation: 'Free cancellation until 6 PM on arrival day'
      },
      {
        id: '2',
        type: 'hotels',
        title: 'Boutique Seine View',
        subtitle: '4-star boutique with river views',
        image: '/placeholder.svg',
        price: 180,
        rating: 4.5,
        reviews: 890,
        features: ['Seine view', 'Free WiFi', 'Continental breakfast'],
        provider: 'Hotels.com',
        cancellation: 'Free cancellation until check-in'
      },
      {
        id: '3',
        type: 'hotels',
        title: 'Budget Central Paris',
        subtitle: '3-star near metro station',
        image: '/placeholder.svg',
        price: 95,
        originalPrice: 120,
        rating: 4.2,
        reviews: 1500,
        features: ['Free WiFi', '24/7 reception', 'Metro nearby'],
        provider: 'Expedia',
        cancellation: 'Non-refundable'
      }
    ],
    cars: [
      {
        id: '1',
        type: 'cars',
        title: 'Economy Car - Peugeot 208',
        subtitle: 'Manual • 5 seats • Air conditioning',
        image: '/placeholder.svg',
        price: 45,
        rating: 4.3,
        reviews: 450,
        features: ['Manual transmission', 'Air conditioning', 'Radio/USB'],
        provider: 'Hertz',
        cancellation: 'Free cancellation up to 1 hour before pickup'
      },
      {
        id: '2',
        type: 'cars',
        title: 'Compact Car - Volkswagen Golf',
        subtitle: 'Automatic • 5 seats • GPS included',
        image: '/placeholder.svg',
        price: 65,
        rating: 4.6,
        reviews: 780,
        features: ['Automatic transmission', 'GPS navigation', 'Bluetooth'],
        provider: 'Avis',
        cancellation: 'Free cancellation up to pickup time'
      },
      {
        id: '3',
        type: 'cars',
        title: 'Luxury SUV - BMW X3',
        subtitle: 'Automatic • 7 seats • Premium features',
        image: '/placeholder.svg',
        price: 150,
        rating: 4.8,
        reviews: 320,
        features: ['Leather seats', 'Premium sound', 'Advanced safety'],
        provider: 'Enterprise',
        cancellation: 'Flexible cancellation policy'
      }
    ],
    activities: [
      {
        id: '1',
        type: 'activities',
        title: 'Eiffel Tower Skip-the-Line Tour',
        subtitle: '2.5 hours • Small group tour',
        image: '/placeholder.svg',
        price: 85,
        rating: 4.9,
        reviews: 5600,
        features: ['Skip-the-line access', 'Expert guide', 'Small groups'],
        provider: 'Viator',
        cancellation: 'Full refund if cancelled 24 hours in advance',
        duration: '2.5 hours'
      },
      {
        id: '2',
        type: 'activities',
        title: 'Seine River Cruise with Dinner',
        subtitle: '3 hours • Evening cruise',
        image: '/placeholder.svg',
        price: 120,
        originalPrice: 140,
        rating: 4.7,
        reviews: 2300,
        features: ['3-course dinner', 'Wine included', 'Live commentary'],
        provider: 'GetYourGuide',
        cancellation: 'Free cancellation up to 24 hours before',
        duration: '3 hours'
      },
      {
        id: '3',
        type: 'activities',
        title: 'Louvre Museum Guided Tour',
        subtitle: '3 hours • Art history tour',
        image: '/placeholder.svg',
        price: 65,
        rating: 4.6,
        reviews: 8900,
        features: ['Priority access', 'Professional guide', 'Highlights tour'],
        provider: 'Tiqets',
        cancellation: 'Flexible cancellation options',
        duration: '3 hours'
      }
    ],
    ships: [
      {
        id: '1',
        type: 'ships',
        title: 'Mediterranean Cruise - 7 Nights',
        subtitle: 'Rome • Barcelona • Cannes • Naples',
        image: '/placeholder.svg',
        price: 999,
        originalPrice: 1299,
        rating: 4.7,
        reviews: 1450,
        features: ['All-inclusive meals', 'Ocean-view cabin', 'Onboard entertainment'],
        provider: 'Royal Caribbean',
        cancellation: 'Free cancellation up to 48 hours before',
        duration: '7 nights'
      },
      {
        id: '2',
        type: 'ships',
        title: 'Alaskan Glacier Cruise - 5 Nights',
        subtitle: 'Juneau • Skagway • Glacier Bay',
        image: '/placeholder.svg',
        price: 799,
        rating: 4.8,
        reviews: 980,
        features: ['Shore excursions', 'Naturalist guides', 'Heated pools'],
        provider: 'Princess Cruises',
        cancellation: 'Flexible cancellation policy',
        duration: '5 nights'
      }
    ]
  };

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults[searchFilters.type]);
      setLoading(false);
    }, 1000);
  };

  const renderSearchForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      {/* Type Selector */}
      <div className="flex gap-4 mb-6">
        {[
          { type: 'flights' as BookingType, icon: Plane, label: 'Flights' },
          { type: 'hotels' as BookingType, icon: Hotel, label: 'Hotels' },
          { type: 'cars' as BookingType, icon: Car, label: 'Car Rental' },
          { type: 'ships' as BookingType, icon: MapPin, label: 'Ships' },
          { type: 'activities' as BookingType, icon: MapPin, label: 'Activities' }
        ].map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setSearchFilters({ ...searchFilters, type })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              searchFilters.type === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {searchFilters.type === 'flights' ? 'From' : 'Location'}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchFilters.origin}
              onChange={(e) => setSearchFilters({ ...searchFilters, origin: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={searchFilters.type === 'flights' ? 'Departure city' : 'Enter location'}
            />
          </div>
        </div>

        {searchFilters.type === 'flights' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchFilters.destination}
                onChange={(e) => setSearchFilters({ ...searchFilters, destination: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Destination city"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {searchFilters.type === 'flights' ? 'Departure' : 'Check-in'}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={searchFilters.checkIn}
              onChange={(e) => setSearchFilters({ ...searchFilters, checkIn: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {searchFilters.type !== 'flights' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={searchFilters.checkOut}
                onChange={(e) => setSearchFilters({ ...searchFilters, checkOut: e.target.value })}
                min={searchFilters.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {searchFilters.type === 'flights' ? 'Passengers' : searchFilters.type === 'hotels' ? 'Guests' : 'Passengers'}
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={searchFilters.guests}
              onChange={(e) => setSearchFilters({ ...searchFilters, guests: parseInt(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-6"
          >
            <Search className="w-4 h-4 mr-2" />
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Filters Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Filter className="w-4 h-4 inline mr-1" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border-t mt-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={searchFilters.minPrice}
                  onChange={(e) => setSearchFilters({ ...searchFilters, minPrice: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setSearchFilters({ ...searchFilters, maxPrice: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
              <select
                value={searchFilters.rating}
                onChange={(e) => setSearchFilters({ ...searchFilters, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value={0}>Any rating</option>
                <option value={3}>3+ stars</option>
                <option value={4}>4+ stars</option>
                <option value={4.5}>4.5+ stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="price">Price (Low to High)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderResults = () => (
    <div className="space-y-4">
      {searchResults.map((result) => (
        <div key={result.id} className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row">
            <img
              src={result.image}
              alt={result.title}
              className="w-full md:w-48 h-48 md:h-32 object-cover rounded-l-lg"
            />
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{result.title}</h3>
                  <p className="text-gray-600">{result.subtitle}</p>
                  {result.duration && (
                    <p className="text-sm text-blue-600">{result.duration}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(result.rating)}
                    <span className="text-sm text-gray-600 ml-1">({result.reviews})</span>
                  </div>
                  <div className="text-right">
                    {result.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${result.originalPrice}</span>
                    )}
                    <div className="text-2xl font-bold text-gray-800">
                      ${result.price}
                      <span className="text-sm font-normal text-gray-600">
                        {result.type === 'hotels' ? '/night' : result.type === 'cars' ? '/day' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {result.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Provider:</span> {result.provider}
                  <br />
                  <span className="font-medium">Cancellation:</span> {result.cancellation}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Your Travel</h1>
      
      {renderSearchForm()}

      {searchResults.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {searchResults.length} results found
            </h2>
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Sorted by {sortBy === 'price' ? 'Price' : sortBy === 'rating' ? 'Rating' : 'Popularity'}
              </span>
            </div>
          </div>
          {renderResults()}
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for the best options...</p>
        </div>
      )}
    </div>
  );
};