const PptxGenJS = require("pptxgenjs");

const prs = new PptxGenJS();

// Theme colors
const BLACK = "000000";
const WHITE = "F5F5F7";
const ACCENT = "2997FF";
const GRAY = "86868B";
const DARK_CARD = "1D1D1F";

// Helper: Add a standard slide with dark background
function addSlide(title, subtitle) {
  const slide = prs.addSlide();
  slide.background = { color: BLACK };

  if (title) {
    slide.addText(title, {
      x: 0.5, y: 0.4, w: 9, h: 1,
      fontSize: 36, bold: true, color: WHITE,
      fontFace: "Helvetica Neue",
    });
  }
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 1.35, w: 9, h: 0.6,
      fontSize: 18, color: GRAY,
      fontFace: "Helvetica Neue",
    });
  }
  return slide;
}

// Helper: Add a bullet list
function addBullets(slide, items, x, y, w, h) {
  const bullets = items.map(text => ({ text, options: { bullet: { type: "bullet" }, paraSpaceAfter: 8 } }));
  slide.addText(bullets, {
    x, y, w, h,
    fontSize: 15, color: WHITE,
    fontFace: "Helvetica Neue",
    valign: "top",
  });
}

// ── SLIDE 1: Title ──────────────────────────────────────────────
const s1 = prs.addSlide();
s1.background = { color: BLACK };
s1.addText("Exam Buddy", {
  x: 0.5, y: 1.5, w: 9, h: 1.4,
  fontSize: 54, bold: true, color: WHITE,
  fontFace: "Helvetica Neue", align: "center",
});
s1.addText("A Full-Stack Educational Resource Platform", {
  x: 0.5, y: 3.0, w: 9, h: 0.6,
  fontSize: 22, color: ACCENT,
  fontFace: "Helvetica Neue", align: "center",
});
s1.addText("Built with Next.js · Prisma · SQLite · AI Integration", {
  x: 0.5, y: 3.8, w: 9, h: 0.5,
  fontSize: 14, color: GRAY,
  fontFace: "Helvetica Neue", align: "center",
});

// ── SLIDE 2: Problem Statement ───────────────────────────────────
const s2 = addSlide("Problem Statement", "What pain points does Exam Buddy solve?");
addBullets(s2, [
  "Study materials are scattered across WhatsApp groups, emails, and photocopies",
  "Students struggle to find semester-specific and subject-specific resources",
  "Teachers lack a professional platform to share structured content",
  "Previous year papers are hard to aggregate and lack intelligent analysis",
  "No free AI tool exists to help students predict likely exam questions",
], 0.5, 1.9, 9, 3.5);

// ── SLIDE 3: Objectives ──────────────────────────────────────────
const s3 = addSlide("Objectives", "What we set out to build");
addBullets(s3, [
  "Centralized platform for all educational materials",
  "Teacher portal: Upload PDFs tagged by Semester & Subject",
  "Student portal: Filtered access — only relevant materials",
  "AI layer: Generate expected exam questions & summaries",
  "Apple-style dark mode UI — premium look and feel",
  "100% free-to-run: No paid APIs or cloud services",
], 0.5, 1.9, 9, 3.5);

// ── SLIDE 4: Technology Stack ─────────────────────────────────────
const s4 = addSlide("Technology Stack", "Tools and frameworks powering Exam Buddy");
const techRows = [
  ["Frontend", "Next.js 16 (App Router) + Vanilla CSS"],
  ["Database", "SQLite via Prisma ORM"],
  ["File Storage", "Local file system (public/uploads)"],
  ["Auth", "Cookie-based mock role auth"],
  ["AI", "Mock endpoint (Gemini API-ready)"],
  ["Runtime", "Node.js LTS on Windows"],
];
let ty = 1.9;
techRows.forEach(([label, value]) => {
  s4.addText(label, { x: 0.5, y: ty, w: 2.5, h: 0.45, fontSize: 14, bold: true, color: ACCENT, fontFace: "Helvetica Neue" });
  s4.addText(value, { x: 3.2, y: ty, w: 6.5, h: 0.45, fontSize: 14, color: WHITE, fontFace: "Helvetica Neue" });
  ty += 0.52;
});

// ── SLIDE 5: System Architecture ─────────────────────────────────
const s5 = addSlide("System Architecture", "How the components fit together");
s5.addText(
  "Browser Client\n(Next.js Pages & Components)\n\n           ↕  HTTP / REST\n\nNext.js Server (API Routes)\n\n     ↙               ↓               ↘\n\nPrisma ORM    File System    AI Endpoint\n(SQLite DB)   (PDF files)   (Mock/Gemini)",
  {
    x: 1, y: 1.8, w: 8, h: 3.8,
    fontSize: 14, color: WHITE,
    fontFace: "Courier New",
    align: "center", valign: "top",
    fill: { color: DARK_CARD },
    line: { color: "333336", width: 1 },
    margin: [16, 16, 16, 16],
  }
);

// ── SLIDE 6: Key Features — Teacher ──────────────────────────────
const s6 = addSlide("Teacher Dashboard", "What teachers can do on Exam Buddy");
addBullets(s6, [
  "Secure role-based login as Teacher",
  "Upload PDFs: notes, papers, expected questions",
  "Tag each upload with Semester (1–8) and Subject",
  "View all uploaded documents in a responsive grid",
  "Each card shows: title, date, semester, subject",
  "Delete documents uploaded by mistake (upcoming)",
], 0.5, 1.9, 9, 3.5);

