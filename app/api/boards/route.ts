import { update } from "@/utils/actions";
import { getUserByClerkId } from "@/utils/auth";

import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const user = await getUserByClerkId();
    const { name, columns, id } = await request.json();

    await prisma.$transaction(async (tx) => {
      // Update existing columns
      await Promise.all(
        columns
          .filter((column: { id: any }) => column.id)
          .map(async (column: { id: any }) =>
            tx.column.update({
              where: { id: column.id },
              data: column,
            })
          )
      );

      // Create new columns
      const createdColumns = await Promise.all(
        columns
          .filter((column: { id: any }) => !column.id)
          .map(async (column: any) =>
            tx.column.create({
              data: { ...column, board: { connect: { id } } },
            })
          )
      );

      // Update board (optional)
      const boardData = { name, user: { connect: { id: user.id } } };
      if (Object.keys(boardData).length > 0) {
        await tx.board.update({ where: { id }, data: boardData });
      }
    });

    update(["/kanban"]);

    return NextResponse.json({ data: { success: true } }); // Response can be modified to include updated board data
  } catch (error) {
    console.error("Error editing board:", error);
    return NextResponse.json(
      { error: "Failed to edit board" },
      { status: 500 }
    );
  }
};
