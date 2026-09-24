import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  UploadCloud, 
  Check, 
  X,
  ChevronDown,
  ArrowLeft
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

  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.typeBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAdd = () => {
    setFormName('');
    setFormType('Standard');
    setFormDesc('');
    setFormFileName('Vendor_warrantyReport.pdf');
    setFormFileUploaded(false);
    setViewMode('add');
  };

  const handleStartEdit = () => {
    if (!selectedDoc) return;
    setFormName(selectedDoc.name);
    setFormType(selectedDoc.typeBadge || 'Rulebook');
    setFormDesc(selectedDoc.description);
    setFormFileName(selectedDoc.fileName);
    setFormFileUploaded(true);
    setViewMode('edit');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (viewMode === 'add') {
      onAddDocument({
        name: formName.trim(),
        pages: 84,
        uploadedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        typeBadge: formType.toUpperCase(),
        fileName: formFileName || 'Document_Attachment.pdf',
        comparisonType: '84 pages • Tabular comparison',
        description: formDesc.trim() || 'Comprehensive knowledge context document.',
      });
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
    <div className="flex-1 flex flex-col md:flex-row h-full bg-[#0a0a0d] overflow-hidden select-none">
      {/* LEFT COLUMN: Document List & Search */}
      <div className={`w-full md:w-[380px] lg:w-[420px] h-full flex flex-col border-r border-[#1a1a20] bg-[#0c0c0f] ${
        viewMode !== 'default' && viewMode !== 'view' ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-5 md:p-6 pb-4 space-y-4 border-b border-[#18181e]">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Knowledge vault
            </h1>
            <p className="text-[12px] text-[#71717a] mt-1">
              Manuals, rulebooks, SOPs, Guidelines • Any file • Any format
            </p>
          </div>

          {/* Add Knowledge Button */}
          <button
            onClick={handleStartAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#141418] hover:bg-[#1c1c22] border border-[#2a2a35] text-sm font-medium text-white transition-all shadow-sm active:scale-[0.99]"
          >
            <Plus size={16} />
            <span>Add knowledge</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search local files"
              className="w-full bg-[#141418] border border-[#22222a] rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-[#e4e4e7] placeholder-[#64646f] focus:outline-none focus:border-[#3c3c4a] transition-colors"
            />
          </div>
        </div>

        {/* Documents Scroll List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#16161c]">
          {filteredDocs.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center p-6 text-center">
              <div className="text-sm font-semibold text-white mb-1">
                No documents found
              </div>
              <div className="text-xs text-[#71717a]">
                Uploaded documents will be displayed here
              </div>
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
                  className={`w-full text-left p-4.5 transition-colors flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#15151b] border-l-2 border-[#7adfd4]'
                      : 'hover:bg-[#111116]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] md:text-sm font-medium text-white/90 truncate">
                      {doc.name}
                    </div>
                    <div className="text-xs text-[#71717a] mt-0.5">
                      {doc.pages} pages • uploaded on {doc.uploadedDate}
                    </div>
                  </div>

                  <span className="shrink-0 px-2.5 py-0.5 rounded-full border border-[#2b2b36] text-[10px] font-semibold tracking-wider text-[#a1a1aa] bg-[#121217]">
                    {doc.typeBadge || 'STANDARD'}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Views & Forms */}
      <div className={`flex-1 h-full overflow-y-auto p-6 md:p-10 lg:p-12 ${
        viewMode !== 'default' && viewMode !== 'view' ? 'flex' : 'hidden md:flex'
      } flex-col`}>
        {/* STATE 1: Empty / Default prompt */}
        {viewMode === 'default' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Add documents to the knowledge vault
            </h2>
            <p className="text-xs md:text-sm text-[#71717a] leading-relaxed mb-6">
              Local knowledge helps to store context and provide personalized outputs without uploading files everytime
            </p>
            <button
              onClick={handleStartAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141418] hover:bg-[#1e1e26] border border-[#2c2c36] text-xs md:text-sm font-medium text-white transition-all active:scale-[0.98]"
            >
              <Plus size={16} />
              <span>Add knowledge</span>
            </button>
          </div>
        )}

        {/* STATE 2: Document File View (vault_FileView.svg) */}
        {viewMode === 'view' && selectedDoc && (
          <div className="max-w-3xl w-full mx-auto space-y-6">
            {/* Top Bar with Edit Button & Mobile Back */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setViewMode('default')}
                className="md:hidden flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-white"
              >
                <ArrowLeft size={15} />
                <span>Back to list</span>
              </button>

              <button
                onClick={handleStartEdit}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2b2b36] hover:bg-[#1a1a22] text-xs font-medium text-[#e4e4e7] transition-all"
              >
                <Edit size={13} />
                <span>Edit</span>
              </button>
            </div>

            {/* Document Title Header */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {selectedDoc.name}
              </h2>
              <p className="text-xs text-[#71717a] mt-1">
                {selectedDoc.pages} pages • uploaded on {selectedDoc.uploadedDate}
              </p>
            </div>

            {/* Attached File Card */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121217] border border-[#22222b]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#181820] text-[#7adfd4]">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {selectedDoc.fileName}
                  </div>
                  <div className="text-xs text-[#71717a]">
                    {selectedDoc.comparisonType || '69 pages • Tabular comparison'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDownloadFile(selectedDoc.fileName)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a22] hover:bg-[#242430] text-xs font-medium text-[#e4e4e7] border border-[#2c2c38] transition-all"
              >
                <Download size={13} />
                <span>Download</span>
              </button>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#848490]">
                File Description
              </label>
              <div className="p-4 rounded-xl bg-[#141419] border border-[#24242f] text-xs md:text-[13px] leading-relaxed text-[#c4c4cc]">
                {selectedDoc.description}
              </div>
            </div>

            {/* Delete Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#dc2626]/60 bg-[#160b0d]/70 hover:bg-[#280d11] text-xs font-semibold text-white hover:border-[#ef4444] transition-all"
              >
                <Trash2 size={14} className="text-[#ef4444]" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* STATE 3: Add / Upload Document Form (vault_Addfile.svg) */}
        {viewMode === 'add' && (
          <form onSubmit={handleSaveForm} className="max-w-3xl w-full mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Upload Document
            </h2>

            {/* File Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#c4c4cc]">
                File Name*
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Document Title"
                className="w-full bg-[#141419] border border-[#24242f] rounded-xl px-4 py-3 text-sm text-white placeholder-[#686873] focus:outline-none focus:border-[#3e3e4f]"
              />
            </div>

            {/* Upload Area & File Type Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* File Dropzone */}
              <div 
                onClick={() => setFormFileUploaded(true)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border border-dashed transition-all cursor-pointer ${
                  formFileUploaded 
                    ? 'border-[#7adfd4]/60 bg-[#121a19]'
                    : 'border-[#262633] bg-[#141419] hover:border-[#383846]'
                }`}
              >
                <div className="p-2 rounded-lg bg-[#181822] text-[#7adfd4]">
                  <UploadCloud size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {formFileUploaded ? formFileName : 'Choose file to upload'}
                  </div>
                  <div className="text-[11px] text-[#71717a]">
                    Any format • 100MB Max.
                  </div>
                </div>
              </div>

              {/* File Type Dropdown */}
              <div className="relative">
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full h-full bg-[#141419] border border-[#24242f] rounded-xl px-4 py-3 text-xs md:text-sm text-white appearance-none focus:outline-none focus:border-[#3e3e4f]"
                >
                  <option value="STANDARD">Standard</option>
                  <option value="RULEBOOK">Rulebook</option>
                  <option value="MANUAL">Manual</option>
                  <option value="SOP">SOP</option>
                  <option value="GUIDELINE">Guideline</option>
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
            </div>

            {/* File Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#c4c4cc]">
                File Description*
              </label>
              <textarea
                required
                rows={5}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Describe your document for better understanding(at least 200 characters)"
                className="w-full bg-[#141419] border border-[#24242f] rounded-xl p-4 text-xs md:text-sm text-white placeholder-[#686873] focus:outline-none focus:border-[#3e3e4f]"
              />
            </div>

            {/* Action Buttons: Save & Cancel */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#16a34a] bg-[#0c1f13] hover:bg-[#122e1c] text-[#4ade80] text-xs font-semibold transition-all"
              >
                <Check size={14} />
                <span>Save</span>
              </button>

              <button
                type="button"
                onClick={handleCancelForm}
                className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#dc2626] bg-[#220d11] hover:bg-[#301016] text-[#f87171] text-xs font-semibold transition-all"
              >
                <X size={14} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}

        {/* STATE 4: Edit Document Form (vault_EditFile.svg) */}
        {viewMode === 'edit' && selectedDoc && (
          <form onSubmit={handleSaveForm} className="max-w-3xl w-full mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Edit Document
            </h2>

            {/* File Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#c4c4cc]">
                File Name*
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-[#141419] border border-[#24242f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3e3e4f]"
              />
            </div>

            {/* File Card + Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121217] border border-[#22222b]">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText size={16} className="text-[#7adfd4] shrink-0" />
                  <span className="text-xs font-medium text-white truncate">
                    {formFileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onDownloadFile(formFileName)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1a1a22] text-[11px] text-[#e4e4e7] border border-[#2c2c38] shrink-0"
                >
                  <Download size={11} />
                  <span>Download</span>
                </button>
              </div>

              <div className="relative">
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full h-full bg-[#141419] border border-[#24242f] rounded-xl px-4 py-3 text-xs md:text-sm text-white appearance-none focus:outline-none focus:border-[#3e3e4f]"
                >
                  <option value="STANDARD">Standard</option>
                  <option value="RULEBOOK">Rulebook</option>
                  <option value="MANUAL">Manual</option>
                  <option value="SOP">SOP</option>
                  <option value="GUIDELINE">Guideline</option>
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
              </div>
            </div>

            {/* File Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#c4c4cc]">
                File Description*
              </label>
              <textarea
                required
                rows={5}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="w-full bg-[#141419] border border-[#24242f] rounded-xl p-4 text-xs md:text-sm text-white focus:outline-none focus:border-[#3e3e4f]"
              />
            </div>

            {/* Action Buttons: Save & Cancel */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#16a34a] bg-[#0c1f13] hover:bg-[#122e1c] text-[#4ade80] text-xs font-semibold transition-all"
              >
                <Check size={14} />
                <span>Save</span>
              </button>

              <button
                type="button"
                onClick={handleCancelForm}
                className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#dc2626] bg-[#220d11] hover:bg-[#301016] text-[#f87171] text-xs font-semibold transition-all"
              >
                <X size={14} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}
      </div>

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
