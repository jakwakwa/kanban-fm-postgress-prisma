"use client";

import { useEffect, useState } from "react";
import StatusDropdown from "../dropdown-components/status-dropdown";
import Subtask from "./subtask";
import Image from "next/image";
import * as Form from "@radix-ui/react-form";
import useStore from "@/context/store";
import { Task } from "@/types/data-types";

interface ViewTaskProps {
  taskName: any;
  tasks: any;
  router: any;
  boardName: any;
  boardId: any;
  setOpenModul: any;
  columnStatus: any;
  columnId: any;
}

function ViewTask({
  taskName,
  tasks,
  router,
  boardName,
  boardId,
  setOpenModul,
  columnStatus,
  columnId,
}: ViewTaskProps) {
  const task: Task = tasks.find((t: { title: any }) => t.title === taskName);
  const [openOptions, setOpenOptions] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(taskName);
  const [loading, setLoading] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(
    `{"columnId":"${columnId}","columnStatus":"${
      task?.status ? task?.status : "no status"
    }", "boardId":"${boardId}"}`
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    task?.description ? task?.description : "no description"
  ); // Define updatedDescription variable

  const [newStatus, setNewStatus] = useState<any>(
    '{"columnId":"","columnStatus":""}'
  );

  const [editMode, setEditMode] = useState(false);
  const [updated, setUpdated] = useState(false);
  // @ts-ignore
  const addTasks = useStore((state) => state.addTasks);

  useEffect(() => {
    if (updated) {
      addTasks(tasks);

      setLoading(false);
      setTimeout(() => {
        setOpenModul(false);
      }, 4000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const handleUpdateTitle = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEntry(task.id, {
        title: updatedTitle,
        description: updatedDescription,
        status: newStatus.columnStatus,
        columnId: newStatus.columnId,
      });
      setUpdated(true);
      router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      setOpenOptions(false);
    }
  }, [editMode]);

  function handleOptions() {
    if (openOptions) {
      setOpenOptions(false);
    } else {
      setOpenOptions(true);
    }
  }

  if (!editMode) {
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
              alt={""}
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
              <button className="text-red-500  hover:text-red-600 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug">
                Delete Task
              </button>
            </div>
          </div>
        )}
        <div className=" text-gray-950 text-lg font-bold">{taskName}</div>
        <div className="my-[24px] w-96 text-kgray-text text-xs font-medium  leading-snug">
          {task?.description}
        </div>
        <div className="text-kgray-text text-xs font-bold  mb-[16px]">
          Subtasks ({task?.subtasks.length} of {task?.subtasks.length})
        </div>
        <div className="flex flex-col gap-2">
          {task?.subtasks !== undefined && <Subtask task={task.subtasks} />}
          <div className="w-full h-16 relative mt-[16px]">
            <div className="left-0 top-0 text-kgray-text text-xs font-bold">
              Current Status
            </div>
            <StatusDropdown
              status={task?.status ? task?.status : "no status"}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
              columnStatus={columnStatus}
              setNewStatus={setNewStatus}
              newStatus={newStatus}
              disabled={true}
            />
          </div>
        </div>
      </div>
    );
  }

  if (editMode) {
    return (
      <div className="absolute w-[480px] mx-auto mt-[10%] bg-white rounded-md p-[32px] pb-[48px] h-auto shadow-lg left-[35%]">
        <Form.Root className="w-full">
          <Form.Field className="grid mb-[10px]" name="title">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-slate-500">
                Title
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter your email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-slate-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                required
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="grid mb-[10px]" name="title">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-slate-500">
                Description
              </Form.Label>
              <Form.Message
                className="text-[13px] text-slate-600 opacity-[0.8]"
                match="valueMissing"
              >
                Please enter a description
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-slate-100 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                type="textArea"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <div className="text-kgray-text text-xs font-bold  mb-[16px]">
            Subtasks ({task?.subtasks.length} of {task?.subtasks.length})
          </div>
          <div className="flex flex-col gap-2">
            {task?.subtasks !== undefined && <Subtask task={task?.subtasks} />}
            <div className="w-full h-16 relative mt-[16px]">
              <div className="left-0 top-0 text-kgray-text text-xs font-bold">
                Current Status
              </div>
              <StatusDropdown
                status={task?.status ? task?.status : "no status"}
                updatedStatus={updatedStatus}
                setUpdatedStatus={setUpdatedStatus}
                columnStatus={columnStatus}
                setNewStatus={setNewStatus}
                newStatus={newStatus}
                disabled={false}
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
                  onClick={(e) => handleUpdateTitle(e)}
                >
                  Save Changes
                  {loading && "(Loading changes)"}
                </button>
              </div>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    );
  }
}

export default ViewTask;

export const createURL = (path: string) => window.location.origin + path;

export const updateEntry = async (id: any, updates: any) => {
  const res = await fetch(
    new Request(createURL(`/api/task/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ updates }),
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};
