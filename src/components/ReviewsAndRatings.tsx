import React, { useState } from 'react';
import { Star, ThumbsUp, Filter, Search, MapPin, Calendar, User, Camera, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  type: 'hotel' | 'restaurant' | 'attraction' | 'activity';
  placeName: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  helpful: number;
  photos: string[];
  verified: boolean;
  tags: string[];
}

interface RatingBreakdown {
  overall: number;
  cleanliness: number;
  service: number;
  value: number;
  location: number;
  facilities: number;
}

interface PlaceInfo {
  id: string;
  name: string;
  type: string;
  location: string;
  overallRating: number;
  totalReviews: number;
  image: string;
  priceRange: string;
  features: string[];
  ratingBreakdown: RatingBreakdown;
}

export const ReviewsAndRatings: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const reviewTypes = [
    { id: 'all', name: 'All Reviews', icon: '📍' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'attraction', name: 'Attractions', icon: '🎭' },
    { id: 'activity', name: 'Activities', icon: '🎯' }
  ];

  const places: PlaceInfo[] = [
    {
      id: '1',
      name: 'Grand Hotel Paris',
      type: 'hotel',
      location: 'Paris, France',
      overallRating: 4.6,
      totalReviews: 1248,
      image: '/placeholder.svg',
      priceRange: '$200-350/night',
      features: ['Free WiFi', 'Spa', 'Restaurant', 'Concierge'],
      ratingBreakdown: {
        overall: 4.6,
        cleanliness: 4.8,
        service: 4.5,
        value: 4.2,
        location: 4.9,
        facilities: 4.4
      }
    },
    {
      id: '2',
      name: 'Le Petit Bistro',
      type: 'restaurant',
      location: 'Montmartre, Paris',
      overallRating: 4.8,
      totalReviews: 892,
      image: '/placeholder.svg',
      priceRange: '$30-50/person',
      features: ['Authentic French', 'Wine Selection', 'Cozy Atmosphere'],
      ratingBreakdown: {
        overall: 4.8,
        cleanliness: 4.7,
        service: 4.9,
        value: 4.6,
        location: 4.8,
        facilities: 4.5
      }
    },
    {
      id: '3',
      name: 'Eiffel Tower',
      type: 'attraction',
      location: 'Paris, France',
      overallRating: 4.4,
      totalReviews: 15624,
      image: '/placeholder.svg',
      priceRange: '$15-30/person',
      features: ['Iconic Views', 'Elevator Access', 'Restaurant'],
      ratingBreakdown: {
        overall: 4.4,
        cleanliness: 4.2,
        service: 4.1,
        value: 4.0,
        location: 5.0,
        facilities: 4.3
      }
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      type: 'hotel',
      placeName: 'Grand Hotel Paris',
      location: 'Paris, France',
      rating: 5,
      title: 'Exceptional service and perfect location!',
      content: 'Our stay at Grand Hotel Paris exceeded all expectations. The staff went above and beyond to make our anniversary special. The room was spacious, beautifully decorated, and spotlessly clean. The location is unbeatable - walking distance to all major attractions.',
      author: 'Sarah Johnson',
      authorAvatar: '/placeholder.svg',
      date: '2024-03-10',
      helpful: 23,
      photos: ['/placeholder.svg', '/placeholder.svg'],
      verified: true,
      tags: ['Anniversary', 'Luxury', 'Central Location']
    },
    {
      id: '2',
      type: 'restaurant',
      placeName: 'Le Petit Bistro',
      location: 'Montmartre, Paris',
      rating: 5,
      title: 'Authentic French cuisine at its finest',
      content: 'Hidden gem in Montmartre! The coq au vin was absolutely divine, and the wine selection was impressive. Our server Marie was knowledgeable and helped us choose the perfect bottle. The atmosphere is intimate and romantic - perfect for a special evening.',
      author: 'Marco Rossi',
      authorAvatar: '/placeholder.svg',
      date: '2024-03-08',
      helpful: 18,
      photos: ['/placeholder.svg'],
      verified: true,
      tags: ['Romantic', 'Wine', 'Authentic']
    },
    {
      id: '3',
      type: 'attraction',
      placeName: 'Eiffel Tower',
      location: 'Paris, France',
      rating: 4,
      title: 'Iconic but crowded - worth the visit',
      content: 'The Eiffel Tower is definitely a must-see when in Paris. The views from the top are breathtaking, especially at sunset. However, be prepared for long queues and crowds. I recommend booking skip-the-line tickets in advance and visiting during off-peak hours.',
      author: 'Jennifer Lee',
      authorAvatar: '/placeholder.svg',
      date: '2024-03-05',
      helpful: 45,
      photos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      verified: true,
      tags: ['Crowded', 'Views', 'Skip-the-line']
    },
    {
      id: '4',
      type: 'hotel',
      placeName: 'Grand Hotel Paris',
      location: 'Paris, France',
      rating: 4,
      title: 'Beautiful hotel with minor issues',
      content: 'The hotel is absolutely gorgeous and the location is perfect. However, our room had some maintenance issues - the shower pressure was weak and the air conditioning was noisy. The staff was helpful in trying to resolve these issues, but it did impact our stay slightly.',
      author: 'David Chen',
      authorAvatar: '/placeholder.svg',
      date: '2024-03-03',
      helpful: 12,
      photos: [],
      verified: false,
      tags: ['Maintenance', 'Location', 'Staff']
    },
    {
      id: '5',
      type: 'activity',
      placeName: 'Seine River Cruise',
      location: 'Paris, France',
      rating: 5,
      title: 'Magical evening cruise with dinner',
      content: 'What a wonderful way to see Paris! The evening cruise with dinner was perfectly executed. The food was delicious, the service was excellent, and watching the city lights reflect on the water was magical. Highly recommend for couples or anyone wanting to see Paris from a different perspective.',
      author: 'Emma Wilson',
      authorAvatar: '/placeholder.svg',
      date: '2024-02-28',
      helpful: 31,
      photos: ['/placeholder.svg'],
      verified: true,
      tags: ['Romantic', 'Dinner', 'Views', 'Couples']
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesType = selectedType === 'all' || review.type === selectedType;
    const matchesSearch = review.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };
    
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClasses[size]} ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-800">{review.placeName}</h3>
            {review.verified && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
                ✓ Verified Stay
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{review.location}</span>
          </div>
          <div className="flex items-center gap-2">
            {renderStars(review.rating)}
            <span className="text-sm text-gray-600">({review.rating}/5)</span>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
          <Flag className="w-4 h-4" />
        </button>
      </div>

      <h4 className="font-semibold text-gray-800 mb-3">{review.title}</h4>
      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

      {review.photos.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.photos.slice(0, 3).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Review photo ${index + 1}`}
              className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-90"
            />
          ))}
          {review.photos.length > 3 && (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-600">
              +{review.photos.length - 3}
            </div>
          )}
        </div>
      )}

      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {review.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-3">
          <img
            src={review.authorAvatar}
            alt={review.author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-medium text-gray-800">{review.author}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(review.date)}
            </div>
          </div>
        </div>

        <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
          <ThumbsUp className="w-4 h-4" />
          Helpful ({review.helpful})
        </button>
      </div>
    </div>
  );

  const PlaceDetailView: React.FC<{ place: PlaceInfo }> = ({ place }) => {
    const placeReviews = reviews.filter(review => review.placeName === place.name);
    
    return (
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => setSelectedPlace(null)}
          className="mb-6"
          variant="outline"
        >
          ← Back to All Reviews
        </Button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <img
              src={place.image}
              alt={place.name}
              className="w-full md:w-1/3 h-48 md:h-64 object-cover"
            />
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{place.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{place.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(place.overallRating, 'lg')}
                    <span className="text-lg font-semibold text-gray-800">
                      {place.overallRating}
                    </span>
                    <span className="text-gray-600">({place.totalReviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-800">{place.priceRange}</div>
                  <Button
                    onClick={() => setShowWriteReview(true)}
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Write Review
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {place.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="border-t p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(place.ratingBreakdown).map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{category}</span>
                  <div className="flex items-center gap-2">
                    {renderStars(rating, 'sm')}
                    <span className="text-sm font-medium text-gray-800">{rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews for this place */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Reviews ({placeReviews.length})
          </h2>
          {placeReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    );
  };

  if (selectedPlace) {
    const place = places.find(p => p.id === selectedPlace);
    return place ? <PlaceDetailView place={place} /> : null;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Reviews & Ratings</h1>
        <p className="text-gray-600">
          Read authentic reviews from fellow travelers and share your own experiences.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search places, reviews, or locations..."
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Type Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {reviewTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{type.icon}</span>
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Top Places */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Rated Places</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.id}
              onClick={() => setSelectedPlace(place.id)}
              className="bg-white rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{place.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{place.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {renderStars(place.overallRating)}
                    <span className="text-sm font-medium text-gray-800">
                      {place.overallRating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({place.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Reviews */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Latest Reviews</h2>
          <span className="text-gray-600">{sortedReviews.length} reviews found</span>
        </div>

        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {sortedReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews found matching your criteria.</p>
            <Button
              onClick={() => {
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overall Rating
                  </label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button key={i} className="text-gray-300 hover:text-yellow-400 transition-colors">
                        <Star className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Summarize your experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your experience in detail..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click to upload photos</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Submit Review
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowWriteReview(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};