"use client";

import StatusDropdown from "../dropdown-components/status-dropdown";
import Subtask from "./subtask";

interface ViewTaskProps {
  boardName: any;
  taskName: any;
  boards: any;
  setOpenModul: any;
  colName: any;
  tasks: any;
  cols: any;
  subTasks: any;
}

function ViewTask({
  boardName,
  taskName,
  boards,
  setOpenModul,
  colName,
  tasks,
  cols,
  subTasks,
}: ViewTaskProps) {
  const list_ = boards?.find((l: { name: any }) => l.name === boardName);
  const column_ = cols.find((n: { name: any }) => n.name === colName);
  const task = tasks.find((t: { title: any }) => t.title === taskName);

  console.log("View Task:", {
    list: [],
    cols,
    colName,
    task,
  });

  return (
    <div className="w-[480px] mx-auto mt-[10%] bg-white rounded-md p-[32px] pb-[48px] h-auto shadow-lg">
      <div
        className="w-full flex flex-col items-end text-xs text-right"
        onClick={() => setOpenModul(false)}
      >
        <button onClick={() => setOpenModul(false)}>close</button>
      </div>
      <div className=" text-gray-950 text-lg font-bold">{taskName}</div>
      <div className="my-[24px] w-96 text-kgray-text text-xs font-medium  leading-snug">
        {task.description}
      </div>
      <div className="text-kgray-text text-xs font-bold  mb-[16px]">
        Subtasks ({subTasks.length} of {subTasks.length})
      </div>
      <div className="flex flex-col gap-2">
        <Subtask task={subTasks} />
        <div className="w-full h-16 relative mt-[16px]">
          <div className="left-0 top-0 text-kgray-text text-xs font-bold">
            Current Status
          </div>
          <StatusDropdown />
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
