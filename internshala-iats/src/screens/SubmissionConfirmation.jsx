import { motion } from 'framer-motion';
import { stageLabels } from '../data/mockData';

const stages = [1, 2, 3, 4, 5];

export default function SubmissionConfirmation({ listing, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="h-full flex flex-col items-center justify-center px-6 overflow-y-auto scrollbar-hide"
    >
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-success-green flex items-center justify-center mb-6 shadow-lg"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[22px] font-bold text-text-primary mb-2"
      >
        Application Submitted!
      </motion.h1>

      {listing && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-[13px] text-text-secondary mb-1 font-medium"
        >
          {listing.role} · {listing.company}
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-[14px] text-text-secondary text-center mb-8 leading-relaxed max-w-[280px]"
      >
        {listing?.avgResponseDays
          ? `This employer typically responds within ${listing.avgResponseDays} days.`
          : 'This employer typically responds within 5 days.'}{' '}
        We'll notify you when your application is viewed.
      </motion.p>

      {/* Status tracker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full bg-white rounded-xl border border-border-default p-4 mb-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      >
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-4 text-center">
          Your Application Journey
        </p>
        <div className="flex items-center justify-between">
          {stages.map((stage, idx) => (
            <div key={stage} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.65 + idx * 0.08, type: 'spring', stiffness: 200 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                    stage === 1 ? 'bg-primary text-white shadow-md' : 'bg-white border-2 border-gray-200 text-text-muted'
                  }`}
                >
                  {stage === 1 ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : stage}
                </motion.div>
                {stage === 1 && (
                  <span className="text-[9px] font-semibold text-primary mt-1 whitespace-nowrap">Applied</span>
                )}
              </div>
              {idx < stages.length - 1 && (
                <div className="flex-1 h-[2px] mx-1 bg-gray-200">
                  {stage === 1 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                      className="h-full bg-primary rounded"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted mt-3 text-center">
          Stages: {stageLabels.slice(1).join(' → ')}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBack}
        className="w-full py-3 bg-primary text-white text-[14px] font-semibold rounded-xl hover:bg-primary-hover transition-colors cursor-pointer mb-3"
      >
        Back to My Applications
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBack}
        className="w-full py-3 border border-border-default text-text-secondary text-[14px] font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
      >
        Search More Internships
      </motion.button>
    </motion.div>
  );
}
