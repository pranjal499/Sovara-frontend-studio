# SOVARA AI Workbench: Architectural Blueprint & Developer Guide

---

## 1. Executive System Overview

**SOVARA AI** is an enterprise-grade sovereign AI workbench engineered for high-assurance, privacy-centric organizations. It processes sensitive data locally or within certified air-gapped environments, ensuring zero telemetry egress to public clouds while maintaining high analytical fidelity.

This codebase delivers a modern, reactive single-page application (SPA) built with:
- **React 19 & TypeScript 5+**
- **Vite 6+ & Tailwind CSS 4+**
- **Motion (Framer Motion v12)**
- **Lucide Icons**
- **Server-Sent Events (SSE) streaming protocol** for real-time task observability.

---

## 2. Full Directory & File Tree

```
├── .env.example                                  # Environment variables configuration template
├── index.html                                    # Application entry point with fonts & favicon
├── package.json                                  # Package dependencies, build & lint scripts
├── vite.config.ts                                # Vite bundler & development server configuration
├── tsconfig.json                                 # TypeScript compiler configuration
├── SOVARA_ARCHITECTURE_AND_DEVELOPER_GUIDE.md    # Comprehensive system & developer documentation (this file)
├── public/
│   └── asset/
│       ├── fav_icon.svg                          # Browser tab icon
│       ├── HeroLogo_mainpage.svg                 # Centered brand hero logo
│       └── Logo_sidebar.svg                      # Sidebar brand header icon
└── src/
    ├── main.tsx                                  # React DOM mounting & root render
    ├── App.tsx                                   # Main orchestrator, route coordinator & layout engine
    ├── index.css                                 # Global styles, fonts, and dark theme variables
    ├── api/
    │   ├── client.ts                             # Typed HTTP & SSE streaming client for SOVARA backend
    │   └── types.ts                              # TypeScript schemas for requests, telemetry, and SSE events
    ├── components/
    │   ├── ArtifactsView.tsx                     # Generated deliverables repository & filter UI
    │   ├── DeleteModal.tsx                       # Reusable accessible confirmation dialog
    │   ├── DocumentViewer.tsx                    # Side-by-side split document previewer (script & tabular viewer)
    │   ├── KnowledgeVault.tsx                    # File context manager, upload interface & document search
    │   ├── MainChat.tsx                          # Primary conversational interface, prompt input & streaming parser
    │   ├── RightBar.tsx                          # Telemetry drawer: execution timeline, citations & tool approvals
    │   ├── SettingsModal.tsx                     # Workspace configuration & local runtime settings modal
    │   ├── Sidebar.tsx                           # Collapsible navigation drawer, session list & user profile
    │   ├── SovaraLogo.tsx                        # Brand logos, spark marks & ribbon thinking loaders
    │   ├── Toast.tsx                             # System feedback toast notifications
    │   └── WindowBar.tsx                         # Desktop collapse trigger rail (hamburger & new chat)
    ├── data/
    │   └── defaultData.ts                        # Initial pre-seeded sessions, vault docs & demo conversations
    └── types/
        └── index.ts                              # Core application domain interfaces and navigation types
```

---

## 3. Component Locations & Responsibility Breakdown

### `src/App.tsx` (Root Orchestrator)
- **File Location**: `/src/App.tsx`
- **What it does**:
  - Acts as the central state hub and layout orchestrator.
  - Controls the `activeTab` (`chat`, `vault`, or `artifacts`).
  - Manages `activeChatId`, `activeChatTitle`, `chatSessions`, and `chatMessages`.
  - **Fresh Start Guarantee**: Sanitizes `localStorage` on boot to permanently purge legacy stuck queries (`sdasdsdcdcd...`). When `handleNewChat` is clicked, it immediately assigns a fresh session ID with an empty message array `[]`, showing the clean hero prompt screen.
  - Manages the **Split Document Viewer**: Coordinates `documentViewerOpen` and `activeDocumentName`. When viewing deliverables (e.g. `SOVARA_Demo_Script` or `Vendor_warrantyReport.pdf`), it splits the viewport 50/50 side-by-side with the chat.
  - Handles Knowledge Vault document synchronization with the backend via `sovaraApi.listVaultDocuments()`.

