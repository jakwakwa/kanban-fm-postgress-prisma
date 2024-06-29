import { update } from "@/utils/actions";

import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { name, id } = await request.json();

    const updatedBoard = await prisma.board.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    update(["/kanban"]);

    return NextResponse.json({ data: { ...updatedBoard } });
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
};
