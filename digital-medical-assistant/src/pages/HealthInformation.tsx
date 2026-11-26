import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Filter, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { HealthCategory, HealthTopic } from '../types';
import { HEALTH_TOPICS } from '../data/healthData';
import { HealthCard } from '../components/HealthCard';
import { Disclaimer } from '../components/Disclaimer';

export const HealthInformation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HealthCategory>('all');

  const categories: Array<{ id: HealthCategory; label: string }> = [
    { id: 'all', label: 'All Topics' },
    { id: 'General Health', label: 'General Health' },
    { id: 'Nutrition', label: 'Nutrition' },
    { id: 'Sleep', label: 'Sleep' },
    { id: 'Mental Wellness', label: 'Mental Wellness' },
    { id: 'Common Conditions', label: 'Common Conditions' },
    { id: 'Preventive Care', label: 'Preventive Care' }
  ];

  const filteredTopics = HEALTH_TOPICS.filter((topic) => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      topic.title.toLowerCase().includes(query) ||
      topic.shortDescription.toLowerCase().includes(query) ||
      topic.overview.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Health Information Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Understand Your Health Better
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore evidence-based, medically reviewed educational guides on sleep, nutrition, preventive care, and common everyday conditions.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health topics, nutrition, sleep..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
        </div>

        {/* Category Pills / Segmented Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/90'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Topic Cards */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <HealthCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No matching health guides found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search keywords or select a different category above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Safety Notice */}
      <Disclaimer />

    </div>
  );
};
