import React, { useState } from 'react';
import { MapPin, Star, Camera, Info, Users, Calendar, Thermometer, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import destination images
import tropicalImage from '@/assets/destination-tropical.jpg';
import mountainsImage from '@/assets/destination-mountains.jpg';
import historicImage from '@/assets/destination-historic.jpg';
import cityImage from '@/assets/destination-city.jpg';
import safariImage from '@/assets/destination-safari.jpg';
import japanImage from '@/assets/destination-japan.jpg';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  bestTimeToVisit: string;
  averageTemperature: string;
  currency: string;
  language: string;
  population: string;
  attractions: Attraction[];
  localCustoms: string[];
  travelTips: string[];
  photos: string[];
}

interface Attraction {
  id: string;
  name: string;
  description: string;
  rating: number;
  category: string;
  entryFee: string;
  openingHours: string;
}

export const DestinationInfo: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>('paris');
  const [activeTab, setActiveTab] = useState<'overview' | 'attractions' | 'customs' | 'tips' | 'photos'>('overview');

  const destinations: Record<string, Destination> = {
    paris: {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      description: 'The City of Light, renowned for its art, fashion, gastronomy, and culture. Paris is home to iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.',
      image: historicImage,
      rating: 4.8,
      bestTimeToVisit: 'April to June, September to October',
      averageTemperature: '15°C (59°F)',
      currency: 'Euro (EUR)',
      language: 'French',
      population: '2.1 million',
      attractions: [
        {
          id: '1',
          name: 'Eiffel Tower',
          description: 'Iconic iron lattice tower and symbol of Paris',
          rating: 4.9,
          category: 'Monument',
          entryFee: '€29.40 (top floor)',
          openingHours: '9:30 AM - 11:45 PM'
        },
        {
          id: '2',
          name: 'Louvre Museum',
          description: 'World\'s largest art museum housing the Mona Lisa',
          rating: 4.7,
          category: 'Museum',
          entryFee: '€17',
          openingHours: '9 AM - 6 PM (closed Tuesdays)'
        },
        {
          id: '3',
          name: 'Notre-Dame Cathedral',
          description: 'Gothic cathedral masterpiece (currently under restoration)',
          rating: 4.6,
          category: 'Religious Site',
          entryFee: 'Free (tours €10)',
          openingHours: 'Variable due to restoration'
        }
      ],
      localCustoms: [
        'Always greet with "Bonjour" when entering shops',
        'Dress elegantly when dining out',
        'Don\'t eat lunch before 12 PM or dinner before 7 PM',
        'Learn basic French phrases - locals appreciate the effort',
        'Maintain quiet voices in public transportation'
      ],
      travelTips: [
        'Buy a Navigo Easy card for convenient metro travel',
        'Many museums are free on first Sunday of each month',
        'Book restaurant reservations in advance',
        'Carry cash as some places don\'t accept cards',
        'Visit attractions early morning to avoid crowds',
        'Download offline maps as WiFi can be limited'
      ],
      photos: [historicImage, cityImage, mountainsImage]
    },
    tokyo: {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      description: 'A bustling metropolis blending ultramodern and traditional, from neon-lit skyscrapers to historic temples. Experience unique culture, incredible food, and cutting-edge technology.',
      image: japanImage,
      rating: 4.9,
      bestTimeToVisit: 'March to May, September to November',
      averageTemperature: '16°C (61°F)',
      currency: 'Japanese Yen (JPY)',
      language: 'Japanese',
      population: '14 million',
      attractions: [
        {
          id: '1',
          name: 'Senso-ji Temple',
          description: 'Ancient Buddhist temple in historic Asakusa district',
          rating: 4.8,
          category: 'Religious Site',
          entryFee: 'Free',
          openingHours: '6 AM - 5 PM'
        },
        {
          id: '2',
          name: 'Tokyo Skytree',
          description: 'Tallest tower in Japan with panoramic city views',
          rating: 4.6,
          category: 'Observatory',
          entryFee: '¥2,100-¥3,400',
          openingHours: '8 AM - 10 PM'
        },
        {
          id: '3',
          name: 'Shibuya Crossing',
          description: 'World\'s busiest pedestrian crossing',
          rating: 4.5,
          category: 'Street/Square',
          entryFee: 'Free',
          openingHours: '24/7'
        }
      ],
      localCustoms: [
        'Bow when greeting and thanking',
        'Remove shoes when entering homes and some restaurants',
        'Don\'t eat or drink while walking',
        'Be quiet on public transportation',
        'Don\'t tip - it\'s not expected in Japan'
      ],
      travelTips: [
        'Get a JR Pass for unlimited train travel',
        'Learn basic chopstick etiquette',
        'Carry cash - many places are cash-only',
        'Download translation apps',
        'Respect photography rules at temples',
        'Try convenience store food - it\'s surprisingly good'
      ],
      photos: [japanImage, cityImage, safariImage]
    },
    bali: {
      id: 'bali',
      name: 'Bali',
      country: 'Indonesia',
      description: 'Tropical paradise known for beautiful beaches, ancient temples, and lush landscapes. Experience spiritual culture, world-class surfing, and luxurious resorts.',
      image: tropicalImage,
      rating: 4.7,
      bestTimeToVisit: 'April to October (dry season)',
      averageTemperature: '28°C (82°F)',
      currency: 'Indonesian Rupiah (IDR)',
      language: 'Indonesian, Balinese',
      population: '4.3 million',
      attractions: [
        {
          id: '1',
          name: 'Tanah Lot Temple',
          description: 'Iconic sea temple perched on a rock formation',
          rating: 4.6,
          category: 'Religious Site',
          entryFee: 'IDR 60,000',
          openingHours: '7 AM - 7 PM'
        },
        {
          id: '2',
          name: 'Tegallalang Rice Terraces',
          description: 'Stunning traditional rice paddies with Instagram-worthy views',
          rating: 4.5,
          category: 'Natural Wonder',
          entryFee: 'IDR 15,000',
          openingHours: '6 AM - 6 PM'
        },
        {
          id: '3',
          name: 'Uluwatu Temple',
          description: 'Clifftop temple famous for sunset views and Kecak dance',
          rating: 4.7,
          category: 'Religious Site',
          entryFee: 'IDR 50,000',
          openingHours: '9 AM - 6 PM'
        }
      ],
      localCustoms: [
        'Dress modestly when visiting temples',
        'Use right hand for giving and receiving',
        'Don\'t point with your index finger',
        'Remove shoes before entering temples',
        'Be respectful during religious ceremonies'
      ],
      travelTips: [
        'Rent a scooter for easy transportation',
        'Negotiate prices at markets',
        'Drink bottled water',
        'Apply sunscreen frequently',
        'Book spa treatments in advance',
        'Learn basic Indonesian phrases'
      ],
      photos: [tropicalImage, mountainsImage, safariImage]
    },
    london: {
      id: 'london',
      name: 'London',
      country: 'United Kingdom',
      description: 'A historic city blending tradition with modernity. From royal palaces to world-class museums, iconic landmarks to vibrant markets, London offers endless discoveries.',
      image: cityImage,
      rating: 4.6,
      bestTimeToVisit: 'May to September',
      averageTemperature: '12°C (54°F)',
      currency: 'British Pound (GBP)',
      language: 'English',
      population: '9 million',
      attractions: [
        {
          id: '1',
          name: 'Big Ben & Parliament',
          description: 'Iconic clock tower and seat of British government',
          rating: 4.8,
          category: 'Monument',
          entryFee: 'Free (exterior view)',
          openingHours: '24/7 (exterior)'
        },
        {
          id: '2',
          name: 'British Museum',
          description: 'World-famous museum with artifacts from around the globe',
          rating: 4.7,
          category: 'Museum',
          entryFee: 'Free (donations welcome)',
          openingHours: '10 AM - 5:30 PM'
        },
        {
          id: '3',
          name: 'Tower of London',
          description: 'Historic castle housing the Crown Jewels',
          rating: 4.6,
          category: 'Historic Site',
          entryFee: '£30',
          openingHours: '9 AM - 5:30 PM'
        }
      ],
      localCustoms: [
        'Queue politely and wait your turn',
        'Stand right on escalators, walk left',
        'Say "please" and "thank you" frequently',
        'Respect personal space in public transport',
        'Tipping 10-15% in restaurants is expected'
      ],
      travelTips: [
        'Get an Oyster card for public transport',
        'Many museums offer free admission',
        'Book afternoon tea reservations in advance',
        'Carry an umbrella - weather can change quickly',
        'Pub culture is important - try a traditional pub',
        'Mind the gap on the London Underground'
      ],
      photos: [cityImage, historicImage, mountainsImage]
    },
    newyork: {
      id: 'newyork',
      name: 'New York',
      country: 'United States',
      description: 'The city that never sleeps. From Broadway shows to world-class dining, iconic skyscrapers to diverse neighborhoods, NYC offers unmatched energy and culture.',
      image: safariImage,
      rating: 4.5,
      bestTimeToVisit: 'April to June, September to November',
      averageTemperature: '14°C (57°F)',
      currency: 'US Dollar (USD)',
      language: 'English',
      population: '8.4 million',
      attractions: [
        {
          id: '1',
          name: 'Statue of Liberty',
          description: 'Iconic symbol of freedom and democracy',
          rating: 4.7,
          category: 'Monument',
          entryFee: '$24 (ferry + access)',
          openingHours: '8:30 AM - 4 PM'
        },
        {
          id: '2',
          name: 'Central Park',
          description: 'Green oasis in the heart of Manhattan',
          rating: 4.8,
          category: 'Park',
          entryFee: 'Free',
          openingHours: '6 AM - 1 AM'
        },
        {
          id: '3',
          name: 'Times Square',
          description: 'Bright lights and Broadway theaters',
          rating: 4.3,
          category: 'Street/Square',
          entryFee: 'Free',
          openingHours: '24/7'
        }
      ],
      localCustoms: [
        'Tip 18-20% at restaurants',
        'Walk quickly on sidewalks',
        'Don\'t block subway doors',
        'Be direct in communication',
        'Respect street performers but don\'t feel obligated to tip'
      ],
      travelTips: [
        'Get a MetroCard for subway travel',
        'Book Broadway shows in advance',
        'Try food trucks and delis',
        'Walk or take subway - avoid taxis in traffic',
        'Many museums have suggested donation fees',
        'Explore different neighborhoods beyond Manhattan'
      ],
      photos: [safariImage, cityImage, historicImage]
    }
  };

  const destination = destinations[selectedDestination];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Destination Selector */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Destination Information</h1>
        <div className="flex gap-4 flex-wrap">
          {Object.values(destinations).map((dest) => (
            <Button
              key={dest.id}
              onClick={() => setSelectedDestination(dest.id)}
              variant={selectedDestination === dest.id ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              {dest.name}, {dest.country}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2">
          {/* Hero Section */}
          <div className="relative rounded-lg overflow-hidden mb-6">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {destination.name}, {destination.country}
              </h2>
              <div className="flex items-center gap-2">
                {renderStars(destination.rating)}
                <span className="text-white text-sm">({destination.rating}/5)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <p className="text-gray-700 leading-relaxed">{destination.description}</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="flex border-b">
              {[
                { key: 'overview', label: 'Overview', icon: Info },
                { key: 'attractions', label: 'Attractions', icon: MapPin },
                { key: 'photos', label: 'Photos', icon: Camera },
                { key: 'customs', label: 'Local Customs', icon: Users },
                { key: 'tips', label: 'Travel Tips', icon: Info }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Best Time to Visit</h4>
                        <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Thermometer className="w-5 h-5 text-orange-500" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Average Temperature</h4>
                        <p className="text-gray-600">{destination.averageTemperature}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Currency</h4>
                        <p className="text-gray-600">{destination.currency}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-500" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Population</h4>
                        <p className="text-gray-600">{destination.population}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 text-blue-500 flex items-center justify-center">🗣️</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Language</h4>
                        <p className="text-gray-600">{destination.language}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attractions' && (
                <div className="space-y-6">
                  {destination.attractions.map((attraction) => (
                    <div key={attraction.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">{attraction.name}</h4>
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {attraction.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(attraction.rating)}
                          <span className="text-sm text-gray-600 ml-1">({attraction.rating})</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{attraction.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-gray-800">Entry Fee:</strong>
                          <span className="text-gray-600 ml-2">{attraction.entryFee}</span>
                        </div>
                        <div>
                          <strong className="text-gray-800">Opening Hours:</strong>
                          <span className="text-gray-600 ml-2">{attraction.openingHours}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'customs' && (
                <div className="space-y-3">
                  {destination.localCustoms.map((custom, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{custom}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.photos.map((photo, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <img
                          src={photo}
                          alt={`${destination.name} photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all" />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          {index + 1} / {destination.photos.length}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                      Explore the beautiful sights and attractions of {destination.name}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'tips' && (
                <div className="space-y-3">
                  {destination.travelTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        💡
                      </div>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Photos & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Photo Gallery */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Photo Gallery
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {destination.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${destination.name} photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Plan Your Trip</h3>
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Add to Itinerary
              </Button>
              <Button variant="outline" className="w-full">
                Find Flights
              </Button>
              <Button variant="outline" className="w-full">
                Book Hotels
              </Button>
              <Button variant="outline" className="w-full">
                View Tours
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};