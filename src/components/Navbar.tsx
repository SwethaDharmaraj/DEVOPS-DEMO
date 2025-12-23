import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Globe,
  User,
  Menu,
  X,
  PlaneTakeoff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
  wishlistCount: number;
  cartCount: number;
  onWishlistClick: () => void;
  onCartClick: () => void;
  currentFeature?: string;
  onFeatureSelect?: (feature: string) => void;
  onHomeClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  onAuthClick,
  onLogout,
  wishlistCount,
  cartCount,
  onWishlistClick,
  onCartClick,
  currentFeature = 'home',
  onFeatureSelect,
  onHomeClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const features = [
    { id: 'home', name: t('nav.home'), icon: '🏠' },
    { id: 'itinerary', name: t('features.itinerary'), icon: '📅' },
    { id: 'destinations', name: t('features.destinations'), icon: '🗺️' },
    { id: 'map', name: t('features.map'), icon: '🗺️' },
    { id: 'currency', name: t('features.currency'), icon: '💱' },
    { id: 'weather', name: t('features.weather'), icon: '☀️' },
    { id: 'blog', name: t('features.blog'), icon: '📝' },
    { id: 'reviews', name: t('features.reviews'), icon: '⭐' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const languageLabel = languages.find(l => l.code === language);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Back Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="w-8 h-8 text-blue-500" />
              <h1 
                className="text-xl font-bold tracking-wide text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={onHomeClick}
              >
                Travel Planner
              </h1>
            </div>
            {currentFeature !== 'home' && onHomeClick && (
              <Button
                onClick={onHomeClick}
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                ← {t('nav.backToHome')}
              </Button>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Features Navigation */}
            <div
              className="relative"
              onMouseEnter={() => setHoverMenu("features")}
              onMouseLeave={() => setHoverMenu(null)}
            >
              <a className="cursor-pointer hover:text-blue-500 transition flex items-center gap-2">
                <span>🎯</span> {t('nav.features')}
              </a>
              {hoverMenu === "features" && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-3 px-5 w-64 max-h-96 overflow-y-auto">
                  <ul className="space-y-2 text-sm">
                    {features.map((feature) => (
                      <li 
                        key={feature.id}
                        className={`hover:text-blue-500 cursor-pointer p-2 rounded flex items-center gap-3 ${
                          currentFeature === feature.id ? 'bg-blue-100 text-blue-600' : ''
                        }`}
                        onClick={() => {
                          if (!isLoggedIn) {
                            onAuthClick();
                            return;
                          }
                          onFeatureSelect?.(feature.id);
                          setHoverMenu(null);
                        }}
                      >
                        <span>{feature.icon}</span>
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Booking shortcuts */}
            <div className="flex items-center gap-6">
              <button className="hover:text-blue-500" onClick={() => onFeatureSelect?.('book:flights')}>{t('nav.flights')}</button>
              <button className="hover:text-blue-500" onClick={() => onFeatureSelect?.('book:cars')}>{t('nav.cars')}</button>
              <button className="hover:text-blue-500" onClick={() => onFeatureSelect?.('destinations')}>{t('nav.travelDestinations')}</button>
              <button className="hover:text-blue-500" onClick={() => onFeatureSelect?.('book:hotels')}>{t('nav.hotels')}</button>
              <button className="hover:text-blue-500" onClick={() => onFeatureSelect?.('book:ships')}>{t('nav.ships')}</button>
            </div>

            {/* Language Selector */}
            <div
              className="relative"
              onMouseEnter={() => setHoverMenu("languages")}
              onMouseLeave={() => setHoverMenu(null)}
            >
              <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                <Globe className="w-4 h-4" />
                <span className="text-sm">
                  {languageLabel?.flag} {languageLabel?.name}
                </span>
              </div>
              {hoverMenu === "languages" && (
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg py-3 px-2 w-48">
                  <ul className="space-y-1 text-sm">
                    {languages.map((lang) => (
                      <li 
                        key={lang.code}
                        className={`hover:bg-blue-50 hover:text-blue-500 cursor-pointer p-2 rounded flex items-center gap-3 ${
                          language === lang.code ? 'bg-blue-100 text-blue-600' : ''
                        }`}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setHoverMenu(null);
                        }}
                      >
                        <span>{lang.flag}</span>
                        {lang.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={onWishlistClick}
              className="relative hover:text-blue-500 transition"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative hover:text-blue-500 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 hover:border-blue-500 hover:text-blue-500 transition"
              >
                <User className="w-4 h-4" /> {t('nav.logout')}
              </button>
            ) : (
              <Button 
                onClick={onAuthClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
              >
                {t('nav.signIn')}
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
