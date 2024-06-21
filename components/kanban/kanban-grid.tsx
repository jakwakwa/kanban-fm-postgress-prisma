"use client";
import KanbanCard from "@/components/kanban/kanban-card";
import ColumnText from "@/components/kanban/columns/column-text";
import useStore from "@/context/store";
import { useSearchParams, useRouter } from "next/navigation";
import { BoardsData, Column, Task } from "@/types/data-types";
import { COLORS } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";
import ViewTask from "./view-task";
import Subtask from "./subtask";
import { SpinnerRoundFilled } from "spinners-react";
import Button from "../ui/buttons/button";
import AddTask from "./add-task";
import * as Toast from "@radix-ui/react-toast";

const KanbanGrid = ({
  cols,
  subTasks,
  boards,
}: {
  cols: any[];
  subTasks: any[];
  boards: any[];
}): JSX.Element => {
  const addColumns = useStore((state) => state.addColumns);
  const addTasks = useStore((state) => state.addTasks);
  const addSubTasks = useStore((state) => state.addSubTasks);
  const addBoards = useStore((state) => state.addBoard);
  const tasksStore = useStore((state) => state.tasks);
  const [isDisabled] = useState(false);
  const [openModul, setOpenModul] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [columnName, setColumnName] = useState<string>("");
  const [columnId, setColumnId] = useState<string>("");
  const slug = useSearchParams();
  const boardName = slug.get("board");
  const bId = slug.get("id");
  const [open, setOpen] = useState(false);
  const [openDeleteToast, setOpenDeleteToast] = useState(false);
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);
  // @ts-ignore
  const loader = useStore((state) => state.loading);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  useEffect(() => {
    addSubTasks(subTasks);

    function getAllTasks(boards: any[]) {
      const allTasks: any[] = [];

      boards.forEach((board) => {
        board.columns.forEach((column: { tasks: any[] }) => {
          column.tasks.forEach((task) => {
            allTasks.push(task);
          });
        });
      });

      return allTasks;
    }

    let currentColumns: Column[] = [];
    const currentBoard = boards.filter((board) => board.id === bId);
    const allTasksFromBoard = getAllTasks(currentBoard);

    const currentCols = currentBoard.map((board) => {
      currentColumns = [...board.columns];
      return currentColumns;
    });
    addBoards(currentBoard);
    addColumns(currentColumns);
    addTasks(allTasksFromBoard);
  }, [
    addBoards,
    addColumns,
    addSubTasks,
    addTasks,
    bId,
    boards,
    cols,
    subTasks,
  ]);

  let tasksByBoard: any[] = [];
  function getTasks(): void {
    tasksStore?.map((task, i) => {
      const ste = subTasks?.filter((subTask, i) => task.id === subTask.taskId);
      tasksByBoard = [
        ...tasksByBoard,
        {
          ...task,
          subtasks: [...ste],
        },
      ];
    });
  }

  let columnDetes: any[] = [];
  function getCols(): void {
    cols?.map((col) => {
      columnDetes = [
        ...columnDetes,
        {
          columnId: col.id,
          columnStatus: col.name,
          boardId: col.boardId,
        },
      ];
      return columnDetes;
    });
  }

  getCols();
  const filteredColsbyBoard = columnDetes.filter((c) => c.boardId === bId);

  getTasks();
  const [addTaskMode, setAddTaskmode] = useState(false);

  const [newTask, setNewTask] = useState({
    columnId: "",
    title: "",
    description: "",
    status: "",
  });

  const [newSubtasks, setNewSubtasks] = useState();

  const handleAddTask = async (
    e: { preventDefault: () => void },
    s: string
  ): Promise<any> => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Parse the input string
    const pars = JSON.parse(s);

    // Create the new task object
    const newT = {
      ...newTask,
      status: pars.columnStatus,
      columnId: pars.columnId,
    };

    try {
      // Make the POST request to add the new task
      const res = await fetch(createURL("/api/addTask"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          status: newT.status,
          columnId: newT.columnId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      const result = await res.json();
      addTasks([...tasksStore, result]);
      setAddTaskmode(false);
      setTimeout(() => {
        setOpen(true);
      }, 1000);

      // Update UI after adding a new task
      getTasks();
      router.refresh(); // Refresh the router to update the UI
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loader) {
    return (
      <div
        className="absolute w-full left-0 m-0 p-0 h-[100%]"
        style={{
          background: "rgba(72, 54, 113, 0.2)",
        }}
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
              isDisabled
                ? "bg-kpurple-light cursor-not-allowed"
                : "bg-kpurple-main hover:bg-slate-500"
            } px-5 py-3 rounded-3xl text-md text-white text-sm font-semibold `}
            onClick={() => setAddTaskmode(true)}
          >
            + Add New Task
          </button>
        </div>

        {addTaskMode ? (
          <>
            <div
              className="absolute w-full left-0 m-0 p-0 h-[100%] bg-slate-700 bg-opacity-50"
              onClick={() => setAddTaskmode(false)}
            ></div>
            <AddTask
              newTask={newTask}
              loading={loading}
              setNewTask={setNewTask}
              setNewSubtasks={setNewSubtasks}
              handleAddTask={handleAddTask}
              columnId={columnId}
              columnStatus={filteredColsbyBoard}
              boardId={bId}
              setOpen={setOpen}
              open={open}
            />
          </>
        ) : null}

        {openModul ? (
          <>
            <div
              className="w-full h-full left-0 m-0 p-0  bg-slate-700 bg-opacity-50 fixed"
              onClick={() => setOpenModul(false)}
            ></div>
            <ViewTask
              taskName={taskName}
              tasks={tasksByBoard}
              router={router}
              boardName={boardName ? boardName : ""}
              boardId={bId ? bId : ""}
              setOpenModul={setOpenModul}
              columnStatus={filteredColsbyBoard}
              columnId={columnId}
              setOpen={setOpen}
              open={open}
              openDeletToast={openDeleteToast}
              setOpenDeleteToast={setOpenDeleteToast}
            />
          </>
        ) : null}

        <div className="w-[full] h-full px-20 grid grid-cols-3 gap-6 pt-[100px] ">
          {cols?.map((col, index) => {
            let inx = 0;
            if (col.boardId === bId) {
              inx += inx + 1;

              return (
                <div
                  key={index}
                  className="bg-[#c8cdfa22] overflow-hidden rounded-xl px-4 py-1 h-auto border-2"
                >
                  <div className="text-black my-4">
                    <ColumnText color={col.name}>{col.name}</ColumnText>
                  </div>
                  {tasksStore?.map((task, i) => {
                    if (task.status === col.name && col.id === task.columnId) {
                      return (
                        <div key={i}>
                          <KanbanCard
                            // @ts-ignore
                            task={task}
                            setOpenModul={setOpenModul}
                            setTaskName={setTaskName}
                            setTaskId={setTaskId}
                            colName={task?.status}
                            subTaskAmount={
                              // @ts-ignore
                              task?.subtasks ? task?.subtasks.length : 0
                            }
                            setColumnName={setColumnName}
                            setColumnId={setColumnId}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          })}
        </div>
        <Toast.Provider swipeDirection="right">
          <Toast.Root
            className="bg-kpurple-main rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut text-white"
            open={open}
            onOpenChange={setOpen}
          >
            <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
              Successfully updated
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
        <Toast.Provider swipeDirection="right">
          <Toast.Root
            className="bg-[#2ba253] rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut text-white"
            open={openDeleteToast}
            onOpenChange={setOpenDeleteToast}
          >
            <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
              Task Deleted Successfully
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
      </>
    );
  }
};

export default KanbanGrid;

export const createURL = (path: string) => window.location.origin + path;

function oneWeekAway(date: undefined) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date: number | Date | undefined) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
