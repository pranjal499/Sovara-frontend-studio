/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, VaultDocument, ArtifactItem } from './types';
import { INITIAL_VAULT_DOCUMENTS, INITIAL_ARTIFACTS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { WindowBar } from './components/WindowBar';
import { MainChat } from './components/MainChat';
import { KnowledgeVault } from './components/KnowledgeVault';
import { ArtifactsView } from './components/ArtifactsView';
import { RightBar } from './components/RightBar';
import { SettingsModal } from './components/SettingsModal';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [rightBarTab, setRightBarTab] = useState<'activity' | 'sources'>('activity');
  const [activeChatTitle, setActiveChatTitle] = useState('Help me with homework');
  
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

  const handleSelectChat = (chatTitle: string) => {
    setActiveChatTitle(chatTitle);
    setActiveTab('chat');
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0d] text-[#e4e4e7] antialiased">
      {/* Collapsible Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (isMobile) setSidebarOpen(false);
        }}
        onSelectChat={handleSelectChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeChatTitle={activeChatTitle}
        isMobile={isMobile}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex h-full min-w-0 relative overflow-hidden">
        {/* Collapsed sidebar trigger rail (≡ and ✏) when sidebar is closed */}
        <WindowBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onNewChat={() => handleSelectChat('New Chat')}
          className="border-r border-[#1a1a22] bg-[#0c0c0f]"
        />

        {/* Dynamic Viewport Content */}
        <main className="flex-1 flex overflow-hidden relative">
          {activeTab === 'chat' && (
            <MainChat
              chatTitle={activeChatTitle}
              onOpenRightBar={handleOpenRightBar}
              onDownloadFile={handleDownloadFile}
              sidebarOpen={sidebarOpen}
            />
          )}

          {activeTab === 'vault' && (
            <KnowledgeVault
              documents={vaultDocs}
              onAddDocument={handleAddVaultDocument}
              onUpdateDocument={handleUpdateVaultDocument}
              onDeleteDocument={handleDeleteVaultDocument}
              onDownloadFile={handleDownloadFile}
            />
          )}

          {activeTab === 'artifacts' && (
            <ArtifactsView
              artifacts={artifacts}
              onSelectChatReference={(chatRef) => {
                setActiveChatTitle(chatRef);
                setActiveTab('chat');
              }}
              onDownloadFile={handleDownloadFile}
              onDeleteArtifact={handleDeleteArtifact}
            />
          )}

          {/* Right Sliding Drawer for Activity & Sources */}
          <RightBar
            isOpen={rightBarOpen}
            onClose={() => setRightBarOpen(false)}
            defaultTab={rightBarTab}
            isMobile={isMobile}
          />
        </main>
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
