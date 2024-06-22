"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ViewTask from "./view-task";
import AddTask from "./add-task";
import useStore from "@/context/store";

import { useSearchParams, useRouter } from "next/navigation";
import { SpinnerRoundFilled } from "spinners-react";
import ColumnText from "./columns/column-text";
import KanbanCard from "./kanban-card";
import { Board, Column, StateT, Subtask, Task } from "@/types/data-types";
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
  const addColumns = useStore((state: { addColumns: any }) => state.addColumns);
  const addTasks = useStore((state: { addTasks: any }) => state.addTasks);
  const addSubTasks = useStore(
    (state: { addSubTasks: any }) => state.addSubTasks
  );
  const addBoards = useStore((state: { addBoard: any }) => state.addBoard);
  const tasksStore = useStore((state: { tasks: any }) => state.tasks);
  const slug = useSearchParams();
  const boardName = slug.get("board");
  const boardId = slug.get("id") as unknown as string;
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

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = timerRef.current;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    addSubTasks(subTasks);

    const getAllTasks = (boards: Board[]) => {
      const extractTasksFromColumn = (column: { tasks: any }) => column.tasks;
      const extractTasksFromBoard = (board: Board) =>
        board.columns.flatMap(extractTasksFromColumn);
      return boards.flatMap(extractTasksFromBoard);
    };

    const processBoard = (board: Board) => {
      const allTasksFromBoard = getAllTasks([board]);
      addBoards([board]);
      addColumns(board.columns);
      addTasks(allTasksFromBoard);
    };

    const findCurrentBoard = (boards: Board[], boardId: string) => {
      return boards.find((board) => board.id === boardId);
    };

    const handleBoardProcessing = (boards: Board[], boardId: string) => {
      const currentBoard = findCurrentBoard(boards, boardId);
      if (currentBoard) {
        processBoard(currentBoard);
      }
    };

    handleBoardProcessing(boards, boardId);
  }, [addBoards, addColumns, addSubTasks, addTasks, boardId, boards, subTasks]);

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

  const filteredColsbyBoard = getCols().filter((c) => c.boardId === boardId);
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

        router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
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
            <button
              className="absolute w-full left-0 m-0 p-0 h-[100%] bg-slate-700 bg-opacity-70"
              onClick={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  addTaskMode: false,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setState((prevState: any) => ({
                    ...prevState,
                    addTaskMode: false,
                  }));
                }
              }}
              onTouchStart={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  addTaskMode: false,
                }))
              }
            ></button>
            <AddTask
              state={state}
              setState={setState}
              handleAddTask={handleAddTask}
              columnStatus={filteredColsbyBoard}
              boardId={boardId}
            />
          </>
        )}
        {state.openModul && (
          <>
            <button
              className="w-full h-full left-0 m-0 p-0  bg-slate-700 bg-opacity-70 fixed"
              onClick={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  openModul: false,
                }))
              }
            ></button>

            <button
              className="w-full h-full left-0 m-0 p-0 bg-slate-700 bg-opacity-70 fixed"
              onClick={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  openModul: false,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setState((prevState: any) => ({
                    ...prevState,
                    openModul: false,
                  }));
                }
              }}
              onTouchStart={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  openModul: false,
                }))
              }
              style={{ cursor: "pointer" }} // Ensuring it looks interactive
            ></button>
            <ViewTask
              state={state}
              setState={setState}
              tasks={tasksByBoard}
              router={router}
              boardName={boardName ?? ""}
              boardId={boardId ?? ""}
              columnStatus={filteredColsbyBoard}
            />
          </>
        )}
        <div className="w-[full] h-full px-20 grid grid-cols-3 gap-6 pt-[100px] ">
          {cols?.map((col) => {
            if (col.boardId === boardId) {
              return (
                <div
                  key={col.boardId}
                  className="bg-[#c8cdfa22] overflow-hidden rounded-xl px-4 py-1 h-auto border-2"
                >
                  <div className="text-black my-4">
                    <ColumnText color={col.name}>{col.name}</ColumnText>
                  </div>
                  {tasksStore?.map((task: Task) => {
                    if (task.status === col.name && col.id === task.columnId) {
                      return (
                        <div key={task.id}>
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
