import { prisma } from "../../lib/prisma";
import StudentDashboardClient from "./StudentDashboardClient";

export const dynamic = "force-dynamic";

export default async function StudentPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    include: { teacher: true }
  });

  return <StudentDashboardClient initialDocuments={documents} />;
}
