"use client";
import Subtask from "./subtask";
import Image from "next/image";
import FormLabel from "./form-label";
import ColumnText from "./columns/column-text";

interface ViewTaskInpProps {
  handleOptions: any;
  openOptions: any;
  setEditMode: any;
  taskName: any;
  task: any;
  deleteTask: any;
}
const ViewTaskInputs = ({
  handleOptions,
  openOptions,
  setEditMode,
  taskName,
  task,
  deleteTask,
}: ViewTaskInpProps) => {
  return (
    <div className="absolute w-[480px] h-auto mx-auto mt-[10%] bg-white rounded-md p-[32px] pb-[48px] shadow-lg left-[35%]">
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
              onClick={task ? (e) => deleteTask(e, task.id) : () => {}}
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
      <div className=" text-gray-950 text-lg capitalize font-bold pb-2">
        {taskName}
      </div>
      <hr />
      <div className="my-[24px] w-99 text-gray-950  text-[11px] font-bold capitalize leading-relaxed tracking-normal">
        <FormLabel isLabel={false}>Description</FormLabel>
        {task?.description}
        <hr className="mt-4" />
      </div>

      {task?.subtasks && task?.subtasks.length > 0 && (
        <div className="text-kgray-text text-xs font-bold  mb-[16px]">
          Subtasks ({task?.subtasks.length} of {task?.subtasks.length})
        </div>
      )}
      <div className="flex flex-col gap-2">
        {task?.subtasks !== undefined && (
          <Subtask task={task.subtasks} edit={false} />
        )}
        <hr className="mt-2" />
        <div className="w-full h-16 relative mt-[26px]">
          <FormLabel isLabel={false} spacing={true}>
            Status
          </FormLabel>
          <div>
            <div className="mt-4 rounded-md w-[100px] h-10 justify-start text-slate-700 outline-none focus:shadow-[0_0_0_1.5px] focus:shadow-black text-[10px] flex items-center capitalize font-bold text-left">
              <div className="text-left"></div>
              <div className="text-black my-0 pl-2">
                <ColumnText color={task.status}>
                  <div className="text-xs">{task.status}</div>
                </ColumnText>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ViewTaskInputs;
