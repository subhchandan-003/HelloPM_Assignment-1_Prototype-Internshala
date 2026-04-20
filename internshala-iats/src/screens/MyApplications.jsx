import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationCard from '../components/ApplicationCard';
import MoveOnNudge from '../components/MoveOnNudge';
import ClosedCard from '../components/ClosedCard';
import ListingMiniCard from '../components/ListingMiniCard';
import { applications, similarListings } from '../data/mockData';

const typeOptions = ['All', 'Remote', 'On-site', 'Hybrid'];

export default function MyApplications({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('active');
  const [filterOpen, setFilterOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');

  const activeApps = applications.filter((a) => a.status === 'active' && (typeFilter === 'All' || a.type === typeFilter));
  const closedApps = applications.filter((a) => a.status === 'closed');
  const allActive = applications.filter((a) => a.status === 'active');

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="sticky top-0 bg-white z-40 border-b border-border-subtle shrink-0">
        <div className="flex items-center justify-between px-4 h-12">
          <h1 className="text-[18px] font-semibold text-text-primary">My Applications</h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setFilterOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
              typeFilter !== 'All' ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {typeFilter !== 'All' ? typeFilter : 'Filter'}
          </motion.button>
        </div>

        {/* Tab bar */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2.5 text-[14px] font-semibold text-center cursor-pointer transition-colors ${
              activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-text-muted border-b-2 border-transparent'
            }`}
          >
            Active ({allActive.length})
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`flex-1 py-2.5 text-[14px] font-semibold text-center cursor-pointer transition-colors ${
              activeTab === 'closed' ? 'text-primary border-b-2 border-primary' : 'text-text-muted border-b-2 border-transparent'
            }`}
          >
            Closed ({applications.filter((a) => a.status === 'closed').length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 'active' ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 pb-6 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 md:items-start"
            >
              {activeApps.length === 0 ? (
                <div className="md:col-span-2 text-center py-12 text-text-muted">
                  <p className="text-[15px] font-medium">No {typeFilter !== 'All' ? typeFilter : ''} applications</p>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTypeFilter('All')}
                    className="mt-2 text-[13px] text-primary font-semibold cursor-pointer"
                  >
                    Clear filter
                  </motion.button>
                </div>
              ) : (
                activeApps.map((app) => (
                  <div key={app.id} className="space-y-3">
                    <motion.div
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onNavigate('ListingDetail', { listing: app, from: 'MyApplications' })}
                      className="cursor-pointer"
                    >
                      <ApplicationCard app={app} />
                    </motion.div>
                    {app.showNudge && (
                      <MoveOnNudge
                        app={app}
                        onViewListing={(listing) => onNavigate('ListingDetail', { listing })}
                        onApply={(listing) => onNavigate('ListingDetail', { listing })}
                      />
                    )}
                  </div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 pb-6"
            >
              {applications.filter((a) => a.status === 'closed').map((app) => (
                <ClosedCard key={app.id} app={app} />
              ))}

              <div className="mt-6">
                <h3 className="text-[14px] font-semibold text-text-secondary mb-3">Looking for similar roles?</h3>
                <div className="space-y-3">
                  {similarListings.map((listing) => (
                    <motion.div
                      key={listing.id}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onNavigate('ListingDetail', { listing })}
                      className="cursor-pointer"
                    >
                      <ListingMiniCard listing={listing} onApply={(l) => onNavigate('ListingDetail', { listing: l })} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter sheet */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl px-4 pt-4 pb-8 z-50 md:max-w-[390px] md:mx-auto md:left-1/2 md:-translate-x-1/2"
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <h3 className="text-[16px] font-semibold text-text-primary mb-4">Filter by Work Type</h3>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {typeOptions.map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTypeFilter(opt)}
                    className={`py-3 rounded-xl text-[14px] font-semibold border-2 transition-colors cursor-pointer ${
                      typeFilter === opt
                        ? 'border-primary bg-bg-info-soft text-primary'
                        : 'border-border-default text-text-secondary hover:border-gray-300'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilterOpen(false)}
                className="w-full py-3 bg-primary text-white text-[14px] font-semibold rounded-xl cursor-pointer"
              >
                Apply Filter
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
