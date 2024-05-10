import KanbanGrid from "@/components/ui/kanban/kanban-grid";

const Page = () => {
  const isEmpty = false;

  return <>{!isEmpty && <KanbanGrid />}</>;
};

export default Page;
