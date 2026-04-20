import { motion } from 'framer-motion';
import { stageLabels } from '../data/mockData';

const stages = [1, 2, 3, 4, 5];

export default function SubmissionConfirmation({ listing, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full px-6"
    >
      {/* Green checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-success-green flex items-center justify-center mb-6"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[22px] font-semibold text-text-primary mb-2"
      >
        Application Submitted
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-[14px] text-text-secondary text-center mb-8 leading-relaxed max-w-[280px]"
      >
        {listing?.avgResponseDays
          ? `This employer typically responds within ${listing.avgResponseDays} days.`
          : 'This employer typically responds within 5 days.'}{' '}
        We'll notify you when your application is viewed.
      </motion.p>

      {/* Status tracker preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full bg-white rounded-xl border border-border-default p-4 mb-8"
      >
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-3 text-center">
          Your Application Status
        </p>
        <div className="flex items-center justify-between">
          {stages.map((stage, idx) => (
            <div key={stage} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center z-10">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                    stage === 1
                      ? 'bg-primary text-white'
                      : 'bg-white border-2 border-gray-300 text-text-muted'
                  }`}
                >
                  {stage === 1 ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stage
                  )}
                </div>
                {stage === 1 && (
                  <span className="text-[9px] font-semibold text-primary mt-1">Applied</span>
                )}
              </div>
              {idx < stages.length - 1 && (
                <div className="flex-1 h-[2px] mx-1">
                  <div className={`h-full rounded ${stage < 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onBack}
        className="w-full py-3 bg-primary text-white text-[14px] font-semibold rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
      >
        Back to My Applications
      </motion.button>
    </motion.div>
  );
}
