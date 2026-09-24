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

export const INITIAL_CHAT_MESSAGES_MAP: Record<string, ChatMessage[]> = {
  'chat-hw': [
    {
      id: 'msg-hw-1',
      sender: 'user',
      text: 'Can you help me solve this calculus optimization problem? I need to find the dimensions of the maximum volume cylinder inscribed in a right circular cone of height H and radius R.',
      timestamp: '14:20',
    },
    {
      id: 'msg-hw-2',
      sender: 'sovara',
      text: `Here is the step-by-step calculus solution for finding the maximum cylinder inscribed in a cone:

1. Geometric Constraint:
   Let the inscribed cylinder have radius r and height h. By similar right triangles along the cross-section:
   h / (R - r) = H / R  ==>  h = H * (1 - r / R)

2. Volume Function:
   V(r) = π * r² * h = π * H * (r² - r³ / R)

3. Critical Points:
   Differentiate with respect to r and equate to zero:
   dV/dr = π * H * (2r - 3r² / R) = 0
   Since r ≠ 0, 2 - 3r / R = 0  ==>  r = (2/3) * R

4. Optimal Height:
   h = H * (1 - 2/3) = (1/3) * H

5. Maximum Inscribed Volume:
   V_max = π * (4/9 * R²) * (1/3 * H) = (4/27) * π * R² * H
   This is exactly 4/9 (~44.4%) of the cone's total volume.`,
      timestamp: '14:22',
      meta: {
        duration: 'Worked for 45s',
        sourcesCount: 3,
        searchesCount: 6,
      },
      citationQuote: {
        title: 'Calculus: Early Transcendentals - Optimization Problems',
        snippet: 'When formulating geometric optimization models, express all dimensional variables in terms of a single independent parameter using similarity constraints before differentiating.',
      },
      hasSources: true,
    },
  ],
  'chat-ds': [
    {
      id: 'msg-ds-1',
      sender: 'user',
      text: 'What are the most robust techniques for evaluating a model on extreme class imbalance (0.2% fraud detection)?',
      timestamp: '11:15',
    },
    {
      id: 'msg-ds-2',
      sender: 'sovara',
      text: `For extremely imbalanced datasets (e.g., 0.2% positive fraud cases), standard metrics like accuracy are misleading. Here is the recommended methodology:

• Primary Metric: Precision-Recall Area Under Curve (PR-AUC / Average Precision). Unlike ROC-AUC, PR-AUC does not get artificially inflated by a massive true negative count.
• Decision Threshold Tuning: Plot the Cost vs. Threshold curve incorporating the business cost of false negatives ($ loss from undetected fraud) vs false positives (customer verification friction).
• Sampling Strategy: Evaluate models on an untouched, natural distribution validation set. Apply SMOTE, Tomek Links, or Random Under-sampling strictly to the training fold inside cross-validation loops.
• Architecture Choice: Calibrated XGBoost with scale_pos_weight or an Isolation Forest anomaly detection ensemble.`,
      timestamp: '11:18',
      meta: {
        duration: 'Worked for 1m',
        sourcesCount: 8,
        searchesCount: 14,
      },
      hasSources: true,
    },
  ],
  'chat-sl': [
    {
      id: 'msg-sl-1',
      sender: 'user',
      text: 'She left me on read yesterday after I invited her to coffee this weekend. Should I send a follow-up message?',
      timestamp: '19:40',
    },
    {
      id: 'msg-sl-2',
      sender: 'sovara',
      text: `Here is a grounded perspective on handling being left on read:

1. Pause and give it space (at least 48–72 hours):
   A 24-hour window is brief. People often read messages while rushing between meetings or classes and genuinely forget to type a reply.
2. Avoid sending a direct "Did you see this?" or "?"
   This often introduces unspoken pressure.
3. If several days pass with silence:
   Take it gracefully as low availability or interest for now. Keep your weekend schedule full, hang out with friends, and direct your attention toward your own pursuits. High emotional independence is always the most attractive posture.`,
      timestamp: '19:42',
      meta: {
        duration: 'Worked for 20s',
        sourcesCount: 2,
        searchesCount: 4,
      },
      hasSources: false,
    },
  ],
  'chat-ps': [
    {
      id: 'msg-ps-1',
      sender: 'user',
      text: 'Give me an authentic restaurant-style Shahi Paneer recipe that uses hung curd instead of heavy cashews.',
      timestamp: '17:05',
    },
    {
      id: 'msg-ps-2',
      sender: 'sovara',
      text: `Here is a velvety, aromatic Shahi Paneer that achieves restaurant creaminess using whipped hung curd and melon seeds (magaz):

Ingredients:
• 250g fresh soft paneer, cubed
• 1/2 cup hung curd (whisked till silky smooth)
• 2 tbsp melon seeds (magaz) + 6 soaked almonds, pureed
• 2 medium onions, 2 ripe tomatoes, 1 tbsp ginger-garlic paste
• Whole spices: 1 bay leaf, 3 green cardamoms, 1 inch cinnamon stick
• Ground spices: 1 tsp Kashmiri red chili, 1/2 tsp turmeric, 1 tsp coriander powder, 1/2 tsp garam masala
• 1 tbsp kasuri methi (roasted & crushed), 1 tbsp butter + 1 tbsp oil, pinch of saffron

Method:
1. Sauté whole spices, sliced onions, tomatoes, and ginger-garlic until soft. Cool and blend with the almond-magaz paste into a velvety puree.
2. Heat butter in a pan, pour the gravy through a fine strainer for that authentic silky restaurant texture.
3. Lower the heat completely; fold in the whisked hung curd gradually while stirring continuously to prevent curdling.
4. Add ground spices, kasuri methi, and a pinch of sugar. Simmer until oil separates.
5. Gently drop in paneer cubes, cook on gentle heat for 3 minutes, and finish with saffron infused in warm milk.`,
      timestamp: '17:08',
      meta: {
        duration: 'Worked for 50s',
        sourcesCount: 5,
        searchesCount: 9,
      },
      hasSources: true,
    },
  ],
};

export const MOCK_ACTIVE_CHAT_MESSAGES: ChatMessage[] = INITIAL_CHAT_MESSAGES_MAP['chat-hw'];

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
