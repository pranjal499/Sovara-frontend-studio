import { ChatMessage, ChatSession, VaultDocument, ArtifactItem } from '../types';

export const DEFAULT_CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'chat-backend-code',
    title: 'Sovara project python backend code',
    isPinned: true,
    isArchived: false,
    createdAt: Date.now() - 60000,
  },
  {
    id: 'chat-analytical-report',
    title: 'Analytical Report',
    isPinned: false,
    isArchived: false,
    createdAt: Date.now() - 120000,
  },
  {
    id: 'chat-stock-availability',
    title: 'Stock availability check',
    isPinned: false,
    isArchived: false,
    createdAt: Date.now() - 180000,
  },
  {
    id: 'chat-funds-transfer',
    title: 'Funds transfer optimization',
    isPinned: false,
    isArchived: false,
    createdAt: Date.now() - 240000,
  },
  {
    id: 'chat-system-config',
    title: 'System configuration',
    isPinned: false,
    isArchived: false,
    createdAt: Date.now() - 300000,
  },
];

export const INITIAL_PRESET_MESSAGES: Record<string, ChatMessage[]> = {
  'chat-backend-code': [
    {
      id: 'msg-backend-user',
      sender: 'user',
      text: 'Generate a code for sovara backend, with all the features listed in PRD',
      timestamp: '14:20',
      attachments: [
        {
          name: 'Pitchdeck.pdf',
          pages: 14,
          description: 'Product Requirement Deck',
        },
      ],
    },
    {
      id: 'msg-backend-ai',
      sender: 'sovara',
      text: `All set—the build is in progress. Here's what's changed:

• The noise texture has been removed from the background
• The design has been revamped; it's now more minimalist. Icons from hugeicons have been added.
• Geist font for text
• Added scrolling animation
• Accent Color #F36223 and dark text with an inverted white button (black when hovered over)
• “Smooth” animations have been added
• Added language selection (Russian, English)
• A page with projects has been added`,
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
      generatedDeliverables: ['SOVARA_Demo_Script.pdf', 'Vendor_warrantyReport.pdf'],
      hasSources: true,
      verificationStatus: 'passed',
      evidence: [
        {
          evidence_id: 'ev-1',
          source_filename: 'sovara_prd_architecture.pdf',
          source_title: 'PRD Technical Specifications',
          snippet: 'Local offline-capable inference engine with strict zero-telemetry boundary. SSE streaming protocol for task lifecycle events.',
          evidence_type: 'vault',
          page_number: 12,
        },
        {
          evidence_id: 'ev-2',
          source_filename: 'security_governance.pdf',
          source_title: 'Enterprise Data Sovereignty Directive',
          snippet: 'All embeddings and vector indexes must persist within client network enclosure. No external telemetry or cloud egress.',
          evidence_type: 'vault',
          page_number: 5,
        },
        {
          evidence_id: 'ev-3',
          source_filename: 'fastapi_service_spec.md',
          source_title: 'Python Backend Protocol & Endpoints',
          snippet: 'Exposes /analyze, /analyze/stream, /vault/upload, and /approvals. Fully typed Pydantic V2 schemas.',
          evidence_type: 'vault',
          page_number: 3,
        },
      ],
      stages: [
        {
          stage_id: 'stg-1',
          run_id: 'run-backend-1',
          stage_type: 'planning',
          status: 'completed',
          display_label: 'Decomposed PRD backend architecture specifications',
          sequence: 1,
        },
        {
          stage_id: 'stg-2',
          run_id: 'run-backend-1',
          stage_type: 'retrieval',
          status: 'completed',
          display_label: 'Retrieved Knowledge Vault compliance and schema rules',
          sequence: 2,
        },
        {
          stage_id: 'stg-3',
          run_id: 'run-backend-1',
          stage_type: 'synthesis',
          status: 'completed',
          display_label: 'Synthesized Python FastAPI backend codebase & endpoints',
          sequence: 3,
        },
        {
          stage_id: 'stg-4',
          run_id: 'run-backend-1',
          stage_type: 'verification',
          status: 'completed',
          display_label: 'Verified invariant constraints and local sandbox safety',
          sequence: 4,
        },
      ],
      executionTelemetry: {
        local_inference: true,
        processing_location: 'Local Sovereign Sandbox',
        models_used: ['sovara-core-3.8', 'local-deepseek-r1-q4'],
        llm_calls: 8,
        llm_total_duration_ms: 4140000,
        llm_average_duration_ms: 517500,
        llm_events: [],
        external_api_calls: 0,
        network_calls: 0,
        cloud_uploads: 0,
        files_processed: 2,
        tools_used: ['vault_search', 'ast_validator', 'script_compiler'],
        sandbox_executions: 4,
        sandbox_successes: 4,
        sandbox_failures: 0,
        sandbox_timeouts: 0,
        execution_events: [],
        no_external_calls: true,
      },
    },
  ],
  'chat-analytical-report': [
    {
      id: 'msg-analytical-user',
      sender: 'user',
      text: 'Provide a comparative analytical report on local vs cloud deployment models for sensitive infrastructure',
      timestamp: '11:15',
    },
    {
      id: 'msg-analytical-ai',
      sender: 'sovara',
      text: `Executive Analytical Summary:

• Total Sovereign Containment: Zero bytes transmitted across non-certified networks.
• Latency Profile: Sub-12ms local inference loop versus 280ms roundtrip cloud API latency.
• Compliance Footprint: Automatic fulfillment of GDPR Art. 28, HIPAA Security Rule, and ISO-27001 data residency clauses.
• Cost Predictability: Fixed amortized hardware cost with no surge or per-token pricing anomalies.`,
      timestamp: '11:16',
      meta: {
        duration: 'Worked for 4m',
        sourcesCount: 18,
        searchesCount: 42,
      },
      hasSources: true,
      verificationStatus: 'passed',
    },
  ],
  'chat-stock-availability': [
    {
      id: 'msg-stock-user',
      sender: 'user',
      text: 'Audit warehouse safety margins and cross-check stock availability against Q3 fulfillment orders',
      timestamp: '09:40',
    },
    {
      id: 'msg-stock-ai',
      sender: 'sovara',
      text: `Stock Availability & Warehouse Audit Complete:

• High-priority inventory buffer stands at 142% of baseline threshold.
• 3 sku categories have lead-time extensions exceeding 14 calendar days; automated purchase triggers recommended.
• All fulfillment safety thresholds verified compliant against OISD inventory standards.`,
      timestamp: '09:41',
      meta: {
        duration: 'Worked for 2m',
        sourcesCount: 9,
        searchesCount: 16,
      },
      hasSources: true,
      verificationStatus: 'passed',
    },
  ],
  'chat-funds-transfer': [
    {
      id: 'msg-funds-user',
      sender: 'user',
      text: 'Optimize intraday liquidity buffer allocations and reconcile multi-currency settlement channels',
      timestamp: '08:20',
    },
    {
      id: 'msg-funds-ai',
      sender: 'sovara',
      text: `Intraday Liquidity Optimization Results:

• Re-balanced EUR/USD clearing reserves to mitigate peak morning spread risk by 18.4%.
• Net settlement liquidity pool conserved $1.4M in pre-funding capital.
• Invariant check passed: Zero risk exposure beyond approved Tier-1 limits.`,
      timestamp: '08:22',
      meta: {
        duration: 'Worked for 3m',
        sourcesCount: 24,
        searchesCount: 38,
      },
      hasSources: true,
      verificationStatus: 'passed',
    },
  ],
  'chat-system-config': [
    {
      id: 'msg-sys-user',
      sender: 'user',
      text: 'Inspect sovereign hardware accelerators and verify local model weights integrity',
      timestamp: '07:05',
    },
    {
      id: 'msg-sys-ai',
      sender: 'sovara',
      text: `Sovereign System Diagnostics:

• GPU Compute: 2x NVIDIA RTX 4090 / 24GB VRAM active (Thermal load: 46°C, Power draw: 185W).
• Model Checksums: SHA-256 integrity verified for all quantized local weights.
• Sandbox Isolation: Kernel seccomp-bpf filters active, external sockets blocked.`,
      timestamp: '07:06',
      meta: {
        duration: 'Worked for 1m',
        sourcesCount: 6,
        searchesCount: 8,
      },
      hasSources: true,
      verificationStatus: 'passed',
    },
  ],
};

