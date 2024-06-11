"use client";
import StatusDropdown from "../dropdown-components/status-dropdown";
import Subtask from "./subtask";

interface ViewTaskProps {
  taskName: any;
  setOpenModul: any;
  tasks: any;
}

function ViewTask({ taskName, setOpenModul, tasks }: ViewTaskProps) {
  const task = tasks.find((t: { title: any }) => t.title === taskName);

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
        Subtasks ({task.subtask.length} of {task.subtask.length})
      </div>
      <div className="flex flex-col gap-2">
        {task?.subtask !== undefined && <Subtask task={task.subtask} />}
        <div className="w-full h-16 relative mt-[16px]">
          <div className="left-0 top-0 text-kgray-text text-xs font-bold">
            Current Status
          </div>
          <StatusDropdown status={task.status} />
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
