import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Clock, 
  BookOpen, 
  Circle,
  AlertCircle
} from 'lucide-react';
import { ACTIVITY_STEPS, ACTIVITY_THOUGHT_SUMMARY, CITATION_ITEMS } from '../data/mockData';

interface RightBarProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'activity' | 'sources';
  isMobile?: boolean;
}

export const RightBar: React.FC<RightBarProps> = ({
  isOpen,
  onClose,
  defaultTab = 'activity',
  isMobile = false,
}) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'sources'>(defaultTab);

  const content = (
    <div className="h-full w-80 md:w-88 bg-[#0e0e11] border-l border-[#1e1e24] flex flex-col select-none overflow-hidden text-[#e4e4e7]">
      {/* Top Header & Tab Switcher */}
      <div className="p-3 border-b border-[#1b1b22] flex items-center justify-between">
        {/* Segmented Capsule Tabs */}
        <div className="flex items-center bg-[#18181f] p-1 rounded-full border border-[#262630]">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
              activeTab === 'activity'
                ? 'bg-[#262632] text-white shadow-sm'
                : 'text-[#94949f] hover:text-white'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
              activeTab === 'sources'
                ? 'bg-[#262632] text-white shadow-sm'
                : 'text-[#94949f] hover:text-white'
            }`}
          >
            Sources
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#858591] hover:text-white hover:bg-[#1a1a22] transition-colors"
          title="Close panel"
          aria-label="Close panel"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-normal">
        {activeTab === 'activity' ? (
          <div className="space-y-3">
            {/* Timeline Steps */}
            <div className="space-y-2.5">
              {ACTIVITY_STEPS.map((step) => {
                return (
                  <div key={step.id} className="flex items-start gap-2.5 text-[#d4d4d8]">
                    {step.status === 'success' && (
                      <Check size={14} className="text-[#34d399] mt-0.5 shrink-0 stroke-[2.5]" />
                    )}
                    {step.status === 'error' && (
                      <X size={14} className="text-[#f87171] mt-0.5 shrink-0 stroke-[2.5]" />
                    )}
                    {step.status === 'neutral' && step.title.includes('Thought') && (
                      <Clock size={13} className="text-[#a1a1aa] mt-0.5 shrink-0" />
                    )}
                    {step.status === 'neutral' && !step.title.includes('Thought') && (
                      <span className="w-3.5 h-3.5 shrink-0" />
                    )}
                    
                    <span className={`text-[12px] leading-tight ${
                      step.status === 'error' ? 'text-[#fca5a5]' : 'text-[#d4d4dc]'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Expanded Thought Narrative */}
            <div className="mt-4 pt-3 border-t border-[#1e1e26] text-[#a1a1aa] text-[12px] leading-relaxed">
              {ACTIVITY_THOUGHT_SUMMARY}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Citations
            </h3>

            <div className="space-y-4">
              {CITATION_ITEMS.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#9a9aa6]">
                    {item.type === 'source' ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#d4d4d8] shrink-0" />
                    ) : (
                      <BookOpen size={13} className="text-[#7adfd4] shrink-0" />
                    )}
                    <span className="text-[11px] font-medium tracking-wide">
                      {item.sourceTitle}
                    </span>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#c4c4cc] pl-4.5">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: 340 }}
              animate={{ x: 0 }}
              exit={{ x: 340 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative z-10 h-full"
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 330, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="h-full shrink-0 overflow-hidden z-20"
        >
          {content}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
