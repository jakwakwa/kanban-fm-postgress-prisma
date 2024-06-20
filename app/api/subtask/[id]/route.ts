import { update } from "@/utils/actions";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

// TASK REMOVAL ( Delete Task )
export const DELETE_TASK = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await getUserByClerkId();

    // Ensure the task belongs to the user
    const task = await prisma.task.findUnique({
      where: {
        id: params.id,
      },
      include: {
        column: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!task || task.column.board.userId !== user.id) {
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.task.delete({
      where: {
        id: params.id,
      },
    });

    update(["/kanban/subtask"]);

    return NextResponse.json({ data: { id: params.id } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
};

// TASK UPDATES ( Edit Task )

// SUBTASK UPDATES ( Edit Subtask )
export const PATCH = async (request: Request, { params }: { params: any }) => {
  try {
    const { updates } = await request.json();

    const updatedSubtaskEntry = await prisma.subtask.update({
      where: { id: params.id },
      data: updates,
    });

    update(["/kanban"]);
    return NextResponse.json({ data: { ...updatedSubtaskEntry } });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
