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
    <div className="flex flex-col gap-6 h-[100px]">
      {/*
      // @ts-ignore */}
      <div
        onClick={() => handleViewTask(task.title, task.columnId)}
        className="bg-white hover:bg-violet3 h-[auto] rounded-md shadow-md p-[16px] cursor-pointer"
      >
        <h2 className="text-kblack-main">{task?.title}</h2>
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
