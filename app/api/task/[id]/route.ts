import { update } from "@/utils/actions";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserByClerkId();

  await prisma.task.delete({
    where: {
      id: params.id,
      column: {
        board: {
          userId: user.id,
        },
      },
    },
  });
  update(["/kanban"]);

  return NextResponse.json({ data: { id: params.id } });
};
export const PATCH = async (request: Request, { params }: { params: any }) => {
  try {
    const { updates } = await request.json();

    const entry = await prisma.task.update({
      where: { id: params.id },
      data: updates,
    });

    update(["/kanban"]);
    return NextResponse.json({ data: { ...entry } });
  } catch (error) {
    // Handle the error here
    console.error(error);
    return NextResponse.error(); // Remove the argument here
  }
};
