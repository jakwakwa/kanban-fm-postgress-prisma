import {
  BoardState,
  ColumnState,
  Subtask,
  TaskState,
} from "@/types/data-types";

export const handleBoardProcessing = (
  boards: BoardState[],
  boardId: string,
  processBoard: (board: BoardState) => void
) => {
  const currentBoard = findCurrentBoard(boards, boardId);
  if (currentBoard) {
    processBoard(currentBoard);
  }
};

export const findCurrentBoard = (boards: BoardState[], boardId: string) => {
  return boards.find((board) => board.id === boardId);
};

// export const getAllTasks = (boards: BoardState[]): TaskState[] => {
//   const extractTasksFromColumn = (column: ColumnState) => column.tasks;

//   const extractTasksFromBoard = (board: BoardState) =>
//     board.columns.flatMap(extractTasksFromColumn);

//   return boards.flatMap(extractTasksFromBoard);
// };

export const getAllTasks = (boards: BoardState[]): TaskState[] => {
  const extractTasksFromColumn = (column: ColumnState) => column.tasks;

  const extractTasksFromBoard = (board: BoardState) =>
    board.columns.flatMap((column) => extractTasksFromColumn(column));

  return boards.flatMap((board) => extractTasksFromBoard(board));
};
export const INITIAL_STATE = {
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
};
