import { TravelPackage } from '@/components/TravelCard';

// Import destination images
import tropicalImage from '@/assets/destination-tropical.jpg';
import mountainsImage from '@/assets/destination-mountains.jpg';
import historicImage from '@/assets/destination-historic.jpg';
import cityImage from '@/assets/destination-city.jpg';
import safariImage from '@/assets/destination-safari.jpg';
import japanImage from '@/assets/destination-japan.jpg';

export const travelPackages: TravelPackage[] = [
  // Budget Under $500
  {
    id: '1',
    title: 'Thai Beach Getaway',
    location: 'Thailand',
    duration: '5 days',
    price: 299,
    currency: 'USD',
    image: tropicalImage,
    rating: 4.5,
    reviewCount: 1250,
    badge: 'Budget Pick',
    highlights: [
      'Beachfront accommodation',
      'Local street food tours',
      'Temple visits included'
    ],
    isWishlisted: false,
    bookedTimes: 35,
    category: 'culture'
  },
  {
    id: '2',
    title: 'Bali Adventure',
    location: 'Indonesia',
    duration: '4 days',
    price: 450,
    currency: 'USD',
    image: mountainsImage,
    rating: 4.6,
    reviewCount: 890,
    badge: 'Best Value',
    highlights: [
      'Volcano hiking',
      'Rice terrace tours',
      'Traditional markets'
    ],
    isWishlisted: false,
    bookedTimes: 28,
    category: 'adventure'
  },
  {
    id: '3',
    title: 'Vietnam Discovery',
    location: 'Vietnam',
    duration: '6 days',
    price: 389,
    currency: 'USD',
    image: cityImage,
    rating: 4.4,
    reviewCount: 1156,
    badge: 'Cultural',
    highlights: [
      'Ha Long Bay cruise',
      'Street food tours',
      'Ancient temples'
    ],
    isWishlisted: false,
    bookedTimes: 22,
    category: 'culture'
  },
  {
    id: '4',
    title: 'India Backpacker',
    location: 'India',
    duration: '8 days',
    price: 485,
    currency: 'USD',
    image: historicImage,
    rating: 4.3,
    reviewCount: 756,
    badge: 'Adventure',
    highlights: [
      'Taj Mahal visit',
      'Rajasthan palaces',
      'Local train journeys'
    ],
    isWishlisted: false,
    bookedTimes: 18,
    category: 'culture'
  },
  {
    id: '5',
    title: 'Nepal Trekking Base',
    location: 'Nepal',
    duration: '7 days',
    price: 475,
    currency: 'USD',
    image: mountainsImage,
    rating: 4.7,
    reviewCount: 432,
    badge: 'Eco-Trek',
    highlights: [
      'Mountain village stays',
      'Local guide included',
      'Traditional meals'
    ],
    isWishlisted: false,
    bookedTimes: 12,
    category: 'nature'
  },

  // Budget $500-$1000
  {
    id: '6',
    title: 'Maldives Paradise Retreat',
    location: 'Maldives',
    duration: '7 days',
    price: 899,
    currency: 'USD',
    image: tropicalImage,
    rating: 4.9,
    reviewCount: 2847,
    badge: 'Top Pick',
    highlights: [
      'Overwater villa accommodation',
      'Private beach access',
      'Snorkeling & diving included'
    ],
    isWishlisted: false,
    bookedTimes: 15,
    category: 'relaxation'
  },
  {
    id: '7',
    title: 'Greek Islands Hopping',
    location: 'Greece',
    duration: '8 days',
    price: 750,
    currency: 'USD',
    image: tropicalImage,
    rating: 4.6,
    reviewCount: 1543,
    badge: 'Island Paradise',
    highlights: [
      'Santorini sunsets',
      'Mykonos beaches',
      'Ancient ruins tours'
    ],
    isWishlisted: false,
    bookedTimes: 25,
    category: 'relaxation'
  },
  {
    id: '8',
    title: 'Turkey Cultural Tour',
    location: 'Turkey',
    duration: '6 days',
    price: 650,
    currency: 'USD',
    image: historicImage,
    rating: 4.5,
    reviewCount: 987,
    badge: 'Historical',
    highlights: [
      'Hagia Sophia tours',
      'Cappadocia balloons',
      'Turkish baths'
    ],
    isWishlisted: false,
    bookedTimes: 19,
    category: 'culture'
  },
  {
    id: '9',
    title: 'Morocco Desert Safari',
    location: 'Morocco',
    duration: '7 days',
    price: 725,
    currency: 'USD',
    image: safariImage,
    rating: 4.7,
    reviewCount: 1234,
    badge: 'Desert Adventure',
    highlights: [
      'Sahara camel trekking',
      'Berber camp nights',
      'Marrakech souks'
    ],
    isWishlisted: false,
    bookedTimes: 16,
    category: 'adventure'
  },
  {
    id: '10',
    title: 'Portugal Coastal',
    location: 'Portugal',
    duration: '6 days',
    price: 580,
    currency: 'USD',
    image: cityImage,
    rating: 4.4,
    reviewCount: 876,
    badge: 'Coastal Beauty',
    highlights: [
      'Porto wine tours',
      'Lisbon tram rides',
      'Coastal villages'
    ],
    isWishlisted: false,
    bookedTimes: 21,
    category: 'city'
  },
  {
    id: '11',
    title: 'Croatia Island Adventure',
    location: 'Croatia',
    duration: '8 days',
    price: 820,
    currency: 'USD',
    image: tropicalImage,
    rating: 4.8,
    reviewCount: 1432,
    badge: 'Adriatic Gem',
    highlights: [
      'Dubrovnik old town',
      'Plitvice waterfalls',
      'Island hopping'
    ],
    isWishlisted: false,
    bookedTimes: 14,
    category: 'nature'
  },

  // Premium $1000+ destinations
  {
    id: '12',
    title: 'Swiss Alps Adventure',
    location: 'Switzerland',
    duration: '10 days',
    price: 3299,
    currency: 'USD',
    image: mountainsImage,
    rating: 4.8,
    reviewCount: 1923,
    badge: 'Adventure Special',
    highlights: [
      'Mountain hiking tours',
      'Luxury alpine lodges',
      'Scenic train rides'
    ],
    isWishlisted: false,
    bookedTimes: 8,
    category: 'adventure'
  },
  {
    id: '3',
    title: 'Historic Prague Discovery',
    location: 'Czech Republic',
    duration: '5 days',
    price: 1299,
    currency: 'USD',
    image: historicImage,
    rating: 4.7,
    reviewCount: 3156,
    badge: 'Cultural Heritage',
    highlights: [
      'Historic castle tours',
      'Traditional beer tastings',
      'Walking tours included'
    ],
    isWishlisted: false,
    bookedTimes: 22,
    category: 'culture'
  },
  {
    id: '4',
    title: 'Dubai Modern Luxury',
    location: 'UAE',
    duration: '6 days',
    price: 2199,
    currency: 'USD',
    image: cityImage,
    rating: 4.6,
    reviewCount: 1876,
    badge: 'Luxury Experience',
    highlights: [
      '5-star hotel accommodations',
      'Desert safari included',
      'Shopping mall tours'
    ],
    isWishlisted: false,
    bookedTimes: 12,
    category: 'city'
  },
  {
    id: '5',
    title: 'African Safari Experience',
    location: 'Kenya',
    duration: '8 days',
    price: 3899,
    currency: 'USD',
    image: safariImage,
    rating: 4.9,
    reviewCount: 987,
    badge: 'Wildlife Special',
    highlights: [
      'Big Five game drives',
      'Luxury safari camps',
      'Masai village visits'
    ],
    isWishlisted: false,
    bookedTimes: 6,
    category: 'nature'
  },
  {
    id: '6',
    title: 'Cherry Blossom Japan',
    location: 'Japan',
    duration: '12 days',
    price: 4299,
    currency: 'USD',
    image: japanImage,
    rating: 4.8,
    reviewCount: 2341,
    badge: 'Seasonal Special',
    highlights: [
      'Temple and shrine visits',
      'Traditional ryokan stays',
      'Bullet train experiences'
    ],
    isWishlisted: false,
    bookedTimes: 9,
    category: 'culture'
  },
  {
    id: '7',
    title: 'Bali Wellness Retreat',
    location: 'Indonesia',
    duration: '9 days',
    price: 1899,
    currency: 'USD',
    image: tropicalImage,
    rating: 4.7,
    reviewCount: 1654,
    badge: 'Wellness Focus',
    highlights: [
      'Daily yoga sessions',
      'Spa treatments included',
      'Organic meal plans'
    ],
    isWishlisted: false,
    bookedTimes: 18,
    category: 'relaxation'
  },
  {
    id: '8',
    title: 'Iceland Northern Lights',
    location: 'Iceland',
    duration: '7 days',
    price: 2799,
    currency: 'USD',
    image: mountainsImage,
    rating: 4.8,
    reviewCount: 1432,
    badge: 'Natural Wonder',
    highlights: [
      'Northern lights tours',
      'Hot spring visits',
      'Glacier expeditions'
    ],
    isWishlisted: false,
    bookedTimes: 11,
    category: 'nature'
  },
  {
    id: '9',
    title: 'Ancient Rome Explorer',
    location: 'Italy',
    duration: '6 days',
    price: 1699,
    currency: 'USD',
    image: historicImage,
    rating: 4.6,
    reviewCount: 2987,
    badge: 'Historical',
    highlights: [
      'Colosseum private tours',
      'Vatican Museums access',
      'Italian cooking classes'
    ],
    isWishlisted: false,
    bookedTimes: 25,
    category: 'culture'
  },
  {
    id: '10',
    title: 'New York City Lights',
    location: 'USA',
    duration: '5 days',
    price: 1999,
    currency: 'USD',
    image: cityImage,
    rating: 4.5,
    reviewCount: 3456,
    badge: 'City Break',
    highlights: [
      'Broadway show tickets',
      'Empire State Building',
      'Central Park tours'
    ],
    isWishlisted: false,
    bookedTimes: 31,
    category: 'city'
  },
  {
    id: '11',
    title: 'Amazon Rainforest Adventure',
    location: 'Brazil',
    duration: '8 days',
    price: 2599,
    currency: 'USD',
    image: safariImage,
    rating: 4.7,
    reviewCount: 876,
    badge: 'Eco Adventure',
    highlights: [
      'Jungle expeditions',
      'Indigenous community visits',
      'Wildlife photography'
    ],
    isWishlisted: false,
    bookedTimes: 7,
    category: 'nature'
  },
  {
    id: '12',
    title: 'Greek Islands Odyssey',
    location: 'Greece',
    duration: '10 days',
    price: 2399,
    currency: 'USD',
    image: tropicalImage,
    rating: 4.8,
    reviewCount: 2134,
    badge: 'Island Hopping',
    highlights: [
      'Santorini sunset views',
      'Mykonos beach clubs',
      'Ancient ruins tours'
    ],
    isWishlisted: false,
    bookedTimes: 16,
    category: 'relaxation'
  },
  {
    id: '13',
    title: 'Himalayan Base Camp Trek',
    location: 'Nepal',
    duration: '14 days',
    price: 3599,
    currency: 'USD',
    image: mountainsImage,
    rating: 4.9,
    reviewCount: 654,
    badge: 'Extreme Adventure',
    highlights: [
      'Everest Base Camp trek',
      'Sherpa guided tours',
      'Mountain lodge stays'
    ],
    isWishlisted: false,
    bookedTimes: 4,
    category: 'adventure'
  },
  {
    id: '14',
    title: 'Morocco Imperial Cities',
    location: 'Morocco',
    duration: '9 days',
    price: 1799,
    currency: 'USD',
    image: historicImage,
    rating: 4.6,
    reviewCount: 1789,
    badge: 'Cultural Journey',
    highlights: [
      'Marrakech souks tour',
      'Sahara desert camping',
      'Traditional riad stays'
    ],
    isWishlisted: false,
    bookedTimes: 13,
    category: 'culture'
  },
  {
    id: '15',
    title: 'Singapore Food & Culture',
    location: 'Singapore',
    duration: '5 days',
    price: 1499,
    currency: 'USD',
    image: cityImage,
    rating: 4.7,
    reviewCount: 2876,
    badge: 'Culinary Tour',
    highlights: [
      'Street food tours',
      'Gardens by the Bay',
      'Marina Bay Sands access'
    ],
    isWishlisted: false,
    bookedTimes: 20,
    category: 'city'
  },
  {
    id: '16',
    title: 'Patagonia Wilderness',
    location: 'Argentina',
    duration: '11 days',
    price: 3199,
    currency: 'USD',
    image: mountainsImage,
    rating: 4.8,
    reviewCount: 543,
    badge: 'Wilderness',
    highlights: [
      'Torres del Paine trekking',
      'Glacier expeditions',
      'Wildlife spotting'
    ],
    isWishlisted: false,
    bookedTimes: 5,
    category: 'nature'
  },
  {
    id: '17',
    title: 'French Riviera Luxury',
    location: 'France',
    duration: '7 days',
    price: 2799,
    currency: 'USD',
    image: tropicalImage,
    rating: 4.7,
    reviewCount: 1987,
    badge: 'Luxury Escape',
    highlights: [
      'Cannes film festival area',
      'Monaco casino visits',
      'Luxury yacht charters'
    ],
    isWishlisted: false,
    bookedTimes: 14,
    category: 'relaxation'
  },
  {
    id: '18',
    title: 'Ancient Egypt Discovery',
    location: 'Egypt',
    duration: '8 days',
    price: 2199,
    currency: 'USD',
    image: historicImage,
    rating: 4.5,
    reviewCount: 3234,
    badge: 'Historical Wonder',
    highlights: [
      'Pyramids of Giza tours',
      'Nile River cruise',
      'Valley of Kings exploration'
    ],
    isWishlisted: false,
    bookedTimes: 19,
    category: 'culture'
  },
  {
    id: '19',
    title: 'Seoul Modern Culture',
    location: 'South Korea',
    duration: '6 days',
    price: 1899,
    currency: 'USD',
    image: cityImage,
    rating: 4.6,
    reviewCount: 1654,
    badge: 'K-Culture',
    highlights: [
      'K-pop studio tours',
      'Traditional palace visits',
      'Korean BBQ experiences'
    ],
    isWishlisted: false,
    bookedTimes: 17,
    category: 'city'
  },
  {
    id: '20',
    title: 'Australian Outback Safari',
    location: 'Australia',
    duration: '10 days',
    price: 3499,
    currency: 'USD',
    image: safariImage,
    rating: 4.7,
    reviewCount: 876,
    badge: 'Outback Adventure',
    highlights: [
      'Uluru sunrise tours',
      'Aboriginal cultural experiences',
      'Kangaroo island visits'
    ],
    isWishlisted: false,
    bookedTimes: 8,
    category: 'nature'
  }
];

