import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Clock, 
  BookOpen, 
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  FileText
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
}) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'sources'>(defaultTab);

  // Sync tab state when opening specifically for sources or activity
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  // Handle ESC key to dismiss drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden select-none">
          {/* Dimmed backdrop to close on outside click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
            aria-label="Close drawer backdrop"
          />

          {/* Sliding Panel strictly anchored to the right edge within viewport boundaries */}
          <motion.aside
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 280,
              mass: 0.85,
            }}
            className="relative z-10 h-full w-full max-w-[360px] sm:max-w-[400px] bg-[#0d0d12] border-l border-[#1f1f28] shadow-[-16px_0_48px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden text-[#e4e4e7]"
          >
            {/* Top Header & Tab Switcher */}
            <div className="px-4 py-3 border-b border-[#1b1b24] flex items-center justify-between shrink-0 bg-[#0e0e14]">
              {/* Segmented Capsule Tabs */}
              <div className="flex items-center bg-[#171720] p-1 rounded-full border border-[#252530]">
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                    activeTab === 'activity'
                      ? 'bg-[#262633] text-white shadow-xs'
                      : 'text-[#8b8b98] hover:text-white'
                  }`}
                >
                  Activity
                </button>
                <button
                  onClick={() => setActiveTab('sources')}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                    activeTab === 'sources'
                      ? 'bg-[#262633] text-white shadow-xs'
                      : 'text-[#8b8b98] hover:text-white'
                  }`}
                >
                  Sources
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#858593] hover:text-white hover:bg-[#1a1a24] transition-colors active:scale-95"
                title="Close drawer (Esc)"
                aria-label="Close drawer"
              >
                <X size={17} />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-normal scrollbar-none">
              {activeTab === 'activity' ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#636372] mb-3">
                      Execution Timeline
                    </h3>

                    {/* Timeline Steps */}
                    <div className="space-y-2.5">
                      {ACTIVITY_STEPS.map((step) => {
                        return (
                          <div 
                            key={step.id} 
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#13131a] transition-colors text-[#d4d4d8]"
                          >
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
                              <div className="w-1.5 h-1.5 rounded-full bg-[#525260] mt-1.5 ml-1 mr-1 shrink-0" />
                            )}
                            
                            <span className={`text-[12px] leading-tight ${
                              step.status === 'error' 
                                ? 'text-[#fca5a5]' 
                                : step.status === 'success'
                                ? 'text-[#e4e4e7]'
                                : 'text-[#a1a1ad]'
                            }`}>
                              {step.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expanded Thought Narrative */}
                  <div className="pt-3 border-t border-[#1c1c26]">
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#636372] mb-2 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#7adfd4]" />
                      <span>Reasoning Context</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#121218] border border-[#1d1d28] text-[#a5a5b2] text-[12px] leading-relaxed">
                      {ACTIVITY_THOUGHT_SUMMARY}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#636372]">
                      Grounded Sources ({CITATION_ITEMS.length})
                    </h3>
                    <span className="text-[10px] font-mono text-[#7adfd4] bg-[#122220] border border-[#7adfd4]/20 px-1.5 py-0.5 rounded">
                      Verified
                    </span>
                  </div>

                  <div className="space-y-3">
                    {CITATION_ITEMS.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-3.5 rounded-xl bg-[#121217] border border-[#1e1e28] hover:border-[#2a2a36] transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-[#9a9aa6] min-w-0">
                            {item.type === 'source' ? (
                              <div className="w-2 h-2 rounded-full bg-[#7adfd4] shrink-0" />
                            ) : (
                              <BookOpen size={13} className="text-[#7adfd4] shrink-0" />
                            )}
                            <span className="text-[11.5px] font-medium tracking-wide text-white/90 truncate">
                              {item.sourceTitle}
                            </span>
                          </div>
                          
                          <span className="text-[10px] font-mono uppercase text-[#5a5a66] shrink-0">
                            {item.type === 'vault' ? 'Vault' : 'Web Citation'}
                          </span>
                        </div>

                        <p className="text-[12px] leading-relaxed text-[#b4b4bf]">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Knowledge Vault Integration Tip */}
                  <div className="p-3 rounded-xl bg-[#11161d] border border-[#1d2a38] text-[11.5px] text-[#93c5fd] leading-relaxed flex items-start gap-2.5">
                    <Layers size={15} className="text-[#60a5fa] shrink-0 mt-0.5" />
                    <span>
                      Documents indexed in your <strong>Knowledge Vault</strong> are automatically extracted and cited in chat responses.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
