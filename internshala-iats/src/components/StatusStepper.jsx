import { motion } from 'framer-motion';
import { stageLabels } from '../data/mockData';

const stages = [1, 2, 3, 4, 5];

function getStageColor(stageIndex, currentStage) {
  if (stageIndex < currentStage) return 'bg-primary';
  if (stageIndex === currentStage) return 'bg-primary';
  return 'bg-gray-200';
}

function getLineColor(stageIndex, currentStage) {
  if (stageIndex < currentStage) return 'bg-primary';
  return 'bg-gray-200';
}

export default function StatusStepper({ currentStage, stageHistory }) {
  return (
    <div className="w-full py-3">
      {/* Stepper nodes */}
      <div className="flex items-center justify-between relative">
        {stages.map((stage, idx) => (
          <div key={stage} className="flex items-center flex-1 last:flex-none">
            {/* Node */}
            <div className="flex flex-col items-center z-10 relative">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: stage === currentStage ? [1, 1.15, 1] : 1,
                }}
                transition={
                  stage === currentStage
                    ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.3 }
                }
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold
                  ${stage <= currentStage ? 'bg-primary text-white' : 'bg-white border-2 border-gray-300 text-text-muted'}
                `}
              >
                {stage <= currentStage ? (
                  stage < currentStage ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stage
                  )
                ) : (
                  stage
                )}
              </motion.div>
            </div>
            {/* Connector line */}
            {idx < stages.length - 1 && (
              <div className="flex-1 h-[2px] mx-1">
                <div className={`h-full rounded ${getLineColor(stage, currentStage)}`} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Current stage label */}
      <div className="mt-2 text-center">
        <span className="text-[11px] font-semibold text-primary uppercase tracking-wide">
          {stageLabels[currentStage] || 'Applied'}
        </span>
      </div>
    </div>
  );
}
