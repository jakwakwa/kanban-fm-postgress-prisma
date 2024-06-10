import { Column } from "@/types/data-types";
import Link from "next/link";
interface KanbanGridProps {
  columnData: any;
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
  // const columnList = columnData.tasks?.map((col) => col);

  function handleViewTask(name: any) {
    setOpenModul(true);
    setTaskName(name);
    setColumnName(colName);
  }

  // console.log("columnData:", columnData);

  return (
    <div className="flex flex-col gap-6 h-[100px]">
      {/*

      // @ts-ignore */}

      <div
        // @ts-ignore
        onClick={() => handleViewTask(columnData.title)}
        className="bg-white hover:bg-violet3 h-[auto] rounded-md shadow-md p-[16px] cursor-pointer"
      >
        <h2 className="text-kblack-main">{columnData?.title}</h2>
        <h4 className="text-gray-400 mt-[4px]">0 of 3 substasks</h4>
      </div>
    </div>
  );
};

export default KanbanCard;
