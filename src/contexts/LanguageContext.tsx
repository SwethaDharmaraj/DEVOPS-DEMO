import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type LanguageCode = 'en' | 'hi' | 'ta';

type Dictionary = Record<string, string>;

type Translations = Record<LanguageCode, Dictionary>;

const translations: Translations = {
  en: {
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.destinations': 'Destinations',
    'nav.flights': 'Flights',
    'nav.hotels': 'Hotels',
    'nav.cars': 'Car Rental',
    'nav.ships': 'Ships',
    'nav.travelDestinations': 'Travel Destinations',
    'nav.signIn': 'Sign In',
    'nav.logout': 'Logout',
    'nav.backToHome': 'Back to Home',

    'features.itinerary': 'Itinerary Planner',
    'features.destinations': 'Destination Info',
    'features.map': 'Interactive Map',
    'features.currency': 'Currency Converter',
    'features.weather': 'Weather Forecast',
    'features.blog': 'Travel Blog',
    'features.reviews': 'Reviews & Ratings',

    'home.title.line1': 'Discover Your Next',
    'home.title.line2': 'Adventure',
    'home.subtitle': 'Explore breathtaking destinations, create unforgettable memories, and embark on the journey of a lifetime with our expertly curated travel experiences.',
    'home.startPlanning': 'Start Planning',
    'home.toolsTitle': 'Explore Our Travel Tools',
    'home.toolsSubtitle': 'Use our comprehensive suite of travel planning tools to create the perfect trip',
    'home.popularDestinations': 'Popular Destinations',
    'home.popularSubtitle': 'Handpicked travel experiences from around the world, designed to create lasting memories',

    'stats.destinations': 'Destinations',
    'stats.happyTravelers': 'Happy Travelers',
    'stats.awards': 'Awards Won',
    'stats.avgRating': 'Average Rating',

    'card.perPerson': 'per person',
    'card.reviews': 'reviews',
    'card.bookedTimes': 'Booked {count} times yesterday',

    'search.title': 'Find Your Perfect Trip',
    'search.subtitle': 'Discover amazing destinations and create unforgettable memories',
    'search.where': 'Where do you want to go?',
    'search.checkIn': 'Check-in',
    'search.checkOut': 'Check-out',
    'search.guests': 'Guests',
    'search.showAdvanced': 'Show Advanced Filters',
    'search.hideAdvanced': 'Hide Advanced Filters',
    'search.budgetRange': 'Budget Range',
    'search.category': 'Category',
    'search.duration': 'Duration',
    'search.searchTrips': 'Search Trips',

    'booking.title': 'Book Your Travel',
    'booking.from': 'From',
    'booking.to': 'To',
    'booking.departure': 'Departure',
    'booking.checkIn': 'Check-in',
    'booking.checkOut': 'Check-out',
    'booking.passengers': 'Passengers',
    'booking.search': 'Search',
    'booking.resultsFound': 'results found',
    'booking.sortedBy': 'Sorted by',
    'booking.price': 'Price',
    'booking.rating': 'Rating',
    'booking.popularity': 'Popularity',
    'booking.bookNow': 'Book Now',

    'reviews.backToAll': '← Back to All Reviews',
    'reviews.writeReview': 'Write Review',
    'booking.confirmed': 'Booking Confirmed',
    'booking.downloadReceipt': 'Download Receipt',
    'booking.leaveReview': 'Leave a review',
    'booking.yourRating': 'Your rating',
    'booking.yourReview': 'Your review',
    'booking.submitReview': 'Submit Review',
  },
  hi: {
    'nav.home': 'होम',
    'nav.features': 'विशेषताएँ',
    'nav.destinations': 'गंतव्य',
    'nav.flights': 'उड़ानें',
    'nav.hotels': 'होटल',
    'nav.cars': 'कार किराया',
    'nav.ships': 'जहाज़',
    'nav.travelDestinations': 'यात्रा गंतव्य',
    'nav.signIn': 'साइन इन',
    'nav.logout': 'लॉगआउट',
    'nav.backToHome': 'होम पर वापस',

    'features.itinerary': 'यात्रा योजना',
    'features.destinations': 'गंतव्य जानकारी',
    'features.map': 'इंटरैक्टिव मानचित्र',
    'features.currency': 'मुद्रा परिवर्तक',
    'features.weather': 'मौसम पूर्वानुमान',
    'features.blog': 'ट्रैवल ब्लॉग',
    'features.reviews': 'समीक्षाएँ और रेटिंग',

    'home.title.line1': 'अपनी अगली',
    'home.title.line2': 'रोमांचक यात्रा खोजें',
    'home.subtitle': 'शानदार गंतव्य खोजें, अविस्मरणीय यादें बनाएं और विशेषज्ञ रूप से क्यूरेटेड अनुभवों के साथ यात्रा शुरू करें।',
    'home.startPlanning': 'शुरू करें',
    'home.toolsTitle': 'हमारे ट्रैवल टूल्स देखें',
    'home.toolsSubtitle': 'सही यात्रा बनाने के लिए हमारे व्यापक टूल्स का उपयोग करें',
    'home.popularDestinations': 'लोकप्रिय गंतव्य',
    'home.popularSubtitle': 'दुनिया भर के चयनित अनुभव, जो यादगार पल बनाते हैं',

    'stats.destinations': 'गंतव्य',
    'stats.happyTravelers': 'खुश यात्री',
    'stats.awards': 'पुरस्कार',
    'stats.avgRating': 'औसत रेटिंग',

    'card.perPerson': 'प्रति व्यक्ति',
    'card.reviews': 'समीक्षाएँ',
    'card.bookedTimes': 'कल {count} बार बुक किया गया',

    'search.title': 'अपनी परफेक्ट यात्रा खोजें',
    'search.subtitle': 'शानदार गंतव्य खोजें और अविस्मरणीय यादें बनाएं',
    'search.where': 'आप कहाँ जाना चाहते हैं?',
    'search.checkIn': 'चेक-इन',
    'search.checkOut': 'चेक-आउट',
    'search.guests': 'मेहमान',
    'search.showAdvanced': 'उन्नत फ़िल्टर दिखाएँ',
    'search.hideAdvanced': 'उन्नत फ़िल्टर छिपाएँ',
    'search.budgetRange': 'बजट सीमा',
    'search.category': 'श्रेणी',
    'search.duration': 'अवधि',
    'search.searchTrips': 'यात्राएँ खोजें',

    'booking.title': 'अपनी यात्रा बुक करें',
    'booking.from': 'कहाँ से',
    'booking.to': 'कहाँ तक',
    'booking.departure': 'प्रस्थान',
    'booking.checkIn': 'चेक-इन',
    'booking.checkOut': 'चेक-आउट',
    'booking.passengers': 'यात्री',
    'booking.search': 'खोजें',
    'booking.resultsFound': 'परिणाम मिले',
    'booking.sortedBy': 'क्रमबद्ध',
    'booking.price': 'कीमत',
    'booking.rating': 'रेटिंग',
    'booking.popularity': 'लोकप्रियता',
    'booking.bookNow': 'अभी बुक करें',

    'reviews.backToAll': '← सभी समीक्षाओं पर वापस',
    'reviews.writeReview': 'समीक्षा लिखें',
    'booking.confirmed': 'बुकिंग पुष्टि हुई',
    'booking.downloadReceipt': 'रसीद डाउनलोड करें',
    'booking.leaveReview': 'समीक्षा दें',
    'booking.yourRating': 'आपकी रेटिंग',
    'booking.yourReview': 'आपकी समीक्षा',
    'booking.submitReview': 'समीक्षा सबमिट करें',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.features': 'அம்சங்கள்',
    'nav.destinations': 'சுற்றுலா இடங்கள்',
    'nav.flights': 'விமானங்கள்',
    'nav.hotels': 'ஹோட்டல்கள்',
    'nav.cars': 'கார் வாடகம்',
    'nav.ships': 'கப்பல்கள்',
    'nav.travelDestinations': 'பயண இடங்கள்',
    'nav.signIn': 'உள்நுழை',
    'nav.logout': 'வெளியேறு',
    'nav.backToHome': 'முகப்புக்கு திரும்ப',

    'features.itinerary': 'பயணத் திட்டம்',
    'features.destinations': 'இடத் தகவல்',
    'features.map': 'இணைய வரைபடம்',
    'features.currency': 'நாணய மாற்றி',
    'features.weather': 'வானிலை முன்னறிவிப்பு',
    'features.blog': 'பயண வலைப்பதிவு',
    'features.reviews': 'விமர்சனங்கள் & மதிப்பீடு',

    'home.title.line1': 'உங்கள் அடுத்த',
    'home.title.line2': 'சாகசத்தை கண்டறியுங்கள்',
    'home.subtitle': 'அற்புதமான இடங்களை கண்டுபிடித்து, மறக்க முடியாத நினைவுகளை உருவாக்கி, நிபுணர்களால் தேர்ந்தெடுக்கப்பட்ட அனுபவங்களுடன் பயணம் தொடங்குங்கள்.',
    'home.startPlanning': 'தொடங்கவும்',
    'home.toolsTitle': 'எங்கள் பயண கருவிகள்',
    'home.toolsSubtitle': 'சரியான பயணத்தை வடிவமைக்க எங்கள் கருவிகளைப் பயன்படுத்துங்கள்',
    'home.popularDestinations': 'பிரபலமான இடங்கள்',
    'home.popularSubtitle': 'உலகம் முழுவதும் தேர்ந்தெடுக்கப்பட்ட அனுபவங்கள், நினைவுகளை உருவாக்க',

    'stats.destinations': 'இடங்கள்',
    'stats.happyTravelers': 'மகிழ்ச்சியான பயணிகள்',
    'stats.awards': 'விருதுகள்',
    'stats.avgRating': 'சராசரி மதிப்பீடு',

    'card.perPerson': 'ஒரு நபருக்கு',
    'card.reviews': 'விமர்சனங்கள்',
    'card.bookedTimes': 'நேற்று {count} முறை பதிவு செய்யப்பட்டது',

    'search.title': 'உங்கள் சரியான பயணத்தைத் தேடுங்கள்',
    'search.subtitle': 'அற்புதமான இடங்களை கண்டுபிடித்து மறக்க முடியாத நினைவுகளை உருவாக்குங்கள்',
    'search.where': 'நீங்கள் எங்கு செல்ல விரும்புகிறீர்கள்?',
    'search.checkIn': 'செக்-இன்',
    'search.checkOut': 'செக்-அவுட்',
    'search.guests': 'விருந்தினர்கள்',
    'search.showAdvanced': 'மேம்பட்ட வடிகட்டிகளை காட்டு',
    'search.hideAdvanced': 'மேம்பட்ட வடிகட்டிகளை மறை',
    'search.budgetRange': 'பட்ஜெட் வரம்பு',
    'search.category': 'வகை',
    'search.duration': 'காலம்',
    'search.searchTrips': 'பயணங்களைத் தேடுங்கள்',

    'booking.title': 'உங்கள் பயணத்தை புக் செய்யவும்',
    'booking.from': 'இருந்து',
    'booking.to': 'வரை',
    'booking.departure': 'புறப்படும் தேதி',
    'booking.checkIn': 'செக்-இன்',
    'booking.checkOut': 'செக்-அவுட்',
    'booking.passengers': 'பயணிகள்',
    'booking.search': 'தேடு',
    'booking.resultsFound': 'முடிவுகள் கிடைத்தன',
    'booking.sortedBy': 'வரிசைப்படுத்தல்',
    'booking.price': 'விலை',
    'booking.rating': 'மதிப்பீடு',
    'booking.popularity': 'பிரபலத்தன்மை',
    'booking.bookNow': 'இப்போது புக் செய்யவும்',

    'reviews.backToAll': '← அனைத்து விமர்சனங்களுக்கும் திரும்ப',
    'reviews.writeReview': 'விமர்சனம் எழுதுக',
    'booking.confirmed': 'பதிவு உறுதி செய்யப்பட்டது',
    'booking.downloadReceipt': 'ரசீதை பதிவிறக்கவும்',
    'booking.leaveReview': 'விமர்சனம் விடுக',
    'booking.yourRating': 'உங்கள் மதிப்பீடு',
    'booking.yourReview': 'உங்கள் விமர்சனம்',
    'booking.submitReview': 'விமர்சனம் சமர்ப்பிக்கவும்',
  },
};

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('travel_planner_lang') as LanguageCode | null;
    return stored || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('travel_planner_lang', lang);
  };

  useEffect(() => {
    // could integrate with html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (key: string) => dict[key] || translations.en[key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};