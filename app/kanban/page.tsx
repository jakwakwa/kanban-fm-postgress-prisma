import KanbanContainer from "@/components/kanban/kanban-main";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

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

const KanbanMainPage = async () => {
  const boards = await getBoards();
  return <KanbanContainer boards={boards ?? []} />;
};

export default KanbanMainPage;
