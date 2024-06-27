import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await getUserByClerkId();
    const board = await prisma.board.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!board || board.userId !== user.id) {
      return NextResponse.json(
        { error: "Board not found or unauthorized" },
        { status: 404 }
      );
    }

    // Retrieve all columns associated with the board
    const columns = await prisma.column.findMany({
      where: {
        boardId: params.id,
      },
    });

    // Delete all subtasks associated with each task in each column
    for (const column of columns) {
      const tasks = await prisma.task.findMany({
        where: {
          columnId: column.id,
        },
      });

      for (const task of tasks) {
        await prisma.subtask.deleteMany({
          where: {
            taskId: task.id,
          },
        });
      }

      // Delete all tasks associated with each column
      await prisma.task.deleteMany({
        where: {
          columnId: column.id,
        },
      });
    }

    // After deleting tasks and subtasks, delete the columns
    await prisma.column.deleteMany({
      where: {
        boardId: params.id,
      },
    });

    // Finally, delete the board
    await prisma.board.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ data: { id: params.id } });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
