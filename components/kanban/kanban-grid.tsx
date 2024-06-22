"use client";

import { FormEvent, Key, useEffect, useRef, useState } from "react";
import ViewTask from "./view-task";
import AddTask from "./add-task";
import useStore from "@/context/store";
import { Subtask, Column, Board } from "@prisma/client";
import * as Toast from "@radix-ui/react-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SpinnerRoundFilled } from "spinners-react";
import ColumnText from "./columns/column-text";
import KanbanCard from "./kanban-card";

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
    openDeleteToast: false,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setState((prevState: any) => ({ ...prevState, loading: true }));

    const parsed = JSON.parse(s);
    const newT = {
      ...state.newTask,
      status: parsed.columnStatus || "Todo",
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

      if (!res.ok) throw new Error("Failed to add task");

      const result = await res.json();
      addTasks([...tasksStore, result]);
      setState((prevState: any) => ({
        ...prevState,
        addTaskMode: false,
        open: true,
        loading: false,
      }));
      setTimeout(
        () => setState((prevState: any) => ({ ...prevState, open: true })),
        1000
      );
      router.refresh();
    } catch (error) {
      console.error("Error adding task:", error);
      setState((prevState: any) => ({ ...prevState, loading: false }));
    }
  };

  const renderToast = (
    title: string,
    openState: boolean,
    setOpenState: (state: boolean) => void
  ) => (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="bg-kpurple-main rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut text-white"
        open={openState}
        onOpenChange={setOpenState}
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          {title}
        </Toast.Title>
        <Toast.Description asChild>
          <time
            className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
            dateTime={eventDateRef.current.toISOString()}
          >
            {prettyDate(eventDateRef.current)}
          </time>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );

  if (loader) {
    return (
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
              className="absolute w-full left-0 m-0 p-0 h-[100%] bg-slate-700 bg-opacity-50"
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
              className="w-full h-full left-0 m-0 p-0  bg-slate-700 bg-opacity-50 fixed"
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
                  {tasksStore?.map(
                    (
                      task: {
                        id: string;
                        title: string;
                        description: string;
                        status: string;
                        columnId: string;
                        subtasks: Array<any>;
                      },
                      i: Key | null | undefined
                    ) => {
                      if (
                        task.status === col.name &&
                        col.id === task.columnId
                      ) {
                        console.log(task);
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
                    }
                  )}
                </div>
              );
            }
          })}
        </div>
        {renderToast("Successfully updated", state.open, (open) =>
          setState((prevState: any) => ({ ...prevState, open }))
        )}
        {renderToast(
          "Task Deleted Successfully",
          state.openDeleteToast,
          (openDeleteToast) =>
            setState((prevState: any) => ({ ...prevState, openDeleteToast }))
        )}
      </>
    );
  }
};

export default KanbanGrid;

export const createURL = (path: string) => window.location.origin + path;

function prettyDate(date: number | Date | undefined) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
