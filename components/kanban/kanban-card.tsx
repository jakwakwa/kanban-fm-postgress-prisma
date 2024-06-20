import { Task } from "@/types/data-types";
import Link from "next/link";
import React, { useState } from "react";

interface KanbanGridProps {
  task: Task;
  setOpenModul: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  subTaskAmount: number;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  colName: string;
  setColumnName: React.Dispatch<React.SetStateAction<string>>;
  setColumnId: React.Dispatch<React.SetStateAction<string>>;
}

const KanbanCard = ({
  task,
  setOpenModul,
  setTaskName,
  subTaskAmount = 0,
  setTaskId,
  colName,
  setColumnName,
  setColumnId,
}: KanbanGridProps) => {
  // const columnList = columnData.tasks?.map((col) => col);

  function handleViewTask(name: string, id: any) {
    setOpenModul(true);
    setTaskName(name);
    setTaskId(task.id);
    setColumnName(colName);
    setColumnId(id);
  }

  return (
    <div className="flex flex-col gap-4 h-[auto] min-h-[140px] mb-4">
      {/*
      // @ts-ignore */}
      <div
        onClick={() => handleViewTask(task.title, task.columnId)}
        className="bg-white hover:bg-violet3 h-[auto] min-h-[140px] rounded-md shadow-md p-[16px] flex flex-col justify-between cursor-pointer capitalize"
      >
        <div>
          <h2 className="text-2md text-kblack-main">{task?.title}</h2>
          <h3 className="text-slate-500 mt-[4px] font-normal italic text-xs">
            {task.description}
          </h3>
        </div>
        <h4 className="text-slate-600 mt-[4px] text-right">
          {/*
          //  @ts-ignore */}
          {subTaskAmount} of {subTaskAmount} subtasks
        </h4>
      </div>
    </div>
  );
};

export default KanbanCard;
