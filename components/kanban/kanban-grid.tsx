"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { commonClasses, addColumnContainerClasses } from "./kanban-grid-styles";
import AddColumnForm from "../ui/forms/add-column-form";
import BoardOptionsMenu from "../ui/board-options-menu";
import AddTaskButton from "../ui/buttons/add-task-button";
import BoardOptionsButton from "../ui/buttons/board-options-button";

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

  // Group related handlers together
  const boardHandlers = {
    handleOptions: () => setOpenBoardOptions(prev => !prev),
    handleEditOptions: () => {
      setOpenBoardOptions(false);
      setOpenEditBoardModul(true);
    },
    handleAddTask: addTaskFn(setState, state, addTasks, tasksStore, router, boardName, boardId),
    handleEditBoard: editBoardFn(setBoardSaving, addBoards, boards, router, setState, setOpenBoardOptions, setOpenEditBoardModul),
    handleDeleteBoard: deleteBoardFn(setIsDeletingBoard, router, state, setState)
  };

  // Separate column management logic
  const columnHandlers = {
    handleAddColumn: async () => {
      if (!newColumnName || addColumnIsLoading) return;
      
      try {
        setAddColumnIsLoading(true);
        const response = await fetch("/api/addColumn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newColumnName, boardId })
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (response.ok) {
          const data = await response.json();
          setState(prev => ({
            ...prev,
            columns: [...prev.columns, {
              id: data.data.id,
              boardId,
              name: newColumnName,
              tasks: []
            }]
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
    }
  };

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

  // Compute derived values
  const getTasks = getTasksFromBoard(tasksStore, subTasks);
  const tasksByBoard: TaskState[] = getTasks();
  const columnClasses = darkMode ? 'bg-[#141517] border-[#3E3F4E]' : 'bg-[#c8cdfa22]';

  if (loader) return BoardLoadSpinner;

  return (
    <>
      {/* Group related UI sections */}
      <div className="fixed-controls">
        {/* Add Task Button */}
        <AddTaskButton
          isDisabled={state.isDisabled}
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
        />

        {/* Options Menu */}
        <BoardOptionsButton onClick={boardHandlers.handleOptions} />
      </div>

      {/* Group all modals together */}
      <div className="modals">
        {state.addTaskMode && (
          <>
            <OverlayButton setState={setState} />
            <AddTask
              state={state}
              setState={setState}
              handleAddTask={boardHandlers.handleAddTask}
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

        {/* Board Options Modal */}
        {openBoardOptions && (
          <BoardOptionsMenu
            onEdit={boardHandlers.handleEditOptions}
            onDelete={(e) => boardHandlers.handleDeleteBoard(e, boardId)}
            isDeletingBoard={isDeletingBoard}
          />
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
              handleEditBoard={boardHandlers.handleEditBoard}
              boardLoading={boardSaving}
              setOpenBoardOptions={setOpenBoardOptions}
              currentColumns={columns}
              tasks={tasksByBoard}
              darkMode={darkMode}
            />
          </>
        )}
      </div>

      {/* Main Board Content */}
      <KanbanHeader />
      <div className="board-content">
        <div className="w-full px-12 grid grid-flow-col auto-cols-max gap-6 mt-[100px] overflow-scroll mb-[50px]">
          {columns?.map((col) => {
            const colIndex = state.columnOrder.indexOf(col.id);
            if (colIndex !== -1 && col.boardId === boardId) {
              return (
                <div
                  key={col.id}
                  className={`${columnClasses} ${commonClasses.overflow} px-4 py-1 border-2 w-[300px]`}
                >
                  <ColumnText color={col.name} alignRight={false} darkMode={darkMode}>
                    {col.name}
                  </ColumnText>
                 
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
              handleAddColumn={columnHandlers.handleAddColumn}
              addColumnIsLoading={addColumnIsLoading}
              setAddingColumn={setAddingColumn}
            />
          </div>
        </div>
      </div>

      <RenderToastMsg message={state.toastMsg} state={state} setState={setState} />
    </>
  );
};

export default KanbanGrid;
