import { Column } from "@/types/data-types";
import Link from "next/link";
interface KanbanGridProps {
  columnData: Column;
  boardName: string;
  openModul: any;
  setOpenModul: any;
  setTaskName: any;
  colName: any;
  setColumnName: any;
}
const KanbanCard = ({
  columnData,
  boardName,
  openModul,
  setOpenModul,
  setTaskName,
  colName,
  setColumnName,
}: KanbanGridProps) => {
  const columnList = columnData.tasks?.map((col) => col);

  function handleViewTask(name: any) {
    setOpenModul(true);
    setTaskName(name);
    setColumnName(colName);
  }

  return (
    <div className="flex flex-col gap-6  h-[100px]">
      {/*

      // @ts-ignore */}
      {columnData.tasks?.map((task, index) => (
        <div
          key={index}
          // @ts-ignore
          onClick={() => handleViewTask(task.title)}
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
