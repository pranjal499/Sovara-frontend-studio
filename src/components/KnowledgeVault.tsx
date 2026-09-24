import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Edit3, 
  Trash2, 
  UploadCloud, 
  Check, 
  X, 
  ChevronDown, 
  ArrowLeft,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Filter
} from 'lucide-react';
import { VaultDocument } from '../types';
import { DeleteModal } from './DeleteModal';

interface KnowledgeVaultProps {
  documents: VaultDocument[];
  onAddDocument: (doc: Omit<VaultDocument, 'id'>) => void;
  onUpdateDocument: (doc: VaultDocument) => void;
  onDeleteDocument: (id: string) => void;
  onDownloadFile: (fileName: string) => void;
}

type VaultViewMode = 'default' | 'view' | 'add' | 'edit';
type CategoryFilter = 'ALL' | 'STANDARD' | 'RULEBOOK' | 'MANUAL' | 'SOP' | 'GUIDELINE';

export const KnowledgeVault: React.FC<KnowledgeVaultProps> = ({
  documents,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
  onDownloadFile,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(
    documents.length > 0 ? documents[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [viewMode, setViewMode] = useState<VaultViewMode>(
    documents.length > 0 ? 'view' : 'default'
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states for Add / Edit
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('STANDARD');
  const [formDesc, setFormDesc] = useState('');
  const [formFileName, setFormFileName] = useState('Vendor_warrantyReport.pdf');
  const [formFileUploaded, setFormFileUploaded] = useState(false);

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const filteredDocs = useMemo(() => {
    return documents.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.typeBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        activeCategory === 'ALL' ||
        d.typeBadge.toUpperCase() === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [documents, searchQuery, activeCategory]);

  const handleStartAdd = () => {
    setFormName('');
    setFormType('STANDARD');
    setFormDesc('');
    setFormFileName('Vendor_warrantyReport.pdf');
    setFormFileUploaded(false);
    setViewMode('add');
  };

  const handleStartEdit = () => {
    if (!selectedDoc) return;
    setFormName(selectedDoc.name);
    setFormType(selectedDoc.typeBadge || 'RULEBOOK');
    setFormDesc(selectedDoc.description);
    setFormFileName(selectedDoc.fileName);
    setFormFileUploaded(true);
    setViewMode('edit');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (viewMode === 'add') {
      const newDoc: Omit<VaultDocument, 'id'> = {
        name: formName.trim(),
        pages: 84,
        uploadedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        typeBadge: formType.toUpperCase(),
        fileName: formFileName || 'Document_Attachment.pdf',
        comparisonType: '84 pages • Tabular comparison',
        description: formDesc.trim() || 'Comprehensive knowledge context document.',
      };
      onAddDocument(newDoc);
      setViewMode('view');
    } else if (viewMode === 'edit' && selectedDoc) {
      onUpdateDocument({
        ...selectedDoc,
        name: formName.trim(),
        typeBadge: formType.toUpperCase(),
        description: formDesc.trim(),
      });
      setViewMode('view');
    }
  };

  const handleCancelForm = () => {
    if (selectedDoc) {
      setViewMode('view');
    } else {
      setViewMode('default');
    }
  };

  const confirmDelete = () => {
    if (selectedDoc) {
      onDeleteDocument(selectedDoc.id);
      setIsDeleteModalOpen(false);
      const remaining = documents.filter((d) => d.id !== selectedDoc.id);
      if (remaining.length > 0) {
        setSelectedDocId(remaining[0].id);
        setViewMode('view');
      } else {
        setSelectedDocId(null);
        setViewMode('default');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full bg-[#09090c] overflow-hidden select-none">
      {/* LEFT COLUMN: Clean Master Document Explorer */}
      <aside className={`w-full md:w-[360px] lg:w-[400px] h-full flex flex-col bg-[#0b0b0f] border-r border-[#15151a] shrink-0 ${
        viewMode !== 'default' && viewMode !== 'view' ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Header section with minimal lines */}
        <div className="p-5 pb-3 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white tracking-tight">
                Knowledge Vault
              </h1>
              <p className="text-[12px] text-[#6b6b77] mt-0.5">
                {documents.length} verified context source{documents.length === 1 ? '' : 's'}
              </p>
            </div>

            <button
              onClick={handleStartAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16161e] hover:bg-[#20202b] text-[#7adfd4] hover:text-[#99ece4] text-xs font-medium transition-all shadow-sm active:scale-95"
              title="Add document to vault"
            >
              <Plus size={14} className="stroke-[2.5]" />
              <span>Add</span>
            </button>
          </div>

          {/* Clean borderless search bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a5a66]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, type or content..."
              className="w-full bg-[#111116] border border-[#1a1a22] rounded-xl pl-9 pr-4 py-2 text-xs text-[#e4e4e7] placeholder-[#555562] focus:outline-none focus:border-[#7adfd4]/30 focus:bg-[#13131a] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#646470] hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Subtle horizontal category filter pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none pt-0.5">
            {(['ALL', 'STANDARD', 'RULEBOOK', 'MANUAL', 'SOP'] as CategoryFilter[]).map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 ${
                    active
                      ? 'bg-[#1c1c26] text-white shadow-xs'
                      : 'text-[#6c6c78] hover:text-[#b4b4be] hover:bg-[#121217]'
                  }`}
                >
                  {cat === 'ALL' ? 'All Files' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Documents List: Clean floating cards with smooth spacing, no harsh dividing lines */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {filteredDocs.length === 0 ? (
            <div className="h-60 flex flex-col items-center justify-center p-6 text-center text-[#636370]">
              <FileText size={28} className="stroke-[1.5] text-[#33333d] mb-2" />
              <div className="text-xs font-medium text-[#9999a6]">No matching documents</div>
              <div className="text-[11px] text-[#555562] mt-0.5">Try searching with a different term</div>
            </div>
          ) : (
            filteredDocs.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    setViewMode('view');
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 relative group ${
                    isSelected
                      ? 'bg-[#15151e] text-white shadow-sm ring-1 ring-[#7adfd4]/25'
                      : 'text-[#a1a1aa] hover:bg-[#111116] hover:text-[#e4e4e7]'
                  }`}
                >
                  {/* Subtle document icon */}
                  <div className={`mt-0.5 p-2 rounded-lg shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#1d2228] text-[#7adfd4]'
                      : 'bg-[#131318] text-[#636372] group-hover:text-[#a0a0b0]'
                  }`}>
                    <FileText size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[13px] font-medium truncate ${isSelected ? 'text-white' : 'text-[#d0d0d8]'}`}>
                        {doc.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#656573]">
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.2 rounded bg-[#171720] text-[#8e8e9c]">
                        {doc.typeBadge}
                      </span>
                      <span>•</span>
                      <span>{doc.pages} pages</span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* RIGHT COLUMN: Professional Content Canvas */}
      <main className={`flex-1 h-full overflow-y-auto p-6 md:p-10 lg:p-12 ${
        viewMode !== 'default' && viewMode !== 'view' ? 'flex' : 'hidden md:flex'
      } flex-col bg-[#09090c]`}>
        {/* STATE 1: Empty / Default canvas */}
        {viewMode === 'default' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#121218] flex items-center justify-center text-[#7adfd4] mb-4">
              <Sparkles size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">
              Knowledge Context Vault
            </h2>
            <p className="text-xs text-[#71717d] leading-relaxed mb-6">
              Add manuals, rulebooks, architectural blueprints, and standards to give Sovara domain expertise for personalized reasoning.
            </p>
            <button
              onClick={handleStartAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7adfd4] hover:bg-[#6bd0c5] text-black text-xs font-semibold transition-all shadow-md shadow-[#7adfd4]/10 active:scale-95"
            >
              <Plus size={15} />
              <span>Add first document</span>
            </button>
          </div>
        )}

        {/* STATE 2: Document Inspection View */}
        {viewMode === 'view' && selectedDoc && (
          <div className="max-w-3xl w-full mx-auto space-y-7">
            {/* Top Toolbar: Clean, distraction-free actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setViewMode('default')}
                className="md:hidden flex items-center gap-1.5 text-xs text-[#8c8c99] hover:text-white"
              >
                <ArrowLeft size={14} />
                <span>Documents</span>
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleStartEdit}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14141a] hover:bg-[#1a1a24] text-xs font-medium text-[#d4d4dc] hover:text-white transition-all"
                  title="Edit document details"
                >
                  <Edit3 size={13} className="text-[#8e8e9e]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14141a] hover:bg-[#201114] text-xs font-medium text-[#8f8f9e] hover:text-[#f87171] transition-all"
                  title="Remove document from vault"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Document Title & Badge Metadata */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-[#181824] text-[#7adfd4]">
                  {selectedDoc.typeBadge}
                </span>
                <span className="text-xs text-[#5f5f6d] flex items-center gap-1">
                  <Calendar size={12} />
                  Uploaded on {selectedDoc.uploadedDate}
                </span>
                <span className="text-[#3b3b44]">•</span>
                <span className="text-xs text-[#5f5f6d] flex items-center gap-1">
                  <Layers size={12} />
                  {selectedDoc.pages} pages verified
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-white tracking-tight leading-snug">
                {selectedDoc.name}
              </h2>
            </div>

            {/* File Attachment Card: Clean, modern card */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#111116] hover:bg-[#13131a] transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-2.5 rounded-xl bg-[#171920] text-[#7adfd4] shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {selectedDoc.fileName}
                  </div>
                  <div className="text-xs text-[#6a6a78] mt-0.5">
                    {selectedDoc.comparisonType || 'Standard specification • Cross-indexed'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDownloadFile(selectedDoc.fileName)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181822] hover:bg-[#222230] text-xs font-medium text-white transition-all shrink-0 ml-3"
              >
                <Download size={13} className="text-[#7adfd4]" />
                <span>Download</span>
              </button>
            </div>

            {/* Document Context / Description */}
            <div className="space-y-2.5">
              <div className="text-xs font-medium text-[#7a7a88] tracking-wide uppercase flex items-center gap-1.5">
                <Info size={13} />
                <span>Description & AI Context</span>
              </div>
              <div className="p-5 rounded-xl bg-[#111115] text-[13.5px] leading-relaxed text-[#c6c6d0] font-normal">
                {selectedDoc.description}
              </div>
            </div>

            {/* Context Insights Pill Note */}
            <div className="p-3.5 rounded-xl bg-[#0f1418] text-xs text-[#8ab4b0] flex items-center gap-2.5">
              <Sparkles size={15} className="text-[#7adfd4] shrink-0" />
              <span>Available in real-time chat reasoning across all queries and artifact workflows.</span>
            </div>
          </div>
        )}

        {/* STATE 3: Add Document Form */}
        {viewMode === 'add' && (
          <form onSubmit={handleSaveForm} className="max-w-2xl w-full mx-auto space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Add Knowledge Document
              </h2>
              <p className="text-xs text-[#6e6e7c] mt-1">
                Upload context to enhance model accuracy with specific rulebooks and specifications.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9a9aa8]">
                Document Name
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. ISO-27001 Security Standard Specification"
                className="w-full bg-[#111116] border border-[#1b1b24] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#50505d] focus:outline-none focus:border-[#7adfd4]/40 transition-colors"
              />
            </div>

            {/* File dropzone & type selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div 
                onClick={() => setFormFileUploaded(true)}
                className={`flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer ${
                  formFileUploaded 
                    ? 'bg-[#101b1a] text-[#7adfd4]'
                    : 'bg-[#111116] hover:bg-[#14141c] text-[#8e8e9c]'
                }`}
              >
                <div className="p-2 rounded-lg bg-[#161622] text-[#7adfd4]">
                  <UploadCloud size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white truncate">
                    {formFileUploaded ? formFileName : 'Choose attachment'}
                  </div>
                  <div className="text-[11px] text-[#61616f]">
                    PDF, DOCX, TXT up to 100MB
                  </div>
                </div>
              </div>

              {/* Category Selector */}
              <div className="relative">
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full h-full bg-[#111116] border border-[#1b1b24] rounded-xl px-4 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-[#7adfd4]/40 transition-colors"
                >
                  <option value="STANDARD">Standard</option>
                  <option value="RULEBOOK">Rulebook</option>
                  <option value="MANUAL">Manual</option>
                  <option value="SOP">SOP</option>
                  <option value="GUIDELINE">Guideline</option>
                </select>
                <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#686875] pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9a9aa8]">
                Context Description
              </label>
              <textarea
                required
                rows={5}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Summarize the key directives, regulations, or tables included in this file..."
                className="w-full bg-[#111116] border border-[#1b1b24] rounded-xl p-4 text-xs md:text-sm text-white placeholder-[#50505d] focus:outline-none focus:border-[#7adfd4]/40 transition-colors leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7adfd4] hover:bg-[#6bd0c5] text-black text-xs font-semibold transition-all shadow-md shadow-[#7adfd4]/10 active:scale-98"
              >
                <Check size={14} className="stroke-[2.5]" />
                <span>Save to Vault</span>
              </button>

              <button
                type="button"
                onClick={handleCancelForm}
                className="px-4 py-2.5 rounded-xl bg-[#14141a] hover:bg-[#1a1a24] text-[#8e8e9c] hover:text-white text-xs font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* STATE 4: Edit Document Form */}
        {viewMode === 'edit' && selectedDoc && (
          <form onSubmit={handleSaveForm} className="max-w-2xl w-full mx-auto space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Edit Knowledge Document
              </h2>
              <p className="text-xs text-[#6e6e7c] mt-1">
                Update document metadata and context description.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9a9aa8]">
                Document Name
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-[#111116] border border-[#1b1b24] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7adfd4]/40 transition-colors"
              />
            </div>

            {/* File info + Category Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#111116]">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText size={16} className="text-[#7adfd4] shrink-0" />
                  <span className="text-xs font-medium text-white truncate">
                    {formFileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onDownloadFile(formFileName)}
                  className="p-1 text-[#71717a] hover:text-white"
                  title="Download file"
                >
                  <Download size={13} />
                </button>
              </div>

              <div className="relative">
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full h-full bg-[#111116] border border-[#1b1b24] rounded-xl px-4 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-[#7adfd4]/40 transition-colors"
                >
                  <option value="STANDARD">Standard</option>
                  <option value="RULEBOOK">Rulebook</option>
                  <option value="MANUAL">Manual</option>
                  <option value="SOP">SOP</option>
                  <option value="GUIDELINE">Guideline</option>
                </select>
                <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#686875] pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#9a9aa8]">
                Context Description
              </label>
              <textarea
                required
                rows={5}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="w-full bg-[#111116] border border-[#1b1b24] rounded-xl p-4 text-xs md:text-sm text-white focus:outline-none focus:border-[#7adfd4]/40 transition-colors leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7adfd4] hover:bg-[#6bd0c5] text-black text-xs font-semibold transition-all shadow-md shadow-[#7adfd4]/10 active:scale-98"
              >
                <Check size={14} className="stroke-[2.5]" />
                <span>Save Changes</span>
              </button>

              <button
                type="button"
                onClick={handleCancelForm}
                className="px-4 py-2.5 rounded-xl bg-[#14141a] hover:bg-[#1a1a24] text-[#8e8e9c] hover:text-white text-xs font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={confirmDelete}
        onSwitchToEdit={() => {
          setIsDeleteModalOpen(false);
          handleStartEdit();
        }}
        documentTitle={selectedDoc?.name}
      />
    </div>
  );
};
