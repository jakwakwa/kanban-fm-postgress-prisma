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
import { getAllTasks, handleBoardProcessing } from "@/utils/state-utils";
import { BoardLoadSpinner } from "./board-loader";
import OverlayButton from "./overlay-button";
import { INITIAL_STATE } from "@/constants/initial-data";
import Image from "next/image";
import EditBoard from "./moduls/edit-board";
import RenderBoardToastMsg from "./render-boardToastmsg";
import RenderDeletedBoardToast from "./render-deletedboard-toast";
/**
 * KanbanGrid component renders the Kanban board with tasks and columns.
 * @param {Object} props - The component props.
 * @param {Subtask[]} [props.subTasks=[]] - The list of subtasks.
 * @param {BoardState[]} [props.boards=[]] - The list of boards.
 * @returns {JSX.Element} The KanbanGrid component.
 */
const KanbanGrid = ({
  subTasks = [],
  boards = [],
}: {
  subTasks?: Subtask[];
  boards?: BoardState[];
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

  const [openBoardOptions, setOpenBoardOptions] = useState<boolean>(false);

  const [openEditBoardModul, setOpenEditBoardModul] = useState(false);
  const [openBoardToaster, setOpenBoardToaster] = useState(false);
  const [openDeletedBoardToaster, setOpenDeletedBoardToaster] = useState(false);

  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [boardSaving, setBoardSaving] = useState(false);
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

  /**
   * Retrieves tasks and associates them with their subtasks.
   * @returns {TaskState[]} The list of tasks with associated subtasks.
   */
  const getTasks = () => {
    return tasksStore.map((task: TaskState) => ({
      ...task,
      subtasks: subTasks.filter((subTask) => task.id === subTask.taskId),
    }));
  };

  const tasksByBoard: TaskState[] = getTasks();

  /**
   * Handles the addition of a new task.
   * @param {FormEvent} e - The form event.
   * @param {any} newtask - The new task data.
   * @param {any} colId - The column ID.
   * @param {any} status - The task status.
   * @returns {Promise<void>} A promise that resolves when the task is added.
   */
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

  const handleEditBoard = async (
    e: FormEvent,
    editedBoard: any,
    boardId: any
  ): Promise<void> => {
    e.preventDefault();

    setBoardSaving(true);

    const newtitle = {
      name: editedBoard,
    };

    const editedB = {
      ...newtitle,
      id: boardId,
    };

    try {
      const result = await editBoardEntry(editedB);

      addBoards([...boards, result]);
      router.push(`/kanban/board?board=${editedBoard}&id=${boardId}`);
      setOpenBoardToaster(true);
      setBoardSaving(false);
      setOpenBoardOptions(false);
      setOpenEditBoardModul(false);
      router.refresh();
    } catch (error) {
      console.error("Error editing board:", error);
      setState((prevState: any) => ({ ...prevState, loading: false }));
    }
  };

  const handleDeleteBoard = async (
    e: { preventDefault: () => void },
    boardId: string
  ) => {
    e.preventDefault();
    setIsDeletingBoard(true);
    try {
      await addDeleteBoardEntry(boardId);
      setOpenDeletedBoardToaster(true);
      router.push(`/kanban`);

      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  function handleOptions() {
    setOpenBoardOptions(!openBoardOptions);
  }

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
        <div className="absolute right-[10px] flex flex-col items-end text-xs text-right top-6">
          <button
            onClick={handleOptions}
            className="flex justify-center align-middle items-center w-6 h-6 hover:border  hover:border-slate-300 rounded-lg"
          >
            <Image
              src={"/assets/icon-vertical-ellipsis.svg"}
              width={4}
              height={4}
              alt={"Options Menu"}
            />
          </button>
        </div>
        {state.addTaskMode && (
          <>
            <OverlayButton setState={setState} />
            <AddTask
              state={state}
              setState={setState}
              handleAddTask={handleAddTask}
              columnStatus={columns}
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
        {openBoardOptions && (
          <div className="bg-white rounded-lg shadow-lg absolute right-[32px] mt-[25px] p-4 border w-48 h-auto">
            <div className="flex gap-3 flex-col text-left justify-start align-top items-start">
              <button
                className="text-slate-400 hover:text-slate-600 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
                onClick={() => setOpenEditBoardModul(true)}
              >
                Edit Board
              </button>

              <button
                className="text-red-500  hover:text-red-600 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug "
                onClick={(e) => handleDeleteBoard(e, boardId)}
                disabled={isDeletingBoard}
              >
                {isDeletingBoard ? "Deleting Board..." : "Delete Board"}
              </button>
            </div>
          </div>
        )}
        {openEditBoardModul && (
          <EditBoard
            currentBoard={boardName}
            currentBoardId={boardId}
            setOpenEditBoardModul={setOpenEditBoardModul}
            handleEditBoard={handleEditBoard}
            boardLoading={boardSaving}
          />
        )}
        <div className="w-[full] h-full px-20 grid grid-cols-3 gap-6 pt-[100px] ">
          {columns?.map((col) => {
            if (col.boardId === boardId) {
              return (
                <div
                  key={col.id}
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
        <RenderBoardToastMsg
          message={{
            title: "Success",
            description: `${boardName} updated successfully`,
          }}
          state={openBoardToaster}
          setState={setOpenBoardToaster}
        />
        <RenderDeletedBoardToast
          message={{
            title: "Success",
            description: `Selected Board ${boardName} deleted successfully`,
          }}
          state={openDeletedBoardToaster}
          setState={setOpenDeletedBoardToaster}
        />
      </>
    );
  }
};

export default KanbanGrid;

/**
 * Creates a URL by appending the given path to the window's origin.
 * @param {string} path - The path to append.
 * @returns {string} The full URL.
 */
export const createURL = (path: string) => window.location.origin + path;

/**
 * Adds a new task entry by making a POST request to the API.
 * @param {Partial<TaskState>} updates - The task data to add.
 * @returns {Promise<any>} The response from the API.
 * @throws Will throw an error if the API request fails.
 */
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

export const editBoardEntry = async (updates: Partial<BoardState>) => {
  const url = createURL("/api/boards");
  const res = await fetch(
    new Request(url, {
      method: "POST",
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};

/**
 * Deletes a board entry by making a DELETE request to the API.
 * @param {string} id - The ID of the board to delete.
 * @returns {Promise<any>} The response from the API.
 * @throws Will throw an error if the API request fails.
 */
export const addDeleteBoardEntry = async (id: string) => {
  const res = await fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    throw new Error(`Something went wrong on API server: ${errorText}`);
  }
};
