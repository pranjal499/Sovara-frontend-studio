import React from 'react';
import { Menu, Edit } from 'lucide-react';

interface WindowBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  className?: string;
}

export const WindowBar: React.FC<WindowBarProps> = ({
  sidebarOpen,
  onToggleSidebar,
  onNewChat,
  className = '',
}) => {
  // If sidebar is already open, no top window bar or top-right controls needed
  if (sidebarOpen) {
    return null;
  }

  // When sidebar is closed, render the vertical top-left action icons (≡ and ✏) matching the SVGs
  return (
    <div className={`flex flex-col items-center gap-3 p-3 text-[#71717a] select-none z-30 shrink-0 ${className}`}>
      <button
        onClick={onToggleSidebar}
        className="p-1.5 rounded-lg text-[#94949f] hover:text-white hover:bg-[#1a1a22] transition-colors"
        title="Open sidebar"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      <button
        onClick={onNewChat}
        className="p-1.5 rounded-lg text-[#94949f] hover:text-white hover:bg-[#1a1a22] transition-colors"
        title="New chat"
        aria-label="New chat"
      >
        <Edit size={16} />
      </button>
    </div>
  );
};

