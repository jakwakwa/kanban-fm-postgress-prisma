import { update } from "@/utils/actions";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const user = await getUserByClerkId();
    const { title, description, columnId, status } = await request.json();

    // Ensure the column belongs to the user
    const column = await prisma.column.findUnique({
      where: {
        id: columnId,
      },
      include: {
        board: true,
      },
    });

    if (!column) {
      console.error("Column not found");
      return NextResponse.json({ error: "Column not found" }, { status: 404 });
    }

    if (column.board.userId !== user.id) {
      console.error("Unauthorized access to column");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        column: {
          connect: { id: columnId },
        },
      },
    });

    update(["/kanban"]);

    return NextResponse.json({ data: { ...newTask } });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
};