export const getPackagesByDestination = (destination: string): TravelPackage[] => {
  if (!destination) return travelPackages;
  
  return travelPackages.filter(pkg =>
    pkg.location.toLowerCase().includes(destination.toLowerCase()) ||
    pkg.title.toLowerCase().includes(destination.toLowerCase())
  );
};

export const getPackagesByFilters = (filters: any): TravelPackage[] => {
  let filtered = [...travelPackages];
  let originalFiltered = [...travelPackages];
  
  // Apply destination filter first
  if (filters.destination) {
    const destinationFiltered = filtered.filter(pkg =>
      pkg.location.toLowerCase().includes(filters.destination.toLowerCase()) ||
      pkg.title.toLowerCase().includes(filters.destination.toLowerCase())
    );
    
    if (destinationFiltered.length > 0) {
      filtered = destinationFiltered;
    } else {
      // If no exact match, find similar destinations or show popular ones
      const partialMatch = filtered.filter(pkg => {
        const searchTerm = filters.destination.toLowerCase();
        return pkg.location.toLowerCase().split(' ').some(word => 
          word.includes(searchTerm) || searchTerm.includes(word)
        ) || pkg.title.toLowerCase().split(' ').some(word =>
          word.includes(searchTerm) || searchTerm.includes(word)
        );
      });
      
      if (partialMatch.length > 0) {
        filtered = partialMatch;
      } else {
        // Show most popular packages as fallback
        filtered = travelPackages.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
      }
    }
  }
  
  // Apply category filter
  if (filters.category) {
    const categoryFiltered = filtered.filter(pkg => pkg.category === filters.category);
    if (categoryFiltered.length > 0) {
      filtered = categoryFiltered;
    } else {
      // If no category match, just keep the current filtered results
      // Don't further reduce the results
    }
  }
  
  // Apply budget filter
  if (filters.budget) {
    const [min, max] = filters.budget.split('-').map(Number);
    let budgetFiltered;
    
    if (max) {
      budgetFiltered = filtered.filter(pkg => pkg.price >= min && pkg.price <= max);
    } else if (filters.budget.includes('+')) {
      budgetFiltered = filtered.filter(pkg => pkg.price >= min);
    }
    
    if (budgetFiltered && budgetFiltered.length > 0) {
      filtered = budgetFiltered;
    } else if (budgetFiltered && budgetFiltered.length === 0) {
      // If no budget match, show closest price range
      const avgPrice = Math.max(min, max || min);
      filtered = filtered.sort((a, b) => 
        Math.abs(a.price - avgPrice) - Math.abs(b.price - avgPrice)
      ).slice(0, 6);
    }
  }
  
  // Ensure we always return at least some results
  if (filtered.length === 0) {
    return travelPackages.sort((a, b) => b.rating - a.rating).slice(0, 6);
  }
  
  return filtered;
};