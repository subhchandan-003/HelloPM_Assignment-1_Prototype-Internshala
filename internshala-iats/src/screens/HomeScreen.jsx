import { motion } from 'framer-motion';
import { applications, allListings } from '../data/mockData';
import ResponseRateBadge from '../components/ResponseRateBadge';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.35 } }),
};

function StatCard({ value, label, color, icon, delay }) {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="bg-white rounded-xl p-4 border border-border-default shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex-1"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${color}`}>
        {icon}
      </div>
      <p className="text-[22px] font-bold text-text-primary leading-tight">{value}</p>
      <p className="text-[12px] text-text-muted mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function HomeScreen({ onNavigate }) {
  const activeCount = applications.filter((a) => a.status === 'active').length;
  const shortlisted = applications.filter((a) => a.currentStage >= 3 && a.status === 'active').length;
  const viewed = applications.filter((a) => a.currentStage >= 2 && a.status === 'active').length;
  const recommended = allListings.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="bg-primary px-5 pt-10 pb-8">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <p className="text-blue-100 text-[13px] font-medium mb-1">Good morning 👋</p>
            <h1 className="text-white text-[24px] font-bold leading-tight">Hello, Arjun!</h1>
            <p className="text-blue-100 text-[14px] mt-1">You have {activeCount} active applications</p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="px-4 -mt-4 flex gap-3">
          <StatCard
            value={activeCount}
            label="Active"
            color="bg-blue-50"
            delay={0}
            icon={<svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          />
          <StatCard
            value={viewed}
            label="Viewed"
            color="bg-amber-50"
            delay={1}
            icon={<svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
          />
          <StatCard
            value={shortlisted}
            label="Shortlisted"
            color="bg-green-50"
            delay={2}
            icon={<svg className="w-4 h-4 text-success-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>

        {/* Quick Actions */}
        <div className="px-4 mt-5">
          <h2 className="text-[15px] font-semibold text-text-primary mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              onClick={() => onNavigate('Search')}
              className="flex items-center gap-3 bg-white border border-border-default rounded-xl p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all text-left"
            >
              <div className="w-9 h-9 bg-bg-info-soft rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text-primary">Search</p>
                <p className="text-[11px] text-text-muted">Find roles</p>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              onClick={() => onNavigate('MyApplications')}
              className="flex items-center gap-3 bg-white border border-border-default rounded-xl p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all text-left"
            >
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-success-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text-primary">Applications</p>
                <p className="text-[11px] text-text-muted">Track status</p>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              onClick={() => onNavigate('Profile')}
              className="flex items-center gap-3 bg-white border border-border-default rounded-xl p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all text-left"
            >
              <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text-primary">Profile</p>
                <p className="text-[11px] text-text-muted">78% complete</p>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              onClick={() => onNavigate('Search')}
              className="flex items-center gap-3 bg-white border border-border-default rounded-xl p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all text-left"
            >
              <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-text-primary">Saved</p>
                <p className="text-[11px] text-text-muted">2 listings</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Recommended */}
        <div className="px-4 mt-6 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-text-primary">Recommended for You</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('Search')}
              className="text-[12px] font-semibold text-primary cursor-pointer"
            >
              See all →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommended.map((listing, i) => (
              <motion.div
                key={listing.id}
                custom={i + 3}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileTap={{ scale: 0.99 }}
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                onClick={() => onNavigate('ListingDetail', { listing, from: 'Home' })}
                className="bg-white border border-border-default rounded-xl p-4 cursor-pointer transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                    style={{ backgroundColor: listing.companyColor }}
                  >
                    {listing.companyInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-text-primary truncate">{listing.role}</h3>
                    <p className="text-[12px] text-text-secondary">{listing.company}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[11px] text-text-secondary bg-gray-50 px-2 py-0.5 rounded-md">{listing.stipend}/mo</span>
                      <span className="text-[11px] text-text-secondary bg-gray-50 px-2 py-0.5 rounded-md">{listing.location}</span>
                      <ResponseRateBadge rate={listing.responseRate} />
                    </div>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => { e.stopPropagation(); onNavigate('ListingDetail', { listing, from: 'Home' }); }}
                  className="mt-3 w-full py-2 bg-primary text-white text-[12px] font-semibold rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
                >
                  View & Apply
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
