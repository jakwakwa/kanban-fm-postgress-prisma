import KanbanHeader from "../ui/kanban/header";
import SideNav from "../ui/kanban/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#F4F7FD]">
      <div className="w-full flex-none md:w-64">
        <KanbanHeader />
        <SideNav />
      </div>
      <div className="w-[20000px] flex-grow p-6 md:overflow-y-auto md:p-0">
        {children}
      </div>
    </div>
  );
}
