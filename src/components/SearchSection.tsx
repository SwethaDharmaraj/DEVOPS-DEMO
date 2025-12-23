import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  budget: string;
  category: string;
  duration: string;
}

interface SearchSectionProps {
  onSearch: (filters: SearchFilters) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const { t } = useLanguage();

  const [filters, setFilters] = useState<SearchFilters>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    budget: '',
    category: '',
    duration: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const budgetRanges = [
    { value: '', label: 'Any Budget' },
    { value: '0-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '5000+', label: '$5,000+' }
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'culture', label: 'Culture' },
    { value: 'nature', label: 'Nature' },
    { value: 'city', label: 'City Break' }
  ];

  const durations = [
    { value: '', label: 'Any Duration' },
    { value: '1-3', label: '1-3 days' },
    { value: '4-7', label: '4-7 days' },
    { value: '8-14', label: '1-2 weeks' },
    { value: '15+', label: '2+ weeks' }
  ];

  return (
    <div className="search-section fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {t('search.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('search.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder={t('search.where')}
              value={filters.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="date"
              placeholder={t('search.checkIn')}
              value={filters.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="date"
              placeholder={t('search.checkOut')}
              value={filters.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <select
              value={filters.guests}
              onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
              className="w-full h-12 pl-10 pr-4 bg-background border border-input rounded-md text-foreground"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">
              {showAdvanced ? t('search.hideAdvanced') : t('search.showAdvanced')}
            </span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-muted/30 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('search.budgetRange')}
              </label>
              <select
                value={filters.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full h-10 px-3 bg-background border border-input rounded-md text-foreground"
              >
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('search.category')}
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full h-10 px-3 bg-background border border-input rounded-md text-foreground"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('search.duration')}
              </label>
              <select
                value={filters.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full h-10 px-3 bg-background border border-input rounded-md text-foreground"
              >
                {durations.map(duration => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSearch}
            className="btn-hero w-full md:w-auto px-12 py-4 text-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            {t('search.searchTrips')}
          </Button>
        </div>
      </div>
    </div>
  );
};