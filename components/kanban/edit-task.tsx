"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StatusDropdown from "../ui/dropdown-components/status-dropdown";
import * as Form from "@radix-ui/react-form";
import { TaskState, Subtask as SubTask, TaskPayload } from "@/types/data-types";
import { SpinnerCircularSplit } from "spinners-react";
import FormLabel from "./form-label";
import { SUBTASK_STYLE } from "@/constants/theme";
import { addUpdatedSubtaskUtil } from "@/utils/state-utils";

interface EditTaskProps {
  updatedTask: TaskPayload;
  setUpdatedTask: Dispatch<SetStateAction<any>>;
  task: TaskState;
  setUpdatedSubTasks: Dispatch<SetStateAction<any>>;
  updatedStatus: any;
  setUpdatedStatus: Dispatch<SetStateAction<any>>;
  columnStatus: any;
  setNewStatus: Dispatch<SetStateAction<any>>;
  setNewColId: any;
  newStatus: any;
  handleUpdateTitle: any;
  handleUpdateSubTask: any;
  handleAddSubTask: any;
  loading: boolean;
  updatedSubTasks: { subtasks: SubTask[] };
  setNewSubtask: Dispatch<SetStateAction<any>>;
  subTaskLoading: boolean;
  setSubtaskLoading: Dispatch<SetStateAction<boolean>>;
  subtaskAdded: boolean;
  setSubtaskAdded: Dispatch<SetStateAction<boolean>>;
}
const inputStyle =
  "box-border w-full bg-slate-100 placeholder:text-xs placeholder:text-slate-400  placeholder:italic shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_1.3px_#252525]  selection:color-white selection:bg-blackA6 hover:bg-[#e8ebf9]";

