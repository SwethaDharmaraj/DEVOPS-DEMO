import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Plane, 
  DollarSign, 
  Cloud, 
  BookOpen, 
  Star, 
  Map,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeatureNavigationProps {
  onFeatureSelect: (feature: string) => void;
  currentFeature: string;
}

export const FeatureNavigation: React.FC<FeatureNavigationProps> = ({ 
  onFeatureSelect, 
  currentFeature 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      id: 'home',
      name: 'Home',
      icon: '🏠',
      IconComponent: MapPin,
      description: 'Main dashboard with travel packages and overview'
    },
    {
      id: 'itinerary',
      name: 'Itinerary Planner',
      icon: '📅',
      IconComponent: Calendar,
      description: 'Create and manage detailed travel itineraries'
    },
    {
      id: 'destinations',
      name: 'Destination Info',
      icon: '🗺️',
      IconComponent: MapPin,
      description: 'Comprehensive destination guides and information'
    },
    {
      id: 'map',
      name: 'Interactive Map',
      icon: '🗺️',
      IconComponent: Map,
      description: 'Explore locations and plan routes on interactive maps'
    },
    {
      id: 'currency',
      name: 'Currency Converter',
      icon: '💱',
      IconComponent: DollarSign,
      description: 'Convert currencies and track exchange rates'
    },
    {
      id: 'weather',
      name: 'Weather Forecast',
      icon: '☀️',
      IconComponent: Cloud,
      description: 'Check weather conditions for your destinations'
    },
    {
      id: 'blog',
      name: 'Travel Blog',
      icon: '📝',
      IconComponent: BookOpen,
      description: 'Read and share travel stories and tips'
    },
    {
      id: 'reviews',
      name: 'Reviews & Ratings',
      icon: '⭐',
      IconComponent: Star,
      description: 'Read and write reviews for hotels, restaurants, and attractions'
    }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-24 left-4 z-50">
        <Button
          onClick={toggleMenu}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <Calendar className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-80 h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Travel Features</h2>
                <Button
                  onClick={toggleMenu}
                  variant="outline"
                  size="sm"
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => {
                      onFeatureSelect(feature.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      currentFeature === feature.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="font-semibold text-gray-800">{feature.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">{feature.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 lg:ml-80">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Travel Planner</span>
          <span>/</span>
          <span className="font-medium text-gray-800">
            {features.find(f => f.id === currentFeature)?.name || 'Home'}
          </span>
        </div>
      </div>
    </>
  );
};