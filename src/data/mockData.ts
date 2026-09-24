import { VaultDocument, ArtifactItem, ChatMessage, ActivityStep, CitationItem, ChatSession } from '../types';

export const INITIAL_VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: 'vault-1',
    name: 'OISD-STD-116 Fire Protection Facilities',
    pages: 84,
    uploadedDate: '1 Jun 2024',
    typeBadge: 'STANDARD',
    fileName: 'OISD_STD_116_SafetySpec.pdf',
    comparisonType: '84 pages • Safety specification',
    description: 'Design requirements and safety protocols for fire protection and mitigation facilities across refining and chemical processing plants.',
  },
  {
    id: 'vault-2',
    name: 'ISO-27001 Information Security Management',
    pages: 120,
    uploadedDate: '14 Jul 2024',
    typeBadge: 'RULEBOOK',
    fileName: 'ISO_27001_Compliance_Manual.pdf',
    comparisonType: '120 pages • Security framework',
    description: 'International benchmark for establishing, implementing, operating, monitoring, reviewing, maintaining, and improving an information security management system.',
  },
  {
    id: 'vault-3',
    name: 'AWS Well-Architected Reliability Pillar',
    pages: 62,
    uploadedDate: '22 Aug 2024',
    typeBadge: 'MANUAL',
    fileName: 'AWS_Reliability_Pillar_Guide.pdf',
    comparisonType: '62 pages • Architecture guide',
    description: 'Key design principles, failure recovery strategies, and change management guidelines for distributed cloud infrastructure.',
  },
  {
    id: 'vault-4',
    name: 'HIPAA Security & Privacy Compliance SOP',
    pages: 45,
    uploadedDate: '3 Sep 2024',
    typeBadge: 'SOP',
    fileName: 'HIPAA_Compliance_SOP_v2.pdf',
    comparisonType: '45 pages • Standard procedure',
    description: 'Operational guidelines for handling Protected Health Information (PHI), encryption standards, access governance, and incident reporting.',
  },
  {
    id: 'vault-5',
    name: 'GDPR Data Subject Rights & Processing Registry',
    pages: 38,
    uploadedDate: '18 Sep 2024',
    typeBadge: 'GUIDELINE',
    fileName: 'GDPR_Data_Governance.pdf',
    comparisonType: '38 pages • Legal & compliance',
    description: 'Article 30 processing records, automated consent verification workflows, and cross-border data transfer impact assessments.',
  },
  {
    id: 'vault-6',
    name: 'SOC-2 Type II Trust Services Criteria',
    pages: 94,
    uploadedDate: '2 Oct 2024',
    typeBadge: 'STANDARD',
    fileName: 'SOC2_TypeII_Audit_Criteria.pdf',
    comparisonType: '94 pages • Trust criteria',
    description: 'Continuous audit criteria evaluating system security, availability, processing integrity, confidentiality, and data privacy controls.',
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

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  { id: 'chat-hw', title: 'Help me with homework', isPinned: true, isArchived: false, createdAt: Date.now() - 100000 },
  { id: 'chat-ds', title: 'Datascience assignment', isPinned: false, isArchived: false, createdAt: Date.now() - 200000 },
  { id: 'chat-sl', title: 'She left me on read', isPinned: false, isArchived: false, createdAt: Date.now() - 300000 },
  { id: 'chat-ps', title: 'Paneer sabzi recipe', isPinned: false, isArchived: false, createdAt: Date.now() - 400000 },
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
  { id: 'act-2', title: 'Parsed requirement specifications', status: 'success' },
  { id: 'act-3', title: 'Cross-referenced fire protection standards', status: 'success' },
  { id: 'act-4', title: 'Validating safety margin thresholds', status: 'error' },
  { id: 'act-5', title: 'Re-benchmarked against OISD-STD-116 standard', status: 'success' },
  { id: 'act-6', title: 'Analyzed design system guidelines', status: 'neutral' },
  { id: 'act-7', title: 'Searching Knowledge Vault indexes', status: 'neutral' },
  { id: 'act-8', title: 'Evaluated cross-token consistency', status: 'neutral' },
  { id: 'act-9', title: 'Compiled synthesis artifact', status: 'neutral' },
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
