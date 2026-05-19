import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");
    const semester = formData.get("semester") || "1";
    const subject = formData.get("subject") || "General";

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const filename = uuidv4() + "_" + file.name.replace(/\s/g, "_");

    // Upload to Vercel Blob (persists across serverless invocations)
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type || "application/pdf",
    });

    // Get or create dummy teacher
    let teacher = await prisma.user.findFirst({ where: { role: "TEACHER" } });
    if (!teacher) {
      teacher = await prisma.user.create({
        data: {
          name: "Mr. Smith",
          role: "TEACHER",
        },
      });
    }

    // Save document to DB with the Blob URL
    const document = await prisma.document.create({
      data: {
        title,
        description,
        semester,
        subject,
        fileUrl: blob.url,
        teacherId: teacher.id,
      },
    });

    return NextResponse.json({ Message: "Success", status: 201, document });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
