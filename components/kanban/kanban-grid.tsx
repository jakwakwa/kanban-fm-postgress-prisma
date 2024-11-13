"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import ViewTask from "./view-task";
import AddTask from "./add-task";
import ColumnText from "./columns/column-text";
import KanbanCard from "./kanban-card";
import RenderToastMsg from "./render-toastmsg";
import { BoardLoadSpinner } from "./board-loader";
import OverlayButton from "./overlay-button";
import EditBoard from "./moduls/edit-board";
import { ProcessingLoader } from "./processing-loader";
import KanbanHeader from "../ui/header";
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
import { INITIAL_STATE } from "@/constants/initial-data";
import { CheckIcon } from "@heroicons/react/24/outline";
import AddColumnButton from "../ui/buttons/add-column-button";
import CancelButton from "../ui/buttons/cancel-button";
import AddColumnConfirmButton from "../ui/buttons/add-column-confirm-button";
import { commonClasses, addColumnContainerClasses } from "./kanban-grid-styles";
import AcceptButton from "../ui/buttons/accept-button";
import AddColumnForm from "../ui/forms/add-column-form";

interface KanbanGridProps {
  subTasks?: Subtask[];
  boards?: BoardState[];
}

const KanbanGrid = ({
  subTasks = [],
  boards = [],
}: KanbanGridProps): JSX.Element => {
  // Store state
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
    isBoardAdding
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
    isBoardAdding: state.isBoardAdding
  }));

  // Router & URL params
  const router = useRouter();
  const slug = useSearchParams();
  const boardName = slug.get("board");
  const boardId = slug.get("id") as string;

  // Local state
  const [state, setState] = useState<StateT>(INITIAL_STATE);
  const [openBoardOptions, setOpenBoardOptions] = useState(false);
  const [openEditBoardModul, setOpenEditBoardModul] = useState(false);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [boardSaving, setBoardSaving] = useState(false);
  const [addColumnIsLoading, setAddColumnIsLoading] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [addingColumn, setAddingColumn] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Column management
  const handleAddColumn = async () => {
    if (!newColumnName || addColumnIsLoading) return;

    try {
      setAddColumnIsLoading(true);
      const response = await fetch("/api/addColumn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newColumnName, boardId })
      });

      // Artificial delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (response.ok) {
        const data = await response.json();
        setState(prev => ({
          ...prev,
          columns: [
            ...prev.columns,
            {
              id: data.data.id,
              boardId,
              name: newColumnName,
              tasks: []
            }
          ]
        }));
        setNewColumnName("");
        setAddingColumn(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding column:", error);
    } finally {
      setAddColumnIsLoading(false);
    }
  };

  // Board management
  const handleOptions = () => setOpenBoardOptions(prev => !prev);
  
  const handleEditOptions = () => {
    setOpenBoardOptions(false);
    setOpenEditBoardModul(true);
  };

  const handleAddTask = addTaskFn(
    setState,
    state,
    addTasks,
    tasksStore,
    router,
    boardName,
    boardId
  );

  const handleEditBoard = editBoardFn(
    setBoardSaving,
    addBoards,
    boards,
    router,
    setState,
    setOpenBoardOptions,
    setOpenEditBoardModul
  );

  const handleDeleteBoard = deleteBoardFn(
    setIsDeletingBoard,
    router,
    state,
    setState
  );

  // Effects
  useEffect(() => {
    setState(prev => ({
      ...prev,
      columnOrder: columns.map(col => col.id)
    }));
  }, [columns]);

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
    subTasks
  ]);

  // Task management
  const getTasks = getTasksFromBoard(tasksStore, subTasks);
  const tasksByBoard: TaskState[] = getTasks();

  if (loader) return BoardLoadSpinner;

  return (
    <>
      {/* Add Task Button */}
      <div className="fixed right-12 top-4 w-[200px] flex justify-end z-20">
        <button
          className={`${
            state.isDisabled
              ? "bg-kpurple-light cursor-not-allowed"
              : "bg-kpurple-main hover:bg-slate-500"
          } px-5 py-3 rounded-3xl text-md text-white text-sm font-semibold`}
          onClick={() =>
            setState(prev => ({
              ...prev,
              newTask: {
                id: "",
                columnId: "",
                title: "",
                description: "",
                status: ""
              },
              addTaskMode: true
            }))
          }
        >
          + Add New Task
        </button>
      </div>

      {/* Options Menu */}
      <div className="absolute right-[10px] flex flex-col items-end text-xs text-right top-6 z-20">
        <button
          onClick={handleOptions}
          className="flex justify-center align-middle items-center w-6 h-6 hover:border hover:border-slate-300 rounded-lg"
        >
          <Image
            src="/assets/icon-vertical-ellipsis.svg"
            width={4}
            height={4}
            alt="Options Menu"
          />
        </button>
      </div>

      {/* Modals */}
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

      {/* Loading States */}
      {isDeletingBoard && (
        <ProcessingLoader action="Deleting" variant="Board" />
      )}
      {isBoardAdding && (
        <ProcessingLoader action="Adding" variant="Board" />
      )}

      {/* Edit Board Modal */}
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

      {/* Main Board Content */}
      <KanbanHeader />
      <div className="w-full px-12 grid grid-flow-col auto-cols-max gap-6 mt-[100px] overflow-scroll mb-[50px]">
        {columns?.map((col) => {
          const colIndex = state.columnOrder.indexOf(col.id);
          if (colIndex !== -1 && col.boardId === boardId) {
            return (
              <div
                key={col.id}
                className={`${
                  darkMode ? 'bg-[#141517] border-[#3E3F4E]' : 'bg-[#c8cdfa22]'
                } ${commonClasses.overflow} px-4 py-1 border-2 w-[300px]`}
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
                          totalSubtasks={`${task?.subtasks?.length ?? "0"}`}
                        />
                        <div className="text-black" />
                      </div>
                    );
                  }
                })}
              </div>
            );
          }
        })}

        {/* Add Column Section */}
        <div 
          className={`
            ${darkMode ? addColumnContainerClasses.dark : addColumnContainerClasses.light}
            ${addingColumn ? addColumnContainerClasses.active : addColumnContainerClasses.default}
            ${commonClasses.flex}
            ${commonClasses.overflow}
            w-full border-spacing-3 rounded-lg
          `}
        >
          <AddColumnForm
            darkMode={darkMode}
            addingColumn={addingColumn}
            newColumnName={newColumnName}
            setNewColumnName={setNewColumnName}
            handleAddColumn={handleAddColumn}
            addColumnIsLoading={addColumnIsLoading}
            setAddingColumn={setAddingColumn}
          />
        </div>
      </div>

      {/* Toast Messages */}
      <RenderToastMsg
        message={state.toastMsg}
        state={state}
        setState={setState}
      />
    </>
  );
};

export default KanbanGrid;
