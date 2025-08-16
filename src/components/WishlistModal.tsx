import React from 'react';
import { X, Heart, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelPackage } from './TravelCard';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: TravelPackage[];
  onRemoveFromWishlist: (packageId: string) => void;
  onBookNow: (packageId: string) => void;
  currency: string;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onBookNow,
  currency
}) => {
  if (!isOpen) return null;

  const getCurrencySymbol = (curr: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$',
      AUD: 'A$', CHF: 'Fr', CNY: '¥', INR: '₹'
    };
    return symbols[curr] || '$';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-[var(--shadow-float)]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h2 className="text-2xl font-bold text-foreground">
              My Wishlist ({wishlistItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-muted-foreground">
                Start adding destinations you'd love to visit!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="travel-card">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-foreground">
                          {getCurrencySymbol(currency)}{item.price}
                        </div>
                        <div className="text-sm text-muted-foreground">per person</div>
                      </div>
                      <Button
                        onClick={() => onBookNow(item.id)}
                        className="btn-accent"
                        size="sm"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};