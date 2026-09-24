export type NavigationTab = 'chat' | 'vault' | 'artifacts';

export interface VaultDocument {
  id: string;
  name: string;
  pages: number;
  uploadedDate: string;
  typeBadge: string; // e.g. "STANDARD", "RULEBOOK", "MANUAL", "SOP", "GUIDELINE"
  fileName: string;
  fileSize?: string;
  comparisonType?: string;
  description: string;
}

export interface ArtifactItem {
  id: string;
  name: string;
  pages: number;
  uploadedDate: string;
  fileType: 'PDF' | 'Docx' | 'PPT' | 'Code' | '.Md' | 'Txt';
  generatedOn: string;
  chatReference: string;
  downloadUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sovara';
  text: string;
  timestamp: string;
  meta?: {
    duration: string;
    sourcesCount: number;
    searchesCount: number;
  };
  attachments?: {
    name: string;
    pages: number;
    description: string;
  }[];
  citationQuote?: {
    title: string;
    snippet: string;
  };
  hasSources?: boolean;
}

export interface ActivityStep {
  id: string;
  title: string;
  status: 'success' | 'error' | 'neutral' | 'in-progress';
  timestamp?: string;
}

export interface CitationItem {
  id: string;
  type: 'source' | 'vault';
  sourceTitle: string;
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  isPinned?: boolean;
  isArchived?: boolean;
  createdAt?: number;
}
