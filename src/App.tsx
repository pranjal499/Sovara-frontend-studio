/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab, VaultDocument, ArtifactItem, ChatSession } from './types';
import { INITIAL_VAULT_DOCUMENTS, INITIAL_ARTIFACTS, RECENT_CHATS, INITIAL_CHAT_SESSIONS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { WindowBar } from './components/WindowBar';
import { MainChat } from './components/MainChat';
import { KnowledgeVault } from './components/KnowledgeVault';
import { ArtifactsView } from './components/ArtifactsView';
import { RightBar } from './components/RightBar';
import { SettingsModal } from './components/SettingsModal';
import { Toast } from './components/Toast';
import { Menu, Edit, Sparkles, Plus, BookOpen } from 'lucide-react';
import { SovaraSidebarLogo } from './components/SovaraLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [rightBarTab, setRightBarTab] = useState<'activity' | 'sources'>('activity');
  const [activeChatTitle, setActiveChatTitle] = useState('Help me with homework');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(INITIAL_CHAT_SESSIONS);
  const [chatSessionId, setChatSessionId] = useState<string>(() => `chat-${Date.now()}`);
  
  // Data collections with CRUD capabilities
  const [vaultDocs, setVaultDocs] = useState<VaultDocument[]>(INITIAL_VAULT_DOCUMENTS);
  const [artifacts, setArtifacts] = useState<ArtifactItem[]>(INITIAL_ARTIFACTS);
  
  // Modals & Feedback
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'download'>('success');

  // Detect mobile viewport
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (message: string, type: 'success' | 'download' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDownloadFile = (fileName: string) => {
    showToast(`Downloading ${fileName}...`, 'download');
    // Simulated real file download
    const element = document.createElement('a');
    const file = new Blob([`Sovara AI Exported Document: ${fileName}\nGenerated on ${new Date().toISOString()}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName.endsWith('.pdf') ? fileName.replace('.pdf', '.txt') : `${fileName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleAddVaultDocument = (newDoc: Omit<VaultDocument, 'id'>) => {
    const created: VaultDocument = {
      ...newDoc,
      id: `vault-${Date.now()}`,
    };
    setVaultDocs((prev) => [created, ...prev]);
    showToast(`Added "${created.name}" to Knowledge Vault`);
  };

  const handleUpdateVaultDocument = (updatedDoc: VaultDocument) => {
    setVaultDocs((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
    );
    showToast(`Updated "${updatedDoc.name}"`);
  };

  const handleDeleteVaultDocument = (id: string) => {
    setVaultDocs((prev) => prev.filter((d) => d.id !== id));
    showToast('Document permanently deleted from Knowledge Vault');
  };

  const handleDeleteArtifact = (id: string) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== id));
    showToast('Artifact deleted');
  };

  const handleOpenRightBar = (tab: 'activity' | 'sources') => {
    setRightBarTab(tab);
    setRightBarOpen(true);
  };

  const handleRenameChat = (id: string, newTitle: string) => {
    const target = chatSessions.find((c) => c.id === id);
    setChatSessions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
    if (target && activeChatTitle === target.title) {
      setActiveChatTitle(newTitle);
    }
    showToast(`Chat renamed to "${newTitle}"`);
  };

  const handlePinChat = (id: string) => {
    setChatSessions((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextPinned = !c.isPinned;
          showToast(nextPinned ? 'Chat pinned to top' : 'Chat unpinned');
          return { ...c, isPinned: nextPinned };
        }
        return c;
      })
    );
  };

  const handleArchiveChat = (id: string) => {
    const target = chatSessions.find((c) => c.id === id);
    if (!target) return;
    const nextArchived = !target.isArchived;
    setChatSessions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isArchived: nextArchived } : c))
    );
    showToast(nextArchived ? 'Chat moved to archive' : 'Chat restored from archive');
    if (nextArchived && activeChatTitle === target.title) {
      handleNewChat();
    }
  };

  const handleDeleteChat = (id: string) => {
    const target = chatSessions.find((c) => c.id === id);
    setChatSessions((prev) => prev.filter((c) => c.id !== id));
    showToast('Chat deleted');
    if (target && activeChatTitle === target.title) {
      handleNewChat();
    }
  };

  const handleNewChat = () => {
    setActiveChatTitle('New Chat');
    setChatSessionId(`chat-${Date.now()}`);
    setActiveTab('chat');
    setRightBarOpen(false);
    if (isMobile) setSidebarOpen(false);
  };

  const handleSelectChat = (chatTitle: string) => {
    if (chatTitle === 'New Chat') {
      handleNewChat();
      return;
    }
    setActiveChatTitle(chatTitle);
    setChatSessionId(`chat-${chatTitle}`);
    setActiveTab('chat');
    setRightBarOpen(false);
    if (isMobile) setSidebarOpen(false);
  };

  const getMobileHeaderTitle = () => {
    if (activeTab === 'chat') {
      return activeChatTitle === 'New Chat' ? 'Sovara' : activeChatTitle;
    }
    if (activeTab === 'vault') {
      return 'Knowledge Vault';
    }
    return 'Artifacts';
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0d] text-[#e4e4e7] antialiased">
      {/* Collapsible Sidebar (Drawer on mobile, spring collapsing column on desktop) */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (isMobile) setSidebarOpen(false);
        }}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeChatTitle={activeChatTitle}
        chatSessions={chatSessions}
        onRenameChat={handleRenameChat}
        onPinChat={handlePinChat}
        onArchiveChat={handleArchiveChat}
        onDeleteChat={handleDeleteChat}
        isMobile={isMobile}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden">
        {/* Sleek Mobile Navigation Header (Shown on < 768px devices) */}
        <header className="md:hidden flex items-center justify-between px-3.5 py-2.5 bg-[#0a0a0d] border-b border-[#181820] shrink-0 z-30 select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-[#94949f] hover:text-white hover:bg-[#16161e] transition-colors active:scale-95 shrink-0"
              title="Open menu"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            <button 
              onClick={() => {
                setActiveTab('chat');
              }}
              className="flex items-center gap-2 min-w-0 text-left"
            >
              <span className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate max-w-[160px] sm:max-w-xs">
                {getMobileHeaderTitle()}
              </span>
            </button>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {activeTab === 'chat' && (
              <>
                <button
                  onClick={() => handleOpenRightBar('activity')}
                  className="p-2 rounded-xl text-[#858592] hover:text-[#7adfd4] hover:bg-[#16161e] transition-colors active:scale-95"
                  title="View activity"
                  aria-label="View activity"
                >
                  <Sparkles size={16} />
                </button>

                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-xl text-[#858592] hover:text-white hover:bg-[#16161e] transition-colors active:scale-95"
                  title="New chat"
                  aria-label="New chat"
                >
                  <Edit size={16} />
                </button>
              </>
            )}

            {activeTab === 'vault' && (
              <button
                onClick={handleNewChat}
                className="p-2 rounded-xl text-[#858592] hover:text-white hover:bg-[#16161e] transition-colors active:scale-95"
                title="New chat"
              >
                <Edit size={16} />
              </button>
            )}

            {activeTab === 'artifacts' && (
              <button
                onClick={handleNewChat}
                className="p-2 rounded-xl text-[#858592] hover:text-white hover:bg-[#16161e] transition-colors active:scale-95"
                title="New chat"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
        </header>

        {/* Workspace Body */}
        <div className="flex-1 flex h-full min-w-0 relative overflow-hidden">
          {/* Collapsed sidebar trigger rail (≡ and ✏) for Desktop */}
          <WindowBar
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            onNewChat={handleNewChat}
            className="border-r border-[#1a1a22] bg-[#0c0c0f]"
          />

          {/* Dynamic Viewport Content */}
          <main className="flex-1 flex overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div
                  key={chatSessionId}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex overflow-hidden relative"
                >
                  <MainChat
                    key={chatSessionId}
                    chatTitle={activeChatTitle}
                    onOpenRightBar={handleOpenRightBar}
                    onDownloadFile={handleDownloadFile}
                    sidebarOpen={sidebarOpen}
                    onChatTitleUpdate={(newTitle) => {
                      setActiveChatTitle(newTitle);
                      setChatSessions((prev) => [
                        { id: `chat-${Date.now()}`, title: newTitle, isPinned: false, isArchived: false, createdAt: Date.now() },
                        ...prev.filter((c) => c.title !== newTitle),
                      ]);
                    }}
                  />
                </motion.div>
              )}

              {activeTab === 'vault' && (
                <motion.div
                  key="vault"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex overflow-hidden relative"
                >
                  <KnowledgeVault
                    documents={vaultDocs}
                    onAddDocument={handleAddVaultDocument}
                    onUpdateDocument={handleUpdateVaultDocument}
                    onDeleteDocument={handleDeleteVaultDocument}
                    onDownloadFile={handleDownloadFile}
                  />
                </motion.div>
              )}

              {activeTab === 'artifacts' && (
                <motion.div
                  key="artifacts"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex overflow-hidden relative"
                >
                  <ArtifactsView
                    artifacts={artifacts}
                    onSelectChatReference={(chatRef) => {
                      setActiveChatTitle(chatRef);
                      setActiveTab('chat');
                    }}
                    onDownloadFile={handleDownloadFile}
                    onDeleteArtifact={handleDeleteArtifact}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right Sliding Drawer for Activity & Sources */}
            <RightBar
              isOpen={rightBarOpen}
              onClose={() => setRightBarOpen(false)}
              defaultTab={rightBarTab}
              isMobile={isMobile}
            />
          </main>
        </div>
      </div>

      {/* Settings Dialog */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Notification Toast */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
