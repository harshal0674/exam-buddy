import { prisma } from "../../lib/prisma";
import TeacherDashboardClient from "./TeacherDashboardClient";

export default async function TeacherPage() {
  // Mock finding teacher by role
  let teacher = await prisma.user.findFirst({ where: { role: "TEACHER" } });
  
  let documents = [];
  if (teacher) {
    documents = await prisma.document.findMany({
      where: { teacherId: teacher.id },
      orderBy: { createdAt: "desc" }
    });
  }

  return <TeacherDashboardClient initialDocuments={documents} />;
}
