import { PrismaClient } from "@prisma/client";
import { getUserByClerkId } from "@/utils/auth";
import { NextResponse } from "next/server";
import { update } from "@/utils/actions";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const user = await getUserByClerkId();
    const { name, columns } = await request.json();

    const newBoard = await prisma.board.create({
      data: {
        name,
        user: {
          connect: { id: user.id },
        },
        columns: {
          create: [...columns],
        },
      },
    });

    update(["/kanban"]);

    return NextResponse.json({ data: { ...newBoard } });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
};
