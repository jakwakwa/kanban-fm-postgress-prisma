"use client";
import { Dispatch, SetStateAction } from "react";
import StatusDropdown from "../ui/dropdown-components/status-dropdown";
import Subtask from "./subtask";
import Image from "next/image";
import { Task } from "@/types/data-types";

interface ViewTaskInpProps {
  handleOptions: () => void;
  openOptions: boolean;
  setEditMode: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  };
  taskName: string;
  task: Task | undefined;
  updatedStatus: string;
  setUpdatedStatus: Dispatch<SetStateAction<string>>;
  columnStatus: any;
  setNewStatus: Dispatch<any>;

  newStatus: any;
  setNewColId: Dispatch<SetStateAction<string>>;
  setUpdatedTask: Dispatch<
    SetStateAction<{
      title: string;
      description: string;
      status: any;
      columnId: any;
    }>
  >;
  deleteTask: any;
}
const ViewTaskInputs = ({
  handleOptions,
  openOptions,
  setEditMode,
  taskName,
  task,
  updatedStatus,
  setUpdatedStatus,
  columnStatus,
  setNewStatus,
  newStatus,
  setNewColId,
  setUpdatedTask,
  deleteTask,
}: ViewTaskInpProps) => {
  return (
    <div className="absolute w-[480px] mx-auto mt-[10%] bg-white rounded-md p-[32px] pb-[48px] h-auto shadow-lg left-[35%]">
      <div className="absolute right-[32px] flex flex-col items-end text-xs text-right">
        <button
          onClick={handleOptions}
          className="flex justify-center align-middle items-center w-6 h-6 hover:border  hover:border-slate-300 rounded-lg"
        >
          <Image
            src={"/assets/icon-vertical-ellipsis.svg"}
            width={4}
            height={4}
            alt={"Options Menu"}
          />
        </button>
      </div>
      {openOptions && (
        <div className="bg-white rounded-lg shadow-lg absolute right-[32px] mt-[25px] p-4 border w-48 h-auto">
          <div className="flex gap-3 flex-col text-left justify-start align-top items-start">
            <button
              className="text-slate-400 hover:text-slate-600 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
              onClick={() => setEditMode(true)}
            >
              Edit Task
            </button>

            <button
              className="text-red-500  hover:text-red-600 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
              onClick={task ? () => deleteTask(task.id) : () => {}}
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
      <div className=" text-gray-950 text-lg capitalize font-bold">
        {taskName}
      </div>
      <div className="my-[24px] w-96 text-kgray-text text-xs font-medium  leading-snug">
        {task?.description}
      </div>
      <div className="text-kgray-text text-xs font-bold  mb-[16px]">
        Subtasks ({task?.subtasks.length} of {task?.subtasks.length})
      </div>
      <div className="flex flex-col gap-2">
        {task?.subtasks !== undefined && (
          <Subtask task={task.subtasks} edit={false} />
        )}
        <div className="w-full h-16 relative mt-[16px]">
          <div className="left-0 top-0 text-kgray-text text-xs font-bold">
            Current Status
          </div>
          <StatusDropdown
            status={task?.status ? task?.status : "Todo"}
            updatedStatus={updatedStatus}
            setUpdatedStatus={setUpdatedStatus}
            // @ts-ignore
            columnStatus={columnStatus as string}
            setNewStatus={setNewStatus}
            newStatus={newStatus}
            disabled={true}
            setNewColId={setNewColId}
            setUpdatedTask={setUpdatedTask}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTaskInputs;
