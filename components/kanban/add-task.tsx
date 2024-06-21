"use client";
import { useEffect, useState } from "react";
import StatusDropdown from "../ui/dropdown-components/status-dropdown";
import * as Form from "@radix-ui/react-form";
import { Task, Subtask as SubTask } from "@/types/data-types";
import { SpinnerCircularSplit } from "spinners-react";
import FormLabel from "./form-label";

interface TaskProp {
  columnId: string;
  title: string;
  description: string;
  status: string;
}
interface AddTaskProps {
  newTask: TaskProp;
  loading: boolean;
  setNewTask: any;
  setNewSubtasks: any;
  handleAddTask: any;
  columnStatus: any;
  columnId: any;
  boardId: any;
  setOpen: any;
  open: any;
  // updatedStatus: any;
  // setUpdatedStatus: any;
  // columnStatus: any;
  // setNewStatus: any;
}
const AddTask = ({
  newTask,
  loading,
  setNewTask,
  setNewSubtasks,
  handleAddTask,
  columnStatus,
  columnId,
  boardId,
  setOpen,
  open,
}: // updatedStatus,
// setUpdatedStatus,
// columnStatus,
// setNewStatus,
AddTaskProps) => {
  const [toggled, setToggled] = useState("closed");
  const [changed, setChanged] = useState(false);
  const [selectStatus, setSelectStatus] = useState("ss");

  const [newStatus, setNewStatus] = useState<any>(
    '{"columnId":"","columnStatus":""}'
  );
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState(
    newTask?.description ? newTask?.description : "no description"
  );
  const [updatedStatus, setUpdatedStatus] = useState(
    `{"columnId":"${columnId}","columnStatus":"${
      newTask?.status ? newTask?.status : "Todo"
    }", "boardId":"${boardId}"}`
  );
  const [updatedTask, setUpdatedTask] = useState({
    title: updatedTitle,
    description: updatedDescription,
    status: newStatus.columnStatus,
    columnId: newStatus.columnId,
  });

  const [newColId, setNewColId] = useState("");

  useEffect(() => {
    setNewTask({
      columnId: "",
      title: "",
      description: "",
      status: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute w-[480px] mx-auto mt-[10%] bg-white rounded-md p-[32px] pb-[48px] h-auto shadow-lg left-[35%]">
      <div className="text-xl font-bold mb-4">Add New Task</div>
      <Form.Root className="w-full">
        <Form.Field className="grid mb-[10px]" name="title">
          <div className="flex items-baseline justify-between">
            <FormLabel>Title</FormLabel>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Please enter task title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border w-full bg-slate-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 placeholder:text-xs placeholder:text-slate-400  placeholder:italic"
              required
              type="text"
              placeholder={`e.g. Collect the Laundry.`}
              value={newTask?.title}
              onChange={(e) => {
                const newTaskTitle = e.target.value;

                setNewTask({
                  ...newTask,
                  title: newTaskTitle,
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
              className="box-border w-full bg-slate-100 placeholder:text-xs placeholder:text-slate-400  placeholder:italic shadow-blackA6 inline-flex h-28 appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
              placeholder={`e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.`}
              value={newTask.description}
              onChange={(e) => {
                const newTaskDesc = e.target.value;

                setNewTask({
                  ...newTask,
                  description: newTaskDesc,
                });
              }}
            />
          </Form.Control>
        </Form.Field>

        <div className="flex flex-col gap-2">
          <div className="w-full h-16 relative mt-[16px]">
            <FormLabel isLabel={false}>Status</FormLabel>
            <StatusDropdown
              status={newTask?.status ? newTask?.status : "Todo"}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
              // @ts-ignore
              columnStatus={columnStatus}
              setNewStatus={setNewStatus}
              setNewColId={setNewColId}
              newStatus={newStatus}
              disabled={false}
              // @ts-ignore
              setUpdatedTask={setUpdatedTask}
              task={updatedTask}
              newColId={newColId}
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
                onClick={(e) => handleAddTask(e, updatedStatus)}
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

export default AddTask;
