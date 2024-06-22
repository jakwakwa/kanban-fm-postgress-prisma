"use client";

import { FormEvent, Key, useEffect, useRef, useState } from "react";
import ViewTask from "./view-task";
import AddTask from "./add-task";
import useStore from "@/context/store";
import { Subtask, Column, Board } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SpinnerRoundFilled } from "spinners-react";
import ColumnText from "./columns/column-text";
import KanbanCard from "./kanban-card";
import { StateT, Task } from "@/types/data-types";
import RenderToastMsg from "./render-toastmsg";

const BoardLoadSpinner = (
  <div
    className="absolute w-full left-0 m-0 p-0 h-[100%]"
    style={{ background: "rgba(72, 54, 113, 0.2)" }}
  >
    <div className="absolute top-[40%] left-[50%] w-full mx-auto rounded-md p-[32px] pb-[48px] h-screen">
      <div className="flex items-center align-middle flex-row h-[50px] gap-0 animate-pulse">
        <div className="h-[25px] w-[120px] p-0 m-0 text-sm leading-1 text-indigo-500">
          Loading board...
        </div>
        <div className="h-[50px] w-[50px]">
          <SpinnerRoundFilled
            size={50}
            thickness={100}
            speed={100}
            color="rgba(74, 57, 172, 0.71)"
          />
        </div>
      </div>
    </div>
  </div>
);
const KanbanGrid = ({
  cols,
  subTasks,
  boards,
}: {
  cols: Column[];
  subTasks: Subtask[];
  boards: Board[];
}): JSX.Element => {
  // const { cols, subTasks, boards } = initialData;
  const addColumns = useStore((state: { addColumns: any }) => state.addColumns);
  const addTasks = useStore((state: { addTasks: any }) => state.addTasks);
  const addSubTasks = useStore(
    (state: { addSubTasks: any }) => state.addSubTasks
  );
  const addBoards = useStore((state: { addBoard: any }) => state.addBoard);
  const tasksStore = useStore((state: { tasks: any }) => state.tasks);
  const slug = useSearchParams();
  const boardName = slug.get("board");
  const bId = slug.get("id");
  const loader = useStore((state: { loading: any }) => state.loading);
  const router = useRouter();

  const [state, setState] = useState<StateT>({
    isDisabled: false,
    openModul: false,
    taskName: "",
    taskId: "",
    columnName: "",
    columnId: "",
    open: false,
    openDeleteToast: true,
    loading: false,
    addTaskMode: false,
    newTask: {
      columnId: "",
      title: "",
      description: "",
      status: "",
    },
    newSubtasks: [] as Subtask[],
  });

  const eventDateRef = useRef(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    addSubTasks(subTasks);

    const getAllTasks = (boards: Board[]) => {
      return boards.flatMap((board) =>
        // @ts-ignore
        board.columns.flatMap((column: { tasks: any }) => column.tasks)
      );
    };

    const currentBoard = boards.find((board) => board.id === bId);
    if (currentBoard) {
      const allTasksFromBoard = getAllTasks([currentBoard]);
      addBoards([currentBoard]);
      // @ts-ignore
      addColumns(currentBoard.columns);
      addTasks(allTasksFromBoard);
    }
  }, [addBoards, addColumns, addSubTasks, addTasks, bId, boards, subTasks]);

  const getTasks = () => {
    return tasksStore.map((task: { id: any }) => ({
      ...task,
      subtasks: subTasks.filter((subTask) => task.id === subTask.taskId),
    }));
  };

  const getCols = () => {
    return cols.map((col) => ({
      columnId: col.id,
      columnStatus: col.name,
      boardId: col.boardId,
    }));
  };

  const filteredColsbyBoard = getCols().filter((c) => c.boardId === bId);
  const tasksByBoard = getTasks();

  const handleAddTask = async (e: FormEvent, s: string): Promise<void> => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loading: true,
      open: false,
    }));

    const parsed = JSON.parse(s);

    const newT = {
      ...state.newTask,
      status: parsed.columnStatus || "todo",
      columnId: parsed.columnId,
    };

    try {
      const res = await fetch(createURL("/api/addTask"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newT),
      });

      if (res.ok) {
        const result = await res.json();

        setState((prevState) => ({
          ...prevState,
          loading: false,
          open: true,
          addTaskMode: false,
        }));

        router.push(`/kanban/board?board=${boardName}&id=${bId}`);
        addTasks([...tasksStore, result]);
        router.refresh();
      }

      if (!res.ok) throw new Error("Failed to add task");
    } catch (error) {
      console.error("Error adding task:", error);
      setState((prevState: any) => ({ ...prevState, loading: false }));
    }
  };

  if (loader) {
    return BoardLoadSpinner;
  } else {
    return (
      <>
        <div className="fixed right-12 top-4 z-0 w-[200px] flex justify-end">
          <button
            className={`${
              state.isDisabled
                ? "bg-kpurple-light cursor-not-allowed"
                : "bg-kpurple-main hover:bg-slate-500"
            } px-5 py-3 rounded-3xl text-md text-white text-sm font-semibold `}
            onClick={() =>
              setState((prevState: any) => ({
                ...prevState,
                addTaskMode: true,
              }))
            }
          >
            + Add New Task
          </button>
        </div>
        {state.addTaskMode && (
          <>
            <div
              className="absolute w-full left-0 m-0 p-0 h-[100%] bg-slate-700 bg-opacity-70"
              onClick={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  addTaskMode: false,
                }))
              }
            ></div>
            <AddTask
              state={state}
              setState={setState}
              handleAddTask={handleAddTask}
              columnStatus={filteredColsbyBoard}
              // @ts-ignore
              boardId={bId}
            />
          </>
        )}
        {state.openModul && (
          <>
            <div
              className="w-full h-full left-0 m-0 p-0  bg-slate-700 bg-opacity-70 fixed"
              onClick={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  openModul: false,
                }))
              }
            ></div>
            <ViewTask
              state={state}
              setState={setState}
              tasks={tasksByBoard}
              router={router}
              boardName={boardName || ""}
              boardId={bId || ""}
              columnStatus={filteredColsbyBoard}
            />
          </>
        )}
        <div className="w-[full] h-full px-20 grid grid-cols-3 gap-6 pt-[100px] ">
          {cols?.map((col, index) => {
            if (col.boardId === bId) {
              return (
                <div
                  key={index}
                  className="bg-[#c8cdfa22] overflow-hidden rounded-xl px-4 py-1 h-auto border-2"
                >
                  <div className="text-black my-4">
                    <ColumnText color={col.name}>{col.name}</ColumnText>
                  </div>
                  {tasksStore?.map((task: Task, i: Key | null | undefined) => {
                    if (task.status === col.name && col.id === task.columnId) {
                      return (
                        <div key={i}>
                          <KanbanCard
                            task={task}
                            setState={setState}
                            totalSubtasks={`${
                              task?.subtasks !== undefined
                                ? task?.subtasks?.length
                                : "0"
                            }`}
                          />
                          <div className="text-black"></div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          })}
        </div>
        <RenderToastMsg
          message={{
            title: "Success",
            description: "The item has been successfully updated",
          }}
          state={state}
          setState={setState}
        />
      </>
    );
  }
};

export default KanbanGrid;

export const createURL = (path: string) => window.location.origin + path;

export function prettyDate(date: number | Date | undefined) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
