import React, { useState, useEffect } from 'react';
import { Search, Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherData {
  city: string;
  country: string;
  current: {
    temperature: number;
    feels_like: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    uvIndex: number;
    pressure: number;
  };
  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  daily: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
  }>;
}

interface PopularDestination {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
}

export const WeatherForecast: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Paris');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  const popularDestinations: PopularDestination[] = [
    { city: 'Paris', country: 'France', temperature: 18, condition: 'Partly Cloudy', icon: '⛅' },
    { city: 'Tokyo', country: 'Japan', temperature: 24, condition: 'Clear', icon: '☀️' },
    { city: 'New York', country: 'USA', temperature: 20, condition: 'Sunny', icon: '☀️' },
    { city: 'London', country: 'UK', temperature: 15, condition: 'Cloudy', icon: '☁️' },
    { city: 'Dubai', country: 'UAE', temperature: 35, condition: 'Hot', icon: '🌞' },
    { city: 'Bali', country: 'Indonesia', temperature: 30, condition: 'Sunny', icon: '☀️' },
    { city: 'Sydney', country: 'Australia', temperature: 23, condition: 'Clear', icon: '☀️' },
    { city: 'Mumbai', country: 'India', temperature: 32, condition: 'Humid', icon: '🌤️' },
    { city: 'Bangkok', country: 'Thailand', temperature: 33, condition: 'Hot', icon: '🌞' },
    { city: 'Singapore', country: 'Singapore', temperature: 31, condition: 'Humid', icon: '🌤️' },
    { city: 'Barcelona', country: 'Spain', temperature: 22, condition: 'Pleasant', icon: '⛅' },
    { city: 'Amsterdam', country: 'Netherlands', temperature: 16, condition: 'Cool', icon: '☁️' }
  ];

  // Mock weather data generator with realistic data based on city
  const generateMockWeather = (city: string): WeatherData => {
    const cityLower = city.toLowerCase();
    
    // Base temperature based on common knowledge of cities/regions
    let baseTemp = 22; // Default moderate temperature
    let country = 'Unknown';
    
    // Set realistic temperatures and countries based on city names
    const cityData: { [key: string]: { temp: number; country: string; condition: string; icon: string } } = {
      'paris': { temp: 18, country: 'France', condition: 'Partly Cloudy', icon: '⛅' },
      'london': { temp: 15, country: 'UK', condition: 'Cloudy', icon: '☁️' },
      'tokyo': { temp: 24, country: 'Japan', condition: 'Clear', icon: '☀️' },
      'new york': { temp: 20, country: 'USA', condition: 'Sunny', icon: '☀️' },
      'dubai': { temp: 35, country: 'UAE', condition: 'Hot', icon: '🌞' },
      'bali': { temp: 30, country: 'Indonesia', condition: 'Sunny', icon: '☀️' },
      'sydney': { temp: 23, country: 'Australia', condition: 'Clear', icon: '☀️' },
      'mumbai': { temp: 32, country: 'India', condition: 'Humid', icon: '🌤️' },
      'delhi': { temp: 28, country: 'India', condition: 'Hazy', icon: '🌫️' },
      'singapore': { temp: 31, country: 'Singapore', condition: 'Humid', icon: '🌤️' },
      'bangkok': { temp: 33, country: 'Thailand', condition: 'Hot', icon: '🌞' },
      'rome': { temp: 25, country: 'Italy', condition: 'Sunny', icon: '☀️' },
      'barcelona': { temp: 22, country: 'Spain', condition: 'Pleasant', icon: '⛅' },
      'amsterdam': { temp: 16, country: 'Netherlands', condition: 'Cool', icon: '☁️' },
      'istanbul': { temp: 21, country: 'Turkey', condition: 'Mild', icon: '⛅' }
    };

    // Check if city matches known data
    const knownCity = Object.keys(cityData).find(key => 
      cityLower.includes(key) || key.includes(cityLower)
    );

    if (knownCity) {
      const data = cityData[knownCity];
      baseTemp = data.temp;
      country = data.country;
    } else {
      // Generate reasonable temperature based on city name hints
      if (cityLower.includes('ice') || cityLower.includes('snow') || cityLower.includes('arctic')) {
        baseTemp = Math.floor(Math.random() * 10) - 5; // -5 to 5°C
        country = 'Cold Region';
      } else if (cityLower.includes('desert') || cityLower.includes('hot') || cityLower.includes('tropical')) {
        baseTemp = Math.floor(Math.random() * 15) + 30; // 30-45°C
        country = 'Hot Region';
      } else {
        baseTemp = Math.floor(Math.random() * 20) + 15; // 15-35°C
        country = 'Moderate Region';
      }
    }

    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
    const icons = ['☀️', '⛅', '☁️', '🌧️', '🌤️'];
    
    const currentCondition = knownCity ? cityData[knownCity].condition : conditions[Math.floor(Math.random() * conditions.length)];
    const currentIcon = knownCity ? cityData[knownCity].icon : icons[Math.floor(Math.random() * icons.length)];

    return {
      city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
      country: country,
      current: {
        temperature: baseTemp,
        feels_like: baseTemp + Math.floor(Math.random() * 4) - 2,
        condition: currentCondition,
        icon: currentIcon,
        humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
        windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
        visibility: Math.floor(Math.random() * 5) + 8, // 8-13 km
        uvIndex: Math.floor(Math.random() * 8) + 1, // 1-8
        pressure: Math.floor(Math.random() * 30) + 1005 // 1005-1035 hPa
      },
      hourly: Array.from({ length: 24 }, (_, i) => ({
        time: `${String(i).padStart(2, '0')}:00`,
        temperature: baseTemp + Math.floor(Math.random() * 8) - 4, // ±4°C variation
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        icon: icons[Math.floor(Math.random() * icons.length)],
        precipitation: Math.floor(Math.random() * 40) // 0-40% chance
      })),
      daily: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dayHigh = baseTemp + Math.floor(Math.random() * 6) + 1; // +1 to +7°C
        const dayLow = baseTemp - Math.floor(Math.random() * 6) - 1; // -1 to -7°C
        
        return {
          date: date.toISOString().split('T')[0],
          high: Math.max(dayHigh, dayLow + 5), // Ensure high > low
          low: Math.min(dayLow, dayHigh - 5), // Ensure low < high
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          icon: icons[Math.floor(Math.random() * icons.length)],
          precipitation: Math.floor(Math.random() * 60), // 0-60% chance
          humidity: Math.floor(Math.random() * 25) + 55 // 55-80%
        };
      })
    };
  };



  useEffect(() => {
    // Load initial weather data for Paris
    setLoading(true);
    setTimeout(() => {
      const data = generateMockWeather(selectedCity);
      setWeatherData(data);
      setLoading(false);
    }, 800);
  }, []);

  const convertTemperature = (temp: number) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  const getTemperatureUnit = () => unit === 'celsius' ? '°C' : '°F';

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const cityName = searchQuery.trim();
      setSelectedCity(cityName);
      setLoading(true);
      
      // Generate immediate mock weather data
      setTimeout(() => {
        const data = generateMockWeather(cityName);
        setWeatherData(data);
        setLoading(false);
      }, 800);
      
      setSearchQuery('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getUVIndexColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'text-green-600';
    if (uvIndex <= 5) return 'text-yellow-600';
    if (uvIndex <= 7) return 'text-orange-600';
    return 'text-red-600';
  };

  const getUVIndexLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    return 'Very High';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Weather Forecast</h1>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter any city name (e.g., Paris, Tokyo, Mumbai)..."
            />
          </div>
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setUnit('celsius')}
              className={`px-4 py-2 text-sm font-medium ${
                unit === 'celsius' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('fahrenheit')}
              className={`px-4 py-2 text-sm font-medium ${
                unit === 'fahrenheit' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {popularDestinations.map((dest) => (
            <button
              key={`${dest.city}-${dest.country}`}
              onClick={() => {
                setSelectedCity(dest.city);
                setLoading(true);
                setTimeout(() => {
                  const data = generateMockWeather(dest.city);
                  setWeatherData(data);
                  setLoading(false);
                }, 500);
              }}
              className={`p-3 rounded-lg border transition-colors ${
                selectedCity === dest.city
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-1">{dest.icon}</div>
              <div className="text-sm font-medium text-gray-800">{dest.city}</div>
              <div className="text-xs text-gray-600">{convertTemperature(dest.temperature)}{getTemperatureUnit()}</div>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading weather data...</p>
          </div>
        </div>
      ) : weatherData ? (
        <div className="space-y-8">
          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">{weatherData.city}</h2>
                <p className="text-blue-100">{weatherData.country}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">
                  {convertTemperature(weatherData.current.temperature)}{getTemperatureUnit()}
                </div>
                <p className="text-blue-100">
                  Feels like {convertTemperature(weatherData.current.feels_like)}{getTemperatureUnit()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{weatherData.current.icon}</div>
                <div>
                  <p className="text-xl font-semibold">{weatherData.current.condition}</p>
                  <p className="text-blue-100">Current conditions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span>{weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  <span>{weatherData.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{weatherData.current.visibility} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <span className={getUVIndexColor(weatherData.current.uvIndex)}>
                    UV {weatherData.current.uvIndex}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              24-Hour Forecast
            </h3>
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {weatherData.hourly.slice(0, 12).map((hour, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
                    <div className="text-2xl mb-2">{hour.icon}</div>
                    <div className="font-semibold text-gray-800">
                      {convertTemperature(hour.temperature)}{getTemperatureUnit()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{hour.precipitation}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              7-Day Forecast
            </h3>
            <div className="space-y-3">
              {weatherData.daily.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-gray-600">
                      {index === 0 ? 'Today' : formatDate(day.date)}
                    </div>
                    <div className="text-2xl">{day.icon}</div>
                    <div className="text-sm text-gray-800">{day.condition}</div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Droplets className="w-4 h-4" />
                      <span>{day.precipitation}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center">💧</div>
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {convertTemperature(day.high)}{getTemperatureUnit()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {convertTemperature(day.low)}{getTemperatureUnit()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-6 h-6 text-red-500" />
                <h4 className="font-semibold text-gray-800">Temperature</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current</span>
                  <span className="font-semibold">
                    {convertTemperature(weatherData.current.temperature)}{getTemperatureUnit()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Feels like</span>
                  <span className="font-semibold">
                    {convertTemperature(weatherData.current.feels_like)}{getTemperatureUnit()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wind className="w-6 h-6 text-blue-500" />
                <h4 className="font-semibold text-gray-800">Wind</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Speed</span>
                  <span className="font-semibold">{weatherData.current.windSpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Direction</span>
                  <span className="font-semibold">NE</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-6 h-6 text-green-500" />
                <h4 className="font-semibold text-gray-800">Humidity</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current</span>
                  <span className="font-semibold">{weatherData.current.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pressure</span>
                  <span className="font-semibold">{weatherData.current.pressure} hPa</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-6 h-6 text-yellow-500" />
                <h4 className="font-semibold text-gray-800">UV Index</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Index</span>
                  <span className={`font-semibold ${getUVIndexColor(weatherData.current.uvIndex)}`}>
                    {weatherData.current.uvIndex}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-semibold">{getUVIndexLevel(weatherData.current.uvIndex)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};