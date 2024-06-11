import { prisma } from "@/utils/db";
import KanbanGrid from "@/components/ui/kanban/kanban-grid";
import { getUserByClerkId } from "@/utils/auth";

const getBoards = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.board.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return entries;
};

const getAllCols = async () => {
  const cols = await prisma.column.findMany({});
  return cols;
};

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany({});
  return tasks;
};

const getAllSubTasks = async () => {
  const tasks = await prisma.subtask.findMany({});
  return tasks;
};

const Page = async () => {
  const boardsDb = await getBoards();
  const cols = await getAllCols();
  const tasks = await getAllTasks();
  const subtasks = await getAllSubTasks();

  const isEmpty = false;

  return (
    <>
      {!isEmpty && (
        <KanbanGrid
          boardsFromDb={boardsDb}
          cols={cols}
          tasks={tasks}
          subTasks={subtasks}
        />
      )}
    </>
  );
};

export default Page;
