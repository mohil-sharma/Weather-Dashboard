import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { debounce } from '../utils/helpers';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Debounce search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length > 2) {
        onSearch(searchTerm);
      }
    }, 500),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;