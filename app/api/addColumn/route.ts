import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
import { update } from "@/utils/actions";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const { name, boardId } = await request.json();

    const newColumn = await prisma.column.create({
      data: {
        name,
        board: {
          connect: { id: boardId },
        },
      },
    });

    update(["/kanban"]);

    return NextResponse.json({ data: { ...newColumn } });
  } catch (error) {
    console.error("Error adding column:", error);
    return NextResponse.json(
      { error: "Failed to add column" },
      { status: 500 }
    );
  }
};
