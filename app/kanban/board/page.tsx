import { prisma } from "@/utils/db";
import KanbanGrid from "@/components/kanban/kanban-grid";
import { getUserByClerkId } from "@/utils/auth";

const getBoards = async () => {
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

const getAllCols = async () => {
  const cols = await prisma.column.findMany({});
  return cols;
};

const getAllSubTasks = async () => {
  const tasks = await prisma.subtask.findMany({});
  return tasks;
};

const Page = async () => {
  const cols = await getAllCols();

  const boardData = await getBoards();

  const subtasks = await getAllSubTasks();
  const isEmpty = false;

  return (
    <>
      {!isEmpty && (
        <KanbanGrid cols={cols} subTasks={subtasks} boards={boardData} />
      )}
    </>
  );
};

export default Page;
