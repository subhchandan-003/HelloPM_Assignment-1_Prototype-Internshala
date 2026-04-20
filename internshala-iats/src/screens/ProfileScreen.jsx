import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userProfile } from '../data/mockData';

function Section({ title, children }) {
  return (
    <div className="bg-white mx-4 rounded-xl border border-border-default p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <h3 className="text-[14px] font-semibold text-text-primary mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function ProfileScreen({ onLogout }) {
  const [resumeUploaded, setResumeUploaded] = useState(userProfile.resumeUploaded);
  const [editBioOpen, setEditBioOpen] = useState(false);
  const [bio, setBio] = useState(userProfile.bio);
  const [savedBio, setSavedBio] = useState(userProfile.bio);

  const settings = [
    { label: 'Notifications', icon: '🔔', desc: 'Email & push alerts' },
    { label: 'Privacy', icon: '🔒', desc: 'Control your data' },
    { label: 'Help & Support', icon: '💬', desc: 'FAQs and contact' },
    { label: 'About', icon: 'ℹ️', desc: 'App version 2.1.0' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
        {/* Header banner */}
        <div className="bg-primary px-5 pt-10 pb-12" />

        {/* Avatar + name card */}
        <div className="mx-4 -mt-8 mb-4">
          <div className="bg-white rounded-xl border border-border-default p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-[22px] font-bold shrink-0 shadow-md">
                AS
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-[18px] font-bold text-text-primary">{userProfile.name}</h1>
                <p className="text-[13px] text-text-secondary">{userProfile.degree}</p>
                <p className="text-[12px] text-text-muted">{userProfile.college}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] bg-bg-info-soft text-primary px-2 py-0.5 rounded-full font-medium">
                    {userProfile.year}
                  </span>
                  <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    CGPA {userProfile.cgpa}
                  </span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditBioOpen(true)}
                className="text-text-muted hover:text-primary transition-colors cursor-pointer mt-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </motion.button>
            </div>

            <p className="text-[13px] text-text-secondary mt-3 leading-relaxed">{savedBio}</p>

            {/* Profile completion */}
            <div className="mt-3 pt-3 border-t border-border-subtle">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-semibold text-text-secondary">Profile Strength</span>
                <span className="text-[12px] font-bold text-primary">{userProfile.profileCompletion}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${userProfile.profileCompletion}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  className="bg-primary h-2 rounded-full"
                />
              </div>
              <p className="text-[11px] text-text-muted mt-1">Add 2 projects to reach 90%</p>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <Section title="Contact Information">
          <div className="space-y-2.5">
            {[
              { icon: '📧', label: 'Email', value: userProfile.email },
              { icon: '📱', label: 'Phone', value: userProfile.phone },
              { icon: '📍', label: 'Location', value: userProfile.location },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <div>
                  <p className="text-[11px] text-text-muted">{item.label}</p>
                  <p className="text-[13px] text-text-primary font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <div className="mt-3">
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileTap={{ scale: 0.95 }}
                  className="text-[12px] text-primary bg-bg-info-soft px-3 py-1 rounded-full border border-blue-100 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-[12px] text-text-muted border border-dashed border-border-default px-3 py-1 rounded-full hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                + Add skill
              </motion.button>
            </div>
          </Section>
        </div>

        {/* Resume */}
        <div className="mt-3">
          <Section title="Resume">
            {resumeUploaded ? (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-[13px] font-semibold text-green-800">Arjun_Sharma_Resume.pdf</p>
                    <p className="text-[11px] text-green-600">Uploaded 14 Mar 2026 · 1.2 MB</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setResumeUploaded(false)}
                  className="text-[12px] font-semibold text-green-700 hover:text-green-900 cursor-pointer"
                >
                  Replace
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setResumeUploaded(true)}
                className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-[13px] text-text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Resume (PDF)
              </motion.button>
            )}
          </Section>
        </div>

        {/* Settings */}
        <div className="mt-3">
          <Section title="Settings">
            <div className="space-y-1">
              {settings.map((s) => (
                <motion.button
                  key={s.label}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-left"
                >
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-text-primary">{s.label}</p>
                    <p className="text-[11px] text-text-muted">{s.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              ))}
            </div>
          </Section>
        </div>

        {/* Logout */}
        <div className="px-4 mt-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full py-3 border border-red-200 bg-red-50 text-red-600 text-[14px] font-semibold rounded-xl hover:bg-red-100 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </motion.button>
        </div>
      </div>

      {/* Edit Bio Modal */}
      <AnimatePresence>
        {editBioOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditBioOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 z-50 md:max-w-lg md:mx-auto md:left-1/2 md:-translate-x-1/2"
            >
              <h3 className="text-[16px] font-semibold text-text-primary mb-3">Edit Bio</h3>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full border border-border-default rounded-xl px-3 py-2.5 text-[13px] text-text-primary resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <div className="flex gap-3 mt-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setEditBioOpen(false)}
                  className="flex-1 py-2.5 border border-border-default rounded-xl text-[14px] font-medium text-text-secondary cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setSavedBio(bio); setEditBioOpen(false); }}
                  className="flex-1 py-2.5 bg-primary rounded-xl text-[14px] font-semibold text-white cursor-pointer"
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
