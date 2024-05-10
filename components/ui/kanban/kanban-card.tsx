import { Column } from "@/types/data-types";
interface KanbanGridProps {
  columnData: Column;
}
const KanbanCard = ({ columnData }: KanbanGridProps) => {
  const columnList = columnData.tasks?.map((col) => col);

  return (
    <div className="flex flex-col gap-6  h-[100px]">
      {/*

      // @ts-ignore */}
      {columnData.tasks?.map((task, index) => (
        <div
          key={index}
          className="bg-white h-[auto] rounded-md shadow-md p-[16px]"
        >
          <h2 className="text-kblack-main">{task.title}</h2>
          <h4 className="text-gray-400 mt-[4px]">0 of 3 substasks</h4>
        </div>
      ))}
    </div>
  );
};

export default KanbanCard;
