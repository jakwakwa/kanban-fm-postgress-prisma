"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ViewTask from "./view-task";
import AddTask from "./add-task";
import ColumnText from "./columns/column-text";
import KanbanCard from "./kanban-card";
import RenderToastMsg from "./render-toastmsg";
import useStore from "@/context/store";
import { BoardState, StateT, Subtask, TaskState } from "@/types/data-types";
import {
  INITIAL_STATE,
  getAllTasks,
  handleBoardProcessing,
} from "@/utils/state-utils";
import { BoardLoadSpinner } from "./board-loader";
import OverlayButton from "./overlay-button";

const KanbanGrid = ({
  subTasks,
  boards,
}: {
  subTasks: Subtask[];
  boards: BoardState[];
}): JSX.Element => {
  const {
    addColumns,
    addTasks,
    addSubTasks,
    addBoards,
    addCurrentBoard,
    columns,
    tasks: tasksStore,
    loading: loader,
  } = useStore((state) => ({
    addColumns: state.addColumns,
    addTasks: state.addTasks,
    addSubTasks: state.addSubTasks,
    addBoards: state.addBoards,
    addCurrentBoard: state.addCurrentBoard,
    columns: state.columns,
    tasks: state.tasks,
    loading: state.loading,
  }));

  const slug = useSearchParams();
  const boardName = slug.get("board");
  const boardId = slug.get("id") as unknown as string;

  const router = useRouter();

  const [state, setState] = useState<StateT>(INITIAL_STATE);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = timerRef.current;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    addSubTasks(subTasks);
    addBoards(boards);

    const processBoard = (board: BoardState) => {
      const allTasksFromBoard = getAllTasks([board]);
      addCurrentBoard(board);
      addColumns(board.columns);
      addTasks(allTasksFromBoard);
    };

    handleBoardProcessing(boards, boardId, processBoard);
  }, [
    addBoards,
    addColumns,
    addCurrentBoard,
    addSubTasks,
    addTasks,
    boardId,
    boards,
    subTasks,
  ]);

  const getTasks = () => {
    return tasksStore.map((task: TaskState) => ({
      ...task,
      subtasks: subTasks.filter((subTask) => task.id === subTask.taskId),
    }));
  };

  const tasksByBoard: TaskState[] = getTasks();

  const handleAddTask = async (
    e: FormEvent,
    newtask: any,
    colId: any,
    status: any
  ): Promise<void> => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loading: true,
      open: false,
    }));

    const newT = {
      ...state.newTask,
      status: status,
      columnId: colId,
    };

    try {
      const result = await addTaskEntry(newT);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        open: true,
        addTaskMode: false,
      }));
      addTasks([...tasksStore, result]);
      router.push(`/kanban/board?board=${boardName}&id=${boardId}`);
      router.refresh();
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
        <OverlayButton setState={setState} />
        <AddTask
          state={state}
          setState={setState}
          handleAddTask={handleAddTask}
          columnStatus={columns}
          boardId={boardId}
        />

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

            <OverlayButton setState={setState} />
            <ViewTask
              state={state}
              setState={setState}
              tasks={tasksByBoard}
              router={router}
              boardName={boardName ?? ""}
              boardId={boardId ?? ""}
              columnStatus={columns}
            />
          </>
        )}
        <div className="w-[full] h-full px-20 grid grid-cols-3 gap-6 pt-[100px] ">
          {columns?.map((col) => {
            if (col.boardId === boardId) {
              return (
                <div
                  key={col.boardId}
                  className="bg-[#c8cdfa22] overflow-hidden rounded-xl px-4 py-1 h-auto border-2"
                >
                  <div className="text-black my-4">
                    <ColumnText color={col.name}>{col.name}</ColumnText>
                  </div>
                  {tasksStore?.map((task: TaskState) => {
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

export const addTaskEntry = async (updates: Partial<TaskState>) => {
  const url = createURL("/api/addTask"); // Ensure createURL is defined and used correctly
  const res = await fetch(
    new Request(url, {
      method: "POST",
      body: JSON.stringify(updates), // Directly stringify the updates object
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text(); // Get error text for better debugging
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};
