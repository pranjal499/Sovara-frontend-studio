import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ZoomIn,
  ZoomOut,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  ChevronDown
} from 'lucide-react';

export interface DocumentViewerProps {
  documentName?: string;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (docName: string) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentName = 'SOVARA_Demo_Script',
  isOpen,
  onClose,
  onDownload,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(documentName);

  // Synchronize active tab whenever documentName prop changes
  useEffect(() => {
    if (documentName) {
      setActiveTab(documentName);
    }
  }, [documentName]);

  // Handle ESC key to smoothly dismiss document viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 175));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 60));
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(`${activeTab}.pdf`);
    } else {
      // Default download simulation
      const element = document.createElement('a');
      const file = new Blob([
        `SOVARA Demo Video Script\n1:40 demo Â· Voiceover + screen direction\n\n0:00-0:03\nSOVARA opens\nVoiceover: This is SOVARA, our sovereign AI workbench for processing sensitive organizational data locally.\nOn screen: Show the SOVARA window opening.\n\n0:03-0:08\nPrompt + file upload\nVoiceover: We start with a natural-language request and provide the information SOVARA needs, here using both a PDF and an image.\nOn screen: Enter the prompt, then upload the PDF and image.\n\n0:08-0:15\nSubmit the task\nVoiceover: Once we submit the task, SOVARA analyzes the request, identifies the required capabilities, and routes the work to the appropriate local models and tools.\nOn screen: Press "Analyze with SOVARA."\n\n0:15-0:20\nProcessing\nVoiceover: The workflow then runs through document processing, vision analysis, reasoning, retrieval, verification, and final response generation.\nOn screen: Trim the actual processing time. Show only a short portion of the processing state.\n\n0:20-0:36\nAnalysis Result\nVoiceover: SOVARA returns a fully grounded response, complete with citations, verified metrics, extracted evidence, and exportable deliverables.\nOn screen: Highlight the response, evidence drawer, citations, and generated artifacts.\n\n0:36-0:50\nVerification & Security\nVoiceover: Every step is auditable, with telemetry, verification checks, and human-in-the-loop approvals for sensitive tools.\nOn screen: Show the activity drawer with execution telemetry and the approval step.\n\n0:50-1:10\nKnowledge Vault Integration\nVoiceover: Sensitive enterprise knowledge stays secure in the local Knowledge Vault, indexed and retrieved without leaking context to external clouds.\nOn screen: Show the Knowledge Vault with documents and instant semantic search.\n\n1:10-1:40\nConclusion & Deliverables\nVoiceover: SOVARA empowers organizations to deploy cutting-edge AI capabilities while retaining absolute data sovereignty and rigorous compliance.\nOn screen: Open and download the final synthesized deliverable.`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${activeTab}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0.3 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{
        type: 'spring',
        damping: 28,
        stiffness: 240,
        mass: 0.85
      }}
      className={`flex flex-col bg-[#111116] border-l border-[#242432] shadow-[-16px_0_40px_rgba(0,0,0,0.6)] z-20 select-none overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'w-full lg:w-[50%] xl:w-[52%] h-full shrink-0'
      }`}
    >
      {/* Top Controls Header with slide-down animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.08 }}
        className="h-11 px-3 bg-[#0d0d12] border-b border-[#1f1f28] flex items-center justify-between shrink-0"
      >
        {/* Left: Close button and document name tab */}
        <div className="flex items-center gap-2 min-w-0">
          <motion.button
            whileHover={{ scale: 1.1, color: '#ffffff' }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            className="p-1 rounded-md text-[#888898] hover:text-white hover:bg-[#1a1a24] transition-colors"
            title="Close document preview (Esc)"
            aria-label="Close document viewer"
          >
            <X size={15} />
          </motion.button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#181822] text-[#f4f4f6] text-xs font-medium border border-[#262635] truncate shadow-xs">
            <FileText size={13} className="text-[#7adfd4] shrink-0" />
            <span className="truncate">{activeTab}</span>
          </div>
        </div>

        {/* Right: Zoom controls, percentage, download, fullscreen */}
        <div className="flex items-center gap-1 sm:gap-2 text-[#9999a8]">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleZoomIn}
            className="p-1.5 rounded-md hover:text-white hover:bg-[#1c1c28] transition-colors"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn size={15} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleZoomOut}
            className="p-1.5 rounded-md hover:text-white hover:bg-[#1c1c28] transition-colors"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut size={15} />
          </motion.button>

          {/* Zoom Percentage Dropdown */}
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-[#a0a0b0] bg-[#161620] border border-[#222230]">
            <span>{zoomLevel}%</span>
            <ChevronDown size={11} className="text-[#6c6c7c]" />
          </div>

          <div className="w-[1px] h-3.5 bg-[#252535] mx-0.5" />

          {/* Download button */}
          <motion.button
            whileHover={{ scale: 1.08, color: '#7adfd4' }}
            whileTap={{ scale: 0.92 }}
            onClick={handleDownload}
            className="p-1.5 rounded-md hover:text-white hover:bg-[#1c1c28] transition-colors"
            title="Download document"
            aria-label="Download document"
          >
            <Download size={15} />
          </motion.button>

          {/* Fullscreen button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-1.5 rounded-md hover:text-white hover:bg-[#1c1c28] transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Document View Canvas with Elevation & Reveal Animation */}
      <div className="flex-1 overflow-auto bg-[#0a0a0e] p-4 sm:p-6 lg:p-8 flex justify-center items-start relative">
        {/* Soft Sovereign Scanning Beam that plays once on document open/switch */}
        <motion.div
          key={`scan-beam-${activeTab}`}
          initial={{ top: '-10%', opacity: 0 }}
          animate={{ top: '115%', opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
          className="pointer-events-none absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#7adfd4]/20 to-transparent blur-sm z-30"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-[680px] bg-white text-[#111113] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-8 sm:p-12 transition-transform duration-100 ease-out select-text font-sans min-h-[960px] relative z-10"
          >
            {activeTab.toLowerCase().includes('script') ? (
              /* SOVARA Demo Video Script matching exact screenshot */
              <div className="space-y-6 text-[13px] leading-relaxed">
                <div className="text-center pb-4 border-b border-gray-100">
                  <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-gray-950 font-serif">
                    SOVARA Demo Video Script
                  </h1>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    1:40 demo Â· Voiceover + screen direction
                  </p>
                </div>

                {/* Section 1 */}
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">0:00-0:03</div>
                  <div className="font-bold text-gray-900 text-sm">SOVARA opens</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    This is SOVARA, our sovereign AI workbench for processing sensitive organizational data locally.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Show the SOVARA window opening.
                  </p>
                </div>

                {/* Section 2 */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">0:03-0:08</div>
                  <div className="font-bold text-gray-900 text-sm">Prompt + file upload</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    We start with a natural-language request and provide the information SOVARA needs, here using both a PDF and an image.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Enter the prompt, then upload the PDF and image.
                  </p>
                </div>

                {/* Section 3 */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">0:08-0:15</div>
                  <div className="font-bold text-gray-900 text-sm">Submit the task</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    Once we submit the task, SOVARA analyzes the request, identifies the required capabilities, and routes the work to the appropriate local models and tools.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Press "Analyze with SOVARA."
                  </p>
                </div>

                {/* Section 4 */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">0:15-0:20</div>
                  <div className="font-bold text-gray-900 text-sm">Processing</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    The workflow then runs through document processing, vision analysis, reasoning, retrieval, verification, and final response generation.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Trim the actual processing time. Show only a short portion of the processing state.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">0:20-0:36</div>
                  <div className="font-bold text-gray-900 text-sm">Analysis Result</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    SOVARA returns a fully grounded response, complete with citations, verified metrics, extracted evidence, and exportable deliverables.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Highlight the response, evidence drawer, citations, and generated artifacts.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">0:36-0:50</div>
                  <div className="font-bold text-gray-900 text-sm">Verification & Security</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    Every step is auditable, with telemetry, verification checks, and human-in-the-loop approvals for sensitive tools.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Show the activity drawer with execution telemetry and the approval step.
                  </p>
                </div>

                {/* Section 7 */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">0:50-1:10</div>
                  <div className="font-bold text-gray-900 text-sm">Knowledge Vault Integration</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    Sensitive enterprise knowledge stays secure in the local Knowledge Vault, indexed and retrieved without leaking context to external clouds.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Show the Knowledge Vault with documents and instant semantic search.
                  </p>
                </div>

                {/* Section 8 */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono font-semibold text-[#0d9488]">1:10-1:40</div>
                  <div className="font-bold text-gray-900 text-sm">Conclusion & Deliverables</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1">Voiceover</div>
                  <p className="text-gray-800">
                    SOVARA empowers organizations to deploy cutting-edge AI capabilities while retaining absolute data sovereignty and rigorous compliance.
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    On screen: Open and download the final synthesized deliverable.
                  </p>
                </div>
              </div>
            ) : (
              /* Vendor Warranty Report Tabular Comparison */
              <div className="space-y-6 text-[13px] leading-relaxed">
                <div className="text-center pb-4 border-b border-gray-100">
                  <h1 className="text-2xl sm:text-[24px] font-bold tracking-tight text-gray-950 font-serif">
                    Vendor Warranty & Lifecycle Comparison
                  </h1>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    69 pages â€¢ Comparative tabular synthesis & compliance
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-200 text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-2 font-bold text-gray-800">Parameter</th>
                        <th className="border border-gray-200 p-2 font-bold text-gray-800">Vendor A (Enterprise)</th>
                        <th className="border border-gray-200 p-2 font-bold text-gray-800">Vendor B (Hyperscale)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-2 font-medium text-gray-700">Hardware Warranty</td>
                        <td className="border border-gray-200 p-2 text-gray-900">5-Year Onsite 24x7 NBD</td>
                        <td className="border border-gray-200 p-2 text-gray-900">3-Year Limited Depot</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2 font-medium text-gray-700">Thermal Threshold</td>
                        <td className="border border-gray-200 p-2 text-gray-900">Max 78Â°C under continuous load</td>
                        <td className="border border-gray-200 p-2 text-gray-900">Max 86Â°C before throttling</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2 font-medium text-gray-700">OISD-116 Compliance</td>
                        <td className="border border-gray-200 p-2 text-[#059669] font-semibold">100% Certified</td>
                        <td className="border border-gray-200 p-2 text-[#d97706] font-semibold">Conditional Waiver</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-2 font-medium text-gray-700">Sovereign Data Storage</td>
                        <td className="border border-gray-200 p-2 text-[#059669] font-semibold">FIPS 140-3 Level 3 HSM</td>
                        <td className="border border-gray-200 p-2 text-gray-700">Software TPM 2.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 text-xs text-gray-600 space-y-2">
                  <p className="font-semibold text-gray-900">Key Takeaway:</p>
                  <p>
                    Vendor A aligns directly with the sovereign governance mandate, providing zero-telemetry guarantee, 5-year onsite coverage, and rigorous adherence to fire safety and air-gap operational standards.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
