"use client";

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  disabled?: boolean;
}

export function SearchBar({ onSearch, disabled = false }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={cn(
          "flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
          disabled 
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700"
            : "border-gray-300 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        )}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className={cn(
          "px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors",
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
        )}
      >
        Search
      </button>
    </form>
  );
}