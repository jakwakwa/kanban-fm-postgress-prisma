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
import { ProcessingLoader } from "./processing-loader";
import KanbanHeader from "../ui/header";
import { SpinnerCircular } from "spinners-react";

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
    darkMode,
  } = useStore((state) => ({
    addColumns: state.addColumns,
    addTasks: state.addTasks,
    addSubTasks: state.addSubTasks,
    addBoards: state.addBoards,
    addCurrentBoard: state.addCurrentBoard,
    columns: state.columns,
    tasks: state.tasks,
    loading: state.loading,
    darkMode: state.darkMode,
  }));

  const slug = useSearchParams();
  const boardName = slug.get("board");
  const boardId = slug.get("id") as unknown as string;
  const router = useRouter();
  const [state, setState] = useState<StateT>(INITIAL_STATE);
  const { isBoardAdding } = useStore((state) => state);

  const [openBoardOptions, setOpenBoardOptions] = useState<boolean>(false);

  const [openEditBoardModul, setOpenEditBoardModul] = useState(false);

  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [boardSaving, setBoardSaving] = useState(false);
  const [addColumnIsLoading, setAddColumnIsLoading] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [addingColumn, setAddingColumn] = useState(false);

  const handleAddColumn = async () => {
    try {
      setAddColumnIsLoading(true);
      const response = await fetch("/api/addColumn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newColumnName, boardId: boardId }),
      });
      const data = await response.json();
      console.log("data", response);
      if (response.ok) {
        setState((prevState) => ({
          ...prevState,
          columns: [
            ...prevState.columns,
            {
              id: data.data.id,
              boardId: boardId,
              name: newColumnName,
              tasks: [],
            },
          ],
        }));
        setAddColumnIsLoading(false);
        setNewColumnName("");
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // ... existing code
    setState((prevState) => ({
      ...prevState,
      columnOrder: columns.map((col) => col.id), // Extract column IDs
    }));
  }, [columns]);

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
      // new status columns of the board to the state
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
  const handleDeleteBoard = deleteBoardFn(
    setIsDeletingBoard,
    router,
    state,
    setState
  );

  function handleOptions() {
    setOpenBoardOptions(!openBoardOptions);
  }
  function handleEditOptions() {
    setOpenBoardOptions(!openBoardOptions);
    setOpenEditBoardModul(true);
  }

  if (loader) {
    return BoardLoadSpinner;
  } else {
    return (
      <>
        <div className="fixed right-12 top-4 w-[200px] flex justify-end z-20">
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
        <div className="absolute right-[10px] flex flex-col items-end text-xs text-right top-6 z-20">
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
              darkMode={darkMode}
            />
          </>
        )}
        {state.openModul && (
          <>
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
          <div className="bg-[#2B2C37] border-[#3E3F4E] rounded-lg shadow-lg absolute right-[32px] mt-[25px] p-4 border w-48 h-auto z-20">
            <div className="flex gap-3 flex-col text-left justify-start align-top items-start">
              <button
                className="text-slate-300 hover:text-slate-100 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
                onClick={handleEditOptions}
              >
                Edit Board
              </button>

              <button
                className="text-red-400 hover:text-red-300 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug"
                onClick={(e) => handleDeleteBoard(e, boardId)}
                disabled={isDeletingBoard}
              >
                {isDeletingBoard ? "Deleting Board..." : "Delete Board"}
              </button>
            </div>
          </div>
        )}

        {isDeletingBoard && (
          <ProcessingLoader action={"Deleting"} variant={"Board"} />
        )}
        {isBoardAdding && (
          <ProcessingLoader action={"Adding"} variant={"Board"} />
        )}
        {openEditBoardModul && (
          <>
            <OverlayButton setState={setOpenEditBoardModul} isEditBoard />
            <EditBoard
              currentBoard={boardName ?? ""}
              currentBoardId={boardId}
              setOpenEditBoardModul={setOpenEditBoardModul}
              handleEditBoard={handleEditBoard}
              boardLoading={boardSaving}
              setOpenBoardOptions={setOpenBoardOptions}
              currentColumns={columns}
              tasks={tasksByBoard}
              darkMode={darkMode}
            />
          </>
        )}
        <KanbanHeader />
        <div
          className={`w-full px-12 grid grid-flow-col auto-cols-max gap-6 mt-[100px] overflow-scroll mb-[50px]`}
        >
          {columns?.map((col) => {
            const colIndex = state.columnOrder.indexOf(col.id);
            if (colIndex !== -1 && col.boardId === boardId) {
              // Only render columns present in the order

              return (
                <div
                  key={col.id}
                  className={`${darkMode ? 'bg-[#141517] border-[#3E3F4E]' : 'bg-[#c8cdfa22]'} overflow-hidden rounded-xl px-4 py-1 border-2 w-[300px]`}
                >
                  <div className="text-black my-4">
                    <ColumnText color={col.name} alignRight={false} darkMode={darkMode}>
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
      
      <div className={`${darkMode  ? 'bg-[#141517] border-slate-500 border-dashed' : 'bg-[#f3f4fd22]'} flex flex-col justify-center overflow-hidden rounded-xl ${addingColumn ? 'border-2 border-dashed border-slate-200' : 'border-none'} border-spacing-2 w-full`}>
            <div className="flex flex-col justify-center overflow-hidden rounded-xl p-3  w-[100%] mx-auto">
              
            {addingColumn ? (
          <div className="flex gap-[5px]">
          <input
            className={`${darkMode ? 'bg-[#2B2C37] placeholder:text-slate-400  text-white border-[#3E3F4E] shadow-slate-300 hover:shadow-slate-400' : 'bg-slate-100 shadow-[0_0_0_1px] hover:shadow-slate-200'} placeholder:text-xs border box-border w-full shadow-slate-300 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-slate-600 outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_#9443f7] selection:color-white selection:bg-blackA6`}
            type="text"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            placeholder="New column name"
          />
          <button 
            onClick={handleAddColumn}
            disabled={!newColumnName || addColumnIsLoading}
            className="bg-kpurple-main hover:bg-kpurple-light disabled:bg-slate-400 text-white px-2 rounded-md"
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
          <button
            onClick={() => {
              setAddingColumn(false);
              setNewColumnName('');
            }}
            className={`${darkMode ? 'text-white' : 'text-slate-600'} px-2 hover:underline border-[2px] border-slate-600 rounded-md`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
              ) : (
                <button 
                  onClick={() => setAddingColumn(true)}
                  className="text-center text-kpurple-main text-xs p-2 rounded-full mt-2 border border-kpurple-main"
                >
                  + new column
                </button>
              )}
              {addColumnIsLoading && (
                <SpinnerCircular color="#000" size={20} thickness={200} />
              )}
            </div>
          </div>
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
