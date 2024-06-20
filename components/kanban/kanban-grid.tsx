"use client";
import KanbanCard from "@/components/kanban/kanban-card";
import ColumnText from "@/components/kanban/columns/column-text";
import useStore from "@/context/store";
import { useSearchParams, useRouter } from "next/navigation";
import { BoardsData, Column, Task } from "@/types/data-types";
import { COLORS } from "@/constants/theme";
import { useEffect, useState } from "react";
import ViewTask from "./view-task";
import Subtask from "./subtask";
import { SpinnerRoundFilled } from "spinners-react";
import Button from "../ui/buttons/button";
import AddTask from "./add-task";

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
  // @ts-ignore
  const loader = useStore((state) => state.loading);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
        <div className="absolute top-[40%] left-1/2 w-full h-full mx-auto rounded-md p-[32px] pb-[48px]">
          <SpinnerRoundFilled
            size={50}
            thickness={100}
            speed={100}
            color="rgba(74, 57, 172, 0.71)"
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="absolute top-4 right-2 t z-40 w-[200px] flex justify-end">
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
              // @ts-ignore
              newTask={newTask}
              loading={loading}
              setNewTask={setNewTask}
              setNewSubtasks={setNewSubtasks}
              handleAddTask={handleAddTask}
              columnId={columnId}
              columnStatus={filteredColsbyBoard}
              boardId={bId}
            />
          </>
        ) : null}

        {openModul ? (
          <>
            <div
              className="absolute w-full left-0 m-0 p-0 h-[100%] bg-slate-700 bg-opacity-50"
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
            />
          </>
        ) : null}

        <div className="w-[full] h-full px-20 grid grid-cols-3 gap-8 text-white pt-[100px]">
          {cols?.map((col, index) => {
            if (col.boardId === bId) {
              return (
                <div key={index}>
                  <div className="text-black my-4">
                    <ColumnText color={COLORS[index]}>{col.name}</ColumnText>
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
      </>
    );
  }
};

export default KanbanGrid;

export const createURL = (path: string) => window.location.origin + path;
