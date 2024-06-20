"use client";
import { Dispatch, SetStateAction } from "react";
import StatusDropdown from "../ui/dropdown-components/status-dropdown";
import * as Form from "@radix-ui/react-form";
import { Task, Subtask as SubTask } from "@/types/data-types";
import { SpinnerCircularSplit } from "spinners-react";
import FormLabel from "./form-label";

interface EditTaskProps {
  updatedTask: {
    title: string;
    description: string;
    status: any;
    columnId: any;
  };
  setUpdatedTask: {
    (
      value: SetStateAction<{
        title: string;
        description: string;
        status: any;
        columnId: any;
      }>
    ): void;
    (arg0: {
      title: string;
      description: string;
      status: any;
      columnId: any;
    }): void;
  };
  task: Task | undefined;
  setUpdatedSubTasks: {
    (value: SetStateAction<{ subtasks: SubTask[] }>): void;
    (arg0: { subtasks: SubTask[] }): void;
  };
  updatedStatus: string;
  setUpdatedStatus: Dispatch<SetStateAction<string>>;
  columnStatus: any;
  setNewStatus: Dispatch<any>;
  setNewColId: Dispatch<SetStateAction<string>>;
  newStatus: any;
  newColId: string;
  handleUpdateTitle: (e: { preventDefault: () => void }) => Promise<void>;
  handleUpdateSubTask: (e: { preventDefault: () => void }) => Promise<void>;
  loading: boolean;
}
const inputStyle =
  "box-border w-full bg-white inline-flex appearance-none items-center rounded-[4px] p-[10px] text-[13px] leading-none text-black shadow-[0_0_0_1px_#828FA340] outline-none  focus:shadow-[0_0_0_2px_#c18eff] selection:bg-medium-gray/95text-xs font-medium font-['Plus Jakarta Sans'] leading-snug";
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
  newColId,
  handleUpdateTitle,
  handleUpdateSubTask,
  loading,
}: EditTaskProps) => {
  return (
    <div className="absolute w-[480px] mx-auto mt-[10%] bg-white rounded-md p-[32px] pb-[48px] h-auto shadow-lg left-[35%]">
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
              onChange={(e) => {
                const des = e.target.value;

                setUpdatedTask({
                  ...updatedTask,
                  description: des,
                });
              }}
            />
          </Form.Control>
        </Form.Field>

        <FormLabel isLabel={false}>Subtasks</FormLabel>
        <div className="flex flex-col gap-2">
          {task?.subtasks?.map((sub, subIndex) => {
            return (
              <Form.Field
                className="grid mb-[10px]"
                name={`subtask-${subIndex}`}
                key={subIndex}
              >
                <div className="flex items-baseline justify-between"></div>
                <Form.Control asChild>
                  <input
                    className="box-border w-full bg-slate-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_#9443f7]  selection:color-white selection:bg-blackA6"
                    required
                    type="text"
                    value={sub.title}
                    onChange={(e) => {
                      const updatedSubtask = [...task.subtasks];
                      updatedSubtask[subIndex].title = e.target.value;
                      setUpdatedSubTasks({
                        subtasks: updatedSubtask,
                      });
                    }}
                  />
                </Form.Control>
              </Form.Field>
            );
          })}
          <div className="h-10 relative w-full bg-indigo-500/10 rounded-2xl hover:bg-indigo-500/20 transition-colors ease-in delay-150 cursor-pointer">
            <div className="h-10 flex justify-center align-middle items-center text-center text-indigo-500 text-xs font-bold font-['Plus Jakarta Sans'] leading-snug">
              + Add New Subtask
            </div>
          </div>
          <div className="w-full h-16 relative mt-[16px]">
            <FormLabel isLabel={false}>Status</FormLabel>
            <StatusDropdown
              status={task?.status ? task?.status : "Todo"}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
              columnStatus={columnStatus}
              setNewStatus={setNewStatus}
              setNewColId={setNewColId}
              newStatus={newStatus}
              disabled={false}
              inputStyle={inputStyle}
            />
          </div>
          <Form.Submit asChild>
            <div
              className="mt-6 flex justify-center text-center w-full h-10 bg-indigo-500 hover:bg-indigo-700 rounded-2xl align-middle items-center cursor-pointer"
              style={{
                transition: "200ms ease-in",
              }}
            >
              <button
                className="text-white text-xs font-bold  "
                onClick={(e) => {
                  handleUpdateTitle(e), handleUpdateSubTask(e);
                }}
              >
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
              </button>
            </div>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
};

export default EditTask;
