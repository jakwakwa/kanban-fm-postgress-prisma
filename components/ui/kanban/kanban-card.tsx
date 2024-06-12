import { Column } from "@/types/data-types";
import Link from "next/link";
interface KanbanGridProps {
  columnData: any;
  boardName: string;
  openModul: any;
  setOpenModul: any;
  setTaskName: any;
  subTaskAmount: number;
  setTaskId: any;
  colName: any;
  setColumnName: any;
  setColumnId: any;
}
const KanbanCard = ({
  columnData,
  boardName,
  openModul,
  setOpenModul,
  setTaskName,
  subTaskAmount = 0,
  setTaskId,
  colName,
  setColumnName,
  setColumnId,
}: KanbanGridProps) => {
  // const columnList = columnData.tasks?.map((col) => col);

  function handleViewTask(name: any, id: any) {
    setOpenModul(true);
    setTaskName(name);
    setTaskId(columnData.id);
    setColumnName(colName);
    setColumnId(id);
  }

  return (
    <div className="flex flex-col gap-6 h-[100px]">
      {/*

      // @ts-ignore */}

      <div
        // @ts-ignore
        onClick={() => handleViewTask(columnData.title, columnData.columnId)}
        className="bg-white hover:bg-violet3 h-[auto] rounded-md shadow-md p-[16px] cursor-pointer"
      >
        <h2 className="text-kblack-main">{columnData?.title}</h2>
        <h4 className="text-gray-400 mt-[4px]">
          {/*
                      //  @ts-ignore */}
          {subTaskAmount} of {subTaskAmount} subtasks
        </h4>
      </div>
    </div>
  );
};

export default KanbanCard;
