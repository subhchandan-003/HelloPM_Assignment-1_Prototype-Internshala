import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ListingMiniCard from './ListingMiniCard';
import { curatedListings } from '../data/mockData';

export default function MoveOnNudge({ app, onViewListing, onApply }) {
  const [visible, setVisible] = useState(true);
  const [snoozed, setSnoozed] = useState(false);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-l-4 border-nudge-border bg-nudge-bg rounded-xl p-4 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start gap-2 mb-3">
            <svg className="w-5 h-5 text-nudge-border shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[13px] text-text-primary leading-relaxed">
              Most employers on Internshala respond within <strong>14 days</strong>. This application has been waiting for{' '}
              <strong>{app.daysWaiting} days</strong>. Here are 3 similar roles that are currently active.
            </p>
          </div>

          {/* Horizontally scrollable listings */}
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-1 px-1 scrollbar-hide">
            {curatedListings.map((listing) => (
              <ListingMiniCard
                key={listing.id}
                listing={listing}
                onApply={(l) => onViewListing(l)}
              />
            ))}
          </div>

          {/* Action links */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-purple-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSnoozed(true);
                // Snooze for 7 days (visual only)
                setTimeout(() => setVisible(false), 300);
              }}
              className="text-[12px] font-medium text-nudge-border hover:underline cursor-pointer"
            >
              Keep Waiting
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisible(false);
              }}
              className="text-[12px] font-medium text-text-muted hover:text-text-secondary cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
