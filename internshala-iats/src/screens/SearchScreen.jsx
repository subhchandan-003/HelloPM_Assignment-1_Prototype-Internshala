import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allListings } from '../data/mockData';
import ResponseRateBadge from '../components/ResponseRateBadge';

const typeFilters = ['All', 'Remote', 'On-site', 'Hybrid'];
const stipendFilters = ['Any', '₹5k+', '₹8k+', '₹10k+', '₹12k+'];

const stipendMin = { 'Any': 0, '₹5k+': 5000, '₹8k+': 8000, '₹10k+': 10000, '₹12k+': 12000 };

function parseStipend(s) {
  const n = parseInt(s.replace(/[^\d]/g, ''));
  return isNaN(n) ? 0 : n;
}

export default function SearchScreen({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [stipendFilter, setStipendFilter] = useState('Any');
  const [focused, setFocused] = useState(false);

  const filtered = allListings.filter((l) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q || l.role.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.location.toLowerCase().includes(q);
    const matchesType = typeFilter === 'All' || l.type === typeFilter;
    const matchesStipend = parseStipend(l.stipend) >= stipendMin[stipendFilter];
    return matchesQuery && matchesType && matchesStipend;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 border-b border-border-subtle px-4 pt-4 pb-3">
        <h1 className="text-[18px] font-semibold text-text-primary mb-3">Search Internships</h1>

        {/* Search bar */}
        <motion.div
          animate={{ boxShadow: focused ? '0 0 0 2px rgba(0,165,236,0.25)' : '0 0 0 1px #E5E7EB' }}
          className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 mb-3"
        >
          <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search roles, companies, skills..."
            className="flex-1 text-[14px] text-text-primary placeholder:text-text-muted bg-transparent outline-none"
          />
          {query && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuery('')}
              className="text-text-muted hover:text-text-primary cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </motion.div>

        {/* Type filter chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {typeFilters.map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTypeFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
                typeFilter === f
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {f}
            </motion.button>
          ))}
          <div className="shrink-0 w-px bg-gray-200 mx-1" />
          {stipendFilters.map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStipendFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
                stipendFilter === f
                  ? 'bg-accent-orange text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] text-text-muted">
            {filtered.length} internship{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-16 text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-[15px] font-semibold text-text-primary">No results found</p>
              <p className="text-[13px] text-text-muted mt-1">Try different keywords or filters</p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setQuery(''); setTypeFilter('All'); setStipendFilter('Any'); }}
                className="mt-4 px-4 py-2 bg-primary text-white text-[13px] font-semibold rounded-lg cursor-pointer"
              >
                Clear filters
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-6">
              {filtered.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  whileHover={{ y: -2, boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onNavigate('ListingDetail', { listing, from: 'Search' })}
                  className="bg-white border border-border-default rounded-xl p-4 cursor-pointer transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ backgroundColor: listing.companyColor }}
                    >
                      {listing.companyInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-text-primary">{listing.role}</h3>
                      <p className="text-[13px] text-text-secondary">{listing.company}</p>
                    </div>
                    <ResponseRateBadge rate={listing.responseRate} />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[11px] bg-gray-50 text-text-secondary px-2 py-0.5 rounded-md">{listing.stipend}/mo</span>
                    <span className="text-[11px] bg-gray-50 text-text-secondary px-2 py-0.5 rounded-md">{listing.location}</span>
                    <span className="text-[11px] bg-gray-50 text-text-secondary px-2 py-0.5 rounded-md">{listing.duration}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                      listing.type === 'Remote' ? 'bg-green-50 text-green-700' :
                      listing.type === 'Hybrid' ? 'bg-amber-50 text-amber-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>{listing.type}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-muted">{listing.openings} opening{listing.openings !== 1 ? 's' : ''} · {listing.applicants} applied</span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); onNavigate('ListingDetail', { listing, from: 'Search' }); }}
                      className="px-3 py-1.5 bg-primary text-white text-[12px] font-semibold rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
                    >
                      Apply
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
