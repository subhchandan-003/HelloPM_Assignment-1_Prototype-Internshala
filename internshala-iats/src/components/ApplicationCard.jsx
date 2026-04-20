import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusStepper from './StatusStepper';
import ResponseRateBadge from './ResponseRateBadge';

export default function ApplicationCard({ app, onExpand }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-bg-card border border-border-default rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top row: Logo + Title + Company + Response badge */}
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
          style={{ backgroundColor: app.companyColor }}
        >
          {app.companyInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-text-primary truncate">{app.role}</h3>
              <p className="text-[13px] text-text-secondary">{app.company}</p>
            </div>
            <ResponseRateBadge rate={app.responseRate} />
          </div>
        </div>
      </div>

      {/* Metadata badges */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="inline-flex items-center gap-1 text-[12px] text-text-secondary bg-gray-50 px-2 py-0.5 rounded-md">
          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          {app.stipend}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] text-text-secondary bg-gray-50 px-2 py-0.5 rounded-md">
          <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {app.location}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] text-text-secondary bg-gray-50 px-2 py-0.5 rounded-md">
          {app.type}
        </span>
      </div>

      {/* Status Pipeline */}
      <StatusStepper currentStage={app.currentStage} stageHistory={app.stageHistory} />

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-text-muted">Applied {app.appliedDate}</span>
        {app.avgResponseDays && (
          <span className="text-[11px] text-text-secondary">
            Avg. response: {app.avgResponseDays} days
          </span>
        )}
      </div>

      {/* Expanded history */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-border-subtle">
              <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide mb-2">Status History</p>
              <div className="space-y-2">
                {app.stageHistory.map((entry) => (
                  <div key={entry.stage} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-[12px] text-text-primary font-medium">{entry.label}</span>
                    <span className="text-[11px] text-text-muted ml-auto">{entry.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
