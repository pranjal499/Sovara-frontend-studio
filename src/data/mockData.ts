import { VaultDocument, ArtifactItem, ChatMessage, ActivityStep, CitationItem } from '../types';

export const INITIAL_VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: 'vault-1',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-2',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-3',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-4',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-5',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-6',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-7',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-8',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-9',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
  {
    id: 'vault-10',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    typeBadge: 'STANDARD',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: "These two terms are two separate things, but if you really dig into the definition you will realise you can't talk about UX without talking about UI and other way around. A badly designed interface (e.g. bad contrast, a font that is too small, illegible text) will impact UX badly. Same as bad research done on the UX stage will impact UI Design decisions",
  },
];

export const INITIAL_ARTIFACTS: ArtifactItem[] = [
  {
    id: 'art-1',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-2',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-3',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-4',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-5',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-6',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-7',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-8',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-9',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
  {
    id: 'art-10',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 June 2017',
    fileType: 'PDF',
    generatedOn: '22 Sep 2026',
    chatReference: 'Fire protection facilities assessment',
    downloadUrl: '#',
  },
];

export const RECENT_CHATS = [
  'Help me with homework',
  'Datascience assignment',
  'She left me on read',
  'Paneer sabzi recipe',
];

export const MOCK_ACTIVE_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'sdasdsdcdcdcadcadsasjhcbjasbchjashcbjashcvjasvcjgasvchgasvcygasvcytasvycavsycvasycvayscvyasvtcyasvcyastvcsdasdasjhdsjbdaskjnasjd\\sakjdbakshdasdbhksabdkjasjbdkasbj',
    timestamp: '14:20',
  },
  {
    id: 'msg-2',
    sender: 'sovara',
    text: `All set—the build is in progress. Here's what's changed:

• The noise texture has been removed from the background
• The design has been revamped; it's now more minimalist. Icons from hugeicons have been added.
• Geist font for text
• Added scrolling animation
• Accent Color #F36223 and dark text with an inverted white button (black when hovered over)
• “Smooth” animations have been added
• Added language selection (Russian, English)
• A page with projects has been added to the link www.google.com`,
    timestamp: '14:22',
    meta: {
      duration: 'Worked for 69m',
      sourcesCount: 420,
      searchesCount: 666,
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
  },
];

export const ACTIVITY_STEPS: ActivityStep[] = [
  { id: 'act-1', title: 'Integrated 2 vendor proposals', status: 'success' },
  { id: 'act-2', title: 'Integrated 2 vendor proposals', status: 'success' },
  { id: 'act-3', title: 'Integrated 2 vendor proposals', status: 'success' },
  { id: 'act-4', title: 'Kuch toh fail hogaya, fahhhhhh', status: 'error' },
  { id: 'act-5', title: 'bohot kuch sahi hogaya...balleee balleee...hadippaaa', status: 'success' },
  { id: 'act-6', title: 'Analyzed design.md', status: 'neutral' },
  { id: 'act-7', title: 'Searching Knowledge vault', status: 'neutral' },
  { id: 'act-8', title: 'Syntax error encountered', status: 'neutral' },
  { id: 'act-9', title: 'error fixed', status: 'neutral' },
  { id: 'act-10', title: 'Thought for 15s', status: 'neutral' },
];

export const ACTIVITY_THOUGHT_SUMMARY = 
  "I'm detailing the structure for a comprehensive design system guide, covering foundational principles, core components, design tokens, responsive design, tools, accessibility, documentation, and versioning.";

export const CITATION_ITEMS: CitationItem[] = [
  {
    id: 'cit-1',
    type: 'source',
    sourceTitle: 'Source',
    content: "I'm detailing the structure for a comprehensive design system guide, covering foundational principles, core components, design tokens, responsive design, tools, accessibility, documentation, and versioning.",
  },
  {
    id: 'cit-2',
    type: 'source',
    sourceTitle: 'Source',
    content: "I'm detailing the structure for a comprehensive design system guide, covering foundational principles, core components, design tokens, responsive design, tools, accessibility, documentation, and versioning.",
  },
  {
    id: 'cit-3',
    type: 'vault',
    sourceTitle: 'Knowledge Vault',
    content: 'Your Sovara project has 4 different pages, with only one of them ready to ship as of now.',
  },
];