// ── SLIDE 7: Key Features — Student ──────────────────────────────
const s7 = addSlide("Student Dashboard", "What students experience on Exam Buddy");
addBullets(s7, [
  "Secure role-based login as Student",
  "Smart onboarding: 'Which semester are you in?'",
  "Select preferred subject to filter content",
  "Only relevant materials are shown — no noise",
  "'Change Filters' button to switch anytime",
  "Open documents in a built-in PDF viewer",
], 0.5, 1.9, 9, 3.5);

// ── SLIDE 8: AI Assistant ─────────────────────────────────────────
const s8 = addSlide("AI Assistant", "Intelligent insights at the click of a button");
addBullets(s8, [
  "Integrated AI sidebar on every Document Viewer page",
  "Button: 'Generate Expected Questions' → returns likely exam questions",
  "Button: 'Summarize Document' → returns concise notes summary",
  "Backend endpoint is Gemini API-ready (free tier)",
  "Currently uses a smart mock engine for demonstration",
  "Easily upgraded by plugging in a free Google Gemini API key",
], 0.5, 1.9, 9, 3.5);

// ── SLIDE 9: Database Design ─────────────────────────────────────
const s9 = addSlide("Database Design", "Two core models power the platform");
s9.addText("User Model", { x: 0.5, y: 1.9, w: 4, h: 0.4, fontSize: 16, bold: true, color: ACCENT, fontFace: "Helvetica Neue" });
addBullets(s9, ["id (UUID, PK)", "name (String)", "role (TEACHER | STUDENT)", "createdAt (DateTime)"], 0.5, 2.35, 4, 1.8);

s9.addText("Document Model", { x: 5, y: 1.9, w: 4.5, h: 0.4, fontSize: 16, bold: true, color: ACCENT, fontFace: "Helvetica Neue" });
addBullets(s9, ["id (UUID, PK)", "title, description", "semester, subject", "fileUrl (local path)", "teacherId (FK → User)", "createdAt (DateTime)"], 5, 2.35, 4.5, 2.2);

s9.addText("One Teacher → Many Documents (1:N relationship)", {
  x: 0.5, y: 4.7, w: 9, h: 0.4,
  fontSize: 13, color: GRAY, italic: true, fontFace: "Helvetica Neue",
});

// ── SLIDE 10: UI/UX Design ──────────────────────────────────────
const s10 = addSlide("UI/UX Design Philosophy", "Inspired by Apple's design language");
addBullets(s10, [
  "Pure black (#000000) background — same as apple.com dark mode",
  "Typography: -apple-system / SF Pro Text font stack",
  "Glassmorphism nav bar: backdrop-filter blur(20px)",
  "Accent color: #2997FF (Apple's signature blue)",
  "Micro-animations: cards lift on hover, smooth transitions",
  "No utility frameworks — 100% custom vanilla CSS",
], 0.5, 1.9, 9, 3.5);

// ── SLIDE 11: Challenges & Solutions ────────────────────────────
const s11 = addSlide("Challenges & Solutions", "Key technical hurdles overcome");
const challenges = [
  ["Node.js not in PATH", "Used full executable path + winget installer"],
  ["Prisma v7 breaking changes", "Downgraded to stable Prisma v5"],
  ["Folder name with spaces", "Created project in temp dir, then moved files"],
  ["React Hydration Mismatch", "Ensured consistent server/client date rendering"],
];
let cy = 1.9;
challenges.forEach(([prob, sol]) => {
  s11.addText(`⚠ ${prob}`, { x: 0.5, y: cy, w: 4.2, h: 0.45, fontSize: 13, bold: true, color: "FF9F0A", fontFace: "Helvetica Neue" });
  s11.addText(`✓ ${sol}`, { x: 4.9, y: cy, w: 4.8, h: 0.45, fontSize: 13, color: "30D158", fontFace: "Helvetica Neue" });
  cy += 0.6;
});

// ── SLIDE 12: Future Enhancements ────────────────────────────────
const s12 = addSlide("Future Enhancements", "Roadmap for the next version");
addBullets(s12, [
  "Real Authentication — NextAuth.js with Google OAuth",
  "Real AI — Google Gemini API (free tier) for true PDF analysis",
  "PDF Text Extraction — using pdf-parse library",
  "Delete & Edit for Teachers — manage uploads",
  "Search — full-text search across all documents",
  "Cloud Deployment — Vercel + Supabase (free tiers)",
  "Mobile App — React Native companion app",
], 0.5, 1.9, 9, 3.8);

// ── SLIDE 13: Conclusion ──────────────────────────────────────────
const s13 = addSlide("Conclusion", "");
s13.addText(
  "Exam Buddy successfully bridges the gap between teachers and students by providing a centralized, intelligent, and beautifully designed educational platform.",
  { x: 0.5, y: 1.6, w: 9, h: 1.2, fontSize: 17, color: WHITE, fontFace: "Helvetica Neue", align: "center" }
);
addBullets(s13, [
  "✅ Free to run — no paid services required",
  "✅ Production-ready architecture — easy to extend",
  "✅ AI-ready — one API key away from real intelligence",
  "✅ Premium UI — Apple-inspired dark mode design",
], 1.5, 3.0, 7, 2.0);
s13.addText("Built with Next.js · Prisma · SQLite · Vanilla CSS", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontSize: 13, color: GRAY, align: "center", fontFace: "Helvetica Neue",
});

// ── WRITE FILE ─────────────────────────────────────────────────────
prs.writeFile({ fileName: "Exam_Buddy_Presentation.pptx" }).then(() => {
  console.log("✅ Exam_Buddy_Presentation.pptx created successfully!");
});
