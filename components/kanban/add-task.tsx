"use client";
import { useState } from "react";
import StatusDropdown from "../ui/dropdown-components/status-dropdown";
import * as Form from "@radix-ui/react-form";
import { Subtask } from "@/types/data-types";
import { SpinnerCircularSplit } from "spinners-react";
import FormLabel from "./form-label";
import { commonClasses } from "./kanban-grid-styles";

interface StateT {
  isDisabled: boolean;
  openModul: boolean;
  taskName: string;
  taskId: string;
  columnName: string;
  columnId: string;
  open: boolean;
  openDeleteToast: boolean;
  loading: boolean;
  addTaskMode: boolean;
  newTask: {
    columnId: string;
    title: string;
    description: string;
    status: string;
  };
  newSubtasks: Subtask[];
}
interface AddTaskProps {
  state: StateT;
  setState: (state: any) => void;
  handleAddTask: any;
  columnStatus: any;
  boardId: string;
  darkMode: boolean;
}

const AddTask = ({
  state,
  setState,
  handleAddTask,
  columnStatus,
  boardId,
  darkMode,
}: AddTaskProps) => {
  const [changed, setChanged] = useState(false);

  const [newStatus, setNewStatus] = useState<any>(
    '{"columnId":"","columnStatus":""}'
  );

  const [newColId, setNewColId] = useState("");

  const [updatedStatus, setUpdatedStatus] = useState(
    `{"columnId":"${state.newTask?.columnId}","columnStatus":"${
      state.newTask?.status ? state.newTask?.status : "Todo"
    }", "boardId":"${boardId}"}`
  );

  return (
    <div className={`absolute z-50 w-[480px] mx-auto mt-[6%] rounded-md p-[32px] pb-[48px] h-auto shadow-lg left-[35%] ${darkMode ? 'bg-[#2b2c37] text-white' : 'bg-white'}`}>
      <div className="text-xl font-bold mb-4">Add New Task</div>
      <Form.Root className="w-full">
        <Form.Field className="grid mb-[10px]" name="title">
          <div className="flex items-baseline justify-between">
            <FormLabel>Title</FormLabel>
            <Form.Message
              className={`text-[13px] opacity-[0.8] ${darkMode ? 'text-white' : 'text-slate-600'}`}
              match="valueMissing"
            >
              Please enter task title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={darkMode ? commonClasses.input.dark : commonClasses.input.base}
              required
              type="text"
              placeholder={`e.g. Collect the Laundry.`}
              value={state.newTask?.title}
              onChange={(e) => {
                const newTaskTitle = e.target.value;
                setState((prevState: StateT) => ({
                  ...prevState,
                  newTask: { ...state.newTask, title: newTaskTitle },
                }));
              }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-[10px]" name="description">
          <div className="flex items-baseline justify-between">
            <FormLabel>Description</FormLabel>
            <Form.Message
              className={`text-[13px] opacity-[0.8] ${darkMode ? 'text-white' : 'text-slate-600'}`}
              match="valueMissing"
            >
              Please enter a description
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className={darkMode ? commonClasses.input.dark : commonClasses.input.base}
              placeholder={`e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`}
              value={state.newTask.description}
              onChange={(e) => {
                const newTaskDesc = e.target.value;

                setState((prevState: StateT) => ({
                  ...prevState,
                  newTask: { ...state.newTask, description: newTaskDesc },
                }));
              }}
            />
          </Form.Control>
        </Form.Field>

        <div className="flex flex-col gap-2">
          <div className="w-full h-16 relative mt-[16px]">
            <FormLabel isLabel={false}>Status</FormLabel>
            <StatusDropdown
              status={state.newTask.status}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
              columnStatus={columnStatus}
              setNewStatus={setNewStatus}
              setNewColId={setNewColId}
              newStatus={newStatus}
              disabled={state.isDisabled}
              changed={changed}
              setChanged={setChanged}
              darkMode={darkMode}
            />
          </div>
          {newStatus === undefined ||
          !changed ||
          state.newTask?.title.length < 1 ? (
            <div className={`border-[1.2px] px-2 py-1 inline-block text-[8px] rounded w-[70%] mt-4 shadow-md ${
              darkMode 
                ? 'text-indigo-300 border-indigo-400 bg-[#2b2c37] shadow-[#1a1a1a]'
                : 'text-indigo-400 border-[#7b81f2] bg-[#ffffff] shadow-slate-200'
            }`}>
              * Please add a title and status to enable save{" "}
            </div>
          ) : null}
          <Form.Submit asChild>
            <button
              className="mt-6 flex justify-center text-center w-full h-10 bg-indigo-500 hover:bg-indigo-700 rounded-2xl align-middle items-center cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-400" 
              style={{
                transition: "200ms ease-in",
              }}
              disabled={
                newStatus === undefined ||
                !changed ||
                state.newTask?.title.length < 1
              }
              onClick={(e) =>
                handleAddTask(e, state.newTask, newColId, newStatus)
              }
            >
              <div className={`${
                newStatus === undefined ||
                !changed ||
                state.newTask?.title.length < 1 ? 'text-slate-400' : 'text-white'
              } text-xs font-bold disabled:text-slate-300`}>
                <div className="flex flex-row gap-2 align-middle items-center ">
                  {!state.loading ? "Save Changes" : "Saving"}
                  {state.loading && (
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

export default AddTask;
