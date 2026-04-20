import { motion } from 'framer-motion';
import { userProfile } from '../data/mockData';

const navItems = [
  {
    id: 'Home',
    label: 'Home',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'Search',
    label: 'Search Internships',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 'MyApplications',
    label: 'My Applications',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'Profile',
    label: 'My Profile',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const activeScreens = {
  Home: 'Home',
  Search: 'Search',
  MyApplications: 'MyApplications',
  ListingDetail: 'MyApplications',
  SubmissionConfirmation: 'MyApplications',
  Profile: 'Profile',
};

export default function Sidebar({ currentScreen, onNavigate, onLogout }) {
  const activeNav = activeScreens[currentScreen] || 'Home';

  return (
    <div className="w-60 bg-white border-r border-border-default h-full flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-[17px] font-bold text-text-primary tracking-tight">Internshala</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.97 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors cursor-pointer text-left ${
                isActive
                  ? 'bg-bg-info-soft text-primary'
                  : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
              }`}
            >
              <span className={isActive ? 'text-primary' : 'text-text-muted'}>
                {item.icon(isActive)}
              </span>
              {item.label}
              {item.id === 'MyApplications' && (
                <span className={`ml-auto text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted'}`}>
                  3
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Profile completion */}
      <div className="mx-3 mb-3 p-3 bg-bg-info-soft rounded-xl border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-semibold text-primary">Profile Strength</span>
          <span className="text-[12px] font-bold text-primary">{userProfile.profileCompletion}%</span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${userProfile.profileCompletion}%` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="bg-primary h-1.5 rounded-full"
          />
        </div>
        <p className="text-[11px] text-text-secondary mt-1.5">Add projects to reach 90%</p>
      </div>

      {/* User + Logout */}
      <div className="border-t border-border-subtle p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[13px] font-bold shrink-0">
            AS
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-text-primary truncate">{userProfile.name}</p>
            <p className="text-[11px] text-text-muted truncate">{userProfile.email}</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log out
        </motion.button>
      </div>
    </div>
  );
}
