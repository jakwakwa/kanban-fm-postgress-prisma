
import KanbanHeader from "../../components/ui/header";
import SideNav from "../../components/kanban/sidenav";
import MobileMessage from "@/components/kanban/mobile-message";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getBoards = async () => {
  const user = await getUserByClerkId();

  const boards = await prisma.board.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return boards;
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const boards = await getBoards();

  return (
    <>
      {/* Mobile Message */}
      <div className="md:hidden">
        <MobileMessage />
      </div>

      {/* Desktop Kanban Board */}
      <div className="hidden md:flex kanban-bg h-screen flex-col md:flex-row md:overflow-hidden">
        {/* @ts-ignore */}
        <SideNav boards={boards} kanban={children}  />
      </div>
    </>
  );
}
