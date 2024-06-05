"use client";

import StatusDropdown from "./status-dropdown";
import Subtask from "./subtask";

interface ViewTaskProps {
  boardName: any;
  taskName: any;
  boards: any;
  setOpenModul: any;
  colName: any;
}
function ViewTask({
  boardName,
  taskName,
  boards,
  setOpenModul,
  colName,
}: ViewTaskProps) {
  const list = boards?.find((l: { name: any }) => l.name === boardName);
  const column = list?.columns.find((n: { name: any }) => n.name === colName);
  const task = column?.tasks.find((t: { title: any }) => t.title === taskName);

  return (
    <div className="w-[480px] mx-auto mt-[10%] bg-white rounded-md p-[32px] pb-[48px] h-auto shadow-lg">
      <div
        className="w-full flex flex-col items-end text-xs text-right"
        onClick={() => setOpenModul(false)}
      >
        <button onClick={() => setOpenModul(false)}>close</button>
      </div>
      <div className=" text-gray-950 text-lg font-bold">{taskName}</div>
      <div className="my-[24px] w-96 text-slate-400 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug">
        {task.description}
      </div>
      <div className="text-slate-400 text-xs font-bold font-['Plus Jakarta Sans'] mb-[16px]">
        Subtasks ({task.subtasks.length} of {task.subtasks.length})
      </div>
      <div className="flex flex-col gap-2">
        <Subtask task={task} />
        <div className="w-96 h-16 relative mt-[16px]">
          <div className="left-0 top-0 absolute text-slate-400 text-xs font-bold font-['Plus Jakarta Sans']">
            Current Status
          </div>
          <StatusDropdown task={task} />
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
