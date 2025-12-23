import React from 'react';
import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export interface TravelPackage {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  highlights: string[];
  isWishlisted: boolean;
  bookedTimes?: number;
  category: 'adventure' | 'relaxation' | 'culture' | 'nature' | 'city';
}

interface TravelCardProps {
  package: TravelPackage;
  onWishlistToggle: (packageId: string) => void;
  onBookNow: (packageId: string) => void;
  currency: string;
}

export const TravelCard: React.FC<TravelCardProps> = ({
  package: pkg,
  onWishlistToggle,
  onBookNow,
  currency
}) => {
  const { t } = useLanguage();

  const getCurrencySymbol = (curr: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$',
      AUD: 'A$', CHF: 'Fr', CNY: '¥', INR: '₹'
    };
    return symbols[curr] || '$';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="travel-card fade-in">
      <div className="travel-card-image">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        
        {/* Badge */}
        {pkg.badge && (
          <div className="travel-card-badge">
            {pkg.badge}
          </div>
        )}
        
        {/* Booked times indicator */}
        {pkg.bookedTimes && (
          <div className="absolute top-3 left-3 mt-8 bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {t('card.bookedTimes').replace('{count}', String(pkg.bookedTimes))}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => onWishlistToggle(pkg.id)}
          className="travel-card-heart"
        >
          <Heart
            className={`w-5 h-5 ${
              pkg.isWishlisted
                ? 'text-red-500 fill-current'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      <div className="p-6">
        {/* Location and Duration */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{pkg.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{pkg.duration}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {pkg.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(pkg.rating)}
          </div>
          <span className="text-sm font-medium text-foreground">
            {pkg.rating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({pkg.reviewCount} {t('card.reviews')})
          </span>
        </div>

        {/* Highlights */}
        <div className="space-y-1 mb-4">
          {pkg.highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {getCurrencySymbol(currency)}{pkg.price}
            </div>
            <div className="text-sm text-muted-foreground">{t('card.perPerson')}</div>
          </div>
          <Button
            onClick={() => onBookNow(pkg.id)}
            className="btn-accent"
          >
            {t('booking.bookNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};
