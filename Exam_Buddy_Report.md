# Exam Buddy — Project Report

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Objectives](#objectives)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Features & Modules](#features--modules)
7. [Database Design](#database-design)
8. [API Endpoints](#api-endpoints)
9. [UI/UX Design Philosophy](#uiux-design-philosophy)
10. [Workflow Diagrams](#workflow-diagrams)
11. [Challenges & Solutions](#challenges--solutions)
12. [Future Enhancements](#future-enhancements)
13. [Conclusion](#conclusion)

---

## 1. Executive Summary

**Exam Buddy** is a full-stack educational web application designed to bridge the communication gap between teachers and students in academic institutions. The platform provides a centralized digital hub where teachers can upload and manage previous year question papers, expected questions, and study notes in PDF format — organized by **semester** and **subject**. Students can then access these resources from a single location and leverage integrated **AI assistance** to generate expected exam questions and document summaries on demand.

The application is built using the **Next.js** framework, backed by **Prisma ORM** with a **SQLite** database for local persistence, and features an Apple-inspired dark mode UI that prioritizes elegance and usability.

---

## 2. Problem Statement

In most educational institutions, study materials are scattered across multiple platforms — WhatsApp groups, email threads, physical photocopies, and unorganized shared drives. This creates the following challenges:

- **Students** spend significant time hunting for the correct semester-specific material and often miss important documents.
- **Teachers** lack a professional, organized platform to share structured resources.
- **Previous year question papers** are hard to aggregate and rarely come with intelligent analysis.
- There is **no AI-powered tool** available for free that helps students understand what questions are likely to appear in an exam.

Exam Buddy directly addresses all of these pain points.

---

## 3. Objectives

- ✅ Provide a single, centralized platform for educational materials.
- ✅ Allow teachers to upload PDFs (notes, papers, expected questions) tagged by semester and subject.
- ✅ Allow students to filter and access only their semester-relevant materials.
- ✅ Integrate an AI layer to analyze documents and produce expected questions and summaries.
- ✅ Build a premium, Apple-style dark mode UI that is intuitive and responsive.
- ✅ Use entirely **free and open-source** technologies (no paid API or cloud services required).

---

## 4. System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│   Landing Page → Login Page → Teacher Dashboard / Student       │
│   Dashboard → Document Viewer + AI Assistant                    │
└───────────────────────────────┬────────────────────────────────┘
                                │  HTTP / REST
┌───────────────────────────────▼────────────────────────────────┐
│                    NEXT.JS SERVER (App Router)                  │
│   Server Components  │  Client Components  │  API Routes       │
│   (Data Fetching)    │  (Interactivity)    │  (/api/...)        │
└──────────────────────┬───────────────────────────────────────--┘
                       │
         ┌─────────────┼──────────────┐
         │             │              │
┌────────▼───┐  ┌──────▼──────┐  ┌──▼────────────┐
│  Prisma    │  │  File System │  │  AI Endpoint  │
│  Client    │  │  (public/    │  │  (Mock / Real │
│  (ORM)     │  │  uploads)    │  │  Gemini API)  │
└─────┬──────┘  └─────────────┘  └───────────────┘
      │
┌─────▼──────┐
│  SQLite DB  │
│  (dev.db)   │
└─────────────┘
```

---

## 5. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js 16 (App Router) | Full-stack React framework |
| **Styling** | Vanilla CSS (Custom Design System) | Apple-style dark mode UI |
| **Database ORM** | Prisma v5 | Type-safe DB access |
| **Database** | SQLite | Lightweight local persistence |
| **File Storage** | Local File System (`public/uploads`) | PDF storage on server |
| **State Management** | React `useState` / Cookies | Role-based auth state |
| **AI Integration** | Mock Endpoint (Gemini-ready) | AI question generation |
| **Package Manager** | npm | Dependency management |
| **Runtime** | Node.js (LTS) | Server-side execution |

---

## 6. Features & Modules

### 6.1 Landing Page
- Clean, minimalist home page with a welcome message and brief description.
- Clear entry points for Teacher and Student roles.

### 6.2 Mock Login System
- Role-based mock login that persists session via browser cookies.
- Teachers and Students are directed to separate, purpose-built dashboards.

### 6.3 Teacher Dashboard
- **Upload Panel**: A multi-field form allowing teachers to upload PDFs with:
  - Title
  - Description
  - Semester (Dropdown: Semester 1–8)
  - Subject (Free-text: e.g., Mathematics, Physics)
  - PDF File (file picker, PDF only)
- **Document Library**: A responsive grid displaying all uploaded documents with semester and subject tags.
- Each document card shows the upload date, semester, subject, and a link to view the PDF.

### 6.4 Student Dashboard
- **Smart Onboarding Filter**: On first login, students are asked:
  1. "In which semester are you?"
  2. "Preferred Subject"
- Only documents matching both criteria are displayed — keeping the experience focused.
- A "Change Filters" button allows students to switch their semester/subject at any time.

### 6.5 Document Viewer
- Full-page PDF viewer using a native browser iframe for fast, dependency-free rendering.
- Displays document metadata (uploader, semester, subject).

### 6.6 AI Assistant
- Integrated sidebar on the document viewer page.
- Two quick-action buttons:
  - **Generate Expected Questions**: Returns a list of likely exam questions.
  - **Summarize Document**: Returns a concise summary of the material.
- The backend endpoint is designed to be a drop-in replacement for the Google Gemini API.

---

## 7. Database Design

### Entity-Relationship Diagram

```
┌──────────────────────────────┐         ┌──────────────────────────────────────┐
│           User               │         │              Document                 │
├──────────────────────────────┤         ├──────────────────────────────────────┤
│ id        String (PK, UUID)  │─────────│ id          String (PK, UUID)        │
│ name      String             │  1:many │ title       String                    │
│ role      String (TEACHER /  │         │ description String?                   │
│           STUDENT)           │         │ semester    String (default: "1")     │
│ createdAt DateTime           │         │ subject     String (default: "General")│
└──────────────────────────────┘         │ fileUrl     String                    │
                                         │ teacherId   String (FK → User.id)    │
                                         │ createdAt   DateTime                  │
                                         └──────────────────────────────────────┘
```

### Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        String     @id @default(uuid())
  name      String
  role      String
  createdAt DateTime   @default(now())
  documents Document[]
}

model Document {
  id          String   @id @default(uuid())
  title       String
  description String?
  semester    String   @default("1")
  subject     String   @default("General")
  fileUrl     String
  teacherId   String
  teacher     User     @relation(fields: [teacherId], references: [id])
  createdAt   DateTime @default(now())
}
```

---

## 8. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload a PDF file and save its metadata to the DB |
| `POST` | `/api/ai/generate` | Generate AI insights (expected Q&A or summary) for a document |

### POST `/api/upload` — Request Body (FormData)

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | File (PDF) | ✅ | The PDF document to upload |
| `title` | String | ✅ | Document title |
| `description` | String | ❌ | Optional description |
| `semester` | String | ✅ | Semester number (1–8) |
| `subject` | String | ✅ | Subject name |

### POST `/api/ai/generate` — Request Body (JSON)

| Field | Type | Description |
|---|---|---|
| `documentId` | String | ID of the document to analyze |
| `prompt` | String | Type of analysis: "expected questions" or "summary" |

---

## 9. UI/UX Design Philosophy

Exam Buddy's interface draws deep inspiration from **Apple's official website** design language, implemented entirely in custom CSS without any utility frameworks.

### Key Design Principles

1. **Color Palette**: Pure black (`#000000`) background with white text (`#f5f5f7`), following Apple's premium dark aesthetic.
2. **Typography**: `-apple-system, BlinkMacSystemFont, "SF Pro Text"` — the same font stack used on apple.com.
3. **Glassmorphism Navigation**: The top navigation bar uses `backdrop-filter: blur(20px)` with a semi-transparent dark background for a premium feel.
4. **Micro-animations**: Cards smoothly lift (`translateY(-4px)`) on hover. Buttons have subtle opacity transitions.
5. **Border Radius**: Generous border radii (8px–18px) on cards and inputs for a modern, friendly appearance.
6. **Accent Color**: `#2997ff` — Apple's signature blue — used for primary call-to-action buttons.

---

## 10. Workflow Diagrams

### Teacher Upload Workflow

```
Teacher visits /teacher
       │
       ▼
Fills upload form
(Title, Semester, Subject, PDF)
       │
       ▼
POST /api/upload
       │
       ├──► Save PDF to public/uploads/
       │
       └──► Insert Document record in SQLite
                   │
                   ▼
         Document appears in Teacher's grid
```

### Student Access Workflow

```
Student visits /student
       │
       ▼
Onboarding form shown
("Which semester?" + "Preferred subject?")
       │
       ▼
Filters applied client-side
       │
       ▼
Filtered document grid displayed
       │
       ▼
Student clicks "Open & Study"
       │
       ▼
Document Viewer (/document/[id])
       │
       ├──► PDF displayed in iframe
       │
       └──► Clicks "Generate Expected Questions"
                   │
                   ▼
            POST /api/ai/generate
                   │
                   ▼
            AI response displayed in sidebar
```

---

## 11. Challenges & Solutions

| Challenge | Solution |
|---|---|
| **Node.js not in PATH** on Windows | Used full path (`C:\Program Files\nodejs\npm.cmd`) and winget to install Node.js LTS |
| **Prisma v7 breaking changes** | Downgraded to stable Prisma v5 which uses the familiar datasource URL approach |
| **Project folder name with spaces** (`exam buddy`) | Created the Next.js project in a temp folder then moved files, bypassing npm name restrictions |
| **Dev server lock on Prisma DLL** during `prisma generate` | Stopped the dev server before regenerating the Prisma client |
| **React Hydration Mismatch** | Moved date formatting to ensure consistent server/client rendering |

---

## 12. Future Enhancements

1. **Real Authentication**: Integrate NextAuth.js with email/password or Google OAuth for proper session management and per-user data isolation.
2. **Real AI Integration**: Plug in the Google Gemini API (free tier available) to actually parse PDF text and return intelligent, context-aware questions.
3. **PDF Text Extraction**: Use `pdf-parse` or a similar library to extract raw text from uploaded PDFs and send it to the AI model for true analysis.
4. **Delete/Edit for Teachers**: Allow teachers to remove or update documents they uploaded by mistake.
5. **Student Bookmarks**: Let students bookmark documents for quick access later.
6. **Search**: Implement full-text search across all documents (title, description, subject).
7. **Admin Panel**: A separate admin role to manage all users and all documents.
8. **Cloud Deployment**: Deploy to Vercel (free tier) with a hosted database like Supabase (free tier) for public access.
9. **Notifications**: Email or in-app notifications when a teacher uploads new material for a specific semester.
10. **Mobile App**: Build a companion React Native app using the same API backend.

---

## 13. Conclusion

Exam Buddy successfully demonstrates the power of modern web technologies in solving a real-world educational problem. In a single cohesive platform, teachers can upload and tag study materials by semester and subject, while students enjoy a filtered, personalized view of only the content that matters to them.

The application's architecture — built on Next.js with API Routes, Prisma, SQLite, and a mock AI layer — is deliberately designed to be **free to run**, **easy to extend**, and **production-ready** in its structure. The clean separation of Server and Client Components, combined with a RESTful API design, ensures that adding features (like real AI, authentication, or cloud storage) can be done incrementally without restructuring the codebase.

With the proposed future enhancements — particularly real AI integration and cloud deployment — Exam Buddy has the potential to become a genuinely impactful tool used by students and teachers across institutions.

---

*Report prepared for Exam Buddy — a Next.js Full-Stack Educational Platform.*
*Built with ❤️ using Next.js, Prisma, SQLite, and Vanilla CSS.*
