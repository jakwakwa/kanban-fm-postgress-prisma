import { update } from "@/utils/actions";
import { getUserByClerkId } from "@/utils/auth";

import { prisma } from "@/utils/db";
import { Task } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const user = await getUserByClerkId();
    const { name, columns, id } = await request.json();

    console.info("COLUMNS >>>>>>>>>>>:", columns);

    const updatedBoard = await prisma.board.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        user: {
          connect: { id: user.id },
        },
        columns: {
          update: columns.map(
            (column: { id: any; name: any; tasks?: Task[] }) => ({
              where: { id: column.id },
              data: {
                name: column.name, // Update column name
                tasks: {
                  update: column.tasks?.map((task) => ({
                    where: { id: task.id },
                    data: {
                      status:
                        column.name === task.status ? column.name : task.status, // Update status conditionally
                    },
                  })),
                },
              },
            })
          ),
        },
      },
    });

    // Update tasks in a separate query
    for (const column of columns) {
      for (const task of column.tasks || []) {
        await prisma.task.update({
          where: { id: task.id },
          data: {
            // Update task fields as needed (e.g., description, status)
            subtasks: {
              update: task.subtasks?.map(
                (subtask: { id: any; title: any; isCompleted: any }) => ({
                  where: { id: subtask.id },
                  data: {
                    title: subtask.title, // Update title
                    isCompleted: subtask.isCompleted, // Update completion status
                  },
                })
              ),
            },
          },
        });
      }
    }

    update(["/kanban"]);

    return NextResponse.json({ data: { ...updatedBoard } });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
};
