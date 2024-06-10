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

const getCols = async () => {
  const cols = await prisma.column.findMany({
    where: {
      boardId: "3058343c-d404-4518-932f-c6e90abca933",
    },
  });
  return cols;
};

const getTasks = async () => {
  const tasks = await prisma.task.findMany({
    where: {
      columnId: "2bebe55f-2625-4909-b2f8-e881443c7a10",
    },
  });
  return tasks;
};

const getSubTasks = async () => {
  const tasks = await prisma.subtask.findMany({
    where: {
      taskId: "578cd444-700f-40ee-9138-6eb097c83c33",
    },
  });
  return tasks;
};

const Page = async () => {
  const entries = await getBoards();
  const cols = await getCols();
  const tasks = await getTasks();
  const subtasks = await getSubTasks();
  console.log("entries", entries);
  console.log("cols", cols);
  console.log("tasks", tasks);
  console.log("subtasks", subtasks);
  const isEmpty = false;

  return (
    <>
      {!isEmpty && (
        <KanbanGrid
          boardsFromDb={entries}
          cols={cols}
          tasks={tasks}
          subTasks={subtasks}
        />
      )}
    </>
  );
};

export default Page;
