import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Paperclip, 
  ArrowUp, 
  ArrowRight,
  FileText, 
  Download, 
  Copy, 
  Check, 
  RotateCw, 
  ChevronDown,
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { ChatMessage } from '../types';
import { SovaraHeroWatermark, SovaraRibbonLoader } from './SovaraLogo';
import { MOCK_ACTIVE_CHAT_MESSAGES } from '../data/mockData';

interface MainChatProps {
  chatTitle: string;
  onOpenRightBar: (tab: 'activity' | 'sources') => void;
  onDownloadFile: (fileName: string) => void;
  sidebarOpen?: boolean;
  onChatTitleUpdate?: (newTitle: string) => void;
}

export const MainChat: React.FC<MainChatProps> = ({
  chatTitle,
  onOpenRightBar,
  onDownloadFile,
  sidebarOpen = true,
  onChatTitleUpdate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // If it's the demo chat, start with the mock messages matching MainChat.svg
    if (chatTitle !== 'New Chat') {
      return MOCK_ACTIVE_CHAT_MESSAGES;
    }
    return [];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const thinkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear running timers on unmount
  useEffect(() => {
    return () => {
      if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current);
      if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
    };
  }, []);

  // When chat title changes, switch conversation state
  useEffect(() => {
    if (chatTitle === 'New Chat') {
      setMessages([]);
    } else {
      setMessages(MOCK_ACTIVE_CHAT_MESSAGES);
    }
  }, [chatTitle]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, displayedText]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query) return;

    if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current);
    if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);

    if (chatTitle === 'New Chat' && onChatTitleUpdate) {
      const generatedTitle = query.length > 28 ? query.slice(0, 28) + '...' : query;
      onChatTitleUpdate(generatedTitle);
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    // Simulate intelligent Sovara response with authentic streaming
    thinkingTimeoutRef.current = setTimeout(() => {
      setIsThinking(false);
      const aiMsgId = `msg-${Date.now() + 1}`;
      const fullText = `Analysis complete for "${query}". Here is what has been compiled:

• Local context retrieved from connected Knowledge Vault files
• Synthesized cross-reference analysis across 84 standard documentation guidelines
• Verified invariants and ensured local execution safety
• Output artifact generated and linked to session history`;

      const aiResponse: ChatMessage = {
        id: aiMsgId,
        sender: 'sovara',
        text: fullText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: {
          duration: 'Worked for 2m',
          sourcesCount: 12,
          searchesCount: 24,
        },
        attachments: [
          {
            name: 'Vendor_warrantyReport.pdf',
            pages: 69,
            description: 'Tabular comparison',
          },
        ],
        citationQuote: {
          title: 'Building a scalable cross-platform Design System',
          snippet: 'The discussion around UI Design vs Brand Design has been a cause of major confusion for me when I was early in my design career. Even though I knew that brand designers usually create a logo, color palettes, typography and language choices (and much more), working with them was not always the most pleasant experience for me.',
        },
        hasSources: true,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setStreamingMsgId(aiMsgId);
      setDisplayedText((prev) => ({ ...prev, [aiMsgId]: '' }));

      let index = 0;
      const speed = 20;
      const chunkSize = 5;

      streamingIntervalRef.current = setInterval(() => {
        index += chunkSize;
        if (index >= fullText.length) {
          if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current);
          setDisplayedText((prev) => ({ ...prev, [aiMsgId]: fullText }));
          setStreamingMsgId(null);
        } else {
          setDisplayedText((prev) => ({
            ...prev,
            [aiMsgId]: fullText.slice(0, index),
          }));
        }
      }, speed);
    }, 1400);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isHeroState = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 bg-[#0a0a0d] relative overflow-hidden select-text">
      {/* Messages Scroll Area */}
      <div className={`flex-1 overflow-y-auto px-3.5 sm:px-6 md:px-8 lg:px-16 ${isHeroState ? 'h-full flex flex-col' : 'pt-4 sm:pt-6 pb-28 sm:pb-36'}`}>
        {isHeroState ? (
          /* Initial Hero State with calibrated spring animation while sliding and after sliding */
          <div className="flex-1 flex flex-col justify-between items-center w-full min-h-full">
            <div className="flex-1" />
            <div className="w-full max-w-3xl flex flex-col items-center px-4">
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.25 }}
              >
                <SovaraHeroWatermark className="mb-8" />
              </motion.div>

              {/* Large Centered Hero Prompt Box with shared layout glide animation */}
              <motion.div
                layoutId="mainSearchCapsule"
                transition={{
                  type: 'spring',
                  damping: 28,
                  stiffness: 240,
                  mass: 0.85,
                }}
                className="w-full max-w-2xl bg-[#121217] border border-[#24242e] rounded-2xl p-2.5 sm:p-3 shadow-2xl transition-colors duration-200 teal-border-glow hover:border-[#333342] focus-within:border-[#7adfd4]/50 focus-within:shadow-[0_8px_32px_rgba(122,223,212,0.12)]"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="p-2 text-[#71717a] hover:text-[#d4d4d8] hover:bg-[#1a1a22] rounded-lg transition-colors active:scale-95"
                    title="Attach file or context"
                  >
                    <Paperclip size={18} />
                  </button>

                  <input
                    type="text"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    placeholder="Ask SOVARA to analyze, compare, research, or create..."
                    className="flex-1 bg-transparent text-sm md:text-[15px] text-[#f4f4f5] placeholder-[#6b6b76] focus:outline-none"
                    autoFocus
                  />

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputPrompt.trim()}
                    className={`p-2 rounded-xl transition-all duration-150 active:scale-95 ${
                      inputPrompt.trim()
                        ? 'bg-[#7adfd4] hover:bg-[#6bd0c5] text-black shadow-md shadow-[#7adfd4]/20 scale-100'
                        : 'bg-[#1e1e26] text-[#71717a] cursor-not-allowed'
                    }`}
                    title="Send query"
                  >
                    <ArrowUp size={18} className="stroke-[2.5]" />
                  </button>
                </div>
              </motion.div>

              {/* Interactive Quick Prompts with gentle staggered entrance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-xl px-2"
              >
                {[
                  'Compare OISD-116 vs NFPA specs',
                  'Summarize ISO-27001 criteria',
                  'Review AWS Well-Architected pillar',
                ].map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    whileHover={{ scale: 1.025, backgroundColor: '#161622', borderColor: '#323246' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-3 py-1.5 rounded-full text-xs text-[#8f8f9e] hover:text-[#f4f4f5] bg-[#111116] border border-[#1e1e28] transition-colors shadow-xs"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Bottom Footer with synchronized layout transition */}
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex items-end justify-center pb-6"
            >
              <div className="text-[12px] text-[#555562] flex items-center justify-center gap-1.5 select-none tracking-wide">
                <span>Private workspace</span>
                <span className="text-[#3a3a46]">•</span>
                <span>Local execution</span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Active Chat Conversation State */
          <div className="max-w-3xl mx-auto space-y-8 pt-4">
            {messages.map((msg) => {
              const isStreamingThis = streamingMsgId === msg.id;
              const activeText = displayedText[msg.id] !== undefined ? displayedText[msg.id] : msg.text;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {msg.sender === 'user' ? (
                    /* User message bubble (top right, dark capsule) */
                    <div className="flex justify-end">
                      <motion.div
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        className="max-w-[85%] bg-[#1a1a21] border border-[#282833] rounded-2xl px-5 py-3 text-sm text-[#e4e4e7] leading-relaxed break-words break-all shadow-sm"
                      >
                        {msg.text}
                      </motion.div>
                    </div>
                  ) : (
                    /* Sovara AI Assistant Response */
                    <div className="space-y-5 text-[#e4e4e7]">
                      {/* Research Summary Pill Button (triggers RightBar) */}
                      {msg.meta && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.015, borderColor: '#7adfd4' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onOpenRightBar('activity')}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141419] border border-[#24242f] text-xs text-[#a1a1aa] hover:text-white transition-all group shadow-xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7adfd4] animate-pulse" />
                          <span>
                            {msg.meta.duration} • {msg.meta.sourcesCount} sources • {msg.meta.searchesCount} searches
                          </span>
                          <ArrowRight size={13} className="text-[#7adfd4] group-hover:translate-x-0.5 transition-transform" />
                        </motion.button>
                      )}

                      {/* Markdown Formatted Text with Progressive Streaming Animation */}
                      <div className="text-[14px] md:text-[15px] leading-relaxed space-y-3 text-[#d4d4dc]">
                        {activeText.split('\n\n').map((para, i) => {
                          if (para.startsWith('•')) {
                            return (
                              <ul key={i} className="space-y-2 my-2">
                                {para.split('\n').map((line, j) => {
                                  const cleanLine = line.replace(/^•\s*/, '');
                                  return (
                                    <motion.li
                                      key={j}
                                      initial={{ opacity: 0, x: -6 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="flex items-start gap-2.5 text-[#d4d4dc]"
                                    >
                                      <span className="text-[#7adfd4] mt-1.5 text-xs">•</span>
                                      <span>
                                        {cleanLine.includes('#F36223') ? (
                                          <>
                                            Accent Color{' '}
                                            <code className="px-1.5 py-0.5 rounded bg-[#1e1e26] text-[#f97316] font-mono text-xs border border-[#30303c]">
                                              #F36223
                                            </code>{' '}
                                            and dark text with an inverted white button (black when hovered over)
                                          </>
                                        ) : cleanLine.includes('www.google.com') ? (
                                          <>
                                            A page with projects has been added to the link{' '}
                                            <a
                                              href="https://www.google.com"
                                              target="_blank"
                                              rel="noreferrer"
                                              className="text-[#7adfd4] underline underline-offset-4 hover:text-[#99eee3]"
                                            >
                                              www.google.com
                                            </a>
                                          </>
                                        ) : (
                                          cleanLine
                                        )}
                                      </span>
                                    </motion.li>
                                  );
                                })}
                              </ul>
                            );
                          }
                          return (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {para}
                            </motion.p>
                          );
                        })}

                        {/* Blinking Cyan Cursor while AI text is streaming */}
                        {isStreamingThis && (
                          <span className="inline-block w-2 h-4 bg-[#7adfd4] ml-1 rounded-[1px] animate-pulse align-middle shadow-[0_0_8px_rgba(122,223,212,0.8)]" />
                        )}
                      </div>

                      {/* Structured attachments & citations unfold after streaming finishes */}
                      {!isStreamingThis && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          {/* Attached Document Card (Vendor_warrantyReport.pdf) */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="space-y-2">
                              {msg.attachments.map((att, i) => (
                                <motion.div
                                  key={i}
                                  whileHover={{ y: -1.5, borderColor: '#343444' }}
                                  transition={{ duration: 0.15 }}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl bg-[#121217] border border-[#22222b] transition-colors gap-2.5 sm:gap-0 shadow-xs"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2 rounded-lg bg-[#181820] text-[#7adfd4] shrink-0">
                                      <FileText size={18} />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs sm:text-sm font-medium text-white truncate">
                                        {att.name}
                                      </div>
                                      <div className="text-[11px] text-[#71717a]">
                                        {att.pages} pages • {att.description}
                                      </div>
                                    </div>
                                  </div>

                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => onDownloadFile(att.name)}
                                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a22] hover:bg-[#242430] text-xs font-medium text-[#e4e4e7] border border-[#2c2c38] transition-all shrink-0 self-end sm:self-auto"
                                  >
                                    <Download size={13} />
                                    <span>Download</span>
                                  </motion.button>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {/* Citation Quote Block (Design System context) */}
                          {msg.citationQuote && (
                            <motion.div
                              whileHover={{ borderColor: '#2e2e3c' }}
                              className="p-4 rounded-xl bg-[#111116] border border-[#1f1f28] space-y-2 transition-colors"
                            >
                              <div className="text-xs font-semibold text-white tracking-wide">
                                {msg.citationQuote.title}
                              </div>
                              <p className="text-xs leading-relaxed text-[#9494a0]">
                                {msg.citationQuote.snippet}
                              </p>
                            </motion.div>
                          )}

                          {/* Sources Button */}
                          {msg.hasSources && (
                            <div>
                              <motion.button
                                whileHover={{ scale: 1.025, borderColor: '#7adfd4' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onOpenRightBar('sources')}
                                className="px-3.5 py-1.5 rounded-lg bg-[#15151c] hover:bg-[#1d1d26] border border-[#272733] text-xs font-medium text-[#d4d4d8] transition-all flex items-center gap-1.5"
                              >
                                <BookOpen size={12} className="text-[#7adfd4]" />
                                <span>Sources</span>
                              </motion.button>
                            </div>
                          )}

                          {/* Bottom Action Row (Copy, Regenerate, Expand) */}
                          <div className="flex items-center gap-2 pt-2 text-[#71717a]">
                            <motion.button
                              whileHover={{ scale: 1.1, color: '#ffffff' }}
                              whileTap={{ scale: 0.92 }}
                              onClick={() => handleCopy(msg.id, msg.text)}
                              className="p-1.5 rounded-lg hover:bg-[#181820] transition-colors"
                              title={copiedId === msg.id ? 'Copied!' : 'Copy to clipboard'}
                            >
                              {copiedId === msg.id ? (
                                <Check size={14} className="text-[#34d399]" />
                              ) : (
                                <Copy size={14} />
                              )}
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1, color: '#ffffff' }}
                              whileTap={{ scale: 0.92 }}
                              onClick={() => handleSendMessage(messages[0]?.text || 'Regenerate')}
                              className="p-1.5 rounded-lg hover:bg-[#181820] transition-colors"
                              title="Regenerate response"
                            >
                              <RotateCw size={14} />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1, color: '#ffffff' }}
                              whileTap={{ scale: 0.92 }}
                              className="p-1.5 rounded-lg hover:bg-[#181820] transition-colors"
                              title="More options"
                            >
                              <ChevronDown size={14} />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Thinking / Streaming Indicator */}
            {isThinking && (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-xs text-[#7adfd4] pt-2"
              >
                <SovaraRibbonLoader size={26} />
                <span className="animate-pulse tracking-wide font-medium">
                  Sovara is analyzing and verifying context...
                </span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating Bottom Input Bar for Active Chat with shared layout glide animation */}
      {!isHeroState && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/95 to-transparent pointer-events-none"
        >
          <div className="max-w-3xl mx-auto pointer-events-auto">
            <motion.div 
              layoutId="mainSearchCapsule"
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 240,
                mass: 0.85,
              }}
              className="bg-[#121217] border border-[#24242e] rounded-2xl p-1.5 sm:p-2.5 shadow-2xl transition-all teal-border-glow"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  className="p-1.5 sm:p-2 text-[#71717a] hover:text-[#d4d4d8] hover:bg-[#1a1a22] rounded-lg transition-colors shrink-0"
                  title="Attach file"
                >
                  <Paperclip size={18} />
                </button>

                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Ask anything, / for commands, @ for context..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-[#f4f4f5] placeholder-[#6b6b76] focus:outline-none min-w-0"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputPrompt.trim()}
                  className={`p-1.5 sm:p-2 rounded-xl transition-all shrink-0 ${
                    inputPrompt.trim()
                      ? 'bg-[#7adfd4] hover:bg-[#6bd0c5] text-black shadow-md shadow-[#7adfd4]/20 scale-100'
                      : 'bg-[#1e1e26] text-[#71717a] cursor-not-allowed'
                  }`}
                  title="Send message"
                >
                  <ArrowUp size={18} className="stroke-[2.5]" />
                </button>
              </div>
            </motion.div>

            {/* Subtitle footer */}
            <div className="text-[10px] sm:text-[11px] text-[#555560] mt-1.5 sm:mt-2 text-center flex items-center justify-center gap-1 select-none">
              <span>Private workspace • Local execution</span>
              <span className="text-[#7adfd4]/80">›</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
