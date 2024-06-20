import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const user = await getUserByClerkId();
    const { taskId, title, isCompleted } = await request.json();

    // Ensure the task belongs to the user
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        column: {
          board: {
            userId: user.id,
          },
        },
      },
    });

    if (!task) {
      console.error("Task not found or does not belong to the user");
      return NextResponse.json(
        { error: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    // Create new subtask
    const newSubtask = await prisma.subtask.create({
      data: {
        title,
        isCompleted,
        taskId,
      },
    });

    return NextResponse.json({ data: { ...newSubtask } });
  } catch (error) {
    console.error("Error adding subtask:", error);
    return NextResponse.json(
      { error: "Failed to add subtask" },
      { status: 500 }
    );
  }
};
