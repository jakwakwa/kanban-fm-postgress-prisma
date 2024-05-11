import { Column } from "@/types/data-types";
import Link from "next/link";
interface KanbanGridProps {
  columnData: Column;
  boardName: string;
}
const KanbanCard = ({ columnData, boardName }: KanbanGridProps) => {
  const columnList = columnData.tasks?.map((col) => col);

  return (
    <div className="flex flex-col gap-6  h-[100px]">
      {/*

      // @ts-ignore */}
      {columnData.tasks?.map((task, index) => (
        <Link
          key={index}
          href={{
            pathname: `/kanban/task/${boardName}/`,
            query: {
              title: task.title,
              board: boardName,
              column: columnData.name,
            },
          }}
        >
          <div className="bg-white h-[auto] rounded-md shadow-md p-[16px]">
            <h2 className="text-kblack-main">{task.title}</h2>
            <h4 className="text-gray-400 mt-[4px]">0 of 3 substasks</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default KanbanCard;
