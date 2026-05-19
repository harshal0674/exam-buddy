import { prisma } from "../../../lib/prisma";
import DocumentViewerClient from "./DocumentViewerClient";
import { notFound } from "next/navigation";

export default async function DocumentPage({ params }) {
  const { id } = await params;
  
  const document = await prisma.document.findUnique({
    where: { id },
    include: { teacher: true }
  });

  if (!document) {
    notFound();
  }

  return <DocumentViewerClient document={document} />;
}
