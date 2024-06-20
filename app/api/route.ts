import { update } from "@/utils/actions";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const user = await getUserByClerkId();
    const { title, description, columnId, status } = await request.json();

    const column = await prisma.column.findUnique({
      where: {
        id: columnId,
      },
      include: {
        board: true,
      },
    });

    if (!column || column.board.userId !== user.id) {
      return NextResponse.json(
        { error: "Column not found or unauthorized" },
        { status: 404 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        columnId,
        status,
        column: {
          connect: { id: columnId },
        },
      },
    });

    update(["/kanban/"]);

    return NextResponse.json({ data: { ...newTask } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
};
