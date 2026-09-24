import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Download, 
  MoreHorizontal, 
  ExternalLink, 
  FileText, 
  Image as ImageIcon,
  Eye,
  Copy,
  Trash2,
  FileCode,
  Check,
  X,
  FileSpreadsheet,
  File,
  Sparkles,
  Layers
} from 'lucide-react';
import { ArtifactItem } from '../types';

interface ArtifactsViewProps {
  artifacts: ArtifactItem[];
  onSelectChatReference: (chatRef: string) => void;
  onDownloadFile: (fileName: string) => void;
  onDeleteArtifact?: (id: string) => void;
}

type FilterType = 'All' | 'PDF' | 'Docx' | 'PPT' | 'Code' | '.Md' | 'Txt';

export const ArtifactsView: React.FC<ArtifactsViewProps> = ({
  artifacts,
  onSelectChatReference,
  onDownloadFile,
  onDeleteArtifact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filterTabs: FilterType[] = ['All', 'PDF', 'Docx', 'PPT', 'Code', '.Md', 'Txt'];

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter((art) => {
      const matchesFilter = selectedFilter === 'All' || art.fileType.toLowerCase() === selectedFilter.toLowerCase();
      const matchesSearch =
        art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.chatReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.fileType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [artifacts, selectedFilter, searchQuery]);

  const handleCopyLink = (id: string, name: string) => {
    navigator.clipboard.writeText(`https://sovara.ai/artifacts/${id}/${encodeURIComponent(name)}`);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
      setActiveMenuId(null);
    }, 1500);
  };

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type.includes('code')) {
      return <FileCode size={16} className="text-[#7adfd4]" />;
    }
    if (type.includes('pdf')) {
      return <FileText size={16} className="text-[#f87171]" />;
    }
    if (type.includes('docx')) {
      return <FileText size={16} className="text-[#60a5fa]" />;
    }
    if (type.includes('ppt')) {
      return <FileSpreadsheet size={16} className="text-[#fb923c]" />;
    }
    if (type.includes('image') || type.includes('png') || type.includes('svg')) {
      return <ImageIcon size={16} className="text-[#c084fc]" />;
    }
    return <File size={16} className="text-[#94a3b8]" />;
  };

  const getBadgeStyle = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type.includes('code')) return 'bg-[#7adfd4]/10 text-[#7adfd4]';
    if (type.includes('pdf')) return 'bg-[#ef4444]/10 text-[#fca5a5]';
    if (type.includes('docx')) return 'bg-[#3b82f6]/10 text-[#93c5fd]';
    if (type.includes('ppt')) return 'bg-[#f97316]/10 text-[#fdba74]';
    return 'bg-[#272732] text-[#a1a1aa]';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090c] overflow-y-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 select-none">
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
        {/* Header section with refined typography and breathing room */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Artifacts
              </h1>
              <p className="text-xs sm:text-[13px] text-[#71717e] mt-1.5">
                Outputs, generated documents, and synthesized assets produced by Sovara
              </p>
            </div>

            <div className="text-xs text-[#555562] font-mono">
              {filteredArtifacts.length} {filteredArtifacts.length === 1 ? 'file' : 'files'}
            </div>
          </div>
        </div>

        {/* Unconstrained Control Bar: Search and Categorization */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 mb-8">
          {/* Minimalist Search Box */}
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#565664]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artifacts..."
              className="w-full bg-[#111116] border border-[#1b1b24] rounded-xl pl-9 pr-8 py-2 text-xs text-[#e4e4e7] placeholder-[#50505d] focus:outline-none focus:border-[#7adfd4]/35 focus:bg-[#13131a] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#656574] hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Minimalist Filter Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const isSelected = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#181822] text-white shadow-xs'
                      : 'text-[#6e6e7d] hover:text-[#c4c4cf] hover:bg-[#111116]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Free-Flowing Listings (No enclosing box container) */}
        {filteredArtifacts.length === 0 ? (
          /* Free Empty State */
          <div className="flex-1 min-h-[360px] flex flex-col items-center justify-center text-center px-4 py-16">
            <div className="w-14 h-14 rounded-2xl bg-[#121218] flex items-center justify-center text-[#555566] mb-4">
              <Layers size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white/90 tracking-tight">
              No artifacts found
            </h3>
            <p className="text-xs text-[#6e6e7d] mt-1.5 max-w-sm leading-relaxed">
              Files generated during your chat sessions will appear here freely accessible for preview and download.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Clean Column Headers in Free Flow */}
            <div className="grid grid-cols-12 gap-4 px-4 pb-3 text-[11px] font-medium uppercase tracking-wider text-[#555562]">
              <div className="col-span-12 sm:col-span-5">Name</div>
              <div className="hidden sm:block sm:col-span-2">Format</div>
              <div className="hidden md:block md:col-span-2">Generated</div>
              <div className="col-span-7 sm:col-span-3 md:col-span-2">Origin Chat</div>
              <div className="col-span-5 sm:col-span-2 md:col-span-1 text-right">Actions</div>
            </div>

            {/* Free Floating List Items with Generous Padding and Spacing */}
            <div className="space-y-1.5">
              {filteredArtifacts.map((art) => (
                <div
                  key={art.id}
                  className="grid grid-cols-12 gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-[#111116] transition-all group"
                >
                  {/* File Name & Icon */}
                  <div className="col-span-12 sm:col-span-5 flex items-center gap-3.5 min-w-0">
                    <div className="p-2.5 rounded-xl bg-[#14141c] shrink-0 group-hover:bg-[#181822] transition-colors">
                      {getFileIcon(art.fileType)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-medium text-white/95 truncate group-hover:text-white transition-colors">
                        {art.name}
                      </div>
                      <div className="text-[11px] text-[#636373] mt-0.5 flex items-center gap-2">
                        <span>{art.pages} pages</span>
                        <span>•</span>
                        <span>{art.uploadedDate}</span>
                        <span className="sm:hidden font-mono uppercase text-[10px] text-[#717180]">
                          ({art.fileType})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Format Badge */}
                  <div className="hidden sm:flex sm:col-span-2 items-center">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide uppercase ${getBadgeStyle(art.fileType)}`}>
                      {art.fileType}
                    </span>
                  </div>

                  {/* Generated Date */}
                  <div className="hidden md:block md:col-span-2 text-xs text-[#6e6e7c]">
                    {art.generatedOn}
                  </div>

                  {/* Origin Chat Reference Link */}
                  <div className="col-span-7 sm:col-span-3 md:col-span-2 min-w-0">
                    <button
                      onClick={() => onSelectChatReference(art.chatReference)}
                      className="flex items-center gap-1.5 text-xs text-[#8e8e9c] hover:text-[#7adfd4] transition-colors truncate max-w-full text-left group/link"
                      title={`Jump to chat: ${art.chatReference}`}
                    >
                      <span className="truncate">{art.chatReference}</span>
                      <ExternalLink size={11} className="shrink-0 opacity-40 group-hover/link:opacity-100 transition-opacity" />
                    </button>
                  </div>

                  {/* Action Controls */}
                  <div className="col-span-5 sm:col-span-2 md:col-span-1 flex items-center justify-end gap-1 relative">
                    <button
                      onClick={() => onDownloadFile(`${art.name}.${art.fileType.toLowerCase()}`)}
                      className="p-2 rounded-lg text-[#686878] hover:text-white hover:bg-[#181822] transition-all"
                      title="Download file"
                      aria-label="Download file"
                    >
                      <Download size={14} />
                    </button>

                    <button
                      onClick={() => setActiveMenuId(activeMenuId === art.id ? null : art.id)}
                      className="p-2 rounded-lg text-[#686878] hover:text-white hover:bg-[#181822] transition-all"
                      title="More options"
                      aria-label="More options"
                    >
                      <MoreHorizontal size={14} />
                    </button>

                    {/* Clean Dropdown Menu */}
                    <AnimatePresence>
                      {activeMenuId === art.id && (
                        <>
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setActiveMenuId(null)}
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -4 }}
                            transition={{ duration: 0.12 }}
                            className="absolute right-0 top-10 z-40 w-44 bg-[#13131a] border border-[#20202b] rounded-xl shadow-xl py-1 text-xs select-none"
                          >
                            <button
                              onClick={() => {
                                onDownloadFile(art.name);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-[#c6c6d2] hover:text-white hover:bg-[#1a1a24] transition-colors text-left"
                            >
                              <Eye size={13} className="text-[#888898]" />
                              <span>Preview</span>
                            </button>

                            <button
                              onClick={() => {
                                onDownloadFile(`${art.name}.${art.fileType.toLowerCase()}`);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-[#c6c6d2] hover:text-white hover:bg-[#1a1a24] transition-colors text-left"
                            >
                              <Download size={13} className="text-[#888898]" />
                              <span>Download</span>
                            </button>

                            <button
                              onClick={() => handleCopyLink(art.id, art.name)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-[#c6c6d2] hover:text-white hover:bg-[#1a1a24] transition-colors text-left"
                            >
                              {copiedId === art.id ? (
                                <Check size={13} className="text-[#7adfd4]" />
                              ) : (
                                <Copy size={13} className="text-[#888898]" />
                              )}
                              <span>{copiedId === art.id ? 'Copied Link' : 'Copy link'}</span>
                            </button>

                            {onDeleteArtifact && (
                              <button
                                onClick={() => {
                                  onDeleteArtifact(art.id);
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-[#f87171] hover:text-[#fca5a5] hover:bg-[#201014] transition-colors text-left border-t border-[#1c1c26] mt-1"
                              >
                                <Trash2 size={13} />
                                <span>Delete artifact</span>
                              </button>
                            )}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
