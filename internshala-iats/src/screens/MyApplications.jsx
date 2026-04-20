import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationCard from '../components/ApplicationCard';
import MoveOnNudge from '../components/MoveOnNudge';
import ClosedCard from '../components/ClosedCard';
import ListingMiniCard from '../components/ListingMiniCard';
import { applications, similarListings } from '../data/mockData';

export default function MyApplications({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('active');

  const activeApps = applications.filter((a) => a.status === 'active');
  const closedApps = applications.filter((a) => a.status === 'closed');

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="sticky top-0 bg-white z-40 border-b border-border-subtle">
        <div className="flex items-center justify-between px-4 h-12">
          <svg className="w-5 h-5 text-text-primary cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <h1 className="text-[18px] font-semibold text-text-primary">My Applications</h1>
          <svg className="w-5 h-5 text-text-primary cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>

        {/* Tab bar */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2.5 text-[14px] font-semibold text-center cursor-pointer transition-colors ${
              activeTab === 'active'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-muted border-b-2 border-transparent'
            }`}
          >
            Active ({activeApps.length})
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`flex-1 py-2.5 text-[14px] font-semibold text-center cursor-pointer transition-colors ${
              activeTab === 'closed'
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-muted border-b-2 border-transparent'
            }`}
          >
            Closed ({closedApps.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20 space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === 'active' ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {activeApps.map((app) => (
                <div key={app.id} className="space-y-3">
                  <ApplicationCard app={app} />
                  {app.showNudge && (
                    <MoveOnNudge
                      app={app}
                      onViewListing={(listing) => onNavigate('ListingDetail', { listing })}
                      onApply={(listing) => onNavigate('ListingDetail', { listing })}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {closedApps.map((app) => (
                <ClosedCard key={app.id} app={app} />
              ))}

              {/* Similar roles section */}
              <div className="mt-6">
                <h3 className="text-[14px] font-semibold text-text-secondary mb-3">Looking for similar roles?</h3>
                <div className="space-y-3">
                  {similarListings.map((listing) => (
                    <div
                      key={listing.id}
                      onClick={() => onNavigate('ListingDetail', { listing })}
                      className="cursor-pointer"
                    >
                      <ListingMiniCard
                        listing={listing}
                        onApply={(l) => onNavigate('ListingDetail', { listing: l })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
