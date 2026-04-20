import { motion } from 'framer-motion';
import ResponseRateBadge from './ResponseRateBadge';

export default function ClosedCard({ app }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-bg-card border border-border-default rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] opacity-70"
    >
      {/* Top row */}
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
          {app.stipend}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] text-text-secondary bg-gray-50 px-2 py-0.5 rounded-md">
          {app.location}
        </span>
      </div>

      {/* Status */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-border-subtle">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[13px] font-semibold text-text-secondary">No Update Received</span>
        </div>
        <p className="text-[11px] text-text-muted leading-relaxed">
          This application was closed by Internshala after 14 days of no employer activity. This is not a rejection from the employer.
        </p>
        <p className="text-[10px] text-text-muted mt-1">Closed on {app.closedDate}</p>
      </div>

      {/* Bottom */}
      <div className="mt-2">
        <span className="text-[11px] text-text-muted">Applied {app.appliedDate}</span>
      </div>
    </motion.div>
  );
}
