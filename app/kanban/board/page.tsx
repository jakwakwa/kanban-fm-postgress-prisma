import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import KanbanGrid from "@/components/kanban/kanban-grid";

const getAllKanbanData = async () => {
  const user = await getUserByClerkId();
  const boards = await prisma.board.findMany({
    where: {
      userId: user.id,
    },
    include: {
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return boards;
};

const getAllSubTasks = async () => {
  const tasks = await prisma.subtask.findMany({});
  return tasks;
};

const Page = async () => {
  const userKanbanData = await getAllKanbanData();
  const subtasks = await getAllSubTasks();
  const isEmpty = false;

  if (!isEmpty) {
    return <KanbanGrid subTasks={subtasks} boards={userKanbanData} />;
  }
};

export default Page;
