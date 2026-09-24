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
  ExternalLink
} from 'lucide-react';
import { ChatMessage } from '../types';
import { SovaraHeroWatermark, SovaraRibbonLoader } from './SovaraLogo';
import { MOCK_ACTIVE_CHAT_MESSAGES } from '../data/mockData';

interface MainChatProps {
  chatTitle: string;
  onOpenRightBar: (tab: 'activity' | 'sources') => void;
  onDownloadFile: (fileName: string) => void;
}

export const MainChat: React.FC<MainChatProps> = ({
  chatTitle,
  onOpenRightBar,
  onDownloadFile,
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  }, [messages, isThinking]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    // Simulate intelligent Sovara response with authentic steps
    setTimeout(() => {
      setIsThinking(false);
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'sovara',
        text: `Analysis complete for "${query}". Here is what has been compiled:

• Local context retrieved from connected Knowledge Vault files
• Synthesized cross-reference analysis across 84 standard documentation guidelines
• Verified invariants and ensured local execution safety
• Output artifact generated and linked to session history`,
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
    }, 1800);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isHeroState = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0d] relative overflow-hidden select-text">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 pt-6 pb-36">
        {isHeroState ? (
          /* Initial Hero State matching MainChat-Hero in SVG */
          <div className="min-h-[75vh] flex flex-col items-center justify-center max-w-3xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              <SovaraHeroWatermark className="mb-8" />

              {/* Large Centered Hero Prompt Box */}
              <div className="w-full max-w-2xl bg-[#121217] border border-[#24242e] rounded-2xl p-2.5 sm:p-3 shadow-2xl transition-all teal-border-glow">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="p-2 text-[#71717a] hover:text-[#d4d4d8] hover:bg-[#1a1a22] rounded-lg transition-colors"
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
                    className={`p-2 rounded-xl transition-all ${
                      inputPrompt.trim()
                        ? 'bg-[#7adfd4] hover:bg-[#6bd0c5] text-black shadow-md shadow-[#7adfd4]/20 scale-100'
                        : 'bg-[#1e1e26] text-[#71717a] cursor-not-allowed'
                    }`}
                    title="Send query"
                  >
                    <ArrowUp size={18} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Subtitle */}
              <div className="text-[12px] text-[#5c5c66] mt-4 flex items-center justify-center gap-1.5 select-none">
                <span>Private workspace</span>
                <span>•</span>
                <span>Local execution</span>
              </div>

              {/* Quick Prompt Ideas */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-xl">
                {[
                  'Help me with homework',
                  'Datascience assignment',
                  'Compare vendor warranties',
                  'Paneer sabzi recipe',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSendMessage(item)}
                    className="px-3.5 py-1.5 rounded-full bg-[#131318] border border-[#202028] text-xs text-[#a1a1aa] hover:text-white hover:border-[#383846] hover:bg-[#181820] transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Active Chat Conversation State */
          <div className="max-w-3xl mx-auto space-y-8 pt-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-4">
                {msg.sender === 'user' ? (
                  /* User message bubble (top right, dark capsule) */
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-[#1a1a21] border border-[#282833] rounded-2xl px-5 py-3 text-sm text-[#e4e4e7] leading-relaxed break-words shadow-sm">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  /* Sovara AI Assistant Response */
                  <div className="space-y-5 text-[#e4e4e7]">
                    {/* Research Summary Pill Button (triggers RightBar) */}
                    {msg.meta && (
                      <button
                        onClick={() => onOpenRightBar('activity')}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141419] border border-[#24242f] text-xs text-[#a1a1aa] hover:text-white hover:border-[#383846] transition-all group"
                      >
                        <span>
                          {msg.meta.duration} • {msg.meta.sourcesCount} sources • {msg.meta.searchesCount} searches
                        </span>
                        <ArrowRight size={13} className="text-[#7adfd4] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}

                    {/* Markdown Formatted Text */}
                    <div className="text-[14px] md:text-[15px] leading-relaxed space-y-3 text-[#d4d4dc]">
                      {msg.text.split('\n\n').map((para, i) => {
                        if (para.startsWith('•')) {
                          return (
                            <ul key={i} className="space-y-2 my-2">
                              {para.split('\n').map((line, j) => {
                                const cleanLine = line.replace(/^•\s*/, '');
                                return (
                                  <li key={j} className="flex items-start gap-2.5 text-[#d4d4dc]">
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
                                  </li>
                                );
                              })}
                            </ul>
                          );
                        }
                        return <p key={i}>{para}</p>;
                      })}
                    </div>

                    {/* Attached Document Card (Vendor_warrantyReport.pdf) */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="space-y-2">
                        {msg.attachments.map((att, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-[#121217] border border-[#22222b] hover:border-[#32323e] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-[#181820] text-[#7adfd4]">
                                <FileText size={18} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {att.name}
                                </div>
                                <div className="text-xs text-[#71717a]">
                                  {att.pages} pages • {att.description}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => onDownloadFile(att.name)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a22] hover:bg-[#242430] text-xs font-medium text-[#e4e4e7] border border-[#2c2c38] transition-all"
                            >
                              <Download size={13} />
                              <span>Download</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Citation Quote Block (Design System context) */}
                    {msg.citationQuote && (
                      <div className="p-4 rounded-xl bg-[#111116] border border-[#1f1f28] space-y-2">
                        <div className="text-xs font-semibold text-white tracking-wide">
                          {msg.citationQuote.title}
                        </div>
                        <p className="text-xs leading-relaxed text-[#9494a0]">
                          {msg.citationQuote.snippet}
                        </p>
                      </div>
                    )}

                    {/* Sources Button */}
                    {msg.hasSources && (
                      <div>
                        <button
                          onClick={() => onOpenRightBar('sources')}
                          className="px-3.5 py-1.5 rounded-lg bg-[#15151c] hover:bg-[#1d1d26] border border-[#272733] text-xs font-medium text-[#d4d4d8] transition-all"
                        >
                          Sources
                        </button>
                      </div>
                    )}

                    {/* Bottom Action Row (Copy, Regenerate, Expand) */}
                    <div className="flex items-center gap-3 pt-2 text-[#71717a]">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1.5 rounded-md hover:text-white hover:bg-[#181820] transition-colors"
                        title={copiedId === msg.id ? 'Copied!' : 'Copy to clipboard'}
                      >
                        {copiedId === msg.id ? (
                          <Check size={14} className="text-[#34d399]" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>

                      <button
                        onClick={() => handleSendMessage(messages[0]?.text || 'Regenerate')}
                        className="p-1.5 rounded-md hover:text-white hover:bg-[#181820] transition-colors"
                        title="Regenerate response"
                      >
                        <RotateCw size={14} />
                      </button>

                      <button
                        className="p-1.5 rounded-md hover:text-white hover:bg-[#181820] transition-colors"
                        title="More options"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Streaming Indicator */}
            {isThinking && (
              <div className="flex items-center gap-3 text-xs text-[#7adfd4] pt-2">
                <SovaraRibbonLoader size={26} />
                <span className="animate-pulse tracking-wide font-medium">
                  Sovara is analyzing and verifying context...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating Bottom Input Bar for Active Chat */}
      {!isHeroState && (
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/95 to-transparent pointer-events-none">
          <div className="max-w-3xl mx-auto pointer-events-auto">
            <div className="bg-[#121217] border border-[#24242e] rounded-2xl p-2 sm:p-2.5 shadow-2xl transition-all teal-border-glow">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="p-2 text-[#71717a] hover:text-[#d4d4d8] hover:bg-[#1a1a22] rounded-lg transition-colors"
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
                  className="flex-1 bg-transparent text-sm text-[#f4f4f5] placeholder-[#6b6b76] focus:outline-none"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputPrompt.trim()}
                  className={`p-2 rounded-xl transition-all ${
                    inputPrompt.trim()
                      ? 'bg-[#7adfd4] hover:bg-[#6bd0c5] text-black shadow-md shadow-[#7adfd4]/20 scale-100'
                      : 'bg-[#1e1e26] text-[#71717a] cursor-not-allowed'
                  }`}
                  title="Send message"
                >
                  <ArrowUp size={18} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Subtitle footer */}
            <div className="text-[11px] text-[#555560] mt-2 text-center flex items-center justify-center gap-1 select-none">
              <span>Private workspace • Local execution</span>
              <span className="text-[#7adfd4]/80">›</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
