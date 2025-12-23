import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, MapPin, Compass, Award, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Import components
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { SearchSection } from '@/components/SearchSection';
import { TravelCard, TravelPackage } from '@/components/TravelCard';
import { WishlistModal } from '@/components/WishlistModal';
import { BookingModal } from '@/components/BookingModal';
import { VideoModal } from '@/components/VideoModal';
import { Footer } from '@/components/Footer';
import { FeatureNavigation } from '@/components/FeatureNavigation';

// Import new feature components
import { ItineraryPlanner } from '@/components/ItineraryPlanner';
import { DestinationInfo } from '@/components/DestinationInfo';
import { BookingSystem } from '@/components/BookingSystem';
import { InteractiveMap } from '@/components/InteractiveMap';
import { CurrencyConverter } from '@/components/CurrencyConverter';
import { WeatherForecast } from '@/components/WeatherForecast';
import { TravelBlog } from '@/components/TravelBlog';
import { ReviewsAndRatings } from '@/components/ReviewsAndRatings';

// Import data
import { travelPackages, getPackagesByFilters } from '@/data/travelPackages';

// Import hero image
       import heroVideo from '@/assets/hero-travel-video.mp4';


const Index = () => {
  // Initialize from localStorage so redirect after signup lands on main immediately
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('travel_planner_auth'));
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [wishlistItems, setWishlistItems] = useState<TravelPackage[]>([]);
  const [cartItems, setCartItems] = useState<TravelPackage[]>([]);
  const [displayPackages, setDisplayPackages] = useState<TravelPackage[]>(travelPackages);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currentFeature, setCurrentFeature] = useState('home');
  const [initialBookingType, setInitialBookingType] = useState<'flights' | 'hotels' | 'cars' | 'activities' | 'ships'>('flights');
  const [userName, setUserName] = useState<string | null>(null);
  const { toast } = useToast();

  // Check login status on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('travel_planner_auth');
    if (savedAuth) {
      setIsLoggedIn(true);
      // Load user name for greeting
      const rawUser = localStorage.getItem('travel_planner_user');
      if (rawUser) {
        try {
          const u = JSON.parse(rawUser);
          const name = [u.firstName, u.lastName].filter(Boolean).join(' ').trim();
          setUserName(name || null);
        } catch {}
      }
    }
    
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('travel_planner_wishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      const wishlistPackages = travelPackages.filter(pkg => wishlistIds.includes(pkg.id));
      setWishlistItems(wishlistPackages);
      
      // Update isWishlisted property in packages
      setDisplayPackages(prevPackages =>
        prevPackages.map(pkg => ({
          ...pkg,
          isWishlisted: wishlistIds.includes(pkg.id)
        }))
      );
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('travel_planner_auth', 'true');

    // Load and store user name for greeting when logging in from this page
    const rawUser = localStorage.getItem('travel_planner_user');
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        const name = [u.firstName, u.lastName].filter(Boolean).join(' ').trim();
        setUserName(name || null);
      } catch {}
    }
    // If user landed here somehow without router redirect, stay; Welcome page already routes to /app.
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('travel_planner_auth');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  const handleWishlistToggle = (packageId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to add items to your wishlist.",
        variant: "destructive"
      });
      setShowAuthModal(true);
      return;
    }

    const packageToToggle = travelPackages.find(pkg => pkg.id === packageId);
    if (!packageToToggle) return;

    const isCurrentlyWishlisted = wishlistItems.some(item => item.id === packageId);
    
    let newWishlistItems: TravelPackage[];
    
    if (isCurrentlyWishlisted) {
      // Remove from wishlist
      newWishlistItems = wishlistItems.filter(item => item.id !== packageId);
      toast({
        title: "Removed from wishlist",
        description: `${packageToToggle.title} removed from your wishlist.`
      });
    } else {
      // Add to wishlist
      newWishlistItems = [...wishlistItems, { ...packageToToggle, isWishlisted: true }];
      toast({
        title: "Added to wishlist",
        description: `${packageToToggle.title} added to your wishlist.`
      });
    }
    
    setWishlistItems(newWishlistItems);
    
    // Update localStorage
    const wishlistIds = newWishlistItems.map(item => item.id);
    localStorage.setItem('travel_planner_wishlist', JSON.stringify(wishlistIds));
    
    // Update display packages
    setDisplayPackages(prevPackages =>
      prevPackages.map(pkg => ({
        ...pkg,
        isWishlisted: wishlistIds.includes(pkg.id)
      }))
    );
  };

  const handleBookNow = (packageId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to book a trip.",
        variant: "destructive"
      });
      setShowAuthModal(true);
      return;
    }

    const packageToBook = travelPackages.find(pkg => pkg.id === packageId);
    if (packageToBook) {
      setSelectedPackage(packageToBook);
      setShowBookingModal(true);
    }
  };

  const handleSearch = (filters: any) => {
    const filteredPackages = getPackagesByFilters(filters);
    setDisplayPackages(filteredPackages.map(pkg => ({
      ...pkg,
      isWishlisted: wishlistItems.some(item => item.id === pkg.id)
    })));
    
    toast({
      title: "Search completed",
      description: `Found ${filteredPackages.length} travel packages.`
    });
  };

  const { t } = useLanguage();

  const stats = [
    { icon: Compass, label: t('stats.destinations'), value: '150+' },
    { icon: Users, label: t('stats.happyTravelers'), value: '50K+' },
    { icon: Award, label: t('stats.awards'), value: '25+' },
    { icon: Star, label: t('stats.avgRating'), value: '4.8' }
  ];

  const handleFeatureSelect = (feature: string) => {
    if (feature.startsWith('book:')) {
      const type = feature.split(':')[1] as 'flights' | 'hotels' | 'cars' | 'activities' | 'ships';
      setInitialBookingType(type);
      setCurrentFeature('book');
    } else {
      setCurrentFeature(feature);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentFeature = () => {
    switch (currentFeature) {
      case 'itinerary':
        return <ItineraryPlanner />;
      case 'destinations':
        return <DestinationInfo />;
      case 'map':
        return <InteractiveMap />;
      case 'currency':
        return <CurrencyConverter />;
      case 'weather':
        return <WeatherForecast />;
      case 'blog':
        return <TravelBlog />;
      case 'reviews':
        return <ReviewsAndRatings />;
      case 'book':
        return (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BookingSystem initialType={initialBookingType} />
            </div>
          </section>
        );
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in">
          {/* Greeting when logged in */}
          {userName && (
            <div className="mb-4 text-white text-xl font-semibold text-center">
              WELCOME {userName.toUpperCase()}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.title.line1')}
            <span className="block bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              {t('home.title.line2')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          <div className="flex justify-center">
            <Button 
              className="btn-hero"
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('home.startPlanning')}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Feature Access */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.toolsTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.toolsSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { id: 'itinerary', name: 'Itinerary Planner', icon: '📅', description: 'Plan your trip day by day' },
              { id: 'destinations', name: 'Destinations Guide', icon: '🗺️', description: 'Explore amazing destinations' },
              { id: 'weather', name: 'Weather Forecast', icon: '☀️', description: 'Check destination weather' },
              { id: 'currency', name: 'Currency Converter', icon: '💱', description: 'Convert currencies easily' }
            ].map((feature) => (
              <div
                key={feature.id}
                onClick={() => handleFeatureSelect(feature.id)}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchSection onSearch={handleSearch} />
        </div>
      </section>

      {/* Travel Packages */}
      <section className="py-16 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.popularDestinations')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.popularSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayPackages.map((pkg) => (
              <TravelCard
                key={pkg.id}
                package={pkg}
                onWishlistToggle={handleWishlistToggle}
                onBookNow={handleBookNow}
                currency={selectedCurrency}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Attractions Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Top Attractions Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the most popular tourist attractions and hidden gems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-semibold mb-4">Historical Tours</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Ancient Pyramids of Egypt</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Roman Colosseum</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Great Wall of China</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-semibold mb-4">Adventure Experiences</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Himalayan Trekking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>African Safari</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Scuba Diving</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-semibold mb-4">Cultural Immersion</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Japanese Tea Ceremony</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Moroccan Cooking Class</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Flamenco in Spain</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <Navbar
          isLoggedIn={isLoggedIn}
          onAuthClick={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          wishlistCount={wishlistItems.length}
          cartCount={cartItems.length}
          onWishlistClick={() => setShowWishlistModal(true)}
          onCartClick={() => {}}
          currentFeature={currentFeature}
          onFeatureSelect={handleFeatureSelect}
          onHomeClick={() => setCurrentFeature('home')}
        />

        {/* Locked overlay content */}
        <div className="flex items-center justify-center py-24 px-6">
          <div className="max-w-xl w-full text-center bg-white/80 backdrop-blur-md border rounded-2xl p-10 shadow-xl">
            <h2 className="text-3xl font-bold mb-3">Sign in to continue</h2>
            <p className="text-muted-foreground mb-6">
              Please login to search destinations and access all travel features.
            </p>
            <div className="flex justify-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
              <Button variant="outline" onClick={() => setShowAuthModal(true)}>
                Create Account
              </Button>
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        wishlistCount={wishlistItems.length}
        cartCount={cartItems.length}
        onWishlistClick={() => setShowWishlistModal(true)}
        onCartClick={() => {}}
        currentFeature={currentFeature}
        onFeatureSelect={handleFeatureSelect}
        onHomeClick={() => setCurrentFeature('home')}
      />

      {/* Feature Navigation - Mobile Only */}
      <FeatureNavigation
        onFeatureSelect={handleFeatureSelect}
        currentFeature={currentFeature}
      />

      {/* Dynamic Content */}
      <div className="min-h-screen">
        {renderCurrentFeature()}
        
        {/* Footer - only show on home page */}
        {currentFeature === 'home' && <Footer />}
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      <WishlistModal
        isOpen={showWishlistModal}
        onClose={() => setShowWishlistModal(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleWishlistToggle}
        onBookNow={handleBookNow}
        currency={selectedCurrency}
      />

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        package={selectedPackage}
        currency={selectedCurrency}
      />

      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </div>
  );
};

export default Index;
