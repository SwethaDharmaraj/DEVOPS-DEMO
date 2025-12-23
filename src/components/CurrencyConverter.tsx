import React, { useState, useEffect } from 'react';
import { ArrowUpDown, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

interface ConversionHistory {
  id: string;
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: string;
}

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['USD', 'EUR', 'GBP', 'JPY']);

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' }
  ];

  // Mock exchange rates (in a real app, these would come from an API)
  const mockRates: Record<string, Record<string, number>> = {
    USD: {
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.50,
      AUD: 1.35,
      CAD: 1.25,
      CHF: 0.92,
      CNY: 6.45,
      SEK: 8.60,
      NZD: 1.42,
      MXN: 20.15,
      SGD: 1.35,
      HKD: 7.80,
      NOK: 8.50,
      KRW: 1180.00,
      TRY: 8.50,
      RUB: 75.00,
      INR: 74.50,
      BRL: 5.20,
      ZAR: 14.50
    }
  };

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    if (from === 'USD' && mockRates.USD[to]) {
      return mockRates.USD[to];
    }
    if (to === 'USD' && mockRates.USD[from]) {
      return 1 / mockRates.USD[from];
    }
    // Cross rates through USD
    if (mockRates.USD[from] && mockRates.USD[to]) {
      return mockRates.USD[to] / mockRates.USD[from];
    }
    return 1; // Fallback
  };

  const convertCurrency = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const rate = getExchangeRate(fromCurrency, toCurrency);
      const result = parseFloat(amount) * rate;
      setConvertedAmount(result);
      
      // Add to history
      const newHistoryItem: ConversionHistory = {
        id: Date.now().toString(),
        from: fromCurrency,
        to: toCurrency,
        amount: parseFloat(amount),
        result,
        rate,
        timestamp: new Date().toISOString()
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep last 10
      setLoading(false);
    }, 500);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const addToFavorites = (currencyCode: string) => {
    if (!favorites.includes(currencyCode)) {
      setFavorites([...favorites, currencyCode]);
    }
  };

  const removeFromFavorites = (currencyCode: string) => {
    setFavorites(favorites.filter(code => code !== currencyCode));
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const getCurrencyByCode = (code: string) => {
    return currencies.find(currency => currency.code === code);
  };

  const formatCurrency = (value: number, currencyCode: string) => {
    const currency = getCurrencyByCode(currencyCode);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Currency Converter</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Converter */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Convert Currency</h2>
            
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>

            {/* Currency Selectors */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* From Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={swapCurrencies}
                className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>

            {/* Result */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Converting...</p>
                </div>
              ) : (
                <div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">
                      {amount} {fromCurrency} =
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {formatCurrency(convertedAmount, toCurrency)}
                    </div>
                    <div className="text-sm text-gray-600">
                      1 {fromCurrency} = {getExchangeRate(fromCurrency, toCurrency).toFixed(6)} {toCurrency}
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={convertCurrency}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Convert
            </Button>
          </div>

          {/* Favorite Currencies */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Favorite Currencies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {favorites.map(code => {
                const currency = getCurrencyByCode(code);
                if (!currency) return null;
                return (
                  <div
                    key={code}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setFromCurrency('USD');
                      setToCurrency(code);
                    }}
                  >
                    <div className="text-lg">{currency.flag}</div>
                    <div className="text-sm font-medium">{currency.code}</div>
                    <div className="text-xs text-gray-600">{currency.symbol}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* History and Trends */}
        <div className="space-y-6">
          {/* Exchange Rate Trends */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Exchange Rate Trends
            </h3>
            <div className="space-y-4">
              {['EUR', 'GBP', 'JPY', 'AUD'].map(currency => {
                const rate = getExchangeRate('USD', currency);
                const change = (Math.random() - 0.5) * 0.1; // Mock change
                const changePercent = (change * 100).toFixed(2);
                
                return (
                  <div key={currency} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{getCurrencyByCode(currency)?.flag}</div>
                      <div>
                        <div className="font-medium">USD/{currency}</div>
                        <div className="text-sm text-gray-600">US Dollar to {getCurrencyByCode(currency)?.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{rate.toFixed(4)}</div>
                      <div className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {change >= 0 ? '+' : ''}{changePercent}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conversion History */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Conversions
            </h3>
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No conversion history yet</p>
              ) : (
                history.map(item => (
                  <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {formatCurrency(item.amount, item.from)} → {formatCurrency(item.result, item.to)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Rate: 1 {item.from} = {item.rate.toFixed(6)} {item.to}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {history.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setHistory([])}
                className="w-full mt-4"
              >
                Clear History
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};