import KanbanHeader from "../../components/ui/header";
import SideNav from "../../components/ui/kanban/sidenav";

import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

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
  const cols = await prisma.column.findMany({});
  return cols;
};

const getTasks = async () => {
  const tasks = await prisma.task.findMany({});
  return tasks;
};

const getSubTasks = async () => {
  const tasks = await prisma.subtask.findMany({});
  return tasks;
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const boards = await getBoards();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#F4F7FD]">
      <div className="w-full flex-none md:w-64">
        <KanbanHeader />
        <SideNav boards={boards} />
      </div>
      <div className="w-full flex-grow p-6 md:overflow-y-auto md:p-0">
        {children}
      </div>
    </div>
  );
}