### `src/components/MainChat.tsx` (Conversational Engine)
- **File Location**: `/src/components/MainChat.tsx`
- **What it does**:
  - Implements dual visual states:
    1. **Hero State** (when message list is empty): Shows the SOVARA watermark logo, centered input capsule, and placeholder: `"Ask SOVARA to research, analyze, or compare..."`.
    2. **Active Conversation State**: Renders message bubbles, streaming cursor, research metrics pill, and input bar.
  - **User Messages**: Renders attached PDF badges (e.g. `Pitchdeck.pdf PDF`) alongside user queries.
  - **Assistant Responses**:
    - Parses formatted bullet points with designated orange badges for Accent Color `#F36223`.
    - Renders the direct deliverable link: `"Download the SOVARA Demo Video Script PDF ⇣"`.
    - Renders interactive attachment cards (`Vendor_warrantyReport.pdf`) with split-view preview triggers.
    - Provides interactive `Sources` buttons (`[View Sources]`, `[Copy]`, `[Expand]`) that sync directly with `RightBar.tsx`.
  - **Backend Streaming**: Connects to `sovaraApi.streamAnalyze` via Server-Sent Events, processing incoming workflow stages, evidence, and telemetry.

### `src/components/DocumentViewer.tsx` (Split-Screen Document Reader & Motion Pipeline)
- **File Location**: `/src/components/DocumentViewer.tsx`
- **What it does**:
  - Renders the right-hand document preview pane matching Screenshots 1 & 2.
  - **Motion & Transition Pipeline**:
    - **Panel Spring Slide (`motion.div` + `<AnimatePresence>`)**: Fluid spring entrance (`damping: 28, stiffness: 240`) when opening and graceful horizontal slide-out on closing.
    - **Header Controls Glide**: Fades and slides down with stagger delay on entrance.
    - **Paper Sheet Elevation**: Ascends from `y: 28` and scales up to `scale: 1` with realistic ambient sheet elevation shadows.
    - **Sovereign Scanning Beam**: A soft cyan verification beam (`via-[#7adfd4]/20`) that sweeps down the document sheet once on opening, signifying local memory verification and invariant safety checks.
    - **Keyboard Escape Listener**: Pressing `Escape` triggers the smooth dismissal animation automatically.
  - **Top Controls**:
    - Close button `✕` with tap feedback that restores full chat width.
    - Active document tab with file icon and document title.
    - Zoom In (`⊕`) and Zoom Out (`⊖`) with reactive percentage indicator (60% to 175%).
    - Download button `⇣` that exports the document locally.
    - Fullscreen toggle button `⤢`.
  - **Document Canvas**:
    - High-legibility paper sheet with realistic elevation shadows.
    - Renders the complete, authentic **SOVARA Demo Video Script** with timestamps (`0:00-0:03`, `0:03-0:08`, `0:08-0:15`, `0:15-0:20`, `0:20-0:36`, `0:36-0:50`, `0:50-1:10`, `1:10-1:40`), voiceover text, and on-screen stage directions.
    - Renders the **Vendor Warranty & Lifecycle Comparison** tabular report comparing Vendor A vs Vendor B.

### `src/components/Sidebar.tsx` (Navigation Drawer & Profile)
- **File Location**: `/src/components/Sidebar.tsx`
- **What it does**:
  - Top header with brand logo and collapse icon `☰`.
  - Primary navigation links: `New Chat`, `Knowledge Vault`, and `Artifacts`.
  - **Recent Chats List**:
    - `Sovara project python backend code`
    - `Analytical Report`
    - `Stock availability check`
    - `Funds transfer optimization`
    - `System configuration`
  - Floating 3-dot context menu for chat sessions: Rename, Pin to top, Archive, and Delete.
  - **Bottom Profile Card**: Shows avatar `AM`, user `Arpit Maaal`, title `Senior intern`, and settings gear icon `⚙`.

### `src/components/RightBar.tsx` (Telemetry, Sources & Approvals)
- **File Location**: `/src/components/RightBar.tsx`
- **What it does**:
  - Sliding drawer accessible from the top header or response pill (`Worked for 69m • 420 sources • 666 searches`).
  - **Activity Tab**: Real-time checklist of execution stages (e.g. planning, retrieval, synthesis, verification).
  - **Sources Tab**: Grounded citations with source filenames, page numbers, and chunk references.
  - **Approvals Tab**: Human-in-the-loop governance interface to review, approve, or reject high-risk tool operations.