export const INITIAL_VAULT_DOCS: VaultDocument[] = [
  {
    id: 'vault-1',
    name: 'Pitchdeck.pdf',
    pages: 14,
    uploadedDate: '24 Sep 2026',
    typeBadge: 'PDF',
    fileName: 'Pitchdeck.pdf',
    comparisonType: '14 pages • Product Requirement Deck',
    description: 'Executive roadmap, architecture requirements, and local execution principles.',
  },
  {
    id: 'vault-2',
    name: 'Vendor_warrantyReport.pdf',
    pages: 69,
    uploadedDate: '22 Sep 2026',
    typeBadge: 'PDF',
    fileName: 'Vendor_warrantyReport.pdf',
    comparisonType: '69 pages • Tabular comparison',
    description: 'Hardware lifecycle warranty metrics, MTBF benchmarks, and vendor service level agreements.',
  },
  {
    id: 'vault-3',
    name: 'SOVARA_Demo_Script.pdf',
    pages: 3,
    uploadedDate: '24 Sep 2026',
    typeBadge: 'PDF',
    fileName: 'SOVARA_Demo_Script.pdf',
    comparisonType: '3 pages • Video demonstration script',
    description: 'Complete voiceover timestamps and screen directions for sovereign AI demo.',
  },
];

export const INITIAL_ARTIFACTS: ArtifactItem[] = [];
