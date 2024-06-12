import { update } from "@/utils/actions";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const data = await request.json();
  const user = await getUserByClerkId();
  const entry = await prisma.task.create({
    data: {
      title: data.title,
      column: {
        connect: { id: data.columnId },
      },
      subtasks: {
        create: data.subtasks,
      },
      status: "pending", // Add the 'status' property with a default value
    },
  });
  update(["/kanban"]);

  return NextResponse.json({ data: { ...entry } });
};
