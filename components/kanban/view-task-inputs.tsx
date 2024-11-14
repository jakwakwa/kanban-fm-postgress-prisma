"use client";
import Subtask from "./subtask";
import Image from "next/image";
import FormLabel from "./form-label";
import ColumnText from "./columns/column-text";
import useStore from "@/context/store";

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

  const { darkMode } = useStore();


  if (!task) {
    return <div>no task available</div>;
  }

  const optionsButtonClass = openOptions
    ? "bg-indigo-100 shadow-md z-30"
    : "bg-white border-1 border-white";

  const deleteTaskHandler = (e: any) => {
    if (task) {
      deleteTask(e, task.id);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white'} absolute w-[480px] h-auto mx-auto mt-[10%] rounded-md p-[32px] pt-[28px] pb-[28px] shadow-lg left-[35%] z-20`}>
      <div className="absolute right-[15px] flex flex-col items-end text-xs text-right top-[20px]">
        <button
          onClick={handleOptions}
          className={`${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white'} flex justify-center align-middle items-center w-7 h-7 hover:opacity-80 hover:bg-slate-100 hover:border-2 hover:border-slate-300 rounded-lg`}
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
        <div className={`${darkMode ? 'bg-[#2B2C37] border-[#3E3F4E]' : 'bg-white'} rounded-lg shadow-lg absolute right-[15px] mt-[22px] p-4 border w-48 h-auto z-20`}>
          <div className="flex gap-3 flex-col text-left justify-start align-top items-start">
            <button
              className={`${darkMode ? 'text-[#828FA3] hover:text-[#828FA3]' : 'text-slate-400 hover:text-slate-600'} text-xs font-medium font-['Plus Jakarta Sans'] leading-snug hover:opacity-80`}
              onClick={() => setEditMode(true)}
            >
              Edit Task
            </button>

            <button
              className="text-red-500  hover:text-red-600 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
              onClick={deleteTaskHandler}
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
      <div className={`${darkMode ? 'text-white' : 'text-kblack-main'} font-bold pb-2 w-full max-w-[88%] leading-tight mb-2 text-[18px]`}>
        {taskName}
      </div>

      <div className={`${darkMode ? 'text-[#828FA3] bg-[#2B2C37] border-[#3E3F4E]' : 'text-kgray-text bg-white'} mb-[34px] mt-[18px] px-4 pb-8 pt-3 rounded-md border w-99 text-[13px] font-normal capitalize leading-normal tracking-tight shadow-sm`}>
        <FormLabel isLabel={false} spacing={true}>
          Description:
        </FormLabel>
        {task?.description ? task?.description : ""}
      </div>

      {task?.subtasks && task?.subtasks.length > 0 && (
        <FormLabel isLabel={false} spacing={false} alignRight={false}>
          Subtasks ({task?.subtasks.length} of {task?.subtasks.length})
        </FormLabel>
      )}

      <div className="flex pl-1 flex-col gap-2">
        {task?.subtasks !== undefined ? (
          <Subtask task={task.subtasks} edit={false} />
        ) : (
          <>
            <FormLabel isLabel={false} spacing={false} alignRight={true}>
              Subtasks
            </FormLabel>
            <div className="text-indgo-400 text-[9px]">
              You have no subtasks yet. Click options and to edit task and add
              subtasks
            </div>
          </>
        )}

        {task?.subtasks === undefined && (
          <hr className="mt-4 border-dashed border border-slate-300" />
        )}
        <div
          className={`w-full flex justify-end h-16 relative ${
            task?.subtasks === undefined ? "mt-[26px]" : "mt-[6px]"
          } `}
        >
          <div className="w-20">
            <FormLabel isLabel={false} spacing={false} alignRight={true}>
              Status
              <div>
                <div className="mt-4 rounded-md w-[100px] justify-start text-slate-700 outline-none focus:shadow-[0_0_0_1.5px] focus:shadow-black text-[10px] flex justify-end items-center capitalize font-bold text-right">
                  <ColumnText color={task?.status} alignRight={true} darkMode={darkMode}>
                    {task?.status}
                  </ColumnText>
                </div>
              </div>
            </FormLabel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskInputs;