### `src/components/KnowledgeVault.tsx` (RAG Context Management)
- **File Location**: `/src/components/KnowledgeVault.tsx`
- **What it does**:
  - Repository of indexed organizational documents (PDF, DOCX, TXT).
  - File upload form with backend integration via `sovaraApi.uploadVaultDocument`.
  - Document detail viewer with metadata (page counts, upload timestamps, and summaries).

### `src/components/ArtifactsView.tsx` (Deliverable Synthesis)
- **File Location**: `/src/components/ArtifactsView.tsx`
- **What it does**:
  - Displays generated artifacts, reports, and code deliverables.
  - Extension filters: `All`, `PDF`, `Docx`, `PPT`, `Code`, `.Md`, `Txt`.

### `src/data/defaultData.ts` (Default Baseline Data & Configurations)
- **File Location**: `/src/data/defaultData.ts`
- **What it does**:
  - Houses the baseline chat sessions, preset messages, and baseline Knowledge Vault documents (`Pitchdeck.pdf`, `Vendor_warrantyReport.pdf`, `SOVARA_Demo_Script.pdf`).
  - Generated deliverables and execution telemetry are populated dynamically through user workflow runs.

### `src/api/client.ts` & `src/api/types.ts` (Network & SSE Layer)
- **File Location**: `/src/api/client.ts`, `/src/api/types.ts`
- **What it does**:
  - Provides a clean TypeScript API client talking to `VITE_SOVARA_API_URL` (default: `http://localhost:8000`).
  - Implements `streamAnalyze` with an EventSource/SSE parser handling `workflow`, `completed`, and `error` events.
  - Implements document uploads, reindexing, approvals, and report retrieval.

---

## 4. Problem Resolution: How the "Stuck Top Query" Was Removed

### The Cause:
A mock user message containing arbitrary keyboard text (`sdasdsdcdcd...`) had previously been seeded in mock data and persisted into the browser's `localStorage` under `sovara_chat_messages`. Because `App.tsx` restored whatever was in `localStorage`, that message was automatically rendered at the top of the chat viewport.

### The Solution:
1. Created `src/data/defaultData.ts` with clean, curated sessions matching Screenshots 1 & 2.
2. In `src/App.tsx`, added a sanitizer loop on initialization that automatically strips any entry containing the corrupt string.
3. Updated `handleNewChat` so that every new chat generates a distinct `chat-session-${Date.now()}` key with an empty message array `[]`.
4. The placeholder was synchronized to `"Ask SOVARA to research, analyze, or compare..."` matching the exact design.

---

## 5. Developer Guide: How to Retrieve and Push Code to Another Branch

To retrieve this codebase and push it to a new branch in your Git repository, execute the following commands in your terminal:

### Step 1: Check Current Git Status
```bash
git status
```
This will display all modified files and untracked files created for this build.

### Step 2: Create and Switch to a New Branch
Pick a descriptive branch name, for example `feature/sovara-workbench-ui`:
```bash
git checkout -b feature/sovara-workbench-ui
```

### Step 3: Stage All Files
Add all files including components, types, styles, assets, and documentation:
```bash
git add .
```

### Step 4: Verify Staged Changes
```bash
git status
```
Ensure all files in `src/`, `public/`, and `SOVARA_ARCHITECTURE_AND_DEVELOPER_GUIDE.md` are staged.

### Step 5: Commit the Code
```bash
git commit -m "feat: implement SOVARA workbench UI, split document viewer, and clean session lifecycle"
```

### Step 6: Push to Your Remote Repository
Push the new branch to your remote Git repository (e.g. GitHub, GitLab, Bitbucket):
```bash
git push -u origin feature/sovara-workbench-ui
```

### Step 7: (Optional) Create a Pull Request or Merge into Main
```bash
# If you want to merge into main locally:
git checkout main
git merge feature/sovara-workbench-ui
git push origin main
```

---

## 6. Development & Build Scripts

- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Type Check / Lint**:
  ```bash
  npm run lint
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

*Authored for the SOVARA Sovereign AI Engineering Team.*