const EditTask = ({
  updatedTask,
  setUpdatedTask,
  task,
  setUpdatedSubTasks,
  updatedStatus,
  setUpdatedStatus,
  columnStatus,
  setNewStatus,
  setNewColId,
  newStatus,
  handleUpdateTitle,
  handleUpdateSubTask,
  loading,
  updatedSubTasks,
  handleAddSubTask,
  setNewSubtask,
  subTaskLoading,
  setSubtaskLoading,
  subtaskAdded,
  setSubtaskAdded,
}: EditTaskProps) => {
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  useEffect(() => {
    setSubtaskAdded(false);
    setSubtaskLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddNewSubtask() {
    setDisableAddBtn(true);
    const currentTasks = `${updatedSubTasks.subtasks.length}`;
    setUpdatedSubTasks({
      subtasks: [
        ...updatedSubTasks.subtasks,
        {
          id: currentTasks,
          title: "",
          isCompleted: false,
          taskId: task?.id,
        },
      ],
    });
    setNewSubtask({
      id: "",
      title: "",
      isCompleted: false,
      taskId: task?.id,
    });
  }

  function handleSaveNewSubtask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSubtaskLoading(true);
    setDisableAddBtn(true);
    handleAddSubTask(e);
  }

  useEffect(() => {
    const newSub = updatedSubTasks.subtasks.find(
      (s: { id: string }, i: number) => {
        if (s.id === i.toString()) {
          return s;
        }
      }
    );

    setNewSubtask({
      ...newSub,
    });
  }, [setNewSubtask, updatedSubTasks]);

  const [changed, setChanged] = useState(false);

  return (
    <div className="absolute w-[480px] mx-auto mt-[6%] bg-white rounded-md p-[32px] pb-[48px] h-auto shadow-lg left-[35%]">
      <div className="text-xl font-bold mb-4">Edit Task</div>
      <Form.Root className="w-full">
        <Form.Field className="grid mb-[10px]" name="title">
          <div className="flex items-baseline justify-between">
            <FormLabel>Title</FormLabel>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={`${inputStyle} h-10`}
              required
              placeholder={`e.g. Shopping List`}
              type="text"
              value={updatedTask.title}
              onChange={(e) => {
                const tit = e.target.value;

                setUpdatedTask({
                  ...updatedTask,
                  title: tit,
                });
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="description">
          <div className="flex items-baseline justify-between">
            <FormLabel>Description</FormLabel>
            <Form.Message
              className="text-[13px] text-slate-600 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter a description
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className={`${inputStyle} h-20`}
              value={updatedTask.description}
              placeholder="eg. It's best to take a break every 15mins..."
              onChange={(e) => {
                const updatedDescription = e.target.value;
                setUpdatedTask({
                  ...updatedTask,
                  description: updatedDescription,
                });
              }}
            />
          </Form.Control>
        </Form.Field>

        <div className="mt-6">
          <FormLabel isLabel={false}>Subtasks</FormLabel>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          {updatedSubTasks?.subtasks?.map((sub: SubTask, i: number) => {
            return (
              <Form.Field
                className="grid mb-[10px]"
                name={`subtask-${i}`}
                key={sub.id ? sub.id : `subtask-${i}`}
              >
                <div className="flex items-baseline justify-between"></div>
                <Form.Control asChild>
                  <input
                    className={SUBTASK_STYLE}
                    required
                    type="text"
                    value={sub.title}
                    onChange={(e) => {
                      setUpdatedSubTasks({
                        subtasks: addUpdatedSubtaskUtil(updatedSubTasks, i, e),
                      });
                    }}
                  />
                </Form.Control>
              </Form.Field>
            );
          })}
          {!disableAddBtn && (
            <button className="h-10 relative w-full bg-indigo-500/10 rounded-2xl hover:bg-indigo-500/20 transition-colors ease-in delay-150 cursor-pointer">
              <div
                className="h-10 flex justify-center align-middle items-center text-center text-indigo-500 text-xs font-bold font-['Plus Jakarta Sans'] leading-snug"
                onClick={handleAddNewSubtask}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleAddNewSubtask();
                  }
                }}
              >
                + Add New Subtask
              </div>
            </button>
          )}
          {disableAddBtn && !subtaskAdded ? (
            <button
              className={`h-10 relative w-full rounded-2xl bg-indigo-500  hover:bg-indigo-700 transition-colors ease-in delay-150 cursor-pointer ${
                subTaskLoading && "animate-pulse bg-indigo-300"
              }`}
              onClick={(e) => handleSaveNewSubtask(e)}
            >
              <div
                className={`h-10 flex justify-center align-middle items-center text-center text-white text-xs font-bold font-['Plus Jakarta Sans'] leading-snug`}
              >
                Save New Subtask
              </div>
            </button>
          ) : null}
          <div className="w-full h-16 relative mt-[16px]">
            <FormLabel isLabel={false}>Status</FormLabel>
            <StatusDropdown
              status={task?.status ? task?.status : "Todo"}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
              columnStatus={columnStatus}
              setNewStatus={setNewStatus}
              newStatus={newStatus}
              disabled={false}
              setNewColId={setNewColId}
              changed={changed}
              setChanged={setChanged}
            />
          </div>
          {updatedTask?.title.length < 1 ? (
            <div className="text-indigo-400 border-[#7b81f2] border-[1.2px] px-2 py-1 inline-block text-[8px] rounded w-[70%] mt-4 shadow-md shadow-slate-200 bg-[#ffffff]">
              * Please add a title and status to enable save
            </div>
          ) : null}
          <Form.Submit asChild>
            <button
              className={`mt-6 flex justify-center text-center w-full h-10 bg-indigo-500 hover:bg-indigo-700 rounded-2xl align-middle items-center cursor-pointer disabled:bg-indigo-200  disabled:cursor-not-allowed  ${
                loading ? "cursor-wait animate-pulse" : "cursor-pointer"
              }`}
              disabled={updatedTask?.title.length < 1}
              onClick={(e) => {
                handleUpdateTitle(e);
                handleUpdateSubTask(e);
              }}
            >
              <div className="text-white text-xs font-bold  ">
                <div className="flex flex-row gap-2 align-middle items-center">
                  {!loading ? "Save Changes" : "Saving"}
                  {loading && (
                    <SpinnerCircularSplit
                      size={20}
                      thickness={100}
                      speed={100}
                      color="rgba(255, 255, 255, 1)"
                      secondaryColor="rgba(255, 255, 255, 0.17)"
                    />
                  )}
                </div>
              </div>
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
};

export default EditTask;
