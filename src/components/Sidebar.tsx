import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Edit, 
  Library, 
  Sparkles, 
  Settings, 
  Menu, 
  X,
  MessageSquare
} from 'lucide-react';
import { NavigationTab } from '../types';
import { SovaraSidebarLogo } from './SovaraLogo';
import { RECENT_CHATS } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onSelectChat: (chatTitle: string) => void;
  onOpenSettings: () => void;
  activeChatTitle?: string;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeTab,
  onSelectTab,
  onSelectChat,
  onOpenSettings,
  activeChatTitle = 'Help me with homework',
  isMobile = false,
}) => {
  const content = (
    <div className="h-full flex flex-col justify-between py-4 px-3 bg-[#0d0d10] border-r border-[#1e1e23] w-64 select-none">
      {/* Top Header & Navigation */}
      <div>
        {/* Brand Lockup & Collapse Button */}
        <div className="flex items-center justify-between px-2 mb-6">
          <button 
            onClick={() => onSelectTab('chat')}
            className="flex items-center gap-2 hover:opacity-85 transition-opacity text-left"
          >
            <SovaraSidebarLogo size="md" />
          </button>
          
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-[#858591] hover:text-white hover:bg-[#1a1a20] transition-colors"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Primary Nav Items */}
        <div className="space-y-1">
          <button
            onClick={() => {
              onSelectTab('chat');
              onSelectChat('New Chat');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-[#c4c4cc] hover:text-white hover:bg-[#18181e] transition-all group"
          >
            <Edit size={16} className="text-[#9999a5] group-hover:text-white transition-colors" />
            <span>New chat</span>
          </button>

          <button
            onClick={() => onSelectTab('vault')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === 'vault'
                ? 'bg-[#1a1a20] text-white shadow-sm border border-[#2a2a34]'
                : 'text-[#c4c4cc] hover:text-white hover:bg-[#18181e]'
            }`}
          >
            <Library 
              size={16} 
              className={activeTab === 'vault' ? 'text-[#7adfd4]' : 'text-[#9999a5]'} 
            />
            <span>Knowledge Vault</span>
          </button>

          <button
            onClick={() => onSelectTab('artifacts')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === 'artifacts'
                ? 'bg-[#1a1a20] text-white shadow-sm border border-[#2a2a34]'
                : 'text-[#c4c4cc] hover:text-white hover:bg-[#18181e]'
            }`}
          >
            <Sparkles 
              size={16} 
              className={activeTab === 'artifacts' ? 'text-[#7adfd4]' : 'text-[#9999a5]'} 
            />
            <span>Artifacts</span>
          </button>
        </div>

        {/* Recent Chats Section */}
        <div className="mt-8">
          <div className="text-[11px] font-medium text-[#686873] px-3 mb-2 tracking-wide">
            Recent chats
          </div>
          <div className="space-y-0.5">
            {RECENT_CHATS.map((chat) => {
              const isCurrent = activeTab === 'chat' && activeChatTitle === chat;
              return (
                <button
                  key={chat}
                  onClick={() => {
                    onSelectTab('chat');
                    onSelectChat(chat);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all truncate block ${
                    isCurrent
                      ? 'text-white bg-[#17171d] font-medium'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#141419]'
                  }`}
                  title={chat}
                >
                  {chat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile & Settings Footer */}
      <div className="pt-3 border-t border-[#1a1a20]">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#16161b] transition-colors group">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* AM Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#181820] border border-[#2c2c36] flex items-center justify-center text-xs font-semibold text-[#e4e4e7] shrink-0 tracking-wider">
              AM
            </div>
            <div className="min-w-0 text-left">
              <div className="text-xs font-semibold text-[#f4f4f5] truncate">
                Arpit Maaal
              </div>
              <div className="text-[11px] text-[#71717a] truncate">
                Senior intern
              </div>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-md text-[#71717a] hover:text-white hover:bg-[#202028] transition-colors"
            title="User settings"
            aria-label="User settings"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile drawer mode
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
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

  // Desktop smooth collapsing sidebar
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full shrink-0 overflow-hidden z-20"
        >
          {content}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
