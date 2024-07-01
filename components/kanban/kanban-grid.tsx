"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ViewTask from "./view-task";
import AddTask from "./add-task";
import ColumnText from "./columns/column-text";
import KanbanCard from "./kanban-card";
import RenderToastMsg from "./render-toastmsg";
import useStore from "@/context/store";
import { BoardState, StateT, Subtask, TaskState } from "@/types/data-types";
import {
  getAllTasks,
  handleBoardProcessing,
  getTasksFromBoard,
  addTaskFn,
  editBoardFn,
  deleteBoardFn,
} from "@/utils/state-utils";
import { BoardLoadSpinner } from "./board-loader";
import OverlayButton from "./overlay-button";
import { INITIAL_STATE } from "@/constants/initial-data";
import Image from "next/image";
import EditBoard from "./moduls/edit-board";

/**
 * KanbanGrid component represents a Kanban board with multiple columns and tasks.
 * It allows adding, editing, and deleting tasks and boards.
 *
 * @param {Object} props - Component props.
 * @param {Subtask[]} [props.subTasks=[]] - Initial subtasks.
 * @param {BoardState[]} [props.boards=[]] - Initial boards.
 * @returns {JSX.Element} The rendered component.
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

  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [boardSaving, setBoardSaving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Access the current timer reference
    const timer = timerRef.current;
    return () => {
      // Clear the timer if it exists
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Add subtasks to the state
    addSubTasks(subTasks);
    // Add boards to the state
    addBoards(boards);
    // Function to process each board
    const processBoard = (board: BoardState) => {
      // Retrieve all tasks from the board
      const allTasksFromBoard = getAllTasks([board]);
      // Set the current board in the state
      addCurrentBoard(board);
      // Add columns of the board to the state
      addColumns(board.columns);
      // Add tasks to the state
      addTasks(allTasksFromBoard);
    };

    // Handle the processing of boards based on the board ID
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

  // Retrieve tasks from the specified board using the tasksStore and subTasks.
  const getTasks = getTasksFromBoard(tasksStore, subTasks);

  // Execute the getTasks function to obtain an array of tasks grouped by board.
  const tasksByBoard: TaskState[] = getTasks();

  /**
   * Handles the addition of a new task to a specific column on a Kanban board.
   *
   * @param e - The form event that triggers this function.
   * @param newtask - The payload for the new task to be added.
   * @param colId - The ID of the column where the new task will be added.
   * @param status - The initial status of the new task.
   * @returns A promise that resolves to void.
   */
  const handleAddTask = addTaskFn(
    setState,
    state,
    addTasks,
    tasksStore,
    router,
    boardName,
    boardId
  );

  /**
   * Handles the editing of a board.
   *
   * @param e - The form event.
   * @param editedBoard - The new title of the board.
   * @param boardId - The unique identifier for the board.
   * @returns A promise that resolves when the board has been edited.
   */
  const handleEditBoard = editBoardFn(
    setBoardSaving,
    addBoards,
    boards,
    router,
    setState,
    setOpenBoardOptions,
    setOpenEditBoardModul
  );

  /**
   * Handles the deletion of a board by preventing the default form submission behavior,
   * setting a state to indicate deletion is in progress, and attempting to delete the board.
   * Upon successful deletion, navigates to the Kanban main page and refreshes the page.
   * Logs an error if the deletion fails.
   *
   * @param e - The event object with a method to prevent default behavior.
   * @param boardId - The unique identifier of the board to be deleted.
   */
  const handleDeleteBoard = deleteBoardFn(setIsDeletingBoard, router);

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
                newTask: {
                  id: "",
                  columnId: "",
                  title: "",
                  description: "",
                  status: "",
                },
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
                    <ColumnText color={col.name} alignRight={false}>
                      {col.name}
                    </ColumnText>
                  </div>
                  {tasksStore?.map((task: TaskState) => {
                    if (task.status === col.name) {
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
          message={state.toastMsg}
          state={state}
          setState={setState}
        />
      </>
    );
  }
};

export default KanbanGrid;
