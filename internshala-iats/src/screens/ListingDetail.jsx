import { useState } from 'react';
import { motion } from 'framer-motion';
import ResponseRateBadge from '../components/ResponseRateBadge';

export default function ListingDetail({ listing, onApply, onBack }) {
  const [saved, setSaved] = useState(false);

  if (!listing) return null;

  const skills = listing.skills || ['Communication', 'Teamwork', 'Microsoft Office'];
  const description = listing.description || ['Assist the team with assigned tasks and deliverables.'];
  const duration = listing.duration || '3 months';
  const startDate = listing.startDate || 'Immediately';
  const openings = listing.openings || 1;
  const applicants = listing.applicants || 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.22 }}
      className="h-full flex flex-col overflow-hidden"
    >
      {/* Top bar */}
      <div className="sticky top-0 bg-white z-40 border-b border-border-subtle shrink-0">
        <div className="flex items-center justify-between px-4 h-12">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="cursor-pointer p-1 -ml-1">
            <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <h1 className="text-[16px] font-semibold text-text-primary">Listing Details</h1>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setSaved(!saved)}
            className="cursor-pointer p-1 -mr-1"
          >
            <svg
              className={`w-5 h-5 transition-colors ${saved ? 'text-primary fill-primary' : 'text-text-muted'}`}
              fill={saved ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Hero card */}
        <div className="bg-white m-4 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between mb-3">
            <ResponseRateBadge rate={listing.responseRate} />
            {listing.avgResponseDays && (
              <span className="text-[12px] text-text-secondary">Avg. {listing.avgResponseDays} day response</span>
            )}
          </div>

          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: listing.companyColor }}
            >
              {listing.companyInitials}
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-text-primary">{listing.role}</h2>
              <p className="text-[14px] text-text-secondary">{listing.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Stipend', value: `${listing.stipend}/mo` },
              { label: 'Location', value: listing.location },
              { label: 'Duration', value: duration },
              { label: 'Start Date', value: startDate },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-text-muted uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-[13px] font-semibold text-text-primary">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-subtle">
            <span className="text-[12px] text-text-secondary">
              <span className="font-semibold text-text-primary">{openings}</span> opening{openings !== 1 ? 's' : ''}
            </span>
            <span className="text-text-muted">·</span>
            <span className="text-[12px] text-text-secondary">
              <span className="font-semibold text-text-primary">{applicants}</span> applicants
            </span>
            <span className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              listing.type === 'Remote' ? 'bg-green-50 text-green-700' :
              listing.type === 'Hybrid' ? 'bg-amber-50 text-amber-700' :
              'bg-blue-50 text-blue-700'
            }`}>{listing.type || 'Remote'}</span>
          </div>
        </div>

        {/* Verified Employer */}
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
        <div className="bg-white mx-4 mt-3 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">About the Role</h3>
          <ul className="space-y-2">
            {description.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-text-secondary">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="bg-white mx-4 mt-3 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="text-[12px] text-primary bg-bg-info-soft px-2.5 py-1 rounded-full border border-blue-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div className="bg-white mx-4 mt-3 mb-4 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">Perks</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Certificate of completion', '5 days a week', 'Letter of recommendation', 'Flexible working hours'].map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-[12px] text-text-secondary">
                <svg className="w-3.5 h-3.5 text-success-green shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {perk}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply footer — no fixed positioning needed */}
      <div className="bg-white border-t border-border-subtle p-4 shrink-0">
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ backgroundColor: '#008BDC' }}
          onClick={() => onApply(listing)}
          className="w-full py-3 bg-primary text-white text-[14px] font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Apply Now
        </motion.button>
      </div>
    </motion.div>
  );
}
