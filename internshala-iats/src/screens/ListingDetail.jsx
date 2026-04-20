import { motion } from 'framer-motion';
import ResponseRateBadge from '../components/ResponseRateBadge';

export default function ListingDetail({ listing, onApply, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full"
    >
      {/* Top bar */}
      <div className="sticky top-0 bg-white z-40 border-b border-border-subtle">
        <div className="flex items-center gap-3 px-4 h-12">
          <button onClick={onBack} className="cursor-pointer">
            <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[16px] font-semibold text-text-primary">Listing Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero card */}
        <div className="bg-white m-4 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* Response rate badge prominent */}
          <div className="flex items-center justify-between mb-3">
            <ResponseRateBadge rate={listing.responseRate} />
            {listing.avgResponseDays && (
              <span className="text-[12px] text-text-secondary">
                Avg. response in {listing.avgResponseDays} days
              </span>
            )}
          </div>

          {/* Company + role */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
              style={{ backgroundColor: listing.companyColor }}
            >
              {listing.companyInitials}
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-text-primary">{listing.role}</h2>
              <p className="text-[14px] text-text-secondary">{listing.company}</p>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[11px] text-text-muted uppercase tracking-wide mb-0.5">Stipend</p>
              <p className="text-[14px] font-semibold text-text-primary">{listing.stipend}/mo</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[11px] text-text-muted uppercase tracking-wide mb-0.5">Location</p>
              <p className="text-[14px] font-semibold text-text-primary">{listing.location}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[11px] text-text-muted uppercase tracking-wide mb-0.5">Duration</p>
              <p className="text-[14px] font-semibold text-text-primary">3 months</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[11px] text-text-muted uppercase tracking-wide mb-0.5">Start Date</p>
              <p className="text-[14px] font-semibold text-text-primary">Immediately</p>
            </div>
          </div>
        </div>

        {/* Verified Employer section */}
        <div className="bg-white mx-4 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-success-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-[15px] font-semibold text-text-primary">Verified Employer</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-text-secondary">Response rate (last 30 days)</span>
              <span className="text-[13px] font-semibold text-text-primary">{listing.responseRate}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${listing.responseRate}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-success-green h-2 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-text-secondary">Hires through Internshala</span>
              <span className="text-[13px] font-semibold text-text-primary">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-text-secondary">Last active</span>
              <span className="text-[13px] font-semibold text-success-green">Today</span>
            </div>
          </div>
        </div>

        {/* About the role */}
        <div className="bg-white mx-4 mt-4 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-semibold text-text-primary mb-2">About the Role</h3>
          <ul className="space-y-2 text-[13px] text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Assist in planning and executing digital marketing campaigns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Create content for social media platforms and track engagement metrics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Support the marketing team with competitor analysis and market research</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Coordinate with internal teams for campaign deliverables</span>
            </li>
          </ul>
        </div>

        {/* Skills */}
        <div className="bg-white mx-4 mt-4 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-semibold text-text-primary mb-2">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {['Digital Marketing', 'SEO', 'Content Writing', 'Social Media', 'Google Analytics'].map((skill) => (
              <span key={skill} className="text-[12px] text-primary bg-bg-info-soft px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Apply button */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-white border-t border-border-subtle p-4 z-40">
        <button
          onClick={() => onApply(listing)}
          className="w-full py-3 bg-primary text-white text-[14px] font-semibold rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
}
